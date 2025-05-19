
import React from 'react';
import { ArrowUp, ArrowDown, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const UsageSummary = () => {
  // Sample data
  const currentMonthUsage = 145;
  const previousMonthUsage = 120;
  const percentChange = ((currentMonthUsage - previousMonthUsage) / previousMonthUsage) * 100;
  const isIncrease = percentChange > 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="card-glass card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Current Month Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Zap className="h-4 w-4 text-electric-blue mr-2" />
            <div className="text-2xl font-bold">{currentMonthUsage} kWh</div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Since {new Date().toLocaleString('default', { month: 'long', day: 'numeric' })}
          </p>
        </CardContent>
      </Card>
      
      <Card className="card-glass card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Previous Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{previousMonthUsage} kWh</div>
          <p className="text-xs text-muted-foreground mt-1">
            Last billing period
          </p>
        </CardContent>
      </Card>
      
      <Card className="card-glass card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Month-to-Month Change</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className={`mr-2 rounded-full p-1 ${isIncrease ? 'bg-destructive/20 text-destructive' : 'bg-green-500/20 text-green-500'}`}>
              {isIncrease ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            </div>
            <div className="text-2xl font-bold">
              {Math.abs(percentChange).toFixed(1)}%
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {isIncrease ? 'Increase' : 'Decrease'} from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageSummary;
