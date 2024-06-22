export type PolygonCoordinates =
  | Array<number[]>
  | Array<{ x: number; y: number }>
  | Array<number>;

export type BoundingRegion = {
  style?: {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
  };
  extra?: Record<string, any>;
  content?: string;
  polygon: PolygonCoordinates;
  pageNumber: number;
  id: string;
};

export enum DocType {
  PDF = "pdf",
  IMAGE = "image",
  OTHER = "other",
}

export type InferenceDoc = {
  file?: File;
  type: DocType;
  url: string;
};

export type InferenceResult = {
  fields: InferenceField[];
  boundingRegions: BoundingRegion[];
};

export type InferenceField = {
  label: string;
  id: string;
  confidence?: number;
  pageNumber?: number;
  content?: string;
  items?: InferenceFieldItem[];
};

export type InferenceFieldItem = {
  label: string;
  id: string;
  confidence: number;
  pageNumber: number;
  content: string;
};
