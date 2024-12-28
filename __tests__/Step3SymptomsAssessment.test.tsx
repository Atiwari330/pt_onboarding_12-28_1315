import { render, screen, fireEvent } from '@testing-library/react';
import { Step3SymptomsAssessment } from '@/components/onboarding/Step3SymptomsAssessment';
import { OnboardingProvider } from '@/lib/context/OnboardingContext';

const renderWithProvider = (component: React.ReactNode) => {
  return render(<OnboardingProvider>{component}</OnboardingProvider>);
};

describe('Step3SymptomsAssessment', () => {
  it('renders all form sections', () => {
    renderWithProvider(<Step3SymptomsAssessment />);
    
    expect(screen.getByText(/How Have You Been Feeling?/i)).toBeInTheDocument();
    expect(screen.getByText(/rate your mood/i)).toBeInTheDocument();
    expect(screen.getByText(/rate your stress level/i)).toBeInTheDocument();
    expect(screen.getByText(/major concerns/i)).toBeInTheDocument();
    expect(screen.getByText(/sleep quality/i)).toBeInTheDocument();
  });

  it('validates required fields before proceeding', async () => {
    renderWithProvider(<Step3SymptomsAssessment />);
    
    // Clear major concerns field
    const concernsTextarea = screen.getByPlaceholderText(/Please describe any concerns/i);
    fireEvent.change(concernsTextarea, { target: { value: '' } });
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(await screen.findByText(/Please describe your major concerns/i)).toBeInTheDocument();
  });

  it('preserves data when navigating back', () => {
    renderWithProvider(<Step3SymptomsAssessment />);
    
    const concernsTextarea = screen.getByPlaceholderText(/Please describe any concerns/i);
    fireEvent.change(concernsTextarea, { target: { value: 'Test concerns' } });
    
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);
    
    // Re-render Step3
    renderWithProvider(<Step3SymptomsAssessment />);
    
    expect(concernsTextarea).toHaveValue('Test concerns');
  });
});