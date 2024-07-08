"use client";
import "@repo/react/dist/style.css";
import {
  InferenceDropzone,
  InferenceViewer,
  MindeeDocumentInferenceProvider,
} from "@repo/react";
import { InferenceDoc } from "@repo/react/dist/types";
import { useState } from "react";
import { MindeeInferenceResponse } from "@repo/react/dist/components/providers/MindeeDocumentInferenceProvider";
import getInferenceAction from "@/actions/getInference";

export default function Widget() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loadAsyncInference = async (
    inferenceDoc: InferenceDoc
  ): Promise<MindeeInferenceResponse | undefined> => {
    setIsLoading(true);
    if (!inferenceDoc.file) return;
    const data = new FormData();
    data.append("document", inferenceDoc.file, inferenceDoc.file.name);
    try {
      const response = await getInferenceAction({ data });
      return response.document.inference;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <MindeeDocumentInferenceProvider loadAsyncInference={loadAsyncInference}>
      <InferenceDropzone>
        <InferenceViewer isLoading={isLoading} />
      </InferenceDropzone>
    </MindeeDocumentInferenceProvider>
  );
}
