import { InferenceViewer } from "@/main";
import { BoundingRegion } from "@/types";
import { useState } from "react";

export default function InferenceViewerWithControlledZoom({
  boundingRegions,
  documentSrc,
}: {
  boundingRegions: BoundingRegion[];
  documentSrc: string | File;
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  return (
    <>
      <InferenceViewer
        documentSrc={documentSrc}
        boundingRegions={boundingRegions}
        // zoomLevel={zoomLevel}
      />
      <div className="flex items-center justify-center space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setZoomLevel(zoomLevel + 0.1)}
        >
          +
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setZoomLevel(zoomLevel - 0.1)}
        >
          -
        </button>
      </div>
    </>
  );
}
