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
import { CotaGreide, Telhado, TipoArea } from "../enums/imovel";
import { Status, Tipo, TipoImovel } from "../enums/vistoria";
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
  ObraField,
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
  lote: LoteProps;
}

const getDemandaForm = z.object({
  latitude: z.string().nonempty(),
  longitude: z.string().nonempty(),
  areaTerreno: z.number().positive(),
  frente: z.number().positive(),
  solucoes: z.object({
    agua: z.nativeEnum(TipoSolucao),
    esgoto: z.nativeEnum(TipoSolucao),
    energia: z.nativeEnum(TipoSolucao),
    pavimentacao: z.nativeEnum(TipoSolucao),
    iluminacao: z.nativeEnum(TipoSolucao),
    coletaLixo: z.nativeEnum(TipoSolucao),
    creche: z.nativeEnum(TipoSolucao),
    escola: z.nativeEnum(TipoSolucao),
    saude: z.nativeEnum(TipoSolucao),
    lazer: z.nativeEnum(TipoSolucao),
    comercio: z.nativeEnum(TipoSolucao),
    aguasPluviais: z.nativeEnum(TipoSolucao),
    guiasSarjetas: z.nativeEnum(TipoSolucao),
    seguranca: z.nativeEnum(TipoSolucao),
    absGas: z.nativeEnum(TipoSolucao),
  }),
  tipo: z.nativeEnum(TipoLote),
  formato: z.nativeEnum(TipoFormato),
  situacao: z.nativeEnum(TipoSituacao),
  topografia: z.nativeEnum(TipoTopografia),
  usoPredio: z.nativeEnum(TipoUsoPredominante),
  acabamento: z.nativeEnum(TipoAcabamento),
  densidade: z.string(),
  fechamentoTerreno: z.string().min(1),
  localizacaoUnidade: z.string().min(1),
  transportePublico: z.number(),
  obs: z.string().optional(),
});

type UploadFile = {
  file: File;
  preview: string;
};
type DemandaForm = z.infer<typeof getDemandaForm>;

export default function FormsB438({
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
  let formsObj = undefined;
  if (vistoria.status == Status.Concluida) {
    formsObj = {
      longitude: vistoria.longitude,
      latitude: vistoria.latitude,
      areaTerreno: (imovel as LoteProps)?.areaTerreno,
      frente: (imovel as LoteProps)?.frente,
      solucoes: {
        agua: (imovel as LoteProps)?.solucoes?.agua,
        esgoto: (imovel as LoteProps)?.solucoes?.esgoto,
        energia: (imovel as LoteProps)?.solucoes?.energia,
        pavimentacao: (imovel as LoteProps)?.solucoes?.pavimentacao,
        iluminacao: (imovel as LoteProps)?.solucoes?.iluminacao,
        coletaLixo: (imovel as LoteProps)?.solucoes?.coletaLixo,
        creche: (imovel as LoteProps)?.solucoes?.creche,
        escola: (imovel as LoteProps)?.solucoes?.escola,
        saude: (imovel as LoteProps)?.solucoes?.saude,
        lazer: (imovel as LoteProps)?.solucoes?.lazer,
        comercio: (imovel as LoteProps)?.solucoes?.comercio,
        aguasPluviais: (imovel as LoteProps)?.solucoes?.aguasPluviais,
        guiasSarjetas: (imovel as LoteProps)?.solucoes?.guiasSarjetas,
        seguranca: (imovel as LoteProps)?.solucoes?.seguranca,
        absGas: (imovel as LoteProps)?.solucoes?.absGas,
      },
      tipo: (imovel as LoteProps)?.tipo,
      formato: (imovel as LoteProps)?.formato,
      situacao: (imovel as LoteProps)?.situacao,
      topografia: (imovel as LoteProps)?.topografia,
      usoPredio: (imovel as LoteProps)?.usoPredio,
      acabamento: (imovel as LoteProps)?.acabamento,
      densidade: (imovel as LoteProps)?.densidade,
      fechamentoTerreno: (imovel as LoteProps)?.fechamentoTerreno,
      localizacaoUnidade: (imovel as LoteProps)?.localizacaoUnidade,

      transportePublico: (imovel as LoteProps)?.transportePublico ? 1 : 2,
    };
  }

  const { register, control, handleSubmit, formState, reset } =
    useForm<DemandaForm>({
      resolver: zodResolver(getDemandaForm),
      defaultValues: formsObj,
    });

  function handleComplete(data: DemandaForm) {
    // console.log(data);
    const complete: completeProps = {
      idVistoria: vistoria.id,
      dataVistoria: new Date(),
      latitude: data.latitude,
      longitude: data.longitude,
      obs: data.obs || "",
      lote: {
        id:0,
        areaTerreno: data.areaTerreno,
        frente: data.frente,
        solucoesId: 0,
        solucoes: {
          id:0,
          agua: data.solucoes.agua,
          esgoto: data.solucoes.esgoto,
          energia: data.solucoes.energia,
          pavimentacao: data.solucoes.pavimentacao,
          iluminacao: data.solucoes.iluminacao,
          coletaLixo: data.solucoes.coletaLixo,
          creche: data.solucoes.creche,
          escola: data.solucoes.escola,
          saude: data.solucoes.saude,
          lazer: data.solucoes.lazer,
          aguasPluviais: data.solucoes.aguasPluviais,
          guiasSarjetas: data.solucoes.guiasSarjetas,
          seguranca: data.solucoes.seguranca,
          comercio: data.solucoes.comercio,
          absGas: data.solucoes.absGas,
        },
        tipo: data.tipo,
        formato: data.formato,
        situacao: data.situacao,
        topografia: data.topografia,
        usoPredio: data.usoPredio,
        acabamento: data.acabamento,
        fechamentoTerreno: data.fechamentoTerreno,
        localizacaoUnidade: data.localizacaoUnidade,
        densidade: data.densidade,
        transportePublico: data.transportePublico == 1 ? true : false,
      },
      URLImagens: `folder_${vistoria.numOs}/fotos`,
    };

    console.log(complete);
    toast.promise(
      completeVistoria(user?.id as number, complete, token).then(() => {
        // handleUploadAll(vistoria.numOs.toString());
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
        <div className="flex w-full flex-col gap-3 justify-start items-start">
          <Label htmlFor="terreno">
            {formState.errors.areaTerreno && (
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
            step="0.10"
            style={{ width: "100%" }}
            placeholder="0,00"
            {...register("areaTerreno", { valueAsNumber: true })}
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
            step="0.10"
            style={{ width: "100%" }}
            placeholder="0,00"
            {...register("frente", { valueAsNumber: true })}
          />
        </div>
      </div>
      <Field legend="Lote">
        <div className="flex flex-col w-full gap-5 justify-start items-start">
          <div className="flex w-full gap-5 justify-start items-start">
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="agua">
                {formState.errors.solucoes?.agua && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Agua{" "}
              </Label>
              <Select
                id="agua"
                style={{ width: "100%" }}
                {...register("solucoes.agua", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="esgoto">
                {formState.errors.solucoes?.esgoto && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Esgoto{" "}
              </Label>
              <Select
                id="esgoto"
                style={{ width: "100%" }}
                {...register("solucoes.esgoto", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="energia">
                {formState.errors.solucoes?.energia && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Energia{" "}
              </Label>
              <Select
                id="energia"
                style={{ width: "100%" }}
                {...register("solucoes.energia", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="pavimentacao">
                {formState.errors.solucoes?.pavimentacao && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Pavimentação{" "}
              </Label>
              <Select
                id="pavimentacao"
                style={{ width: "100%" }}
                {...register("solucoes.pavimentacao", {
                  valueAsNumber: true,
                })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="aguasPluviais">
                {formState.errors.solucoes?.aguasPluviais && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Águas pluviais{" "}
              </Label>
              <Select
                id="aguasPluviais"
                style={{ width: "100%" }}
                {...register("solucoes.aguasPluviais", {
                  valueAsNumber: true,
                })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="guiasSarjetas">
                {formState.errors.solucoes?.guiasSarjetas && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Guias e sarjetas{" "}
              </Label>
              <Select
                id="guiasSarjetas"
                style={{ width: "100%" }}
                {...register("solucoes.guiasSarjetas", {
                  valueAsNumber: true,
                })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="iluminacao">
                {formState.errors.solucoes?.iluminacao && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Iluminação{" "}
              </Label>
              <Select
                id="iluminacao"
                style={{ width: "100%" }}
                {...register("solucoes.iluminacao", {
                  valueAsNumber: true,
                })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
          </div>
          <div className="flex w-full gap-5 justify-start items-start">
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="coletaLixo">
                {formState.errors.solucoes?.coletaLixo && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Coleta de Lixo{" "}
              </Label>
              <Select
                id="coletaLixo"
                style={{ width: "100%" }}
                {...register("solucoes.coletaLixo", {
                  valueAsNumber: true,
                })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="creche">
                {formState.errors.solucoes?.creche && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Creche{" "}
              </Label>
              <Select
                id="creche"
                style={{ width: "100%" }}
                {...register("solucoes.creche", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="escola">
                {formState.errors.solucoes?.escola && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Escola{" "}
              </Label>
              <Select
                id="escola"
                style={{ width: "100%" }}
                {...register("solucoes.escola", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="saude">
                {formState.errors.solucoes?.saude && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Saude{" "}
              </Label>
              <Select
                id="saude"
                style={{ width: "100%" }}
                {...register("solucoes.saude", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="seguranca">
                {formState.errors.solucoes?.seguranca && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Segurança Pública{" "}
              </Label>
              <Select
                id="saude"
                style={{ width: "100%" }}
                {...register("solucoes.seguranca", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="lazer">
                {formState.errors.solucoes?.lazer && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Lazer{" "}
              </Label>
              <Select
                id="lazer"
                style={{ width: "100%" }}
                {...register("solucoes.lazer", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
          </div>
          <div className="flex w-full gap-5 justify-start items-start">
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="comercio">
                {formState.errors.solucoes?.comercio && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Comercio{" "}
              </Label>
              <Select
                id="comercio"
                style={{ width: "100%" }}
                {...register("solucoes.comercio", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="absGas">
                {formState.errors.solucoes?.absGas && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Abastecimento de Gas{" "}
              </Label>
              <Select
                id="absGas"
                style={{ width: "100%" }}
                {...register("solucoes.absGas", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSolucao.Satifatoria}>Satifatoria</option>
                <option value={TipoSolucao.Precario}>Precario</option>
                <option value={TipoSolucao.NaoDisponivel}>
                  Não Disponivel
                </option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="tipo">
                {formState.errors.tipo && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Tipo do Imovel{" "}
              </Label>
              <Select
                id="tipo"
                style={{ width: "100%" }}
                {...register("tipo", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoLote.Condominio}>Condominio</option>
                <option value={TipoLote.Unico}>Unico</option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="formato">
                {formState.errors.formato && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Formato do Terreno{" "}
              </Label>
              <Select
                id="formato"
                style={{ width: "100%" }}
                {...register("formato", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoFormato.Quadrado}>Quadrado</option>
                <option value={TipoFormato.Retangular}>Retangular</option>
                <option value={TipoFormato.Triangular}>Triangular</option>
                <option value={TipoFormato.Irregular}>Irregular</option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="situacao">
                {formState.errors.situacao && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Situacao do Terreno{" "}
              </Label>
              <Select
                id="situacao"
                style={{ width: "100%" }}
                {...register("situacao", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoSituacao.Esquina}>Esquina</option>
                <option value={TipoSituacao.MeioDeQuadra}>
                  Meio de Quadra
                </option>
              </Select>
            </div>
          </div>
          <div className="flex w-full gap-5 justify-start items-start">
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="topografia">
                {formState.errors.topografia && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Topografia do Terreno{" "}
              </Label>
              <Select
                id="topografia"
                style={{ width: "100%" }}
                {...register("topografia", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoTopografia.Aclive}>Aclive</option>
                <option value={TipoTopografia.Aterro}>Aterro</option>
                <option value={TipoTopografia.Declive}>Declive</option>
                <option value={TipoTopografia.Plano}>Plano</option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="usoPredio">
                {formState.errors.usoPredio && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Uso Predominante{" "}
              </Label>
              <Select
                id="usoPredio"
                style={{ width: "100%" }}
                {...register("usoPredio", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoUsoPredominante.Comercial}>Comercial</option>
                <option value={TipoUsoPredominante.Industrial}>
                  Industrial
                </option>
                <option value={TipoUsoPredominante.Misto}>Misto</option>
                <option value={TipoUsoPredominante.Residencial}>
                  Residencial
                </option>
                <option value={TipoUsoPredominante.Rural}>Rural</option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="acabamento">
                {formState.errors.acabamento && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Acabamento{" "}
              </Label>
              <Select
                id="acabamento"
                style={{ width: "100%" }}
                {...register("acabamento", { valueAsNumber: true })}
              >
                <option value="0">Selecione</option>
                <option value={TipoAcabamento.Alto}>Alto</option>
                <option value={TipoAcabamento.Normal}>Normal</option>
                <option value={TipoAcabamento.Baixo}>Baixo</option>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="densidade">
                {formState.errors.densidade && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Densidade{" "}
              </Label>
              <Input
                type="text"
                id="densidade"
                style={{ width: "100%" }}
                {...register("densidade")}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="fechamentoTerreno">
                {formState.errors.fechamentoTerreno && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Fechamento do Terreno{" "}
              </Label>
              <Input
                type="text"
                id="fechamentoTerreno"
                style={{ width: "100%" }}
                {...register("fechamentoTerreno")}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="fechamentoTerreno">
                {formState.errors.localizacaoUnidade && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Localização da Unidade{" "}
              </Label>
              <Input
                type="text"
                id="localizacaoUnidade"
                style={{ width: "100%" }}
                {...register("localizacaoUnidade")}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="transportePublico">
                {formState.errors.transportePublico && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Transporte Publico{" "}
              </Label>
              <Select
                id="transportePublico"
                style={{ width: "100%" }}
                {...register("transportePublico", {valueAsNumber: true})}
              >
                <option value="0">Selecione</option>
                <option value={1}>Sim</option>
                <option value={2}>Não</option>
              </Select>
            </div>
          </div>
        </div>
      </Field>
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
