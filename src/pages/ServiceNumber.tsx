
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ArrowRight } from 'lucide-react';

// Map of provider IDs to their display names
const providerNames: Record<string, string> = {
  'tsspdcl': 'Telangana State Southern Power Distribution Company Ltd.',
  'tgnpdcl': 'Telangana State Northern Power Distribution Company Ltd.',
  'apspdcl': 'Andhra Pradesh Southern Power Distribution Company Ltd.',
  'apcpdcl': 'Andhra Pradesh Central Power Distribution Company Ltd.',
  'bescom': 'Bangalore Electricity Supply Company',
  'tneb': 'Tamil Nadu Electricity Board',
  'kseb': 'Kerala State Electricity Board',
  'msedcl': 'Maharashtra State Electricity Distribution Co. Ltd.',
  'best': 'Brihanmumbai Electric Supply & Transport',
  'torrent': 'Torrent Power',
  'bses-rajdhani': 'BSES Rajdhani Power Limited',
  'bses-yamuna': 'BSES Yamuna Power Limited',
  'tata-power': 'Tata Power',
  'cesc': 'Calcutta Electric Supply Corporation',
  'wbsedcl': 'West Bengal State Electricity Distribution Company Ltd.',
  'pspcl': 'Punjab State Power Corporation Limited',
  'dhbvn': 'Dakshin Haryana Bijli Vitran Nigam',
  'jvvnl': 'Jaipur Vidyut Vitran Nigam Limited',
  'uppcl': 'Uttar Pradesh Power Corporation Ltd.',
  'nbpdcl': 'North Bihar Power Distribution Company Limited',
};

const ServiceNumber = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [serviceNumber, setServiceNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const providerName = providerId && providerNames[providerId] ? 
    providerNames[providerId] : 'Electricity Provider';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serviceNumber.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a valid service number',
      });
      return;
    }

    setLoading(true);
    
    // Simulate fetching bill information
    setTimeout(() => {
      setLoading(false);
      navigate('/bills');
      toast({
        title: 'Success',
        description: 'Service number verified successfully',
      });
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="card-glass">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gradient">Service Number Verification</CardTitle>
            <CardDescription>
              Enter your unique service number for {providerName}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service-number">Service Number / Consumer Number</Label>
              <Input
                id="service-number"
                placeholder="e.g., 123456789"
                value={serviceNumber}
                onChange={(e) => setServiceNumber(e.target.value)}
                className="bg-secondary/50"
                required
              />
              <p className="text-xs text-muted-foreground">
                This is typically found on your previous electricity bill or connection document
              </p>
            </div>

            <div className="bg-secondary/30 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Your service number uniquely identifies your electricity connection in the provider's system.
                Make sure to enter it correctly to fetch your bill details.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/electricity-providers')}
            >
              Back
            </Button>
            <Button 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Proceed
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ServiceNumber;
