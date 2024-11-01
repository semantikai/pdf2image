import { CSSProperties, useEffect } from "react";

import { BoundingRegion, BoundingRegionsEvents } from "@/types";

import { containerRef } from "@/signals/inference";
import { useSignalEffect, useSignals } from "@preact/signals-react/runtime";
import { currentPageIndexRef, documentPages } from "@/signals/documentPages";
import {
  boundingRegionsEventsRef,
  boundingRegionsRef,
  inferenceResultRef,
} from "@/signals/inference";
import { inferenceProcessingDocRef } from "@/signals/documentPages";
import { zoomLevelRef } from "@/signals/zoom";
import Pagination from "./ui/Pagination";
import ZoomControls from "./ui/ZoomControls";
import { twMerge } from "tailwind-merge";
import Loader from "./ui/Loader";
import { ShapeConfig } from "konva/lib/Shape";
import {
  DEFAULT_BOUNDING_REGIONS_EVENTS,
  redrawShape,
} from "@/utils/drawPolygons";
import { destroyCanvas, initCanvas } from "@/utils/canvas";
import { preProcessDocumentSrc } from "@/utils/inferenceDocument";
import { inferenceDocRef } from "@/signals";

type Props = {
  style?: CSSProperties;
  documentSrc?: string | File;
  boundingRegions?: BoundingRegion[];
  boundingRegionsEvents?: BoundingRegionsEvents;
  pageIndex?: number;
  getTotalPages?: (totalPages: number) => void;
  zoomLevel?: number;
  className?: string;
  isLoading?: boolean;
  onClearClick?: () => void;
};

export default function InferenceViewer({
  isLoading = false,
  style = {},
  documentSrc,
  boundingRegions = [],
  getTotalPages,
  pageIndex,
  zoomLevel,
  className,
  boundingRegionsEvents,
  onClearClick,
}: Props) {
  useSignals();
  useEffect(() => {
    initCanvas();
    return destroyCanvas;
  }, []);
  useEffect(() => {
    if (documentSrc) {
      preProcessDocumentSrc(documentSrc);
    }
  }, [documentSrc]);

  useSignalEffect(() => {
    if (documentPages.value.length && getTotalPages) {
      getTotalPages(documentPages.value.length);
    }
  });

  useEffect(() => {
    if (pageIndex !== undefined && Number.isInteger(pageIndex)) {
      currentPageIndexRef.value = pageIndex;
    }
  }, [pageIndex]);

  useEffect(() => {
    if (boundingRegions.length) {
      boundingRegionsRef.value = boundingRegions;
    }
  }, [boundingRegions]);

  useEffect(() => {
    if (zoomLevel !== undefined) {
      zoomLevelRef.value = zoomLevel;
    }
  }, [zoomLevel]);

  useSignalEffect(() => {
    if (boundingRegionsEventsRef.value) {
      const _boundingRegionsEvents = {
        ...DEFAULT_BOUNDING_REGIONS_EVENTS,
        ...boundingRegionsEvents,
      };
      const [event, boundingRegion] = boundingRegionsEventsRef.value;
      let shapeConfig: ShapeConfig | undefined | void;
      switch (event) {
        case "mouseenter":
          shapeConfig = _boundingRegionsEvents.onMouseEnter?.(boundingRegion);
          break;
        case "mouseleave":
          shapeConfig = _boundingRegionsEvents.onMouseLeave?.(boundingRegion);
          break;
        case "click":
          shapeConfig = _boundingRegionsEvents?.onClick?.(boundingRegion);
          break;
        default:
          break;
      }
      if (shapeConfig) {
        redrawShape(boundingRegion.id, shapeConfig);
      }
      boundingRegionsEventsRef.value = undefined;
    }
  });

  const onClearInferenceData = () => {
    inferenceDocRef.value = undefined;
    inferenceResultRef.value = undefined;
    currentPageIndexRef.value = 0;
    zoomLevelRef.value = 1;
    onClearClick?.();
  };
  return (
    <div
      style={{ minHeight: "inherit", ...style }}
      className={twMerge("flex flex-col relative w-full h-full", className)}
    >
      {inferenceDocRef.value && (
        <button
          onClick={onClearInferenceData}
          type="button"
          className="absolute top-4 right-4 z-10"
        >
          <svg
            className="w-6 h-6 text-gray-800 cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </button>
      )}

      {inferenceProcessingDocRef.value.isProcessing && (
        <Loader
          message={inferenceProcessingDocRef.value.message}
          hasError={inferenceProcessingDocRef.value.hasError}
        />
      )}
      {isLoading && <Loader message="Analyzing document..." hasError={false} />}
      <div
        className="h-full w-full flex-1"
        ref={(ref) => {
          containerRef.value = ref;
        }}
      />
      {inferenceDocRef.value && (
        <div className="flex items-center p-2 bg-white">
          <Pagination />
          <ZoomControls />
        </div>
      )}
    </div>
  );
}
