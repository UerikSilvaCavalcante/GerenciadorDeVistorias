import { TipoArea, Telhado, CotaGreide, TipoDoImovelEnum } from "../enums/imovel";
import { TipoSituacao } from "../enums/lote";
import { AcabamentoProps } from "./acabamentoTypes";
import { DivisaoProps } from "./divisaoType";
import { InfraestruturaProps } from "./infraestrutura";

type AreaImovelProps = {
    id: number;
    valor: number;
    tipoArea: TipoArea;
}


export type ImovelProps = {
  id: number;
  areaImovel: AreaImovelProps[];
  frente: number;
  valorImovel: number;
  patologia: string;
  idadeImovel: number;
  tipoDoImovel: TipoDoImovelEnum;
  idAcabamento?: number;
  acabamento?: AcabamentoProps;
  idDivisao?: number;
  divisao?: DivisaoProps;
  idInfraestrutura?: number;
  infraestrutura?: InfraestruturaProps;
  telhado: Telhado;
  situacao: TipoSituacao;
  cotaGreide: CotaGreide;
  posicaoUnidade: string;
}
