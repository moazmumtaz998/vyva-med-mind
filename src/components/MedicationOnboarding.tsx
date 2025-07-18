import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pill, Plus, Trash2, User, Bell, Clock, Calendar } from "lucide-react";
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

interface MedicationOnboardingProps {
  onComplete: (data: {
    isMedicated: boolean;
    medications: MedicationEntry[];
    caregiverAlerts: boolean;
    caregiverContact: string;
  }) => void;
}

const MedicationOnboarding: React.FC<MedicationOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMedicated, setIsMedicated] = useState<boolean | null>(null);
  const [medications, setMedications] = useState<MedicationEntry[]>([]);
  const [caregiverAlerts, setCaregiverAlerts] = useState(false);
  const [caregiverContact, setCaregiverContact] = useState("");
  const { toast } = useToast();

  const addMedication = () => {
    const newMedication: MedicationEntry = {
      id: Date.now().toString(),
      name: "",
      dosage: "",
      frequency: "once daily",
      times: ["08:00"],
      startDate: new Date().toISOString().split('T')[0],
      endDate: ""
    };
    setMedications([...medications, newMedication]);
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const updateMedication = (id: string, field: string, value: string | string[]) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ));
  };

  const addTime = (medicationId: string) => {
    const medication = medications.find(m => m.id === medicationId);
    if (medication) {
      const newTimes = [...medication.times, "12:00"];
      updateMedication(medicationId, "times", newTimes);
    }
  };

  const removeTime = (medicationId: string, timeIndex: number) => {
    const medication = medications.find(m => m.id === medicationId);
    if (medication && medication.times.length > 1) {
      const newTimes = medication.times.filter((_, index) => index !== timeIndex);
      updateMedication(medicationId, "times", newTimes);
    }
  };

  const updateTime = (medicationId: string, timeIndex: number, value: string) => {
    const medication = medications.find(m => m.id === medicationId);
    if (medication) {
      const newTimes = [...medication.times];
      newTimes[timeIndex] = value;
      updateMedication(medicationId, "times", newTimes);
    }
  };

  const handleComplete = () => {
    if (isMedicated && medications.some(med => !med.name || !med.dosage)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all medication details before continuing.",
        variant: "destructive"
      });
      return;
    }

    onComplete({
      isMedicated: isMedicated || false,
      medications: isMedicated ? medications : [],
      caregiverAlerts,
      caregiverContact
    });
  };

  const nextStep = () => {
    if (currentStep === 1 && isMedicated === null) {
      toast({
        title: "Please select an option",
        description: "Are you currently taking any medications?",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const frequencyOptions = [
    "once daily",
    "twice daily", 
    "three times daily",
    "four times daily",
    "every other day",
    "once weekly",
    "as needed"
  ];

  return (
    <div className="min-h-screen bg-background p-4 animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Medication Setup</h1>
          <p className="text-muted-foreground text-lg">
            Help us set up your medication reminders
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step <= currentStep
                    ? "bg-medical-blue text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Basic Question */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-medical-blue" />
                Are you taking any medications?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant={isMedicated === true ? "medical" : "medical-outline"}
                  onClick={() => setIsMedicated(true)}
                  className="h-20 text-left p-4"
                >
                  <div>
                    <p className="font-medium">Yes</p>
                    <p className="text-sm opacity-80">I take medications regularly</p>
                  </div>
                </Button>
                <Button
                  variant={isMedicated === false ? "medical" : "medical-outline"}
                  onClick={() => setIsMedicated(false)}
                  className="h-20 text-left p-4"
                >
                  <div>
                    <p className="font-medium">No</p>
                    <p className="text-sm opacity-80">I don't take any medications</p>
                  </div>
                </Button>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={nextStep} variant="medical">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Medication Details */}
        {currentStep === 2 && isMedicated && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-medical-blue" />
                Your Medications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {medications.map((medication) => (
                <Card key={medication.id} className="border-2 border-medical-blue/20">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">Medication Details</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMedication(medication.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`name-${medication.id}`}>Medication Name</Label>
                        <Input
                          id={`name-${medication.id}`}
                          value={medication.name}
                          onChange={(e) => updateMedication(medication.id, "name", e.target.value)}
                          placeholder="e.g., Metformin"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`dosage-${medication.id}`}>Dosage</Label>
                        <Input
                          id={`dosage-${medication.id}`}
                          value={medication.dosage}
                          onChange={(e) => updateMedication(medication.id, "dosage", e.target.value)}
                          placeholder="e.g., 500mg"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor={`frequency-${medication.id}`}>Frequency</Label>
                      <Select
                        value={medication.frequency}
                        onValueChange={(value) => updateMedication(medication.id, "frequency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {frequencyOptions.map((freq) => (
                            <SelectItem key={freq} value={freq}>
                              {freq}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Intake Times</Label>
                      <div className="space-y-2">
                        {medication.times.map((time, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              type="time"
                              value={time}
                              onChange={(e) => updateTime(medication.id, index, e.target.value)}
                              className="flex-1"
                            />
                            {medication.times.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTime(medication.id, index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="medical-outline"
                          size="sm"
                          onClick={() => addTime(medication.id)}
                        >
                          <Plus className="h-4 w-4" />
                          Add Time
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`start-${medication.id}`}>Start Date</Label>
                        <Input
                          id={`start-${medication.id}`}
                          type="date"
                          value={medication.startDate}
                          onChange={(e) => updateMedication(medication.id, "startDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`end-${medication.id}`}>End Date (Optional)</Label>
                        <Input
                          id={`end-${medication.id}`}
                          type="date"
                          value={medication.endDate}
                          onChange={(e) => updateMedication(medication.id, "endDate", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button
                variant="medical-outline"
                onClick={addMedication}
                className="w-full"
              >
                <Plus className="h-4 w-4" />
                Add Another Medication
              </Button>

              <div className="flex justify-between mt-6">
                <Button variant="ghost" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button onClick={nextStep} variant="medical">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Caregiver Alerts */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-medical-blue" />
                Caregiver Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="caregiver-alerts">Enable caregiver alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify someone if you miss your medication
                  </p>
                </div>
                <Switch
                  id="caregiver-alerts"
                  checked={caregiverAlerts}
                  onCheckedChange={setCaregiverAlerts}
                />
              </div>

              {caregiverAlerts && (
                <div className="space-y-4 p-4 bg-medical-light rounded-lg">
                  <div>
                    <Label htmlFor="caregiver-contact">Caregiver Contact</Label>
                    <Input
                      id="caregiver-contact"
                      value={caregiverContact}
                      onChange={(e) => setCaregiverContact(e.target.value)}
                      placeholder="Email or phone number"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Your caregiver will be notified if:</p>
                    <ul className="list-disc ml-4 mt-1">
                      <li>You miss a medication reminder</li>
                      <li>You don't confirm taking your medication within 30 minutes</li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button variant="ghost" onClick={() => setCurrentStep(2)}>
                  Back
                </Button>
                <Button onClick={handleComplete} variant="medical">
                  Complete Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Skip Step for No Medications */}
        {currentStep === 2 && !isMedicated && (
          <Card>
            <CardContent className="p-6 text-center">
              <Pill className="h-12 w-12 mx-auto text-medical-blue mb-4" />
              <h3 className="text-lg font-medium mb-2">Great!</h3>
              <p className="text-muted-foreground mb-4">
                You don't have any medications to track right now. You can always add them later if needed.
              </p>
              <Button onClick={handleComplete} variant="medical">
                Complete Setup
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MedicationOnboarding;