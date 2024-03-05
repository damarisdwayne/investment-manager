export const formatToRealCurrency = (
  value: number | undefined,
): string | undefined => {
  if (value === undefined || isNaN(value)) {
    return;
  }

  const numericValue = Number(value);
  if (isNaN(numericValue)) {
    return;
  }

  const [integerPart, decimalPart] = numericValue.toFixed(2).split(".");

  const formattedIntegerPart = integerPart
    .split("")
    .reverse()
    .reduce((acc, digit, index) => {
      return digit + (index > 0 && index % 3 === 0 ? "." : "") + acc;
    }, "");

  const formattedValue = `R$ ${formattedIntegerPart},${decimalPart}`;

  return formattedValue;
};

export const formatNumberToCurrency = (value: string) => {
  const numericValue = value.replace(/\D/g, "");

  const formattedValue = (parseFloat(numericValue) / 100).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    },
  );

  return formattedValue;
};

export const parseCurrencyToNumber = (formattedValue: string): number => {
  const numericValue: string = formattedValue.replace(/\D/g, "");

  const amount: number = parseFloat(numericValue) / 100;

  return amount;
};
