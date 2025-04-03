import { TipoAcabamento, TipoFormato, TipoSituacao, TipoSolucao, TipoTopografia, TipoUsoPredominante } from "../enums/lote";
import { TipoLote } from "../enums/lote";

type SolucoesProps = {
    id: number;
    agua:TipoSolucao;
    esgoto:TipoSolucao;
    energia:TipoSolucao;
    pavimentacao:TipoSolucao;
    iluminacao:TipoSolucao;
    coletaLixo:TipoSolucao;
    creche:TipoSolucao;
    escola:TipoSolucao;
    saude:TipoSolucao;
    lazer:TipoSolucao;
    comercio:TipoSolucao;
    absGas:TipoSolucao;
}

export type LoteProps = {
    id?: number;
    solucoesId?: number;
    solucoes?: SolucoesProps;
    tipo?:TipoLote;
    formato?:TipoFormato;
    situacao?:TipoSituacao;
    topografia?:TipoTopografia;
    usoPredio?: TipoUsoPredominante;
    acabamento?:TipoAcabamento;
    densidade?: string;
    transportePublico?: boolean;
}