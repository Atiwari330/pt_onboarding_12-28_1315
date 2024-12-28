export interface PersonalDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
}

export interface PersonalDetailsErrors {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  phone?: string;
  emergencyContact?: {
    name?: string;
    phone?: string;
  };
}