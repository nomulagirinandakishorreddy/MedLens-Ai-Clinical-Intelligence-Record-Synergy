import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PatientIntakeModal } from './PatientIntakeModal';
import { INITIAL_PATIENT, INITIAL_MEDICATIONS, INITIAL_CONDITIONS, INITIAL_ALLERGIES } from '../data/mockData';

describe('PatientIntakeModal Component', () => {
  const defaultProps = {
    patient: INITIAL_PATIENT,
    medications: INITIAL_MEDICATIONS,
    conditions: INITIAL_CONDITIONS,
    allergies: INITIAL_ALLERGIES,
    onClose: vi.fn(),
    onSave: vi.fn(),
  };

  it('renders intake modal header correctly', () => {
    render(<PatientIntakeModal {...defaultProps} />);
    expect(screen.getByRole('heading', { name: /Patient Intake & Demographics/i })).toBeInTheDocument();
  });

  it('allows user to switch intake tabs', () => {
    render(<PatientIntakeModal {...defaultProps} />);
    const medsTab = screen.getByRole('button', { name: /Active Medications/i });
    fireEvent.click(medsTab);
    expect(medsTab).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<PatientIntakeModal {...defaultProps} />);
    const closeBtn = screen.getByRole('button', { name: /Close modal/i });
    fireEvent.click(closeBtn);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
