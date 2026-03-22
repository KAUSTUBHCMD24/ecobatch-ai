const batches = [
  { id: "B-1042", temp: "72°C", speed: "1200 RPM", duration: "45 min", savings: "18%", status: "Applied" },
  { id: "B-1043", temp: "68°C", speed: "1100 RPM", duration: "50 min", savings: "14%", status: "Applied" },
  { id: "B-1044", temp: "75°C", speed: "1350 RPM", duration: "38 min", savings: "21%", status: "Pending" },
  { id: "B-1045", temp: "70°C", speed: "1250 RPM", duration: "42 min", savings: "16%", status: "Pending" },
  { id: "B-1046", temp: "65°C", speed: "1000 RPM", duration: "55 min", savings: "12%", status: "Applied" },
];

export function BatchTable() {
  return (
    <div className="card-shine overflow-hidden rounded-xl border border-border">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">Batch Optimization Suggestions</h3>
        <p className="text-xs text-muted-foreground">AI-recommended settings for active batches</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3">Batch ID</th>
              <th className="px-5 py-3">Temperature</th>
              <th className="px-5 py-3">Speed</th>
              <th className="px-5 py-3">Duration</th>
              <th className="px-5 py-3">Savings</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((b) => (
              <tr
                key={b.id}
                className="border-b border-border/50 transition-colors hover:bg-secondary/40"
              >
                <td className="px-5 py-3 font-mono font-medium text-foreground">{b.id}</td>
                <td className="px-5 py-3 text-muted-foreground">{b.temp}</td>
                <td className="px-5 py-3 text-muted-foreground">{b.speed}</td>
                <td className="px-5 py-3 text-muted-foreground">{b.duration}</td>
                <td className="px-5 py-3 font-semibold text-primary">{b.savings}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      b.status === "Applied"
                        ? "bg-primary/15 text-primary"
                        : "bg-warning/15 text-warning"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
