import { Input } from "@/components/ui/input";
import { DatePicker, InputLabelGroup, SelectOperation } from "../components";

interface CriptocurrencyFormProps {
  categotySelected: string;
}

export const CriptocurrencyForm = ({
  categotySelected,
}: CriptocurrencyFormProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <InputLabelGroup label="Operação">
        <SelectOperation categotySelected={categotySelected} />
      </InputLabelGroup>
      <InputLabelGroup label="Ativo">
        <Input type="text" placeholder="Código do ativo" />
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
      <InputLabelGroup label="Quantidade">
        <Input id="quantity" type="number" />
      </InputLabelGroup>
      <InputLabelGroup label="Preço">
        <Input id="price" type="number" />
      </InputLabelGroup>
    </div>
  );
};
