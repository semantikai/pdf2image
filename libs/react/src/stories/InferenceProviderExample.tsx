import { InferenceFields, InferenceProvider, InferenceViewer } from "@/main";
import invoiceAzureInferenceResponse from "./examples/multi-pdf-invoice/azure.inference.json";
import { InferenceResult } from "@/types";

const rawResult = invoiceAzureInferenceResponse.analyzeResult.documents[0];
const rawFields = rawResult!.fields as Record<
  string,
  {
    content?: string;
    confidence?: number;
    boundingRegions?: { pageNumber: number; polygon: number[] }[];
  }
>;

const inferenceResultExample: InferenceResult = Object.entries(
  rawFields
).reduce<InferenceResult>(
  (acc, [id, field]) => {
    const _field = {
      id,
      confidence: field.confidence!,
      label: id,
      content: field.content!,
    };
    field.boundingRegions?.forEach((region) => {
      acc.boundingRegions.push({
        id,
        pageNumber: region.pageNumber,
        polygon: region.polygon.map((e) => e * 96 * 1.3),
      });
    });
    acc.fields.push(_field);
    return acc;
  },
  {
    fields: [],
    boundingRegions: [],
  }
);

interface Props {
  documentSrc: string;
}

export default function InferenceProviderExample({ documentSrc }: Props) {
  return (
    <InferenceProvider inferenceResult={inferenceResultExample}>
      <InferenceViewer documentSrc={documentSrc} />
      <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
        <InferenceFields.Field label="SubTotal" id="SubTotal" />
        <InferenceFields.Field label="Invoice Date" id="InvoiceDate" />
        <InferenceFields.Field label="Not Found" id="NotFound" />
      </div>
    </InferenceProvider>
  );
}
