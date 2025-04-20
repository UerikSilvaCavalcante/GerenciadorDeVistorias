"use client";

import MainLayout from "../components/mainLayout";
import { Input, Select } from "../components/UI/input";
import Label from "../components/UI/label";
import { PrimaryButton, SecondaryButton } from "../components/UI/buttons";
import { ModalPass, useModalTransition } from "../components/modalPass";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../actions/valid";
import { status, Type } from "../enums/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserProps } from "../@types/usersTypes";
import putUser from "../data/putUser";
import { parseCookies } from "nookies";
import { toast } from "sonner";
import SetCode from "../data/setCode";

const userForm = z.object({
  name: z.string().min(1, "Nome é obrigatorio"), //.nonempty(),
  userName: z.string().min(1, "Username é obrigatorio"), //.nonempty(),
  email: z.string().email(), //email(),
  phone: z.string(), //.nonempty(),
});

type UserFormProps = z.infer<typeof userForm>;

export default function Perfil() {
  const { isOpen, open, close } = useModalTransition();
  const { user } = useContext(AuthContext);
  const { token } = parseCookies();

  

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  const { register, handleSubmit, formState, reset } =
    useForm<UserFormProps>({
      resolver: zodResolver(userForm),
      defaultValues: {
        name: user?.name || "Deu errado",
        userName: user?.userName || "Deu errado",
        email: user?.email || "Deu errado",
        phone: user?.phone || "Deu errado",
      },
    });

  async function handleSave(data: UserFormProps) {
    const userUpdate: UserProps = {
      id: user?.id as number,
      name: data.name,
      userName: data.userName,
      email: data.email,
      phone: data.phone,
      password: user?.password as string,

      type: user?.type as Type,
      status: user?.status as status,
      createAt: user?.createAt as Date,
    };
    console.log(userUpdate);
    const response = putUser(userUpdate, token);
    toast.promise(
      response.then(() => true),
      {
        loading: "Salvando...",
        success: "Salvo com sucesso!",
        error: "Erro ao salvar!",
      }
    );
    setEdit(false);
  }

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

  const handlePassword = async () => {
    const { token } = parseCookies();
    const response = SetCode(user?.id as number, token);
    toast.promise(
      response.then(() => {
        open();
        return true;
      }),
      {
        loading: "Enviando...",
        success: "Codigo enviado com sucesso!",
        error: "Erro ao enviar codigo!",
      }
    );
  };

  return (
    <MainLayout id="perfil" width="w-1/2" title="Perfil">
      <h1 className="text-indigo-700 font-bold text-xl">Perfil do Usuario</h1>

      <div className="w-full h-full flex flex-wrap justify-center items-center gap-5">
        <div className="flex flex-col justify-start items-strat ">
          <Label htmlFor="name">
            Nome{" "}
            {formState.errors.name && (
              <span> - {formState.errors.name.message}</span>
            )}
          </Label>
          <Input
            id="name"
            {...register("name")}
            readOnly
            style={{ border: "none" }}
            // defaultValue={user?.name}
          />
        </div>
        <div className="flex flex-col justify-start items-strat ">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            {...register("userName")}
            readOnly
            style={{ border: "none" }}
            // defaultValue={user?.userName}
          />
        </div>
        <div className="flex flex-col justify-start items-strat ">
          <Label htmlFor="email">
            Email{" "}
            {formState.errors.email && (
              <span> - {formState.errors.email.message}</span>
            )}
          </Label>
          <Input
            id="email"
            {...register("email")}
            readOnly
            style={{ border: "none" }}
            // defaultValue={user?.email}
          />
        </div>
        <div className="flex flex-col justify-start items-strat ">
          <Label htmlFor="tel">Telefone</Label>
          <Input
            id="tel"
            {...register("phone")}
            readOnly
            style={{ border: "none" }}
            // defaultValue={user?.phone}
          />
        </div>
        <div className="flex flex-col justify-start items-strat ">
          <Label htmlFor="type">Tipo</Label>
          <Select
            id="type"
            value={user?.type}
            disabled
            style={{ border: "none", width: "230px" }}
          >
            <option value={Type.engenheiro}>Engenheiro</option>
            <option value={Type.vistoriador}>Vistoriador</option>
          </Select>
        </div>
        <div className="flex flex-col justify-start items-strat ">
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            defaultValue={user?.status}
            disabled
            style={{ border: "none", width: "230px" }}
          >
            <option value={status.Ativado}>Ativado</option>
            <option value={status.Bloqueado}>Bloqueado</option>
            <option value={status.Cancelado}>Cancelado</option>
          </Select>
        </div>
      </div>
      <div className="flex justify-center w-full items-center gap-5">
        {edit ? (
          <PrimaryButton
            style={{ width: "100%" }}
            onClick={handleSubmit(handleSave)}
          >
            Salvar{" "}
          </PrimaryButton>
        ) : (
          <PrimaryButton style={{ width: "100%" }} onClick={handleEdit}>
            Editar
          </PrimaryButton>
        )}
        <SecondaryButton style={{ width: "100%" }} onClick={handlePassword}>
          Solicitar troca de senha
        </SecondaryButton>
      </div>
      <ModalPass isOpen={isOpen} close={close} id={user?.id as number} token={token} />
    </MainLayout>
  );
}
