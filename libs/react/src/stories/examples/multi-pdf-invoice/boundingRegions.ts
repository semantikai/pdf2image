import { BoundingRegion } from "@/types";

export const boundingRegions = [
  {
    id: "billing_address",
    polygon: [
      [0.095, 0.912],
      [0.161, 0.912],
      [0.161, 0.935],
      [0.095, 0.935],
    ],
    content: "5Any",
    pageNumber: 1,
  },
  {
    id: "due_date",
    polygon: [
      [0.442, 0.378],
      [0.555, 0.378],
      [0.555, 0.395],
      [0.442, 0.395],
    ],
    content: "2013-09-30",
    pageNumber: 2,
  },
  {
    id: "date",
    polygon: [
      [0.219, 0.111],
      [0.321, 0.111],
      [0.321, 0.132],
      [0.219, 0.132],
    ],
    content: "2016-06-05",
    pageNumber: 1,
  },
] satisfies BoundingRegion[];
