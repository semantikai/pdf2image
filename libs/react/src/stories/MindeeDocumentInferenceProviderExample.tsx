import MindeeDocumentInferenceProvider, {
  MindeeInferenceResponse,
} from "@/components/providers/MindeeDocumentInferenceProvider";
import { InferenceFields, InferenceViewer } from "@/main";

interface Props {
  inferenceResponse: MindeeInferenceResponse;
  documentSrc: string;
}
export default function MindeeDocumentInferenceProviderExample({
  inferenceResponse,
  documentSrc,
}: Props) {
  return (
    <MindeeDocumentInferenceProvider inferenceResponse={inferenceResponse}>
      <InferenceViewer documentSrc={documentSrc} />
      <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
        <InferenceFields.Field label="SubTotal" id="SubTotal" />
        <InferenceFields.Field label="Invoice Date" id="InvoiceDate" />
        <InferenceFields.Field label="Not Found" id="NotFound" />
      </div>
    </MindeeDocumentInferenceProvider>
  );
}
