"use client";

import MainLayout from "../components/mainLayout";
import { Input } from "../components/UI/input";
import Label from "../components/UI/label";
import { PrimaryButton, SecondaryButton } from "../components/UI/buttons";
import { ModalPass, useModalTransition } from "../components/modalPass";
import { useState } from "react";

export default function Perfil() {
  const { isOpen, open, close } = useModalTransition();

  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.id === "type" || input.id === "status") return;
      input.style.border = edit ? "none" : "3px solid #4f46e5";
      input.readOnly = edit;
    });
    setEdit(!edit);
  };

  return (
    <MainLayout id="perfil" width="w-1/2">
      <h1 className="text-indigo-700 font-bold text-xl">Perfil do Usuario</h1>
      <div className="w-full h-full flex flex-wrap justify-center items-center gap-5">
        <div className="flex flex-col justify-start items-strat ">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" readOnly style={{ border: "none" }} />
        </div>
        <div className="flex flex-col justify-start items-strat ">
          <Label htmlFor="username">Username</Label>
          <Input id="username" readOnly style={{ border: "none" }} />
        </div>
        <div className="flex flex-col justify-start items-strat ">
          <Label htmlFor="email">Email</Label>
          <Input id="email" readOnly style={{ border: "none" }} />
        </div>
        <div className="flex flex-col justify-start items-strat ">
          <Label htmlFor="tel">Telefone</Label>
          <Input id="tel" readOnly style={{ border: "none" }} />
        </div>
        <div className="flex flex-col justify-start items-strat ">
          <Label htmlFor="type">Tipo</Label>
          <Input id="type" readOnly style={{ border: "none" }} />
        </div>
        <div className="flex flex-col justify-start items-strat ">
          <Label htmlFor="status">Status</Label>
          <Input id="status" readOnly style={{ border: "none" }} />
        </div>
      </div>
      <div className="flex justify-center w-full items-center gap-5">
        <PrimaryButton style={{ width: "100%" }} onClick={handleEdit}>
          Editar
        </PrimaryButton>
        <SecondaryButton style={{ width: "100%" }} onClick={open}>
          Solicitar troca de senha
        </SecondaryButton>
      </div>
      <ModalPass isOpen={isOpen} close={close} />
    </MainLayout>
  );
}
