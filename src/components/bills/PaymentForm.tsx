
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, CheckCircle, QrCode, Smartphone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PaymentFormProps {
  billId: string;
  amount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ billId, amount }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `Your payment of ₹${amount.toFixed(2)} has been processed.`,
        action: (
          <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        ),
      });
      
      setProcessing(false);
      navigate('/bills', { replace: true });
    }, 2000);
  };

  return (
    <Card className="card-glass w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gradient">Payment Details</CardTitle>
        <CardDescription>Complete your payment for Bill #{billId}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Payment Amount</Label>
              <div className="text-2xl font-bold">₹{amount.toFixed(2)}</div>
            </div>
            
            <div className="space-y-2">
              <Label>Select Payment Method</Label>
              <Tabs defaultValue="card" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="upi">UPI</TabsTrigger>
                  <TabsTrigger value="qr">QR Code</TabsTrigger>
                </TabsList>
                
                <TabsContent value="card" className="space-y-4 mt-4">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="credit-card"
                        id="credit-card"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="credit-card"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-secondary/50 p-4 hover:bg-secondary/80 hover:border-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <CreditCard className="mb-2 h-5 w-5" />
                        Credit Card
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="debit-card"
                        id="debit-card"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="debit-card"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-secondary/50 p-4 hover:bg-secondary/80 hover:border-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <CreditCard className="mb-2 h-5 w-5" />
                        Debit Card
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        name="number"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={handleInputChange}
                        className="bg-secondary/50"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input
                        id="card-name"
                        name="name"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={handleInputChange}
                        className="bg-secondary/50"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-expiry">Expiry Date</Label>
                        <Input
                          id="card-expiry"
                          name="expiry"
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={handleInputChange}
                          className="bg-secondary/50"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-cvv">CVV</Label>
                        <Input
                          id="card-cvv"
                          name="cvv"
                          type="password"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={handleInputChange}
                          className="bg-secondary/50"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="upi" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="upi-id">UPI ID</Label>
                    <Input
                      id="upi-id"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="bg-secondary/50"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Enter your UPI ID (e.g., name@bank)</p>
                  </div>
                  <div className="flex items-center justify-center py-4">
                    <Smartphone className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    You will receive a payment request notification on your UPI app
                  </p>
                </TabsContent>
                
                <TabsContent value="qr" className="space-y-4 mt-4">
                  <div className="flex flex-col items-center justify-center py-6">
                    <QrCode className="h-32 w-32 text-muted-foreground" />
                    <p className="mt-4 text-sm text-center text-muted-foreground">
                      Open any UPI app and scan this QR code to pay
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <CardFooter className="flex justify-between mt-6 px-0">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={processing}
            >
              {processing ? 'Processing...' : `Pay ₹${amount.toFixed(2)}`}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
