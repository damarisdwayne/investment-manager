import React from "react";
import { Input } from "@/components/ui/input";
import { NewContribuitionTable } from "./components/new-contribuition-table";
import { InputLabelGroup } from "@/components/form/input-label-group";
import { Button } from "@/components/ui/button";

export const NewContribuition: React.FC = () => {
  return (
    <div className="mt-8 flex-1 m-auto px-8">
      <div className="my-4 flex flex-row justify-between align-bottom">
        <div className="flex flex-col">
          <h1 className="mb-2">Novo aporte</h1>
          <p>Quanto você vai investir? Coloque aqui o seu aporte deste mês.</p>
        </div>
        <div className="flex flex-row items-end gap-2">
          <InputLabelGroup label="Valor do investimento">
            <Input className="w-[200px]" type="text" placeholder="Pesquisar" />
          </InputLabelGroup>
          <Button>Calcular</Button>
        </div>
      </div>
      <NewContribuitionTable />
    </div>
  );
};
