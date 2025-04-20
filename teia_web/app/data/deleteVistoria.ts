export async function deleteVistoria(
  id: number,
  token: string
): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${baseUrl}/Engenheiro/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return true;
  }
  return false;
}
