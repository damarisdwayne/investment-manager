import { Input } from "@/components/ui/input";
import { InputLabelGroup, SelectOperation } from "@/components";
import { Controller, useForm } from "react-hook-form";

interface FixedIncomeEuaFormProps {
  categotySelected: string;
}

export const FixedIncomeEuaForm = ({
  categotySelected,
}: FixedIncomeEuaFormProps) => {
  const { control } = useForm();
  return (
    <div>
      <InputLabelGroup label="Emissor do título">
        <Input type="text" className="mb-4" />
      </InputLabelGroup>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="operation"
          control={control}
          render={({ field }) => (
            <InputLabelGroup label="Operação">
              <SelectOperation {...field} categotySelected={categotySelected} />
            </InputLabelGroup>
          )}
        />
        <InputLabelGroup label="Instituição">
          <Input id="exchangeName" type="text" />
        </InputLabelGroup>
        <InputLabelGroup label="Data da operação">
          <Input id="operation" type="date" />
        </InputLabelGroup>
        <InputLabelGroup label="Vencimento">
          <Input type="date" />
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
