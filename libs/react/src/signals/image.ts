import resizeStage from "@/utils/resizeStage";
import { computed, effect, signal } from "@preact/signals-react";
import {
  currentPageIndexRef,
  documentPages,
  inferenceProcessingDocRef,
} from "./documentPages";
import { Layer } from "konva/lib/Layer";
import { Image as KonvaImage } from "konva/lib/shapes/Image";
import computeImageBoundingBox from "@/utils/computeBoundingBox";
import { containerRef } from "./inference";

export const imageLayerRef = signal(
  new Layer({
    listening: false,
  })
);

export const imageShapeRef = signal<KonvaImage | undefined>(undefined);
export const imageObjRef = signal<HTMLImageElement>(new Image());

export const inferenceImageRef = computed(
  () => documentPages.value?.[currentPageIndexRef.value]
);

export const imageBoundingBoxRef = computed(() => {
  if (!containerRef.value) return;
  return computeImageBoundingBox(containerRef.value, imageObjRef.value);
});

const loadImage = (image: string) => {
  imageObjRef.value.onload = () => {
    imageLayerRef.value.destroyChildren();
    const imageShape = new KonvaImage({
      width: imageObjRef.value.width,
      height: imageObjRef.value.height,
      image: imageObjRef.value,
    });
    imageLayerRef.value.add(imageShape);
    imageLayerRef.value.draw();
    resizeStage();
    inferenceProcessingDocRef.value = {
      isProcessing: false,
      message: "",
    };
  };
  imageObjRef.value.src = image;
};

effect(() => {
  if (inferenceImageRef.value) {
    inferenceProcessingDocRef.value = {
      isProcessing: true,
      message: "Drawing image...",
    };
    loadImage(inferenceImageRef.value);
  } else {
    if (imageLayerRef.value.children.length) {
      imageLayerRef.value.destroyChildren();
    }
  }
});
