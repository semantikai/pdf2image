import { inferenceFieldsRef } from "@/signals/inference";
import type { InferenceField } from "@/types";
import { useSignals } from "@preact/signals-react/runtime";
import { ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface FieldProps {
  label?: string;
  id: string;
  children?: (field: InferenceField) => ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function Field({ label, id, children, className, style }: FieldProps) {
  useSignals();
  const field = inferenceFieldsRef.value.get(id);
  if (!field) return <div className="text-red-500">-</div>;
  return (
    <div
      style={style}
      className={twMerge(
        className,
        "flex flex-col p-4 bg-white shadow rounded-lg mb-4 last:mb-0"
      )}
    >
      {children ? (
        children(field)
      ) : (
        <>
          {" "}
          <label htmlFor={id} className="mb-2 font-bold text-sm text-gray-700">
            {label || field.label}
          </label>
          <div id={id} className="mb-2 text-gray-600">
            {field.content}
          </div>
          <span className="text-xs text-gray-500">
            Confidence: {field.confidence}
          </span>
        </>
      )}
    </div>
  );
}

interface Props {
  children: ReactNode;
  fields?: InferenceField[];
}

function InferenceFields({ children, fields = [] }: Props) {
  useEffect(() => {
    if (fields.length) {
      inferenceFieldsRef.value = new Map(
        fields.map((field) => [field.id, field])
      );
    }
  }, [fields]);
  return children;
}

InferenceFields.Field = Field;

export default InferenceFields;
