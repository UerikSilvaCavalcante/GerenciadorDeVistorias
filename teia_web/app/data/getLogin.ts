interface promiseProps {
  status: number;
  message: string | null;
}

export default async function getLogin(
  userName: string,
  password: string
): Promise<promiseProps> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${baseUrl}/Login`, {
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
    return { status: response.status, message: data.token };
  }
  if (response.status != 404) {
    return { status: response.status, message: "Usuário ou senha inválidos" };
  }
  return { status: response.status, message: null };
}
