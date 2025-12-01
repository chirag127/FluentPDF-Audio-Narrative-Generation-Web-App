// src/ui/dashboard.ts
import { BaseController } from "./base";

export class DashboardController extends BaseController {
    constructor() {
        super("progressPanel");
    }

    protected init(): void {
        // No specific init logic needed for static elements, managed by update methods
    }

    updateProgress(current: number, total: number, statusText: string): void {
        const pct = Math.round((current / total) * 100);
        const el = document.getElementById("totalProgressText");
        if (el) {
            el.textContent = `${pct}%`;
        }

        const txt = document.getElementById("progressTextDetailed");
        if (txt) {
            txt.textContent = statusText;
        }
    }

    initBatchMap(total: number): void {
        const container = document.getElementById("batchContainer");
        if (!container) {
            return;
        }
        container.innerHTML = "";

        for (let i = 0; i < total; i++) {
            const d = document.createElement("div");
            d.id = `batch-${i}`;
            d.className =
                "h-3 w-3 bg-slate-200 dark:bg-slate-700 rounded-sm border border-slate-300 dark:border-slate-600 transition-colors duration-300";
            d.title = `Batch ${i + 1}`;
            container.appendChild(d);
        }
        this.show();
    }

    updateBatchStatus(
        index: number,
        status: "processing" | "success" | "error" | "fallback",
    ): void {
        const el = document.getElementById(`batch-${index}`);
        if (!el) {
            return;
        }

        let colorClass = "bg-slate-200 dark:bg-slate-700";
        if (status === "processing") {
            colorClass = "bg-yellow-400 animate-pulse";
        } else if (status === "success") {
            colorClass = "bg-green-500 border-green-600";
        } else if (status === "error") {
            colorClass = "bg-red-500 border-red-600";
        } else if (status === "fallback") {
            colorClass = "bg-orange-400";
        }

        el.className = `h-3 w-3 rounded-sm transition-all duration-300 ${colorClass}`;
    }

    log(msg: string, type: "info" | "success" | "error" = "info"): void {
        const consoleEl = document.getElementById("logConsole");
        if (!consoleEl) {
            return;
        }

        const div = document.createElement("div");
        div.className =
            type === "success"
                ? "text-green-400"
                : type === "error"
                  ? "text-red-400"
                  : "text-slate-400";
        div.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        consoleEl.appendChild(div);
        consoleEl.scrollTop = consoleEl.scrollHeight;
    }
}
