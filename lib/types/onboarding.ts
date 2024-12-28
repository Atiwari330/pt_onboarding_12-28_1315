export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  savedData: Record<string, any>;
}

export type OnboardingAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SAVE_DATA'; payload: Record<string, any> }
  | { type: 'RESET' };

export interface OnboardingContextType {
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingAction>;
}