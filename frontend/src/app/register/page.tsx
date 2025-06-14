
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone } from 'lucide-react';
import { saveUser, UserProfile } from '@/lib/auth';
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobileNumber.trim()) {
      toast({
        title: "Validation Error",
        description: "Name and mobile number cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    // Basic mobile number validation (example: 10 digits)
    if (!/^\d{10}$/.test(mobileNumber.replace(/\s+/g, ''))) {
       toast({
        title: "Validation Error",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const userProfile: UserProfile = { name, mobileNumber };
    saveUser(userProfile);
    
    toast({
      title: "Registration Successful!",
      description: `Welcome, ${name}!`,
    });

    // Simulate API call delay
    setTimeout(() => {
      router.push('/chat');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-center text-primary">Register</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Enter your name and mobile number to start chatting.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-card-foreground">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="name" 
                  type="text"
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-card-foreground">Mobile Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="mobile" 
                  type="tel"
                  placeholder="Enter your 10-digit mobile number" 
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required 
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register & Start Chat'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
