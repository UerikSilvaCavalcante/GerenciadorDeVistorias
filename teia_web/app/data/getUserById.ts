import { UserProps } from "../@types/usersTypes";


export default async function getUserById(id: number, token:string):Promise<UserProps> {
  const res = await fetch(`http://localhost:5017/api/User/${id} `,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return data;
}