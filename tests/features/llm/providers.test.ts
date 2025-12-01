import { GeminiProvider } from "@/features/llm/providers/gemini";
import type { LLMRequest } from "@/features/llm/types";
import { describe, expect, it, vi } from "vitest";

// Mock fetch
global.fetch = vi.fn();

describe("GeminiProvider", () => {
    it("should generate correct payload", () => {
        const provider = new GeminiProvider();
        const req: LLMRequest = {
            systemPrompt: "sys",
            rulesPrompt: "rules",
            userContent: "user",
        };
        const payload = provider.getPayload("model-1", req) as {
            contents: { parts: { text: string }[] }[];
        };
        expect(payload.contents[0].parts[0].text).toContain("sys");
        expect(payload.contents[0].parts[0].text).toContain("rules");
        expect(payload.contents[0].parts[0].text).toContain("user");
    });
});
