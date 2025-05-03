"use client";

import Link from "next/link";
import Image from "next/image";
import logout from "../assets/box-arrow-right.svg";
import { AuthContext, Logout } from "../actions/valid";
import { useRouter } from "next/navigation";
import { lazy, Suspense, useContext, useState } from "react";
import { Type } from "../enums/user";
import { queryClient } from "../helper/useQuery";

const Checkbox = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <label>
      <div className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center z-40">
        <input
          id="op"
          className="hidden peer"
          type="checkbox"
          checked={isOpen}
          onChange={() => {
            setIsOpen(!isOpen);
          }}
        />
        <div className="w-[50%] h-[2px] bg-zinc-50 rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]" />
        <div className="w-[50%] h-[2px] bg-zinc-50 rounded-md transition-all duration-300 origin-center peer-checked:hidden" />
        <div className="w-[50%] h-[2px] bg-zinc-50 rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]" />
      </div>
    </label>
  );
};

const Usuario = lazy(() => import("./usuario"));

export default function NavBarMobile({ id }: { id: string }) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  async function handleLogout() {
    queryClient.clear();
    await Logout();
    router.push("/");
  }
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex bg-gradient-to-r from-indigo-800 to-blue-950 h-9 w-full items-center justify-between px-3 py-1 fixed top-0 z-10 text-zinc-50">
      <Suspense
        fallback={
          <div className="w-20 h-5 bg-blue-950 animate-pulse rounded-md"></div>
        }
      >
        <Usuario />
      </Suspense>
      <div
        className={`items-center justify-between gap-7 ${
          isOpen ? "h-[100vh] w-[100%]" : "w-0 h-[100vh]"
        } z-10 transition-all duration-300 absolute top-0 right-0 overflow-hidden`}
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div
          className={`items-center justify-between gap-7 bg-gradient-to-r from-indigo-800 to-blue-950 ${
            isOpen ? "h-[100vh] w-[50%]" : "w-0 h-[100vh]"
          } z-10 transition-all duration-300 absolute top-0 right-0 overflow-hidden backdrop-blur-md bg-opacity-60`}
        >
          <div className="flex flex-col items-end justify-between gap-7 text-base font-bold m-5">
            <Checkbox isOpen={isOpen} setIsOpen={setIsOpen} />

            <Link
              href="/home"
              className={`links relative ${
                id === "home" ? "after:scale-100" : ""
              }`}
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
        </div>
      </div>
      <Checkbox isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
}
