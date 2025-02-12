import cloudinary from "../utils/cloudinary";
import { IncomingForm } from "formidable"; // Use formidable for file handling

export default defineEventHandler((event) => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(event.req, async (err, fields, files) => {
      if (err) {
        console.error("File upload error:", err);
        reject({ error: "File upload failed" });
        return;
      }

      // files.file will contain the uploaded file data
      const file = files.file[0]; // You may need to adjust this depending on your form field name

      if (!file) {
        resolve({ error: "No file uploaded" });
        return;
      }

      try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "members",
          resource_type: "auto", // This ensures that Cloudinary detects the file type automatically
        });

        // Return the uploaded file URL
        resolve({ url: result.secure_url });
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        resolve({ error: "File upload failed" });
      }
    });
  });
});
