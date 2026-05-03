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
import { CartProvider } from "./contexts/CartContext";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Gracias from "./pages/Gracias";
import TerminosYCondiciones from "./pages/TerminosYCondiciones";
import CartPanel from "./components/CartPanel";
import Header from "./components/Header";
import { useState } from "react";

function Router() {
  // Scroll al top en cada cambio de ruta
  useNavigationScroll();

  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/shop"} component={Shop} />
      <Route path={"/product/:id"} component={ProductDetail} />
      <Route path={"/cart"} component={Cart} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/gracias"} component={Gracias} />
      <Route path={"/terminos-y-condiciones"} component={TerminosYCondiciones} />
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
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ErrorBoundary>
      <CartProvider>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Header onCartClick={() => setIsCartOpen(true)} />
            <Router />
            <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </TooltipProvider>
        </ThemeProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
