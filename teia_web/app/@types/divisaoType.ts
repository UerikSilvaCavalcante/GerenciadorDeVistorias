import { TipoAreaServico, TipoBanheiro, TipoGaragem } from "../enums/divisao";
import { Tipo } from "../enums/vistoria";

type AreaServicoProps = {
  id: number;
  qtde: number;
  tipo: TipoAreaServico;
};

type BanheirosProps = {
  id: number;
  qtde: number;
  tipoBanheiro: TipoBanheiro;
};

type GaragenProps ={
  id: number;
  qtde: number;
  tipoGaragem: TipoGaragem;
}

export type DivisaoProps = {
  id: number;
  areaServico: AreaServicoProps[];
  quartos: number;
  cozinhas: number;
  salas: number;
  banheiros: BanheirosProps[];
  sacadaVaranda: number;
  garagems: GaragenProps[];
  lavabos:number;
  piscina: number;
  outros:string
};
