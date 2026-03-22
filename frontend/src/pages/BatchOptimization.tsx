import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Sparkles, CheckCircle2, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Batch {
  id: string;
  machine: string;
  currentTemp: string;
  currentSpeed: string;
  recTemp: string;
  recSpeed: string;
  recDuration: string;
  savings: number;
  status: "Applied" | "Pending";
}

const initialBatches: Batch[] = [
  { id: "B-1042", machine: "Mixer A", currentTemp: "78°C", currentSpeed: "1400 RPM", recTemp: "72°C", recSpeed: "1200 RPM", recDuration: "45 min", savings: 18, status: "Applied" },
  { id: "B-1043", machine: "Reactor B", currentTemp: "85°C", currentSpeed: "1600 RPM", recTemp: "68°C", recSpeed: "1100 RPM", recDuration: "50 min", savings: 14, status: "Applied" },
  { id: "B-1044", machine: "Dryer C", currentTemp: "90°C", currentSpeed: "1500 RPM", recTemp: "75°C", recSpeed: "1350 RPM", recDuration: "38 min", savings: 21, status: "Pending" },
  { id: "B-1045", machine: "Compressor D", currentTemp: "82°C", currentSpeed: "1300 RPM", recTemp: "70°C", recSpeed: "1250 RPM", recDuration: "42 min", savings: 16, status: "Pending" },
  { id: "B-1046", machine: "Pump E", currentTemp: "73°C", currentSpeed: "1150 RPM", recTemp: "65°C", recSpeed: "1000 RPM", recDuration: "55 min", savings: 12, status: "Applied" },
  { id: "B-1047", machine: "Mixer A", currentTemp: "80°C", currentSpeed: "1450 RPM", recTemp: "71°C", recSpeed: "1180 RPM", recDuration: "48 min", savings: 19, status: "Pending" },
  { id: "B-1048", machine: "Reactor B", currentTemp: "88°C", currentSpeed: "1550 RPM", recTemp: "74°C", recSpeed: "1280 RPM", recDuration: "40 min", savings: 23, status: "Pending" },
];

const BatchOptimization = () => {
  const [batches, setBatches] = useState(initialBatches);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "Applied" | "Pending">("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // New batch form state
  const [newBatch, setNewBatch] = useState({
    id: `B-${Math.floor(1000 + Math.random() * 9000)}`,
    machine: "",
    currentTemp: "",
    currentSpeed: "",
  });

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatch.machine || !newBatch.currentTemp || !newBatch.currentSpeed) {
      toast.error("Please fill in all fields");
      return;
    }

    const tempVal = parseInt(newBatch.currentTemp);
    const speedVal = parseInt(newBatch.currentSpeed);

    const batchToAdd: Batch = {
      ...newBatch,
      currentTemp: `${tempVal}°C`,
      currentSpeed: `${speedVal} RPM`,
      recTemp: `${tempVal - 5}°C`,
      recSpeed: `${speedVal - 200} RPM`,
      recDuration: "45 min",
      savings: Math.floor(Math.random() * 15) + 5,
      status: "Pending",
    };

    setBatches([batchToAdd, ...batches]);
    toast.success(`Batch ${batchToAdd.id} added successfully`);
    setIsDialogOpen(false);
    
    // Reset form
    setNewBatch({
      id: `B-${Math.floor(1000 + Math.random() * 9000)}`,
      machine: "",
      currentTemp: "",
      currentSpeed: "",
    });
  };

  const filtered = batches.filter((b) => {
    const matchSearch = b.id.toLowerCase().includes(search.toLowerCase()) || b.machine.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleApply = (id: string) => {
    setBatches((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Applied" as const } : b)));
    toast.success(`Optimization applied to ${id}`);
  };

  const handleApplyAll = () => {
    setBatches((prev) => prev.map((b) => ({ ...b, status: "Applied" as const })));
    toast.success("All optimizations applied");
  };

  const pendingCount = batches.filter((b) => b.status === "Pending").length;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Batch Optimization</h1>
          <p className="text-sm text-muted-foreground">{pendingCount} pending optimizations</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" /> New Batch
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleAddBatch}>
                <DialogHeader>
                  <DialogTitle>Add New Batch</DialogTitle>
                  <DialogDescription>
                    Enter the current machine parameters to generate AI optimizations.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="id" className="text-right">ID</Label>
                    <Input id="id" value={newBatch.id} disabled className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="machine" className="text-right">Machine</Label>
                    <Input 
                      id="machine" 
                      placeholder="e.g. Mixer A" 
                      className="col-span-3"
                      value={newBatch.machine}
                      onChange={(e) => setNewBatch({...newBatch, machine: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="temp" className="text-right">Temp (°C)</Label>
                    <Input 
                      id="temp" 
                      placeholder="e.g. 80" 
                      type="number"
                      className="col-span-3"
                      value={newBatch.currentTemp.replace("°C", "")}
                      onChange={(e) => setNewBatch({...newBatch, currentTemp: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="speed" className="text-right">Speed (RPM)</Label>
                    <Input 
                      id="speed" 
                      placeholder="e.g. 1400" 
                      type="number"
                      className="col-span-3"
                      value={newBatch.currentSpeed.replace(" RPM", "")}
                      onChange={(e) => setNewBatch({...newBatch, currentSpeed: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Batch</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button variant="glow" className="gap-2" onClick={handleApplyAll} disabled={pendingCount === 0}>
            <Sparkles className="h-4 w-4" /> Apply All Pending
          </Button>
        </div>
      </div>

      <Card className="card-shine border-border animate-fade-up [animation-delay:100ms]">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-3 pb-4">
          <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 flex-1">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search batch ID or machine…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
            />
          </div>
          <div className="flex gap-1 rounded-lg bg-secondary p-0.5">
            {(["all", "Pending", "Applied"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  filterStatus === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s === "all" ? "All" : s}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3">Batch ID</th>
                  <th className="px-5 py-3">Machine</th>
                  <th className="px-5 py-3">Current Settings</th>
                  <th className="px-5 py-3">Recommended</th>
                  <th className="px-5 py-3">Savings</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-b border-border/50 transition-colors hover:bg-secondary/40">
                    <td className="px-5 py-3 font-mono font-medium text-foreground">{b.id}</td>
                    <td className="px-5 py-3 text-muted-foreground">{b.machine}</td>
                    <td className="px-5 py-3 text-muted-foreground text-xs">
                      {b.currentTemp} · {b.currentSpeed}
                    </td>
                    <td className="px-5 py-3 text-xs">
                      <span className="text-primary">{b.recTemp}</span> · <span className="text-primary">{b.recSpeed}</span> · {b.recDuration}
                    </td>
                    <td className="px-5 py-3 font-semibold text-primary tabular-nums">{b.savings}%</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        b.status === "Applied" ? "bg-primary/15 text-primary" : "bg-warning/15 text-warning"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {b.status === "Pending" ? (
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5" onClick={() => handleApply(b.id)}>
                          <CheckCircle2 className="h-3 w-3" /> Apply
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">Done</span>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-muted-foreground">No batches found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatchOptimization;
