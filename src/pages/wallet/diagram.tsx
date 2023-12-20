import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { DiagramTable } from "./components/diagram-table";

const Diagram: React.FC = () => {
  return (
    <div className="mt-8 flex-1 m-auto px-8 space-y-8">
      <div className="flex flex-col gap-2">
        <h1>Novo aporte</h1>
        <p>
          Adicione perguntas que deverão ser feitas quando você adicionar um
          ativo em sua carteira.
        </p>
      </div>
      <div className="flex gap-2">
        <Input className="w-[200px]" type="text" placeholder="Pesquisar" />
        <Button>Adicionar pergunta</Button>
      </div>
      <div className="flex flex-col gap-4">
        <h3>Tipo de diagrama</h3>
        <div className="flex gap-2">
          <Toggle variant="outline">Diagrama do cerrado</Toggle>
          <Toggle variant="outline">Investimentos imobiliários</Toggle>
        </div>
      </div>
      <DiagramTable />
    </div>
  );
};

export default Diagram;
