import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { DefaultRoutes } from "./routes";
import { Header } from "@/components/header";
import { RequireAuth } from "@/components/require-auth";

const AuthPage = lazy(() => import("../pages/auth"));
const HomePage = lazy(() => import("../pages/home"));
const NewAssetPage = lazy(() => import("../pages/new-asset"));
const ProfilePage = lazy(() => import("../pages/profile"));
const WalletPage = lazy(() => import("../pages/wallet"));

const Navigation = () => {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<Header />}>
          <Route path={DefaultRoutes.APP_ROOT} element={<HomePage />} index />
          <Route path={DefaultRoutes.NEW_ASSET} element={<NewAssetPage />} />
          <Route path={DefaultRoutes.PROFILE} element={<ProfilePage />} index />
          <Route path={DefaultRoutes.WALLET} element={<WalletPage />} />
        </Route>
      </Route>
      <Route path={DefaultRoutes.LOGIN} element={<AuthPage />} />
    </Routes>
  );
};

export default Navigation;
