
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BillProps {
  id: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  billingPeriod: string;
}

const BillCard: React.FC<BillProps> = ({ id, amount, dueDate, status, billingPeriod }) => {
  const navigate = useNavigate();
  
  const statusColor = {
    paid: 'bg-green-500/20 text-green-500',
    pending: 'bg-yellow-500/20 text-yellow-500',
    overdue: 'bg-destructive/20 text-destructive'
  };

  const statusIcon = {
    paid: <Check className="h-3 w-3" />,
    pending: <CalendarCheck className="h-3 w-3" />,
    overdue: <AlertTriangle className="h-3 w-3" />
  };

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);

  return (
    <Card className="card-glass card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Bill #{id}</CardTitle>
          <Badge className={`${statusColor[status]}`} variant="outline">
            <span className="flex items-center gap-1">
              {statusIcon[status]}
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1">
          <div className="text-3xl font-bold text-gradient">{formattedAmount}</div>
          <p className="text-sm text-muted-foreground">For {billingPeriod}</p>
          <p className="text-sm mt-2">
            <span className="text-muted-foreground">Due Date: </span>
            <span className={status === 'overdue' ? 'text-destructive font-medium' : ''}>
              {new Date(dueDate).toLocaleDateString('en-IN', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate(`/bills/${id}`)}
          disabled={status === 'paid'}
        >
          {status === 'paid' 
            ? 'Paid' 
            : status === 'pending' 
              ? 'Pay Now' 
              : 'Pay Overdue Bill'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BillCard;
