import { imageLayerRef, imageObjRef } from "@/signals";
import resizeStage from "@/utils/resizeStage";
import { computed, effect } from "@preact/signals-react";
import {
  currentPageIndexRef,
  documentPages,
  inferenceProcessingDocRef,
} from "./documentPages";
import { Image } from "konva/lib/shapes/Image";

export const inferenceImageRef = computed(
  () => documentPages.value?.[currentPageIndexRef.value]
);

const loadImage = (image: string) => {
  imageObjRef.value.onload = () => {
    imageLayerRef.value.destroyChildren();
    const imageShape = new Image({
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
