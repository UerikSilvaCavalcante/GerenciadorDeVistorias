import { TipoArea, Telhado, CotaGreide } from "../enums/imovel";
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
