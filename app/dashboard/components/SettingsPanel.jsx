import { FileButton, Button, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSupabase } from "@/app/providers/SupabaseProvider";

export function SettingsPanel({ company, userId }) {
  const [file, setFile] = useState("");
  const { supabase } = useSupabase();

  async function addCompanyImage() {
    const filePath = `/${userId}/logo`;

    const { uploadResponse, uploadError } = await supabase.storage
      .from("profileimages")
      .upload(filePath, file);

    const { urlResponse, urlError } = await supabase.storage
      .from("profileimages")
      .getPublicUrl(filePath);

    const url = urlResponse.data;
    console.log(url);

    const { userResponse, userError } = await supabase.auth.updateUser({
      data: { avatar_url: url },
    });
  }

  async function updateCompanyImage() {
    return await supabase.storage
      .from("profileimages")
      .insert(`/${userId}/logo`, file);
  }

  useEffect(() => {
    if (file.name) {
      async function imageChanged() {
        const response = await addCompanyImage();
        console.log(data, error);
      }
      imageChanged();
    }
  }, [file]);

  return (
    <>
      <p>{company}</p>
      <Group justify="center">
        <FileButton accept="image/png,image/jpeg" onChange={setFile}>
          {(props) => <Button {...props}>Update image</Button>}
        </FileButton>
      </Group>
      {file && (
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )}
    </>
  );
}
