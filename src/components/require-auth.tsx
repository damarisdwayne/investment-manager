import { useAuthData } from "@/context/use-auth-data";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "./loader";

export const RequireAuth = () => {
  const { user, isLoading } = useAuthData();
  const hasToken = !!localStorage.getItem("authToken") || user?.token;

  if (!hasToken && !user) {
    return <Navigate to="/login" />;
  }
  if (isLoading) {
    return <Loader />;
  }
  return <Outlet />;
};
