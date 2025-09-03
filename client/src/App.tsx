import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Games from "@/pages/games";
import SpinWheel from "@/pages/spin-wheel";
import About from "@/pages/about";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/games" component={Games} />
        <Route path="/spin-wheel" component={SpinWheel} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
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
