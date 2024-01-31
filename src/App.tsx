import { defaultTheme as theme } from "@damaris-ui/theme";
import { Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navigation from "./routes";
import { AuthProvider } from "./context/auth-context";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Investment Management</title>
        <link href={theme.fonts.defaultFontFamily} rel="stylesheet" />
      </Helmet>
      <AuthProvider>
        <Suspense fallback={<span>loading...</span>}>
          <Navigation />
        </Suspense>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
