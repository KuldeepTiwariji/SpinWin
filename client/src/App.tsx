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
import Login from "./pages/login";
import Signup from "./pages/signup";
import Vault from "./pages/wallet";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AdminDashboard from "./pages/admin/dashboard";
import AdminUsers from "./pages/admin/users";
import AdminGames from "./pages/admin/games";
import AdminSpinWheel from "./pages/admin/spin-wheel";
import AdminAnalytics from "./pages/admin/analytics";
import AdminTransactions from "./pages/admin/transactions";
import AdminReports from "./pages/admin/reports";
import AdminNotifications from "./pages/admin/notifications";
import AdminSecurity from "./pages/admin/security";
import AdminSettings from "./pages/admin/settings";
import { AuthProvider } from "@/contexts/auth-context";
import { AdminRouteGuard } from "./components/admin-route-guard";
import Profile from "./pages/profile";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider delayDuration={0}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Switch>
                {/* Admin Routes */}
                <Route path="/admin">
                  <AdminRouteGuard><AdminDashboard /></AdminRouteGuard>
                </Route>
                <Route path="/admin/users">
                  <AdminRouteGuard><AdminUsers /></AdminRouteGuard>
                </Route>
                <Route path="/admin/games">
                  <AdminRouteGuard><AdminGames /></AdminRouteGuard>
                </Route>
                <Route path="/admin/spin-wheel">
                  <AdminRouteGuard><AdminSpinWheel /></AdminRouteGuard>
                </Route>
                <Route path="/admin/transactions">
                  <AdminRouteGuard><AdminTransactions /></AdminRouteGuard>
                </Route>
                <Route path="/admin/analytics">
                  <AdminRouteGuard><AdminAnalytics /></AdminRouteGuard>
                </Route>
                <Route path="/admin/reports">
                  <AdminRouteGuard><AdminReports /></AdminRouteGuard>
                </Route>
                <Route path="/admin/security">
                  <AdminRouteGuard><AdminSecurity /></AdminRouteGuard>
                </Route>
                <Route path="/admin/settings">
                  <AdminRouteGuard><AdminSettings /></AdminRouteGuard>
                </Route>
                <Route path="/admin/notifications">
                  <AdminRouteGuard><AdminNotifications /></AdminRouteGuard>
                </Route>

                {/* User Routes */}
                <Route path="/profile" component={Profile} />

                {/* Regular Routes */}
                <Route path="/" component={Home} />
                <Route path="/games" component={Games} />
                <Route path="/spin-wheel" component={SpinWheel} />
                <Route path="/about" component={About} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/vault" component={Vault} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;