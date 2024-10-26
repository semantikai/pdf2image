import {
  getDocument,
  GlobalWorkerOptions,
  PDFDocumentProxy,
  PDFPageProxy,
  version,
} from "pdfjs-dist";
import { RenderParameters } from "pdfjs-dist/types/src/display/api";

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.mjs`;

export const PDF_RESOLUTION = 1.5 * 10 ** 6; // target resolution 1.5 Mpx
export const MAX_PDF_SCALE = 5.5; // max DPI = 500

/**
 * This function takes a PDF document and a page number and returns a data URL of the rendered page image.
 * @param _document - The PDF document to get the image from.
 * @param pageNumber - The number of the page to get the image from.
 * @param resolution - The resolution of the image. Default is 1.5 Mpx.
 * @returns A promise that resolves to a data URL of the rendered page image.
 */
const getImageFromPage = async (
  _document: PDFDocumentProxy,
  pageNumber: number,
  resolution = PDF_RESOLUTION
) => {
  const page: PDFPageProxy = await _document.getPage(pageNumber);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const [, , width = 100, height = 100] = page.view;
  const newScale = (resolution / (height * width)) ** (1 / 2);
  const safeScale = Math.min(newScale, MAX_PDF_SCALE);
  const viewport = page.getViewport({ scale: safeScale });
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };
  return page
    .render(renderContext as RenderParameters)
    .promise.then(() => canvas.toDataURL())
    .catch((error) => {
      throw new Error(error);
    });
};

/**
 * This function takes a file path to a PDF and returns an array of data URLs of the rendered page images.
 * @param file - The file path to the PDF.
 * @param options - An object containing the maximum number of pages to render and the resolution of the images. Default is { allowedMaxPages: Infinity, resolution: 1.5 Mpx }.
 * @returns A promise that resolves to an array of data URLs of the rendered page images.
 * @example
 * pdfToImage('path/to/your/pdf', { allowedMaxPages: 10, resolution: 300 })
 *   .then(images => {
 *     // images is an array of data URLs of the rendered page images
 *     images.forEach(image => console.log(image));
 *   })
 *   .catch(error => console.error(error));
 */
export default function pdfToImage(
  file: string,
  options = { allowedMaxPages: Infinity, resolution: PDF_RESOLUTION }
) {
  return new Promise<string[]>((resolve, reject) => {
    getDocument(file)
      .promise.then((document: PDFDocumentProxy) => {
        if (document.numPages > options.allowedMaxPages) {
          const error = new Error("Too many pages");
          error.name = "TooManyPagesError";
          reject(error);
          return;
        }
        Promise.allSettled(
          Array.from(Array(document.numPages).keys()).map((index) =>
            getImageFromPage(document, index + 1, options.resolution)
          )
        )
          .then((results) => {
            const images = results.reduce<string[]>((accumulator, result) => {
              if (result.status === "fulfilled") {
                accumulator.push(result.value);
              }
              return accumulator;
            }, []);
            resolve(images);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}
