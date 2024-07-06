import { inferenceResultRef } from "@/signals/inference";
import { InferenceResult } from "@/types";
import { useSignals } from "@preact/signals-react/runtime";
import { CSSProperties, ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  inferenceResult?: InferenceResult;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
export default function InferenceProvider({
  inferenceResult,
  children,
  className,
  style,
}: Props) {
  useSignals();
  useEffect(() => {
    if (inferenceResult) {
      inferenceResultRef.value = inferenceResult;
    }
  }, [inferenceResult]);
  return (
    <div
      style={style}
      className={twMerge(className, "flex h-full w-full gap-x-3")}
    >
      {children}
    </div>
  );
}
