import { render, screen, fireEvent } from '@testing-library/react';
import { Step6ConsentAgreements } from '@/components/onboarding/Step6ConsentAgreements';
import { OnboardingProvider } from '@/lib/context/OnboardingContext';

const renderWithProvider = (component: React.ReactNode) => {
  return render(<OnboardingProvider>{component}</OnboardingProvider>);
};

describe('Step6ConsentAgreements', () => {
  it('renders all consent sections', () => {
    renderWithProvider(<Step6ConsentAgreements />);
    
    expect(screen.getByText(/HIPAA Privacy Notice/i)).toBeInTheDocument();
    expect(screen.getByText(/Telehealth Consent/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
  });

  it('requires all checkboxes to be checked', () => {
    renderWithProvider(<Step6ConsentAgreements />);
    
    const finishButton = screen.getByText(/Accept & Continue/i);
    fireEvent.click(finishButton);
    
    expect(screen.getByText(/You must accept the HIPAA Privacy Notice/i)).toBeInTheDocument();
    expect(screen.getByText(/You must consent to telehealth services/i)).toBeInTheDocument();
  });

  it('requires signature before proceeding', () => {
    renderWithProvider(<Step6ConsentAgreements />);
    
    // Check all consent boxes
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => {
      fireEvent.click(checkbox);
    });
    
    const finishButton = screen.getByText(/Accept & Continue/i);
    fireEvent.click(finishButton);
    
    expect(screen.getByText(/Please provide your signature/i)).toBeInTheDocument();
  });
});