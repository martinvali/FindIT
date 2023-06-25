import { FileButton, Button, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSupabase } from "@/app/providers/SupabaseProvider";

export function SettingsPanel({ company, userId, logoUrl }) {
  const [file, setFile] = useState("");
  const { supabase } = useSupabase();

  async function addCompanyImage(logoPath) {
    const { uploadResponse, uploadError } = await supabase.storage
      .from("profileimages")
      .upload(logoPath, file, { cacheControl: "1" });

    console.log("Upload:", uploadResponse, uploadError);

    const urlResponse = await supabase.storage
      .from("profileimages")
      .getPublicUrl(logoPath);

    console.log("URLresponse", urlResponse);

    console.log("user id ", userId);
    const { publicUrl } = urlResponse.data;

    console.log("publicurl", publicUrl);

    const saveUrlResponse = await supabase
      .from("users")
      .update({ logo_url: publicUrl })
      .eq("user_id", userId);

    console.log("last response", saveUrlResponse);
  }

  async function updateCompanyImage(logoPath) {
    const updateResponse = await supabase.storage
      .from("profileimages")
      .update(logoPath, file, { cacheControl: "1" });

    console.log("Update", updateResponse);
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
      <div className="flex flex-row justify-center items-center gap-4">
        <div className="w-16 h-16 rounded-md bg-cyan-500">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={company}
              className="rounded-md w-full h-full"
            />
          ) : (
            company && (
              <p className="w-full h-full text-center flex items-center justify-center text-white text-4xl">
                {company[0].toUpperCase()}
              </p>
            )
          )}
        </div>

        <p
          className="text-cyan-500 font-semibold text-3xl
        "
        >
          {company}
        </p>
      </div>
      <Group justify="center" className="w-full">
        <FileButton
          accept="image/png,image/jpeg"
          onChange={setFile}
          color="#06b6d4"
          className="!w-full !text-lg max-w-md"
        >
          {(props) => (
            <Button className="!w-full" {...props}>
              Update image
            </Button>
          )}
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
