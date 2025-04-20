export default async function ValidCode(
  id: number,
  email:string,
  code: string,
  token: string
):Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${baseUrl}/User/GetCode/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email: email, code: code}),
  });
  const data = await response.json();
  return data;
}
