import { InferenceDropzone, InferenceViewer } from "@/main";

export default function InferenceViewerWithUploader() {
  return (
    <InferenceDropzone>
      <InferenceViewer />
    </InferenceDropzone>
  );
}
