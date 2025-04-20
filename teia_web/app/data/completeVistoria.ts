import { ApartamentoProps } from "../@types/apartamentoTypes";
import { ImovelProps } from "../@types/imovelTypes";
import { LoteProps } from "../@types/loteTypes";
import { ObraProps } from "../@types/obraTypes";
import { VistoriaProps } from "../@types/vistoriaTypes";

interface requesteProps {
  idVistoria: number;
  dataVistoria: Date;
  URLImagens: string;
  latitude: string;
  longitude: string;
  obs: string;
  imovel?: ImovelProps;
  apartamento?: ApartamentoProps;
  obra?: ObraProps;
  lote?: LoteProps;
}

export default async function completeVistoria(
  id: number,
  request: requesteProps,
  token: string
): Promise<VistoriaProps> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const respone = await fetch(`${baseUrl}/Vistoriador/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!respone.ok) {
    throw new Error(`HTTP error! status: ${respone.status}`);
  }
  const data = await respone.json();
  return data;
}
