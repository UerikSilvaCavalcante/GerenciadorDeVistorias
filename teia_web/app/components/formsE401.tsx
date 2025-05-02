"use client";

import { VistoriaProps } from "../@types/vistoriaTypes";
import { Input } from "../components/UI/input";
import Label from "../components/UI/label";
import { Status } from "../enums/vistoria";
import Field from "../components/UI/field";
import {
  EspecialButton,
  EspecialSecondaryButton,
} from "../components/UI/buttons";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";
import { ObraProps } from "../@types/obraTypes";

import plus from "../assets/plus.svg";
import trash from "../assets/trash.svg";

import completeVistoria from "../data/completeVistoria";
import { toast } from "sonner";
import { AuthContext } from "../actions/valid";
import { parseCookies } from "nookies";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { queryClient } from "../helper/useQuery";
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
  obra: ObraProps;
}

const getDemandaForm = z.object({
  latitude: z.string().nonempty(),
  longitude: z.string().nonempty(),
  servico: z.number(),
  infraestrutura: z.number(),
  supraEstruturas: z.number(),
  paredes: z.number(),
  esquadarias: z.number(),
  vidrosPlasticos: z.number(),
  cobertura: z.number(),
  impermeabilizacao: z.number(),
  revestimentosInternos: z.number(),
  revestimentosExternos: z.number(),
  forros: z.number(),
  pisos: z.number(),
  pinturas: z.number(),
  acabamentos: z.number(),
  instalacoesEletricas: z.number(),
  instalacoesHidraulicas: z.number(),
  instalacoesEsgoto: z.number(),
  loucasMetais: z.number(),
  complementos: z.number(),

  outros: z.string(),
  obs: z.string().optional(),
});

type UploadFile = {
  file: File;
  preview: string;
};
type DemandaForm = z.infer<typeof getDemandaForm>;

export default function FormsE401({
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
      await Promise.all(
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
      latitude: vistoria.latitude,
      longitude: vistoria.longitude,
      servico: (imovel as ObraProps)?.servico || 0,
      infraestrutura: (imovel as ObraProps)?.infraestrutura || 0,
      supraEstruturas: (imovel as ObraProps)?.supraEstrutura || 0,
      paredes: (imovel as ObraProps)?.paredes || 0,
      esquadarias: (imovel as ObraProps)?.esquadrias || 0,
      vidrosPlasticos: (imovel as ObraProps)?.vidrosPlasticos || 0,
      cobertura: (imovel as ObraProps)?.cobertura || 0,
      impermeabilizacao: (imovel as ObraProps)?.impermeabilizacao || 0,
      revestimentosInternos: (imovel as ObraProps)?.revestimentosInternos || 0,
      revestimentosExternos: (imovel as ObraProps)?.revestimentosExternos || 0,
      forros: (imovel as ObraProps)?.forros || 0,
      pisos: (imovel as ObraProps)?.pisos || 0,
      pinturas: (imovel as ObraProps)?.pinturas || 0,
      acabamentos: (imovel as ObraProps)?.acabamentos || 0,
      instalacoesEletricas: (imovel as ObraProps)?.instalacoesEletricas || 0,
      instalacoesHidraulicas:
        (imovel as ObraProps)?.instalacoesHidraulicas || 0,
      instalacoesEsgoto: (imovel as ObraProps)?.instalacoesEsgoto || 0,
      loucasMetais: (imovel as ObraProps)?.loucasMetais || 0,
      complementos: (imovel as ObraProps)?.complementos || 0,
      outros: (imovel as ObraProps)?.outros || "",
      obs: vistoria.obs || "",
    };
  }

  const { register, control, handleSubmit, formState } = useForm<DemandaForm>({
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
      obra: {
        id: 0,
        acabamentos: data.acabamentos,
        complementos: data.complementos,
        cobertura: data.cobertura,
        esquadrias: data.esquadarias,
        forros: data.forros,
        infraestrutura: data.infraestrutura,
        instalacoesEletricas: data.instalacoesEletricas,
        instalacoesEsgoto: data.instalacoesEsgoto,
        instalacoesHidraulicas: data.instalacoesHidraulicas,
        impermeabilizacao: data.impermeabilizacao,
        loucasMetais: data.loucasMetais,
        paredes: data.paredes,
        pisos: data.pisos,
        pinturas: data.pinturas,
        revestimentosExternos: data.revestimentosExternos,
        revestimentosInternos: data.revestimentosInternos,
        servico: data.servico,
        supraEstrutura: data.supraEstruturas,
        vidrosPlasticos: data.vidrosPlasticos,
        outros: data.outros,
      },
      URLImagens: `folder_${vistoria.numOs}/fotos`,
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
      <div className="flex w-full gap-5 justify-start items-start md:flex-nowrap flex-wrap">
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
      <Field legend="Obra">
        <div className="flex flex-col w-full gap-5 justify-start items-start">
          <div className="flex w-full gap-5 justify-start items-start md:flex-nowrap flex-wrap">
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="servico">
                {formState.errors.servico && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Serviço{" "}
              </Label>
              <Input
                id="servico"
                type="number"
                style={{ width: "100%" }}
                {...register("servico", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="infraestrutura">
                {formState.errors.infraestrutura && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Infraestrutura{" "}
              </Label>
              <Input
                id="infraestrutura"
                type="number"
                style={{ width: "100%" }}
                {...register("infraestrutura", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="supraEstruturas">
                {formState.errors.supraEstruturas && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Estrutura{" "}
              </Label>
              <Input
                id="supraEstruturas"
                type="number"
                style={{ width: "100%" }}
                {...register("supraEstruturas", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="paredes">
                {formState.errors.paredes && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Paredes{" "}
              </Label>
              <Input
                id="paredes"
                type="number"
                style={{ width: "100%" }}
                {...register("paredes", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="esquadarias">
                {formState.errors.esquadarias && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Esquadarias{" "}
              </Label>
              <Input
                id="esquadarias"
                type="number"
                style={{ width: "100%" }}
                {...register("esquadarias", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className="flex w-full gap-5 justify-start items-start md:flex-nowrap flex-wrap">
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="vidrosPlasticos">
                {formState.errors.vidrosPlasticos && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Vidros Plasticos{" "}
              </Label>
              <Input
                id="vidrosPlasticos"
                type="number"
                style={{ width: "100%" }}
                {...register("vidrosPlasticos", { valueAsNumber: true })}
              />
            </div>

            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="cobertura">
                {formState.errors.cobertura && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Coberturas{" "}
              </Label>
              <Input
                id="cobertura"
                type="number"
                style={{ width: "100%" }}
                {...register("cobertura", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="impermeabilizacao">
                {formState.errors.impermeabilizacao && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                impermeabilizacao{" "}
              </Label>
              <Input
                id="impermeabilizacao"
                type="number"
                style={{ width: "100%" }}
                {...register("impermeabilizacao", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="revestimentosInternos">
                {formState.errors.revestimentosInternos && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Revestimentos Internos{" "}
              </Label>
              <Input
                id="revestimentosInternos"
                type="number"
                style={{ width: "100%" }}
                {...register("revestimentosInternos", {
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="revestimentosExternos">
                {formState.errors.revestimentosExternos && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Revestimentos Externos{" "}
              </Label>
              <Input
                id="revestimentosExternos"
                type="number"
                style={{ width: "100%" }}
                {...register("revestimentosExternos", {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          <div className="flex w-full gap-5 justify-start items-start md:flex-nowrap flex-wrap">
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="forros">
                {formState.errors.forros && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Forros{" "}
              </Label>
              <Input
                id="forros"
                type="number"
                style={{ width: "100%" }}
                {...register("forros", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="pisos">
                {formState.errors.pisos && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Pisos{" "}
              </Label>
              <Input
                id="pisos"
                type="number"
                style={{ width: "100%" }}
                {...register("pisos", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="pinturas">
                {formState.errors.pinturas && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Pinturas{" "}
              </Label>
              <Input
                id="pinturas"
                type="number"
                style={{ width: "100%" }}
                {...register("pinturas", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="acabamentos">
                {formState.errors.acabamentos && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Acabamentos{" "}
              </Label>
              <Input
                id="acabamentos"
                type="number"
                style={{ width: "100%" }}
                {...register("acabamentos", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="instalacoesEletricas">
                {formState.errors.instalacoesEletricas && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Instalações Eletricas{" "}
              </Label>
              <Input
                id="instalacoesEletricas"
                type="number"
                style={{ width: "100%" }}
                {...register("instalacoesEletricas", {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          <div className="flex w-full gap-5 justify-start items-start md:flex-nowrap flex-wrap">
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="instalacoesHidraulicas">
                {formState.errors.instalacoesHidraulicas && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Instalações Hidraulicas{" "}
              </Label>
              <Input
                id="instalacoesHidraulicas"
                type="number"
                style={{ width: "100%" }}
                {...register("instalacoesHidraulicas", {
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="instalacoesEsgoto">
                {formState.errors.instalacoesEsgoto && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Instalações Esgoto{" "}
              </Label>
              <Input
                id="instalacoesEsgoto"
                type="number"
                style={{ width: "100%" }}
                {...register("instalacoesEsgoto", {
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="loucasMetais">
                {formState.errors.loucasMetais && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Louças e Metais{" "}
              </Label>
              <Input
                id="loucasMetais"
                type="number"
                style={{ width: "100%" }}
                {...register("loucasMetais", {
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="complementos">
                {formState.errors.loucasMetais && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Complementos{" "}
              </Label>
              <Input
                id="complementos"
                type="number"
                style={{ width: "100%" }}
                {...register("complementos", {
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="complementos">
                {formState.errors.complementos && (
                  <span className="text-red-600">
                    {" "}
                    Campo obrigatorio <br />
                  </span>
                )}
                Complementos{" "}
              </Label>
              <Input
                id="complementos"
                type="number"
                style={{ width: "100%" }}
                {...register("complementos", {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          <div className="flex w-full gap-5 justify-start items-start md:flex-nowrap flex-wrap">
            <div className="flex flex-col w-full gap-3 justify-start items-start">
              <Label htmlFor="outros">Outros </Label>
              <Input
                id="outros"
                type="text"
                style={{ width: "100%" }}
                {...register("outros")}
              />
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
