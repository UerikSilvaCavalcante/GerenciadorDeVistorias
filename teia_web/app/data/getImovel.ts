import { TipoImovelProps } from "../@types/tipoImove";
import { TipoImovel } from "../enums/vistoria";

export default async function getImovel(id:number, tipoImovel:TipoImovel): Promise<TipoImovelProps> {
  const response = await fetch(`http://localhost:5017/api/Engenheiro/TipoImovel/${id}?tipoImovel=${tipoImovel}`);
  const data = await response.json();
  return data;
}
