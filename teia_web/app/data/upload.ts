export const uploadToCloudinary = async (
  file: File,
  id: number,
  folder: string
) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = "next-cloudinary-preset";
  const folderName = `folder_${folder}/fotos`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("public_id", id.toString());
  formData.append("folder", folderName);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data; // retorna a URL, public_id, etc
};
