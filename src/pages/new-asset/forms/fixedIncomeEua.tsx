import { Input } from "@/components/ui/input";
import { DatePicker, SelectOperation } from "../components";
import { InputLabelGroup } from "@/components";

interface FixedIncomeEuaFormProps {
  categotySelected: string;
}

export const FixedIncomeEuaForm = ({
  categotySelected,
}: FixedIncomeEuaFormProps) => {
  return (
    <div>
      <InputLabelGroup label="Emissor do título">
        <Input type="text" className="mb-4" />
      </InputLabelGroup>
      <div className="grid grid-cols-2 gap-4">
        <InputLabelGroup label="Operação">
          <SelectOperation categotySelected={categotySelected} />
        </InputLabelGroup>
        <InputLabelGroup label="Instituição">
          <Input id="institution" type="text" />
        </InputLabelGroup>
        <InputLabelGroup label="Data da operação">
          <DatePicker />
        </InputLabelGroup>
        <InputLabelGroup label="Vencimento">
          <DatePicker />
        </InputLabelGroup>
        <InputLabelGroup label="% ao ano">
          <Input id="percentPerYear" type="number" />
        </InputLabelGroup>
        <InputLabelGroup label="Total">
          <Input id="total" type="number" />
        </InputLabelGroup>
      </div>
    </div>
  );
};
