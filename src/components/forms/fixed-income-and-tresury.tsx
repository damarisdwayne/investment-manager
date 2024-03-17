import { Input } from "@/components/ui/input";
import {
  InputLabelGroup,
  SelectFee,
  SelectIndexer,
  SelectOperation,
  SelectType,
} from "@/components";
import { Controller, useForm } from "react-hook-form";
import { addAsset } from "@/services/asset";
import { yupResolver } from "@hookform/resolvers/yup";
import { FixedIncomeAndTreasurySchema } from "@/schemas/new-asset/fixed-income-and-treasury";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { IAsset } from "@/types/asset";
import { formatNumberToCurrency, parseCurrencyToNumber } from "@/utils";
import { DefaultRoutes } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import { AssetGroupToCategory } from "@/constants";

interface FixedIncomeAndTreasuryFormProps {
  categotySelected: string;
}

export const FixedIncomeAndTreasuryForm = ({
  categotySelected,
}: FixedIncomeAndTreasuryFormProps) => {
  const navigate = useNavigate();

  const { control, watch, register, setValue, handleSubmit } = useForm({
    resolver: yupResolver(FixedIncomeAndTreasurySchema),
    defaultValues: {
      date: new Date().toISOString().slice(0, 10) || undefined,
    },
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

  const dueDateFormatted = dueDate
    ? format(new Date(dueDate), "dd/MM/yyyy")
    : undefined;

  const market = categotySelected === "treasury" ? "Tesouro" : "Renda fixa";
  const marketType = categotySelected === "treasury" ? 3 : 4;
  const category =
    AssetGroupToCategory[type as keyof typeof AssetGroupToCategory];

  const ticker = isRequiredFieldsFilled
    ? `${type} ${fee} ${percentage}% ${indexer ? indexer : ""} ${
        dueDate.length > 7 ? dueDateFormatted : ""
      }`
    : "";

  const onSubmit = async () => {
    const dataToSend: IAsset = {
      ticker,
      assetName: type,
      exchangeName,
      tax: percentage,
      typeTax: fee,
      market,
      marketType,
      total: parseCurrencyToNumber(total),
      sector: type,
      industry: type,
      category,
      categoryName: categotySelected,
      assetGroup: "fixedIncome",
      rate: rate || null,
      operation,
      operationDate: date,
      dueDate,
      operationType: 1,
      price: 0,
      qtd: 0,
    };

    await addAsset(dataToSend);
    navigate(DefaultRoutes.WALLET);
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
          <Input
            id="total"
            type="text"
            {...register("total")}
            min={0}
            onChange={(e) =>
              setValue("total", formatNumberToCurrency(e.target.value))
            }
          />
        </InputLabelGroup>
        <InputLabelGroup label="Nota">
          <Input id="total" type="number" {...register("rate")} />
        </InputLabelGroup>
      </div>
      <Button type="submit" className="self-end w-auto">
        Salvar
      </Button>
    </form>
  );
};
