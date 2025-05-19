
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, CreditCard, FileText, ArrowUp, ArrowDown } from 'lucide-react';

// Sample data
const revenueData = [
  { month: 'Jan', revenue: 15840 },
  { month: 'Feb', revenue: 16920 },
  { month: 'Mar', revenue: 18450 },
  { month: 'Apr', revenue: 17680 },
  { month: 'May', revenue: 19750 },
  { month: 'Jun', revenue: 22300 },
  { month: 'Jul', revenue: 25100 },
  { month: 'Aug', revenue: 23800 },
  { month: 'Sep', revenue: 21400 },
  { month: 'Oct', revenue: 19600 },
  { month: 'Nov', revenue: 18200 },
  { month: 'Dec', revenue: 17500 },
];

const Admin = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          System overview and key metrics
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-glass card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">2,856</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  5.2% from last month
                </div>
              </div>
              <div className="rounded-full bg-electric-blue/20 p-2">
                <Users className="h-5 w-5 text-electric-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-glass card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">$216,450</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  8.7% from last month
                </div>
              </div>
              <div className="rounded-full bg-electric-purple/20 p-2">
                <CreditCard className="h-5 w-5 text-electric-purple" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-glass card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">456</div>
                <div className="flex items-center text-xs text-destructive">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  2.3% from last month
                </div>
              </div>
              <div className="rounded-full bg-destructive/20 p-2">
                <FileText className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-glass card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">142 kWh</div>
                <div className="flex items-center text-xs text-red-500">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  1.8% from last month
                </div>
              </div>
              <div className="rounded-full bg-electric-teal/20 p-2">
                <FileText className="h-5 w-5 text-electric-teal" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="card-glass card-hover lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Monthly Revenue</CardTitle>
            <CardDescription>Revenue from electricity bills in the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
                  <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip
                    formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Revenue']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="url(#barGradient)" 
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4361EE" stopOpacity={1} />
                      <stop offset="100%" stopColor="#7209B7" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-glass card-hover">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">System Status</CardTitle>
            <CardDescription>Current DevOps metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Server Uptime</span>
                  <span className="font-medium">99.98%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[99.98%]"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CI/CD Pipeline</span>
                  <span className="font-medium">Operational</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-electric-blue w-full"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Database Load</span>
                  <span className="font-medium">42%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-electric-purple w-[42%]"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">API Response Time</span>
                  <span className="font-medium">187ms</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-electric-teal w-[30%]"></div>
                </div>
              </div>
              
              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Recent Deployments</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">v2.4.1</span>
                    <span className="text-green-500">Successful</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">v2.4.0</span>
                    <span className="text-green-500">Successful</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">v2.3.9</span>
                    <span className="text-green-500">Successful</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
