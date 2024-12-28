import { render, screen, fireEvent } from '@testing-library/react';
import { HelpButton } from '@/components/layout/HelpButton';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('HelpButton', () => {
  it('renders the help button', () => {
    render(<HelpButton />);
    expect(screen.getByText('Need Help?')).toBeInTheDocument();
  });

  it('navigates to support page on click', () => {
    render(<HelpButton />);
    fireEvent.click(screen.getByText('Need Help?'));
    expect(mockPush).toHaveBeenCalledWith('/support');
  });
});