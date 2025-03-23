"use server";
import { VistoriaProps } from "../@types/vistoriaTypes";

export default async function getAllStaticVistorias(): Promise<VistoriaProps[]> {
  const response = await fetch(`http://localhost:5017/api/Engenheiro`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
