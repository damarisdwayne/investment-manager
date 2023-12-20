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
}

export const SelectType = ({ categotySelected }: SelectTypeProps) => {
  const getAssetsByCategory = () => {
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

  const assetList = getAssetsByCategory();

  return (
    <Select>
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
