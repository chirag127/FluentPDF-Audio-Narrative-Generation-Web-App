import { PdfRenderer } from "@/features/pdf/renderer";
import { jsPDF } from "jspdf";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock jsPDF
const mockDoc = {
    internal: {
        pageSize: {
            getWidth: () => 210,
            getHeight: () => 297,
        },
    },
    setFontSize: vi.fn(),
    setFont: vi.fn(),
    splitTextToSize: vi.fn().mockImplementation((text) => [text]), // Return text as single line
    text: vi.fn(),
    addPage: vi.fn(),
    output: vi.fn().mockReturnValue(new Blob(["pdf-content"])),
};

vi.mock("jspdf", () => {
    return {
        jsPDF: vi.fn().mockImplementation(() => mockDoc),
    };
});

describe("PdfRenderer", () => {
    let renderer: PdfRenderer;

    beforeEach(() => {
        renderer = new PdfRenderer();
        vi.clearAllMocks();
    });

    it("should create a PDF blob from chunks", () => {
        const chunks = ["# Title", "Paragraph"];
        const blob = renderer.createPdf("test.pdf", chunks);

        expect(blob).toBeInstanceOf(Blob);
        expect(jsPDF).toHaveBeenCalled();
    });

    it("should handle headings", () => {
        renderer.createPdf("test", ["# Heading 1"]);
        expect(mockDoc.setFontSize).toHaveBeenCalledWith(16);
        expect(mockDoc.setFont).toHaveBeenCalledWith("helvetica", "bold");
        expect(mockDoc.text).toHaveBeenCalledWith(
            "Heading 1",
            expect.any(Number),
            expect.any(Number),
            expect.any(Object),
        );
    });

    it("should handle lists", () => {
        renderer.createPdf("test", ["- Item 1"]);
        expect(mockDoc.text).toHaveBeenCalledWith(
            "• Item 1",
            expect.any(Number),
            expect.any(Number),
            expect.any(Object),
        );
    });

    it("should handle code blocks", () => {
        renderer.createPdf("test", ["```\ncode\n```"]);
        expect(mockDoc.setFont).toHaveBeenCalledWith("helvetica", "italic");
    });

    it("should add page when content overflows", () => {
        // Force overflow by mocking splitTextToSize to return many lines
        mockDoc.splitTextToSize.mockReturnValue(new Array(100).fill("line"));
        renderer.createPdf("test", ["Long text"]);
        expect(mockDoc.addPage).toHaveBeenCalled();
    });
});
