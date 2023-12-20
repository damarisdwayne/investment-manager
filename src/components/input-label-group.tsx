import { Label } from "@/components/ui/label";
import React, { ReactNode } from "react";

interface InputLabelGroupProps {
  label: string;
  children: ReactNode;
}

export const InputLabelGroup: React.FC<InputLabelGroupProps> = ({
  label,
  children,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={label.toLowerCase()} className="text-left">
        {label}
      </Label>
      {children}
    </div>
  );
};
