import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DatePicker,
  InputLabelGroup,
  SelectOperation,
  SelectType,
} from "../components";
import { SelectTypeFee, SelectIndexer } from "../components";

interface FixedIncomeFormProps {
  categotySelected: string;
}

export const FixedIncomeForm = ({ categotySelected }: FixedIncomeFormProps) => {
  const [fee, setFee] = useState("");
  const [indexer, setIndexer] = useState("");

  const percentPerYearLabel = fee === "pre" ? "% ao ano" : `% do ${indexer}`;

  return (
    <div className="grid grid-cols-2 gap-4">
      <InputLabelGroup label="Tipo">
        <SelectType categotySelected={categotySelected} />
      </InputLabelGroup>
      <InputLabelGroup label="Operação">
        <SelectOperation categotySelected={categotySelected} />
      </InputLabelGroup>
      <InputLabelGroup label="Instituição">
        <Input id="institution" type="text" />
      </InputLabelGroup>
      <InputLabelGroup label="Data da operação">
        <DatePicker />
      </InputLabelGroup>
      <InputLabelGroup label="Tipo de taxa">
        <SelectTypeFee setFee={setFee} />
      </InputLabelGroup>
      <InputLabelGroup label="Vencimento">
        <DatePicker />
      </InputLabelGroup>
      {fee === "pos" && (
        <InputLabelGroup label="Indexador">
          <SelectIndexer setIndexer={setIndexer} />
        </InputLabelGroup>
      )}
      <InputLabelGroup label={percentPerYearLabel}>
        <Input id="percentPerYear" type="number" />
      </InputLabelGroup>
      <InputLabelGroup label="Total investido">
        <Input id="total" type="number" />
      </InputLabelGroup>
    </div>
  );
};
