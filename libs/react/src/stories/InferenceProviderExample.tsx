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
    <InferenceProvider inference={InferenceResult}>
      <InferenceViewer documentSrc={documentSrc} />
      <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
        <InferenceFields.Field id="SubTotal" />
        <InferenceFields.Field id="InvoiceDate" />
        <InferenceFields.Field id="NotFound" />
      </div>
    </InferenceProvider>
  );
}
