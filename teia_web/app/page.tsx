"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Label from "./components/UI/label";
import { Input } from "./components/UI/input";
import { PrimaryButton } from "./components/UI/buttons";
import { Autentication, Logout } from "./actions/valid";
import getLogin from "./data/getLogin";

const getUseForm = z.object({
  username: z.string().nonempty("Campo obrigatório"),
  password: z.string().nonempty("Campo obrigatório"),
});

const getNewUserForm = z.object({
  username: z.string().nonempty("Campo obrigatório"),
  email: z.string().email("Email inválido").nonempty("Campo obrigatório"),
  password: z.string().nonempty("Campo obrigatório"),
  type: z.string().nonempty("Campo obrigatório"),
});

type GetUseForm = z.infer<typeof getUseForm>;
type GetNewUserForm = z.infer<typeof getNewUserForm>;

export default function Login() {
  const [errorMenssage, setErrorMenssage] = useState<string | null>(null);
  const { register, handleSubmit, formState } = useForm<GetUseForm>({
    resolver: zodResolver(getUseForm),
  });

  const {
    register: registerNewUser,
    handleSubmit: handleSubmitNewUser,
    formState: formStateNewUser,
  } = useForm<GetNewUserForm>({
    resolver: zodResolver(getNewUserForm),
  });

  const [logOrCad, setLogOrCad] = useState<boolean>(false);
  function handleLogOrCad() {
    setLogOrCad(!logOrCad);
  }
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function handleSubmitForm(data: GetUseForm) {
    try {
      console.log(data);
      setLoading(true);
      const res = await getLogin(data.username, data.password);
      if (res) {
        await Autentication(res);
        router.push("/home");
        
      }else{
        setErrorMenssage("Usario ou Senha incorretos");
      }
      setLoading(false);
      
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err);
      setErrorMenssage(
        "Ocorreu um erro ao enviar o formulário. Tente novamente."
      );
    }
  }

  function handleNewUserForm(data: GetNewUserForm) {
    try {
      console.log(data);
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err);
      setErrorMenssage(
        "Ocorreu um erro ao enviar o formulário. Tente novamente."
      );
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div
        className={`flex items-start justify-between gap-5 p-5 bg-zinc-50 drop-shadow-2xl shadow-2xl rounded-lg w-[60%] h-[80%] relative before:bg-gradient-to-r before:from-blue-700 before:to-indigo-900 ${
          logOrCad ? "log" : "cad"
        }`}
      >
        <div className="flex flex-col gap-5 justify-center items-center w-full ">
          <div className="flex flex-col w-full justify-center items-center gap-[100px]">
            <h1 className="text-4xl font-bold text-center text-indigo-700">
              Login
            </h1>
            <form
              onSubmit={handleSubmit(handleSubmitForm)}
              action=""
              className="flex flex-col gap-5 w-full justify-center items-center"
            >
              <div className="flex flex-col gap-5 w-full justify-center items-center">
                <div className="flex flex-col gap-2 ">
                  <Label htmlFor="username">Usuário</Label>
                  <Input
                    type="text"
                    placeholder="Digite seu usuário"
                    width={`w-80`}
                    id="username"
                    {...register("username")}
                  />
                  {formState.errors.username && (
                    <span className="text-red-500 text-sm">
                      {formState.errors.username.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 ">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    type="password"
                    placeholder="Digite sua Senha"
                    width={`w-80`}
                    id="password"
                    {...register("password")}
                  />
                  {formState.errors.password && (
                    <span className="text-red-500 text-sm">
                      {formState.errors.password.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-5 w-60 justify-center items-center">
              {errorMenssage && (
              <p className="text-red-500 text-sm">{errorMenssage}</p>
            )}
                {loading ? (
                  <button
                    className="inline-block rounded-md bg-blue-500 text-neutral-50 focus:bg-blue-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                    type="button"
                  >
                    <div
                      role="status"
                      className="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                    Loading
                  </button>
                ) : (
                  <PrimaryButton type="submit">Entrar</PrimaryButton>
                )}

                <div className="text-zinc-600 border-b-2 border-zinc-600 ">
                  Esqueci minha senha
                </div>
              </div>
            </form>
            
          </div>
          <div
            className={`flex flex-col gap-16  absolute top-1/2 trasnform -translate-y-1/2 items-center justify-center  ${
              logOrCad ? "In " : "Out -z-20 opacity-0 "
            }`}
          >
            <h1 className="text-4xl font-bold text-center text-zinc-50">
              Ja possui cadastro
            </h1>
            <p className="text-lg text-center text-zinc-200">
              Já tem cadastrado no sistema.
              <br />
              Faça Login Agora mesmo
            </p>
            <button
              className={`relative px-8 py-1 rounded-md bg-transparent isolation-auto z-10 border-2 border-blue-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-zinc-50 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-zinc-50 hover:text-blue-600 hover:duration-700  `}
              disabled={logOrCad ? false : true}
              onClick={handleLogOrCad}
            >
              Entrar
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-5 w-full justify-center items-center">
            <h1 className="text-4xl font-bold text-center text-indigo-700">
              Cadastra-se
            </h1>
            <form
              onSubmit={handleSubmitNewUser(handleNewUserForm)}
              action=""
              className="flex flex-col gap-5 w-full justify-center items-center"
            >
              <div className="flex flex-col gap-5 w-full justify-center items-center">
                <div className="flex flex-col gap-2 ">
                  <Label htmlFor="user">Usuário</Label>
                  <Input
                    type="text"
                    placeholder="Digite seu usuário"
                    width={`w-80 `}
                    id="user"
                    {...registerNewUser("username")}
                  />
                  {formStateNewUser.errors.username && (
                    <span className="text-red-500 text-sm">
                      {formStateNewUser.errors.username.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 ">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="Digite seu email"
                    width={`w-80 `}
                    id="email"
                    {...registerNewUser("email")}
                  />
                  {formStateNewUser.errors.email && (
                    <span className="text-red-500 text-sm">
                      {formStateNewUser.errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 ">
                  <Label htmlFor="pass">Senha</Label>
                  <Input
                    type="password"
                    placeholder="Digite sua Senha"
                    width={`w-80`}
                    id="pass"
                    {...registerNewUser("password")}
                  />
                  {formStateNewUser.errors.password && (
                    <span className="text-red-500 text-sm">
                      {formStateNewUser.errors.password.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 ">
                  <Label>Tipo</Label>
                  <select
                    id="type"
                    className={`w-80  bg-zinc-950 rounded-md border-2 focus:shadow-md border-indigo-600  shadow-indigo-700 py-2 `}
                    {...registerNewUser("type")}
                  >
                    <option value="0">Selecione</option>
                    <option value="2">Engenheiro</option>
                    <option value="3">Vistoriador</option>
                  </select>
                  {formStateNewUser.errors.type && (
                    <span className="text-red-500 text-sm">
                      {formStateNewUser.errors.type.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-5 w-60 justify-center items-center">
                <PrimaryButton type="submit">Salvar</PrimaryButton>
                <div className="text-zinc-600 border-b-2 border-zinc-600 ">
                  Esqueci minha senha
                </div>
              </div>
            </form>
          </div>
          <div
            className={`flex flex-col gap-16  absolute top-1/2 right-6 trasnform -translate-y-1/2 items-center justify-center ${
              logOrCad ? "Out -z-20 opacity-0" : "In"
            }`}
          >
            <h1 className="text-4xl font-bold text-center text-zinc-50">
              Bem Vindo
            </h1>
            <p className="text-lg text-center text-zinc-200">
              Ainda não é cadastrado no nosso sistema.
              <br />
              Faça seu cadastro agora mesmo
            </p>
            <button
              className="relative px-8 py-1 rounded-md bg-transparent isolation-auto z-10 border-2 border-blue-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-zinc-50 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 text-zinc-50 hover:text-blue-600 hover:duration-700"
              disabled={logOrCad ? true : false}
              onClick={handleLogOrCad}
            >
              Cadastrar-se
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
