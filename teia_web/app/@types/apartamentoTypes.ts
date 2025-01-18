import { TipoPosicao, TipoVista } from "../enums/apartamento";

type BlocoPredioProps = {
  id: number;
  pavimentos: number;
  elevadores: number;
  idade: number;
  aptosPorAndar: number;
  unidadesPredio: number;
  subsolos: number;
  blocos: number;
  outros: string;
};

export type ApartamentoProps = {
  id: number;
  andar: number;
  condominioVal: number;
  adminstradora: string;
  tel_Administradora: string;
  vista: TipoVista;
  posicao_: TipoPosicao;
  blocoPredio: BlocoPredioProps;
};
