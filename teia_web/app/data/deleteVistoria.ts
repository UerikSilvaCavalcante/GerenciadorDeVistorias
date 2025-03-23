export async function deleteVistoria(
  id: number,
  token: string
): Promise<boolean> {
  const response = await fetch(`http://localhost:5017/api/Engenheiro/${id}`, {
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
