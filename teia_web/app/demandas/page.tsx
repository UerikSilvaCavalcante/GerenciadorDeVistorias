"use client";

import MainLayout from "../components/mainLayout";
import { Input } from "../components/UI/input";
import {
  PrimaryButton,
  SecondaryButton,
  EspecialButton,
} from "../components/UI/buttons";
import { BasicTable } from "../components/tables";
import Link from "next/link";
import Image from "next/image";
import plus from "../assets/plus.svg";
import { useContext, useState } from "react";
import { Status } from "../enums/vistoria";
import { Select } from "../components/UI/input";
import Label from "../components/UI/label";
import { AuthContext } from "../actions/valid";
import { Type } from "../enums/user";

export default function Demandas() {
  const [filterStatus, setFilterStatus] = useState<Status | "">("");
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value as Status | "");
  };
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState<number | "">("");
  const [de, setDe] = useState<Date | "">("");
  const [ate, setAte] = useState<Date | "">("");

  const handleSearchChange = () => {
    const inputElement = document.getElementById("numOs") as HTMLInputElement;
    const deInput = document.getElementById("de") as HTMLInputElement;
    const paraInput = document.getElementById("ate") as HTMLInputElement;
    if (deInput && paraInput) {
      setDe(deInput.value ? new Date(deInput.value) : "");
      setAte(paraInput.value ? new Date(paraInput.value) : "");
    }
    if (inputElement) {
      setSearch(inputElement.value ? parseInt(inputElement.value) : "");
    }
  };

  const handleReset = () => {
    const inputElement = document.getElementById("numOs") as HTMLInputElement;
    const deInput = document.getElementById("de") as HTMLInputElement;
    const paraInput = document.getElementById("ate") as HTMLInputElement;
    if (deInput && paraInput) {
      deInput.value = "";
      paraInput.value = "";
      setDe("");
      setAte("");
    }
    if (inputElement) {
      inputElement.value = "";
      setSearch("");
    }
  };

  const [limit, setLimit] = useState<number | 10>(10);
  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(event.target.value));
  };

  return (
    <MainLayout id="demandas" title="Demandas" width="w-[95%]">
      <div className="flex flex-wrap items-center justify-around w-full  gap-3 md:text-base text-sm md:flex-nowrap">
        <Input
          type="text"
          placeholder="N° OS"
          width="w-full min-w-[200px]"
          id="numOs"
        />
        <select
          id="type"
          className={`md:w-80 w-full bg-zinc-950 rounded-md border-2 focus:shadow-md border-indigo-600  shadow-indigo-700 py-2 `}
          onChange={handleFilterChange}
        >
          <option value="">Todos</option>
          <option value={1}>Pendentes</option>
          <option value={2}>Em Andamento</option>
          <option value={3}>Concluida</option>
        </select>
        <div className="flex w-full items-center justify-center text-indigo-800 gap-2">
          <h1 className="font-bold text-lg">De:</h1>
          <Input
            type="date"
            width="md:w-36  text-zinc-200"
            id="de"
            style={{ colorScheme: "dark" }}
          />
        </div>
        <div className="flex w-full items-center justify-center text-indigo-800 gap-2">
          <h1 className="font-bold text-lg">Ate:</h1>
          <Input
            type="date"
            width="md:w-36  text-zinc-200 "
            id="ate"
            style={{ colorScheme: "dark" }}
          />
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <PrimaryButton
            type="submit"
            onClick={handleSearchChange}
            style={{ width: "100%" }}
          >
            Buscar
          </PrimaryButton>
          <SecondaryButton
            type="reset"
            onClick={handleReset}
            style={{ width: "100%" }}
          >
            Limpar
          </SecondaryButton>
        </div>
      </div>
      <BasicTable
        filterStatus={filterStatus}
        search={search}
        de={de}
        ate={ate}
        limit={limit}
      />
      <div className="flex md:flex-nowrap  flex-wrap items-center justify-between gap-2 w-full">
        <div className="flex items-center justify-center gap-2 text-nowrap w-full md:w-[200px]">
          <Label htmlFor="limit">Limite de registros: </Label>
          <Select
            id="limit"
            style={{ width: "100%" }}
            onChange={handleLimitChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </Select>
        </div>
        {user?.type === Type.engenheiro && (
          <Link href="/cadDemandas">
            <EspecialButton type="button">
              <Image src={plus} alt="plus" /> Cadastrar Demanda
            </EspecialButton>
          </Link>
        )}
      </div>
    </MainLayout>
  );
}
