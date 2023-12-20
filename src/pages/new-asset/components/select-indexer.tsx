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
  setIndexer: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectIndexer = ({ setIndexer }: SelectIndexerProps) => {
  const indexerOptions = [
    { option: "CDI", value: "CDI" },
    { option: "IPCA", value: "IPCA" },
    { option: "IPCA+", value: "IPCA+" },
    { option: "CDI+", value: "CDI+" },
    { option: "IGPM", value: "IGPM" },
    { option: "IGPM+", value: "IGPM+" },
  ];

  return (
    <Select onValueChange={(indexer) => setIndexer(indexer)}>
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
