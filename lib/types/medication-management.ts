export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  sideEffects: string;
}

export interface MedicationManagement {
  takingMedications: boolean;
  medications: Medication[];
  additionalNotes: string;
}

export interface MedicationErrors {
  medications?: {
    name?: string;
    dosage?: string;
    frequency?: string;
  }[];
  additionalNotes?: string;
}