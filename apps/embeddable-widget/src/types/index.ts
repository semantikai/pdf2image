import { MINDEE_PRODUCT_URLS } from "@/actions/getInference";

export enum InferenceFieldsTypes {
  view = "view",
  edit = "edit",
  none = "none",
}

export type MindeeProduct = keyof typeof MINDEE_PRODUCT_URLS;
