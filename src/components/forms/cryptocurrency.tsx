import { Input } from "@/components/ui/input";
import { InputLabelGroup, SelectOperation } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cryptocurrencySchema } from "@/schemas/new-asset";
import { addAsset, getAvaiableCryptoFromBrapi } from "@/services/asset";
import { Button } from "@/components/ui/button";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {
  formatNumberToCurrency,
  parseCurrencyToNumber,
  removeSAFromText,
} from "@/utils";
import { OperationType } from "@/constants";
import { DefaultRoutes } from "@/routes/routes";
import { useNavigate } from "react-router-dom";

type DefaultValuesData = {
  ticker: string;
  exchangeName: string;
  rate: number | undefined;
};

interface CriptocurrencyFormProps {
  categotySelected: string;
  isEditMode?: boolean;
  defaultValues?: DefaultValuesData;
}

export const CryptocurrencyForm = ({
  categotySelected,
  isEditMode,
  defaultValues,
}: CriptocurrencyFormProps) => {
  const {
    watch,
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(cryptocurrencySchema),
    defaultValues: {
      exchangeName: defaultValues?.exchangeName || undefined,
      ticker: defaultValues?.ticker || "",
      date: new Date().toISOString().slice(0, 10) || undefined,
      rate: defaultValues?.rate || 0,
    },
  });

  const [inputAutocompleteValue, setInputAutocompleteValue] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [changingTotal, setChangingTotal] = useState<boolean>(false);
  const [changingPrice, setChangingPrice] = useState<boolean>(false);

  const navigate = useNavigate();

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
    return (
      OperationType[operation as keyof typeof OperationType] ||
      OperationType.ManualBuy
    );
  };
  const operationType = getOperationType();

  const getCoinCode = async (search: string) => {
    const data = await getAvaiableCryptoFromBrapi(search);
    setOptions(data);
  };

  const onSubmit = async () => {
    const dataToSend = {
      ticker,
      assetName: ticker,
      exchangeName,
      qtd: +quantity,
      price: parseCurrencyToNumber(price),
      market: "cryptocurrency",
      marketType: 5,
      total: parseCurrencyToNumber(total),
      category: 4,
      categoryName: categotySelected,
      assetGroup: "cryptocurrency",
      rate: +rate! || null,
      operation,
      operationDate: date,
      operationType,
    };

    await addAsset(dataToSend);
    navigate(DefaultRoutes.WALLET);
  };

  useEffect(() => {
    if (inputAutocompleteValue) {
      getCoinCode(inputAutocompleteValue);
    }
  }, [ticker, inputAutocompleteValue]);

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
          {isEditMode ? (
            <Input
              id="ticker"
              type="text"
              {...register("ticker")}
              disabled={isEditMode}
            />
          ) : (
            <Controller
              control={control}
              name="ticker"
              render={() => (
                <Autocomplete
                  id="ticker"
                  disablePortal
                  disableListWrap
                  onChange={(_, value) => {
                    setValue("ticker", value || "");
                  }}
                  inputValue={inputAutocompleteValue}
                  onInputChange={(_, newInputValue) => {
                    setInputAutocompleteValue(newInputValue);
                  }}
                  getOptionLabel={(option) => removeSAFromText(option)}
                  options={options || []}
                  fullWidth
                  noOptionsText="Não encontrado"
                  disabled={isEditMode}
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
            />
          )}
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
            min={0}
            {...register("price")}
            onChange={(e) => {
              setChangingPrice(true);
              setValue("price", formatNumberToCurrency(e.target.value));
            }}
          />
        </InputLabelGroup>
        <InputLabelGroup label="Nota" errorMessage={errors.rate?.message}>
          <Input id="rate" type="number" {...register("rate")} />
        </InputLabelGroup>
      </div>
      <Button type="submit" className="self-end w-auto">
        Salvar
      </Button>
    </form>
  );
};
