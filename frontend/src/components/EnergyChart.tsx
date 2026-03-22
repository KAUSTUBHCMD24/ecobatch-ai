import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const data = [
  { time: "00:00", usage: 320, optimized: 280 },
  { time: "02:00", usage: 280, optimized: 250 },
  { time: "04:00", usage: 240, optimized: 210 },
  { time: "06:00", usage: 350, optimized: 290 },
  { time: "08:00", usage: 480, optimized: 380 },
  { time: "10:00", usage: 520, optimized: 410 },
  { time: "12:00", usage: 490, optimized: 390 },
  { time: "14:00", usage: 530, optimized: 420 },
  { time: "16:00", usage: 470, optimized: 370 },
  { time: "18:00", usage: 410, optimized: 340 },
  { time: "20:00", usage: 360, optimized: 310 },
  { time: "22:00", usage: 310, optimized: 270 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
      <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {entry.value} kWh
        </p>
      ))}
    </div>
  );
};

export function EnergyChart() {
  return (
    <div className="card-shine rounded-xl border border-border p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Energy Usage vs Time</h3>
          <p className="text-xs text-muted-foreground">Real-time monitoring — last 24 hours</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-muted-foreground" />
            Actual
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Optimized
          </span>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="greenGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(152, 60%, 48%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(152, 60%, 48%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="hsl(220, 14%, 14%)" strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }}
              axisLine={{ stroke: "hsl(220, 14%, 16%)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }}
              axisLine={{ stroke: "hsl(220, 14%, 16%)" }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="usage"
              stroke="hsl(220, 10%, 45%)"
              strokeWidth={2}
              fill="transparent"
              name="Actual"
            />
            <Area
              type="monotone"
              dataKey="optimized"
              stroke="hsl(152, 60%, 48%)"
              strokeWidth={2.5}
              fill="url(#greenGlow)"
              name="Optimized"
              className="glow-line"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
