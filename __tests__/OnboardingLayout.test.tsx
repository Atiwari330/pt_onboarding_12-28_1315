import { render, screen } from '@testing-library/react';
import { OnboardingLayout } from '@/components/layout/OnboardingLayout';

describe('OnboardingLayout', () => {
  it('renders the layout with progress bar and save buttons', () => {
    render(
      <OnboardingLayout>
        <div>Test Content</div>
      </OnboardingLayout>
    );

    // Check if progress indicator is present
    expect(screen.getByText(/Step 1 of 5/)).toBeInTheDocument();
    
    // Check if save buttons are present
    expect(screen.getByText('Save Progress')).toBeInTheDocument();
    expect(screen.getByText('Save & Exit')).toBeInTheDocument();
    
    // Check if children content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});