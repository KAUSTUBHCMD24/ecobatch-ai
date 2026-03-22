import { Zap, TrendingUp, Leaf, Activity } from "lucide-react";

const kpis = [
  {
    title: "Total Energy Consumption",
    value: "12,450",
    unit: "kWh",
    change: "-3.2% from last week",
    changeType: "positive" as const,
    icon: Zap,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-400/10",
  },
  {
    title: "Energy Savings",
    value: "15%",
    unit: "range 10–20%",
    change: "+2.4% improvement",
    changeType: "positive" as const,
    icon: TrendingUp,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    title: "Carbon Emissions Reduction",
    value: "2.3",
    unit: "tons CO₂",
    change: "On track for quarterly goal",
    changeType: "positive" as const,
    icon: Leaf,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-400/10",
  },
  {
    title: "Active Batch Status",
    value: "Running",
    unit: "Optimizing",
    change: "Batch #1047 in progress",
    changeType: "neutral" as const,
    icon: Activity,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    hasStatusDot: true,
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi, i) => (
        <div
          key={kpi.title}
          className="card-shine group relative overflow-hidden rounded-xl border border-border p-5 transition-all duration-300 hover:border-primary/30 hover:glow-green"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {kpi.title}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-foreground">
                  {kpi.value}
                </span>
                <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                {kpi.hasStatusDot && (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                  </span>
                )}
              </div>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${kpi.iconBg}`}>
              <kpi.icon className={`h-5 w-5 ${kpi.iconColor}`} />
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{kpi.change}</p>
        </div>
      ))}
    </div>
  );
}
