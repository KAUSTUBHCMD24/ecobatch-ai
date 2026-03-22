import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, CheckCircle, Clock, Eye } from "lucide-react";
import { toast } from "sonner";

interface Alert {
  id: string;
  type: "critical" | "warning" | "normal";
  title: string;
  description: string;
  timestamp: string;
  acknowledged: boolean;
}

const initialAlerts: Alert[] = [
  { id: "ALT-001", type: "critical", title: "High energy consumption detected", description: "Reactor B exceeding threshold by 34% — immediate action recommended.", timestamp: "2 min ago", acknowledged: false },
  { id: "ALT-002", type: "warning", title: "System inefficiency on Dryer C", description: "Operating at 72% efficiency. AI suggests reducing temperature by 8°C.", timestamp: "15 min ago", acknowledged: false },
  { id: "ALT-003", type: "critical", title: "Maintenance overdue — Compressor D", description: "Scheduled maintenance 3 days overdue. Performance degrading.", timestamp: "1 hr ago", acknowledged: false },
  { id: "ALT-004", type: "warning", title: "Batch B-1047 duration exceeding estimate", description: "Running 12 min longer than AI-predicted duration.", timestamp: "2 hrs ago", acknowledged: true },
  { id: "ALT-005", type: "normal", title: "Optimization applied — Mixer A", description: "Energy savings of 18% confirmed after AI parameter adjustment.", timestamp: "3 hrs ago", acknowledged: true },
  { id: "ALT-006", type: "normal", title: "All systems within normal range", description: "No anomalies detected in the last monitoring cycle.", timestamp: "5 hrs ago", acknowledged: true },
  { id: "ALT-007", type: "warning", title: "Pump E vibration levels elevated", description: "Vibration 15% above baseline. Monitor closely.", timestamp: "6 hrs ago", acknowledged: false },
];

const severityConfig = {
  critical: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/15", label: "Critical" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/15", label: "Warning" },
  normal: { icon: CheckCircle, color: "text-primary", bg: "bg-primary/15", label: "Normal" },
};

const Alerts = () => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "normal">("all");

  const filtered = alerts.filter((a) => filter === "all" || a.type === filter);

  const acknowledge = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
    toast.success("Alert acknowledged");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alerts</h1>
          <p className="text-sm text-muted-foreground">
            {alerts.filter((a) => !a.acknowledged).length} unacknowledged alerts
          </p>
        </div>
        <div className="flex gap-1 rounded-lg bg-secondary p-0.5">
          {(["all", "critical", "warning", "normal"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((alert, i) => {
          const config = severityConfig[alert.type];
          const Icon = config.icon;
          return (
            <Card
              key={alert.id}
              className={`card-shine border-border animate-fade-up transition-all hover:border-border/80`}
              style={{ animationDelay: `${(i + 1) * 60}ms` }}
            >
              <CardContent className="flex items-start gap-4 py-4">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${config.bg} ${config.color}`}>
                      {config.label}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {alert.timestamp}
                    </span>
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-foreground">{alert.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{alert.description}</p>
                </div>
                <div className="shrink-0">
                  {!alert.acknowledged ? (
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5" onClick={() => acknowledge(alert.id)}>
                      <Eye className="h-3 w-3" /> Acknowledge
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">Acknowledged</span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;
