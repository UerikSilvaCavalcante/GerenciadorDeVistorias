import { UserProps } from "../@types/usersTypes";

export default async function putUser(data: UserProps, token:string):Promise<boolean> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${baseUrl}/User/${data.id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return response.ok;

}


