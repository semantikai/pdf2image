import {
  Center,
  Chip,
  Fieldset,
  Group,
  rem,
  SegmentedControl,
  Stack,
} from "@mantine/core";
import {
  COMPOSER_OPTIONS,
  composerSelectOptions,
  onOptionClick,
  StateTypeValue,
} from "./signals";
import { useSignals } from "@preact/signals-react/runtime";
import {
  IconAdjustmentsAlt,
  IconAutomation,
  IconEye,
} from "@tabler/icons-react";
import InferenceProviderSelector from "./InferenceProviderSelector";

const STATE_TYPE_OPTIONS = [
  {
    value: StateTypeValue.Standalone,
    label: (
      <Center style={{ gap: 10 }}>
        <IconAutomation style={{ width: rem(16), height: rem(16) }} />
        <span>Standalone</span>
      </Center>
    ),
  },
  {
    value: StateTypeValue.ControlledState,
    label: (
      <Center style={{ gap: 10 }}>
        <IconAdjustmentsAlt style={{ width: rem(16), height: rem(16) }} />
        <span>Controlled state</span>
      </Center>
    ),
  },
];

export default function ComposerOptions() {
  useSignals();
  return (
    <Stack>
      <SegmentedControl data={STATE_TYPE_OPTIONS} />
      <Fieldset legend="Select and inference provider">
        <InferenceProviderSelector />
      </Fieldset>
      <Fieldset legend="Selected components">
        <Group>
          <Chip
            color="lime"
            variant="outline"
            radius="md"
            checked={composerSelectOptions.value.includes(
              COMPOSER_OPTIONS.Uploader
            )}
            onChange={() => onOptionClick(COMPOSER_OPTIONS.Uploader)}
          >
            Uploader
          </Chip>
          <Chip
            color="lime"
            variant="outline"
            radius="md"
            checked={composerSelectOptions.value.includes(
              COMPOSER_OPTIONS.JsonResult
            )}
            onChange={() => onOptionClick(COMPOSER_OPTIONS.JsonResult)}
          >
            Json Result
          </Chip>
          <Chip
            color="lime"
            variant="outline"
            radius="md"
            checked={composerSelectOptions.value.includes(
              COMPOSER_OPTIONS.FieldsViewer
            )}
            onChange={() => onOptionClick(COMPOSER_OPTIONS.FieldsViewer)}
          >
            Fields Viewer
          </Chip>
        </Group>
      </Fieldset>
    </Stack>
  );
}
