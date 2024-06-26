import { inferenceDocRef } from "@/signals";
import { inferenceProcessingDocRef } from "@/signals/documentPages";
import { DocType, InferenceDoc } from "@/types";

export function getInferenceDocFromFile(file: File): InferenceDoc {
  const { type } = file;
  let docType = DocType.OTHER;
  if (type === "application/pdf") {
    docType = DocType.PDF;
  }
  if (type.startsWith("image/")) {
    docType = DocType.IMAGE;
  }
  return {
    type: docType,
    file,
    url: URL.createObjectURL(file),
  };
}

export async function getInferenceDoc(
  document: string | File
): Promise<InferenceDoc> {
  if (document instanceof File) {
    return getInferenceDocFromFile(document);
  }
  let docType = DocType.OTHER;
  const extension = document.split(".").pop()?.toLowerCase();
  if (extension === "pdf") {
    docType = DocType.PDF;
  } else if (
    ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"].includes(
      extension || ""
    )
  ) {
    docType = DocType.IMAGE;
  } else {
    try {
      const response = await fetch(document, { method: "HEAD" });
      const contentType = response.headers.get("Content-Type");
      if (contentType) {
        if (contentType === "application/pdf") {
          docType = DocType.PDF;
        } else if (contentType.startsWith("image/")) {
          docType = DocType.IMAGE;
        }
      }
    } catch (error) {
      throw Error("Error fetching the document");
    }
  }
  return {
    type: docType,
    url: document,
  };
}

export const preProcessDocumentSrc = (documentSrc: string | File) => {
  inferenceProcessingDocRef.value = {
    isProcessing: true,
    message: "Drawing image...",
  };
  getInferenceDoc(documentSrc)
    .then((inferenceDoc) => {
      inferenceDocRef.value = inferenceDoc;
      inferenceProcessingDocRef.value = {
        isProcessing: false,
        message: "",
      };
    })
    .catch((e) => {
      if (e instanceof Error) {
        console.error(e.message);
        inferenceProcessingDocRef.value = {
          isProcessing: false,
          hasError: true,
          message: "Error processing document.",
        };
      }
    });
};
