import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Zap, Leaf, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const reportData = [
  { id: "RPT-001", date: "2026-03-15", machine: "Mixer A", batch: "B-1042", energyUsed: 2340, savings: 18.2, efficiency: 92.4 },
  { id: "RPT-002", date: "2026-03-14", machine: "Reactor B", batch: "B-1043", energyUsed: 3120, savings: 14.7, efficiency: 88.1 },
  { id: "RPT-003", date: "2026-03-13", machine: "Dryer C", batch: "B-1044", energyUsed: 1870, savings: 21.3, efficiency: 94.7 },
  { id: "RPT-004", date: "2026-03-12", machine: "Compressor D", batch: "B-1045", energyUsed: 2680, savings: 16.1, efficiency: 90.3 },
  { id: "RPT-005", date: "2026-03-11", machine: "Pump E", batch: "B-1046", energyUsed: 1540, savings: 12.8, efficiency: 86.9 },
];

const Reports = () => {
  const [dateFrom, setDateFrom] = useState("2026-03-01");
  const [dateTo, setDateTo] = useState("2026-03-21");
  const [machineFilter, setMachineFilter] = useState("all");

  const filtered = reportData.filter((r) => machineFilter === "all" || r.machine === machineFilter);
  const totalEnergy = filtered.reduce((s, r) => s + r.energyUsed, 0);
  const avgSavings = filtered.length ? (filtered.reduce((s, r) => s + r.savings, 0) / filtered.length).toFixed(1) : "0";
  const avgEfficiency = filtered.length ? (filtered.reduce((s, r) => s + r.efficiency, 0) / filtered.length).toFixed(1) : "0";

  const machines = [...new Set(reportData.map((r) => r.machine))];

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground">Generate & download energy reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.success("PDF report generated")}>
            <FileText className="h-4 w-4" /> Export PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.success("CSV report downloaded")}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="card-shine border-border animate-fade-up [animation-delay:100ms]">
        <CardContent className="flex flex-wrap items-end gap-4 pt-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">From</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
              className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">To</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
              className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Machine</label>
            <select value={machineFilter} onChange={(e) => setMachineFilter(e.target.value)}
              className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground outline-none">
              <option value="all">All Machines</option>
              {machines.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-up [animation-delay:200ms]">
        <Card className="card-shine border-border">
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Energy Used</p>
              <p className="text-xl font-bold text-foreground tabular-nums">{totalEnergy.toLocaleString()} kWh</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-shine border-border">
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Savings</p>
              <p className="text-xl font-bold text-foreground tabular-nums">{avgSavings}%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-shine border-border">
          <CardContent className="flex items-center gap-3 pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Efficiency</p>
              <p className="text-xl font-bold text-foreground tabular-nums">{avgEfficiency}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="card-shine border-border animate-fade-up [animation-delay:300ms]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3">Report ID</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Machine</th>
                  <th className="px-5 py-3">Batch</th>
                  <th className="px-5 py-3">Energy (kWh)</th>
                  <th className="px-5 py-3">Savings</th>
                  <th className="px-5 py-3">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-border/50 transition-colors hover:bg-secondary/40">
                    <td className="px-5 py-3 font-mono font-medium text-foreground">{r.id}</td>
                    <td className="px-5 py-3 text-muted-foreground">{r.date}</td>
                    <td className="px-5 py-3 text-muted-foreground">{r.machine}</td>
                    <td className="px-5 py-3 font-mono text-muted-foreground">{r.batch}</td>
                    <td className="px-5 py-3 tabular-nums text-foreground">{r.energyUsed.toLocaleString()}</td>
                    <td className="px-5 py-3 font-semibold text-primary tabular-nums">{r.savings}%</td>
                    <td className="px-5 py-3 tabular-nums text-foreground">{r.efficiency}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
