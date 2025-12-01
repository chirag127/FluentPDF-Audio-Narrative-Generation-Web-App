// src/features/llm/engine.ts
import { ConfigManager } from "@/shared/config";
import { delay } from "@/shared/utils";
import { CerebrasProvider } from "./providers/cerebras";
import { CohereProvider } from "./providers/cohere";
import { GeminiProvider } from "./providers/gemini";
import { GroqProvider } from "./providers/groq";
import { MistralProvider } from "./providers/mistral";
import { OpenRouterProvider } from "./providers/openrouter";
import type { LLMProvider, LLMRequest, ModelDefinition } from "./types";
import { MODELS } from "./types";

export class LLMEngine {
    private providers: Record<string, LLMProvider> = {
        gemini: new GeminiProvider(),
        groq: new GroqProvider(),
        cerebras: new CerebrasProvider(),
        openrouter: new OpenRouterProvider(),
        mistral: new MistralProvider(),
        cohere: new CohereProvider(),
    };

    private abortFlag = false;

    abort(): void {
        this.abortFlag = true;
    }

    reset(): void {
        this.abortFlag = false;
    }

    async processBatch(
        chunks: string[],
        onProgress: (
            index: number,
            status: "processing" | "success" | "error" | "fallback",
        ) => void,
        concurrency = 5,
    ): Promise<string[]> {
        this.reset();
        const results: string[] = new Array(chunks.length).fill("");
        let currentIndex = 0;

        const worker = async () => {
            while (currentIndex < chunks.length) {
                if (this.abortFlag) {
                    break;
                }
                const index = currentIndex++;
                try {
                    onProgress(index, "processing");
                    const result = await this.processChunkWithRetry(chunks[index], (s) =>
                        onProgress(index, s),
                    );
                    results[index] = result;
                    onProgress(index, "success");
                } catch (e) {
                    onProgress(index, "error");
                    results[index] = `[ERROR]: ${(e as Error).message}`;
                }
            }
        };

        const workers = Array(concurrency).fill(null).map(worker);
        await Promise.all(workers);

        if (this.abortFlag) {
            throw new Error("Aborted by user");
        }

        return results;
    }

    private async processChunkWithRetry(
        chunk: string,
        onStatusChange: (status: "processing" | "fallback") => void,
    ): Promise<string> {
        const availableModels = this.getAvailableModels();
        if (availableModels.length === 0) {
            throw new Error("No API Keys configured for any supported provider.");
        }

        let modelIndex = 0;
        let attempt = 0;

        while (true) {
            if (this.abortFlag) {
                throw new Error("Aborted");
            }

            const model = availableModels[modelIndex];
            const provider = this.providers[model.provider];
            const apiKey = ConfigManager.getApiKey(model.provider);

            if (!apiKey) {
                // Should not happen due to getAvailableModels, but safety check
                modelIndex = (modelIndex + 1) % availableModels.length;
                continue;
            }

            attempt++;
            if (attempt > 1) {
                onStatusChange("fallback");
                // Backoff: min(30s, 1s * 2^(attempt-2))
                const backoff = Math.min(30000, 1000 * 2 ** (attempt - 2));
                await delay(backoff);
            }

            try {
                const request: LLMRequest = {
                    systemPrompt: ConfigManager.getSystemPrompt(),
                    rulesPrompt: ConfigManager.getRulesPrompt(),
                    userContent: chunk,
                };

                const response = await provider.generate(model.id, apiKey, request);
                return response.text;
            } catch (e) {
                console.warn(`Attempt ${attempt} failed on ${model.name}:`, e);
                // Rotate model
                modelIndex = (modelIndex + 1) % availableModels.length;

                // If we've cycled through all models, wait a bit longer to prevent rapid looping
                if (modelIndex === 0) {
                    await delay(1000);
                }
            }
        }
    }

    private getAvailableModels(): ModelDefinition[] {
        const order = ConfigManager.getModelOrder();
        // Start with all models
        let candidates = [...MODELS];

        // If user has a custom order, prioritize those
        if (order.length > 0) {
            const ordered = order
                .map((id) => MODELS.find((m) => m.id === id))
                .filter((m): m is ModelDefinition => !!m);
            const others = MODELS.filter((m) => !order.includes(m.id));
            candidates = [...ordered, ...others];
        }

        // Filter by API key availability
        return candidates.filter((m) => !!ConfigManager.getApiKey(m.provider));
    }
}

export const engine = new LLMEngine();
