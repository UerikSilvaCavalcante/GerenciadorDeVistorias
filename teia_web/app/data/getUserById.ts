import { UserProps } from "../@types/usersTypes";

export default async function getUserById(
  id: number,
  token: string
): Promise<UserProps> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/User/${id} `, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return data;
}
