"use client";
import fileIcon from "../assets/file-zip.svg";
import Image from "next/image";

export default function ButtonDownload({ folderName }: { folderName: string }) {
  const handleDownloadZip = async () => {
    const response = await fetch(
      `/api/download_zip?folder=folder_${folderName}`
    );
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `os_${folderName}.zip`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="group relative  ">
      <button onClick={handleDownloadZip}>
        <Image src={fileIcon} alt="Voltar" width={25} height={25} />
      </button>
      <span
        className="absolute -top-14 left-[50%] -translate-x-[50%] 
                z-20 origin-left scale-0 px-3 rounded-lg border 
              bg-blue-900 py-2 text-sm font-bold
                shadow-md transition-all duration-300 ease-in-out 
                group-hover:scale-100"
      >
        Baixar arquivos<span></span>
      </span>
    </div>
  );
}
