import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rdcumovmyyqrghkeuakp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkY3Vtb3ZteXlxcmdoa2V1YWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3OTE2NTYsImV4cCI6MjA2MDM2NzY1Nn0.Y1HcMCFAwpeCSD7UV5QXG4gNI_EyOzbGhFgnDJwd4V4"
);
export default function uploadMediaToSupabase(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("File not added");
    }
    let fileName = file.name;
    const extension = fileName.split(".")[fileName.split(".").length - 1];

    const timestamp = new Date().getTime();

    fileName = timestamp + file.name + "." + extension;

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
          .data.publicUrl;
        resolve(publicUrl);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
