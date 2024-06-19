import { InferenceViewer, InferenceFields } from "@/main";
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
      <InferenceFields fields={inferenceResult.fields}>
        <InferenceFields.Field label="Total tax" id="TotalTax">
          {(field) => <div>{field.content}</div>}
        </InferenceFields.Field>
      </InferenceFields>
    </div>
  );
}
