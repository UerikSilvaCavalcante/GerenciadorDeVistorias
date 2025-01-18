import { VistoriaProps } from "../@types/vistoriaTypes";

export default async function getVistoriaById(
  id: number
): Promise<VistoriaProps> {
  const response = await fetch(`http://localhost:5017/api/Engenheiro/1/${id}`);
  const data = await response.json();
  return data;
}
