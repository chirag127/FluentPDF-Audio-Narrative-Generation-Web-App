// tests/shared/config.test.ts
import { ConfigManager, DEFAULT_CONCURRENCY } from "@/shared/config";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("ConfigManager", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it("should return default concurrency", () => {
        expect(ConfigManager.getConcurrency()).toBe(DEFAULT_CONCURRENCY);
    });

    it("should allow setting and getting API keys", () => {
        ConfigManager.setApiKey("test_provider", "12345");
        expect(ConfigManager.getApiKey("test_provider")).toBe("12345");
    });

    it("should handle JSON storage", () => {
        ConfigManager.setModelOrder(["a", "b"]);
        expect(ConfigManager.getModelOrder()).toEqual(["a", "b"]);
    });

    it("should return empty array for invalid JSON in model order", () => {
        localStorage.setItem("sf_modelOrder", "{invalid");
        expect(() => ConfigManager.getModelOrder()).toThrow();
    });

    it("should export config", () => {
        // Mock URL and document
        global.URL.createObjectURL = vi.fn();
        global.URL.revokeObjectURL = vi.fn();

        const anchor = { click: vi.fn(), href: "", download: "" };
        const createElement = vi
            .spyOn(document, "createElement")
            .mockReturnValue(anchor as unknown as HTMLElement);
        const _appendChild = vi
            .spyOn(document.body, "appendChild")
            .mockImplementation(() => anchor as unknown as HTMLElement);
        const _removeChild = vi
            .spyOn(document.body, "removeChild")
            .mockImplementation(() => anchor as unknown as HTMLElement);

        ConfigManager.setApiKey("test", "123");
        ConfigManager.export();

        expect(createElement).toHaveBeenCalledWith("a");
        expect(anchor.click).toHaveBeenCalled();
    });

    it("should import config", async () => {
        const data = JSON.stringify({ sf_key_test: "imported" });
        const file = new File([data], "config.json", { type: "application/json" });

        await ConfigManager.import(file);
        expect(ConfigManager.getApiKey("test")).toBe("imported");
    });

    it("should handle import errors", async () => {
        const file = new File(["invalid"], "config.json");
        await expect(ConfigManager.import(file)).rejects.toThrow();
    });
});
