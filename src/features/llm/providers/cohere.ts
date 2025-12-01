import type { LLMRequest } from "../types";
// src/features/llm/providers/cohere.ts
import { BaseProvider } from "./base";

interface CohereResponse {
    message?: {
        content?: Array<{
            text?: string;
        }>;
    };
}

export class CohereProvider extends BaseProvider {
    name = "cohere";

    getEndpoint(): string {
        return "https://api.cohere.com/v2/chat";
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

    extractResponse(data: CohereResponse): string {
        return data.message?.content?.[0]?.text || "";
    }
}
