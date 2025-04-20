import { Estilo, TipoBancada, TipoEstadoConservacao, TipoJanela, TipoLoc, TipoLocal, TipoMaterial, TipoMuro, TipoPadrao, tipoPintura, TipoPiso, TipoRevestimento, TipoTeto } from "../enums/acabamento";

type PinturaProps = {
    id: number;
    qtde:number;
    tipoPintura: tipoPintura;
    estilo: Estilo;
}

type PortaProps = {
    id: number;
    loc: TipoLoc;
    material: TipoMaterial;
}

type RevestimentoProps = {
    id: number;
    tipoRevestimento:TipoRevestimento;
    local: TipoLocal;
}

export type AcabamentoProps = {
    id: number;
    muro: TipoMuro;
    pinturas: PinturaProps[];
    portas: PortaProps[];
    piso: TipoPiso;
    janelas: TipoJanela;
    bancada: TipoBancada;
    quadroEletrico: number;
    revestimentos: RevestimentoProps[];
    padrao:TipoPadrao;
    estadoConservacao:TipoEstadoConservacao;
    teto: TipoTeto;
}