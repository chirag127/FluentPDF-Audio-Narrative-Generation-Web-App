import { PdfExtractor } from "@/features/pdf/extractor";
import * as pdfjsLib from "pdfjs-dist";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock pdfjs-dist
vi.mock("pdfjs-dist", () => ({
    getDocument: vi.fn(),
    GlobalWorkerOptions: {},
}));

describe("PdfExtractor", () => {
    let extractor: PdfExtractor;

    beforeEach(() => {
        extractor = new PdfExtractor();
        vi.clearAllMocks();
    });

    it("should extract text from PDF pages", async () => {
        const mockPage = {
            getTextContent: vi.fn().mockResolvedValue({
                items: [{ str: "Hello" }, { str: "World" }],
            }),
        };

        const mockPdf = {
            numPages: 1,
            getPage: vi.fn().mockResolvedValue(mockPage),
        };

        const mockPromise = { promise: Promise.resolve(mockPdf) };

        // Use assertion to bypass type check on mock implementation
        (pdfjsLib.getDocument as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockPromise);

        const file = new File(["dummy"], "test.pdf");
        const text = await extractor.extractText(file);

        expect(text).toContain("Hello World");
        expect(pdfjsLib.getDocument).toHaveBeenCalled();
    });
});
