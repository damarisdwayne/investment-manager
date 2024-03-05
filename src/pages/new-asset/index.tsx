import { useState } from "react";
import { InputLabelGroup, SelectCategory } from "@/components";
import {
  GenericForm,
  FixedIncomeAndTreasuryForm,
  FixedIncomeEuaForm,
  FundForm,
  CriptocurrencyForm,
  AccountForm,
  OtherForm,
} from "@/components/form";

const NewAsset = () => {
  const [category, setCategory] = useState("");

  const renderForm = () => {
    switch (category) {
      case "stockExchange":
        return <GenericForm categotySelected={category} />;
      case "fixedIncome":
        return <FixedIncomeAndTreasuryForm categotySelected={category} />;
      case "treasury":
        return <FixedIncomeAndTreasuryForm categotySelected={category} />;
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
    </div>
  );
};

export default NewAsset;
