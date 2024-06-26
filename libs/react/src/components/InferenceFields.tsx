import { inferenceFieldsRef } from "@/signals/inference";
import type { BoundingRegionsEvents, InferenceField } from "@/types";
import { useSignals } from "@preact/signals-react/runtime";
import { ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface FieldProps {
  id: string;
  children?: (
    field: InferenceField,
    status?: keyof BoundingRegionsEvents
  ) => ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const FieldViewer = ({
  field,
  style,
  className,
}: {
  className?: string;
  style?: React.CSSProperties;
  field: InferenceField;
}) => (
  <div
    style={style}
    className={twMerge(
      className,
      "flex flex-col p-4 bg-white shadow rounded-lg mb-4 last:mb-0"
    )}
  >
    <label htmlFor={field.id} className="mb-2 font-bold text-sm text-gray-700">
      {field.label}
    </label>
    <div id={field.id} className="mb-2 text-gray-600">
      {field.content}
    </div>
    <span className="text-xs text-gray-500">
      Confidence: {field.confidence}
    </span>
  </div>
);

function Field({ id, children, ...props }: FieldProps) {
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

function InferenceFields({ children, fields = [], className }: Props) {
  useSignals();
  useEffect(() => {
    if (fields.length) {
      inferenceFieldsRef.value = new Map(
        fields.map((field) => [field.id, field])
      );
    }
  }, [fields]);
  return (
    <div className={className}>
      {typeof children === "function"
        ? children(Array.from(inferenceFieldsRef.value.values()))
        : children}
    </div>
  );
}

InferenceFields.Field = Field;
InferenceFields.FieldViewer = FieldViewer;

export default InferenceFields;
