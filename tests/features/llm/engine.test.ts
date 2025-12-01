import { engine } from "@/features/llm/engine";
import { ConfigManager } from "@/shared/config";
import { delay } from "@/shared/utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock Config
vi.mock("@/shared/config", () => ({
    ConfigManager: {
        getApiKey: vi.fn(),
        getModelOrder: vi.fn().mockReturnValue([]),
        getSystemPrompt: vi.fn().mockReturnValue("sys"),
        getRulesPrompt: vi.fn().mockReturnValue("rules"),
        getConcurrency: vi.fn().mockReturnValue(1),
    },
}));

// Mock utils
vi.mock("@/shared/utils", () => ({
    delay: vi.fn(), // We will mock implementation per test
    chunkText: vi.fn(),
    sanitizeFileName: vi.fn(),
    formatBytes: vi.fn(),
    generateId: vi.fn(),
}));

describe("LLMEngine", () => {
    beforeEach(() => {
        engine.reset();
        vi.clearAllMocks();
        (ConfigManager.getModelOrder as unknown as ReturnType<typeof vi.fn>).mockReturnValue([]);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should process batch of chunks", async () => {
        (ConfigManager.getApiKey as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
            "test-key",
        );
        (delay as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                candidates: [{ content: { parts: [{ text: "Converted Text" }] } }],
            }),
        });

        const onProgress = vi.fn();
        const results = await engine.processBatch(["chunk1"], onProgress);

        expect(results[0]).toBe("Converted Text");
        expect(onProgress).toHaveBeenCalledWith(0, "success");
    });

    it("should abort processing", async () => {
        (ConfigManager.getApiKey as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
            "test-key",
        );

        // Mock delay to abort when called (simulating abort during processing)
        (delay as unknown as ReturnType<typeof vi.fn>).mockImplementation(async () => {
            engine.abort();
            return;
        });

        // We also need fetch to fail or delay to be called.
        // The engine calls delay(backoff) if attempt > 1.
        // OR we can abort in onProgress.

        const onProgress = vi.fn().mockImplementation(() => {
            engine.abort();
        });

        // processBatch -> reset() -> worker loop -> onProgress("processing") -> abort()
        // next loop iteration checks abortFlag -> breaks.
        // processBatch checks abortFlag -> throws.

        await expect(engine.processBatch(["chunk1"], onProgress)).rejects.toThrow(
            "Aborted by user",
        );
    });
});
