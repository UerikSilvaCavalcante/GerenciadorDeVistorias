"use client";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useContext, useState } from "react";
import { PrimaryButton, SecondaryButton } from "../components/UI/buttons";
import { Input } from "../components/UI/input";
import ValidCode from "../data/validCode";
import { toast } from "sonner";
import { parseCookies } from "nookies";
import { AuthContext } from "../actions/valid";
import { Condiment } from "next/font/google";
import setNewPassword from "../data/setNewPass";

export const useModalTransition = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close };
};

export const ModalPass = ({
  isOpen,
  close,
  id,
  token,
}: {
  isOpen: boolean;
  id: number;
  token: string;
  close: () => void;
}) => {
  const [title, setTitle] = useState(
    "Digite o codigo enviade para o seu email, para a troca da sua senha!"
  );
  const [save, setSave] = useState(false);
  const handleSend = async () => {
    if (!save) {
      const input = document.getElementById("code") as HTMLInputElement;

      const code = input.value;
      const response = await ValidCode(
        id,
        "turistajose1@gmail.com",
        code,
        token
      );
      if (response) {
        setTitle("Digite a nova senha");
        setSave(true);
      } else {
        setTitle("Codigo invalido, Tente novamente");
        toast.error("Codigo invalido!");
      }
    } else {
      close();
      setTitle(
        "Digite o codigo enviado para o seu email, para a troca da sua senha!"
      );
    }
  };

  const handleSave = async () => {
    const input = document.getElementById("password") as HTMLInputElement;
    const input2 = document.getElementById("password2") as HTMLInputElement;
    if (input2.value == input.value) {
      const value = input.value;
      const response = setNewPassword(id, value, token);
      toast.promise(
        response.then(() => true),
        {
          loading: "Salvando...",
          success: "Senha salva com sucesso!",
          error: "Erro ao salvar!",
        }
      );
      close();
    } else {
      setTitle("As senhas não são iguais");
    }
  };

  const handleCompare = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = document.getElementById("password") as HTMLInputElement;
    const input2 = document.getElementById("password2") as HTMLInputElement;
    if (input && input2) {
      if (input.value !== input2.value) {
        setTitle("As senhas não são iguais");
        input2.style.border = "2px solid red";
      } else {
        setTitle("Digite a nova senha");
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
        <DialogPanel className="max-w-lg w-[700px] space-y-4 border bg-white p-12 flex flex-col rounded-lg shadow-lg justify-center items-center text-center">
          <DialogTitle className="font-bold">Trocar Senha</DialogTitle>
          <Description>{title}</Description>

          {save ? (
            <div className="flex flex-col gap-4">
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
              className="text-center text-indigo-700 font-bold  border-b-2 border-indigo-700 w-36"
              maxLength={6}
              max={6}
            />
          )}

          <div className="flex gap-4">
            {save ? (
              <PrimaryButton type="button" onClick={handleSave}>
                Salvar
              </PrimaryButton>
            ) : (
              <PrimaryButton type="button" onClick={handleSend}>
                Enviar
              </PrimaryButton>
            )}
            <SecondaryButton type="button" onClick={close}>
              Cancelar
            </SecondaryButton>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
