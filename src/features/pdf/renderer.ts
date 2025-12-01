// src/features/pdf/renderer.ts
import { jsPDF } from "jspdf";
import { marked } from "marked";

export class PdfRenderer {
    createPdf(_filename: string, contentChunks: string[]): Blob {
        const doc = new jsPDF({
            unit: "mm",
            format: "a4",
        });

        let cursorY = 20; // Margin top

        for (const chunk of contentChunks) {
            if (chunk) {
                cursorY = this.renderMarkdown(doc, chunk, cursorY);
            }
        }

        return doc.output("blob");
    }

    private renderMarkdown(doc: jsPDF, markdownText: string, initialCursorY: number): number {
        const tokens = marked.lexer(markdownText);
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const maxWidth = pageWidth - margin * 2;
        let cursorY = initialCursorY;

        const ptToMm = (pt: number) => pt * 0.3527;

        const writeBlock = (
            text: string,
            fontSize: number,
            fontStyle: "normal" | "bold" | "italic" | "bolditalic",
            spacingBefore = 0,
            spacingAfter = 0,
        ) => {
            doc.setFontSize(fontSize);
            doc.setFont("helvetica", fontStyle);

            const lineHeight = ptToMm(fontSize) * 1.5;

            // Cleanup text
            let cleanText = text
                .replace(/\*\*/g, "")
                .replace(/\*/g, "")
                .replace(/`/g, "")
                // Replace zero-width chars and BOM using alternation
                .replace(/\u200B|\u200C|\u200D|\uFEFF/g, "");

            // Fix kerning/spacing issues (e.g. "w o r d")
            cleanText = cleanText.replace(/\b([a-zA-Z])\s+(?=[a-zA-Z]\s+[a-zA-Z])/g, "$1");
            cleanText = cleanText.replace(/\s{2,}/g, " ");

            const lines = doc.splitTextToSize(cleanText, maxWidth);

            if (cursorY + spacingBefore > pageHeight - margin) {
                doc.addPage();
                cursorY = margin;
            } else {
                cursorY += spacingBefore;
            }

            for (const line of lines) {
                if (cursorY + lineHeight > pageHeight - margin) {
                    doc.addPage();
                    cursorY = margin;
                }
                doc.text(line, margin, cursorY + lineHeight * 0.75, { charSpace: 0 });
                cursorY += lineHeight;
            }

            cursorY += spacingAfter;
        };

        for (const token of tokens) {
            if (token.type === "heading") {
                writeBlock(token.text.replace(/[#]/g, ""), 16, "bold", 6, 4);
            } else if (token.type === "paragraph") {
                writeBlock(token.text, 12, "normal", 0, 4);
            } else if (token.type === "list") {
                for (const item of token.items) {
                    writeBlock(`• ${item.text}`, 12, "normal", 1, 1);
                }
                cursorY += 2;
            } else if (token.type === "code") {
                writeBlock(token.text, 11, "italic", 2, 4);
            }
        }

        return cursorY;
    }
}

export const pdfRenderer = new PdfRenderer();
