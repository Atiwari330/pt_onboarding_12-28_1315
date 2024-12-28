export type AppointmentType = 'in-person' | 'telehealth';
export type TimePreference = 'morning' | 'afternoon' | 'evening';
export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
export type Frequency = 'weekly' | 'biweekly' | 'monthly';

export interface SchedulingPreferences {
  appointmentType: AppointmentType;
  frequency: Frequency;
  preferredDays: WeekDay[];
  preferredTimes: TimePreference[];
  additionalNotes: string;
}

export interface SchedulingPreferencesErrors {
  appointmentType?: string;
  frequency?: string;
  preferredDays?: string;
  preferredTimes?: string;
  additionalNotes?: string;
}