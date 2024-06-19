import { CSSProperties, useEffect } from "react";

import { BoundingRegion } from "@/types";

import getInferenceDoc from "@/utils/getInferenceDoc";
import { containerRef, inferenceDocRef, stageRef } from "@/signals";
import { useSignals } from "@preact/signals-react/runtime";
import initStage from "@/utils/initStage";
import { currentPageIndexRef, documentPages } from "@/signals/documentPages";
import { boundingRegionsRef } from "@/signals/inference";
import {
  clearInferenceProcessingDoc,
  inferenceProcessingDocRef,
} from "@/signals/documentPages";
import { effect } from "@preact/signals-react";
import { zoomLevelRef } from "@/signals/zoom";
import Pagination from "./ui/Pagination";
import ZoomControls from "./ui/ZoomControls";
import resizeStage from "@/utils/resizeStage";
import { twMerge } from "tailwind-merge";
import Loader from "./ui/Loader";

type BoundingRegionsEvents = {
  onClick?: (boundingRegion: BoundingRegion) => void;
  onMouseEnter?: (boundingRegion: BoundingRegion) => void;
  onMouseLeave?: (boundingRegion: BoundingRegion) => void;
};

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
}: Props) {
  useSignals();
  useEffect(() => {
    initStage();
    return () => {
      containerRef.value = null;
      inferenceDocRef.value = undefined;
      stageRef.value?.destroy();
      window.removeEventListener("resize", resizeStage);
      clearInferenceProcessingDoc();
    };
  }, []);
  useEffect(() => {
    if (documentSrc) {
      inferenceProcessingDocRef.value = {
        isProcessing: true,
        message: "Drawing image...",
      };
      getInferenceDoc(documentSrc)
        .then((inferenceDoc) => {
          inferenceDocRef.value = inferenceDoc;
          inferenceProcessingDocRef.value = {
            isProcessing: false,
            message: "",
          };
        })
        .catch((e) => {
          if (e instanceof Error) {
            console.error(e.message);
            inferenceProcessingDocRef.value = {
              isProcessing: false,
              hasError: true,
              message: "Error processing document.",
            };
          }
        });
    }
  }, [documentSrc]);

  effect(() => {
    if (documentPages.value.length && getTotalPages) {
      getTotalPages(documentPages.value.length);
    }
  });

  useEffect(() => {
    if (pageIndex !== undefined && Number.isInteger(pageIndex)) {
      console.log("pageIndex", pageIndex);
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
