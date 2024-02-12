import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InputLabelGroup } from "@/components";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { Goal, addGoal, getGoal } from "@/services/goals";

export const MyGoals: React.FC = () => {
  const { handleSubmit, setValue, watch, reset } = useForm();

  const getCurrentGoal = async () => {
    const goal = await getGoal();

    const defaultValues: Goal = {
      stock: [20],
      stockUsa: [10],
      fixedIncome: [30],
      fii: [30],
      reits: [10],
      criptocurrency: [5],
      gold: [5],
    };

    if (goal) {
      Object.keys(defaultValues).forEach((key) => {
        setValue(key, goal[key as keyof Goal]);
      });
    } else {
      Object.keys(defaultValues).forEach((key) => {
        setValue(key, defaultValues[key as keyof Goal]);
      });
    }
  };

  const values = watch();

  const { stock, stockUsa, fixedIncome, fii, reits, criptocurrency, gold } =
    values;

  const getTotal = () => {
    const total =
      stock?.[0] +
      stockUsa?.[0] +
      fixedIncome?.[0] +
      fii?.[0] +
      reits?.[0] +
      criptocurrency?.[0] +
      gold?.[0];

    return total;
  };

  const total = getTotal();

  const onSubmit = async () => {
    await addGoal({
      stock,
      stockUsa,
      fixedIncome,
      fii,
      reits,
      criptocurrency,
      gold,
    });
  };

  useEffect(() => {
    getCurrentGoal();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex-1 m-auto px-8">
      <div className="my-4 flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h1 className="mb-2">Metas</h1>
          <p>Edite os itens abaixo para ajustar suas metas</p>
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="destructive" onClick={() => reset()}>
            Resetar valores
          </Button>
          <Button type="submit" disabled={total < 100 || total > 100}>
            Salvar
          </Button>
        </div>
      </div>
      <Card className="w-full h-full flex-1">
        <CardContent className="w-full h-full p-8 flex flex-col space-y-4">
          <InputLabelGroup label="Ações Nacionais">
            <Slider
              name="stock"
              value={stock}
              onValueChange={(number) => setValue("stock", number)}
              max={100}
              step={1}
            />
            <span className="self-end">{stock}%</span>
          </InputLabelGroup>
          <InputLabelGroup label="Ações Internacionais">
            <Slider
              name="stockUsa"
              value={stockUsa}
              onValueChange={(number) => setValue("stockUsa", number)}
              max={100}
              step={1}
            />
            <span className="self-end">{stockUsa}%</span>
          </InputLabelGroup>
          <InputLabelGroup label="Renda fixa">
            <Slider
              name="fixedIncome"
              value={fixedIncome}
              onValueChange={(number) => setValue("fixedIncome", number)}
              max={100}
              step={1}
            />
            <span className="self-end">{fixedIncome}%</span>
          </InputLabelGroup>
          <InputLabelGroup label="Fundos Imobiliários">
            <Slider
              name="fii"
              value={fii}
              onValueChange={(number) => setValue("fii", number)}
              max={100}
              step={1}
            />
            <span className="self-end">{fii}%</span>
          </InputLabelGroup>
          <InputLabelGroup label="REITs">
            <Slider
              name="reits"
              value={reits}
              onValueChange={(number) => setValue("reits", number)}
              max={100}
              step={1}
            />
            <span className="self-end">{reits}%</span>
          </InputLabelGroup>
          <InputLabelGroup label="Criptomoedas">
            <Slider
              name="criptocurrency"
              value={criptocurrency}
              onValueChange={(number) => setValue("criptocurrency", number)}
              max={100}
              step={1}
            />
            <span className="self-end">{criptocurrency}%</span>
          </InputLabelGroup>
          <InputLabelGroup label="Ouro">
            <Slider
              name="gold"
              value={gold}
              onValueChange={(number) => setValue("gold", number)}
              max={100}
              step={1}
            />
            <span className="self-end">{gold}%</span>
          </InputLabelGroup>
          <h4 className={`${total > 100 && "text-destructive"} self-end`}>
            Total: {total}%
          </h4>
        </CardContent>
      </Card>
    </form>
  );
};
