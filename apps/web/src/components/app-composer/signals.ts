import { signal } from "@preact/signals-react";

export enum PreviewCodeSwitchValue {
  Preview = "preview",
  Code = "code",
}

export const previewOrCode = signal<PreviewCodeSwitchValue>(
  PreviewCodeSwitchValue.Preview
);

export enum COMPOSER_OPTIONS {
  Uploader = "uploader",
  JsonResult = "json-result",
  FieldsViewer = "fields-viewer",
}

export enum StateTypeValue {
  Standalone = "standalone",
  ControlledState = "controlled-state",
}

export const SelectedStateType = signal<StateTypeValue>(
  StateTypeValue.Standalone
);

export const composerSelectOptions = signal<COMPOSER_OPTIONS[]>([]);
export const onOptionClick = (option: COMPOSER_OPTIONS) => {
  if (composerSelectOptions.value.includes(option)) {
    composerSelectOptions.value = composerSelectOptions.value.filter(
      (opt) => opt !== option
    );
  } else {
    composerSelectOptions.value = [...composerSelectOptions.value, option];
  }
};
