import { UserProps } from "../@types/usersTypes";

export default async function getLogin(
  userName: string,
  password: string
): Promise<string | null> {
  const response = await fetch("http://localhost:5017/api/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      userName,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data.token;
  }
  return null;
}
