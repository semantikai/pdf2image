import type { Preview } from "@storybook/react";

const style = {
  height: 800,
  width: "90vw",
  margin: 20,
  border: "1px solid #E5E7EB",
  borderRadius: 4,
};
const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={style}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
