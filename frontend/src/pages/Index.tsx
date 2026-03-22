import { DashboardNavbar } from "@/components/DashboardNavbar";
import { KPICards } from "@/components/KPICards";
import { EnergyChart } from "@/components/EnergyChart";
import { BatchTable } from "@/components/BatchTable";
import { AIInsights } from "@/components/AIInsights";
import { ControlPanel } from "@/components/ControlPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="animate-fade-up">
          <KPICards />
        </div>

        <div className="animate-fade-up [animation-delay:100ms]">
          <EnergyChart />
        </div>

        <div className="animate-fade-up [animation-delay:200ms]">
          <BatchTable />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="animate-fade-up lg:col-span-3 [animation-delay:300ms]">
            <AIInsights />
          </div>
          <div className="animate-fade-up lg:col-span-2 [animation-delay:400ms]">
            <ControlPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
