import React from "react";
import { Button } from "@/components/ui/button";
import { MyGoalsForm } from "./components/my-goals-form";

export const MyGoals: React.FC = () => {
  return (
    <div className="mt-8 flex-1 m-auto px-8">
      <div className="my-4 flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h1 className="mb-2">Metas</h1>
          <p>Edite os itens abaixo para ajustar suas metas</p>
        </div>
        <div className="flex gap-3">
          <Button variant="destructive">Resetar valores</Button>
          <Button>Salvar</Button>
        </div>
      </div>
      <MyGoalsForm />
    </div>
  );
};
