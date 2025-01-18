"use client";

import trash from "../assets/trash.svg";
import down from "../assets/down.svg";
import Image from "next/image";
import { PrimaryButton, SecondaryButton } from "./UI/buttons";
import { useState } from "react";

interface MessageLayoutProps {
  status: boolean;
  name: string;
  message?: string;
}

export default function MesageLayout({
  status,
  name,
  message,
}: MessageLayoutProps) {
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(!open);
  }

  return (
    <div className="flex flex-col w-full justify-center items-center  bg-blue-800 rounded-lg p-4 gap-5 transition-transform duration-500">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center justify-between w-52 px-4  ">
          <div
            className={`w-5 h-5 rounded-full ${
              status ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <h2 className="text-zinc-50 font-semibold capitalize text-lg">
            {name}
          </h2>
        </div>
        <div className="flex items-center gap-6 w-fit px-4">
          <button>
            <Image src={trash} alt="trash" />
          </button>
          <button onClick={handleOpen}>
            <Image
              src={down}
              alt="down"
              className={`${
                open ? "rotate-180" : "rotate-0"
              } transition-transform duration-300`}
            />
          </button>
        </div>
      </div>
      <div
        className={` bg-zinc-50 w-full  text-justify p-4 h-36 ${
          open ? "block" : "hidden"
        }`}
      >
        <p className="text-zinc-950 text-justify">{message}</p>
      </div>
      <div
        className={` justify-end items-center w-full gap-3 text-sm ${
          open ? "flex" : "hidden"
        }`}
      >
        <button className="px-3 py-1 bg-transparent text-white border-2 border-zinc-50 rounded-md hover:scale-105 transition-transform duration-300">
          Marcar como lida
        </button>
        <button className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:scale-105 transition-transform duration-300">
          Responder
        </button>
      </div>
    </div>
  );
}
