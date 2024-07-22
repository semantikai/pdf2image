import { Container, Text, Button, Group } from "@mantine/core";

import AppComposer from "@/components/app-composer";

export default function Home() {
  return (
    <Container
      h="100vh"
      display="flex"
      component="main"
      size={1100}
      style={{ flexDirection: "column", justifyContent: "center" }}
    >
      <Text fz={35} fw={700}>
        A{" "}
        <Text
          fw={800}
          fz={40}
          component="span"
          variant="gradient"
          gradient={{ from: "blue", to: "green" }}
          inherit
        >
          fully featured
        </Text>{" "}
        Frontend SDK for Document Processing
      </Text>

      <Text color="dimmed">
        Streamline your document processing workflow like never before with our
        powerful Frontend SDK.
      </Text>

      <AppComposer />
    </Container>
  );
}
