
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Sample bill requests data
const initialBillRequests = [
  { 
    id: 'REQ-1001', 
    amount: 2450, 
    dueDate: '2025-06-01', 
    description: 'Monthly Electricity Bill - May 2025',
    status: 'pending',
    createdAt: '2025-05-15'
  },
  { 
    id: 'REQ-1002', 
    amount: 1820, 
    dueDate: '2025-06-05', 
    description: 'Electricity Consumption - April Excess',
    status: 'pending',
    createdAt: '2025-05-16'
  },
  { 
    id: 'REQ-1003', 
    amount: 3250, 
    dueDate: '2025-05-20', 
    description: 'Quarterly Maintenance Fee',
    status: 'pending',
    createdAt: '2025-05-10'
  }
];

const PaymentRequests = () => {
  const [billRequests, setBillRequests] = useState(initialBillRequests);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePayNow = (requestId: string, amount: number) => {
    // In a real app, this would navigate to the payment page
    navigate(`/bills/payment?requestId=${requestId}&amount=${amount}`);
  };

  const handleIgnore = (requestId: string) => {
    if (window.confirm('Are you sure you want to ignore this payment request?')) {
      // In a real app, this would update the request status in the database
      setBillRequests(billRequests.filter(request => request.id !== requestId));
      
      toast({
        title: "Request Ignored",
        description: `Payment request ${requestId} has been removed from your list.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Requests</h1>
        <p className="text-muted-foreground">
          View and manage pending payment requests from your electricity provider
        </p>
      </div>
      
      <Card className="card-glass">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-semibold text-gradient">Pending Requests</CardTitle>
              <CardDescription>Payment requests that need your attention</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {billRequests.length > 0 ? (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-secondary/50">
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billRequests.map((request) => {
                    const dueDate = new Date(request.dueDate);
                    const today = new Date();
                    const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    const isUrgent = daysLeft <= 3;
                    
                    return (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          <div>
                            {request.description}
                            <div className="text-xs text-muted-foreground">
                              Request ID: {request.id}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold">₹{request.amount.toLocaleString('en-IN')}</TableCell>
                        <TableCell>
                          <div>
                            {new Date(request.dueDate).toLocaleDateString('en-IN')}
                            {isUrgent && (
                              <Badge variant="outline" className="ml-2 bg-destructive/20 text-destructive">
                                {daysLeft <= 0 ? 'Overdue' : `Due in ${daysLeft} days`}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className="bg-yellow-500/20 text-yellow-500"
                          >
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              onClick={() => handlePayNow(request.id, request.amount)}
                            >
                              Pay Now
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleIgnore(request.id)}
                            >
                              Ignore
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No pending payment requests</p>
              <Button onClick={() => navigate('/bills')}>View My Bills</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentRequests;
