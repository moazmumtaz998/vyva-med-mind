import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pill, Bell, Shield, Clock, Heart, Users } from "lucide-react";
import heroImage from "@/assets/medication-hero.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light to-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center lg:text-left space-y-6">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="p-3 bg-medical-blue text-white rounded-full">
                <Pill className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                VYVA Health
              </h1>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Never Miss Your Medication Again
            </h2>
            
            <p className="text-xl text-muted-foreground">
              Smart medication management for seniors living independently. 
              Get timely reminders, track your progress, and keep your loved ones informed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={onGetStarted}
                variant="medical"
                size="lg"
                className="text-lg px-8 py-6"
              >
                <Pill className="h-5 w-5" />
                Get Started
              </Button>
              <Button
                variant="medical-outline"
                size="lg"
                className="text-lg px-8 py-6"
              >
                <Heart className="h-5 w-5" />
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-medical">
              <img
                src={heroImage}
                alt="Senior managing medications with VYVA Health"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/10 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center hover:shadow-medical transition-all duration-300">
            <CardContent className="p-6">
              <div className="p-3 bg-medical-blue/10 text-medical-blue rounded-full w-fit mx-auto mb-4">
                <Bell className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
              <p className="text-muted-foreground">
                Get reminded via phone, email, or WhatsApp when it's time for your medication.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-medical transition-all duration-300">
            <CardContent className="p-6">
              <div className="p-3 bg-medical-green/10 text-medical-green rounded-full w-fit mx-auto mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Caregiver Alerts</h3>
              <p className="text-muted-foreground">
                Automatically notify your loved ones if you miss a dose, ensuring you're never alone.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-medical transition-all duration-300">
            <CardContent className="p-6">
              <div className="p-3 bg-medical-accent/10 text-medical-accent rounded-full w-fit mx-auto mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your medication adherence with detailed reports and insights.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="text-center space-y-8">
          <h3 className="text-3xl font-bold text-foreground">How It Works</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-medical-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                1
              </div>
              <h4 className="text-lg font-semibold">Setup Your Medications</h4>
              <p className="text-muted-foreground">
                Add your medications, dosages, and preferred reminder times during our simple onboarding process.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-medical-green text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                2
              </div>
              <h4 className="text-lg font-semibold">Receive Timely Reminders</h4>
              <p className="text-muted-foreground">
                Get gentle reminders through your preferred communication method when it's time to take your medication.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-medical-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                3
              </div>
              <h4 className="text-lg font-semibold">Stay Connected</h4>
              <p className="text-muted-foreground">
                Keep your caregivers informed automatically, and track your progress with detailed reports.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span>Senior Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Family Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;