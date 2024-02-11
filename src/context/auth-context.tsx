import React, { createContext, useState, ReactNode, useEffect } from "react";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../services/firebase/config";
import { IAuthRequest } from "@/types";
import { useNavigate } from "react-router-dom";
import { DefaultRoutes } from "@/routes/routes";

export interface IUser {
  uid: string;
  email: string;
  name: string;
  token: string;
  provider: string;
  imageUrl: string;
}

const initialUser: IUser = {
  uid: "",
  email: "",
  name: "",
  token: "",
  provider: "",
  imageUrl: "",
};

export interface AuthContextType {
  user: IUser | null;
  isLoading: boolean;
  register: ({ email, password }: IAuthRequest) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const initialAuthContext: AuthContextType = {
  user: null,
  isLoading: true,
  register: async () => {},
  login: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
};

const convertFirebaseUser = async (firebaseUser: User): Promise<IUser> => {
  const token = await firebaseUser.getIdToken();
  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || "",
    email: firebaseUser.email || "",
    token,
    provider: firebaseUser.providerId,
    imageUrl: firebaseUser.photoURL || "",
  };
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const clearSession = () => {
    localStorage.removeItem("authToken");
    setUser(initialUser);
    setLoading(false);
  };

  const configureSession = async (firebaseUser: User | null) => {
    if (!firebaseUser?.email) {
      clearSession();
      return false;
    }
    const token = await firebaseUser.getIdToken();

    if (!token) {
      clearSession();
      return false;
    }
    if (!localStorage.getItem("authToken")) {
      localStorage.setItem("authToken", token);
    }

    const convertedUser = await convertFirebaseUser(firebaseUser);
    setUser(convertedUser);
    setLoading(false);
    return convertedUser;
  };

  const register = async ({ email, password }: IAuthRequest) => {
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (user) {
        await configureSession(user);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await configureSession(user);
      navigate(DefaultRoutes.APP_ROOT);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      await configureSession(user);
      navigate(DefaultRoutes.APP_ROOT);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      await configureSession(null);
      navigate(DefaultRoutes.LOGIN);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      const cancel = auth.onIdTokenChanged(configureSession);
      return () => cancel();
    } else {
      setLoading(false);
    }
  }, []);

  const authContextValue: AuthContextType = {
    user,
    isLoading,
    register,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
