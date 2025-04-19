"use client"

import MainLayout from "../components/mainLayout";
import { Input , Select } from "../components/UI/input";
import { PrimaryButton , SecondaryButton} from "../components/UI/buttons";
import { VistoriadorTable } from "../components/tables";
import { useState } from "react";
import Label from "../components/UI/label";

export default function Vistoriadores() {
    
const [name, setName] = useState<string | "">("");
const handleSearchChange = () => {
    const inputElement = document.getElementById("name") as HTMLInputElement;
    if (inputElement) {
        setName(inputElement.value);
    }
}
const handleReset = () => {
    const inputElement = document.getElementById("name") as HTMLInputElement;
    if (inputElement) {
        inputElement.value = "";
        setName("");
    }
}

const [limit, setLimit] = useState<number | 10>(10);
const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(event.target.value));
}
  return (
    <MainLayout id="vistoriadores" title="Vistoriadores">
      <div className="flex items-center justify-around w-full gap-3">
        <Input type="text" placeholder="Nome do vistoriador" width="w-full" id="name" />
        
        <div className="flex items-center justify-center gap-2">
          <PrimaryButton type="submit" onClick={handleSearchChange}>
            Buscar
          </PrimaryButton>
          <SecondaryButton type="reset" onClick={handleReset} >
            Limpar
          </SecondaryButton>
        </div>
        <div className="flex items-center justify-center gap-2 text-nowrap">
            <Label htmlFor="limit">Limite de registros: </Label>
            <Select id="limit" style={{ width: "100px" }} onChange={handleLimitChange}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </Select>
        </div>
      </div>
      <VistoriadorTable name={name} limit={limit}/>
    </MainLayout>
  );
}
