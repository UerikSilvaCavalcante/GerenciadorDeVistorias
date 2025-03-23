"use client";

import React, { useEffect, useState } from "react";
import { Input, Select } from "../components/UI/input";
import {
  EspecialButton,
  EspecialSecondaryButton,
} from "../components/UI/buttons";
import Label from "../components/UI/label";
import { Tipo, TipoImovel } from "../enums/vistoria";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import Image from "next/image";
import plus from "../assets/plus.svg";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import postNewVistoria from "../data/postNewVistoria";
import { queryClient } from "../helper/useQuery";
import { VistoriaProps } from "../@types/vistoriaTypes";
import putVistoria from "../data/putVistoriaEng";
import { handleNotification } from "./UI/notifications";
import getAllVistoriador from "../data/getAllVistoriador";
import { toast } from "sonner";
import { validData } from "@hookform/resolvers/class-validator/src/__tests__/__fixtures__/data.js";

const getVistoriaForm = z.object({
  numOs: z.string().nonempty(),
  tipo: z.enum([
    Tipo.A413.toString(),
    Tipo.B437.toString(),
    Tipo.B438.toString(),
    Tipo.E401.toString(),
  ]),
  dataAbertura: z.string().nonempty(),
  idVistoriador: z.string().nonempty().min(1),
  contratante: z.string().nonempty(),
  tel_Contratante: z.string().nonempty(),
  cliente: z.string().nonempty(),
  endereco: z.string().nonempty(),
  complemento: z.string().nonempty(),
  numero: z.string().nonempty(),
  bairro: z.string().nonempty(),
  cidade: z.string().nonempty(),
  estado: z.string().nonempty(),
  cep: z.string().nonempty(),
  tipoImovel: z.enum([
    TipoImovel.Casa.toString(),
    TipoImovel.Apartamento.toString(),
    TipoImovel.Lote.toString(),
    TipoImovel.Obra.toString(),
    TipoImovel.Infrutifera.toString(),
  ]),
  latitude: z.string().optional().default("00° 00' 00.000"),
  longitude: z.string().optional().default("00° 00' 00.000"),
  obs: z.string(),
});

type VistoriaForm = z.infer<typeof getVistoriaForm>;
type VistoriadorProps = {
  label: string;
  value: number;
};

export default function FormsDemanda({
  vistoria,
  token,
}: {
  vistoria?: VistoriaProps;
  token: string;
}) {
  const [errorMenssage, setErrorMenssage] = useState<string>("");
  const router = useRouter();
  const { isOpen, open, close } = handleNotification();

  const { register, control, handleSubmit, formState } = useForm<VistoriaForm>({
    resolver: zodResolver(getVistoriaForm),
  });
  async function handleSubmitForm(dataForm: VistoriaForm) {
    try {
      console.log(dataForm);
      let res;
      if (vistoria) {
        res =  putVistoria(dataForm, vistoria.id);
      } else {
        res =  postNewVistoria(dataForm, token);
      }
      toast.promise(res.then(() => true), {
        loading: "Salvando...",
        success: `Vistoria ${dataForm.numOs} salva com sucesso`,
        error: "Error",
      });

      const valid = await res;
      if (valid) {
        queryClient.invalidateQueries({ queryKey: ["vistorias"] });
        router.push("/demandas");
      } else {
        setErrorMenssage(`Erro ao salvar ${res} `);
      }
    } catch (err) {
      setErrorMenssage(`Erro ao salvar ${err} `);
    }
  }

  const [vistoriadores, setVistoriadores] = useState<VistoriadorProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllVistoriador(token as string);
      if (data) {
        setVistoriadores(
          data.map((vistoriador) => ({
            label: vistoriador.name,
            value: vistoriador.id,
          }))
        );
      }
    };
    fetchData();
  }, []);

  const [search, setSearch] = useState<string>("");
  const handleSetSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  if (vistoria && vistoria.idVistoriador) {
    register("idVistoriador", { value: vistoria.idVistoriador.toString() });
  }

  const handleComplete = (change: string, key: number) => {
    const input = document.getElementById("idVistoriador") as HTMLInputElement;
    input.value = change;
    register("idVistoriador", { value: key.toString() });
    setSearch("");
  };

  return (
    <form
      className="flex flex-col gap-7 w-full justify-start items-start"
      onSubmit={handleSubmit(handleSubmitForm)}
      action=""
    >
      <div className="flex gap-8 w-full justify-start items-center">
        <div className="flex flex-col gap-3 justify-start items-start">
          <Label htmlFor="numOs">
            Numero OS{" "}
            {formState.errors.numOs && (
              <span className="text-red-500">- Campo Obrigatorio</span>
            )}
          </Label>
          <Input
            id="numOs"
            type="text"
            {...register("numOs")}
            defaultValue={vistoria?.numOs.toString() as string}
          />
        </div>
        <div className="flex flex-col  gap-3 justify-start items-start">
          <Label htmlFor="type">
            Tipo de Serviço{" "}
            {formState.errors.tipo && (
              <span className="text-red-500">- Campo Obrigatorio</span>
            )}
          </Label>
          <Select
            id="tipo"
            style={{ width: "260px" }}
            {...register("tipo")}
            defaultValue={vistoria?.type as Tipo}
          >
            <option value="">Selecione</option>
            <option value={Tipo.A413}>A-413</option>
            <option value={Tipo.B437}>B-437</option>
            <option value={Tipo.B438}>B-438</option>
            <option value={Tipo.E401}>E-401</option>
          </Select>
        </div>
        <div className="flex flex-col gap-3 justify-start items-start">
          <Label htmlFor="dataAbertura">
            Data de Abertura{" "}
            {formState.errors.dataAbertura && (
              <span className="text-red-500">- Campo Obrigatorio</span>
            )}
          </Label>
          <Input
            id="dataAbertura"
            type="date"
            style={{ colorScheme: "dark", width: "250px" }}
            {...register("dataAbertura")}
            defaultValue={
              vistoria?.dataAbertura
                ? new Date(vistoria.dataAbertura).toISOString().split("T")[0]
                : undefined
            }
          />
        </div>
        <div className="flex flex-col gap-3 justify-start items-start">
          <Label htmlFor="idVistoriador">
            Vistoriador{" "}
            {formState.errors.idVistoriador && (
              <span className="text-red-500">
                {formState.errors.idVistoriador.message}
              </span>
            )}
          </Label>
          <Input
            id="idVistoriador"
            type="search"
            onChange={handleSetSearch}
            defaultValue={
              vistoriadores.find((v) => v.value === vistoria?.idVistoriador)
                ?.label
            }
          />

          <ul
            className={`absolute p-2 bg-zinc-950 text-zinc-200 flex flex-col items-start translate-y-16 w-[232px] rounded-md max-h-28 transition-transform duration-700 ${
              search.length > 0 ? "block " : "hidden h-0"
            }`}
          >
            {vistoriadores
              .filter((vistoriador) =>
                vistoriador.label.toUpperCase().startsWith(search.toUpperCase())
              )
              .map((vistoriador) => (
                <li
                  className="border-b-[1px] p-2 w-full border-zinc-50 cursor-pointer"
                  key={vistoriador.value}
                  onClick={() =>
                    handleComplete(vistoriador.label, vistoriador.value)
                  }
                >
                  {vistoriador.label}{" "}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-8 w-full justify-start items-center">
        <div className="flex flex-col gap-3 justify-start items-start w-full">
          <Label htmlFor="contratante">
            Contratante{" "}
            {formState.errors.contratante && (
              <span className="text-red-500">- Campo Obrigatorio</span>
            )}
          </Label>
          <Input
            id="contratante"
            type="text"
            style={{ width: "100%" }}
            {...register("contratante")}
            defaultValue={vistoria?.contratante as string}
          />
        </div>
        <div className="flex flex-col gap-3 justify-start items-start w-full">
          <Label htmlFor="telContratante">
            Telefone Contratante{" "}
            {formState.errors.tel_Contratante && (
              <span className="text-red-500">- Campo Obrigatorio</span>
            )}
          </Label>
          <Controller
            name="tel_Contratante"
            control={control}
            render={({ field }) => (
              <PatternFormat
                format="(##) #####-####"
                autoComplete="tel-national"
                customInput={Input}
                placeholder="(99) 99999-9999"
                style={{ width: "100%" }}
                id="tel_Contratante"
                defaultValue={vistoria?.tel_Contratante as string}
                {...field}
              />
            )}
            defaultValue={vistoria?.tel_Contratante as string}
          />
        </div>
        <div className="flex flex-col gap-3 justify-start items-start w-full">
          <Label htmlFor="cliente">
            Cliente{" "}
            {formState.errors.cliente && (
              <span className="text-red-500">- Campo Obrigatorio</span>
            )}
          </Label>
          <Input
            id="cliente"
            type="text"
            style={{ width: "100%" }}
            {...register("cliente")}
            defaultValue={vistoria?.cliente as string}
          />
        </div>
      </div>
      <div className="flex gap-8 w-full justify-start items-center">
        <div className="flex flex-col gap-3 justify-start items-start w-full">
          <Label htmlFor="endereco">
            Endereço{" "}
            {formState.errors.endereco && (
              <span className="text-red-500">- Campo Obrigatorio</span>
            )}
          </Label>
          <Input
            id="endereco"
            type="text"
            style={{ width: "100%" }}
            {...register("endereco")}
            defaultValue={vistoria?.endereco.rua as string}
          />
        </div>
        <div className="flex flex-col gap-3 justify-start items-start w-full">
          <Label htmlFor="complemento">
            Complemento{" "}
            {formState.errors.complemento && (
              <span className="text-red-500">- Campo Obrigatorio</span>
            )}
          </Label>
          <Input
            id="complemento"
            type="text"
            style={{ width: "100%" }}
            {...register("complemento")}
            defaultValue={vistoria?.endereco.complemento as string}
          />
        </div>
        <div className="flex flex-col gap-3 justify-start items-start ">
          <Label htmlFor="numero">
            Numero{" "}
            {formState.errors.numero && (
              <span className="text-red-500">- Campo Obrigatorio</span>
            )}
          </Label>
          <Input
            id="numero"
            type="text"
            style={{ width: "200px" }}
            {...register("numero")}
            defaultValue={vistoria?.endereco.numero.toString() as string}
          />
        </div>
        <div className="flex flex-col gap-3 justify-start items-start w-full">
          <Label htmlFor="bairro">
            Bairro{" "}
            {formState.errors.bairro && (
              <span className="text-red-500">- Campo Obrigatorio</span>
            )}
          </Label>
          <Input
            id="bairro"
            type="text"
            style={{ width: "100%" }}
            {...register("bairro")}
            defaultValue={vistoria?.endereco.bairro as string}
          />
        </div>
        <div className="flex flex-col gap-3 justify-start items-start ">
          <Label htmlFor="latitude">Latitude</Label>
          <Controller
            name="latitude"
            control={control}
            render={({ field }) => (
              <PatternFormat
                format="##° ##' ##.###"
                autoComplete="lat-national"
                customInput={Input}
                placeholder="00° 00 00.000"
                id="latitude"
                {...field}
                defaultValue={vistoria?.latitude as string}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-3 justify-start items-start ">
          <Label htmlFor="latitude">Longitude</Label>
          <Controller
            name="longitude"
            control={control}
            render={({ field }) => (
              <PatternFormat
                format="##° ##' ##.###"
                autoComplete="lat-national"
                customInput={Input}
                placeholder="00° 00 00.000"
                id="longitude"
                {...field}
                defaultValue={vistoria?.longitude as string}
              />
            )}
          />
        </div>
      </div>
      <div className="flex gap-8 w-full justify-start items-center">
        <div className="flex flex-col gap-3 justify-start items-start w-full">
          <Label htmlFor="cidade">
            Cidade
            {formState.errors.cidade && (
              <span className="text-red-500">- Campo Obrigatorio</span>
            )}
          </Label>
          <Input
            id="cidade"
            type="text"
            style={{ width: "100%" }}
            {...register("cidade")}
            defaultValue={vistoria?.endereco.cidade as string}
          />
        </div>

        <div className="flex flex-col gap-3 justify-start items-start ">
          <Label htmlFor="estado">
            Estado
            {formState.errors.estado && (
              <span className="text-red-500">- Campo Obrigatorio</span>
            )}
          </Label>
          <Select
            id="estado"
            {...register("estado")}
            style={{ width: "200px" }}
            defaultValue={vistoria?.endereco.estado as string}
          >
            <option value="">Selecione</option>
            <option value="GO">GO</option>
            <option value="BR">BR</option>
            <option value="MT">MT</option>
          </Select>
        </div>
        <div className="flex flex-col gap-3 justify-start items-start ">
          <Label htmlFor="cep">
            CEP
            {formState.errors.cep && (
              <span className="text-red-500">- Campo Obrigatorio</span>
            )}
          </Label>
          <Controller
            name="cep"
            control={control}
            defaultValue={vistoria?.endereco.cep as string}
            render={({ field }) => (
              <PatternFormat
                format="#####-###"
                autoComplete="cep-national"
                customInput={Input}
                placeholder="00000-000"
                id="cep"
                defaultValue={vistoria?.endereco.cep as string}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-3 justify-start items-start ">
          <Label htmlFor="tipoImovel">
            Tipo do Imovel{" "}
            {formState.errors.tipoImovel && (
              <span className="text-red-500">- Campo Obrigatorio</span>
            )}
          </Label>
          <Select
            id="tipoImovel"
            style={{ width: "250px" }}
            {...register("tipoImovel")}
            defaultValue={vistoria?.endereco.tipoImovel as TipoImovel}
          >
            <option value="">Selecione</option>
            <option value={TipoImovel.Casa}>Casa</option>
            <option value={TipoImovel.Apartamento}>Apartamento</option>
            <option value={TipoImovel.Lote}>Lote</option>
            <option value={TipoImovel.Obra}>Obra</option>
            <option value={TipoImovel.Infrutifera}>Infrutifera</option>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-3 justify-start items-start w-full">
        <Label htmlFor="obs">OBS</Label>
        <textarea
          id="obs"
          style={{ width: "100%", resize: "both" }}
          className="px-3  bg-zinc-950 rounded-md border-2 focus:shadow-inner border-indigo-600 shadow-indigo-600"
          {...register("obs")}
          defaultValue={vistoria?.obs as string}
        />
        {formState.errors.obs && (
          <span className="text-red-500">{formState.errors.obs.message}</span>
        )}
      </div>

      <div className="flex gap-8 w-full justify-start items-center">
        <button
          className="flex gap-1 items-center justify-center bg-blue-600 text-nowrap text-white px-4 py-2 rounded-md"
          onClick={() => {
            const file = document.getElementById("fileInput");
            if (file) file.click();
          }}
        >
          <Image src={plus} alt="Adicionar" />
          Adicionar Documento
        </button>
        <input
          type="file"
          id="fileInput"
          onChange={() => {
            const file = document.getElementById("fileInput");
            const fileInputValue = document.getElementById("fileInputValue");
            if (file && fileInputValue) {
              let fileText = (file as HTMLInputElement).value.split("\\");
              (fileInputValue as HTMLInputElement).value =
                fileText[fileText.length - 1];
            }
          }}
          style={{ display: "none" }}
        />
        <input
          type="text"
          className="bg-zinc-300 rounded-md text-zinc-950 p-2 w-full "
          placeholder="SeuArquivo.pdf"
          id="fileInputValue"
        />
      </div>
      <div className="flex gap-8 w-full justify-center items-center">
        {errorMenssage && (
          <span className="text-red-500 text-lg font-bold underline">
            {errorMenssage}
          </span>
        )}
      </div>
      <div className="flex gap-8 w-full justify-start items-center">
        <EspecialButton style={{ width: "100%" }} type="submit">
          Salvar
        </EspecialButton>
        <Link href="/demandas" className="w-full">
          <EspecialSecondaryButton style={{ width: "100%" }}>
            Cancelar
          </EspecialSecondaryButton>
        </Link>
      </div>
    </form>
  );
}
