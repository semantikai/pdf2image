import { Tabs } from "@mantine/core";
import Image from "next/image";

export enum Frameworks {
  React = "react",
  Angular = "angular",
  Vue = "vue",
  Svelte = "svelte",
  JavaScript = "javascript",
}

const FRAMEWORKS_OPTIONS = [
  {
    label: "React",
    value: Frameworks.React,
  },
  {
    label: "Vue",
    value: Frameworks.Vue,
    disabled: true,
  },
  {
    label: "Vanilla JS",
    value: Frameworks.JavaScript,
    disabled: true,
  },
  {
    label: "Angular",
    value: Frameworks.Angular,
    disabled: true,
  },
  {
    label: "Svelte",
    value: Frameworks.Svelte,
    disabled: true,
  },
];

export default function FrameworkSelector() {
  return (
    <Tabs defaultValue={Frameworks.React}>
      <Tabs.List>
        {FRAMEWORKS_OPTIONS.map((option) => (
          <Tabs.Tab
            leftSection={
              <Image
                src={`/icons/${option.value}.svg`}
                alt={`${option.value} icon`}
                width={20}
                height={20}
              />
            }
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      <Tabs.Panel value="first">First panel</Tabs.Panel>
      <Tabs.Panel value="second">Second panel</Tabs.Panel>
    </Tabs>
  );
}
