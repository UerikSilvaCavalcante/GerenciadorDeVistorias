export const uploadToCloudinary = async (file: File, id:number) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = "next-cloudinary-preset";
  const folder = 'folder_padrao'; // nome do folder (será criado automaticamente se não existir)

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('public_id', id.toString());
  formData.append('folder', folder);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data; // retorna a URL, public_id, etc
};
