import { DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SelectCategory } from "./components";
import { useState } from "react";
import {
  AccountForm,
  CriptocurrencyForm,
  FixedIncomeEuaForm,
  FixedIncomeForm,
  FundForm,
  GenericForm,
  OtherForm,
} from "./forms";
import { InputLabelGroup } from "../input-label-group";

export const IncludeActiveDialog = () => {
  const [category, setCategory] = useState("");

  const renderForm = () => {
    switch (category) {
      case "stockExchange":
        return <GenericForm categotySelected={category} />;
      case "fixedIncome":
        return <FixedIncomeForm categotySelected={category} />;
      case "fixedIncomeEua":
        return <FixedIncomeEuaForm categotySelected={category} />;
      case "fund":
        return <FundForm categotySelected={category} />;
      case "crypto":
        return <CriptocurrencyForm categotySelected={category} />;
      case "account":
        return <AccountForm categotySelected={category} />;
      case "other":
        return <OtherForm categotySelected={category} />;

      default:
        return <GenericForm categotySelected={category} />;
    }
  };

  return (
    <div className="mt-8 flex-1 m-auto px-8">
      <DialogTitle className="mb-3">Adicionar ativo</DialogTitle>
      <Separator />
      <div className="grid gap-4 py-4">
        <InputLabelGroup label="Categoria">
          <SelectCategory setCategory={setCategory} />
        </InputLabelGroup>
        {renderForm()}
      </div>
    </div>
  );
};
