import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectTypeFeeProps {
  onChange: (...event: any[]) => void;
  value: string;
}

export const SelectFee = ({ onChange, value }: SelectTypeFeeProps) => {
  const interestPaymentTypes = [
    { option: "pre", value: "Pré" },
    { option: "pos", value: "Pós" },
  ];

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent id="type">
        <SelectGroup>
          {interestPaymentTypes.map(({ option, value }) => (
            <SelectItem key={option} value={option}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
