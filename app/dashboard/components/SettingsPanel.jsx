import { FileButton, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSupabase } from "@/app/providers/SupabaseProvider";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export function SettingsPanel({ company, userId, logoUrl }) {
  const [file, setFile] = useState("");
  const { supabase } = useSupabase();
  const router = useRouter();

  async function addCompanyImage(logoPath) {
    try {
      const { error: uploadError } = await supabase.storage
        .from("profileimages")
        .upload(logoPath, file, { cacheControl: "1" });

      if (uploadError) {
        notifications.show({
          title: "Something went wrong.",
          message: uploadError.message,
          color: "red",
        });
        return;
      }

      const { data: urlData, error: urlError } = await supabase.storage
        .from("profileimages")
        .getPublicUrl(logoPath);

      if (urlError) {
        notifications.show({
          title: "Something went wrong.",
          message: urlError.message,
          color: "red",
        });
        return;
      }

      const { publicUrl } = urlData;

      const { error: updateError } = await supabase
        .from("users")
        .update({ logo_url: publicUrl })
        .eq("user_id", userId);

      if (updateError) {
        notifications.show({
          title: "Something went wrong.",
          message: updateError.message,
          color: "red",
        });
        return;
      }

      notifications.show({
        title: "Successfully added company image.",
        message:
          "Please note that it might take a few minutes for the changes to take effect.",
        color: "green",
      });
    } catch (e) {
      notifications.show({
        title: "Something went wrong.",
        message: "Please refresh the page to try again.",
        color: "red",
      });
      return;
    }
  }

  async function updateCompanyImage(logoPath) {
    try {
      const { updateError } = await supabase.storage
        .from("profileimages")
        .update(logoPath, file, { cacheControl: "1" });

      if (updateError) {
        notifications.show({
          title: "Something went wrong.",
          message: updateError.message,
          color: "red",
        });
        return;
      }

      notifications.show({
        title: "Successfully updated company image.",
        message:
          "Please note that it might take a few minutes for the changes to take effect.",
        color: "green",
      });

      router.refresh();
    } catch (e) {
      notifications.show({
        title: "Something went wrong.",
        message: "Please refresh the page to try again.",
        color: "red",
      });
      return;
    }
  }

  useEffect(() => {
    if (file && file.name) {
      const logoPath = `/${userId}/logo`;
      function imageChanged() {
        if (!logoUrl) {
          addCompanyImage(logoPath);
        } else {
          updateCompanyImage(logoPath);
        }
      }

      imageChanged();
    }
  }, [file]);

  return (
    <>
      <div className="flex flex-row justify-center items-center gap-4 mb-3 md:mb-4">
        <div
          className={`w-16 h-16 rounded-md ${
            logoUrl ? "bg-transparent" : "bg-cyan-500"
          }`}
        >
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
          className="text-cyan-500 font-semibold text-3xl md:text-4xl
        "
        >
          {company}
        </p>
      </div>
      <Group justify="center" className="w-full">
        <FileButton accept="image/png,image/jpeg" onChange={setFile}>
          {(props) => (
            <button
              {...props}
              className="bg-cyan-500 hover:bg-cyan-600 transition-colors text-center text-white py-1.5 px-3 rounded-md text-xl md:text-2xl lg:py-2 lg:px-5 w-full"
            >
              Update image
            </button>
          )}
        </FileButton>
      </Group>
      {file && <p className="text-center">Picked file: {file.name}</p>}
    </>
  );
}
