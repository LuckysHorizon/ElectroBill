
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      // Demo credentials
      if (email === 'demo@example.com' && password === 'password') {
        toast({
          title: "Successfully logged in",
          description: "Welcome back to your dashboard!",
        });
        
        // Store user info in localStorage for demo purposes
        localStorage.setItem('user', JSON.stringify({ 
          email, 
          name: 'Demo User',
          role: 'user',
          customerId: 'CUST-1001'
        }));
        
        navigate('/dashboard');
      } else if (email === 'admin@example.com' && password === 'admin') {
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard!",
        });
        
        localStorage.setItem('user', JSON.stringify({ 
          email, 
          name: 'Admin User',
          role: 'admin'
        }));
        
        navigate('/admin');
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md card-glass animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gradient">Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@example.com"
              required
              className="bg-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a 
                href="#" 
                className="text-xs text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  toast({
                    description: "Password reset functionality would be implemented in production.",
                  });
                }}
              >
                Forgot password?
              </a>
            </div>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-secondary/50"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          <p>Demo credentials:</p>
          <p>User: demo@example.com / password</p>
          <p>Admin: admin@example.com / admin</p>
        </div>
        <div className="text-sm text-center">
          Don't have an account?{" "}
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
            className="text-primary font-medium hover:underline"
          >
            Register
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
