import { jwtDecode } from "jwt-decode";
import MainLayout from "../../components/mainLayout";
import { cookies } from "next/headers";
import getVistoriaById from "../../data/getVistoriaById";
import { status, Type } from "@/app/enums/user";
import FormsComplete from "@/app/components/formsComplete";
import { Status } from "@/app/enums/vistoria";
import getImovel from "@/app/data/getImovel";

interface getVistoriaProps {
  id: number;
  type: number;
  idVistoria: number;
  token: string;
}

export default async function DemandaId({
  params,
}: {
  params: Promise<{ demandaId: string }>;
}) {
  const { demandaId } = await params;
  console.log(demandaId);
  const token = (await cookies()).get("token")?.value;
  let user: { id: string; tipo: string } | null = null;
  if (token) {
    try {
      user = jwtDecode<{ id: string; tipo: string }>(token as string);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  const getVistoria: getVistoriaProps = {
    id: parseInt(user?.id as string),
    type: Type[user?.tipo.toLowerCase() as keyof typeof Type],
    idVistoria: parseInt(demandaId),
    token: token as string,
  };
  const vistoria = await getVistoriaById(getVistoria);
  let imovel = null;
  if (vistoria.status == Status.Concluida) {
    imovel = await getImovel(
      vistoria.idTipoImovel as number,
      vistoria.endereco.tipoImovel,
      token as string
    );
  }

  return (
    <MainLayout id="demanda">
      <div className="flex justify-center items-center h-20 text-blue-900 font-bold text-2xl">
        <h1>Completar Demanda</h1>
      </div>
      <FormsComplete vistoria={vistoria} imovel={imovel} />
    </MainLayout>
  );
}
