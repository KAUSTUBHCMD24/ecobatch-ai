import { AlertTriangle, Lightbulb, CheckCircle, TrendingDown } from "lucide-react";

const insights = [
  {
    type: "warning" as const,
    icon: AlertTriangle,
    title: "High energy usage detected",
    description: "Line 3 is consuming 23% more than baseline during peak hours.",
    time: "12 min ago",
  },
  {
    type: "suggestion" as const,
    icon: Lightbulb,
    title: "Optimization recommended",
    description: "Reducing speed to 1100 RPM on Batch #1044 could save an additional 5%.",
    time: "34 min ago",
  },
  {
    type: "success" as const,
    icon: CheckCircle,
    title: "Batch #1042 optimized",
    description: "Settings applied successfully. 18% energy reduction achieved.",
    time: "1h ago",
  },
  {
    type: "info" as const,
    icon: TrendingDown,
    title: "Off-peak scheduling available",
    description: "Shift non-critical batches to 22:00–06:00 window for lower rates.",
    time: "2h ago",
  },
];

const colorMap = {
  warning: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20" },
  suggestion: { bg: "bg-amber-400/10", text: "text-amber-400", border: "border-amber-400/20" },
  success: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
  info: { bg: "bg-blue-400/10", text: "text-blue-400", border: "border-blue-400/20" },
};

export function AIInsights() {
  return (
    <div className="card-shine rounded-xl border border-border p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">AI Insights</h3>
        <p className="text-xs text-muted-foreground">Real-time alerts and recommendations</p>
      </div>
      <div className="space-y-3">
        {insights.map((item, i) => {
          const colors = colorMap[item.type];
          return (
            <div
              key={i}
              className={`flex gap-3 rounded-lg border ${colors.border} ${colors.bg} p-3 transition-colors`}
            >
              <div className="mt-0.5 shrink-0">
                <item.icon className={`h-4 w-4 ${colors.text}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground/60">
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
