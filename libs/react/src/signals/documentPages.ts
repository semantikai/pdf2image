import { DocType } from "@/types";
import pdfToImage from "@semantik/pdf2image";
import { computedAwait } from "@/utils/shared";
import { signal } from "@preact/signals-react";
import { inferenceDocRef } from ".";

export const currentPageIndexRef = signal(0);

export const inferenceProcessingDocRef = signal<{
  message: string;
  isProcessing: boolean;
  hasError?: boolean;
}>({
  message: "",
  isProcessing: false,
  hasError: false,
});

export const clearInferenceProcessingDoc = () => {
  inferenceProcessingDocRef.value = {
    isProcessing: false,
    message: "",
    hasError: false,
  };
};
export const documentPages = computedAwait([], async () => {
  let images: string[] = [];
  if (!inferenceDocRef.value) return images;
  if (inferenceDocRef.value.type === DocType.PDF) {
    inferenceProcessingDocRef.value = {
      isProcessing: true,
      message: "Processing PDF...",
    };

    try {
      images = await pdfToImage(inferenceDocRef.value.url);
      inferenceProcessingDocRef.value = {
        isProcessing: false,
        message: "",
      };
    } catch (error) {
      inferenceProcessingDocRef.value = {
        isProcessing: false,
        hasError: true,
        message: "Error processing PDF.",
      };
    }
  }
  if (inferenceDocRef.value.type === DocType.IMAGE) {
    images = [inferenceDocRef.value.url];
  }

  return images;
});

export const incrementPage = () => {
  if (currentPageIndexRef.value === documentPages.value.length - 1) return;
  currentPageIndexRef.value++;
};
export const decrementPage = () => {
  if (currentPageIndexRef.value === 0) return;
  currentPageIndexRef.value = currentPageIndexRef.value - 1;
};

export const onPageIndexChange = (index: number) => {
  currentPageIndexRef.value = index;
};
