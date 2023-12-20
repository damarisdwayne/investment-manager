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
import { InputLabelGroup } from "@/components";
import { Button } from "@/components/ui/button";

const NewAsset = () => {
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
    <div className="flex-1 p-8">
      <h1 className="mb-3">Novo ativo</h1>
      <div className="grid gap-4 py-4">
        <InputLabelGroup label="Categoria">
          <SelectCategory setCategory={setCategory} />
        </InputLabelGroup>
        {renderForm()}
      </div>
      <Button className="ml-auto">Salvar</Button>
    </div>
  );
};

export default NewAsset;
