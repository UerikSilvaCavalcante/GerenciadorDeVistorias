
export default async function setNewPassword(id:number, password:string, token:string):Promise<boolean>{
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${baseUrl}/User/UpdatePassword/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(password),
    });
    const data = await response.json();
    return data;
}