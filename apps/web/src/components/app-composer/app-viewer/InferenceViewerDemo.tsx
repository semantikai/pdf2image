import { InferenceViewer } from "@semantik/react";
import "@semantik/react/dist/style.css";
import { BoundingRegion } from "@semantik/react/dist/types";

const documentSrc =
  "https://0be2oa9du88diwba.public.blob.vercel-storage.com/assets/invoice.png";

export const boundingRegions: BoundingRegion[] = [
  {
    id: "billing_address",
    polygon: [
      [0.066, 0.395],
      [0.24, 0.395],
      [0.24, 0.43],
      [0.066, 0.43],
    ],
    content: "123 Bill St, Redmond WA, 98052",
    pageNumber: 1,
  },
  {
    id: "customer_address",
    polygon: [
      [0.066, 0.256],
      [0.24, 0.256],
      [0.24, 0.291],
      [0.066, 0.291],
    ],
    content: "123 Other St, Redmond WA, 98052",
    pageNumber: 1,
  },
  {
    id: "invoice_number",
    polygon: [
      [0.878, 0.126],
      [0.944, 0.126],
      [0.944, 0.14],
      [0.878, 0.14],
    ],
    content: "INV-100",
    pageNumber: 1,
  },
];

export default function Demo() {
  return (
    <div
      style={{
        height: 600,
      }}
    >
      <InferenceViewer
        documentSrc={documentSrc}
        boundingRegions={boundingRegions}
      />
    </div>
  );
}
