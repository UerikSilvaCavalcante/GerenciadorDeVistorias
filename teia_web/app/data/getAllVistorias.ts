"use server";
import { VistoriaProps } from "../@types/vistoriaTypes";
import { Type } from "../enums/user";

export default async function getAllVistorias(
  id: number,
  type: number,
  token: string
): Promise<VistoriaProps[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  let response;
  if (type == Type.engenheiro) {
    response = await fetch(`${baseUrl}/Engenheiro/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    response = await fetch(`${baseUrl}/Vistoriador/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.json()}`);
  }
  const data = await response.json();
  return data;
}
