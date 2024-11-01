import { inferenceDocRef } from "@/signals";
import { inferenceResultRef } from "@/signals/inference";
import { InferenceDoc, InferenceResult } from "@/types";
import { Exclusive } from "@/types/utils";
import { useSignalEffect, useSignals } from "@preact/signals-react/runtime";
import { CSSProperties, ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
} & Exclusive<
  { inference: InferenceResult },
  {
    loadAsyncInference: (
      inferenceDoc: InferenceDoc
    ) => Promise<InferenceResult | undefined>;
  }
>;

export default function InferenceProvider({
  inference,
  children,
  className,
  style,
  loadAsyncInference,
}: Props) {
  useSignals();
  useEffect(() => {
    if (inference) {
      inferenceResultRef.value = inference;
    }
  }, [inference]);
  useSignalEffect(() => {
    if (inferenceDocRef.value && loadAsyncInference) {
      loadAsyncInference(inferenceDocRef.value)
        .then((result) => {
          inferenceResultRef.value = result;
        })
        .catch((error) => {
          console.error("Failed to load inference", error);
        });
    }
  });
  return (
    <div
      style={style}
      className={twMerge("flex h-full w-full gap-x-3", className)}
    >
      {children}
    </div>
  );
}
