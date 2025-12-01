// tests/ui/settings.test.ts
import { ConfigManager } from "@/shared/config";
import { SettingsController } from "@/ui/settings";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock ConfigManager
vi.mock("@/shared/config", () => ({
    ConfigManager: {
        getApiKey: vi.fn(),
        setApiKey: vi.fn(),
        getConcurrency: vi.fn().mockReturnValue(5),
        set: vi.fn(),
        getRetryDelay: vi.fn().mockReturnValue(3000),
        getSystemPrompt: vi.fn().mockReturnValue("sys"),
        getRulesPrompt: vi.fn().mockReturnValue("rules"),
        getModelOrder: vi.fn().mockReturnValue([]),
        setModelOrder: vi.fn(),
    },
}));

vi.mock("@/features/llm/types", () => ({
    MODELS: [
        { id: "m1", name: "Model 1", provider: "p1" },
        { id: "m2", name: "Model 2", provider: "p2" },
    ],
}));

describe("SettingsController", () => {
    let settings: SettingsController;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="settingsPanel" class="hidden">
                <input id="key_p1" />
                <input id="key_p2" />
                <input id="set_concurrency" />
                <input id="set_retryDelay" />
                <textarea id="set_sysPrompt"></textarea>
                <textarea id="set_rulesPrompt"></textarea>
                <ul id="modelList"></ul>
                <button id="saveSettingsBtn"></button>
                <button id="resetModelOrderBtn"></button>
                <button id="restorePromptsBtn"></button>
            </div>
            <div id="settingsModal" class="hidden"></div>
        `;
        settings = new SettingsController();
        settings.mount();

        // Mock alert
        global.alert = vi.fn();
    });

    it("should load values on init", () => {
        expect((document.getElementById("set_concurrency") as HTMLInputElement).value).toBe("5");
    });

    it("should save settings", () => {
        (document.getElementById("key_p1") as HTMLInputElement).value = "k1";
        (document.getElementById("set_concurrency") as HTMLInputElement).value = "10";

        document.getElementById("saveSettingsBtn")?.click();

        expect(ConfigManager.setApiKey).toHaveBeenCalledWith("p1", "k1");
        expect(ConfigManager.set).toHaveBeenCalledWith("set_concurrency", "10");
        expect(global.alert).toHaveBeenCalledWith("Configuration Saved");
    });

    it("should render model list", () => {
        const list = document.getElementById("modelList");
        expect(list?.children.length).toBe(2);
    });
});
