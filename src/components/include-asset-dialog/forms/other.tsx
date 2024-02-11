import { Input } from "@/components/ui/input";
import { DatePicker, SelectOperation } from "../components";
import { InputLabelGroup } from "@/components/input-label-group";

interface OtherFormProps {
  categotySelected: string;
}

export const OtherForm = ({ categotySelected }: OtherFormProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <InputLabelGroup label="Nome do ativo ou bem">
        <Input type="text" />
      </InputLabelGroup>
      <div className="grid grid-cols-2 gap-4">
        <InputLabelGroup label="Operação">
          <SelectOperation categotySelected={categotySelected} />
        </InputLabelGroup>
        <InputLabelGroup label="Data da operação">
          <DatePicker />
        </InputLabelGroup>
        <InputLabelGroup label="Total investido">
          <Input id="total" type="number" />
        </InputLabelGroup>
      </div>
    </div>
  );
};
