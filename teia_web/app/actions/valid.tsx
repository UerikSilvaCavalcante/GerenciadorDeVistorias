"use client";
import { jwtDecode } from "jwt-decode";
// import { cookies } from "next/headers";
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import getLogin from "../data/getLogin";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { cp } from "fs";
import { parse } from "path";
import { UserProps } from "../@types/usersTypes";
import getUserById from "../data/getUserById";
import { set } from "zod";
import { queryClient } from "../helper/useQuery";

type AuthContextProps = {
  isAuthenticaded: boolean;
  user: UserProps | null;
  Login: (data: any) => Promise<boolean>;
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const isAuthenticaded = !!user;

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      try {
        const decode = jwtDecode<{
          id: string;
          userName: string;
          type: string;
        }>(token);
        getUserById(parseInt(decode.id), token).then((user) => {
          setUser({
            userName: user.userName,
            id: user.id,
            type: user.type,
            createAt: user.createAt,
            password: user.password,
            email: user.email,
            phone: user.phone,
            name: user.name,
            status: user.status,
          });
        });
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    } else {
      console.log("Token não encontrado nos cookies");
    }
  }, []);

  async function Login(token:string) {
    const TOKEN_KEY = token ;

    setCookie(undefined, "token", TOKEN_KEY, {
      maxAge: 60 * 60 * 1,
    });

    const decode = jwtDecode<{
      id: string;
      userName: string;
      type: string;
    }>(TOKEN_KEY);

    const user = await getUserById(parseInt(decode.id), TOKEN_KEY);
    setUser({
      userName: user.userName,
      id: user.id,
      type: user.type,
      createAt: user.createAt,
      password: user.password,
      email: user.email,
      phone: user.phone,
      name: user.name,
      status: user.status,
    });
    return true;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticaded, user, Login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function Logout() {
  destroyCookie(undefined, "token");
}
