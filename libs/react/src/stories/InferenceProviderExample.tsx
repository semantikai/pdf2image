import { InferenceFields, InferenceProvider, InferenceViewer } from "@/main";

import { InferenceResult } from "@/types";

interface Props {
  documentSrc: string;
  InferenceResult: InferenceResult;
}

export default function InferenceProviderExample({
  documentSrc,
  InferenceResult,
}: Props) {
  return (
    <InferenceProvider inferenceResult={InferenceResult}>
      <InferenceViewer documentSrc={documentSrc} />
      <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
        <InferenceFields.Field label="SubTotal" id="SubTotal" />
        <InferenceFields.Field label="Invoice Date" id="InvoiceDate" />
        <InferenceFields.Field label="Not Found" id="NotFound" />
      </div>
    </InferenceProvider>
  );
}
