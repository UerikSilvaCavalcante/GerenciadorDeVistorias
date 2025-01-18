"use server";
import { VistoriaProps } from "../@types/vistoriaTypes";

export default async function getAllVistorias(
  id: number
): Promise<VistoriaProps[]> {
  const response = await fetch(`http://localhost:5017/api/Engenheiro/${id}`);
  const data = await response.json();
  return data;
}
