import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Activity, Target, Zap, TrendingUp, Flame } from "lucide-react";
import { toast } from "sonner";

export function ControlPanel() {
  const [temperature, setTemperature] = useState(72);
  const [speed, setSpeed] = useState(1200);
  const [duration, setDuration] = useState(45);
  const [combustionEnergy, setCombustionEnergy] = useState(850);
  const [optimizing, setOptimizing] = useState(false);
  
  const [results, setResults] = useState<{
    energySaved: number;
    accuracy: number;
    improvements: number;
  } | null>(null);

  const handleOptimize = () => {
    setOptimizing(true);
    setResults(null);
    
    // Simulate AI computing for 2 seconds
    setTimeout(() => {
      // Calculate optimized values (lowering energy load slightly)
      const optimizedTemp = Math.max(50, temperature - Math.floor(Math.random() * 8 + 3));
      const optimizedSpeed = Math.max(500, speed - Math.floor(Math.random() * 250 + 100));
      
      // Slight duration adjustment to compensate for lower intensity
      const optimizedDuration = Math.min(120, duration + Math.floor(Math.random() * 5 + 1));
      
      // Optimize Combustion Energy
      const optimizedCombustion = Math.max(400, combustionEnergy - Math.floor(Math.random() * 120 + 40));
      
      // Calculate metrics based on depth of cuts
      const tempDiff = temperature - optimizedTemp;
      const speedDiff = speed - optimizedSpeed;
      const combustionDiff = combustionEnergy - optimizedCombustion;
      
      const energySaved = Math.max(5, Math.floor((tempDiff * 0.5) + (speedDiff * 0.02) + (combustionDiff * 0.08)));
      const accuracy = (95 + Math.random() * 4.9).toFixed(1);
      const improvements = (2 + Math.random() * 5.5).toFixed(1);

      setTemperature(optimizedTemp);
      setSpeed(optimizedSpeed);
      setDuration(optimizedDuration);
      setCombustionEnergy(optimizedCombustion);
      
      setResults({
        energySaved,
        accuracy: parseFloat(accuracy),
        improvements: parseFloat(improvements)
      });
      setOptimizing(false);

      toast.success("Batch parameters optimized successfully!", {
        description: `Energy reduced by ${energySaved}% with ${accuracy}% AI confidence.`,
        icon: <Activity className="h-4 w-4 text-primary" />
      });
    }, 2000);
  };

  return (
    <div className="card-shine rounded-xl border border-border p-5 bg-card/50 backdrop-blur-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            AI Control Panel
          </h3>
          <p className="text-xs text-muted-foreground mt-1">Adjust and optimize batch parameters for maximum efficiency</p>
        </div>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            Temperature (°C)
          </label>
          <input
            type="range"
            min={50}
            max={100}
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>50°C</span>
            <span className="font-semibold text-foreground">{temperature}°C</span>
            <span>100°C</span>
          </div>
        </div>

        <div>
          <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            Machine Speed (RPM)
          </label>
          <input
            type="range"
            min={500}
            max={2000}
            step={50}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>500</span>
            <span className="font-semibold text-foreground">{speed} RPM</span>
            <span>2000</span>
          </div>
        </div>

        <div>
          <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            Batch Duration (min)
          </label>
          <input
            type="range"
            min={10}
            max={120}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>10</span>
            <span className="font-semibold text-foreground">{duration} min</span>
            <span>120</span>
          </div>
        </div>

        <div>
          <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Flame className="h-3 w-3 text-orange-500" />
            Combustion Energy (MJ)
          </label>
          <input
            type="range"
            min={200}
            max={1500}
            step={10}
            value={combustionEnergy}
            onChange={(e) => setCombustionEnergy(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>200</span>
            <span className="font-semibold text-orange-500">{combustionEnergy} MJ</span>
            <span>1500</span>
          </div>
        </div>

        <Button
          variant="glow"
          className="mt-2 w-full gap-2 py-6 text-sm font-semibold transition-all hover:scale-[1.02]"
          onClick={handleOptimize}
          disabled={optimizing}
        >
          <Sparkles className={`h-5 w-5 ${optimizing ? 'animate-pulse' : ''}`} />
          {optimizing ? "AI is Optimizing Parameters…" : "Optimize with AI"}
        </Button>

        {results && (
          <div className="mt-4 grid grid-cols-3 gap-3 rounded-lg bg-secondary/40 p-3 border border-border/50 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col items-center justify-center p-2 rounded bg-background/50 border border-border/40 shadow-sm">
              <Target className="h-5 w-5 text-blue-500 mb-1" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Accuracy</span>
              <span className="font-bold text-foreground text-sm">{results.accuracy}%</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded bg-background/50 border border-border/40 shadow-sm">
              <Zap className="h-5 w-5 text-yellow-500 mb-1" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Saved</span>
              <span className="font-bold text-green-500 text-sm">{results.energySaved}%</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 rounded bg-background/50 border border-border/40 shadow-sm">
              <TrendingUp className="h-5 w-5 text-emerald-500 mb-1" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Improved</span>
              <span className="font-bold text-emerald-500 text-sm">+{results.improvements}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

