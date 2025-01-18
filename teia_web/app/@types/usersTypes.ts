import { status, type } from "../enums/user";
import { Status, Tipo, TipoImovel } from "../enums/vistoria";
import { EnderecoProps } from "./vistoriaTypes";

export type UserProps = {
  id: number;
  name: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  type: type;
  status: status;
  createAt: Date;
};

export type VistoriadorProps = {
  id: number;
  name: string;
  vistoriador: {
    idVistoria: number;
    dataVistoria: Date;
    urlImagens?: string;
    latitude: string;
    longitude: string;
    obs?: string;
  };
};

export type EngenheiroProps = {
  id?: number;
  name?: string;
  idEngenheiro: number;
  idVistoriador: number;
  endereco: EnderecoProps;
  numOS: number;
  urlImagens?: string;
  urlMatricula?: string;
  dataAbertura: Date;
  tipo: Tipo;
  contratante: string;
  tel_Contratante: string;
  cliente: string;
  latitude: string;
  longitude: string;
  obs?: string;
};
