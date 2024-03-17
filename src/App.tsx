import { defaultTheme as theme } from "@damaris-ui/theme";
import { Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navigation from "./routes";
import { AuthProvider } from "./context/auth-context";
import { ThemeProvider } from "./context/theme-provider";
import { Loader } from "./components";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Investment Management</title>
        <link href={theme.fonts.defaultFontFamily} rel="stylesheet" />
      </Helmet>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Suspense fallback={<Loader />}>
            <Navigation />
          </Suspense>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
