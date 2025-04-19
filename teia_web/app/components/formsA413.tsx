"use client";

import { VistoriaProps } from "../@types/vistoriaTypes";
import { Input, Select } from "../components/UI/input";
import Label from "../components/UI/label";
import {
  TipoBancada,
  TipoEstadoConservacao,
  TipoJanela,
  TipoLoc,
  TipoLocal,
  TipoMaterial,
  TipoMuro,
  TipoPadrao,
  TipoPiso,
  TipoRevestimento,
  TipoTeto,
} from "../enums/acabamento";
import {
  CotaGreide,
  Telhado,
  TipoArea,
  TipoDoImovelEnum,
} from "../enums/imovel";
import { Tipo, TipoImovel } from "../enums/vistoria";
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
import { TipoAreaServico, TipoBanheiro, TipoGaragem } from "../enums/divisao";
import { PatternFormat } from "react-number-format";
import { ImovelProps } from "../@types/imovelTypes";
import { ApartamentoProps } from "../@types/apartamentoTypes";
import { ObraProps } from "../@types/obraTypes";
import { LoteProps } from "../@types/loteTypes";
import { TipoPosicao, TipoVista } from "../enums/apartamento";
import {
  TipoAcabamento,
  TipoFormato,
  TipoSituacao,
  TipoSolucao,
  TipoTopografia,
  TipoUsoPredominante,
  TipoLote,
} from "../enums/lote";

import plus from "../assets/plus.svg";
import trash from "../assets/trash.svg";

import {
  AcabamentoField,
  DivisaoField,
  InfraestruturaField,
  ApartamentoField,
} from "./formsField";
import completeVistoria from "../data/completeVistoria";
import { toast } from "sonner";
import { AuthContext } from "../actions/valid";
import { parseCookies } from "nookies";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { userAgent } from "next/server";
import { useRouter } from "next/navigation";
import { queryClient } from "../helper/useQuery";
import getImovel from "../data/getImovel";
import { useQuery } from "@tanstack/react-query";
import { TipoImovelProps } from "../@types/tipoImove";
import Image from "next/image";
import { uploadToCloudinary } from "../data/upload";

interface completeProps {
  idVistoria: number;
  dataVistoria: Date;
  URLImagens: string;
  latitude: string;
  longitude: string;
  obs: string;
  imovel: ImovelProps;
  apartamento?: ApartamentoProps;
  obra?: ObraProps;
  lote?: LoteProps;
}

const getDemandaForm = z.object({
  area: z.number().min(1, "Selecione uma opção"),
  areaExterna: z.number(),
  terreno: z.number(),
  frente: z.number(),
  latitude: z.string().nonempty(),
  longitude: z.string().nonempty(),
  telhado: z.number(),
  idade: z.number(),
  valorImovel: z.number().min(1),
  patologia: z.string(),
  tipoDoImovel: z.nativeEnum(TipoDoImovelEnum),
  situacao: z.nativeEnum(TipoSituacao),
  cotaGreide: z.nativeEnum(CotaGreide),
  posicaoUnidade: z.string(),
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
  esgoto: z.boolean(),
  obs: z.string(),
  apartamento: z
    .object({
      andar: z.number().optional(),
      condominioVal: z.number().optional(),
      adminstradora: z.string().optional(),
      tel_Administradora: z.string().optional(),
      vista: z.nativeEnum(TipoVista).optional(),
      posicao_: z.nativeEnum(TipoPosicao).optional(),
      identificacaoPav: z.string(),
      blocoPredio: z
        .object({
          pavimentos: z.number().optional(),
          elevadores: z.number().optional(),
          idade: z.number().optional(),
          aptosPorAndar: z.number().optional(),
          unidadesPredio: z.number().optional(),
          subsolos: z.number().optional(),
          blocos: z.number().optional(),
          outros: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

type UploadFile = {
  file: File;
  preview: string;
};

type DemandaForm = z.infer<typeof getDemandaForm>;

export default function FormsA413({
  vistoria,
  imovel,
}: {
  vistoria: VistoriaProps;
  imovel: TipoImovelProps | null;
}) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [revokedPreviews, setRevokedPreviews] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles: UploadFile[] = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // limpa o input pra poder selecionar o mesmo arquivo de novo
    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    const removed = files[index];
    setRevokedPreviews((prev) => [...prev, removed.preview]);

    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (revokedPreviews.length > 0) {
      revokedPreviews.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      setRevokedPreviews([]); // Limpa após revogar
    }
  }, [revokedPreviews]);

  const handleUploadAll = async (folderName: string) => {
    try {
      const results = await Promise.all(
        files.map((file, index) => {
          return uploadToCloudinary(file.file, index, folderName);
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(vistoria);
  const { user } = useContext(AuthContext);
  const { token } = parseCookies();
  // console.log(user, token)
  const router = useRouter();
  let formObj = undefined;
  if (vistoria.imovel) {
    // console.log(vistoria);
    formObj = {
      area:
        (vistoria.imovel?.areaImovel
          .filter((area) => area.tipoArea == TipoArea.Coberta)
          .map((area) => area.valor)[0] as number) || 0,
      areaExterna:
        (vistoria.imovel?.areaImovel
          .filter((area) => area.tipoArea == TipoArea.Externa)
          .map((area) => area.valor)[0] as number) || 0,
      terreno:
        (vistoria.imovel?.areaImovel
          .filter((area) => area.tipoArea == TipoArea.Terreno)
          .map((area) => area.valor)[0] as number) || 0,
      frente: (vistoria.imovel?.frente as number) || 0,
      latitude: vistoria.latitude,
      longitude: vistoria.longitude,
      telhado: (vistoria.imovel?.telhado as number) || 0,
      situacao: (vistoria.imovel?.situacao as TipoSituacao) || 0,
      cotaGreide: (vistoria.imovel?.cotaGreide as CotaGreide) || 0,
      idade: (vistoria.imovel?.idade as number) || 0,
      valorImovel: (vistoria.imovel?.valorImovel as number) || 0,
      tipoDoImovel: (vistoria.imovel?.tipoDoImovel as TipoDoImovelEnum) || 1,
      patologia: (vistoria.imovel?.patologia as string) || "",
      posicaoUnidade: (vistoria.imovel?.posicaoUnidade as string) || "",
      padrao: TipoPadrao.Normal,
      quadroEletrico:
        (vistoria.imovel?.acabamento?.quadroEletrico as number) || 0,
      revestimentoCozinha: TipoRevestimento.Ceramica,
      revestimentoBanheiro: vistoria.imovel?.acabamento?.revestimentos.filter(
        (revestimento) => revestimento.local == TipoLocal.Banheiro
      )[0].tipoRevestimento as TipoRevestimento,
      revestimentoTanque: TipoRevestimento.Ceramica,
      estadoConservacao: vistoria.imovel?.acabamento
        ?.estadoConservacao as TipoEstadoConservacao,
      muro: vistoria.imovel?.acabamento?.muro as TipoMuro,
      portasExternas: vistoria.imovel?.acabamento?.portas.filter(
        (porta) => porta.loc == TipoLoc.Externa
      )[0].material as TipoMaterial,
      portasInternas: vistoria.imovel?.acabamento?.portas.filter(
        (porta) => porta.loc == TipoLoc.Interna
      )[0].material as TipoMaterial,
      piso: vistoria.imovel?.acabamento?.piso as TipoPiso,
      janelas: vistoria.imovel?.acabamento?.janelas as TipoJanela,
      teto: vistoria.imovel?.acabamento?.teto as TipoTeto,
      areaServicoInterna: vistoria.imovel?.divisao?.areaServico
        .filter((area) => area.tipo == TipoAreaServico.Interna)
        .map((area) => area.qtde)[0] as number,
      quarto: vistoria.imovel?.divisao?.quartos as number,
      sala: vistoria.imovel?.divisao?.salas as number,
      cozinha: vistoria.imovel?.divisao?.cozinhas as number,
      sacada: vistoria.imovel?.divisao?.sacadaVaranda as number,
      arCondicionado: 0,
      piscina: vistoria.imovel?.divisao?.piscina as number,
      areaServicoExterna:
        (vistoria.imovel?.divisao?.areaServico
          .filter((area) => area.tipo == TipoAreaServico.Externa)
          .map((area) => area.qtde)[0] as number) || 0,
      banheiroSocial:
        (vistoria.imovel?.divisao?.banheiros
          .filter((banheiro) => banheiro.tipoBanheiro == TipoBanheiro.Social)
          .map((banheiro) => banheiro.qtde)[0] as number) || 0,
      banheiroPrivado:
        (vistoria.imovel?.divisao?.banheiros
          .filter((banheiro) => banheiro.tipoBanheiro == TipoBanheiro.Privado)
          .map((banheiro) => banheiro.qtde)[0] as number) || 0,
      banheiroEmpregada:
        (vistoria.imovel?.divisao?.banheiros
          .filter((banheiro) => banheiro.tipoBanheiro == TipoBanheiro.Empregada)
          .map((banheiro) => banheiro.qtde)[0] as number) || 0,
      garagemCoberta:
        (vistoria.imovel?.divisao?.garagems
          .filter((garagem) => garagem.tipoGaragem == TipoGaragem.Coberta)
          .map((garagem) => garagem.qtde)[0] as number) || 0,
      garagemDescoberta:
        (vistoria.imovel?.divisao?.garagems
          .filter((garagem) => garagem.tipoGaragem == TipoGaragem.Descoberta)
          .map((garagem) => garagem.qtde)[0] as number) || 0,
      lavabo: vistoria.imovel?.divisao?.lavabos as number,
      outros: "",
      redeAgua: vistoria.imovel?.infraestrutura?.redeAguaP as boolean,
      iluminacao: vistoria.imovel?.infraestrutura?.iluminacao as boolean,
      pavimentacao: vistoria.imovel?.infraestrutura?.pavimentacao as boolean,
      esgoto: vistoria.imovel?.infraestrutura?.redeEsgoto as boolean,
      fossa: vistoria.imovel?.infraestrutura?.fossa as boolean,
      sumidouro: vistoria.imovel?.infraestrutura?.sumidouro as boolean,
      obs: "",
      apartamento:
        vistoria.endereco.tipoImovel == TipoImovel.Apartamento
          ? (imovel as ApartamentoProps)
          : undefined,
    };

    // console.log(tipoImovel)

    // console.log(formObj);
  }
  // console.log(formObj);
  const { register, control, handleSubmit, formState, reset } =
    useForm<DemandaForm>({
      resolver: zodResolver(getDemandaForm),
      defaultValues: formObj,
    });

  // console.log(formState);
  function handleComplete(data: DemandaForm) {
    // console.log(data);
    const complete: completeProps = {
      idVistoria: vistoria.id,
      dataVistoria: new Date(),
      latitude: data.latitude,
      longitude: data.longitude,
      obs: data.obs,
      imovel: {
        id: 0,
        areaImovel: [
          { id: 0, tipoArea: TipoArea.Coberta, valor: data.area },
          { id: 0, tipoArea: TipoArea.Externa, valor: data.areaExterna },
          { id: 0, tipoArea: TipoArea.Terreno, valor: data.terreno },
        ],
        frente: data.frente,
        valorImovel: data.valorImovel,
        patologia: data.patologia,
        idade: data.idade,
        tipoDoImovel: data.tipoDoImovel,
        acabamento: {
          id: 0,
          muro: data.muro,
          pinturas: [],
          portas: [
            { id: 0, loc: TipoLoc.Externa, material: data.portasExternas },
            { id: 0, loc: TipoLoc.Interna, material: data.portasInternas },
          ],
          piso: data.piso,
          janelas: data.janelas,
          bancada: TipoBancada.Grafiato,
          quadroEletrico: data.quadroEletrico,
          revestimentos: [
            {
              id: 0,
              local: TipoLocal.Banheiro,
              tipoRevestimento: data.revestimentoBanheiro,
            },
            {
              id: 0,
              local: TipoLocal.Cozinha,
              tipoRevestimento: data.revestimentoCozinha,
            },
            {
              id: 0,
              local: TipoLocal.Tanque,
              tipoRevestimento: data.revestimentoTanque,
            },
          ],
          padrao: data.padrao,
          estadoConservacao: data.estadoConservacao,
          teto: data.teto,
        },
        divisao: {
          id: 0,
          areaServico: [
            {
              id: 0,
              tipo: TipoAreaServico.Interna,
              qtde: data.areaServicoInterna,
            },
            {
              id: 0,
              tipo: TipoAreaServico.Externa,
              qtde: data.areaServicoExterna,
            },
          ],
          quartos: data.quarto,
          salas: data.sala,
          cozinhas: data.cozinha,
          banheiros: [
            {
              id: 0,
              tipoBanheiro: TipoBanheiro.Social,
              qtde: data.banheiroSocial,
            },
            {
              id: 0,
              tipoBanheiro: TipoBanheiro.Privado,
              qtde: data.banheiroPrivado,
            },
            {
              id: 0,
              tipoBanheiro: TipoBanheiro.Empregada,
              qtde: data.banheiroEmpregada,
            },
          ],
          sacadaVaranda: data.sacada,
          garagems: [
            {
              id: 0,
              tipoGaragem: TipoGaragem.Coberta,
              qtde: data.garagemCoberta,
            },
            {
              id: 0,
              tipoGaragem: TipoGaragem.Descoberta,
              qtde: data.garagemDescoberta,
            },
          ],
          lavabos: data.lavabo,
          piscina: data.piscina,
          outros: data.outros,
        },
        infraestrutura: {
          id: 0,
          redeAguaP: data.redeAgua,
          iluminacao: data.iluminacao,
          pavimentacao: data.pavimentacao,
          fossa: data.fossa,
          sumidouro: data.sumidouro,
          redeEsgoto: data.esgoto,
        },
        telhado: data.telhado,
        situacao: data.situacao,
        cotaGreide: data.cotaGreide,
        posicaoUnidade: data.posicaoUnidade,
      },
      URLImagens: `folder_${vistoria.numOs}/fotos`,
      apartamento:
        vistoria.endereco.tipoImovel == TipoImovel.Apartamento
          ? (data.apartamento as ApartamentoProps)
          : undefined,
    };

    console.log(complete);
    toast.promise(
      completeVistoria(user?.id as number, complete, token).then(() => {
        handleUploadAll(vistoria.numOs.toString());
        queryClient.invalidateQueries({ queryKey: ["vistorias"] });
        router.push("/demandas");
      }),
      {
        loading: "Salvando...",
        success: "Vistoria concluida com sucesso",
        error: "Erro ao salvar vistoria",
      }
    );
  }

  return (
    <form
      className="flex flex-col gap-3 w-full justify-center items-center "
      action=""
    >
      <div className="flex w-full gap-5 justify-start items-start">
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="area">
            {formState.errors.valorImovel && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Valor do Imovel{" "}
          </Label>
          <Input
            id="area"
            type="number"
            min={0}
            placeholder="0,00"
            step="0.100"
            style={{ width: "100%" }}
            {...register("valorImovel", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="area">
            {formState.errors.idade && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Idade estimada do Imovel{" "}
          </Label>
          <Input
            id="area"
            type="number"
            min={0}
            placeholder="0"
            style={{ width: "100%" }}
            {...register("idade", { valueAsNumber: true })}
          />
        </div>

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
            min={0}
            placeholder="0,00"
            step="0.100"
            style={{ width: "100%" }}
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
            min={0}
            step="0.10"
            style={{ width: "100%" }}
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
            min={0}
            step="0.10"
            style={{ width: "100%" }}
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
            min={0}
            step="0.10"
            style={{ width: "100%" }}
            placeholder="0,00"
            {...register("frente", { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="latitude">
            {formState.errors.latitude && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Latitude
          </Label>
          <Controller
            name="latitude"
            control={control}
            render={({ field }) => (
              <PatternFormat
                format="##° ##' ##.###"
                autoComplete="lat-national"
                customInput={Input}
                style={{ width: "100%" }}
                placeholder="00° 00 00.000"
                id="latitude"
                {...field}
              />
            )}
          />
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="latitude">
            {formState.errors.longitude && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Longitude
          </Label>
          <Controller
            name="longitude"
            control={control}
            render={({ field }) => (
              <PatternFormat
                format="##° ##' ##.###"
                autoComplete="lat-national"
                customInput={Input}
                style={{ width: "100%" }}
                placeholder="00° 00 00.000"
                id="longitude"
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className="flex w-full gap-5 justify-start items-start">
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
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="tipoDoImovel">
            {formState.errors.tipoDoImovel && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Tipo do Imovel{" "}
          </Label>
          <Select
            id="tipoDoImovel"
            style={{ width: "100%" }}
            {...register("tipoDoImovel", { valueAsNumber: true })}
          >
            <option value={0}>Selecione</option>
            <option value={TipoDoImovelEnum.Residencial}>Residencial</option>
            <option value={TipoDoImovelEnum.Comercial}>Comercial</option>
            <option value={TipoDoImovelEnum.Industrial}>Industrial</option>
            <option value={TipoDoImovelEnum.Rural}>Rural</option>
            <option value={TipoDoImovelEnum.Outro}>Outro</option>
          </Select>
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="situacao">
            {formState.errors.situacao && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Situação{" "}
          </Label>
          <Select
            id="situacao"
            style={{ width: "100%" }}
            {...register("situacao", { valueAsNumber: true })}
          >
            <option value={0}>Selecione</option>
            <option value={TipoSituacao.Esquina}>Esquina</option>
            <option value={TipoSituacao.MeioDeQuadra}>Meio de Quadra</option>
          </Select>
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="cotaGreide">
            {formState.errors.cotaGreide && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Cota do Greide{" "}
          </Label>
          <Select
            id="cotaGreide"
            style={{ width: "100%" }}
            {...register("cotaGreide", { valueAsNumber: true })}
          >
            <option value={0}>Selecione</option>
            <option value={CotaGreide.acima}>Acima</option>
            <option value={CotaGreide.nivelado}>Nivelado</option>
            <option value={CotaGreide.abaixo}>Abaixo</option>
          </Select>
        </div>
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="posicaoUnidade">
            {formState.errors.posicaoUnidade && (
              <span className="text-red-600">
                {" "}
                Campo obrigatorio <br />
              </span>
            )}
            Posição da Unidade
          </Label>
          <Input
            id="posicaoUnidade"
            style={{ width: "100%" }}
            {...register("posicaoUnidade")}
          />
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
      {vistoria.endereco.tipoImovel == TipoImovel.Apartamento && (
        <ApartamentoField register={register} formsState={formState} />
      )}
      <Field legend="Imagens">
        <div className="flex w-full gap-5 justify-center items-center text-blue-700 font-bold">
          Imagens Adicionadas
        </div>
        <div className="flex w-full flex-wrap p-4 gap-5 items-center justify-center ">
          {files.map((item, index) => (
            <div
              key={index}
              className="flex flex-col rounded-sm justify-center items-center gap-2 bg-zinc-950 p-2"
            >
              <span>{index + 1}</span>
              <img
                src={item.preview}
                alt={`Preview ${index}`}
                width={150}
                height={150}
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />

              <button
                className="cursor-pointer flex justify-center items-center bg-blue-600 w-6 h-6 rounded-md hover:bg-red-600 transition-colors duration-300"
                type="button"
                onClick={() => handleRemove(index)}
              >
                <Image src={trash} alt="Deletar" width={10} height={10} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex w-full gap-5 justify-end items-end">
          <button
            className="flex gap-1 items-center justify-center bg-blue-600 text-nowrap text-white px-4 py-2 rounded-md"
            type="button"
            onClick={() => {
              const file = document.getElementById("fileInput");
              if (file) file.click();
            }}
          >
            <Image src={plus} alt="Adicionar" />
            Adicionar imagens
          </button>
          <input
            type="file"
            id="fileInput"
            multiple
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </Field>
      <div className="flex gap-8 w-full justify-start items-center">
        <EspecialButton
          style={{ width: "100%" }}
          type="submit"
          onClick={handleSubmit(handleComplete)}
        >
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
