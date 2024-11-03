import { expect, vi, test, describe, beforeEach } from "vitest";
import { getDocument, PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import pdfToImage from "./index.js";
import { PDF_RESOLUTION, MAX_PDF_SCALE } from "./constants.js";

// Mock canvas
const mockContext = {
  drawImage: vi.fn(),
};

const mockCanvas = {
  getContext: () => mockContext,
  toDataURL: () => "data:image/png;base64,mockedDataUrl",
  width: 0,
  height: 0,
};

// Mock document createElement
global.document = {
  createElement: () => mockCanvas,
} as any;

// Mock PDF.js
vi.mock("pdfjs-dist", () => {
  return {
    getDocument: vi.fn(),
    GlobalWorkerOptions: { workerSrc: "" },
    version: "2.0.0",
  };
});

describe("pdfToImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should convert single page PDF to image", async () => {
    const mockPage = {
      getViewport: () => ({ width: 100, height: 100 }),
      render: () => ({ promise: Promise.resolve() }),
      view: [0, 0, 100, 100],
    } as unknown as PDFPageProxy;

    const mockDocument = {
      numPages: 1,
      getPage: () => Promise.resolve(mockPage),
    } as unknown as PDFDocumentProxy;

    (getDocument as any).mockReturnValue({
      promise: Promise.resolve(mockDocument),
    });

    const images = await pdfToImage("test.pdf");
    expect(images).toHaveLength(1);
    expect(images[0]).toBe("data:image/png;base64,mockedDataUrl");
  });

  test("should handle multiple pages", async () => {
    const mockPage = {
      getViewport: () => ({ width: 100, height: 100 }),
      render: () => ({ promise: Promise.resolve() }),
      view: [0, 0, 100, 100],
    } as unknown as PDFPageProxy;

    const mockDocument = {
      numPages: 3,
      getPage: () => Promise.resolve(mockPage),
    } as unknown as PDFDocumentProxy;

    (getDocument as any).mockReturnValue({
      promise: Promise.resolve(mockDocument),
    });

    const images = await pdfToImage("test.pdf");
    expect(images).toHaveLength(3);
  });

  test("should respect allowedMaxPages option", async () => {
    const mockDocument = {
      numPages: 5,
    } as unknown as PDFDocumentProxy;

    (getDocument as any).mockReturnValue({
      promise: Promise.resolve(mockDocument),
    });

    await expect(
      pdfToImage("test.pdf", { allowedMaxPages: 3, resolution: PDF_RESOLUTION })
    ).rejects.toThrow("Too many pages");
  });

  test("should handle PDF loading errors", async () => {
    (getDocument as any).mockReturnValue({
      promise: Promise.reject(new Error("Failed to load PDF")),
    });

    await expect(pdfToImage("invalid.pdf")).rejects.toThrow(
      "Failed to load PDF"
    );
  });

  test("should handle page rendering errors", async () => {
    const mockPage = {
      getViewport: () => ({ width: 100, height: 100 }),
      render: () => ({ promise: Promise.reject(new Error("Render error")) }),
      view: [0, 0, 100, 100],
    } as unknown as PDFPageProxy;

    const mockDocument = {
      numPages: 1,
      getPage: () => Promise.resolve(mockPage),
    } as unknown as PDFDocumentProxy;

    (getDocument as any).mockReturnValue({
      promise: Promise.resolve(mockDocument),
    });

    const images = await pdfToImage("test.pdf");
    expect(images).toHaveLength(0);
  });

  test("should respect resolution option and MAX_PDF_SCALE", async () => {
    const mockPage = {
      getViewport: vi.fn().mockReturnValue({ width: 100, height: 100 }),
      render: () => ({ promise: Promise.resolve() }),
      view: [0, 0, 100, 100],
    } as unknown as PDFPageProxy;

    const mockDocument = {
      numPages: 1,
      getPage: () => Promise.resolve(mockPage),
    } as unknown as PDFDocumentProxy;

    (getDocument as any).mockReturnValue({
      promise: Promise.resolve(mockDocument),
    });

    await pdfToImage("test.pdf", { resolution: 2000000 });

    const expectedScale = Math.min(
      (2000000 / (100 * 100)) ** (1 / 2),
      MAX_PDF_SCALE
    );
    expect(mockPage.getViewport).toHaveBeenCalledWith({ scale: expectedScale });
  });
});
