import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LoginForm } from "@/components/forms/login";
import { RegisterForm } from "@/components/forms/resgister";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthData } from "@/context/use-auth-data";

const Auth: React.FC = () => {
  const { loginWithGoogle } = useAuthData();
  const [mode, setMode] = useState<"login" | "register">("login");
  const isLoginMode = mode === "login";

  useForm({
    resolver: yupResolver(loginSchema),
  });

  return (
    <div className="h-screen flex align-bottom justify-center">
      <Card className="flex flex-col w-1/4 m-auto">
        <CardHeader>
          <CardTitle>{isLoginMode ? "Entrar" : "Registrar"}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoginMode ? <LoginForm /> : <RegisterForm {...{ setMode }} />}
          <Separator className="my-5" />
          <Button
            className="w-full"
            variant="destructive"
            type="button"
            onClick={loginWithGoogle}
          >
            Entrar com o Google
          </Button>
          {isLoginMode ? (
            <p className="mt-4 text-sm">
              Novo por aqui?
              <a
                onClick={() => setMode("register")}
                className="text-primary hover:text-primary/9 font-semibold cursor-pointer"
              >
                {" "}
                Crie uma nova conta
              </a>
            </p>
          ) : (
            <p className="mt-4 text-sm">
              Já tem uma conta?
              <a
                onClick={() => setMode("login")}
                className="text-primary hover:text-primary/6 font-semibold cursor-pointer"
              >
                {" "}
                Entrar com suas credenciais
              </a>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
