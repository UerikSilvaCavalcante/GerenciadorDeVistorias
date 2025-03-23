
export default async function SetCode(id:number,  token:string):Promise<boolean>{
    const response = await fetch(`http://localhost:5017/api/User/SetCode/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
}