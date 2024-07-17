import { inferenceDocRef } from "@/signals";
import { InferenceDoc } from "@/types";
import { getInferenceDocFromFile } from "@/utils/inferenceDocument";
import { useSignals } from "@preact/signals-react/runtime";
import { CSSProperties, ReactNode, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
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
  useSignals();
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: !!inferenceDocRef.value,
  });

  return (
    <div
      style={style}
      className={twMerge(
        "flex h-full w-full flex-col items-center justify-center min-h-[300px] min-w-[300px] bg-gray-50 rounded-sm border-2 border-gray-200",
        !inferenceDocRef.value && "border-dashed hover:border-gray-300",
        className
      )}
      {...getRootProps()}
    >
      {inferenceDocRef.value ? (
        children
      ) : (
        <>
          <input {...getInputProps()} aria-label="File upload" />
          <div className="text-center">
            <svg
              className="mx-auto w-10 h-10 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 5v9m-5 0H5a1 1 0 001 1h12a1 1 0 001-1h-2M8 9l4-5 4 5m1 8h.01"></path>
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              {isDragActive ? (
                <span className="font-semibold">Release to upload</span>
              ) : (
                <>
                  <span className="font-semibold">Drag and drop</span> files
                  here, or{" "}
                  <span className="font-semibold">click to select</span> files
                </>
              )}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
