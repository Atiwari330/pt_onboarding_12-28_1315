export interface SymptomsAssessment {
  mood: number;
  stressLevel: number;
  majorConcerns: string;
  sleepPatterns: {
    hoursPerNight: number;
    quality: 'poor' | 'fair' | 'good' | 'excellent';
    difficulties: string;
  };
}

export interface SymptomsAssessmentErrors {
  mood?: string;
  stressLevel?: string;
  majorConcerns?: string;
  sleepPatterns?: {
    hoursPerNight?: string;
    quality?: string;
  };
}