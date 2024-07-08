import MindeeDocumentInferenceProvider, {
  MindeeInferenceResponse,
} from "@/components/providers/MindeeDocumentInferenceProvider";
import { InferenceFields, InferenceViewer } from "@/main";
import { BoundingRegion } from "@/types";
import { useState } from "react";

interface Props {
  inferenceResponse: MindeeInferenceResponse;
  documentSrc: string;
}
export default function MindeeDocumentInferenceProviderExample({
  inferenceResponse,
  documentSrc,
}: Props) {
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const onMouseEnter = (boundingRegion: BoundingRegion) => {
    setHoveredField(boundingRegion.id);
  };
  const onMouseLeave = () => {
    setHoveredField(null);
  };
  return (
    <MindeeDocumentInferenceProvider inference={inferenceResponse}>
      <InferenceViewer
        boundingRegionsEvents={{
          onMouseEnter,
          onMouseLeave,
        }}
        documentSrc={documentSrc}
      />
      <InferenceFields className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm overflow-y-auto w-[350px]">
        {(fields) =>
          fields.length ? (
            fields.map((field) => (
              <InferenceFields.FieldViewer
                style={{
                  backgroundColor:
                    hoveredField === field.id ? "yellow" : "transparent",
                }}
                key={field.id}
                field={field}
              />
            ))
          ) : (
            <div className="text-red-500">No fields found</div>
          )
        }
      </InferenceFields>
    </MindeeDocumentInferenceProvider>
  );
}
