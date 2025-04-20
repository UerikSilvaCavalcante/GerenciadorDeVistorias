"use client";
import fileIcon from "../assets/file-download.svg";
import Image from "next/image";
import { toast } from "sonner";

export default function ButtonDownload({
  folderName,
  id,
}: {
  folderName: string;
  id: string;
}) {
  const handleDownloadZip = async () => {
    toast.promise(
      fetch(`/api/download_zip?folder=folder_${folderName}&id=${id}`).then(
        async (res) => {
          if (!res.ok) {
            throw new Error("Falha ao baixar o arquivo");
          }
          const blob = res.blob();
          const url = URL.createObjectURL(await blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = `os_${folderName}.zip`;
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      ),
      {
        loading: "Baixando arquivo...",
        success: "Arquivo baixado com sucesso!",
        error: (error) => {
          console.error(error);
          return "Falha ao baixar o arquivo";
        },
      }
    );
  };

  return (
    <div className="group relative flex justify-center items-center  ">
      <button onClick={handleDownloadZip}>
        <Image src={fileIcon} alt="Voltar" width={25} height={25} />
      </button>
      <span
        className="absolute -top-14 left-[50%] -translate-x-[50%] 
                z-20 origin-left scale-0 px-3 rounded-lg text-nowrap 
              bg-blue-900 py-2 text-sm font-bold text-center
                shadow-md transition-all duration-300 ease-in-out 
                group-hover:scale-100"
      >
        Baixar arquivos<span></span>
      </span>
    </div>
  );
}
