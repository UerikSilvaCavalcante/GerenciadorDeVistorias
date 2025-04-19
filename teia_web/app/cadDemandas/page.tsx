"use client";
import MainLayout from "../components/mainLayout";
import FormsDemanda from "../components/formsDemanda";
import { parseCookies } from "nookies";


export default function Demandas() {
  const {token} = parseCookies();

  return (
    <MainLayout id="cadDemandas" title="Cadastrar Demanda">
     
      <FormsDemanda token={token}/>
    </MainLayout>
  );
}
