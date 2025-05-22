
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, Mail as MailIcon, Info } from 'lucide-react';

const ContactDeveloper = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-center">About the Developer</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Card className="card-glass w-full overflow-hidden">
            <CardContent className="p-0">
              <img 
                src="/lovable-uploads/cab5506a-c50f-43ef-87a5-31b0fbe9ea30.png" 
                alt="Manikanta Boda" 
                className="w-full object-cover"
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-center space-x-4 mt-6">
            <Button variant="outline" size="icon">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Button>
            <Button variant="outline" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <Card className="card-glass h-full">
            <CardHeader>
              <CardTitle className="text-gradient">Manikanta Boda</CardTitle>
              <CardDescription>Aspiring Computer Science Engineer</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium text-lg">About</h3>
                <p className="text-muted-foreground">
                  Skilled in Web Development, GitHub, Flutter & AWS | B. Tech student at IARE | 
                  Passionate about learning, innovation, and building impactful solutions.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Education</h3>
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">INSTITUTE OF AERONAUTICAL ENGINEERING</p>
                    <p className="text-muted-foreground">Hyderabad, Telangana, India</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Contact</h3>
                <div className="flex items-center gap-2">
                  <MailIcon className="h-5 w-5 text-muted-foreground" />
                  <span>contact@manikantaboda.com</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Project: ElectroBill</h3>
                <p className="text-muted-foreground">
                  ElectroBill is a modern electricity bill payment system that simplifies the process of 
                  managing and paying electricity bills online. Built with React, Tailwind CSS, and 
                  Supabase for authentication and data storage.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactDeveloper;
