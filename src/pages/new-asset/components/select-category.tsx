import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface setCategoryProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectCategory = ({ setCategory }: setCategoryProps) => {
  return (
    <Select onValueChange={(category) => setCategory(category)}>
      <SelectTrigger>
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent id="category">
        <SelectGroup>
          <SelectItem value="stockExchange">
            Bolsa de valores(BR e EUA)
          </SelectItem>
          <SelectItem value="treasury">Tesouro Direto</SelectItem>
          <SelectItem value="fixedIncome">Renda Fixa</SelectItem>
          <SelectItem value="fixedIncomeEua">Renda Fixa EUA</SelectItem>
          <SelectItem value="fund">Fundos de investimento</SelectItem>
          <SelectItem value="crypto">Criptomoeda</SelectItem>
          <SelectItem value="account">Caixa/Conta corrente</SelectItem>
          <SelectItem value="other">Outros</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
