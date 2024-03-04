import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { genericSchema } from "@/schemas/new-asset/generic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectAsset, SelectOperation, SelectType } from "../components";
import { DiagramTable, InputLabelGroup } from "@/components";
import { getAssetsFromB3, getAssetInfo, addAsset } from "@/services/asset";
import {
  AnswerData,
  QuestionData,
  addAnswer,
  getQuestionByDiagramType,
} from "@/services/questions";
import { useNavigate } from "react-router-dom";
import { DefaultRoutes } from "@/routes/routes";
import { INewAsset } from "@/types/asset";

interface GenericFormProps {
  categotySelected: string;
}

export const GenericForm = ({ categotySelected }: GenericFormProps) => {
  const [assetCodeList, setAssetCodeList] = useState<string[]>();
  const [questions, setQuestions] = useState<QuestionData[]>();
  const [answers, setAnswers] = useState<AnswerData[]>([]);
  const navigate = useNavigate();
  const {
    watch,
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(genericSchema),
    defaultValues: {
      date: new Date(),
      rate: 0,
    },
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

  const operationType = getOperationType();
  const market =
    type !== "etfUsa" && type !== "reit"
      ? "Bovespa"
      : "New York Stock Exchange";

  const marketType = type !== "etfUsa" && type !== "reit" ? 1 : 2;

  const hasDiagramTable =
    type === "fii" || type === "stock" || type === "fiAgro";

  const saveAnswer = async () => {
    await addAnswer(ticker, answers);
  };

  const getQuestions = async () => {
    const diagramType = type === "fii" ? "fiiDiagram" : "cerradoDiagram";
    const questions = await getQuestionByDiagramType(diagramType);
    setQuestions(questions);
  };

  const getAssetCode = async () => {
    const assetType =
      type === "fii" ? "fund" : type === "stock" ? "stock" : undefined;

    if (!assetType) return;

    const assets = await getAssetsFromB3(assetType);
    const assetCodeList = assets.stocks?.map((item) => item.stock);
    setAssetCodeList(assetCodeList);
  };

  const getRate = () => {
    const yesAnswers = answers?.filter((answer) => answer.answer === "yes");
    const noAnswers = answers?.filter((answer) => answer.answer === "no");
    const rate = yesAnswers.length - noAnswers.length;
    setValue("rate", rate);
  };

  useEffect(() => {
    if (type) {
      getAssetCode();
      getQuestions();
    }
  }, [type]);

  const onSubmit = async () => {
    try {
      let assetInfo;

      if (type === "stock" || type === "fii" || type === "bdr") {
        assetInfo = await getAssetInfo(ticker);
      }

      const assetData = assetInfo?.results?.[0];
      const { longName, summaryProfile } = assetData ?? {};

      getRate();

      const dataToSend: INewAsset = {
        ticker,
        assetName: longName || null,
        exchangeName,
        qtd: quantity,
        price,
        market,
        marketType,
        total,
        sector: summaryProfile?.sector || null,
        sectorKey: summaryProfile?.sectorKey || null,
        category: 1,
        categoryName: categotySelected,
        assetGroup: type,
        rate: rate ? +rate : null,
        operation,
        operationDate: date,
        operationType,
      };

      await addAsset(dataToSend);
      await saveAnswer();
      navigate(DefaultRoutes.WALLET);
    } catch (error) {
      console.log(error);
    }
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
      {hasDiagramTable ? (
        <DiagramTable
          questions={questions!}
          action="switch"
          answers={answers}
          setAnswers={setAnswers}
        />
      ) : (
        <InputLabelGroup label="Nota" errorMessage={errors.rate?.message}>
          <Input id="rate" type="number" {...register("rate")} />
        </InputLabelGroup>
      )}
      <Button type="submit" className="self-end w-auto">
        Salvar
      </Button>
    </form>
  );
};
