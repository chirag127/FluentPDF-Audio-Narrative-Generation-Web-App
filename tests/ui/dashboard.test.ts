// tests/ui/dashboard.test.ts
import { DashboardController } from "@/ui/dashboard";
import { beforeEach, describe, expect, it } from "vitest";

describe("DashboardController", () => {
    let dashboard: DashboardController;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="progressPanel" class="hidden">
                <div id="totalProgressText"></div>
                <div id="progressTextDetailed"></div>
                <div id="batchContainer"></div>
                <div id="logConsole"></div>
            </div>
        `;
        dashboard = new DashboardController();
        dashboard.mount();
    });

    it("should init batch map", () => {
        dashboard.initBatchMap(5);
        const container = document.getElementById("batchContainer");
        expect(container?.children.length).toBe(5);
        expect(document.getElementById("batch-0")).toBeTruthy();
        expect(document.getElementById("progressPanel")?.classList.contains("hidden")).toBe(false);
    });

    it("should update progress", () => {
        dashboard.updateProgress(50, 100, "Halfway");
        expect(document.getElementById("totalProgressText")?.textContent).toBe("50%");
        expect(document.getElementById("progressTextDetailed")?.textContent).toBe("Halfway");
    });

    it("should update batch status", () => {
        dashboard.initBatchMap(3);
        dashboard.updateBatchStatus(1, "success");
        const el = document.getElementById("batch-1");
        expect(el?.className).toContain("bg-green-500");
    });

    it("should log messages", () => {
        dashboard.log("Test message", "info");
        const consoleEl = document.getElementById("logConsole");
        expect(consoleEl?.children.length).toBe(1);
        expect(consoleEl?.textContent).toContain("Test message");
    });

    it("should log error messages", () => {
        dashboard.log("Error message", "error");
        const consoleEl = document.getElementById("logConsole");
        expect(consoleEl?.lastElementChild?.className).toContain("text-red-400");
    });
});
