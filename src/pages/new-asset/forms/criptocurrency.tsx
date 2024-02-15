import { Input } from "@/components/ui/input";
import { SelectOperation } from "../components";
import { InputLabelGroup } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { criptocurrencySchema } from "@/schemas/new-asset/criptocurrency";
import { addAsset } from "@/services/asset";
import { Button } from "@/components/ui/button";

interface CriptocurrencyFormProps {
  categotySelected: string;
}

export const CriptocurrencyForm = ({
  categotySelected,
}: CriptocurrencyFormProps) => {
  const {
    watch,
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(criptocurrencySchema) });

  const {
    ticker,
    exchangeName,
    operation,
    quantity,
    price,
    total,
    rate,
    date,
  } = watch();

  const getOperationType = () => {
    switch (operation) {
      case "manualBuy":
        return 1;
      case "manualSell":
        return 2;
      case "importCryptoBuy":
        return 3;
      case "importCryptoSell":
        return 4;

      default:
        return 1;
    }
  };

  const operationType = getOperationType();

  const onSubmit = async () => {
    const dataToSend = {
      ticker,
      assetName: ticker,
      exchangeName,
      qtd: quantity,
      price,
      market: "criptocurrency",
      marketType: 4,
      total,
      category: 4,
      categoryName: categotySelected,
      assetGroup: "criptocurrency",
      rate: rate || null,
      operation,
      operationDate: date,
      operationType,
    };

    console.log(dataToSend);

    await addAsset(dataToSend);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="operation"
          render={({ field }) => (
            <InputLabelGroup
              label="Operação"
              errorMessage={errors.operation?.message}
            >
              <SelectOperation {...field} categotySelected={categotySelected} />
            </InputLabelGroup>
          )}
        />
        <InputLabelGroup label="Ativo" errorMessage={errors.ticker?.message}>
          <Input
            type="text"
            placeholder="Código do ativo"
            {...register("ticker")}
          />
        </InputLabelGroup>
        <InputLabelGroup
          label="Instituição"
          errorMessage={errors.exchangeName?.message}
        >
          <Input id="institution" type="text" {...register("exchangeName")} />
        </InputLabelGroup>
        <InputLabelGroup
          label="Data da operação"
          errorMessage={errors.date?.message}
        >
          <Input type="date" {...register("date")} />
        </InputLabelGroup>
        <InputLabelGroup label="Total" errorMessage={errors.total?.message}>
          <Input id="total" type="number" {...register("total")} />
        </InputLabelGroup>
        <InputLabelGroup
          label="Quantidade"
          errorMessage={errors.quantity?.message}
        >
          <Input id="quantity" type="number" {...register("quantity")} />
        </InputLabelGroup>
        <InputLabelGroup label="Preço" errorMessage={errors.price?.message}>
          <Input id="price" type="number" {...register("price")} />
        </InputLabelGroup>
      </div>
      <Button type="submit" className="self-end w-auto">
        Salvar
      </Button>
    </form>
  );
};
