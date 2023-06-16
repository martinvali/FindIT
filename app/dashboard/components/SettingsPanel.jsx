import { FileButton, Button, Group, Text } from "@mantine/core";

export function SettingsPanel() {
  return (
    <>
      <p>Add company image: </p>;
      <Group justify="center">
        <FileButton accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>
      ;
    </>
  );
}
