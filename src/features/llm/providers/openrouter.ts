import type { LLMRequest } from "../types";
// src/features/llm/providers/openrouter.ts
import { BaseProvider } from "./base";

interface OpenAIChatResponse {
    choices?: Array<{
        message?: {
            content?: string;
        };
    }>;
}

export class OpenRouterProvider extends BaseProvider {
    name = "openrouter";

    getEndpoint(): string {
        return "https://openrouter.ai/api/v1/chat/completions";
    }

    getHeaders(apiKey: string): Record<string, string> {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer":
                "https://chirag127.github.io/FluentPDF-Convert-To-Readable-Spokable-Pdf-Website/",
            "X-Title": "FluentPDF",
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
