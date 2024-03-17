import * as yup from "yup";

export const FixedIncomeAndTreasurySchema = yup.object().shape({
  type: yup.string().required("O tipo é obrigatório"),
  operation: yup.string().required("A operação é obrigatória"),
  exchangeName: yup.string().required("O nome da instituição é obrigatório"),
  date: yup.string().required("A data é obrigatória"),
  dueDate: yup.string().required("A data de vencimento é obrigatória"),
  fee: yup.string().required("O tipo de taxa é obrigatória"),
  indexer: yup.string().when("fee", {
    is: "pos",
    then: (schema) => schema.required("O indexador é obrigatório"),
  }),
  percentage: yup.number().when("fee", {
    is: "pos",
    then: (schema) => schema.required("% do é obrigatório"),
  }),
  total: yup.string().required("O total é obrigatório"),
  rate: yup.number().required("A avaliação é obrigatória"),
});
