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
  let response;
  if(type === Type.engenheiro){

    response = await fetch(`http://localhost:5017/api/Engenheiro/${id}/${idVistoria}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }else {
    response = await fetch(`http://localhost:5017/api/Vistoriador/${id}/${idVistoria}`, {
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
