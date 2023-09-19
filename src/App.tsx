import { Loader } from "@damaris-ui/core";
import { defaultTheme as theme } from "@damaris-ui/theme";
import { Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navigation from "./routes";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Investment Management</title>
        <link href={theme.fonts.defaultFontFamily} rel="stylesheet" />
      </Helmet>
      <Suspense fallback={<Loader />}>
        <Navigation />
      </Suspense>
    </HelmetProvider>
  );
}

export default App;
