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

  const handleGoogleAuth = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Google Auth would typically redirect to a provider or use a library
    // For now, we'll keep the mock but acknowledge the backend exists
    setTimeout(() => {
      setIsLoading(false);
      toast.success(isLogin ? "Successfully logged in with Google!" : "Successfully signed up with Google!");
      navigate("/");
    }, 1500);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
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
            <Button 
              variant="outline" 
              className="w-full relative h-12 transition-all duration-300 hover:bg-secondary/80 border-border/50 text-foreground"
              onClick={handleGoogleAuth}
              disabled={isLoading}
            >
              <svg 
                className="w-5 h-5 absolute left-4" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {isLoading ? "Connecting..." : `Continue with Google`}
            </Button>

            <div className="relative flex items-center py-2">
              <span className="w-full border-t border-border" />
              <span className="absolute left-1/2 -translate-x-1/2 bg-card/60 px-2 text-xs text-muted-foreground uppercase">
                Or continue with email
              </span>
            </div>

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
