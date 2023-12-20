import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultRoutes } from "./routes";
import { Header } from "@/components/header";
const HomePage = lazy(() => import("../pages/home"));
const WalletPage = lazy(() => import("../pages/wallet"));
const NewAssetPage = lazy(() => import("../pages/new-asset"));

const Navigation = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={DefaultRoutes.APP_ROOT} element={<HomePage />} />
        <Route path={DefaultRoutes.WALLET} element={<WalletPage />} />
        <Route path={DefaultRoutes.NEW_ASSET} element={<NewAssetPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
