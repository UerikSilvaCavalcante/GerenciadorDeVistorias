"use client";

import Link from "next/link";
import Image from "next/image";
import logout from "../assets/box-arrow-right.svg";
import { AuthContext, Logout } from "../actions/valid";
import { useRouter } from "next/navigation";
import { lazy, Suspense, useContext } from "react";
import { Type } from "../enums/user";
import { queryClient } from "../helper/useQuery";

export default function NavBar({ id }: { id: string }) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  async function handleLogout() {
    queryClient.clear();
    await Logout();
    router.push("/");
  }

  const Usuario = lazy(() => import("./usuario"));
  return (
    <nav className="flex bg-gradient-to-r from-indigo-800 to-blue-950 h-9 w-full items-center justify-between px-3 py-1 fixed top-0 z-10">
      <Suspense fallback={<div className="w-20 h-5 bg-blue-950 animate-pulse rounded-md"></div>}>
        <Usuario />
      </Suspense>
      <div className="flex items-center justify-between gap-7 text-base font-bold">
        <Link
          href="/home"
          className={`links relative ${id === "home" ? "after:scale-100" : ""}`}
        >
          Home
        </Link>

        <Link
          href="/demandas"
          className={`links relative ${
            id === "demandas" ? "after:scale-100" : ""
          }`}
        >
          Demandas
        </Link>
        {user?.type == Type.engenheiro && (
          <Link
            href="/cadDemandas"
            className={`links relative ${
              id === "cadDemandas" ? "after:scale-100" : ""
            }`}
          >
            Cadastrar Demandas
          </Link>
        )}

        <Link
          href="/vistoriadores"
          className={`links relative ${
            id === "vistoriadores" ? "after:scale-100" : ""
          }`}
        >
          Vistoriadores
        </Link>
        <Link
          href="/perfil"
          className={`links relative ${
            id === "perfil" ? "after:scale-100" : ""
          }`}
        >
          Perfil
        </Link>
        <button onClick={handleLogout}>
          <Image src={logout} alt="Sair" width={20} height={20} />
        </button>
      </div>
    </nav>
  );
}
