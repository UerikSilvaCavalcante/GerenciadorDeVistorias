import getAllVistorias from "@/app/data/getAllVistorias";
import getVistoriaById from "@/app/data/getVistoriaById";
import MainLayout from "../../components/mainLayout";
import FormsDemanda from "@/app/components/formsDemanda";
import Link from "next/link";
import goBack from "../../assets/goBack.svg";
import Image from "next/image";
import { TipoImovel } from "@/app/enums/vistoria";

export const dynamicParams = false;

export async function generateStaticParams() {
  const res = await getAllVistorias(1);
  const params = await res.map((vistoria, index) => ({
    demandaid: vistoria.id.toString(),
  }));

  return params;
}

export default async function DemandaId({
  params,
}: {
  params: { demandaid: string };
}) {
  const { demandaid } = await params;
  const vistoria = await getVistoriaById(parseInt(demandaid));

  return (
    <div className="flex flex-col pb-3 h-full w-full">
      <div className="flex items-center justify-between mb-4 p-2 w-full bg-gradient-to-r from-indigo-800 to-blue-950">
        <div className="flex justify-center items-center px-6 border-r-4 border-zinc-50">
          <Link href="/demandas">
            <Image src={goBack} alt="Voltar" width={25} height={25} />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold">
            Vistoria de {TipoImovel[vistoria.endereco.tipoImovel]}
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-4">

      <FormsDemanda vistoria={vistoria} />
      </div>
    </div>
  );
}
