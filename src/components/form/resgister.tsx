import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { registerSchema } from "@/schemas";
import { useAuthData } from "@/context/use-auth-data";
import { InputLabelGroup } from "./input-label-group";
import { Input } from "../ui/input";

interface RegisterFormProps {
  setMode: React.Dispatch<React.SetStateAction<"login" | "register">>;
}

export const RegisterForm = ({ setMode }: RegisterFormProps) => {
  const { register } = useAuthData();

  const {
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { email, password } = watch();

  const hasEmailError = Boolean(errors.email);
  const hasPasswordError = Boolean(errors.password);

  const isButtonDisabled =
    !email || !password || hasEmailError || hasPasswordError;

  const handleFormSubmit = () => {
    register({ email, password });
    reset();
    setMode("login");
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4"
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <InputLabelGroup label="Nome" errorMessage={errors.name?.message}>
            <Input id="name" type="name" {...field} />
          </InputLabelGroup>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputLabelGroup label="Email" errorMessage={errors.email?.message}>
            <Input id="email" type="email" {...field} />
          </InputLabelGroup>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <InputLabelGroup label="Senha" errorMessage={errors.email?.message}>
            <Input id="password" type="password" {...field} />
          </InputLabelGroup>
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <InputLabelGroup
            label="Confirmar Senha"
            errorMessage={errors.email?.message}
          >
            <Input id="confirmPassword" type="password" {...field} />
          </InputLabelGroup>
        )}
      />
      <Button type="submit" disabled={isButtonDisabled} className="w-full">
        Registrar
      </Button>
    </form>
  );
};
