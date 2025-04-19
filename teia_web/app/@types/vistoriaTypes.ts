import { TipoImovel, Tipo } from "../enums/vistoria";
import { UserProps } from "./usersTypes";
import { ImovelProps } from "./imovelTypes";

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
}

export type VistoriaProps = {
  id: number;
  numOs: number;
  idEngenheiro: number;
  engenheiro: any;
  idVistoriador: number;
  vistoriador: any;
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
}
