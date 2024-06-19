import { InferenceViewer } from "@/main";
import { BoundingRegion } from "@/types";
import { useState } from "react";

export default function InferenceViewerWithControlledPageIndex({
  boundingRegions,
  documentSrc,
}: {
  boundingRegions: BoundingRegion[];
  documentSrc: string | File;
}) {
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const [currentPageIndex, setPageIndex] = useState(0);
  const onIncrementPage = () => {
    if (totalPages !== undefined && currentPageIndex < totalPages) {
      setPageIndex(currentPageIndex + 1);
    }
  };
  const onDecrementPage = () => {
    if (currentPageIndex > 0) {
      setPageIndex(currentPageIndex - 1);
    }
  };
  return (
    <>
      <InferenceViewer
        documentSrc={documentSrc}
        boundingRegions={boundingRegions}
        pageIndex={currentPageIndex}
        getTotalPages={(totalPages) => setTotalPages(totalPages)}
      />
      <div className="flex items-center justify-center space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onIncrementPage}
        >
          + 1
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onDecrementPage}
        >
          - 1
        </button>
      </div>
    </>
  );
}
