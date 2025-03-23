"server client";

import { CotaGreide, Telhado, TipoArea } from "@/app/enums/imovel";
import { TipoSituacao } from "@/app/enums/lote";
import {
  Estilo,
  TipoBancada,
  TipoEstadoConservacao,
  TipoJanela,
  TipoLoc,
  TipoLocal,
  TipoMaterial,
  TipoMuro,
  TipoPadrao,
  tipoPintura,
  TipoPiso,
  TipoRevestimento,
  TipoTeto,
} from "@/app/enums/acabamento";
import {
  TipoAreaServico,
  TipoBanheiro,
  TipoGaragem,
} from "@/app/enums/divisao";
import { ApartamentoProps } from "@/app/@types/apartamentoTypes";

import { VistoriaProps } from "../@types/vistoriaTypes";
import { TipoImovel } from "../enums/vistoria";
import getImovel from "../data/getImovel";
import { TipoPosicao, TipoVista } from "../enums/apartamento";
import { RowContent } from "./UI/rowContent";
import { ColumnContent } from "./UI/columnContent";

export default async function A413Content({
  vistoria,
  token
}: {
  vistoria: VistoriaProps;
  token:string
}) {
  let Imovel = null;
  if (vistoria.endereco.tipoImovel == TipoImovel.Apartamento) {
    Imovel = await getImovel(
      vistoria.idTipoImovel as number,
      vistoria.endereco.tipoImovel,
      token
    );
    Imovel = Imovel as ApartamentoProps;
  }

  return (
    <div className="flex flex-col px-4 h-full w-full">
      <RowContent>
        <ColumnContent>
          <div className="flex gap-1 items-center justify-center">
            <h1>Patologia</h1>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-center justify-center">
            <h2 className="text-lg font-bold">Situacao:</h2>
            <p className="text-sm">
              {TipoSituacao[vistoria.imovel?.situacao as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-center justify-center">
            <h2 className="text-lg font-bold">Cota - Greide:</h2>
            <p className="text-sm">
              {CotaGreide[vistoria.imovel?.cotaGreide as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-center justify-center">
            <h2 className="text-lg font-bold">Posição de Unidade:</h2>
            <p className="text-sm">{vistoria.imovel?.posicaoUnidade}</p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-center justify-center">
            <h2 className="text-lg font-bold">Telhado:</h2>
            <p className="text-sm">
              {Telhado[vistoria.imovel?.telhado as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Muro:</h2>
            <p className="text-sm">
              {TipoMuro[vistoria.imovel?.acabamento?.muro as number]}
            </p>
          </div>
        </ColumnContent>

        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Quadro Elétrico:</h2>
            <p className="text-sm">
              {vistoria.imovel?.acabamento?.quadroEletrico}+ Disjuntores
            </p>
          </div>
        </ColumnContent>
      </RowContent>
      <RowContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Teto da Unidade:</h2>
            <p className="text-sm">
              {TipoTeto[vistoria.imovel?.acabamento?.teto as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Piso:</h2>
            <p className="text-sm">
              {TipoPiso[vistoria.imovel?.acabamento?.piso as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Janelas:</h2>
            <p className="text-sm">
              {TipoJanela[vistoria.imovel?.acabamento?.janelas as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Bancada:</h2>
            <p className="text-sm">
              {TipoBancada[vistoria.imovel?.acabamento?.bancada as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Padrão de Acabamento:</h2>
            <p className="text-sm">
              {TipoPadrao[vistoria.imovel?.acabamento?.padrao as number]}
            </p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Estado de Conservação:</h2>
            <p className="text-sm">
              {
                TipoEstadoConservacao[
                  vistoria.imovel?.acabamento?.estadoConservacao as number
                ]
              }
            </p>
          </div>
        </ColumnContent>
      </RowContent>
      <RowContent>
        <ColumnContent>
          <div className="flex flex-col w-full gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Pinturas:</h2>
            {vistoria.imovel?.acabamento?.pinturas.map((pintura, index) => (
              <div
                key={index}
                className="flex gap-1 w-full items-start justify-between"
              >
                <p className="text-sm font-bold">
                  {tipoPintura[pintura.tipoPintura]}:
                </p>
                <p>{Estilo[pintura.estilo]}</p>
              </div>
            ))}
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col w-full gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Portas:</h2>
            {vistoria.imovel?.acabamento?.portas.map((porta, index) => (
              <div
                key={index}
                className="flex gap-1 w-full items-start justify-between"
              >
                <p className="text-sm font-bold">{TipoLoc[porta.loc]}:</p>
                <p>{TipoMaterial[porta.material]}</p>
              </div>
            ))}
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Infraestrutura:</h2>
            <p>
              {vistoria.imovel?.infraestrutura?.redeAguaP
                ? "Rede de Agua Potável"
                : ""}
            </p>
            <p>
              {vistoria.imovel?.infraestrutura?.redeEsgoto
                ? "Rede de Esgoto"
                : ""}
            </p>
            <p>
              {vistoria.imovel?.infraestrutura?.iluminacao
                ? "Iluminação Publica"
                : ""}
            </p>
            <p>
              {vistoria.imovel?.infraestrutura?.pavimentacao
                ? "Pavimentação"
                : ""}
            </p>
            <p>
              {vistoria.imovel?.infraestrutura?.sumidouro ? "Sumidouro" : ""}
            </p>
            <p>{vistoria.imovel?.infraestrutura?.fossa ? "Fossa" : ""}</p>
          </div>
        </ColumnContent>
        <ColumnContent>
          <div className="flex flex-col w-full gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Revestimentos:</h2>
            {vistoria.imovel?.acabamento?.revestimentos.map(
              (revestimento, index) => (
                <div
                  key={index}
                  className="flex gap-1 w-full items-start justify-between"
                >
                  <p className="text-sm font-bold">
                    {TipoLocal[revestimento.local]}:
                  </p>
                  <p>{TipoRevestimento[revestimento.tipoRevestimento]}</p>
                </div>
              )
            )}
          </div>
        </ColumnContent>
      </RowContent>
      <RowContent>
        <ColumnContent>
          <div className="flex flex-col w-full gap-1 items-start justify-start">
            <h2 className="text-lg font-bold">Divisão interna:</h2>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold">Quartos:</p>
              <p>{vistoria.imovel?.divisao?.quartos}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold">Banheiro Social:</p>
              <p>
                {vistoria.imovel?.divisao?.banheiros
                  .filter(
                    (banheiro) => banheiro.tipoBanheiro == TipoBanheiro.Social
                  )
                  .map((banheiro) => banheiro.qtde)}
              </p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold">Banheiro privativo:</p>
              <p>
                {vistoria.imovel?.divisao?.banheiros
                  .filter(
                    (banheiro) => banheiro.tipoBanheiro == TipoBanheiro.Privado
                  )
                  .map((banheiro) => banheiro.qtde)}
              </p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold">Lavabos:</p>
              <p>{vistoria.imovel?.divisao?.lavabos}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold">Varanda - Sacada:</p>
              <p>{vistoria.imovel?.divisao?.sacadaVaranda}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold">Cozinha:</p>
              <p>{vistoria.imovel?.divisao?.cozinhas}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold">Sala:</p>
              <p>{vistoria.imovel?.divisao?.salas}</p>
            </div>

            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold">Garagem Coberta:</p>
              <p>
                {vistoria.imovel?.divisao?.garagems &&
                vistoria.imovel.divisao.garagems.filter(
                  (garagem) => garagem.tipoGaragem == TipoGaragem.Coberta
                ).length <= 0
                  ? 0
                  : vistoria.imovel?.divisao?.garagems
                      .filter(
                        (garagem) => garagem.tipoGaragem == TipoGaragem.Coberta
                      )
                      .map((garagem) => garagem.qtde)}
              </p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold">Garagem Descoberta:</p>
              <p>
                {vistoria.imovel?.divisao?.garagems &&
                vistoria.imovel.divisao.garagems.filter(
                  (garagem) => garagem.tipoGaragem == TipoGaragem.Descoberta
                ).length <= 0
                  ? 0
                  : vistoria.imovel?.divisao?.garagems
                      .filter(
                        (garagem) =>
                          garagem.tipoGaragem == TipoGaragem.Descoberta
                      )
                      .map((garagem) => garagem.qtde)}
              </p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold">Área de Serviço Descoberta:</p>
              <p>
                {vistoria.imovel?.divisao?.areaServico &&
                vistoria.imovel.divisao.areaServico.filter(
                  (area) => area.tipo == TipoAreaServico.Externa
                ).length <= 0
                  ? 0
                  : vistoria.imovel?.divisao?.areaServico
                      .filter((area) => area.tipo == TipoAreaServico.Externa)
                      .map((area) => area.qtde)}
              </p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold">Área de Serviço Coberta:</p>
              <p>
                {vistoria.imovel?.divisao?.areaServico &&
                vistoria.imovel.divisao.areaServico.filter(
                  (area) => area.tipo == TipoAreaServico.Externa
                ).length <= 0
                  ? 0
                  : vistoria.imovel?.divisao?.areaServico
                      .filter((area) => area.tipo == TipoAreaServico.Externa)
                      .map((area) => area.qtde)}
              </p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold">Piscina:</p>
              <p>{vistoria.imovel?.divisao?.piscina}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm font-bold">Outros:</p>
              <p>{vistoria.imovel?.divisao?.outros}</p>
            </div>
          </div>
        </ColumnContent>
        {Imovel && (
          <>
            <ColumnContent>
              <h1 className="text-2xl font-bold">Detalhes do Apartamento</h1>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold">Andar:</p>
                <p>{Imovel.andar}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold">Posição da Unidade:</p>
                <p>{TipoPosicao[Imovel.posicao_]}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold">Vista Panorãmica:</p>
                <p>{TipoVista[Imovel.vista]}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold">Administrador:</p>
                <p>{Imovel.adminstradora}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold">Telefone Admin:</p>
                <p>{Imovel.tel_Administradora}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold">Valor do Condominio:</p>
                <p>{Imovel.condominioVal}</p>
              </div>
            </ColumnContent>
            <ColumnContent>
              <h1 className="text-2xl font-bold">Bloco/Predio</h1>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold">Número de Pavimentos:</p>
                <p>{Imovel.blocoPredio.pavimentos}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold">Quantidade de elevadores:</p>
                <p>{Imovel.blocoPredio.elevadores}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold">Idade estimada:</p>
                <p>{Imovel.blocoPredio.idade}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold">
                  N° de apartamentos por andar:
                </p>
                <p>{Imovel.blocoPredio.aptosPorAndar}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold">N° de unidades no predio:</p>
                <p>{Imovel.blocoPredio.unidadesPredio}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold">N° de subsolos:</p>
                <p>{Imovel.blocoPredio.subsolos}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold">N° de blocos:</p>
                <p>{Imovel.blocoPredio.blocos}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-bold">Outros:</p>
                <p>{Imovel.blocoPredio.outros}</p>
              </div>
            </ColumnContent>
          </>
        )}
      </RowContent>
    </div>
  );
}
