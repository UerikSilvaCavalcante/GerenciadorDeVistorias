import { UserProps } from "../@types/usersTypes";
import { Type } from "../enums/user";
interface ResponseProps {
  name: string;
  username: string;
  email: string;
  password: string;
  type: Type;
}

export default async function postNewUSer(
  user: ResponseProps
): Promise<UserProps> {
  const response = await fetch(`http://localhost:5017/api/User`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
}
