import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { DefaultRoutes } from "./routes";
import { Header } from "@/components/header";
import { RequireAuth } from "@/components/require-auth";
const HomePage = lazy(() => import("../pages/home"));
const NewAssetPage = lazy(() => import("../pages/new-asset"));
const AuthPage = lazy(() => import("../pages/auth"));
const WalletPage = lazy(() => import("../pages/wallet"));

const Navigation = () => {
  const hasHeader = window.location.pathname !== DefaultRoutes.LOGIN;
  return (
    <>
      {hasHeader && <Header />}
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path={DefaultRoutes.APP_ROOT} element={<HomePage />} />
          <Route path={DefaultRoutes.NEW_ASSET} element={<NewAssetPage />} />
          <Route path={DefaultRoutes.WALLET} element={<WalletPage />} />
        </Route>
        <Route path={DefaultRoutes.LOGIN} element={<AuthPage />} />
      </Routes>
    </>
  );
};

export default Navigation;
