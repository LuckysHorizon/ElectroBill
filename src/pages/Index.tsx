
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, BarChart, Users, GitBranch, Server, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-slide-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Electricity Bill <span className="text-gradient">Payment System</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px]">
                A modern solution for managing and paying your electricity bills with integrated DevOps practices for reliable service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/login')}
                  className="w-full sm:w-auto"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/register')}
                  className="w-full sm:w-auto"
                >
                  Create Account
                </Button>
              </div>
            </div>
            <div className="flex justify-center animate-float">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-electric-blue/30 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-electric-purple/30 rounded-full filter blur-3xl"></div>
                <Card className="glass relative overflow-hidden border border-white/10 shadow-xl">
                  <CardContent className="p-6">
                    <div className="space-y-8">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Bill</p>
                          <h3 className="text-2xl font-bold mt-1">₹1243.80</h3>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-electric-blue/20 flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-electric-blue" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Usage</span>
                          <span>145 kWh</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-electric-blue to-electric-purple w-[65%]"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <p className="text-muted-foreground">Due Date</p>
                          <p className="font-medium">June 21, 2025</p>
                        </div>
                        <Button size="sm">Pay Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Modern Bill Management System</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform simplifies electricity bill payments while leveraging DevOps practices for continuous improvement and reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-glass card-hover border-white/10 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-electric-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DevOps Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powered by DevOps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our system utilizes modern DevOps practices to ensure reliability, scalability, and security.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {devopsFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-16 h-16 rounded-full bg-secondary mb-4 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-electric-purple" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to simplify your bill payments?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of customers who are already enjoying hassle-free electricity bill management.
            </p>
            <Button size="lg" className="animate-pulse-slow" onClick={() => navigate('/register')}>
              Create Your Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-secondary py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-electric-blue flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold">ElectroBill</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ElectroBill Payment System. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: 'Bill Management',
    description: 'View and manage your electricity bills in one centralized dashboard with detailed usage analytics.',
    icon: CreditCard
  },
  {
    title: 'Usage Analytics',
    description: 'Track your electricity consumption with interactive charts and receive insights on how to reduce costs.',
    icon: BarChart
  },
  {
    title: 'Secure Payments',
    description: 'Make secure online payments using various methods and receive instant payment confirmations.',
    icon: Users
  }
];

const devopsFeatures = [
  {
    title: 'CI/CD Pipeline',
    description: 'Continuous integration and deployment ensure reliability and quick updates.',
    icon: GitBranch
  },
  {
    title: 'Containerization',
    description: 'Docker containers for consistent environments across development and production.',
    icon: Server
  },
  {
    title: 'Automated Testing',
    description: 'Rigorous automated testing to ensure high quality and stability.',
    icon: GitBranch
  },
  {
    title: 'Monitoring & Logging',
    description: 'Real-time monitoring and logging for quick issue resolution.',
    icon: Server
  }
];

export default Index;
