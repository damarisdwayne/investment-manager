import { Input } from "@/components/ui/input";
import { InputLabelGroup } from "@/components";

interface FundFormProps {
  categotySelected: string;
}

export const FundForm = ({ categotySelected }: FundFormProps) => {
  return (
    <div className="gap-4">
      <InputLabelGroup label="Fundo">
        <Input
          className="mb-4"
          type="text"
          placeholder="CNPJ ou Nome do fundo"
        />
      </InputLabelGroup>
      {/* <InputLabelGroup label="Tipo de lançamento">
        <SelectType categotySelected={categotySelected} />
      </InputLabelGroup> */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* <InputLabelGroup label="Operação">
          <SelectOperation categotySelected={categotySelected} />
        </InputLabelGroup> */}
        <InputLabelGroup label="Instituição">
          <Input id="institution" type="text" />
        </InputLabelGroup>
        {/* <InputLabelGroup label="Data da operação">
          <DatePicker />
        </InputLabelGroup> */}
        <InputLabelGroup label="Total investido">
          <Input id="total" type="number" />
        </InputLabelGroup>
      </div>
    </div>
  );
};
