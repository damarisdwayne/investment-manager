import { Input } from "@/components/ui/input";
import { SelectAsset, SelectOperation, SelectType } from "../components";
import { InputLabelGroup } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { genericSchema } from "@/schemas/new-asset/generic";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAssetsFromB3, getAssetInfo, addAsset } from "@/services/asset";
import { addAnswer } from "@/services/questions";

interface GenericFormProps {
  categotySelected: string;
}

export const GenericForm = ({ categotySelected }: GenericFormProps) => {
  const [assetCodeList, setAssetCodeList] = useState<string[]>();
  const {
    watch,
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(genericSchema),
  });

  const {
    date,
    exchangeName,
    operation,
    price,
    quantity,
    total,
    ticker,
    type,
    rate,
  } = watch();

  const getOperationType = () => {
    switch (operation) {
      case "manualBuy":
        return 1;
      case "manualSell":
        return 2;
      case "subscription":
        return 3;
      case "bonus":
        return 4;
      case "ipo":
        return 5;
      case "fees":
        return 6;
      case "provent":
        return 7;
      case "cashout":
        return 8;

      default:
        return 1;
    }
  };

  const saveAnswer = async () => {
    await addAnswer("BBSE3", [{ questionId: "123", answer: "tutistuis" }]);
    console.log("teste");
  };

  const getAssetCode = async () => {
    const assetType = type === "fii" ? "fund" : "stock";
    const assets = await getAssetsFromB3(assetType);
    const assetCodeList = assets.stocks?.map((item) => item.stock);
    setAssetCodeList(assetCodeList);
  };

  const operationType = getOperationType();
  const market =
    type !== "etfUsa" && type !== "reit"
      ? "Bovespa"
      : "New York Stock Exchange";
  const marketType = type !== "etfUsa" && type !== "reit" ? 1 : 2;

  useEffect(() => {
    if (type) {
      getAssetCode();
    }
  }, [type]);

  useEffect(() => {
    saveAnswer();
  }, []);

  const onSubmit = async () => {
    let assetInfo;

    if (type === "stock" || type === "fii" || type === "bdr") {
      assetInfo = await getAssetInfo(ticker);
    }

    const assetData = assetInfo?.results?.[0];
    const { longName, summaryProfile } = assetData ?? {};

    const dataToSend = {
      ticker,
      assetName: longName || "",
      exchangeName,
      qtd: quantity,
      price,
      market,
      marketType,
      total,
      sector: summaryProfile?.sector || "",
      sectorKey: summaryProfile?.sectorKey || "",
      category: 1,
      categoryName: categotySelected,
      assetGroup: type,
      rate: rate || "",
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
          name="type"
          render={({ field }) => (
            <InputLabelGroup label="Tipo" errorMessage={errors.type?.message}>
              <SelectType
                onChange={field.onChange}
                value={field.value}
                categotySelected={categotySelected}
              />
            </InputLabelGroup>
          )}
        />
        <Controller
          control={control}
          name="operation"
          render={({ field }) => (
            <InputLabelGroup
              label="Operação"
              errorMessage={errors.operation?.message}
            >
              <SelectOperation
                onChange={field.onChange}
                value={field.value}
                categotySelected={categotySelected}
              />
            </InputLabelGroup>
          )}
        />
        <Controller
          control={control}
          name="ticker"
          render={({ field }) => (
            <InputLabelGroup
              label="Ativo"
              errorMessage={errors.ticker?.message}
            >
              <SelectAsset
                value={field.value}
                onChange={field.onChange}
                assetCodeList={assetCodeList!}
                type={type}
              />
            </InputLabelGroup>
          )}
        />
        <InputLabelGroup
          label="Instituição"
          errorMessage={errors.exchangeName?.message}
        >
          <Input id="exchangeName" type="text" {...register("exchangeName")} />
        </InputLabelGroup>
        <InputLabelGroup label="Data" errorMessage={errors.date?.message}>
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
