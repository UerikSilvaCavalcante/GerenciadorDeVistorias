"use server";
import { VistoriaProps } from "../@types/vistoriaTypes";
import { Type } from "../enums/user";


export default async function getAllVistorias(
  id: number,
  type:number,
  token:string
): Promise<VistoriaProps[]> {
  let response;
  if(type == Type.engenheiro){
    response = await fetch(`http://localhost:5017/api/Engenheiro/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
  }else {
    response = await fetch(`http://localhost:5017/api/Vistoriador/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.json()}`);
  }
  const data = await response.json();
  return data;
}
