import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Zap, Mail, Lock, ArrowRight, User as UserIcon } from "lucide-react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const body = isLogin ? { email, password } : { name, email, password };
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.name, id: data.userId }));

      toast.success(isLogin ? `Welcome back, ${data.name}!` : "Account created successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[35%] h-[40%] rounded-full bg-blue-500/20 blur-[100px]" />
      </div>

      <div className="z-10 w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20 shadow-lg shadow-primary/5">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">EcoBatch AI</h1>
          <p className="text-muted-foreground mt-2 text-center">
            Smart Energy & Process Optimization
          </p>
        </div>

        <Card className="border-white/10 bg-card/60 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              {isLogin ? "Sign in" : "Create an account"}
            </CardTitle>
            <CardDescription className="text-sm">
              {isLogin ? "Choose your preferred sign in method" : "Enter your details to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2 relative">
                  <Label htmlFor="name" className="sr-only">Full Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="John Doe" 
                      type="text" 
                      className="pl-10 h-11 bg-secondary/50 border-transparent focus:border-primary transition-all"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2 relative">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="email" 
                    name="email" 
                    placeholder="name@example.com" 
                    type="email" 
                    autoCapitalize="none" 
                    autoComplete="email" 
                    autoCorrect="off" 
                    className="pl-10 h-11 bg-secondary/50 border-transparent focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="password" className="sr-only">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    type="password" 
                    className="pl-10 h-11 bg-secondary/50 border-transparent focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 font-medium transition-transform active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Sign Up"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground pt-4 pb-6">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button 
                onClick={toggleAuthMode}
                className="font-semibold text-primary hover:underline underline-offset-4 bg-transparent border-none p-0 cursor-pointer"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
            <p className="px-4 text-xs text-muted-foreground/60 leading-relaxed mt-4">
              By clicking continue, you agree to our{" "}
              <a href="#" className="underline underline-offset-4 hover:text-primary">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
