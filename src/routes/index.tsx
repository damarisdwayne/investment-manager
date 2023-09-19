import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultRoutes } from "./routes";
import { lazy } from "react";
const HomePage = lazy(() => import("../pages/home"));

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={DefaultRoutes.APP_ROOT} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
