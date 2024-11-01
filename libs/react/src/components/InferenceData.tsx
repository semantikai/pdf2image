import { inferenceFieldsRef } from "@/signals/inference";
import type { BoundingRegionsEvents, InferenceField } from "@/types";
import { useSignals } from "@preact/signals-react/runtime";
import { CSSProperties, ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";

const FieldViewer = ({
  field,
  style,
  className,
}: {
  className?: string;
  style?: CSSProperties;
  field: InferenceField;
}) => (
  <div
    className={twMerge(
      "grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4 flex flex-col",
      className
    )}
    style={style}
  >
    <div className="">
      <dt className="font-medium text-gray-900">Label</dt>
      <dd className="text-gray-500 sm:col-span-2">{field.label}</dd>
    </div>
    <div className="">
      <dt className="font-medium text-gray-900">Content</dt>
      <dd className="text-gray-500 sm:col-span-2">{field.content}</dd>
    </div>
    <div className="">
      <dt className="font-medium text-gray-900">Confidence</dt>
      <dd className="text-gray-500 sm:col-span-2">{field.confidence || "-"}</dd>
    </div>
  </div>
);

function Field({
  id,
  children,
  ...props
}: {
  id: string;
  children?: (
    field: InferenceField,
    status?: keyof BoundingRegionsEvents
  ) => ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  useSignals();
  const field = inferenceFieldsRef.value.get(id);

  if (!field) return <div className="text-red-500">-</div>;
  return children ? children(field) : <FieldViewer field={field} {...props} />;
}

interface Props {
  children: ReactNode | ((fields: InferenceField[]) => ReactNode);
  fields?: InferenceField[];
  className?: string;
}

function InferenceData({ children, fields = [], className }: Props) {
  useSignals();
  useEffect(() => {
    if (fields.length) {
      inferenceFieldsRef.value = new Map(
        fields.map((field) => [field.id, field])
      );
    }
  }, [fields]);
  return (
    <div
      className={twMerge("-my-3 divide-y divide-gray-100 text-sm", className)}
    >
      {typeof children === "function"
        ? children(Array.from(inferenceFieldsRef.value.values()))
        : children}
    </div>
  );
}

InferenceData.Field = Field;
InferenceData.FieldViewer = FieldViewer;

export default InferenceData;
