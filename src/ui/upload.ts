// src/ui/upload.ts
import { BaseController } from "./base";

export class UploadController extends BaseController {
    public onFileSelect: (file: File) => void = () => {};

    constructor() {
        super("dropZone");
    }

    protected init(): void {
        const fileInput = document.getElementById("fileInput") as HTMLInputElement;

        this.element?.addEventListener("click", (e) => {
            // Prevent infinite loop if input is inside dropzone
            if (e.target === fileInput) {
                return;
            }
            fileInput.click();
        });

        fileInput.addEventListener("change", (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (files?.[0]) {
                this.handleFile(files[0]);
            }
        });

        const events = ["dragenter", "dragover", "dragleave", "drop"];
        for (const eventName of events) {
            this.element?.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        }

        this.element?.addEventListener("drop", (e) => {
            const files = (e as DragEvent).dataTransfer?.files;
            if (files?.[0]) {
                this.handleFile(files[0]);
            }
        });
    }

    private handleFile(file: File): void {
        if (file.type !== "application/pdf") {
            alert("Only PDF files are supported.");
            return;
        }
        this.onFileSelect(file);
    }
}
