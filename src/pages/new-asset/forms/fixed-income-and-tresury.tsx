import { Input } from "@/components/ui/input";
import { SelectOperation, SelectType } from "../components";
import { SelectFee, SelectIndexer } from "../components";
import { InputLabelGroup } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { addAsset } from "@/services/asset";
import { yupResolver } from "@hookform/resolvers/yup";
import { FixedIncomeAndTreasurySchema } from "@/schemas/new-asset/fixed-income-and-treasury";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { INewAsset } from "@/types/asset";

interface FixedIncomeAndTreasuryFormProps {
  categotySelected: string;
}

export const FixedIncomeAndTreasuryForm = ({
  categotySelected,
}: FixedIncomeAndTreasuryFormProps) => {
  const { control, watch, register, handleSubmit } = useForm({
    resolver: yupResolver(FixedIncomeAndTreasurySchema),
  });

  const {
    type,
    operation,
    exchangeName,
    date,
    dueDate,
    indexer,
    percentage,
    total,
    fee,
    rate,
  } = watch();

  const isRequiredFieldsFilled =
    !!type &&
    !!operation &&
    !!exchangeName &&
    !!date &&
    !!dueDate &&
    !!total &&
    !!fee &&
    !!percentage &&
    !!rate;

  const percentPerYearLabel =
    fee === "pre" ? "% ao ano" : `% do ${indexer || ""}`;

  const dueDateFormatted = dueDate ? format(dueDate, "dd/MM/yyyy") : undefined;

  const market = categotySelected === "treasury" ? "Tesouro" : "Renda fixa";
  const marketType = categotySelected === "treasury" ? 3 : 4;

  const ticker = isRequiredFieldsFilled
    ? `${type} ${fee} ${percentage}% ${indexer} ${dueDateFormatted}`
    : "";

  const onSubmit = async () => {
    const dataToSend: INewAsset = {
      ticker,
      assetName: type,
      exchangeName,
      tax: percentage,
      typeTax: fee,
      market,
      marketType,
      total,
      sector: type,
      sectorKey: type,
      category: 2,
      categoryName: categotySelected,
      assetGroup: "fixedIncome",
      rate: rate || null,
      operation,
      operationDate: date,
      dueDate,
      operationType: 1,
    };

    await addAsset(dataToSend);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <InputLabelGroup label="Tipo">
              <SelectType {...field} categotySelected={categotySelected} />
            </InputLabelGroup>
          )}
        />
        <Controller
          name="operation"
          control={control}
          render={({ field }) => (
            <InputLabelGroup label="Operação">
              <SelectOperation {...field} categotySelected={categotySelected} />
            </InputLabelGroup>
          )}
        />
        <InputLabelGroup label="Instituição">
          <Input id="institution" type="text" {...register("exchangeName")} />
        </InputLabelGroup>
        <InputLabelGroup label="Data da operação">
          <Input type="date" {...register("date")} />
        </InputLabelGroup>
        <Controller
          name="fee"
          control={control}
          render={({ field }) => (
            <InputLabelGroup label="Tipo de taxa">
              <SelectFee {...field} />
            </InputLabelGroup>
          )}
        />
        <InputLabelGroup label="Vencimento">
          <Input type="date" {...register("dueDate")} />
        </InputLabelGroup>
        {fee === "pos" && (
          <Controller
            name="indexer"
            control={control}
            render={({ field }) => (
              <InputLabelGroup label="Indexador">
                <SelectIndexer {...field} />
              </InputLabelGroup>
            )}
          />
        )}
        <InputLabelGroup label={percentPerYearLabel}>
          <Input
            id="percentPerYear"
            type="number"
            {...register("percentage")}
          />
        </InputLabelGroup>
        <InputLabelGroup label="Total investido">
          <Input id="total" type="number" {...register("total")} />
        </InputLabelGroup>
      </div>
      <Button type="submit" className="self-end w-auto">
        Salvar
      </Button>
    </form>
  );
};
