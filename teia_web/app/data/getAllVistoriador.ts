import { UserProps } from "../@types/usersTypes";

export default async function getAllVistoriador(token:string): Promise<UserProps[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const respoonse = await fetch(`${baseUrl}/Engenheiro/AllVistoriadores`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  const data = await respoonse.json();
    
  return data;
}
