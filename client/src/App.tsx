import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Popular from "@/pages/popular";
import Featured from "@/pages/featured";
import Recent from "@/pages/recent";
import SpinWheel from "@/pages/spin-wheel";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/popular" component={Popular} />
      <Route path="/featured" component={Featured} />
      <Route path="/recent" component={Recent} />
      <Route path="/spin-wheel" component={SpinWheel} />
      <Route path="/category/:category" component={Home} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;