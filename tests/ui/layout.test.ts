// tests/ui/layout.test.ts
import { ConfigManager } from "@/shared/config";
import { LayoutController } from "@/ui/layout";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/shared/config", () => ({
    ConfigManager: {
        getTheme: vi.fn().mockReturnValue("light"),
        setTheme: vi.fn(),
    },
}));

describe("LayoutController", () => {
    let layout: LayoutController;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="app"></div>
            <button id="themeToggle"></button>
            <button id="openSettingsBtn"></button>
            <div id="settingsModal" class="hidden"></div>
            <div id="settingsPanel" class="translate-x-full"></div>
            <button id="closeSettingsBtn"></button>
            <div id="settingsBackdrop"></div>
        `;
        layout = new LayoutController();
        layout.mount();
    });

    it("should toggle theme", () => {
        document.getElementById("themeToggle")?.click();
        expect(ConfigManager.setTheme).toHaveBeenCalledWith("dark");
        expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("should open settings", () => {
        vi.useFakeTimers();
        document.getElementById("openSettingsBtn")?.click();
        expect(document.getElementById("settingsModal")?.classList.contains("hidden")).toBe(false);
        vi.runAllTimers();
        expect(
            document.getElementById("settingsPanel")?.classList.contains("translate-x-full"),
        ).toBe(false);
        vi.useRealTimers();
    });

    it("should close settings", () => {
        vi.useFakeTimers();
        layout.closeSettings();
        expect(
            document.getElementById("settingsPanel")?.classList.contains("translate-x-full"),
        ).toBe(true);
        vi.runAllTimers();
        expect(document.getElementById("settingsModal")?.classList.contains("hidden")).toBe(true);
        vi.useRealTimers();
    });
});
