import { Group } from "@mantine/core";

interface Props {
  documents: string[];
}

export default function DocumentExplorer({ documents }: Props) {
  return (
    <Group>
      <h1>Document Explorer</h1>
    </Group>
  );
}
