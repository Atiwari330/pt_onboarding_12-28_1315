export interface PaymentInformation {
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

export interface PaymentInformationErrors {
  cardholderName?: string;
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
}