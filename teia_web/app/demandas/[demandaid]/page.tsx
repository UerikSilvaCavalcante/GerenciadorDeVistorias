"use server";
import getVistoriaById from "@/app/data/getVistoriaById";
import goBack from "../../assets/goBack.svg";
import Image from "next/image";
import { Status, Tipo, TipoImovel } from "@/app/enums/vistoria";
import Link from "next/link";
import A413Content from "@/app/components/A413Content";
import { TipoArea } from "@/app/enums/imovel";
import B438Content from "@/app/components/B438Content";
import { jwtDecode } from "jwt-decode";
import { RowContent } from "@/app/components/UI/rowContent";
import { ColumnContent } from "@/app/components/UI/columnContent";
import { cookies } from "next/headers";
import { Type } from "@/app/enums/user";
import ButtonDownload from "@/app/components/buttoDownload";
import ImageContent from "@/app/components/imageContent";
import ClientProvider from "@/app/components/clientProvider";
import E401Content from "@/app/components/E401Content";
import Head from "@/app/head";

// export const  dynamicParams = false;

interface getVistoriaProps {
  id: number;
  type: number;
  idVistoria: number;
  token: string;
}

export default async function DemandaId({
  params,
}: {
  params: Promise<{ demandaid: string }>;
}) {
  const { demandaid } = await params;
  const token = await (await cookies()).get("token")?.value;
  let user: { id: string; tipo: string } | null = null;
  if (token) {
    try {
      user = jwtDecode<{ id: string; tipo: string }>(token as string);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
  const requestProps: getVistoriaProps = {
    id: parseInt(user?.id as string),
    type: Type[user?.tipo.toLowerCase() as keyof typeof Type],
    idVistoria: parseInt(demandaid),
    token: token as string,
  };
  const vistoria = await getVistoriaById(requestProps);

  // console.log(vistoria);

    return (
      <ClientProvider>
        <Head title={`Demanda ${vistoria.numOs}`}/>
        <div className="flex flex-col pb-3 h-full w-full ">
          <div className="flex items-center justify-between mb-4 p-2 w-full bg-gradient-to-r from-indigo-800 to-blue-950">
            <div className="flex justify-center items-center px-6 border-r-4 border-zinc-50 pdf">
              <Link href="/demandas">
                <Image src={goBack} alt="Voltar" width={25} height={25} />
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center">
              {vistoria ? (<h1 className="text-xl font-bold text-zinc-50">
                Vistoria de {TipoImovel[vistoria.endereco.tipoImovel]}
              </h1>) : (
                <div className="w-20 h-5 bg-blue-950 animate-pulse rounded-md"></div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center w-[35px] h-[35px] bg-gradient-to-r from-indigo-800 to-blue-950 rounded-full fixed top-14 right-14 p-2 pdf">
            <ButtonDownload folderName={vistoria.numOs.toString()} id={demandaid} />
          </div>
          <div className="flex flex-col px-4 h-full w-full">
            <RowContent>
              <ColumnContent>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Data de Abertura:</h2>
                  <p>
                    {new Date(vistoria.dataAbertura).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Vistoriador:</h2>
                  <p className="text-sm">{vistoria.vistoriador.name}</p>
                </div>
                
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Tipo de Serviço:</h2>
                  <p className="text-sm">{Tipo[vistoria.type]}</p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">COD:</h2>
                  <p className="text-sm">{vistoria.numOs}</p>
                </div>
              </ColumnContent>
              <ColumnContent>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Logradouro:</h2>
                  <p className="text-sm">{vistoria.endereco.rua}</p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Complemento:</h2>
                  <p className="text-sm">{vistoria.endereco.complemento}</p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Bairro:</h2>
                  <p className="text-sm">{vistoria.endereco.bairro}</p>
                </div>
                <div className="flex gap-1 items-center  justify-between w-full text-nowrap">
                  <div className="flex items-center justify-center text-nowrap">
                    <h2 className="text-sm font-bold">Cidade: {""}</h2>
                    <p className="text-sm">{vistoria.endereco.cidade}</p>
                  </div>{" "}
                  <div className="flex items-center justify-center text-nowrap">
                    <h2 className="text-sm font-bold">Estado: </h2>
                    <p className="text-sm">{vistoria.endereco.estado}</p>
                  </div>
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">CEP:</h2>
                  <p className="text-sm">{vistoria.endereco.cep}</p>
                </div>
              </ColumnContent>
              <ColumnContent>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Contato:</h2>
                  <p className="text-sm">{vistoria.contratante}</p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Telfone:</h2>
                  <p className="text-sm">{vistoria.tel_Contratante}</p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Finalidade:</h2>
                  <p className="text-sm">Venda</p>
                </div>

                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Origem da informação:</h2>
                  <p className="text-sm">Oferta de mercado</p>
                </div>
              </ColumnContent>
              {vistoria.status === Status.Concluida &&
                vistoria.type == Tipo.A413 && (
                  <ColumnContent>
                  <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Idade:</h2>
                  <p className="text-sm">{vistoria.imovel?.idade}</p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Valor:</h2>
                  <p className="text-sm">R$ {vistoria.imovel?.valorImovel}</p>
                </div>
                    <div className="flex gap-1 items-center justify-center">
                      <h2 className="text-sm font-bold">
                        Área Construida Padrão:
                      </h2>
                      <p className="text-sm">
                        {vistoria.imovel?.areaImovel
                          .filter((area) => area.tipoArea == TipoArea.Coberta)
                          .map((area) => area.valor)
                          .join(", ")} m²
                      </p>
                    </div>
                    <div className="flex gap-1 items-center justify-center">
                      <h2 className="text-sm font-bold">
                        Área Externa Padrão:
                      </h2>
                      <p className="text-sm">
                        {vistoria.imovel?.areaImovel
                          .filter((area) => area.tipoArea == TipoArea.Externa)
                          .map((area) => area.valor)
                          .join(", ")} m²
                      </p>
                    </div>
                    <div className="flex gap-1 items-center justify-center">
                      <h2 className="text-sm font-bold">Área Terreno:</h2>
                      <p className="text-sm">
                        {vistoria.imovel?.areaImovel
                          .filter((area) => area.tipoArea == TipoArea.Terreno)
                          .map((area) => area.valor)
                          .join(", ")} m²
                      </p>
                    </div>
                    <div className="flex gap-1 items-center justify-center">
                      <h2 className="text-sm font-bold">frente:</h2>
                      <p className="text-sm">{vistoria.imovel?.frente} m²</p>
                    </div>
                  </ColumnContent>
                )}
            </RowContent>
          </div>
          {(vistoria.status === Status.Concluida && vistoria.type == Tipo.A413) && (
            <div className="flex flex-col justify-center items-center w-full ">
                <A413Content vistoria={vistoria} token={token as string} />
                <h1 className="text-indigo-800 font-bold text-3xl pdf">
                  Imagens da Vistoria
                </h1>
                <ImageContent folderName={vistoria.numOs.toString()} />
              </div>
          )}
          {(vistoria.status === Status.Concluida && (vistoria.type === Tipo.B438 || vistoria.type === Tipo.B437)) && (
             <div className="flex flex-col justify-center items-center w-full">
             <B438Content vistoria={vistoria} token={token as string} />
             <h1 className="text-indigo-800 font-bold text-3xl pdf">
                  Imagens da Vistoria
                </h1>
             <ImageContent folderName={vistoria.numOs.toString()} />
           </div>
          )}
           {(vistoria.status === Status.Concluida && vistoria.type == Tipo.E401) && (
            <div className="flex flex-col justify-center items-center w-full ">
                <E401Content vistoria={vistoria} token={token as string} />
                <h1 className="text-indigo-800 font-bold text-3xl pdf">
                  Imagens da Vistoria
                </h1>
                <ImageContent folderName={vistoria.numOs.toString()} />
              </div>
          )}
          {vistoria.status == Status.Pendente && (
            <RowContent>
              <div className="text-3xl font-bold text-indigo-800 w-full h-full flex justify-center items-center">
                Vistoria aguardando conclusão....
              </div>
            </RowContent>
          )}
          
        </div>
      </ClientProvider>
    );
}
