import { useGsapPageLoad } from "@/hooks/useGsapPageLoad";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { MetricCards } from "@/components/dashboard/MetricCards";
import { StatsBar } from "@/components/dashboard/StatsBar";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { DeliveryHealth } from "@/components/dashboard/DeliveryHealth";
import { RecentPurchases } from "@/components/dashboard/RecentPurchases";
import { SubscriptionCard } from "@/components/dashboard/SubscriptionCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { UnlockingSoon } from "@/components/dashboard/UnlockingSoon";

export default function DealerDashboard() {
  // Initialize GSAP animations
  useGsapPageLoad();

  return (
    <div className="max-w-[1600px] mx-auto w-full">
      <WelcomeHeader />
      <MetricCards />
      <StatsBar />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-7 xl:col-span-8">
          <SpendingChart />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <DeliveryHealth />
        </div>
      </div>

      <RecentPurchases />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <SubscriptionCard />
        <QuickActions />
      </div>

      <UnlockingSoon />
    </div>
  );
}
