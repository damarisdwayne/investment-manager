import * as yup from "yup";

export const editAssetSchema = yup.object().shape({
  ticker: yup.string().required("O ativo é obrigatório"),
  operation: yup.string().required("A operação é obrigatória"),
  total: yup.number().required("O total é obrigatório"),
  quantity: yup.number().required("A quantidade é obrigatória"),
  price: yup.number().required("O preço é obrigatório"),
  date: yup.date().required("A data é obrigatória"),
  rate: yup.number(),
});
