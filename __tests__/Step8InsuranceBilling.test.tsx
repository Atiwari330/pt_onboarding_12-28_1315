import { render, screen, fireEvent } from '@testing-library/react';
import { Step8InsuranceBilling } from '@/components/onboarding/Step8InsuranceBilling';
import { OnboardingProvider } from '@/lib/context/OnboardingContext';

const renderWithProvider = (component: React.ReactNode) => {
  return render(<OnboardingProvider>{component}</OnboardingProvider>);
};

describe('Step8InsuranceBilling', () => {
  it('renders insurance options', () => {
    renderWithProvider(<Step8InsuranceBilling />);
    
    expect(screen.getByText(/Do you have health insurance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Yes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/No/i)).toBeInTheDocument();
  });

  it('shows primary insurance form when "Yes" is selected', () => {
    renderWithProvider(<Step8InsuranceBilling />);
    
    const yesRadio = screen.getByLabelText(/Yes/i);
    fireEvent.click(yesRadio);
    
    expect(screen.getByText(/Primary Insurance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Insurance Carrier/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Policy Number/i)).toBeInTheDocument();
  });

  it('validates required fields when insurance is selected', async () => {
    renderWithProvider(<Step8InsuranceBilling />);
    
    const yesRadio = screen.getByLabelText(/Yes/i);
    fireEvent.click(yesRadio);
    
    const submitButton = screen.getByText(/Complete Registration/i);
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/Insurance carrier is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Policy number is required/i)).toBeInTheDocument();
  });
});