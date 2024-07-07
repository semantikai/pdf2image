import { inferenceDocRef } from "@/signals";

import { InferenceDoc } from "@/types";
import { getInferenceDocFromFile } from "@/utils/inferenceDocument";

import { CSSProperties, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  onDropFile?: (inferenceDoc: InferenceDoc) => void;
  className?: string;
  style?: CSSProperties;
};

export default function InferenceDropzone({
  children,
  onDropFile,
  className,
  style,
}: Props) {
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
    <div
      style={style}
      className={twMerge(
        "flex h-full w-full flex-col min-h-[300px] min-w-[300px] bg-gray-100",
        className
      )}
    >
      {inferenceDocRef.value ? (
        children
      ) : (
        <div className="flex h-full w-full flex-co" {...getRootProps()}>
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
