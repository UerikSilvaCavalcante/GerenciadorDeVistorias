import getAllVistorias from "@/app/data/getAllVistorias";
import getVistoriaById from "@/app/data/getVistoriaById";
import MainLayout from "../../components/mainLayout";
import FormsDemanda from "@/app/components/formsDemanda";
import Link from "next/link";
import goBack from "../../assets/goBack.svg";
import Image from "next/image";
import { TipoImovel } from "@/app/enums/vistoria";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { Type } from "@/app/enums/user";

interface getVistoriaProps {
  id: number,
  type: number,
  idVistoria: number,
  token: string
}

export default async function DemandaId({
  params,
}: {
  params: { demandaid: string };
}) {
  const { demandaid } = await params;
  const token = (await cookies()).get("token")?.value;
  let user: { id: string, tipo:string } | null = null;
  if (token) {
    try {
      user = jwtDecode<{ id: string, tipo:string }>(token as string);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  const getVistoria:getVistoriaProps = {
    id: parseInt(user?.id as string),
    type: Type[user?.tipo.toLowerCase() as keyof typeof Type],
    idVistoria: parseInt(demandaid),
    token: token as string
  }
  const vistoria = await getVistoriaById(
    getVistoria
  );

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
        <FormsDemanda vistoria={vistoria} token={token as string} />
      </div>
    </div>
  );
}
