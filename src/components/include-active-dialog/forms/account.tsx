import { Input } from "@/components/ui/input";
import {
  DatePicker,
  InputLabelGroup,
  SelectOperation,
  SelectType,
} from "../components";

interface AccountFormProps {
  categotySelected: string;
}

export const AccountForm = ({ categotySelected }: AccountFormProps) => {
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
      <InputLabelGroup label="Total">
        <Input id="total" type="number" />
      </InputLabelGroup>
    </div>
  );
};
