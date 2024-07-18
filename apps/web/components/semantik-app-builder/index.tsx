import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { useSignal } from "@preact/signals-react";

enum Framework {
  React = "react",
  Vue = "vue",
  Angular = "angular",
  Svelte = "svelte",
}
const FRAMEWORKS_OPTIONS = [
  { label: "React", value: Framework.React },
  { label: "Vue", value: Framework.Vue },
  { label: "Angular", value: Framework.Angular },
  { label: "Svelte", value: Framework.Svelte },
];
const frameworkRef = useSignal<`${Framework}`>(Framework.React);
export default function SemantikAppBuilder() {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3"></CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider />
      <CardFooter></CardFooter>
    </Card>
  );
}
