import { Label } from "@/components/ui/label";
import React, { ReactNode } from "react";

interface InputLabelGroupProps {
  label: string;
  children: ReactNode;
  errorMessage?: string;
}

export const InputLabelGroup: React.FC<InputLabelGroupProps> = ({
  label,
  children,
  errorMessage,
}) => {
  const hasError = Boolean(errorMessage);
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={label.toLowerCase()} className="text-left">
        {label}
      </Label>
      {children}
      {hasError && <p className="text-destructive text-sm">{errorMessage}</p>}
    </div>
  );
};
