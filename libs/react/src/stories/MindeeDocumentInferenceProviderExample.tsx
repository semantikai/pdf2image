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
      <InferenceFields className="space-y-4 bg-gray-100 p-4 rounded-lg">
        {(fields) =>
          fields.map((field) => (
            <InferenceFields.FieldViewer key={field.id} field={field} />
          ))
        }
      </InferenceFields>
    </MindeeDocumentInferenceProvider>
  );
}
