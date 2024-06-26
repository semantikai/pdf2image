import { CSSProperties, useEffect } from "react";

import { BoundingRegion, BoundingRegionsEvents } from "@/types";

import { containerRef } from "@/signals";
import { useSignals } from "@preact/signals-react/runtime";
import { currentPageIndexRef, documentPages } from "@/signals/documentPages";
import {
  boundingRegionsEventsRef,
  boundingRegionsRef,
} from "@/signals/inference";
import { inferenceProcessingDocRef } from "@/signals/documentPages";
import { effect } from "@preact/signals-react";
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

type Props = {
  style?: CSSProperties;
  documentSrc?: string | File;
  boundingRegions?: BoundingRegion[];
  boundingRegionsEvents?: BoundingRegionsEvents;
  pageIndex?: number;
  getTotalPages?: (totalPages: number) => void;
  zoomLevel?: number;
  className?: string;
};

export default function InferenceViewer({
  style,
  documentSrc,
  boundingRegions = [],
  getTotalPages,
  pageIndex,
  zoomLevel,
  className,
  boundingRegionsEvents,
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

  effect(() => {
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

  effect(() => {
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
  return (
    <div
      style={style}
      className={twMerge(className, "flex h-full w-full flex-col relative")}
    >
      {inferenceProcessingDocRef.value.isProcessing && <Loader />}
      <div
        className="w-full h-full bg-gray-100 dark:bg-gray-800"
        ref={(ref) => {
          containerRef.value = ref;
        }}
      />
      <div className="flex items-center p-2">
        <Pagination />
        <ZoomControls />
      </div>
    </div>
  );
}
