
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    meterNumber: ''
  });
  const { signUp, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    console.log('Attempting to sign up with:', formData.email, 'and user data:', {
      name: formData.name,
      address: formData.address,
      meterNumber: formData.meterNumber
    });
    
    await signUp(formData.email, formData.password, {
      name: formData.name,
      address: formData.address,
      meterNumber: formData.meterNumber
    });
    
    // The redirect is handled in the signUp function in AuthContext
  };

  return (
    <Card className="w-full max-w-md card-glass animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gradient">Create an Account</CardTitle>
        <CardDescription>Fill out the form below to register for electricity bill payments</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="bg-secondary/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              required
              className="bg-secondary/50"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="bg-secondary/50"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Electric Avenue, City"
              required
              className="bg-secondary/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="meterNumber">Meter Number</Label>
            <Input 
              id="meterNumber" 
              name="meterNumber"
              value={formData.meterNumber}
              onChange={handleChange}
              placeholder="e.g. EM12345678"
              required
              className="bg-secondary/50"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-center">
          Already have an account?{" "}
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
