import { InferenceResult } from "@/types";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  inferenceResponse: GoogleInferenceResponse;
}

type GoogleInferenceResponse = {};
const getInferenceResult = (
  inferenceResponse: GoogleInferenceResponse
): InferenceResult => {};
export default function GoogleDocumentInferenceProvider({ children }: Props) {
  return <div>{children}</div>;
}
