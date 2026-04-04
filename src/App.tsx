import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { PlatformSettingsProvider } from "@/hooks/usePlatformSettings";

// Guards
import { RequireAuth, RequireApproved, RequireAdmin, PublicOnly, RequireProvider, RequireNormalUser, RequireBuyer } from "@/components/AuthGuards";

// Layouts
import { DealerLayout } from "@/components/DealerLayout";
import { AdminLayout } from "@/components/AdminLayout";
import { ProviderLayout } from "@/components/ProviderLayout";
import { NormalUserLayout } from "@/components/NormalUserLayout";

// Shared Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";

// Dealer Pages
import PendingApproval from "./pages/PendingApproval";
import Rejected from "./pages/Rejected";
import Suspended from "./pages/Suspended";
import UpgradePlan from "./pages/UpgradePlan";
import RoleBasedDashboard from "./components/RoleBasedDashboard";
import Wallet from "./pages/Wallet";
import Purchases from "./pages/Purchases";
import Settings from "./pages/Settings";
import AutoPay from "./pages/AutoPay";

// Provider Pages
import ProviderPendingApproval from "./pages/provider/ProviderPendingApproval";
import ProviderRejected from "./pages/provider/ProviderRejected";
import ProviderSuspended from "./pages/provider/ProviderSuspended";
import ProviderLeads from "./pages/provider/ProviderLeads";
import ProviderAddLead from "./pages/provider/ProviderAddLead";
import ProviderEarnings from "./pages/provider/ProviderEarnings";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import ProviderSettings from "./pages/provider/ProviderSettings";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminLeadReview from "./pages/admin/AdminLeadReview";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminAddLead from "./pages/admin/AdminAddLead";
import AdminProviderPayouts from "./pages/admin/AdminProviderPayouts";
import AdminDeliveryLogs from "./pages/admin/AdminDeliveryLogs";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <PlatformSettingsProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
              <Route path="/register" element={<PublicOnly><Register /></PublicOnly>} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* DEALER ROUTES */}
              <Route path="/pending-approval" element={<RequireAuth><PendingApproval /></RequireAuth>} />
              <Route path="/rejected" element={<RequireAuth><Rejected /></RequireAuth>} />
              <Route path="/suspended" element={<RequireAuth><Suspended /></RequireAuth>} />
              <Route path="/marketplace" element={<RequireAuth><RequireBuyer><DealerLayout><Marketplace /></DealerLayout></RequireBuyer></RequireAuth>} />
              <Route path="/dashboard" element={<RequireAuth><RoleBasedDashboard /></RequireAuth>} />
              <Route path="/upgrade-plan" element={<RequireAuth><RequireApproved><DealerLayout><UpgradePlan /></DealerLayout></RequireApproved></RequireAuth>} />
              <Route path="/wallet" element={<RequireAuth><RequireApproved><DealerLayout><Wallet /></DealerLayout></RequireApproved></RequireAuth>} />
              <Route path="/purchases" element={<RequireAuth><RequireApproved><DealerLayout><Purchases /></DealerLayout></RequireApproved></RequireAuth>} />
              <Route path="/settings" element={<RequireAuth><RequireApproved><DealerLayout><Settings /></DealerLayout></RequireApproved></RequireAuth>} />
              <Route path="/auto-pay" element={<RequireAuth><RequireApproved><DealerLayout><AutoPay /></DealerLayout></RequireApproved></RequireAuth>} />

              {/* NORMAL USER ROUTES */}
              <Route path="/individual/marketplace" element={<RequireAuth><RequireNormalUser><NormalUserLayout><Marketplace /></NormalUserLayout></RequireNormalUser></RequireAuth>} />
              <Route path="/individual/wallet" element={<RequireAuth><RequireNormalUser><NormalUserLayout><Wallet /></NormalUserLayout></RequireNormalUser></RequireAuth>} />
              <Route path="/individual/purchases" element={<RequireAuth><RequireNormalUser><NormalUserLayout><Purchases /></NormalUserLayout></RequireNormalUser></RequireAuth>} />
              <Route path="/individual/settings" element={<RequireAuth><RequireNormalUser><NormalUserLayout><Settings /></NormalUserLayout></RequireNormalUser></RequireAuth>} />

              {/* PROVIDER ROUTES */}
              <Route path="/provider/pending" element={<RequireAuth><RequireProvider><ProviderPendingApproval /></RequireProvider></RequireAuth>} />
              <Route path="/provider/rejected" element={<RequireAuth><RequireProvider><ProviderRejected /></RequireProvider></RequireAuth>} />
              <Route path="/provider/suspended" element={<RequireAuth><RequireProvider><ProviderSuspended /></RequireProvider></RequireAuth>} />
              
              <Route path="/provider" element={<RequireAuth><RequireProvider><ProviderLayout><ProviderDashboard /></ProviderLayout></RequireProvider></RequireAuth>} />
              <Route path="/provider/leads" element={<RequireAuth><RequireProvider><ProviderLayout><ProviderLeads /></ProviderLayout></RequireProvider></RequireAuth>} />
              <Route path="/provider/leads/new" element={<RequireAuth><RequireProvider><ProviderLayout><ProviderAddLead /></ProviderLayout></RequireProvider></RequireAuth>} />
              <Route path="/provider/earnings" element={<RequireAuth><RequireProvider><ProviderLayout><ProviderEarnings /></ProviderLayout></RequireProvider></RequireAuth>} />
              <Route path="/provider/settings" element={<RequireAuth><RequireProvider><ProviderLayout><ProviderSettings /></ProviderLayout></RequireProvider></RequireAuth>} />

              {/* ADMIN ROUTES */}
              <Route path="/admin" element={<RequireAuth><RequireAdmin><AdminLayout><AdminDashboard /></AdminLayout></RequireAdmin></RequireAuth>} />
              <Route path="/admin/users" element={<RequireAuth><RequireAdmin><AdminLayout><AdminUsers /></AdminLayout></RequireAdmin></RequireAuth>} />
              <Route path="/admin/leads/review" element={<RequireAuth><RequireAdmin><AdminLayout><AdminLeadReview /></AdminLayout></RequireAdmin></RequireAuth>} />
              <Route path="/admin/leads" element={<RequireAuth><RequireAdmin><AdminLayout><AdminLeads /></AdminLayout></RequireAdmin></RequireAuth>} />
              <Route path="/admin/leads/new" element={<RequireAuth><RequireAdmin><AdminLayout><AdminAddLead /></AdminLayout></RequireAdmin></RequireAuth>} />
              <Route path="/admin/payouts" element={<RequireAuth><RequireAdmin><AdminLayout><AdminProviderPayouts /></AdminLayout></RequireAdmin></RequireAuth>} />
              <Route path="/admin/delivery-logs" element={<RequireAuth><RequireAdmin><AdminLayout><AdminDeliveryLogs /></AdminLayout></RequireAdmin></RequireAuth>} />
              <Route path="/admin/settings" element={<RequireAuth><RequireAdmin><AdminLayout><AdminSettings /></AdminLayout></RequireAdmin></RequireAuth>} />

              {/* Redirects */}
              <Route path="/" element={<Landing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </PlatformSettingsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
