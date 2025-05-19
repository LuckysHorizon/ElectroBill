
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { CreditCard } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black to-black/90">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Welcome to <span className="text-gradient">ElectroBill</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in to manage your electricity bills
          </p>
        </div>
        
        <div className="card-glass p-6 rounded-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
