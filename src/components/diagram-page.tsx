import React, { useState } from "react";
import { InputLabelGroup } from "@/components/input-label-group";
import { SelectCategory } from "@/components/include-asset-dialog/components";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DiagramTable } from "./diagram-table";

const Diagram: React.FC = () => {
  const [category, setCategory] = useState("");
  return (
    <div className="mt-8 flex-1 m-auto px-8 space-y-8">
      {!category ? (
        <InputLabelGroup label="Tipo de ativo">
          <SelectCategory setCategory={setCategory} />
        </InputLabelGroup>
      ) : (
        <>
          <InputLabelGroup label="Nome">
            <Input />
          </InputLabelGroup>
          <InputLabelGroup label="Quantidade">
            <Input />
          </InputLabelGroup>
          <div className="flex flex-row gap-4">
            <Card className="p-6 flex-1">
              <CardContent className="flex flex-col items-center gap-2">
                <h3>Pontos positivos</h3>
                <p>0</p>
              </CardContent>
            </Card>
            <Card className="p-6 flex-1">
              <CardContent className="flex flex-col items-center gap-2">
                <h3>Pontos Negativos</h3>
                <p>10</p>
              </CardContent>
            </Card>
            <Card className="p-6 flex-1">
              <CardContent className="flex flex-col items-center gap-2">
                <h3>Pontuação final</h3>
                <p>-10</p>
              </CardContent>
            </Card>
          </div>
          <DiagramTable />
        </>
      )}
    </div>
  );
};

export default Diagram;
