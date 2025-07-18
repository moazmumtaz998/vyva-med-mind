import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Pill, User, Calendar, CheckCircle, AlertCircle } from "lucide-react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  nextDose: string;
  taken: boolean;
  adherence: number;
}

interface MedicationDashboardProps {
  medications: Medication[];
  onMarkTaken: (id: string) => void;
  onViewHistory: () => void;
  onAddMedication: () => void;
}

const MedicationDashboard: React.FC<MedicationDashboardProps> = ({
  medications,
  onMarkTaken,
  onViewHistory,
  onAddMedication
}) => {
  const overallAdherence = medications.reduce((acc, med) => acc + med.adherence, 0) / medications.length;
  
  return (
    <div className="min-h-screen bg-background p-4 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Medication Dashboard</h1>
          <p className="text-muted-foreground text-lg">Stay on track with your medication schedule</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-medical-blue to-medical-blue/80 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Today's Medications</p>
                  <p className="text-2xl font-bold">{medications.length}</p>
                </div>
                <Pill className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-medical-green to-medical-green/80 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Adherence Rate</p>
                  <p className="text-2xl font-bold">{Math.round(overallAdherence)}%</p>
                </div>
                <CheckCircle className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-medical-accent to-medical-accent/80 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Next Dose</p>
                  <p className="text-lg font-bold">
                    {medications.find(m => !m.taken)?.nextDose || "All done!"}
                  </p>
                </div>
                <Clock className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Medication List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Today's Schedule</h2>
            <div className="flex gap-2">
              <Button variant="medical-outline" onClick={onViewHistory}>
                <Calendar className="h-4 w-4" />
                View History
              </Button>
              <Button variant="medical" onClick={onAddMedication}>
                <Pill className="h-4 w-4" />
                Add Medication
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {medications.map((medication) => (
              <Card key={medication.id} className="transition-all duration-300 hover:shadow-medical">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        medication.taken ? 'bg-medical-green' : 'bg-medical-blue'
                      } text-white`}>
                        <Pill className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{medication.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {medication.dosage} • {medication.frequency}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Times: {medication.times.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge variant={medication.taken ? "default" : "secondary"}>
                        {medication.taken ? "Taken" : "Pending"}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          Next: {medication.nextDose}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {medication.adherence}% adherence
                        </p>
                      </div>
                      {!medication.taken && (
                        <Button
                          variant="medical-secondary"
                          size="sm"
                          onClick={() => onMarkTaken(medication.id)}
                          className="animate-pulse-medical"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Mark Taken
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {medications.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Pill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No medications yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first medication to track
              </p>
              <Button variant="medical" onClick={onAddMedication}>
                <Pill className="h-4 w-4" />
                Add Your First Medication
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MedicationDashboard;