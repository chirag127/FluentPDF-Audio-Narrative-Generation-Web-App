// src/features/pdf/extractor.ts
import * as pdfjsLib from "pdfjs-dist";
import type { TextItem } from "pdfjs-dist/types/src/display/api";

// Worker configuration is tricky in modular builds.
// We rely on Vite's handling or a dynamic import in main usually,
// but for the library we need to ensure the worker is set.
// In a real app, we set this in main.ts.

export class PdfExtractor {
    async extractText(file: File): Promise<string> {
        const arrayBuffer = await file.arrayBuffer();

        // Load the document
        // Note: GlobalWorkerOptions should be set by the consumer (main.ts)
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

        let fullText = "";

        // Extract text from each page
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            // Join items with a space
            const pageText = textContent.items
                .filter((item): item is TextItem => "str" in item)
                .map((item) => item.str)
                .join(" ");

            fullText += `${pageText}\n\n`;
        }

        return fullText;
    }
}

export const pdfExtractor = new PdfExtractor();
