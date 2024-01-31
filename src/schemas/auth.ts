import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Formato de email inválido")
    .required("O email é obrigatório"),
  password: yup.string().required("A senha é obrigatória"),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Formato de email inválido")
    .required("O email é obrigatório"),
  name: yup.string().required("O nome é obrigatório"),
  password: yup.string().required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "As senhas devem ser iguais")
    .required("A confirmação de senha é obrigatória"),
});
