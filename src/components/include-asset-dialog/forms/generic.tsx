import { Input } from "@/components/ui/input";
import { DatePicker, SelectOperation, SelectType } from "../components";
import { InputLabelGroup } from "@/components/input-label-group";

interface GenericFormProps {
  categotySelected: string;
}

export const GenericForm = ({ categotySelected }: GenericFormProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <InputLabelGroup label="Tipo">
        <SelectType categotySelected={categotySelected} />
      </InputLabelGroup>
      <InputLabelGroup label="Operação">
        <SelectOperation categotySelected={categotySelected} />
      </InputLabelGroup>
      <InputLabelGroup label="Ativo">
        <Input type="text" placeholder="Código do ativo" />
      </InputLabelGroup>
      <InputLabelGroup label="Instituição">
        <Input id="institution" type="text" />
      </InputLabelGroup>
      <InputLabelGroup label="Data">
        <DatePicker />
      </InputLabelGroup>
      <InputLabelGroup label="Total">
        <Input id="total" type="number" />
      </InputLabelGroup>
      <InputLabelGroup label="Quantidade">
        <Input id="quantity" type="number" />
      </InputLabelGroup>
      <InputLabelGroup label="Preço">
        <Input id="price" type="number" />
      </InputLabelGroup>
    </div>
  );
};
