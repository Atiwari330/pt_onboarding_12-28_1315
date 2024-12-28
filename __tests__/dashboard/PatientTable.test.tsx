import { render, screen } from '@testing-library/react';
import { PatientTable } from '@/components/dashboard/PatientTable';
import { mockPatients } from '@/lib/data/mock-patients';

describe('PatientTable', () => {
  it('renders the table with patient data', () => {
    render(<PatientTable patients={mockPatients} />);
    
    // Check if column headers are present
    expect(screen.getByText('Patient Name')).toBeInTheDocument();
    expect(screen.getByText('Personal Details')).toBeInTheDocument();
    expect(screen.getByText('Medical History')).toBeInTheDocument();
    
    // Check if patient names are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Robert Johnson')).toBeInTheDocument();
  });
});