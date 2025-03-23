import { TipoImovelProps } from "../@types/tipoImove";
import { TipoImovel } from "../enums/vistoria";

export default async function getImovel(id:number, tipoImovel:TipoImovel, token:string): Promise<TipoImovelProps> {
  const response = await fetch(`http://localhost:5017/api/Engenheiro/TipoImovel/${id}?tipoImovel=${tipoImovel}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  const data = await response.json();
  return data;
}
