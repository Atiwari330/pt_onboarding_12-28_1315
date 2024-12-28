import { render, screen, fireEvent } from '@testing-library/react';
import { Step4MedicationManagement } from '@/components/onboarding/Step4MedicationManagement';
import { OnboardingProvider } from '@/lib/context/OnboardingContext';

const renderWithProvider = (component: React.ReactNode) => {
  return render(<OnboardingProvider>{component}</OnboardingProvider>);
};

describe('Step4MedicationManagement', () => {
  it('renders initial form with radio options', () => {
    renderWithProvider(<Step4MedicationManagement />);
    
    expect(screen.getByText(/Current Medications/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you currently taking any medications?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Yes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/No/i)).toBeInTheDocument();
  });

  it('shows medication fields when "Yes" is selected', () => {
    renderWithProvider(<Step4MedicationManagement />);
    
    const yesRadio = screen.getByLabelText(/Yes/i);
    fireEvent.click(yesRadio);
    
    expect(screen.getByText(/Add Medication/i)).toBeInTheDocument();
  });

  it('can add and remove medications', () => {
    renderWithProvider(<Step4MedicationManagement />);
    
    // Select Yes for medications
    const yesRadio = screen.getByLabelText(/Yes/i);
    fireEvent.click(yesRadio);
    
    // Add a medication
    const addButton = screen.getByText(/Add Medication/i);
    fireEvent.click(addButton);
    
    // Verify medication fields appear
    expect(screen.getByText(/Medication Details/i)).toBeInTheDocument();
    
    // Remove the medication
    const removeButton = screen.getByRole('button', { name: /trash/i });
    fireEvent.click(removeButton);
    
    // Verify medication fields are removed
    expect(screen.queryByText(/Medication Details/i)).not.toBeInTheDocument();
  });

  it('preserves data when navigating back', () => {
    renderWithProvider(<Step4MedicationManagement />);
    
    // Add a medication
    const yesRadio = screen.getByLabelText(/Yes/i);
    fireEvent.click(yesRadio);
    
    const addButton = screen.getByText(/Add Medication/i);
    fireEvent.click(addButton);
    
    // Fill in medication details
    const nameInput = screen.getByLabelText(/Medication Name/i);
    fireEvent.change(nameInput, { target: { value: 'Test Medication' } });
    
    // Navigate back
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);
    
    // Re-render and verify data persistence
    renderWithProvider(<Step4MedicationManagement />);
    expect(nameInput).toHaveValue('Test Medication');
  });
});