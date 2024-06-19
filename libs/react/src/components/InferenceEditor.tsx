import { onZoomIn, onZoomOut } from "@/signals/zoom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function InferenceEditor({ children }: Props) {
  return (
    <div>
      {children}
      <button onClick={onZoomIn}>Zoom in</button>
      <button onClick={onZoomOut}>Zoom out</button>
    </div>
  );
}
