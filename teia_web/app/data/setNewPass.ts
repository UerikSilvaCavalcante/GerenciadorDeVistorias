
export default async function setNewPassword(id:number, password:string, token:string):Promise<boolean>{
    const response = await fetch(`http://localhost:5017/api/User/UpdatePassword/${id}`, {
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