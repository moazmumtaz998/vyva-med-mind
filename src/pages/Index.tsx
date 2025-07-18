import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import MedicationOnboarding from "@/components/MedicationOnboarding";
import MedicationDashboard from "@/components/MedicationDashboard";
import { useToast } from "@/hooks/use-toast";

interface MedicationEntry {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate: string;
}

interface OnboardingData {
  isMedicated: boolean;
  medications: MedicationEntry[];
  caregiverAlerts: boolean;
  caregiverContact: string;
}

type AppState = "hero" | "onboarding" | "dashboard";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("hero");
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const { toast } = useToast();

  // Mock medication data for dashboard demo
  const [medications, setMedications] = useState([
    {
      id: "1",
      name: "Metformin",
      dosage: "500mg",
      frequency: "twice daily",
      times: ["08:00", "20:00"],
      nextDose: "8:00 AM",
      taken: false,
      adherence: 88
    },
    {
      id: "2", 
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "once daily",
      times: ["08:00"],
      nextDose: "8:00 AM",
      taken: true,
      adherence: 95
    },
    {
      id: "3",
      name: "Aspirin",
      dosage: "81mg",
      frequency: "once daily",
      times: ["08:00"],
      nextDose: "8:00 AM",
      taken: false,
      adherence: 92
    }
  ]);

  const handleGetStarted = () => {
    setCurrentState("onboarding");
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    
    // Transform onboarding data into medication format if needed
    if (data.isMedicated && data.medications.length > 0) {
      const transformedMedications = data.medications.map(med => ({
        id: med.id,
        name: med.name,
        dosage: med.dosage,
        frequency: med.frequency,
        times: med.times,
        nextDose: med.times[0] || "8:00 AM",
        taken: false,
        adherence: 100
      }));
      setMedications(transformedMedications);
    }
    
    setCurrentState("dashboard");
    
    toast({
      title: "Setup Complete!",
      description: `Welcome to VYVA Health! ${data.isMedicated ? 'Your medication reminders are now active.' : 'You can add medications anytime.'}`,
    });
  };

  const handleMarkTaken = (id: string) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: true } : med
    ));
    
    const medication = medications.find(med => med.id === id);
    toast({
      title: "Medication Recorded",
      description: `${medication?.name} marked as taken. Great job staying on track!`,
    });
  };

  const handleViewHistory = () => {
    toast({
      title: "Coming Soon",
      description: "Medication history feature will be available soon.",
    });
  };

  const handleAddMedication = () => {
    setCurrentState("onboarding");
  };

  // Render based on current state
  switch (currentState) {
    case "hero":
      return <HeroSection onGetStarted={handleGetStarted} />;
    
    case "onboarding":
      return <MedicationOnboarding onComplete={handleOnboardingComplete} />;
    
    case "dashboard":
      return (
        <MedicationDashboard
          medications={medications}
          onMarkTaken={handleMarkTaken}
          onViewHistory={handleViewHistory}
          onAddMedication={handleAddMedication}
        />
      );
    
    default:
      return <HeroSection onGetStarted={handleGetStarted} />;
  }
};

export default Index;
