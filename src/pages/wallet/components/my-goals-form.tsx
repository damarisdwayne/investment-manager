import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { InputLabelGroup } from "@/components";
import { Slider } from "@/components/ui/slider";

export const MyGoalsForm: React.FC = () => {
  return (
    <Card className="w-full h-full flex-[3]">
      <CardContent className="w-full h-full p-8 flex flex-col space-y-10">
        <InputLabelGroup label="Ações Nacionais">
          <Slider defaultValue={[33]} max={100} step={1} />
        </InputLabelGroup>
        <InputLabelGroup label="Ações Internacionais">
          <Slider defaultValue={[33]} max={100} step={1} />
        </InputLabelGroup>
        <InputLabelGroup label="Renda fixa">
          <Slider defaultValue={[33]} max={100} step={1} />
        </InputLabelGroup>
        <InputLabelGroup label="Fundos Imobiliários">
          <Slider defaultValue={[33]} max={100} step={1} />
        </InputLabelGroup>
        <InputLabelGroup label="REITs">
          <Slider defaultValue={[33]} max={100} step={1} />
        </InputLabelGroup>
        <InputLabelGroup label="Criptomoedas">
          <Slider defaultValue={[33]} max={100} step={1} />
        </InputLabelGroup>
        <InputLabelGroup label="Ouro">
          <Slider defaultValue={[33]} max={100} step={1} />
        </InputLabelGroup>
      </CardContent>
    </Card>
  );
};
