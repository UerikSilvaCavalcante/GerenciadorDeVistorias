"use client";
// pages/upload.tsx
import React, { useState, useEffect, ChangeEvent } from "react";
import { uploadToCloudinary } from "../data/upload";
import { CldImage } from "next-cloudinary";
import { useQuery } from "@tanstack/react-query";

const UploadPage: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Adiciona novos arquivos e gera as URLs de preview
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);

    // Limpa o input para permitir reenvio dos mesmos arquivos, se necessário
    e.target.value = "";
  };

  // Revoga as URLs de objeto para evitar vazamentos de memória
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/list_images?folder=folder_padrao");
      const images = await res.json();
      console.log(images); // lista de imagens
      setData(images.resources);
      setIsLoading(false);
    };
    fetchImages();
  }, []);

  const handleDownloadZip = async () => {
    const response = await fetch("/api/download_zip?folder=folder_padrao");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "imagens.zip";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Função para enviar os arquivos para a API
  const handleUploadAll = async () => {
    setUploading(true);
    setMessage("");

    try {
      const results = await Promise.all(
        selectedFiles.map((file, index) => {
          return uploadToCloudinary(file, index);
        })
      );
      console.log("Uploads concluídos:", results);
      setMessage("Upload concluído com sucesso!");
      setSelectedFiles([]);
      setPreviews([]);
    } catch (error) {
      console.error(error);
      setMessage("Erro ao enviar imagens.");
    }

    setUploading(false);
  };

  return (
    <div className="bg-zinc-800 flex flex-col items-center justify-center w-full h-full p-4">
      <h1>Adicionar Fotos</h1>
      <form>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </form>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {previews.map((src, index) => (
          <div key={index} style={{ margin: "10px" }}>
            <img
              src={src}
              alt={`Preview ${index}`}
              width={150}
              height={150}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleUploadAll}
        disabled={uploading}
        style={{ marginTop: "20px" }}
      >
        {uploading ? "Enviando..." : "Enviar para o Cloudinary"}
      </button>
      {message && <p>{message}</p>}
      <div className="flex flex-wrap items-center justify-center  p-4">
        {selectedFiles.map((file, index) => (
          <div key={index} className="p-2">
            <CldImage
              src={`folder_padrao/${index}`}
              alt={`Uploaded Image ${index}`}
              width={150}
              height={150}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center p-4">
        {isLoading ? (
          <p>Carregando imagens...</p>
        ) : (
          data.map((image, index) => (
            <div key={index} className="p-2">
              <CldImage
                src={image.public_id}
                alt={`Image ${index}`}
                width={150}
                height={150}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))
        )}
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleDownloadZip}
      >
        Baixar ZIP
      </button>
    </div>
  );
};

export default UploadPage;
