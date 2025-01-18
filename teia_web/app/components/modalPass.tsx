"use client";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "../components/UI/buttons";
import { Input } from "../components/UI/input";

export const useModalTransition = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close };
};

export const ModalPass = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [title, setTitle] = useState(
    "Digite o codigo enviade para o seu email, para a troca da sua senha!"
  );
  const [buttonText, setButtonText] = useState("Enviar");
  const handleSend = () => {
    if (buttonText === "Enviar") {
      setTitle("Codigo verificado com sucesso, digite a nova senha!");
      setButtonText("Salvar");
      return;
    } else {
      close();
      setTitle(
        "Digite o codigo enviade para o seu email, para a troca da sua senha!"
      );
      setButtonText("Enviar");
    }
  };

  
  const handleCompare = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = document.getElementById("password") as HTMLInputElement;
    const input2 = document.getElementById("password2") as HTMLInputElement;
    if (input && input2) {
      if (input.value !== input2.value) {
        input2.style.border = "2px solid red";
      } else {
        input2.style.border = "2px solid green";
      }
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      as="div"
      className=" fixed inset-0 z-10 overflow-y-auto relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 text-indigo-700">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 flex flex-col rounded-lg shadow-lg justify-center items-center text-center">
          <DialogTitle className="font-bold">Trocar Senha</DialogTitle>
          <Description>{title}</Description>

          {buttonText === "Salvar" ? (
            <div className="flex gap-4">
              <Input id="password" type="password" placeholder="Nova Senha" />
              <Input
                id="password2"
                type="password"
                placeholder="Confirme a Senha"
                onChange={handleCompare}
              />
            </div>
          ) : (
            <input
              id="code"
              className="text-center text-indigo-700 font-bold uppercase border-b-2 border-indigo-700 w-36"
              maxLength={6}
              max={6}
            />
          )}

          <div className="flex gap-4">
            <PrimaryButton type="button" onClick={handleSend}>
              {buttonText}
            </PrimaryButton>
            <SecondaryButton type="button" onClick={close}>
              Cancelar
            </SecondaryButton>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
