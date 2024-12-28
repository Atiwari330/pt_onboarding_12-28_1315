import { render, screen, fireEvent } from '@testing-library/react';
import { Step2MedicalHistory } from '@/components/onboarding/Step2MedicalHistory';
import { OnboardingProvider } from '@/lib/context/OnboardingContext';

const renderWithProvider = (component: React.ReactNode) => {
  return render(<OnboardingProvider>{component}</OnboardingProvider>);
};

describe('Step2MedicalHistory', () => {
  it('renders all sections', () => {
    renderWithProvider(<Step2MedicalHistory />);
    
    expect(screen.getByText(/Your Medical History/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Diagnoses/i)).toBeInTheDocument();
    expect(screen.getByText(/previous psychiatric hospitalizations/i)).toBeInTheDocument();
    expect(screen.getByText(/previous mental health treatments/i)).toBeInTheDocument();
  });

  it('shows conditional fields when selecting yes for hospitalizations', () => {
    renderWithProvider(<Step2MedicalHistory />);
    
    const yesRadio = screen.getByLabelText(/Yes/i);
    fireEvent.click(yesRadio);
    
    expect(screen.getByText(/Add Hospitalization/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderWithProvider(<Step2MedicalHistory />);
    
    // Select 'None' for diagnoses
    const noneCheckbox = screen.getByLabelText(/None/i);
    fireEvent.click(noneCheckbox);
    
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
    
    // Should not show errors since 'None' is a valid selection
    expect(screen.queryByText(/Please select at least one diagnosis/i)).not.toBeInTheDocument();
  });

  it('preserves data when navigating back', () => {
    renderWithProvider(<Step2MedicalHistory />);
    
    const noneCheckbox = screen.getByLabelText(/None/i);
    fireEvent.click(noneCheckbox);
    
    const backButton = screen.getByText(/Back/i);
    fireEvent.click(backButton);
    
    // Re-render Step2
    renderWithProvider(<Step2MedicalHistory />);
    
    expect(noneCheckbox).toBeChecked();
  });
});