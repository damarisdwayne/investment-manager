import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectIndexerProps {
  onChange: (...event: any[]) => void;
  value: string | undefined;
}

export const SelectIndexer = ({ onChange, value }: SelectIndexerProps) => {
  const indexerOptions = [
    { option: "CDI", value: "CDI" },
    { option: "IPCA", value: "IPCA" },
    { option: "IPCA+", value: "IPCA+" },
    { option: "CDI+", value: "CDI+" },
    { option: "IGPM", value: "IGPM" },
    { option: "IGPM+", value: "IGPM+" },
  ];

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent id="type">
        <SelectGroup>
          {indexerOptions.map(({ option, value }) => (
            <SelectItem key={option} value={option}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
