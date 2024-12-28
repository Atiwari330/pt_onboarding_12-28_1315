export interface ConsentAgreements {
  hipaaConsent: boolean;
  telehealthConsent: boolean;
  privacyPolicy: boolean;
  termsOfService: boolean;
  signature: string;
}

export interface ConsentAgreementsErrors {
  hipaaConsent?: string;
  telehealthConsent?: string;
  privacyPolicy?: string;
  termsOfService?: string;
  signature?: string;
}