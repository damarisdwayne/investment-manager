import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultRoutes } from "./routes";
import { lazy } from "react";
import Wallet from "../pages/wallet";
import { Header } from "@/components/header";
const HomePage = lazy(() => import("../pages/home"));

const Navigation = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={DefaultRoutes.APP_ROOT} element={<HomePage />} />
        <Route path={DefaultRoutes.WALLET} element={<Wallet />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
