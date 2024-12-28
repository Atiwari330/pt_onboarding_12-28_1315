import { render, screen, fireEvent } from '@testing-library/react';
import { Step5SchedulingPreferences } from '@/components/onboarding/Step5SchedulingPreferences';
import { OnboardingProvider } from '@/lib/context/OnboardingContext';

const renderWithProvider = (component: React.ReactNode) => {
  return render(<OnboardingProvider>{component}</OnboardingProvider>);
};

describe('Step5SchedulingPreferences', () => {
  it('renders all scheduling sections', () => {
    renderWithProvider(<Step5SchedulingPreferences />);
    
    expect(screen.getByText(/Scheduling Preferences/i)).toBeInTheDocument();
    expect(screen.getByText(/Preferred Appointment Type/i)).toBeInTheDocument();
    expect(screen.getByText(/How often would you like to schedule/i)).toBeInTheDocument();
    expect(screen.getByText(/Which days work best for you/i)).toBeInTheDocument();
  });

  it('validates required selections before finishing', async () => {
    renderWithProvider(<Step5SchedulingPreferences />);
    
    const finishButton = screen.getByText('Finish');
    fireEvent.click(finishButton);
    
    expect(await screen.findByText(/Please select at least one preferred day/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please select at least one preferred time/i)).toBeInTheDocument();
  });

  it('preserves data when navigating back', () => {
    renderWithProvider(<Step5SchedulingPreferences />);
    
    // Select some preferences
    const telehealthOption = screen.getByLabelText(/Telehealth/i);
    fireEvent.click(telehealthOption);
    
    const mondayCheckbox = screen.getByLabelText(/Monday/i);
    fireEvent.click(mondayCheckbox);
    
    const morningCheckbox = screen.getByLabelText(/Morning/i);
    fireEvent.click(morningCheckbox);
    
    // Navigate back
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);
    
    // Re-render and verify data persistence
    renderWithProvider(<Step5SchedulingPreferences />);
    expect(telehealthOption).toBeChecked();
    expect(mondayCheckbox).toBeChecked();
    expect(morningCheckbox).toBeChecked();
  });
});