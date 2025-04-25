"use server";

import * as TipoLote from "@/app/enums/lote";

import { TipoImovel } from "../enums/vistoria";
import getImovel from "../data/getImovel";
import { RowContent } from "./UI/rowContent";
import { ColumnContent } from "./UI/columnContent";
import { LoteProps } from "../@types/loteTypes";

export default async function B438Content({
  id,
  token,
}: {
  id: number;
  token: string;
}) {

  const Imovel: LoteProps = await getImovel(id,TipoImovel.Lote, token) as LoteProps;

  return (
    <div className="flex flex-col px-4 h-full w-full">
      <RowContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Area do Terreno:</h2>
            <p className="text-sm">{Imovel?.areaTerreno} m²</p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Tipo de Terreno:</h2>
            <p className="text-sm">     
              {TipoLote.TipoLote[Imovel?.tipo as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Formato do Terreno:</h2>
            <p className="text-sm">
              {TipoLote.TipoFormato[Imovel?.formato as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Situação:</h2>
            <p className="text-sm">
              {TipoLote.TipoSituacao[Imovel?.situacao as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Topografia:</h2>
            <p className="text-sm">
              {TipoLote.TipoTopografia[Imovel?.topografia as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Fechamento do Terreno:</h2>
            <p className="text-sm">{Imovel?.fechamentoTerreno}</p>
          </div>
        </ColumnContent>

        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Localização da Unidade:</h2>
            <p className="text-sm">{Imovel?.localizacaoUnidade}</p>
          </div>
        </ColumnContent>
      </RowContent>
      <RowContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Frente :</h2>
            <p className="text-sm">{Imovel?.frente} m²</p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Uso Predominante:</h2>
            <p className="text-sm">
              {TipoLote.TipoUsoPredominante[Imovel?.usoPredio as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Padrão Usual de Acabamento:</h2>
            <p className="text-sm">
              {TipoLote.TipoAcabamento[Imovel?.acabamento as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Avaliação da Localização:</h2>
            <p className="text-sm">Boa</p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Densidade de Ocupação:</h2>
            <p className="text-sm">{Imovel?.densidade}</p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Transporte Coletivo:</h2>
            <p className="text-sm">
              {Imovel?.transportePublico ? "Satisfatorio" : "Não disponivel"}
            </p>
          </div>
        </ColumnContent>
      </RowContent>

      <RowContent>
        <ColumnContent>
          <h1 className="text-lg font-bold text-zin-900">
            Soluções de infra-estrutura disponíveis junto à unidade, serviços e
            equipamentos comunitários no entorno:
          </h1>
        </ColumnContent>
      </RowContent>
      <RowContent>
        <ColumnContent>
          <div className="flex flex-col w-full gap-1 items-start justify-start">
            <p className="text-sm">
              <span className="font-bold">Água:</span>
              {TipoLote.TipoSolucao[Imovel?.solucoes.agua as number]}
            </p>
            <p className="text-sm">
              <span className="font-bold">Esgoto:</span>
              {TipoLote.TipoSolucao[Imovel?.solucoes.esgoto as number]}
            </p>
            <p className="text-sm">
              <span className="font-bold">Energia elétrica:</span>
              {TipoLote.TipoSolucao[Imovel?.solucoes.energia as number]}
            </p>
            <p className="text-sm">
              <span className="font-bold">Iluminação Pública - </span>
              {TipoLote.TipoSolucao[Imovel?.solucoes.iluminacao as number]}
            </p>
            <p className="text-sm">
              <span className="font-bold">Telefone - </span>
              {/* {TipoLote.TipoSolucao[Imovel?.solucoes.telefone as number]} */}
              Satisfatorio
            </p>
            <p className="text-sm">
              <span className="font-bold">Pavimentação - </span>
              {TipoLote.TipoSolucao[Imovel?.solucoes.pavimentacao as number]}
            </p>
            <p className="text-sm">
              <span className="font-bold">Águas pluviais - </span>
              {TipoLote.TipoSolucao[Imovel?.solucoes.agua as number]}
            </p>
            <p className="text-sm">
              <span className="font-bold">Guias e sarjetas - </span>
              {TipoLote.TipoSolucao[Imovel?.solucoes.agua as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col w-full gap-1 items-start justify-start">
            <p className="text-sm">
              <span className="font-bold">Abast. de gás - </span>
              {TipoLote.TipoSolucao[Imovel?.solucoes.absGas as number]}
            </p>
            <p className="text-sm">
              <span className="font-bold">Coleta de lixo - </span>
              {TipoLote.TipoSolucao[Imovel?.solucoes.coletaLixo as number]}
            </p>
            <p className="text-sm">
              <span className="font-bold">Escola - </span>
              {TipoLote.TipoSolucao[Imovel?.solucoes.escola as number]}
            </p>
            <p className="text-sm">
              <span className="font-bold">Creche - </span>
              {TipoLote.TipoSolucao[Imovel?.solucoes.creche as number]}
            </p>
            <p className="text-sm">
              <span className="font-bold">Saúde Pública - </span>
              {TipoLote.TipoSolucao[Imovel?.solucoes.saude as number]}
            </p>
            <p className="text-sm">
              <span className="font-bold">Comércio - </span>
              {TipoLote.TipoSolucao[Imovel?.solucoes.comercio as number]}
            </p>
            <p className="text-sm">
              <span className="font-bold">Segurança Pública - </span>
              {/* {TipoLote.TipoSolucao[Imovel?.solucoes.seguranca as number]} */}
              Satisfatorio
            </p>
            <p className="text-sm">
              <span className="font-bold">Lazer - </span>
              {TipoLote.TipoSolucao[Imovel?.solucoes.lazer as number]}
            </p>
          </div>
        </ColumnContent>
      </RowContent>
    </div>
  );
}
