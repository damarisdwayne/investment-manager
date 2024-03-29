import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  cryptocurrencyOperation,
  financialOperation,
  fixedIncomeOperation,
  treasuryOperation,
} from "@/constants";

interface SelectTypeProps {
  categotySelected: string;
  onChange: (...event: any[]) => void;
  value: string;
}

export const SelectOperation = ({
  categotySelected,
  onChange,
  value,
}: SelectTypeProps) => {
  const getAssetsByOperation = () => {
    switch (categotySelected) {
      case "stockExchange":
        return financialOperation;
      case "treasury":
        return treasuryOperation;
      case "fixedIncome":
        return fixedIncomeOperation;
      case "fund":
        return fixedIncomeOperation;
      case "cryptocurrency":
        return cryptocurrencyOperation;
      case "account":
        return fixedIncomeOperation;
      case "other":
        return fixedIncomeOperation;

      default:
        return financialOperation;
    }
  };

  const assetList = getAssetsByOperation();

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent inputMode="search" id="operation">
        <SelectGroup>
          {assetList.map((asset) => (
            <SelectItem key={asset.option} value={asset.option}>
              {asset.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
