"use client";

import downloadIcon from "../assets/download.svg";
import { useQuery } from "@tanstack/react-query";
import { CldImage } from "next-cloudinary";
import { ColumnContent } from "./UI/columnContent";
import { RowContent } from "./UI/rowContent";
import Image from "next/image";

const handleDownload = async (url: string, filename: string) => {
  try {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Erro ao baixar a imagem:", error);
  }
};

export default function ImageContent({ folderName }: { folderName: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await fetch(`/api/list_images?folder=folder_${folderName}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data.resources;
    },
  });
  return (
    <RowContent>
      <ColumnContent>
        <div className="flex flex-wrap items-center justify-center p-4 pdf">
          {isLoading ? (
            <div className="flex justify-center items-center h-[200px] ">
              <div className="flex flex-col items-center">
                <svg viewBox="25 25 50 50" className="svgCircle">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
              </div>
            </div>
          ) : (
            data.map((image, index) => (
              <div
                key={index}
                className="p-2 flex flex-col items-center justify-center gap-2"
              >
                <CldImage
                  src={image.public_id}
                  alt={`Image ${index}`}
                  width={180}
                  height={180}
                  style={{ objectFit: "cover" }}
                />
                <button
                  onClick={() =>
                    handleDownload(image.url, `image_${index}.jpg`)
                  }
                  className="p-1 bg-blue-700 rounded"
                >
                  <Image
                    src={downloadIcon}
                    alt="Download"
                    width={15}
                    height={15}
                    className=""
                  />
                </button>
              </div>
            ))
          )}
        </div>
      </ColumnContent>
    </RowContent>
  );
}
