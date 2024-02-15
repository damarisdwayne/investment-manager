import * as yup from "yup";

export const genericSchema = yup.object().shape({
  type: yup.string().required("O tipo é obrigatório"),
  operation: yup.string().required("A operação é obrigatória"),
  ticker: yup.string().required("O ativo é obrigatório"),
  exchangeName: yup.string().required("O nome da instituição é obrigatório"),
  date: yup.date().required("A data é obrigatória"),
  total: yup.number().required("O total é obrigatório"),
  quantity: yup.number().required("A quantidade é obrigatória"),
  price: yup.number().required("O preço é obrigatório"),
  rate: yup.number(),
});
