import { Chip, Group } from "@mantine/core";
import { signal } from "@preact/signals-react";

export enum InferenceProviders {
  Mindee = "mindee",
  Google = "google",
  Microsoft = "microsoft",
  NoProvider = "no-provider",
}

export const INFERENCE_PROVIDERS_OPTIONS = [
  {
    label: "No provider",
    value: InferenceProviders.NoProvider,
  },
  {
    label: "Mindee",
    value: InferenceProviders.Mindee,
  },
  {
    label: "Google",
    value: InferenceProviders.Google,
    disabled: true,
  },
  {
    label: "Microsoft",
    value: InferenceProviders.Microsoft,
    disabled: true,
  },
];

const selectedInferenceProvider = signal(InferenceProviders.NoProvider);

export default function InferenceProviderSelector() {
  return (
    <Chip.Group multiple={false} value={selectedInferenceProvider.value}>
      <Group justify="center">
        {INFERENCE_PROVIDERS_OPTIONS.map((option) => (
          <Chip
            key={option.value}
            disabled={option.disabled}
            value={option.value}
            size="md"
            radius="sm"
          >
            {option.label}
          </Chip>
        ))}
      </Group>
    </Chip.Group>
  );
}
