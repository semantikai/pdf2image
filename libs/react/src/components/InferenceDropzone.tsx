import { inferenceDocRef } from "@/signals";

import { InferenceDoc } from "@/types";
import { getInferenceDocFromFile } from "@/utils/inferenceDocument";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  children: React.ReactNode;
  onDropFile?: (inferenceDoc: InferenceDoc) => void;
};

export default function InferenceDropzone({ children, onDropFile }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        const uploadInferenceDoc = getInferenceDocFromFile(acceptedFiles[0]);
        onDropFile?.(uploadInferenceDoc);
        inferenceDocRef.value = uploadInferenceDoc;
      }
    },
    [onDropFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex h-full w-full flex-col">
      {inferenceDocRef.value ? (
        children
      ) : (
        <div
          className="flex h-full w-full flex-col bg-green-300"
          {...getRootProps()}
        >
          {<input {...getInputProps()} />}
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      )}
    </div>
  );
}
