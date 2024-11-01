import "./index.css";
import InferenceViewer from "./components/InferenceViewer";
import InferenceDropzone from "./components/InferenceDropzone";

import InferenceData from "./components/InferenceData";

import InferenceProvider from "./components/InferenceProvider";

export { InferenceViewer, InferenceDropzone, InferenceData, InferenceProvider };

const Inference = {
  Provider: InferenceProvider,
  Viewer: InferenceViewer,
  Data: InferenceData,
  Field: InferenceData.Field,
  FieldViewer: InferenceData.FieldViewer,
  Dropzone: InferenceDropzone,
};

export default Inference;
