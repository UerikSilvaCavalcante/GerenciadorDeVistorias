"use client";

import { useState, useEffect, useContext, useCallback } from "react";
import getAllVistorias from "../data/getAllVistorias";
import getAllVistoriador from "../data/getAllVistoriador";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  CircularProgress,
} from "@mui/material";
import { Status, Tipo, TipoImovel } from "../enums/vistoria";
import { status, Type } from "../enums/user";
import Link from "next/link";
import Image from "next/image";
import eye from "../assets/eye.svg";
import trash from "../assets/trash.svg";
import edit from "../assets/pencil-fill.svg";
import down from "../assets/down.svg";
import complete from "../assets/box-arrow-in-up-right.svg"
import { VistoriaProps } from "../@types/vistoriaTypes";
import { useQuery } from "@tanstack/react-query";
import { UserProps } from "../@types/usersTypes";
import { parseCookies } from "nookies";
import { AuthContext } from "../actions/valid";
import { jwtDecode } from "jwt-decode";
import { deleteVistoria } from "../data/deleteVistoria";
import { toast } from "sonner";
import { queryClient } from "../helper/useQuery";

interface Vistoria {
  vistoria: VistoriaProps[];
}

interface DataProps {
  filterStatus: Status | "";
  search?: number | "";
  de?: Date | "";
  ate?: Date | "";
  limit: number;
}

export function BasicTable({
  filterStatus,
  search,
  de,
  ate,
  limit = 10,
}: DataProps) {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] =
    useState<keyof Vistoria["vistoria"][1]>("numOs");

  const handleRequestSort = (property: keyof Vistoria["vistoria"][1]) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const { token } = parseCookies();
  let user: { id: string; tipo: string } | null = null;
  if (token) {
    try {
      user = jwtDecode<{ id: string; tipo: string }>(token as string);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ["vistorias"],
    queryFn: () =>
      getAllVistorias(
        parseInt(user?.id as string),
        Type[user?.tipo.toLowerCase() as keyof typeof Type],
        token
      ),
  });

  const handleDelete = async (id: number) => {
    const response = deleteVistoria(id, token as string);
    toast.promise(
      response.then(() => true),
      {
        loading: "Deletando Vistoria...",
        success: "Vistoria deletada com sucesso",
        error: "Erro ao deletar Vistoria",
      }
    );
    queryClient.invalidateQueries({ queryKey: ["vistorias"] });
  };

  const filteredVistorias = data
    ? data.filter((vistoria) => {
        return filterStatus === "" || vistoria.status == filterStatus;
      })
    : [];

  const searchVistorias = filteredVistorias.filter((vistoria) => {
    return search === "" || vistoria.numOs == search;
  });

  const dateVistorias = searchVistorias.filter((vistoria) => {
    if(de && ate){
      const dateAbertura = new Date(vistoria.dataAbertura);
      const startDate = new Date(de);
      const endDate = new Date(ate);
      return dateAbertura >= startDate && dateAbertura <= endDate;
    }else {
      return vistoria;
    }
  });

  const [rotate, setRotate] = useState(false);
  const handleRotate = () => {
    setRotate(!rotate);
  };

  const sortedVistorias = [...dateVistorias].sort((a, b) => {
    if (a[orderBy] == null || b[orderBy] == null) {
      return 0;
    }
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      <TableContainer
        component={Paper}
        className="bg-zinc-50 overflow-x-auto overflow-y-auto border-2 border-blue-950 rounded-md max-h-[380px]"
        sx={{ scrollbarColor: "#2563EB", scrollbarWidth: "thin" }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-[200px] ">
            <div className="flex flex-col items-center">
              <svg viewBox="25 25 50 50" className="svgCircle">
                <circle r="20" cy="50" cx="50"></circle>
              </svg>
            </div>
          </div>
        ) : (
          <Table sx={{ minWidth: 400 }} stickyHeader aria-label="simple table">
            <TableHead className="bg-blue-800">
              <TableRow sx={{ whiteSpace: "nowrap", background: "blue" }}>
                <TableCell
                  className="text-white "
                  sx={{ background: "#1e40af" }}
                >
                  <TableSortLabel
                    active={orderBy === "numOs"}
                    direction={orderBy === "numOs" ? order : "asc"}
                    hideSortIcon={true}
                    onClickCapture={handleRotate}
                    IconComponent={() => (
                      <Image
                        src={down}
                        alt="Visualizar"
                        width={15}
                        height={15}
                        className={`transition-transform duration-300 ${
                          rotate ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    )}
                    onClick={() => handleRequestSort("numOs")}
                  >
                    {" "}
                    <p className="text-zinc-50 ">N° OS</p>
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  className="text-white "
                  sx={{ background: "#1e40af" }}
                  align="center"
                >
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={orderBy === "status" ? order : "asc"}
                    hideSortIcon={true}
                    onClickCapture={handleRotate}
                    IconComponent={() => (
                      <Image
                        src={down}
                        alt="Visualizar"
                        width={15}
                        height={15}
                        className={`transition-transform duration-300 ${
                          rotate ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    )}
                    onClick={() => handleRequestSort("status")}
                  >
                    <p className="text-zinc-50 ">Status</p>
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  className="text-white "
                  sx={{ background: "#1e40af" }}
                  align="center"
                >
                  <TableSortLabel
                    active={orderBy === "type"}
                    direction={orderBy === "type" ? order : "asc"}
                    hideSortIcon={true}
                    onClickCapture={handleRotate}
                    IconComponent={() => (
                      <Image
                        src={down}
                        alt="Visualizar"
                        width={15}
                        height={15}
                        className={`transition-transform duration-300 ${
                          rotate ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    )}
                    onClick={() => handleRequestSort("type")}
                  >
                    <p className="text-zinc-50  ">Tipo</p>
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  className="text-white "
                  align="center"
                  sx={{ background: "#1e40af" }}
                >
                  <p className="text-zinc-50  ">Tipo de Imovel</p>
                </TableCell>
                <TableCell
                  className="text-white "
                  align="center"
                  sx={{ background: "#1e40af" }}
                >
                  <p className="text-zinc-50  ">Data de Abertura</p>
                </TableCell>

                <TableCell
                  className="text-white "
                  sx={{ background: "#1e40af" }}
                >
                  <p className="text-zinc-50  ">Empresa</p>
                </TableCell>
                <TableCell
                  className="text-white "
                  sx={{ background: "#1e40af" }}
                >
                  <p className="text-zinc-50  ">Vistoriador</p>
                </TableCell>
                <TableCell
                  className="text-white "
                  sx={{ background: "#1e40af" }}
                ></TableCell>
                <TableCell
                  className="text-white "
                  sx={{ background: "#1e40af" }}
                ></TableCell>
                <TableCell
                  className="text-white "
                  sx={{ background: "#1e40af" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedVistorias.slice(0, limit).map((vistoria, index) => (
                <TableRow key={index} sx={{ whiteSpace: "nowrap" }}>
                  <TableCell>{vistoria.numOs}</TableCell>
                  <TableCell
                    align="center"
                    className="flex items-center justify-center"
                  >
                    <div
                      className={`px-2 py-1 h-full flex items-center justify-center rounded-md ${
                        vistoria.status == 1
                          ? "bg-orange-300 text-orange-900"
                          : vistoria.status == 4
                          ? "bg-red-300 text-red-900 "
                          : vistoria.status == 2
                          ? "bg-blue-300 text-blue-900"
                          : "bg-green-300 text-green-950"
                      } `}
                    >
                      {Status[vistoria.status]}
                    </div>
                  </TableCell>
                  <TableCell align="center">{Tipo[vistoria.type]}</TableCell>
                  <TableCell align="center">
                    {TipoImovel[vistoria.endereco.tipoImovel]}
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    {new Date(vistoria.dataAbertura).toLocaleDateString(
                      "pt-BR"
                    )}
                  </TableCell>

                  <TableCell>{vistoria.engenheiro.name}</TableCell>
                  <TableCell>{vistoria.vistoriador.name}</TableCell>
                  <TableCell>
                    <Link
                      href={`/demandas/${vistoria.id}`}
                      className="cursor-pointer flex justify-center items-center bg-blue-600 w-6 h-6 rounded-md"
                    >
                      <Image
                        src={eye}
                        alt="Visualizar"
                        width={15}
                        height={15}
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    {user?.tipo === "Engenheiro" ? (
                      <Link
                        href={`putDemanda/${vistoria.id}`}
                        className="cursor-pointer flex justify-center items-center bg-blue-600 w-6 h-6 rounded-md"
                      >
                        <Image
                          src={edit}
                          alt="Visualizar"
                          width={15}
                          height={15}
                        />
                      </Link>
                    ) : (
                      <Link
                        href={`completeDemanda/${vistoria.id}`}
                        className="cursor-pointer flex justify-center items-center bg-blue-600 w-6 h-6 rounded-md"
                      >
                        <Image
                          src={complete}
                          alt="complete"
                          width={15}
                          height={15}
                        />
                      </Link>
                    )}
                  </TableCell>
                  {user &&
                    Type[user.tipo.toLowerCase() as keyof typeof Type] ===
                      Type.engenheiro && (
                      <TableCell>
                        <button
                          className="cursor-pointer flex justify-center items-center bg-blue-600 w-6 h-6 rounded-md hover:bg-red-600 transition-colors duration-300"
                          onClick={() => handleDelete(vistoria.id)}
                        >
                          <Image
                            src={trash}
                            alt="Visualizar"
                            width={10}
                            height={10}
                          />
                        </button>
                      </TableCell>
                    )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  );
}

interface Vistoriador {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  status: number;
}

export function VistoriadorTable({
  name,
  limit = 10,
}: {
  name: string | "";
  limit: number;
}) {
  const { token } = parseCookies();
  const { data, isLoading } = useQuery({
    queryKey: ["vistoriadores"],
    queryFn: () => getAllVistoriador(token),
  });

  const vistoriadores = data || [];
  // useEffect(() => {
  //   setLoading(true);
  //   getAllVistoriador().then((data) => {
  //     setVistoriadores(data);
  //     setLoading(false);
  //   });
  // }, []);

  const nameVistoriador = vistoriadores.filter((vistoriador) => {
    return name == "" || vistoriador.name == name;
  });

  return (
    <TableContainer
      component={Paper}
      className="bg-zinc-50 overflow-x-auto overflow-y-auto border-2 border-blue-950 rounded-md max-h-[450px]"
      sx={{ scrollbarColor: "#2563EB", scrollbarWidth: "thin" }}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-[200px] ">
          <div className="flex flex-col items-center">
            <svg viewBox="25 25 50 50">
              <circle r="20" cy="50" cx="50"></circle>
            </svg>
          </div>
        </div>
      ) : (
        <Table sx={{ minWidth: 400 }} stickyHeader aria-label="simple table">
          <TableHead className="bg-blue-800">
            <TableRow sx={{ whiteSpace: "nowrap" }} className="bg-blue-800">
              <TableCell
                className="text-white bg-blue-800"
                sx={{ background: "#1e40af" }}
              >
                <p className="text-zinc-50 ">Id</p>
              </TableCell>
              <TableCell
                className="text-white bg-blue-800"
                sx={{ background: "#1e40af" }}
              >
                <p className="text-zinc-50 ">Nome</p>
              </TableCell>
              <TableCell
                className="text-white bg-blue-800"
                sx={{ background: "#1e40af" }}
              >
                <p className="text-zinc-50 ">Username</p>
              </TableCell>
              <TableCell
                className="text-white bg-blue-800"
                sx={{ background: "#1e40af" }}
              >
                <p className="text-zinc-50 ">Email</p>
              </TableCell>
              <TableCell
                className="text-white bg-blue-800"
                sx={{ background: "#1e40af" }}
              >
                <p className="text-zinc-50 ">Telefone</p>
              </TableCell>
              <TableCell
                className="text-white bg-blue-800"
                align="center"
                sx={{ background: "#1e40af" }}
              >
                <p className="text-zinc-50 ">Status</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nameVistoriador.slice(0, limit).map((vistoriador, index) => (
              <TableRow key={index} sx={{ whiteSpace: "nowrap" }}>
                <TableCell>{vistoriador.id}</TableCell>
                <TableCell>{vistoriador.name}</TableCell>
                <TableCell>{vistoriador.userName}</TableCell>
                <TableCell>{vistoriador.email}</TableCell>
                <TableCell>{vistoriador.phone}</TableCell>
                <TableCell align="center" className="flex justify-center">
                  <div
                    className={`px-2 py-1  rounded-md  flex justify-center items-center ${
                      vistoriador.status == status.Ativado
                        ? "bg-green-300 text-green-950"
                        : vistoriador.status == status.Bloqueado
                        ? "bg-orange-300 text-orange-950"
                        : "bg-red-300 text-red-950"
                    }  `}
                  >
                    {status[vistoriador.status]}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
