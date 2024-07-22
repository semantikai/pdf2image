import { CodeHighlight } from "@mantine/code-highlight";
import "@mantine/code-highlight/styles.css";
// @ts-ignore
import Demo from "!!raw-loader!./app-viewer/InferenceViewerDemo";

export default function CodeViewer() {
  return <CodeHighlight code={Demo} language="tsx" />;
}
