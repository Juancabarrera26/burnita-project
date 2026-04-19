import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ExploreLab from "./pages/ExploreLab";
import SolicitudRecordatorios from "./pages/SolicitudRecordatorios";
import SolicitudEmpresarial from "./pages/SolicitudEmpresarial";
import { useNavigationScroll } from "./hooks/useNavigationScroll";

function Router() {
  // Scroll al top en cada cambio de ruta
  useNavigationScroll();

  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/shop"} component={Shop} />
      <Route path={"/explore-lab"} component={ExploreLab} />
      <Route path={"/solicitud/recordatorios"} component={SolicitudRecordatorios} />
      <Route path={"/solicitud/empresarial"} component={SolicitudEmpresarial} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
