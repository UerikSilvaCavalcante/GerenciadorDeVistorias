"use client"

import { VistoriaProps } from "../@types/vistoriaTypes";
import { Input, Select } from "../components/UI/input";
import Label from "../components/UI/label";
import {
  TipoEstadoConservacao,
  TipoJanela,
  TipoMaterial,
  TipoMuro,
  TipoPadrao,
  TipoPiso,
  TipoRevestimento,
  TipoTeto,
} from "../enums/acabamento";
import { Telhado } from "../enums/imovel";
import { Tipo } from "../enums/vistoria";
import Field from "../components/UI/field";
import {
  EspecialButton,
  EspecialSecondaryButton,
} from "../components/UI/buttons";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { teal } from "@mui/material/colors";

const getDemandaForm = z.object({
  area: z.number().min(1, "Selecione uma opção"),
  areaExterna: z.number(),
  terreno: z.number(),
  frente: z.number(),
  telhado: z.number(),
  padrao: z.nativeEnum(TipoPadrao),
  quadroEletrico: z.number(),
  revestimentoCozinha: z.nativeEnum(TipoRevestimento),
  revestimentoBanheiro: z.nativeEnum(TipoRevestimento),
  revestimentoTanque: z.nativeEnum(TipoRevestimento),
  estadoConservacao: z.nativeEnum(TipoEstadoConservacao),
  muro: z.nativeEnum(TipoMuro),
  portasExternas: z.nativeEnum(TipoMaterial),
  portasInternas: z.nativeEnum(TipoMaterial),
  piso: z.nativeEnum(TipoPiso),
  janelas: z.nativeEnum(TipoJanela),
  teto: z.nativeEnum(TipoTeto),
  areaServicoInterna: z.number(),
  quarto: z.number(),
  sala: z.number(),
  cozinha: z.number(),
  sacada: z.number(),
  arCondicionado: z.number(),
  piscina: z.number(),
  areaServicoExterna: z.number(),
  banheiroSocial: z.number(),
  banheiroPrivado: z.number(),
  banheiroEmpregada: z.number(),
  garagemDescoberta: z.number(),
  garagemCoberta: z.number(),
  lavabo: z.number(),
  outros: z.string(),
  redeAgua: z.boolean(),
  iluminacao: z.boolean(),
  pavimentacao: z.boolean(),
  fossa: z.boolean(),
  sumidouro: z.boolean(),
  obs: z.string(),
});

type DemandaForm = z.infer<typeof getDemandaForm>;

function AcabamentoField({
  register,
  formState,
}: {
  register: ReturnType<typeof useForm>["register"];
  formState: ReturnType<typeof useForm>["formState"];
}) {
  return (
    <Field legend="Acabamento">
      <div className="flex w-full gap-5 justify-start items-start">
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="padrao">
            {formState.errors.padrao && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Padrão de Acabamento{" "}
          </Label>
          <Select
            id="padrao"
            style={{ width: "100%" }}
            {...register("padrao", { valueAsNumber: true })}
          >
            <option value="0">Selecione</option>
            <option value={TipoPadrao.Alto}>Alvenaria</option>
            <option value={TipoPadrao.NormalAlto}>Normal/Alto</option>
            <option value={TipoPadrao.Normal}>Normal</option>
            <option value={TipoPadrao.NormalBaixo}>Normal/Baixo</option>
            <option value={TipoPadrao.Baixo}>Baixo</option>
          </Select>
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <div className="flex w-full flex-col gap-3 justify-start items-start">
            <Label htmlFor="quadroEletrico">
              {formState.errors.quadroEletrico && (
                <span className="text-red-600">
                  {" "}
                  Campo obrigatorio <br />
                </span>
              )}{" "}
              Quadro Eletrico{" "}
            </Label>
            <Input
              id="quadtoEletrico"
              type="number"
              style={{ width: "100%" }}
              {...register("quadroEletrico", { valueAsNumber: true })}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="revestimentoCozinha">
            {formState.errors.revestimentoCozinha && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Revestimento Cozinha{" "}
          </Label>
          <Select
            id="revestimentoCozinha"
            style={{ width: "100%" }}
            {...register("revestimentoCozinha", { valueAsNumber: true })}
          >
            <option value="0">Selecione</option>
            <option value={TipoRevestimento.Ceramica}>Ceramica</option>
            <option value={TipoRevestimento.Cimento}>Cimento</option>
            <option value={TipoRevestimento.Laminado}>Laminado</option>
            <option value={TipoRevestimento.Madeira}>Madeira</option>
            <option value={TipoRevestimento.Porcelanato}>Porcelanato</option>
            <option value={TipoRevestimento.Sem}>Sem</option>
          </Select>
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="revestimentoBanheiro">
            {formState.errors.revestimentoBanheiro && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}{" "}
            Revestimento Banheiro{" "}
          </Label>
          <Select
            id="revestimentoBanheiro"
            style={{ width: "100%" }}
            {...register("revestimentoBanheiro", { valueAsNumber: true })}
          >
            <option value="0">Selecione</option>
            <option value={TipoRevestimento.Ceramica}>Ceramica</option>
            <option value={TipoRevestimento.Cimento}>Cimento</option>
            <option value={TipoRevestimento.Laminado}>Laminado</option>
            <option value={TipoRevestimento.Madeira}>Madeira</option>
            <option value={TipoRevestimento.Porcelanato}>Porcelanato</option>
            <option value={TipoRevestimento.Sem}>Sem</option>
          </Select>
        </div>
        <div className="flex  w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="revestimentoTanque">
            {formState.errors.revestimentoTanque && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Revestimento Tanque{" "}
          </Label>
          <Select
            id="revestimentoTanque"
            style={{ width: "100%" }}
            {...register("revestimentoTanque", { valueAsNumber: true })}
          >
            <option value="0">Selecione</option>
            <option value={TipoRevestimento.Ceramica}>Ceramica</option>
            <option value={TipoRevestimento.Cimento}>Cimento</option>
            <option value={TipoRevestimento.Laminado}>Laminado</option>
            <option value={TipoRevestimento.Madeira}>Madeira</option>
            <option value={TipoRevestimento.Porcelanato}>Porcelanato</option>
            <option value={TipoRevestimento.Sem}>Sem</option>
          </Select>
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="estadoConservacao">
            {formState.errors.estadoConservacao && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Estado de Conservação{" "}
          </Label>
          <Select
            id="estadoConservacao"
            style={{ width: "100%" }}
            {...register("estadoConservacao", { valueAsNumber: true })}
          >
            <option value="0">Selecione</option>
            <option value={TipoEstadoConservacao.Construcao}>Contrusao</option>
            <option value={TipoEstadoConservacao.Novo}>Novo</option>
            <option value={TipoEstadoConservacao.Bom}>Bom</option>
            <option value={TipoEstadoConservacao.Regular}>Regulas</option>
            <option value={TipoEstadoConservacao.Ruim}>Ruim</option>
          </Select>
        </div>
      </div>
      <div className="flex w-full gap-5 justify-start items-start">
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="muro">
            {formState.errors.muro && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Muro{" "}
          </Label>
          <Select
            id="muro"
            style={{ width: "100%" }}
            {...register("muro", { valueAsNumber: true })}
          >
            <option value="0">Selecione</option>
            <option value={TipoMuro.Alvenaria}>Alvenaria</option>
            <option value={TipoMuro.Cerca}>Cerca</option>
            <option value={TipoMuro.Grade}>Grade</option>
            <option value={TipoMuro.Muro}>Muro</option>
            <option value={TipoMuro.Sem}>Sem</option>
          </Select>
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="portasExternas">
            {formState.errors.portasExternas && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Portas Externas{" "}
          </Label>
          <Select
            id="portasExternas"
            style={{ width: "100%" }}
            {...register("portasExternas", { valueAsNumber: true })}
          >
            <option value="0">Selecione</option>
            <option value={TipoMaterial.Aluminio}>Aluminio</option>
            <option value={TipoMaterial.Ferro}>Ferro</option>
            <option value={TipoMaterial.Madeira}>Madeira</option>
            <option value={TipoMaterial.Vidro}>Vidro</option>
          </Select>
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="portasInternas">
            {formState.errors.portasInternas && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Portas Internas{" "}
          </Label>
          <Select
            id="portasInternas"
            style={{ width: "100%" }}
            {...register("portasInternas", { valueAsNumber: true })}
          >
            <option value="0">Selecione</option>
            <option value={TipoMaterial.Aluminio}>Aluminio</option>
            <option value={TipoMaterial.Ferro}>Ferro</option>
            <option value={TipoMaterial.Madeira}>Madeira</option>
            <option value={TipoMaterial.Vidro}>Vidro</option>
          </Select>
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="piso">
            {formState.errors.piso && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Piso{" "}
          </Label>
          <Select
            id="piso"
            style={{ width: "100%" }}
            {...register("piso", { valueAsNumber: true })}
          >
            <option value="0">Selecione</option>
            <option value={TipoPiso.Ceramica}>Ceramica</option>
            <option value={TipoPiso.Cimento}>Cimento</option>
            <option value={TipoPiso.Laminado}>Laminado</option>
            <option value={TipoPiso.Madeira}>Madeira</option>
            <option value={TipoPiso.Porcelanato}>Porcelanato</option>
            <option value={TipoPiso.Sem}>Sem</option>
          </Select>
        </div>
        <div className="flex  w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="janelas">
            {formState.errors.janelas && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Janelas{" "}
          </Label>
          <Select
            id="janelas"
            style={{ width: "100%" }}
            {...register("janelas", { valueAsNumber: true })}
          >
            <option value="0">Selecione</option>
            <option value={TipoJanela.Aluminio}>Aluminio</option>
            <option value={TipoJanela.Ferro}>Ferro</option>
            <option value={TipoJanela.Madeira}>Madeira</option>
            <option value={TipoJanela.Vidro}>Vidro</option>
          </Select>
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="teto">
            {formState.errors.teto && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Teto{" "}
          </Label>
          <Select
            id="teto"
            style={{ width: "100%" }}
            {...register("teto", { valueAsNumber: true })}
          >
            <option value="0">Selecione</option>
            <option value={TipoTeto.Aglomerado}>Aglomerado</option>
            <option value={TipoTeto.Gesso}>Gesso</option>
            <option value={TipoTeto.Laje}>Laje</option>
            <option value={TipoTeto.Madeira}>Madeira</option>
            <option value={TipoTeto.Metalico}>Metalico</option>

            <option value={TipoTeto.PVC}>PVC</option>
            <option value={TipoTeto.TelhadoAperecendo}>
              Telhado Aparecendo
            </option>
            <option value={TipoTeto.Outros}>Outro</option>
          </Select>
        </div>
      </div>
    </Field>
  );
}

function DivisaoField({
  register,
  formState,
}: {
  register: ReturnType<typeof useForm>["register"];
  formState: ReturnType<typeof useForm>["formState"];
}) {
  return (
    <Field legend="Divisão">
      <div className="flex w-full gap-5 justify-start items-start">
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="areaServicoInterna">
            {formState.errors.areaServicoInterna && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}{" "}
            Área de Serviço Interna{" "}
          </Label>
          <Input
            id="areaServicoInterna"
            type="number"
            defaultValue={0}
            min={0}
            style={{ width: "100%" }}
            {...register("areaServicoInterna", { valueAsNumber: true })}
          />
        </div>

        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="quarto">
            {formState.errors.quarto && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Quarto{" "}
          </Label>
          <Input
            id="quarto"
            type="number"
            defaultValue={0}
            min={0}
            style={{ width: "100%" }}
            {...register("quarto", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="sala">
            {formState.errors.sala && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Salas{" "}
          </Label>
          <Input
            id="sala"
            type="number"
            defaultValue={0}
            min={0}
            style={{ width: "100%" }}
            {...register("sala", { valueAsNumber: true })}
          />
        </div>
        <div className="flex  w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="conzinha">
            {formState.errors.cozinha && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Cozinha{" "}
          </Label>
          <Input
            id="cozinha"
            type="number"
            defaultValue={0}
            min={0}
            style={{ width: "100%" }}
            {...register("cozinha", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="sacada">
            {formState.errors.sacada && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Sacada / Varanda{" "}
          </Label>
          <Input
            id="sacada"
            type="number"
            defaultValue={0}
            min={0}
            style={{ width: "100%" }}
            {...register("sacada", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="arCondicionado">
            {formState.errors.arCondicionado && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Ar Condicionado{" "}
          </Label>
          <Input
            id="arCondicionado"
            type="number"
            defaultValue={0}
            min={0}
            style={{ width: "100%" }}
            {...register("arCondicionado", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="piscina">
            {formState.errors.piscina && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Piscina{" "}
          </Label>
          <Input
            id="piscina"
            type="number"
            defaultValue={0}
            min={0}
            style={{ width: "100%" }}
            {...register("piscina", { valueAsNumber: true })}
          />
        </div>
      </div>
      <div className="flex w-full gap-4 justify-start items-start">
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="areaServicoExterna">
            {formState.errors.areaServicoExterna && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Área de Serviço Externa{" "}
          </Label>
          <Input
            id="areaServicoExterna"
            type="number"
            defaultValue={0}
            min={0}
            style={{ width: "100%" }}
            {...register("areaServicoExterna", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="banheiroSocial">
            {formState.errors.banheiroSocial && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Banheiro Social{" "}
          </Label>
          <Input
            id="banheiroSocial"
            type="number"
            defaultValue={0}
            min={0}
            style={{ width: "100%" }}
            {...register("banheiroSocial", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="banheiroPrivado">
            {formState.errors.banheiroPrivado && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Banheiro Privado{" "}
          </Label>
          <Input
            id="banheiroPrivado"
            type="number"
            defaultValue={0}
            min={0}
            style={{ width: "100%" }}
            {...register("banheiroPrivado", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="banheiroEmpregada">
            {formState.errors.banheiroEmpregada && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Banheiro Empregada{" "}
          </Label>
          <Input
            id="banheiroEmpregada"
            type="number"
            defaultValue={0}
            min={0}
            style={{ width: "100%" }}
            {...register("banheiroEmpregada", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="garagemDescoberta">
            {formState.errors.garagemDescoberta && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Garagem Descoberta{" "}
          </Label>
          <Input
            id="garagemDescoberta"
            type="number"
            defaultValue={0}
            min={0}
            style={{ width: "100%" }}
            {...register("garagemDescoberta", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="garagemCoberta">
            {formState.errors.garagemCoberta && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Garagem Coberta{" "}
          </Label>
          <Input
            id="garagemCoberta"
            type="number"
            defaultValue={0}
            min={0}
            style={{ width: "100%" }}
            {...register("garagemCoberta", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="lavabo">
            {formState.errors.lavabo && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Lavabo{" "}
          </Label>
          <Input
            id="lavabo"
            type="number"
            defaultValue={0}
            min={0}
            style={{ width: "100%" }}
            {...register("lavabo", { valueAsNumber: true })}
          />
        </div>
      </div>
      <div className="">
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="outros">Outros </Label>
          <textarea
            id="outros"
            style={{ width: "100%", resize: "both" }}
            className="px-3  bg-zinc-950 rounded-md border-2 focus:shadow-inner border-indigo-600 shadow-indigo-600"
            {...register("outros")}
          />
        </div>
      </div>
    </Field>
  );
}

function InfraestruturaField({
  register,
  formState,
}: {
  register: ReturnType<typeof useForm>["register"];
  formState: ReturnType<typeof useForm>["formState"];
}) {
  return (
    <Field legend="Infraestrutura">
      <div className="flex w-full gap-5 justify-start items-start">
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="redeAgua">
            {formState.errors.redeAgua && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Rede Agua{" "}
          </Label>
          <input
            type="checkbox"
            id="redeAgua"
            className="w-8 h-8 rounded-md"
            {...register("redeAgua")}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="iluminacao">
            {formState.errors.iluminacao && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Iluminação Publica{" "}
          </Label>
          <input
            type="checkbox"
            id="iluminacao"
            className="w-8 h-8 rounded-md"
            {...register("iluminacao")}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="pavimentacao">
            {formState.errors.pavimentacao && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Pavimentação{" "}
          </Label>
          <input
            type="checkbox"
            id="pavimentacao"
            className="w-8 h-8 rounded-md"
            {...register("pavimentacao")}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="fossa">
            {formState.errors.fossa && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Fossa{" "}
          </Label>
          <input
            type="checkbox"
            id="fossa"
            className="w-8 h-8 rounded-md"
            {...register("fossa")}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="sumidouro">
            {formState.errors.sumidouro && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Sumidouro{" "}
          </Label>
          <input
            type="checkbox"
            id="sumidouro"
            className="w-8 h-8 rounded-md"
            {...register("sumidouro")}
          />
        </div>
      </div>
    </Field>
  );
}

export default function FormsComplete({
  vistoria,
}: {
  vistoria: VistoriaProps;
}) {
  console.log(vistoria);
  const { register, handleSubmit, formState } = useForm<DemandaForm>({
    resolver: zodResolver(getDemandaForm),
  });

  function handleComplete(data: DemandaForm) {
    console.log(data);
  }

  return (
    <form
      className="flex flex-col gap-3 w-full justify-center items-center "
      action=""
      onSubmit={handleSubmit(handleComplete)}
    >
      <div className="flex w-full gap-5 justify-start items-start">
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="area">
            {formState.errors.area && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Área Coberta{" "}
          </Label>
          <Input
            id="area"
            type="number"
            placeholder="0,00"
            {...register("area", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="areaexterna">
            {formState.errors.areaExterna && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}{" "}
            Área Externa{" "}
          </Label>
          <Input
            id="areaexterna"
            type="number"
            step="0.50"
            placeholder="0,00"
            {...register("areaExterna", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="terreno">
            {formState.errors.terreno && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Terreno
          </Label>
          <Input
            id="terreno"
            type="number"
            step="0.50"
            placeholder="0,00"
            {...register("terreno", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="frente">
            {formState.errors.frente && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Frente{" "}
          </Label>
          <Input
            id="frente"
            type="number"
            step="0.50"
            placeholder="0,00"
            {...register("frente", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="telhado">
            {formState.errors.telhado && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Telhado{" "}
          </Label>
          <Select
            id="telhado"
            style={{ width: "100%" }}
            {...register("telhado", { valueAsNumber: true })}
          >
            <option value={0}>Selecione</option>
            <option value={Telhado.barro}>Telha de Barro</option>
            <option value={Telhado.ceramica}>Telha de Ceramica</option>
            <option value={Telhado.concreto}>Telha de Concreto</option>
            <option value={Telhado.fibrocimento}>Telha de Fibrocimento</option>
            <option value={Telhado.outro}>Outro</option>
          </Select>
        </div>
      </div>
      <AcabamentoField register={register} formState={formState} />
      <DivisaoField register={register} formState={formState} />
      <InfraestruturaField register={register} formState={formState} />
      <div className="flex w-full gap-5 justify-start items-start">
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="obs">Obs</Label>
          <textarea
            id="obs"
            style={{ width: "100%", resize: "both" }}
            className="px-3  bg-zinc-950 rounded-md border-2 focus:shadow-inner border-indigo-600 shadow-indigo-600"
            {...register("obs")}
          />
        </div>
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
