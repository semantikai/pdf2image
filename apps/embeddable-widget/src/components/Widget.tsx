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
  const [inferenceResponse, setInferenceResponse] =
    useState<MindeeInferenceResponse>();
  const onDropFile = async (inferenceDoc: InferenceDoc) => {
    if (!inferenceDoc.file) return;
    const data = new FormData();
    data.append("document", inferenceDoc.file, inferenceDoc.file.name);
    const response = await getInferenceAction({ data });
    console.log(response);
  };
  return (
    <MindeeDocumentInferenceProvider inferenceResponse={inferenceResponse}>
      <InferenceDropzone onDropFile={onDropFile} className="h-[800px]">
        <InferenceViewer />
      </InferenceDropzone>
    </MindeeDocumentInferenceProvider>
  );
}
