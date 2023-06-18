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
      <div className="flex flex-row items-center gap-4 mb-5">
        {logoUrl ? (
          <div className="w-16 h-16">
            <img
              src={logoUrl}
              alt={company}
              className="rounded-md w-full h-full"
            />
          </div>
        ) : (
          company && <p>{company[0].toUpperCase()}</p>
        )}
        <p
          className="text-cyan-500 font-semibold text-3xl
        "
        >
          {company}
        </p>
      </div>
      <Group justify="center">
        <FileButton accept="image/png,image/jpeg" onChange={setFile}>
          {(props) => (
            <Button className="w-full" {...props}>
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
