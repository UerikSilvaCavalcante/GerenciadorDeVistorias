"use server";

import { cookies } from "next/headers";
import { TOKEN_KEY } from "../../middleware";

export async function Autentication(data: any) {
  const cookiesData = await cookies();
  cookiesData.set("token", TOKEN_KEY);
  cookiesData.set({
    name: data.username,
    value: data.username,
    httpOnly: true,
    path: "/",
  });
}

export async function Logout() {
  const cookiesData = await cookies();
  cookiesData.delete("token");
  cookiesData.delete("admin");
}
