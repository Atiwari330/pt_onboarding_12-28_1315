export type RelationshipType = 'self' | 'spouse' | 'child' | 'other';

export interface InsurancePolicy {
  carrier: string;
  policyNumber: string;
  groupNumber: string;
  policyHolder: {
    name: string;
    dateOfBirth: string;
    relationship: RelationshipType;
  };
}

export interface InsuranceBilling {
  hasInsurance: boolean;
  primaryInsurance: InsurancePolicy;
  hasSecondaryInsurance: boolean;
  secondaryInsurance?: InsurancePolicy;
}

export interface InsuranceBillingErrors {
  primaryInsurance?: {
    carrier?: string;
    policyNumber?: string;
    groupNumber?: string;
    policyHolder?: {
      name?: string;
      dateOfBirth?: string;
      relationship?: string;
    };
  };
  secondaryInsurance?: {
    carrier?: string;
    policyNumber?: string;
    groupNumber?: string;
    policyHolder?: {
      name?: string;
      dateOfBirth?: string;
      relationship?: string;
    };
  };
}