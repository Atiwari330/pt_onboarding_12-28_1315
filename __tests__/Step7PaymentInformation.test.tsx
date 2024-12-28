import { render, screen, fireEvent } from '@testing-library/react';
import { Step7PaymentInformation } from '@/components/onboarding/Step7PaymentInformation';
import { OnboardingProvider } from '@/lib/context/OnboardingContext';

const renderWithProvider = (component: React.ReactNode) => {
  return render(<OnboardingProvider>{component}</OnboardingProvider>);
};

describe('Step7PaymentInformation', () => {
  it('renders all payment form fields', () => {
    renderWithProvider(<Step7PaymentInformation />);
    
    expect(screen.getByLabelText(/Cardholder Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Card Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expiration Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CVV/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderWithProvider(<Step7PaymentInformation />);
    
    const submitButton = screen.getByText(/Complete Registration/i);
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/Cardholder name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Card number is required/i)).toBeInTheDocument();
  });

  it('formats expiration date correctly', () => {
    renderWithProvider(<Step7PaymentInformation />);
    
    const expirationInput = screen.getByLabelText(/Expiration Date/i);
    fireEvent.change(expirationInput, { target: { value: '1223' } });
    
    expect(expirationInput).toHaveValue('12/23');
  });
});