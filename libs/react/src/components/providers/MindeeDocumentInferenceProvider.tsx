import { InferenceField, InferenceResult } from "@/types";
import InferenceProvider from "../InferenceProvider";

type Field = {
  value: string;
  confidence: number;
  description?: string;
  polygon?: [number, number][];
  page_id: number;
  [key: string]: any;
};

export type MindeeInferenceResponse = {
  prediction: Record<string, Field | Field[]>;
};

interface Props {
  children: React.ReactNode;
  inferenceResponse?: MindeeInferenceResponse;
}

const getInferenceResult = (
  inferenceResponse: MindeeInferenceResponse
): InferenceResult =>
  Object.entries(inferenceResponse.prediction).reduce<InferenceResult>(
    (acc, [id, field]) => {
      let _field: InferenceField = {
        id,
        label: id,
      };
      if (Array.isArray(field)) {
        field.forEach((f, index) => {
          if (f.polygon) {
            acc.boundingRegions.push({
              id: `${id}-${index}`,
              pageNumber: f.page_id + 1,
              polygon: f.polygon,
            });
          }
        });
        _field = {
          ..._field,
          items: field.map((f, index) => ({
            id: `${id}-${index}`,
            label: `${id}-${index}`,
            content: f.value,
            confidence: f.confidence,
            pageNumber: f.page_id + 1,
          })),
        };
      } else {
        _field = {
          ..._field,
          content: field.value,
          confidence: field.confidence,
        };
        if (field.polygon) {
          acc.boundingRegions.push({
            id,
            pageNumber: field.page_id + 1,
            polygon: field.polygon,
          });
        }
      }
      acc.fields.push(_field);
      return acc;
    },
    {
      fields: [],
      boundingRegions: [],
    }
  );

export const useMindeeDocumentInferenceProvider = (
  inferenceResponse: MindeeInferenceResponse
) => {
  return getInferenceResult(inferenceResponse);
};
export default function MindeeDocumentInferenceProvider({
  children,
  inferenceResponse,
}: Props) {
  return (
    <InferenceProvider
      inferenceResult={
        inferenceResponse && getInferenceResult(inferenceResponse)
      }
    >
      {children}
    </InferenceProvider>
  );
}
