import type { LLMRequest } from "../types";
// src/features/llm/providers/cerebras.ts
import { BaseProvider } from "./base";

interface OpenAIChatResponse {
    choices?: Array<{
        message?: {
            content?: string;
        };
    }>;
}

export class CerebrasProvider extends BaseProvider {
    name = "cerebras";

    getEndpoint(): string {
        return "https://api.cerebras.ai/v1/chat/completions";
    }

    getHeaders(apiKey: string): Record<string, string> {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        };
    }

    getPayload(modelId: string, request: LLMRequest): unknown {
        return {
            model: modelId,
            messages: [
                { role: "system", content: `${request.systemPrompt}\n${request.rulesPrompt}` },
                { role: "user", content: request.userContent },
            ],
        };
    }

    extractResponse(data: OpenAIChatResponse): string {
        return data.choices?.[0]?.message?.content || "";
    }
}
