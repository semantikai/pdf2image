import { BoundingRegion } from "@/types";

export const boundingRegions = [
  {
    id: "billing_address",
    polygon: [
      [0.065, 0.404],
      [0.24, 0.404],
      [0.24, 0.437],
      [0.065, 0.437],
    ],
    content: "123 Bill St, Redmond WA, 98052",
    pageNumber: 1,
  },
  {
    id: "customer_address",
    polygon: [
      [0.065, 0.277],
      [0.24, 0.277],
      [0.24, 0.31],
      [0.065, 0.31],
    ],
    content: "123 Other St, Redmond WA, 98052",
    pageNumber: 1,
  },
  {
    id: "customer_name",
    polygon: [
      [0.065, 0.388],
      [0.214, 0.388],
      [0.214, 0.402],
      [0.065, 0.402],
    ],
    content: "MICROSOFT FINANCE",
    pageNumber: 1,
  },
] satisfies BoundingRegion[];
