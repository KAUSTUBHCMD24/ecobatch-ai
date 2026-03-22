import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const weeklyData = [
  { day: "Mon", consumption: 1820, optimized: 1540 },
  { day: "Tue", consumption: 2100, optimized: 1720 },
  { day: "Wed", consumption: 1950, optimized: 1610 },
  { day: "Thu", consumption: 2300, optimized: 1830 },
  { day: "Fri", consumption: 2150, optimized: 1790 },
  { day: "Sat", consumption: 1400, optimized: 1200 },
  { day: "Sun", consumption: 1100, optimized: 950 },
];

const monthlyData = [
  { month: "Jan", consumption: 48200, optimized: 41500 },
  { month: "Feb", consumption: 45100, optimized: 38200 },
  { month: "Mar", consumption: 51300, optimized: 42100 },
  { month: "Apr", consumption: 47800, optimized: 39600 },
  { month: "May", consumption: 52100, optimized: 43200 },
  { month: "Jun", consumption: 49700, optimized: 40800 },
];

const machineData = [
  { machine: "Mixer A", usage: 3200 },
  { machine: "Reactor B", usage: 4100 },
  { machine: "Dryer C", usage: 2800 },
  { machine: "Compressor D", usage: 3600 },
  { machine: "Pump E", usage: 1900 },
];

const distributionData = [
  { name: "Heating", value: 35, color: "hsl(152 60% 48%)" },
  { name: "Mixing", value: 25, color: "hsl(152 80% 62%)" },
  { name: "Cooling", value: 20, color: "hsl(38 92% 50%)" },
  { name: "Transport", value: 12, color: "hsl(220 14% 40%)" },
  { name: "Other", value: 8, color: "hsl(220 14% 28%)" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-foreground">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-xs" style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString()} kWh
        </p>
      ))}
    </div>
  );
};

const Analytics = () => {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const trendData = period === "weekly" ? weeklyData : monthlyData;
  const xKey = period === "weekly" ? "day" : "month";

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">Energy consumption trends & insights</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" /> Download Insights
        </Button>
      </div>

      {/* Trend Chart */}
      <Card className="card-shine border-border animate-fade-up [animation-delay:100ms]">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold">Energy Consumption Trends</CardTitle>
          <div className="flex gap-1 rounded-lg bg-secondary p-0.5">
            {(["weekly", "monthly"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  period === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(220 14% 40%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(220 14% 40%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(152 60% 48%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(152 60% 48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 14%)" />
                <XAxis dataKey={xKey} tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="consumption" name="Before AI" stroke="hsl(220 14% 40%)" fill="url(#colorConsumption)" strokeWidth={2} />
                <Area type="monotone" dataKey="optimized" name="After AI" stroke="hsl(152 60% 48%)" fill="url(#colorOptimized)" strokeWidth={2} className="glow-line" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Machine-wise Bar */}
        <Card className="card-shine border-border animate-fade-up [animation-delay:200ms]">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Machine-wise Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={machineData} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 14%)" />
                  <XAxis dataKey="machine" tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="usage" name="Usage" fill="hsl(152 60% 48%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Energy Distribution Pie */}
        <Card className="card-shine border-border animate-fade-up [animation-delay:300ms]">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Energy Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {distributionData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Before vs After Comparison */}
      <Card className="card-shine border-border animate-fade-up [animation-delay:400ms]">
        <CardHeader className="flex flex-row items-center gap-3">
          <CardTitle className="text-sm font-semibold">Before vs After AI Optimization</CardTitle>
          <div className="flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-0.5">
            <TrendingDown className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">17.2% avg reduction</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {monthlyData.map((m) => {
              const saving = ((1 - m.optimized / m.consumption) * 100).toFixed(1);
              return (
                <div key={m.month} className="rounded-lg bg-secondary p-3 text-center">
                  <p className="text-xs text-muted-foreground">{m.month}</p>
                  <p className="mt-1 text-lg font-bold text-foreground tabular-nums">{saving}%</p>
                  <p className="text-[10px] text-primary">saved</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
