// src/main.ts
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Embed icons for offline support

import { engine } from "@/features/llm/engine";
import { pdfExtractor } from "@/features/pdf/extractor";
import { pdfRenderer } from "@/features/pdf/renderer";
import { ConfigManager } from "@/shared/config";
import { chunkText, sanitizeFileName } from "@/shared/utils";
import { DashboardController } from "@/ui/dashboard";
import { LayoutController } from "@/ui/layout";
import { SettingsController } from "@/ui/settings";
import { UploadController } from "@/ui/upload";
import * as pdfjsLib from "pdfjs-dist";

// --- Worker Configuration ---
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

class App {
    private layout: LayoutController;
    private upload: UploadController;
    private settings: SettingsController;
    private dashboard: DashboardController;

    private state: {
        file: File | null;
        chunks: string[];
        results: string[];
        finalBlob: Blob | null;
    } = {
        file: null,
        chunks: [],
        results: [],
        finalBlob: null,
    };

    constructor() {
        this.layout = new LayoutController();
        this.upload = new UploadController();
        this.settings = new SettingsController();
        this.dashboard = new DashboardController();
    }

    init() {
        this.layout.mount();
        this.upload.mount();
        this.settings.mount();
        this.dashboard.mount();

        this.upload.onFileSelect = (f) => this.handleFile(f);

        document.getElementById("abortBtn")?.addEventListener("click", () => {
            engine.abort();
            this.dashboard.log("Processing Aborted by User", "error");
        });

        document.getElementById("downloadBtn")?.addEventListener("click", () => {
            if (this.state.finalBlob && this.state.file) {
                const url = URL.createObjectURL(this.state.finalBlob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `fluentpdf_${sanitizeFileName(this.state.file.name)}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        });
    }

    async handleFile(file: File) {
        this.state.file = file;

        // Hide Dropzone, Show Progress
        document.getElementById("dropZone")?.classList.add("hidden");
        document.getElementById("progressPanel")?.classList.remove("hidden");

        this.dashboard.log(
            `Loaded file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
        );

        try {
            this.dashboard.log("Extracting text from PDF...");
            const text = await pdfExtractor.extractText(file);
            this.dashboard.log("PDF Extracted. Chunking...", "success");

            this.state.chunks = chunkText(text, 15000);
            this.dashboard.log(`Split into ${this.state.chunks.length} chunks.`);

            this.dashboard.initBatchMap(this.state.chunks.length);

            const concurrency = ConfigManager.getConcurrency();
            const concurrencyIndicator = document.getElementById("concurrencyIndicator");
            if (concurrencyIndicator) {
                concurrencyIndicator.textContent = `${concurrency}x Parallel`;
            }

            this.state.results = await engine.processBatch(
                this.state.chunks,
                (idx, status) => {
                    this.dashboard.updateBatchStatus(idx, status);
                    this.dashboard.updateProgress(
                        idx + 1,
                        this.state.chunks.length,
                        `Processing Batch ${idx + 1}`,
                    );
                },
                concurrency,
            );

            this.dashboard.log("All chunks processed. Rendering PDF...", "success");
            this.state.finalBlob = pdfRenderer.createPdf(file.name, this.state.results);

            document.getElementById("progressPanel")?.classList.add("hidden");
            document.getElementById("resultPanel")?.classList.remove("hidden");
            this.dashboard.log("Conversion Complete!", "success");
        } catch (e) {
            this.dashboard.log(`Error: ${(e as Error).message}`, "error");
            alert(`Process Failed: ${(e as Error).message}`);
            location.reload();
        }
    }
}

const app = new App();
window.addEventListener("DOMContentLoaded", () => app.init());
