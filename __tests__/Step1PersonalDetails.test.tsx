import { render, screen, fireEvent } from '@testing-library/react';
import { Step1PersonalDetails } from '@/components/onboarding/Step1PersonalDetails';
import { OnboardingProvider } from '@/lib/context/OnboardingContext';

const renderWithProvider = (component: React.ReactNode) => {
  return render(<OnboardingProvider>{component}</OnboardingProvider>);
};

describe('Step1PersonalDetails', () => {
  it('renders all form fields', () => {
    renderWithProvider(<Step1PersonalDetails />);
    
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Phone Number/i)).toBeInTheDocument();
  });

  it('displays validation errors for empty required fields', async () => {
    renderWithProvider(<Step1PersonalDetails />);
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(await screen.findByText(/First name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Last name is required/i)).toBeInTheDocument();
  });

  it('validates email format', async () => {
    renderWithProvider(<Step1PersonalDetails />);
    
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(await screen.findByText(/Please enter a valid email/i)).toBeInTheDocument();
  });
});