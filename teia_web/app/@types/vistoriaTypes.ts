import { TipoImovel } from "../enums/vistoria";
import { ImovelProps } from "./imovelTypes";
import { UserProps } from "./usersTypes";

export type EnderecoProps = {
  id?: number;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
  tipoImovel: TipoImovel;
};

export type VistoriaProps = {
  id: number;
  numOs: number;
  idEngenheiro: number;
  engenheiro: UserProps;
  idVistoriador: number;
  vistoriador: UserProps;
  idImovel?: number;
  imovel?: ImovelProps;
  idTipoImovel?: number;
  status: number;
  type: number;
  dataAbertura: Date;
  dataConclusao: Date;
  dataLancamento: Date;
  endereco: EnderecoProps;
  contratante: string;
  tel_Contratante: string;
  cliente: string;
  latitude: string;
  longitude: string;
  urlImagens: string;
  urlMatricula: string;
  obs: string;
};
