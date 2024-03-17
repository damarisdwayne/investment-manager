import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { genericSchema } from "@/schemas/new-asset/generic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DiagramTable,
  InputLabelGroup,
  SelectOperation,
  SelectType,
} from "@/components";
import {
  addAsset,
  getAssetAnswers,
  getAssetInfoFromBrapi,
  getAvaiableAssetsFromBrapi,
} from "@/services/asset";
import {
  AnswerData,
  QuestionData,
  getQuestionByDiagramType,
} from "@/services/questions";
import { useNavigate } from "react-router-dom";
import { DefaultRoutes } from "@/routes/routes";
import { IAsset } from "@/types/asset";
import {
  formatNumberToCurrency,
  parseCurrencyToNumber,
  removeSAFromText,
} from "@/utils";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AssetGroupToCategory, OperationType } from "@/constants";

type DefaultValuesData = {
  ticker: string;
  exchangeName: string;
  type: string;
  rate: number | undefined;
};

interface GenericFormProps {
  categotySelected: string;
  isEditMode?: boolean;
  defaultValues?: DefaultValuesData;
}

export const GenericForm = ({
  categotySelected,
  defaultValues,
  isEditMode,
}: GenericFormProps) => {
  const [options, setOptions] = useState<string[]>();
  const [changingTotal, setChangingTotal] = useState<boolean>(false);
  const [changingPrice, setChangingPrice] = useState<boolean>(false);
  const [inputAutocompleteValue, setInputAutocompleteValue] = useState("");
  const [questions, setQuestions] = useState<QuestionData[]>([]);
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
      exchangeName: defaultValues?.exchangeName || undefined,
      ticker: defaultValues?.ticker || "",
      type: defaultValues?.type || undefined,
      date: new Date().toISOString().slice(0, 10) || undefined,
      rate: defaultValues?.rate || 0,
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

  const shouldShowDiagramTable =
    type === "fii" || type === "stock" || type === "fiAgro";

  const getOperationType = () => {
    return (
      OperationType[operation as keyof typeof OperationType] ||
      OperationType.ManualBuy
    );
  };
  const operationType = getOperationType();

  const getQuestions = async () => {
    const diagramType = type === "fii" ? "fii" : "cerradoDiagram";
    const questions = await getQuestionByDiagramType(diagramType);
    setQuestions(questions);
  };

  const getRate = () => {
    const isStockExchange =
      type === "stock" || type === "fii" || type === "fiAgro";
    let assetRate = 0;
    if (isStockExchange) {
      if (answers) {
        answers.forEach((answer) => {
          if (answer.answer === "yes") {
            assetRate++;
          } else if (answer.answer === "no") {
            assetRate--;
          }
        });
      }
    } else {
      assetRate = rate!;
      setValue("rate", rate);
    }
    return assetRate;
  };

  const getAssetGroup = () => {
    switch (type) {
      case "stock":
      case "bdr":
      case "etf":
        return "stock";
      case "stockUsa":
      case "etfUsa":
        return "stockUsa";
      case "fii":
      case "fiiAgro":
        return "fii";

      default:
        break;
    }
  };

  const getAnswers = async () => {
    const data = await getAssetAnswers(ticker);
    setAnswers(data as AnswerData[]);
  };

  const getAssetCode = async (search: string) => {
    const data = await getAvaiableAssetsFromBrapi(search);
    setOptions(data);
  };

  const onSubmit = async () => {
    const market =
      type !== "etfUsa" && type !== "reit"
        ? "Bovespa"
        : "New York Stock Exchange";
    const marketType = type !== "etfUsa" && type !== "reit" ? 1 : 2;
    const assetGroup = getAssetGroup();
    const rate = getRate();
    const category =
      AssetGroupToCategory[assetGroup as keyof typeof AssetGroupToCategory];

    try {
      const assetData = await getAssetInfoFromBrapi(ticker);
      const dataToSend: IAsset = {
        ticker,
        assetName: assetData?.[0].longName || null,
        exchangeName,
        qtd: +quantity,
        price: parseCurrencyToNumber(price),
        market,
        marketType,
        total: parseCurrencyToNumber(total),
        sector: assetData?.[0].summaryProfile.sector || null,
        sectorKey: assetData?.[0].summaryProfile.sectorKey || null,
        industry: assetData?.[0]?.summaryProfile.industry || null,
        industryKey: assetData?.[0]?.summaryProfile.industryKey || null,
        category,
        categoryName: categotySelected,
        assetGroup: assetGroup,
        rate: rate,
        operation,
        operationDate: date,
        operationType,
      };
      console.log(dataToSend);
      await addAsset(dataToSend, answers);
      navigate(DefaultRoutes.WALLET);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (type) {
      getQuestions();
    }
  }, [type]);

  useEffect(() => {
    if (isEditMode) {
      getAnswers();
    }
  }, []);

  useEffect(() => {
    if (total && quantity && !changingPrice) {
      const sumPrice =
        parseCurrencyToNumber(total) /
        parseCurrencyToNumber(quantity.toString());
      setValue("price", formatNumberToCurrency(sumPrice.toString()));
    } else if (quantity && price && !changingTotal) {
      const sumTotal =
        parseCurrencyToNumber(quantity.toString()) *
        parseCurrencyToNumber(price);
      setValue("total", formatNumberToCurrency(sumTotal.toString()));
    }
  }, [total, quantity, price]);

  useEffect(() => {
    if (inputAutocompleteValue) {
      getAssetCode(inputAutocompleteValue);
    }
  }, [ticker, inputAutocompleteValue]);

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
                disabled={isEditMode}
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
          render={() => {
            return (
              <InputLabelGroup
                label="Ativo"
                errorMessage={errors.ticker?.message}
              >
                {isEditMode || getAssetGroup() === "stockUsa" ? (
                  <Input
                    id="ticker"
                    type="text"
                    {...register("ticker")}
                    disabled={isEditMode}
                  />
                ) : (
                  <Autocomplete
                    id="ticker"
                    disablePortal
                    disableListWrap
                    onChange={(_, newValue) => {
                      setValue("ticker", newValue || "");
                    }}
                    inputValue={inputAutocompleteValue}
                    onInputChange={(_, newInputValue) => {
                      setInputAutocompleteValue(newInputValue);
                    }}
                    getOptionLabel={(option) => removeSAFromText(option)}
                    options={options || []}
                    fullWidth
                    noOptionsText="Não encontrado"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid hsl(var(--primary))",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #262626",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#262626",
                      },
                      "& .MuiAutocomplete-input": {
                        marginTop: "-9px",
                      },
                      "& .MuiAutocomplete-popupIndicator": {
                        color: "#262626",
                      },
                      "& .MuiAutocomplete-clearIndicator": {
                        color: "#262626",
                        visibility: "visible",
                      },
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: "white",
                            height: 36,
                          },
                        }}
                      />
                    )}
                  />
                )}
              </InputLabelGroup>
            );
          }}
        />
        <InputLabelGroup
          label="Instituição"
          errorMessage={errors.exchangeName?.message}
        >
          <Input
            id="exchangeName"
            type="text"
            {...register("exchangeName")}
            disabled={isEditMode}
          />
        </InputLabelGroup>
        <InputLabelGroup label="Data" errorMessage={errors.date?.message}>
          <Input type="date" {...register("date")} />
        </InputLabelGroup>
        <InputLabelGroup label="Total" errorMessage={errors.total?.message}>
          <Input
            id="total"
            type="text"
            min={0}
            {...register("total")}
            onChange={(e) => {
              setChangingTotal(true);
              setValue("total", formatNumberToCurrency(e.target.value));
            }}
          />
        </InputLabelGroup>
        <InputLabelGroup
          label="Quantidade"
          errorMessage={errors.quantity?.message}
        >
          <Input id="quantity" type="number" {...register("quantity")} />
        </InputLabelGroup>
        <InputLabelGroup label="Preço" errorMessage={errors.price?.message}>
          <Input
            id="price"
            type="text"
            {...register("price")}
            onChange={(e) => {
              setChangingPrice(true);
              setValue("price", formatNumberToCurrency(e.target.value));
            }}
          />
        </InputLabelGroup>
      </div>
      {shouldShowDiagramTable ? (
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
