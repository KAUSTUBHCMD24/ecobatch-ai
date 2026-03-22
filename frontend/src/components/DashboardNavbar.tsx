import { Zap, User, BarChart3, FileText, Settings, Leaf } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: BarChart3 },
  { label: "Analytics", icon: BarChart3 },
  { label: "Reports", icon: FileText },
  { label: "Settings", icon: Settings },
];

export function DashboardNavbar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Leaf className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground">
          Eco<span className="text-gradient">Batch</span> AI
        </span>
      </div>

      <nav className="hidden items-center gap-1 md:flex">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150
              ${active === item.label
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground">
          <Zap className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-primary" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
          AK
        </div>
      </div>
    </header>
  );
}
