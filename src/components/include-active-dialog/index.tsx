import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { InputLabelGroup, SelectCategory } from "./components";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  AccountForm,
  CriptocurrencyForm,
  FixedIncomeEuaForm,
  FixedIncomeForm,
  FundForm,
  GenericForm,
  OtherForm,
} from "./forms";

export const IncludeActiveDialog = () => {
  const [category, setCategory] = useState("");

  const renderForm = () => {
    switch (category) {
      case "stockExchange":
        return <GenericForm categotySelected={category} />;
      case "fixedIncome":
        return <FixedIncomeForm categotySelected={category} />;
      case "fixedIncomeEua":
        return <FixedIncomeEuaForm categotySelected={category} />;
      case "fund":
        return <FundForm categotySelected={category} />;
      case "crypto":
        return <CriptocurrencyForm categotySelected={category} />;
      case "account":
        return <AccountForm categotySelected={category} />;
      case "other":
        return <OtherForm categotySelected={category} />;

      default:
        return <GenericForm categotySelected={category} />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 w-44 self-end">
          <PlusIcon /> Adicionar ativo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-3">Adicionar ativo</DialogTitle>
          <Separator />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <InputLabelGroup label="Categoria">
            <SelectCategory setCategory={setCategory} />
          </InputLabelGroup>
          {renderForm()}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
