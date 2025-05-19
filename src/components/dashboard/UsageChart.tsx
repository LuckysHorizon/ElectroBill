
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateMonthlyData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => {
    // Generate a semi-random usage pattern that peaks in summer
    const summerPeak = index >= 4 && index <= 7;
    const baseUsage = 80 + Math.random() * 40;
    const seasonalFactor = summerPeak ? 1.5 : 1;
    
    return {
      month,
      usage: Math.round(baseUsage * seasonalFactor),
      average: 100
    };
  });
};

const UsageChart = () => {
  const data = generateMonthlyData();

  return (
    <Card className="card-glass card-hover">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Electricity Usage (kWh)</CardTitle>
        <CardDescription>Your monthly electricity consumption</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4361EE" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4361EE" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="averageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F72585" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F72585" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 41, 59, 0.9)', 
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="usage" 
                stroke="#4361EE" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#usageGradient)" 
              />
              <Area 
                type="monotone" 
                dataKey="average" 
                stroke="#F72585" 
                strokeDasharray="5 5"
                strokeWidth={2}
                fillOpacity={0} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageChart;
