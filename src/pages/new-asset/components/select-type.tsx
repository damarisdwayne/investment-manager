import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  accountAssets,
  financialAssets,
  fixedIncomeAssets,
  treasuryAssets,
} from "@/constants";

interface SelectTypeProps {
  categotySelected: string;
  onChange: (...event: any[]) => void;
  value: string;
}

export const SelectType = ({
  categotySelected,
  onChange,
  value,
}: SelectTypeProps) => {
  const getAssetsTypeByCategory = () => {
    switch (categotySelected) {
      case "stockExchange":
        return financialAssets;
      case "treasury":
        return treasuryAssets;
      case "fixedIncome":
        return fixedIncomeAssets;
      case "account":
        return accountAssets;

      default:
        return financialAssets;
    }
  };

  const assetList = getAssetsTypeByCategory();

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent id="type">
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
