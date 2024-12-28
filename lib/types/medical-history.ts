export interface Hospitalization {
  date: string;
  reason: string;
  duration: string;
}

export interface Treatment {
  type: string;
  provider: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
}

export interface MedicalHistory {
  currentDiagnoses: string[];
  otherDiagnoses: string;
  hasHospitalizations: boolean;
  hospitalizations: Hospitalization[];
  hasPreviousTreatments: boolean;
  previousTreatments: Treatment[];
  chronicConditions: string;
  recentSurgeries: string;
}

export interface MedicalHistoryErrors {
  currentDiagnoses?: string;
  hospitalizations?: {
    date?: string;
    reason?: string;
    duration?: string;
  }[];
  previousTreatments?: {
    type?: string;
    provider?: string;
    startDate?: string;
  }[];
  chronicConditions?: string;
}