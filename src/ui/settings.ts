// src/ui/settings.ts
import { MODELS } from "@/features/llm/types";
import { ConfigManager } from "@/shared/config";
import Sortable from "sortablejs";
import { BaseController } from "./base";

export class SettingsController extends BaseController {
    constructor() {
        super("settingsPanel");
    }

    protected init(): void {
        this.loadValues();
        this.renderModelList();
        this.setupListeners();
    }

    private setupListeners(): void {
        document.getElementById("saveSettingsBtn")?.addEventListener("click", () => this.save());
        document.getElementById("resetModelOrderBtn")?.addEventListener("click", () => {
            ConfigManager.setModelOrder([]);
            this.renderModelList();
        });
        document.getElementById("restorePromptsBtn")?.addEventListener("click", () => {
            (document.getElementById("set_sysPrompt") as HTMLTextAreaElement).value =
                ConfigManager.getSystemPrompt(); // Actually this should restore defaults
            // But for now let's just reload from config or defaults logic needs to be exposed better
        });
    }

    private loadValues(): void {
        const setVal = (id: string, val: string) => {
            const el = document.getElementById(id) as HTMLInputElement;
            if (el) {
                el.value = val;
            }
        };

        for (const m of MODELS) {
            setVal(`key_${m.provider}`, ConfigManager.getApiKey(m.provider) || "");
        }

        setVal("set_concurrency", ConfigManager.getConcurrency().toString());
        setVal("set_retryDelay", ConfigManager.getRetryDelay().toString());
        setVal("set_sysPrompt", ConfigManager.getSystemPrompt());
        setVal("set_rulesPrompt", ConfigManager.getRulesPrompt());
    }

    private renderModelList(): void {
        const list = document.getElementById("modelList");
        if (!list) {
            return;
        }

        list.innerHTML = "";
        let order = ConfigManager.getModelOrder();

        // Ensure all models are present
        if (order.length === 0) {
            order = MODELS.map((m) => m.id);
        } else {
            const existingIds = new Set(order);
            for (const m of MODELS) {
                if (!existingIds.has(m.id)) {
                    order.push(m.id);
                }
            }
        }

        for (const id of order) {
            const model = MODELS.find((m) => m.id === id);
            if (!model) {
                continue;
            }

            const li = document.createElement("li");
            li.className =
                "model-item bg-white dark:bg-slate-900 p-2 rounded-lg flex items-center justify-between text-xs border border-slate-100 dark:border-slate-700 shadow-sm mb-2 cursor-grab active:cursor-grabbing";
            li.dataset.id = model.id;
            li.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="text-slate-400"><i class="fa-solid fa-grip-vertical"></i></span>
                    <span class="font-medium">${model.name}</span>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600">${model.provider}</span>
            `;
            list.appendChild(li);
        }

        new Sortable(list, {
            animation: 150,
            ghostClass: "sortable-ghost",
            dragClass: "sortable-drag",
        });
    }

    private save(): void {
        for (const m of MODELS) {
            const el = document.getElementById(`key_${m.provider}`) as HTMLInputElement;
            if (el) {
                ConfigManager.setApiKey(m.provider, el.value.trim());
            }
        }

        const conc = (document.getElementById("set_concurrency") as HTMLInputElement).value;
        ConfigManager.set("set_concurrency", conc);

        const retry = (document.getElementById("set_retryDelay") as HTMLInputElement).value;
        ConfigManager.set("set_retryDelay", retry);

        const sys = (document.getElementById("set_sysPrompt") as HTMLTextAreaElement).value;
        ConfigManager.set("set_sysPrompt", sys);

        const rules = (document.getElementById("set_rulesPrompt") as HTMLTextAreaElement).value;
        ConfigManager.set("set_rulesPrompt", rules);

        const list = document.getElementById("modelList");
        if (list) {
            const order = Array.from(list.children).map(
                (li) => (li as HTMLElement).dataset.id || "",
            );
            ConfigManager.setModelOrder(order);
        }

        // Close modal
        document.getElementById("settingsPanel")?.classList.add("translate-x-full");
        setTimeout(() => document.getElementById("settingsModal")?.classList.add("hidden"), 300);

        alert("Configuration Saved"); // Replace with toast later
    }
}
