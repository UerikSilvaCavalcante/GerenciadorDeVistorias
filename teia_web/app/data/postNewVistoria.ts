import { EngenheiroProps } from "../@types/usersTypes";
import { Tipo, TipoImovel } from "../enums/vistoria";

type FormPorps = {
  numOs: string;
  idVistoriador: string;
  tipo: string;
  dataAbertura: string;
  contratante: string;
  tel_Contratante: string;
  cliente: string;
  endereco: string;
  complemento: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  tipoImovel: string;
  latitude?: string;
  longitude?: string;
  obs: string;
};

type responseProps = {
  message: boolean;
  erro?: string;
}

export default async function postNewVistoria(form: FormPorps):Promise<responseProps> {
  const engenheiro: EngenheiroProps = {
    idEngenheiro: 1,
    idVistoriador: parseInt(form.idVistoriador),
    urlImagens: "",
    urlMatricula: "",
    numOS: parseInt(form.numOs),
    dataAbertura: new Date(form.dataAbertura),
    tipo: parseInt(form.tipo) + 1 as Tipo,
    contratante: form.contratante,
    tel_Contratante: form.tel_Contratante,
    cliente: form.cliente,
    endereco: {
      rua: form.endereco,
      complemento: form.complemento,
      numero: form.numero,
      bairro: form.bairro,
      cidade: form.cidade,
      estado: form.estado,
      cep: form.cep,
      tipoImovel: parseInt(form.tipoImovel) + 1 as TipoImovel,
    },
    latitude: form.latitude as string,
    longitude: form.longitude as string,
    obs: form.obs,
  };
  const response = await fetch("http://localhost:5017/api/Engenheiro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(engenheiro),
  });

  
  return response.json();
}
