
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BillCard from '@/components/bills/BillCard';

// Sample data with INR currency
const sampleBills = [
  {
    id: 'BILL-1001',
    amount: 8795,
    dueDate: '2023-05-21',
    status: 'pending',
    billingPeriod: 'April 2023'
  },
  {
    id: 'BILL-1000',
    amount: 7650,
    dueDate: '2023-04-20',
    status: 'paid',
    billingPeriod: 'March 2023'
  },
  {
    id: 'BILL-999',
    amount: 9250,
    dueDate: '2023-03-22',
    status: 'paid',
    billingPeriod: 'February 2023'
  },
  {
    id: 'BILL-998',
    amount: 10120,
    dueDate: '2023-02-20',
    status: 'paid',
    billingPeriod: 'January 2023'
  },
  {
    id: 'BILL-997',
    amount: 8335,
    dueDate: '2023-01-22',
    status: 'paid',
    billingPeriod: 'December 2022'
  },
  {
    id: 'BILL-996',
    amount: 7190,
    dueDate: '2022-12-20',
    status: 'paid',
    billingPeriod: 'November 2022'
  }
];

const Bills = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredBills = sampleBills.filter(bill => {
    if (filter === 'all') return true;
    if (filter === 'pending') return bill.status === 'pending';
    if (filter === 'paid') return bill.status === 'paid';
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Bills</h1>
        <p className="text-muted-foreground">
          View and manage all your electricity bills
        </p>
      </div>
      
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Billing History</CardTitle>
          <CardDescription>View and pay your electricity bills</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setFilter}>
            <TabsList className="w-full sm:w-auto mb-6">
              <TabsTrigger value="all">All Bills</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
            </TabsList>
            
            <TabsContent value={filter}>
              {filteredBills.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBills.map(bill => (
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
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No bills found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bills;
