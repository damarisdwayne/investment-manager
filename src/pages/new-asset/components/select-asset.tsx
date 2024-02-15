import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface SelectAssetProps {
  assetCodeList: string[];
  type: string;
  value: string;
  onChange: (...event: any[]) => void;
}

export const SelectAsset = ({
  assetCodeList,
  type,
  value,
  onChange,
}: SelectAssetProps) => {
  return type === "fii" || type === "stock" ? (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent id="category">
        <SelectGroup>
          {assetCodeList?.map((asset) => (
            <SelectItem key={asset} value={asset}>
              {asset}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ) : (
    <Input
      value={value}
      onChange={onChange}
      type="text"
      placeholder="Código do ativo"
    />
  );
};
