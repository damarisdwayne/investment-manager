import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { AddQuestionDialog } from "@/components/add-question-dialog";
import { CerradoDiagram } from "./components/cerrado-diagram";
import { FiiDiagram } from "./components/fiiDiagram";

const Diagram: React.FC = () => {
  const [shouldShowCerradoDiagram, setShouldShowCerradoDiagram] =
    useState(true);

  return (
    <div className="mt-8 flex-1 m-auto px-8 space-y-8">
      <div className="flex flex-col gap-2">
        <h1>Diagramas</h1>
        <p>
          Adicione perguntas que deverão ser feitas quando você adicionar um
          ativo em sua carteira.
        </p>
      </div>
      <div className="flex gap-2">
        <Input className="w-[200px]" type="text" placeholder="Pesquisar" />
        <AddQuestionDialog />
      </div>
      <div className="flex flex-col gap-4">
        <h3>Tipo de diagrama</h3>
        <div className="flex gap-2">
          <Toggle
            onPressedChange={() => setShouldShowCerradoDiagram(true)}
            pressed={shouldShowCerradoDiagram}
            variant="outline"
          >
            Diagrama do cerrado
          </Toggle>
          <Toggle
            onPressedChange={() => setShouldShowCerradoDiagram(false)}
            variant="outline"
            pressed={!shouldShowCerradoDiagram}
          >
            Investimentos imobiliários
          </Toggle>
        </div>
      </div>
      {shouldShowCerradoDiagram ? <CerradoDiagram /> : <FiiDiagram />}
    </div>
  );
};

export default Diagram;
