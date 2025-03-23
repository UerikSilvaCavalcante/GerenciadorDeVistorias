import { UserProps } from "../@types/usersTypes";

export default async function putUser(data: UserProps, token:string):Promise<boolean> {
    const response = await fetch(`http://localhost:5017/api/User/${data.id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return response.ok;

}


