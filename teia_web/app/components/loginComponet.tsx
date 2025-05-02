"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Label from "./UI/label";
import { Input, Select } from "./UI/input";
import { PrimaryButton } from "./UI/buttons";
import getLogin from "../data/getLogin";
import { AuthContext } from "../actions/valid";
import postNewUSer from "../data/postNewUser";
import { toast } from "sonner";
import { PatternFormat } from "react-number-format";
import { queryClient } from "../helper/useQuery";

const getUseForm = z.object({
  username: z.string().nonempty("Campo obrigatório"),
  password: z.string().nonempty("Campo obrigatório"),
});

const getNewUserForm = z.object({
  name: z.string().nonempty("Campo obrigatório"),
  username: z.string().nonempty("Campo obrigatório"),
  email: z.string().email("Email inválido").nonempty("Campo obrigatório"),
  password: z.string().nonempty("Campo obrigatório"),
  type: z.number(),
  phone: z.string().nonempty("Campo obrigatório"),
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
    control,
  } = useForm<GetNewUserForm>({
    resolver: zodResolver(getNewUserForm),
  });

  const [logOrCad, setLogOrCad] = useState<boolean>(false);
  function handleLogOrCad() {
    setLogOrCad(!logOrCad);
  }
  const [loading, setLoading] = useState<boolean>(false);
  const { Login } = useContext(AuthContext);

  const router = useRouter();

  async function handleSubmitForm(data: GetUseForm) {
    try {
      // console.log(data);
      setLoading(true);
      const res = await getLogin(data.username, data.password);
      queryClient.invalidateQueries();
      if (res.status == 200) {
        await Login(res.message as string);
        router.push("/home");
      }
      if (res.status == 400) {
        setErrorMenssage(res.message);
        setLoading(false);
      }
      if (res.status == 404) {
        setErrorMenssage("Usuario não exsite!");
        setLoading(false);
      }
      // setLoading(false);
    } catch (err) {
      console.error("Erro ao enviar o formulário:", err);
      setErrorMenssage(
        "Ocorreu um erro ao enviar o formulário. Tente novamente."
      );
      setLoading(false);
    }
  }

  function handleNewUserForm(data: GetNewUserForm) {
    try {
      console.log(data);
      if (data.type != 0) {
        const reponse = postNewUSer(data);
        toast.promise(
          reponse.then(() => true),
          {
            loading: "Cadastrando...",
            success: "Cadastrado com sucesso",
            error: "Erro ao cadastrar",
          }
        );
        setLogOrCad(false);
      }
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
        className={`flex md:flex-row flex-col items-start justify-between gap-5 p-5 bg-zinc-50 drop-shadow-2xl shadow-2xl rounded-lg w-[75%] md:w-[60%] h-[95%] md:h-[85%] relative before:bg-gradient-to-r before:from-blue-700 before:to-indigo-900  ${
          logOrCad ? "log" : "cad"
        }`}
      >
        <div className="flex flex-col gap-5 justify-center items-center w-full h-full">
          <div className="flex flex-col w-full justify-around items-center  h-full">
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
                  <Label htmlFor="username">
                    Usuário{" "}
                    {formState.errors.username && (
                      <span className="text-red-500 text-sm">
                        Campo obrigatorio
                      </span>
                    )}
                  </Label>
                  <Input
                    type="text"
                    placeholder="Digite seu usuário"
                    width={`md:w-80 `}
                    id="username"
                    {...register("username")}
                  />
                </div>
                <div className="flex flex-col gap-2 ">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    type="password"
                    placeholder="Digite sua Senha"
                    width={`md:w-80`}
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
                        Carregando...
                      </span>
                    </div>
                    Carregando
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
            className={`flex flex-col gap-16  absolute  trasnform md:top-1/2 md:-translate-y-1/2 items-center justify-center  ${
              logOrCad ? "In z-20" : "Out -z-20 opacity-0 "
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
        <div className="flex flex-col h-full relative justify-center items-center w-full">
          <div className="flex flex-col gap-20  w-full justify-center items-center h-full">
            <h1 className="text-4xl font-bold text-center text-indigo-700">
              Cadastrar-se
            </h1>
            <form
              onSubmit={handleSubmitNewUser(handleNewUserForm)}
              action=""
              className="flex flex-col gap-4 w-full justify-center items-center"
            >
              <div className="flex flex-col gap-5 w-full justify-center items-center">
                <div className="flex w-full justify-around items-center gap-4 ">
                  <div className="flex flex-col gap-1 ">
                    <Label htmlFor="username">
                      Nome{" "}
                      {formState.errors.username && (
                        <span className="text-red-500 text-sm">
                          campo obrigatório
                        </span>
                      )}
                    </Label>
                    <Input
                      type="text"
                      placeholder="Digite seu usuário"
                      id="name"
                      {...registerNewUser("name")}
                    />
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <Label htmlFor="user">
                      Usuário{" "}
                      {formStateNewUser.errors.username && (
                        <span className="text-red-500 text-sm">
                          Campo obrigatório
                        </span>
                      )}
                    </Label>
                    <Input
                      type="text"
                      placeholder="Digite seu usuário"
                      id="user"
                      {...registerNewUser("username")}
                    />
                  </div>
                </div>
                <div className="flex w-full justify-around items-center gap-4">
                  <div className="flex flex-col gap-1 ">
                    <Label htmlFor="email">
                      Email{" "}
                      {formStateNewUser.errors.email && (
                        <span className="text-red-500 text-sm">
                          Campo obrigatório
                        </span>
                      )}
                    </Label>
                    <Input
                      type="email"
                      placeholder="Digite seu email"
                      id="email"
                      {...registerNewUser("email")}
                    />
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <Label htmlFor="pass">
                      Senha{" "}
                      {formStateNewUser.errors.password && (
                        <span className="text-red-500 text-sm">
                          Campo obrigatório
                        </span>
                      )}
                    </Label>
                    <Input
                      type="password"
                      placeholder="Digite sua Senha"
                      id="pass"
                      {...registerNewUser("password")}
                    />
                  </div>
                </div>
                <div className="flex w-full justify-around items-center gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <Label htmlFor="phone">Telefone</Label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <PatternFormat
                          format="(##) #####-####"
                          autoComplete="tel-national"
                          customInput={Input}
                          placeholder="(99) 99999-9999"
                          id="phone"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1 ">
                    <Label>
                      Tipo{" "}
                      {formStateNewUser.errors.type && (
                        <span className="text-red-500 text-sm">
                          Campo obrigatório
                        </span>
                      )}
                    </Label>
                    <Select
                      id="type"
                      {...registerNewUser("type", { valueAsNumber: true })}
                    >
                      <option value="0">Selecione</option>
                      <option value={2}>Engenheiro</option>
                      <option value={3}>Vistoriador</option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5 w-60 justify-center items-center">
                <PrimaryButton type="submit">Salvar</PrimaryButton>
              </div>
            </form>
          </div>
          <div
            className={`flex flex-col gap-16  absolute   items-center justify-center ${
              logOrCad ? "Out -z-20 opacity-0" : "In z-20"
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
