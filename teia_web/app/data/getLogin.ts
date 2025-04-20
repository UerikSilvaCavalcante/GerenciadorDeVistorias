
export default async function getLogin(
  userName: string,
  password: string
): Promise<string | null> {
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
    return data.token;
  }
  if (response.status != 404) {
    return "usuario ou senha incorretos";
  }
  return null;
}
