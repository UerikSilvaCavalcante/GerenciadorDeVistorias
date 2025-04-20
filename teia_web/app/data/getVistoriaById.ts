import { VistoriaProps } from "../@types/vistoriaTypes";
import { Type } from "../enums/user";

interface getVistoriaProps {
  id: number,
  type: number,
  idVistoria: number,
  token: string
}

export default async function getVistoriaById(
  { id, type, idVistoria, token }: getVistoriaProps
): Promise<VistoriaProps> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  let response;
  if(type === Type.engenheiro){

    response = await fetch(`${baseUrl}/Engenheiro/${id}/${idVistoria}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }else {
    response = await fetch(`${baseUrl}/Vistoriador/${id}/${idVistoria}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
