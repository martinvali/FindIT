import { FileButton, Button, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSupabase } from "@/app/providers/SupabaseProvider";

export function SettingsPanel({ company, userId, logoUrl }) {
  const [file, setFile] = useState("");
  const { supabase } = useSupabase();

  console.log(logoUrl);

  async function addCompanyImage(logoPath) {
    const { uploadResponse, uploadError } = await supabase.storage
      .from("profileimages")
      .upload(logoPath, file);

    console.log("Upload:", uploadResponse, uploadError);

    const urlResponse = await supabase.storage
      .from("profileimages")
      .getPublicUrl(logoPath);

    console.log("URLresponse", urlResponse);

    const { publicUrl } = urlResponse.data;

    console.log("publicurl", publicUrl);

    const { saveUrlResponse, saveUrlError } = await supabase
      .from("users")
      .insert({
        user_id: userId,
        logo_url: publicUrl,
      });

    console.log("Saveurl", saveUrlResponse, saveUrlError);

    const { userResponse, userError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl },
    });

    console.log("user", userResponse, userError);
  }

  async function updateCompanyImage(logoPath) {
    await supabase.storage.from("profileimages").update(logoPath, file);
  }

  useEffect(() => {
    if (file && file.name) {
      const logoPath = `/${userId}/logo`;
      async function imageChanged() {
        if (!logoUrl) {
          const response = await addCompanyImage(logoPath);
        } else {
          const response = await updateCompanyImage(logoPath);
        }
      }

      imageChanged();
    }
  }, [file]);

  return (
    <>
      {logoUrl ? (
        <div className="max-w-xs">
          <img src={logoUrl} alt={company} />
        </div>
      ) : (
        company && <div>{company[0].toUpperCase()}</div>
      )}
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
