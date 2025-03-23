import { UserProps } from "../@types/usersTypes";

export default async function getAllVistoriador(token:string): Promise<UserProps[]> {
  
  const respoonse = await fetch('http://localhost:5017/api/Engenheiro/AllVistoriadores', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  const data = await respoonse.json();
    
  return data;
}
