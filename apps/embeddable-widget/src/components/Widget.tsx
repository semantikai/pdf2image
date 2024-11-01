"use client";
import "@semantik/react/dist/style.css";
import {
  InferenceDropzone,
  InferenceData,
  InferenceViewer,
  MindeeDocumentInferenceProvider,
} from "@semantik/react";
import { BoundingRegion, InferenceDoc } from "@semantik/react/dist/types";
import { useState } from "react";
import { MindeeInferenceResponse } from "@semantik/react/dist/components/providers/MindeeDocumentInferenceProvider";
import getInferenceAction from "@/actions/getInference";
import { useSignal } from "@preact/signals-react";
import dummyResponse from "./response.json";

interface Props {}

export default function Widget({}: Props) {
  const hoveredField = useSignal<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loadAsyncInference = async (
    inferenceDoc: InferenceDoc
  ): Promise<MindeeInferenceResponse | undefined> => {
    return dummyResponse.document.inference as any;
    // setIsLoading(true);
    // if (!inferenceDoc.file) return;
    // const data = new FormData();
    // data.append("document", inferenceDoc.file, inferenceDoc.file.name);
    // try {
    //   const response = await getInferenceAction({ data, product: "invoice" });
    //   console.log(response);
    //   return response.document.inference;
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };
  const onMouseEnter = (boundingRegion: BoundingRegion) => {
    hoveredField.value = boundingRegion.id;
  };
  const onMouseLeave = () => {
    hoveredField.value = null;
  };
  return (
    <MindeeDocumentInferenceProvider
      className="h-screen w-screen flex p-2"
      loadAsyncInference={loadAsyncInference}
    >
      <InferenceDropzone className="h-full">
        <InferenceViewer
          boundingRegionsEvents={{ onMouseEnter, onMouseLeave }}
          isLoading={isLoading}
        />
      </InferenceDropzone>
      <InferenceData className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm overflow-y-auto w-[350px]">
        {(fields) =>
          fields.length ? (
            fields.map((field) => (
              <InferenceData.FieldViewer
                style={{
                  backgroundColor:
                    hoveredField.value === field.id ? "yellow" : "transparent",
                }}
                key={field.id}
                field={field}
              />
            ))
          ) : (
            <div className="text-red-500">No fields found</div>
          )
        }
      </InferenceData>
    </MindeeDocumentInferenceProvider>
  );
}
