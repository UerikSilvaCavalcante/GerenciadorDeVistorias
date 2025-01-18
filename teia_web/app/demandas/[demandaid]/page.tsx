import getAllVistorias from "@/app/data/getAllVistorias";
import getVistoriaById from "@/app/data/getVistoriaById";
import goBack from "../../assets/goBack.svg";
import Image from "next/image";
import { Status, Tipo, TipoImovel } from "@/app/enums/vistoria";
import { Children, ReactNode } from "react";
import Link from "next/link";
import A413Content from "@/app/components/A413Content";
import { TipoArea } from "@/app/enums/imovel";
import B438Content from "@/app/components/B438Content";

export const dynamicParams = false;

export async function generateStaticParams() {
  const res = await getAllVistorias(1);
  const params = await res.map((vistoria, index) => ({
    demandaid: vistoria.id.toString(),
  }));

  return params;
}

export const RowContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-start justify-start w-full p-4 border-y-2 border-indigo-900 ">
      {children}
    </div>
  );
};

export const ColumnContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-start justify-start px-3 h-full w-full border-x-2 border-indigo-900  text-zinc-950 text-nowrap gap-2">
      {children}
    </div>
  );
};

export default async function DemandaId({
  params,
}: {
  params: { demandaid: string };
}) {
  const { demandaid } = await params;
  const vistoria = await getVistoriaById(parseInt(demandaid));
  if (vistoria) {
    return (
      <div className="flex flex-col pb-3 h-full w-full ">
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
        <div className="flex flex-col px-4 h-full w-full">
          <RowContent>
            <ColumnContent>
              <div className="flex gap-1 items-center justify-center">
                <h2 className="text-sm font-bold">Data de Abertura:</h2>
                <p>
                  {new Date(vistoria.dataAbertura).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="flex gap-1 items-center justify-center">
                <h2 className="text-sm font-bold">Vistoriador:</h2>
                <p className="text-sm">{vistoria.vistoriador.name}</p>
              </div>
              <div className="flex gap-1 items-center justify-center">
                <h2 className="text-sm font-bold">Idade:</h2>
                <p className="text-sm">0</p>
              </div>
              <div className="flex gap-1 items-center justify-center">
                <h2 className="text-sm font-bold">Valor:</h2>
                <p className="text-sm">R$ 190.000</p>
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
            {vistoria.status === Status.Concluida && (
              <ColumnContent>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Área Construida Padrão:</h2>
                  <p className="text-sm">
                    {vistoria.imovel?.areaImovel
                      .filter((area) => area.tipoArea == TipoArea.Coberta)
                      .map((area) => area.valor)
                      .join(", ")}
                  </p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Área Construida Padrão:</h2>
                  <p className="text-sm">
                    {vistoria.imovel?.areaImovel
                      .filter((area) => area.tipoArea == TipoArea.Externa)
                      .map((area) => area.valor)
                      .join(", ")}
                  </p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Área Construida Padrão:</h2>
                  <p className="text-sm">
                    {vistoria.imovel?.areaImovel
                      .filter((area) => area.tipoArea == TipoArea.Terreno)
                      .map((area) => area.valor)
                      .join(", ")}
                  </p>
                </div>
                <div className="flex gap-1 items-center justify-center">
                  <h2 className="text-sm font-bold">Área Construida Padrão:</h2>
                  <p className="text-sm">{vistoria.imovel?.frente}</p>
                </div>
              </ColumnContent>
            )}
          </RowContent>
        </div>
        {vistoria.status === Status.Concluida ? (
          vistoria.type === Tipo.A413 ? (
            <A413Content vistoria={vistoria} />
          ) : vistoria.type === Tipo.B438 || vistoria.type === Tipo.B437 ? (
            <B438Content vistoria={vistoria} />
          ) : null
        ) : (
          <div className="flex justify-center items-center w-full h-[100%]">
            <h1 className="text-3xl font-bold text-indigo-800">
              Vistoria Aguardando conclusão...
            </h1>
          </div>
        )}
      </div>
    );
  }
}
