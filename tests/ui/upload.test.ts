// tests/ui/upload.test.ts
import { UploadController } from "@/ui/upload";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("UploadController", () => {
    let upload: UploadController;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="dropZone">
                <input type="file" id="fileInput" />
            </div>
        `;
        upload = new UploadController();
        upload.mount();
    });

    it("should trigger file input on click", () => {
        const fileInput = document.getElementById("fileInput") as HTMLInputElement;
        const clickSpy = vi.spyOn(fileInput, "click");
        document.getElementById("dropZone")?.click();
        expect(clickSpy).toHaveBeenCalled();
    });

    it("should handle file selection via input", () => {
        const file = new File(["dummy"], "test.pdf", { type: "application/pdf" });
        const onFileSelectSpy = vi.fn();
        upload.onFileSelect = onFileSelectSpy;

        const fileInput = document.getElementById("fileInput") as HTMLInputElement;
        // manually trigger change event with file
        // Note: setting files on input is tricky in jsdom/happy-dom without user interaction mimicry
        // We can just dispatch the event and mock the property if needed,
        // but defining 'files' property on input element is restricted.
        // We can mock the event object passed to the listener.

        // However, we can't easily access the private listener.
        // But we attached it to the element.

        // Let's redefine 'files' getter on the input
        Object.defineProperty(fileInput, "files", {
            value: [file],
            writable: false,
        });

        fileInput.dispatchEvent(new Event("change"));
        expect(onFileSelectSpy).toHaveBeenCalledWith(file);
    });

    it("should reject non-pdf files", () => {
        const file = new File(["dummy"], "test.txt", { type: "text/plain" });
        const onFileSelectSpy = vi.fn();
        upload.onFileSelect = onFileSelectSpy;

        const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

        const fileInput = document.getElementById("fileInput") as HTMLInputElement;
        Object.defineProperty(fileInput, "files", {
            value: [file],
            writable: false,
        });

        fileInput.dispatchEvent(new Event("change"));
        expect(onFileSelectSpy).not.toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalledWith("Only PDF files are supported.");
    });
});
