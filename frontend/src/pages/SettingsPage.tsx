import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Moon, Sun, Key, Save } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [criticalOnly, setCriticalOnly] = useState(false);

  // Profile State
  const [profile, setProfile] = useState(() => {
    let name = "Arjun Kapoor";
    let email = "arjun@ecobatch.ai";
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.name) name = user.name;
    } catch(e) {}
    return { name, email };
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated successfully!");
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account & preferences</p>
      </div>

      {/* Profile */}
      <Card className="card-shine border-border animate-fade-up [animation-delay:100ms]">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
            <User className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-sm font-semibold">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Full Name</label>
              <input 
                value={profile.name} 
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-all" 
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Email</label>
              <input 
                value={profile.email} 
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary transition-all" 
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Role</label>
              <input defaultValue="Plant Manager" disabled className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-muted-foreground outline-none cursor-not-allowed" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Organization</label>
              <input defaultValue="EcoBatch Industries" disabled className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-muted-foreground outline-none cursor-not-allowed" />
            </div>
          </div>
          <Button size="sm" className="gap-2 transition-all mt-4" onClick={handleSaveProfile} disabled={isSaving}>
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="card-shine border-border animate-fade-up [animation-delay:200ms]">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-sm font-semibold">Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Email Notifications", desc: "Receive alerts via email", value: emailNotif, set: setEmailNotif },
            { label: "Push Notifications", desc: "Browser push notifications", value: pushNotif, set: setPushNotif },
            { label: "Critical Alerts Only", desc: "Only notify for critical severity", value: criticalOnly, set: setCriticalOnly },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch checked={item.value} onCheckedChange={item.set} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="card-shine border-border animate-fade-up [animation-delay:300ms]">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
            {darkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
          </div>
          <CardTitle className="text-sm font-semibold">Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Toggle between light and dark theme</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div>
        </CardContent>
      </Card>

      {/* API */}
      <Card className="card-shine border-border animate-fade-up [animation-delay:400ms]">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-sm font-semibold">API Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">API Key</label>
            <div className="flex gap-2">
              <input defaultValue="sk-eco-••••••••••••••••" disabled className="flex-1 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm font-mono text-muted-foreground outline-none" />
              <Button variant="outline" size="sm" onClick={() => toast.success("API key copied")}>Copy</Button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Webhook URL</label>
            <input defaultValue="https://api.ecobatch.ai/webhook/v1" className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
