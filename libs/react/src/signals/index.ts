import { InferenceDoc } from "@/types";
import { signal } from "@preact/signals-react";

export const inferenceDocRef = signal<InferenceDoc | undefined>(undefined);
