"use client";
import {
  Card,
  Divider,
  Grid,
  Paper,
  Stack,
  useMantineTheme,
} from "@mantine/core";

import FrameworkSelector from "./FrameworkSelector";
import { useSignals } from "@preact/signals-react/runtime";
import CodeViewer from "./CodeViewer";
import AppViewer from "./app-viewer";
import PreviewCodeSwitch from "./PreviewCodeSwitch";
import { PreviewCodeSwitchValue, previewOrCode } from "./signals";
import ComposerOptions from "./ComposerOptions";

export default function AppComposer() {
  const theme = useMantineTheme();
  useSignals();
  return (
    <Stack gap={20}>
      <FrameworkSelector />
      <Grid>
        <Grid.Col span={8}>
          <Paper withBorder radius="xs">
            <PreviewCodeSwitch />
            <Divider />
            <Stack
              h={600}
              style={{
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  display:
                    previewOrCode.value === PreviewCodeSwitchValue.Code
                      ? "block"
                      : "none",
                }}
              >
                <CodeViewer />
              </div>
              <div
                style={{
                  display:
                    previewOrCode.value === PreviewCodeSwitchValue.Preview
                      ? "block"
                      : "none",
                }}
              >
                <AppViewer />
              </div>
            </Stack>
          </Paper>
        </Grid.Col>
        <Grid.Col span="auto">
          <ComposerOptions />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
