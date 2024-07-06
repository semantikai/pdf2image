import GoogleDocumentInferenceProvider, {
  GoogleInferenceResponse,
} from "@/components/providers/GoogleDocumentInferenceProvider";

import { InferenceFields, InferenceViewer } from "@/main";
import { BoundingRegion } from "@/types";
import { useState } from "react";

interface Props {
  inferenceResponse: GoogleInferenceResponse;
  documentSrc: string;
}
export default function GoogleDocumentInferenceProviderExample({
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
    <GoogleDocumentInferenceProvider inferenceResponse={inferenceResponse}>
      <InferenceViewer
        boundingRegionsEvents={{
          onMouseEnter,
          onMouseLeave,
        }}
        documentSrc={documentSrc}
      />
      <InferenceFields className="space-y-4 bg-gray-100 p-4 rounded-lg overflow-y-auto">
        {(fields) =>
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
        }
      </InferenceFields>
    </GoogleDocumentInferenceProvider>
  );
}
