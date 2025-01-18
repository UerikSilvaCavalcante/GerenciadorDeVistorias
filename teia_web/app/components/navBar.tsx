"use client"

import Link from "next/link";
import Image from "next/image";
import logout from "../assets/box-arrow-right.svg";
import { Logout } from "../actions/valid";
import { useRouter } from "next/navigation";

export default function NavBar({
  id,
  user = "Usuario",
}: {
  id: string;
  user?: string;
}) {
  const router = useRouter();
  async function handleLogout() {
    await Logout();
    router.push("/");
  }
  return (
    <nav className="flex bg-gradient-to-r from-indigo-800 to-blue-950 h-9 w-full items-center justify-between px-3 py-1 fixed top-0 z-10">
      <div className="flex items-center border-r-zinc-50 border-solid border-r-2 px-4">
        <p className="font-bold text-zinc-50">Olá, {user}</p>
      </div>
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
        <Link
          href="/cadDemandas"
          className={`links relative ${
            id === "cadDemandas" ? "after:scale-100" : ""
          }`}
        >
          Cadastrar Demandas
        </Link>
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
