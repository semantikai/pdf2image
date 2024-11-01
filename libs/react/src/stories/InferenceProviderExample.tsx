import { InferenceResult } from "@/types";
import Inference from "@/main";

interface Props {
  documentSrc: string;
  InferenceResult: InferenceResult;
}

export default function InferenceProviderExample({
  documentSrc,
  InferenceResult,
}: Props) {
  return (
    <Inference.Provider inference={InferenceResult}>
      <Inference.Viewer documentSrc={documentSrc} />
      <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
        <Inference.Field id="SubTotal" />
        <Inference.Field id="InvoiceDate" />
        <Inference.Field id="NotFound" />
      </div>
    </Inference.Provider>
  );
}
