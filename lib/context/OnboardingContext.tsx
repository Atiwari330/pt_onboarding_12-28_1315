"use client";

import React, { createContext, useContext, useReducer } from 'react';
import { OnboardingState, OnboardingAction, OnboardingContextType } from '@/lib/types/onboarding';

const initialState: OnboardingState = {
  currentStep: 1,
  totalSteps: 8,
  savedData: {},
};

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'SAVE_DATA':
      return {
        ...state,
        savedData: { ...state.savedData, ...action.payload },
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}