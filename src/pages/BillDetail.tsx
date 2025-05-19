
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Zap } from 'lucide-react';
import PaymentForm from '@/components/bills/PaymentForm';

// Sample data
const sampleBills = [
  {
    id: 'BILL-1001',
    amount: 124.80,
    dueDate: '2023-05-21',
    status: 'pending',
    billingPeriod: 'April 2023',
    usage: 145,
    breakdown: [
      { item: 'Energy Charge', amount: 87.00 },
      { item: 'Demand Charge', amount: 22.50 },
      { item: 'Service Fee', amount: 9.99 },
      { item: 'Taxes', amount: 5.31 }
    ]
  },
  {
    id: 'BILL-1000',
    amount: 118.50,
    dueDate: '2023-04-20',
    status: 'paid',
    billingPeriod: 'March 2023',
    usage: 128,
    breakdown: [
      { item: 'Energy Charge', amount: 76.80 },
      { item: 'Demand Charge', amount: 20.00 },
      { item: 'Service Fee', amount: 9.99 },
      { item: 'Taxes', amount: 11.71 }
    ]
  }
];

const BillDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bill, setBill] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  
  useEffect(() => {
    const foundBill = sampleBills.find(b => b.id === id);
    
    if (foundBill) {
      setBill(foundBill);
    } else {
      navigate('/bills', { replace: true });
    }
  }, [id, navigate]);
  
  if (!bill) return null;
  
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(bill.amount);
  
  const handleDownloadPDF = () => {
    alert('In a real application, this would download a PDF of the bill.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bill #{id}</h1>
          <p className="text-muted-foreground">
            Billing period: {bill.billingPeriod}
          </p>
        </div>
      </div>
      
      {!showPayment ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-glass">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Bill Summary</CardTitle>
                  <Badge
                    className={
                      bill.status === 'paid'
                        ? 'bg-green-500/20 text-green-500'
                        : bill.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-destructive/20 text-destructive'
                    }
                    variant="outline"
                  >
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription>Details of your electricity bill</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Amount Due</p>
                      <p className="text-3xl font-bold text-gradient">{formattedAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="text-xl font-medium">
                        {new Date(bill.dueDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 py-2">
                    <Zap className="h-5 w-5 text-electric-blue" />
                    <span>Usage: {bill.usage} kWh</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={handleDownloadPDF}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                {bill.status !== 'paid' && (
                  <Button onClick={() => setShowPayment(true)}>
                    Pay Now
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Bill Breakdown</CardTitle>
                <CardDescription>Detailed charges for this billing period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bill.breakdown.map((item: { item: string; amount: number }, index: number) => (
                    <div key={index} className="flex justify-between pb-2 border-b border-muted/50 last:border-0">
                      <span>{item.item}</span>
                      <span>${item.amount.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 font-semibold">
                    <span>Total</span>
                    <span>{formattedAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Customer Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer ID</p>
                    <p className="font-medium">CUST-1001</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Meter Number</p>
                    <p className="font-medium">EM12345678</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Service Address</p>
                    <p className="font-medium">123 Electric Avenue, City</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Billing Address</p>
                    <p className="font-medium">123 Electric Avenue, City</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Payment History</CardTitle>
                <CardDescription>Recent transactions for this bill</CardDescription>
              </CardHeader>
              <CardContent>
                {bill.status === 'paid' ? (
                  <div className="space-y-3">
                    <div className="flex justify-between pb-2 border-b border-muted/50">
                      <div>
                        <p className="font-medium">Payment Received</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(bill.dueDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <p className="font-medium text-green-500">${bill.amount.toFixed(2)}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center py-3 text-muted-foreground">
                    No payments made for this bill yet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <PaymentForm billId={bill.id} amount={bill.amount} />
      )}
    </div>
  );
};

export default BillDetail;
