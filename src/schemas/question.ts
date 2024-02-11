import * as yup from "yup";

export const questionSchema = yup.object().shape({
  criterion: yup.string().required("O critério é obrigatório"),
  question: yup.string().required("A pergunta é obrigatória"),
  diagramType: yup.string().required("O tipo de diagrama é obrigatório"),
});
