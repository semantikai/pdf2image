import type { Meta, StoryObj } from "@storybook/react";
import { InferenceViewer } from "@/main.js";
import imageInvoice from "./examples/image-invoice";
import pdfInvoice from "./examples/pdf-invoice";
import multiPagePdfInvoice from "./examples/multi-pdf-invoice";

const remotePDF =
  "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-invoice.pdf";

const meta = {
  title: "Example/InferenceViewer",
  component: InferenceViewer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    style: {
      control: {
        type: "object",
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof InferenceViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const LocalImage: Story = {
  args: {
    ...imageInvoice,
  },
};

export const LocalPDF: Story = {
  args: {
    ...pdfInvoice,
  },
};

export const MultiPageLocalPDF: Story = {
  args: {
    ...multiPagePdfInvoice,
  },
};

export const RemoteImage: Story = {
  args: {},
};

export const RemotePDF: Story = {
  args: {
    documentSrc: remotePDF,
  },
};

export const FileImage: Story = {
  args: {},
};

export const FilePDF: Story = {
  args: {},
};
