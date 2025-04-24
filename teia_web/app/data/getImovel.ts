import { TipoImovelProps } from "../@types/tipoImove";
import { TipoImovel } from "../enums/vistoria";

export default async function getImovel(
  id: number,
  tipoImovel: TipoImovel,
  token: string
): Promise<TipoImovelProps> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  

  const response = await fetch(
    `${baseUrl}/Engenheiro/TipoImovel/${id}?tipoImovel=${tipoImovel}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
