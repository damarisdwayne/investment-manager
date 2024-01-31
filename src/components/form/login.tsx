import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/schemas";
import { useAuthData } from "@/context/use-auth-data";
import { useNavigate } from "react-router-dom";
import { InputLabelGroup } from "../input-label-group";
import { Input } from "../ui/input";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuthData();
  const {
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { email, password } = watch();

  const hasEmailError = Boolean(errors.email);
  const hasPasswordError = Boolean(errors.password);

  const handleFormSubmit = async () => {
    try {
      await login(email, password);
      reset();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const isButtonDisabled =
    !email || !password || hasEmailError || hasPasswordError;

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-4"
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputLabelGroup
            label="Email"
            errorMessage={errors.email?.message}
            {...field}
          >
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
      <Button type="submit" disabled={isButtonDisabled} className="w-full">
        Entrar
      </Button>
    </form>
  );
};
