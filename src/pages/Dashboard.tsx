
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Zap, AlertTriangle, User, Meter } from 'lucide-react';
import UsageChart from '@/components/dashboard/UsageChart';
import UsageSummary from '@/components/dashboard/UsageSummary';
import BillCard from '@/components/bills/BillCard';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

// Sample data
const bills = [
  {
    id: 'BILL-1001',
    amount: 8795,
    dueDate: '2025-05-21',
    status: 'pending',
    billingPeriod: 'April 2025'
  },
  {
    id: 'BILL-1000',
    amount: 7650,
    dueDate: '2025-04-20',
    status: 'paid',
    billingPeriod: 'March 2025'
  }
];

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 'NOT-1001',
    title: 'May bill is ready',
    message: 'Your May 2025 electricity bill is now available. Due date: May 21, 2025.',
    date: '2025-05-01',
    type: 'info',
    read: false
  },
  {
    id: 'NOT-1000',
    title: 'Payment confirmation',
    message: 'Your payment of $118.50 for April bill has been successfully processed.',
    date: '2025-04-20',
    type: 'success',
    read: true
  },
  {
    id: 'NOT-999',
    title: 'Usage alert',
    message: 'Your electricity usage is 15% higher than last month. Check your dashboard for details.',
    date: '2025-04-15',
    type: 'warning',
    read: false
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  if (!user) return null;

  const userName = profile?.full_name || user.email?.split('@')[0] || 'User';
  const meterNumber = profile?.meter_number || 'Not configured';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}</h1>
        <p className="text-muted-foreground">
          View your electricity usage and manage your bills
        </p>
      </div>
      
      {/* User Profile Summary */}
      <Card className="card-glass animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Account Information</CardTitle>
          <CardDescription>Your personal and account details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{profile?.full_name || 'Not configured'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5 rounded-full bg-electric-blue/20 p-1">
                <Meter className="h-4 w-4 text-electric-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Meter Number</p>
                <p className="font-medium">{meterNumber}</p>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate('/profile')}>
            Edit Profile
            <User className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="glass">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Current Bill */}
          <Card className="card-glass card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Current Bill</CardTitle>
              <CardDescription>Your latest bill information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-gradient">₹{bills[0].amount.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Billing Period: {bills[0].billingPeriod}</p>
                  <div className="flex items-center mt-2">
                    <Zap className="h-4 w-4 text-muted-foreground mr-1" />
                    <p className="text-sm">145 kWh consumed</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="text-xl font-medium">
                    {new Date(bills[0].dueDate).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                  <Button 
                    className="mt-4"
                    onClick={() => navigate(`/bills/${bills[0].id}`)}
                  >
                    Pay Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Usage Summary */}
          <UsageSummary />
          
          {/* Recent Bills */}
          <Card className="card-glass">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-semibold">Recent Bills</CardTitle>
                  <CardDescription>Your recent billing history</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/bills')}>
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bills.map(bill => (
                  <BillCard 
                    key={bill.id}
                    id={bill.id}
                    amount={bill.amount}
                    dueDate={bill.dueDate}
                    status={bill.status as any}
                    billingPeriod={bill.billingPeriod}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="usage" className="space-y-6">
          <UsageChart />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-glass card-hover md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Energy Saving Tips</CardTitle>
                <CardDescription>Ways to reduce your electricity consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-green-500/20 p-1">
                      <Zap className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Use energy-efficient appliances</p>
                      <p className="text-sm text-muted-foreground">Replace old appliances with energy-efficient models that consume less electricity.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-green-500/20 p-1">
                      <Zap className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Optimize your thermostat</p>
                      <p className="text-sm text-muted-foreground">Keep your thermostat at an energy-efficient temperature to reduce HVAC usage.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-green-500/20 p-1">
                      <Zap className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Unplug devices when not in use</p>
                      <p className="text-sm text-muted-foreground">Many devices consume power even when not actively used (phantom power).</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="card-glass card-hover">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Meter Information</CardTitle>
                <CardDescription>Your electricity meter details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Meter Number</p>
                  <p className="font-medium">EM12345678</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Meter Type</p>
                  <p className="font-medium">Smart Meter</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Reading</p>
                  <p className="font-medium">May 1, 2023</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Reading</p>
                  <p className="font-medium">June 1, 2023</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
              <CardDescription>Recent alerts and messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-4 rounded-lg border ${!notification.read ? 'bg-secondary/50' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-2 
                        ${notification.type === 'info' ? 'bg-electric-blue/20 text-electric-blue' : 
                          notification.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-green-500/20 text-green-500'}`}
                      >
                        {notification.type === 'info' && <FileText className="h-5 w-5" />}
                        {notification.type === 'warning' && <AlertTriangle className="h-5 w-5" />}
                        {notification.type === 'success' && <div className="h-5 w-5 text-green-500">✓</div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {new Date(notification.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
