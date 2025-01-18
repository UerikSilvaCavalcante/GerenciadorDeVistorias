import { UserProps } from "../@types/usersTypes";

export default async function getAllVistoriador(): Promise<UserProps[]> {
  
  const respoonse = await fetch('http://localhost:5017/api/Engenheiro/AllVistoriadores');
  const data = await respoonse.json();
    
  return data;
}
