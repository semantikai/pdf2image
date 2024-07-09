import { InferenceResult } from "@/types";

interface Props {
  children: ReactNode;
  inferenceResponse: AzureInferenceResponse;
}

// const rawResult = invoiceAzureInferenceResponse.analyzeResult.documents[0];
// const rawFields = rawResult!.fields as Record<
//   string,
//   {
//     content?: string;
//     confidence?: number;
//     boundingRegions?: { pageNumber: number; polygon: number[] }[];
//   }
// >;

// const inferenceResultExample: InferenceResult = Object.entries(
//   rawFields
// ).reduce<InferenceResult>(
//   (acc, [id, field]) => {
//     const _field = {
//       id,
//       confidence: field.confidence!,
//       label: id,
//       content: field.content!,
//     };
//     field.boundingRegions?.forEach((region) => {
//       acc.boundingRegions.push({
//         id,
//         pageNumber: region.pageNumber,
//         polygon: region.polygon.map((e) => e * 96 * 1.3),
//       });
//     });
//     acc.fields.push(_field);
//     return acc;
//   },
//   {
//     fields: [],
//     boundingRegions: [],
//   }
// );
type AzureInferenceResponse = {};
// const getInferenceResult = (
//   inferenceResponse: AzureInferenceResponse
// ): InferenceResult => {};
export default function AzureDocumentInferenceProvider({
  children,
  inferenceResponse,
}: Props) {
  return <div>{children}</div>;
}
