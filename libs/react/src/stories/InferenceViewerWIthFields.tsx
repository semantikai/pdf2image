import { InferenceViewer, InferenceData } from "@/main";
import { InferenceResult } from "@/types";

interface Props {
  inferenceResult: InferenceResult;
  documentSrc: string;
}

export default function InferenceViewerWithFields({
  inferenceResult,
  documentSrc,
}: Props) {
  return (
    <div className="flex gap-x-2">
      <InferenceViewer
        documentSrc={documentSrc}
        boundingRegions={inferenceResult.boundingRegions}
      />
      <InferenceData fields={inferenceResult.fields}>
        <InferenceData.Field id="TotalTax">
          {(field) => <div>{field.content}</div>}
        </InferenceData.Field>
      </InferenceData>
    </div>
  );
}
