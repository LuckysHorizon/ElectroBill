
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { List, ArrowRight } from 'lucide-react';

// List of electricity providers in India
const providers = [
  { id: 'tsspdcl', name: 'Telangana State Southern Power Distribution Company Ltd. (TSSPDCL)', region: 'Telangana' },
  { id: 'tgnpdcl', name: 'Telangana State Northern Power Distribution Company Ltd. (TGNPDCL)', region: 'Telangana' },
  { id: 'apspdcl', name: 'Andhra Pradesh Southern Power Distribution Company Ltd. (APSPDCL)', region: 'Andhra Pradesh' },
  { id: 'apcpdcl', name: 'Andhra Pradesh Central Power Distribution Company Ltd. (APCPDCL)', region: 'Andhra Pradesh' },
  { id: 'bescom', name: 'Bangalore Electricity Supply Company (BESCOM)', region: 'Karnataka' },
  { id: 'tneb', name: 'Tamil Nadu Electricity Board (TNEB)', region: 'Tamil Nadu' },
  { id: 'kseb', name: 'Kerala State Electricity Board (KSEB)', region: 'Kerala' },
  { id: 'msedcl', name: 'Maharashtra State Electricity Distribution Co. Ltd. (MSEDCL)', region: 'Maharashtra' },
  { id: 'best', name: 'Brihanmumbai Electric Supply & Transport (BEST)', region: 'Maharashtra' },
  { id: 'torrent', name: 'Torrent Power', region: 'Gujarat/UP' },
  { id: 'bses-rajdhani', name: 'BSES Rajdhani Power Limited', region: 'Delhi' },
  { id: 'bses-yamuna', name: 'BSES Yamuna Power Limited', region: 'Delhi' },
  { id: 'tata-power', name: 'Tata Power', region: 'Delhi/Mumbai' },
  { id: 'cesc', name: 'Calcutta Electric Supply Corporation (CESC)', region: 'West Bengal' },
  { id: 'wbsedcl', name: 'West Bengal State Electricity Distribution Company Ltd. (WBSEDCL)', region: 'West Bengal' },
  { id: 'pspcl', name: 'Punjab State Power Corporation Limited (PSPCL)', region: 'Punjab' },
  { id: 'dhbvn', name: 'Dakshin Haryana Bijli Vitran Nigam (DHBVN)', region: 'Haryana' },
  { id: 'jvvnl', name: 'Jaipur Vidyut Vitran Nigam Limited (JVVNL)', region: 'Rajasthan' },
  { id: 'uppcl', name: 'Uttar Pradesh Power Corporation Ltd. (UPPCL)', region: 'Uttar Pradesh' },
  { id: 'nbpdcl', name: 'North Bihar Power Distribution Company Limited (NBPDCL)', region: 'Bihar' },
];

const ElectricityProviders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    provider.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProviderSelect = (providerId: string) => {
    navigate(`/service-number/${providerId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Electricity Providers</h1>
        <p className="text-muted-foreground">
          Select your electricity provider to proceed with bill payment
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search by provider name or region..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-secondary/50 pl-10"
          />
          <List className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProviders.map(provider => (
          <Card key={provider.id} className="card-glass card-hover overflow-hidden transition-all duration-300">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full h-full text-left flex justify-between items-center p-4"
                onClick={() => handleProviderSelect(provider.id)}
              >
                <div>
                  <h3 className="font-medium">{provider.name}</h3>
                  <p className="text-sm text-muted-foreground">{provider.region}</p>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No electricity providers found matching your search.</p>
        </div>
      )}

      <div className="bg-secondary/30 p-4 rounded-lg mt-6">
        <h3 className="font-medium mb-2">About BBPS</h3>
        <p className="text-sm text-muted-foreground">
          Bharat Bill Payment System (BBPS) is a unified bill payment platform that offers interoperable bill payment services to customers. 
          It facilitates payment of electricity, telecom, DTH, gas, water bills, etc.
        </p>
      </div>
    </div>
  );
};

export default ElectricityProviders;
