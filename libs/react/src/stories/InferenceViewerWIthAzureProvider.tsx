import { InferenceViewer, AzureDocumentInferenceProvider } from "@/main";

interface Props {
  inferenceResponse: any;
}
export default function InferenceViewerWIthAzureProvider({
  inferenceResponse,
}: Props) {
  return (
    <AzureDocumentInferenceProvider inferenceResponse={inferenceResponse}>
      <InferenceViewer />
    </AzureDocumentInferenceProvider>
  );
}
