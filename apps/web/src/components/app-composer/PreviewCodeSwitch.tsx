import { Center, SegmentedControl, rem } from "@mantine/core";
import { useSignals } from "@preact/signals-react/runtime";
import { IconEye, IconCode } from "@tabler/icons-react";
import { previewOrCode, PreviewCodeSwitchValue } from "./signals";

export default function PreviewCodeSwitch() {
  useSignals();
  return (
    <SegmentedControl
      value={previewOrCode.value}
      onChange={(value) => {
        console.log(value);
        previewOrCode.value = value as PreviewCodeSwitchValue;
      }}
      size="sm"
      w={200}
      m={10}
      data={[
        {
          value: PreviewCodeSwitchValue.Preview,
          label: (
            <Center style={{ gap: 10 }}>
              <IconEye style={{ width: rem(16), height: rem(16) }} />
              <span>Preview</span>
            </Center>
          ),
        },
        {
          value: PreviewCodeSwitchValue.Code,
          label: (
            <Center style={{ gap: 10 }}>
              <IconCode style={{ width: rem(16), height: rem(16) }} />
              <span>Code</span>
            </Center>
          ),
        },
      ]}
    />
  );
}
