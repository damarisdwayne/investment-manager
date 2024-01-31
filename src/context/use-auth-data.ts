import { useContext } from "react";
import AuthContext, { AuthContextType } from "./auth-context";

export const useAuthData = (): AuthContextType => useContext(AuthContext);
