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
  setFee: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectTypeFee = ({ setFee }: SelectTypeFeeProps) => {
  const interestPaymentTypes = [
    { option: "pre", value: "Pré" },
    { option: "pos", value: "Pós" },
  ];

  return (
    <Select onValueChange={(fee) => setFee(fee)}>
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
