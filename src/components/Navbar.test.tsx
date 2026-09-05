import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from './Navbar';
import { INITIAL_PATIENT, INITIAL_LABS, INITIAL_MEDS, INITIAL_CONDITIONS } from '../data/mockData';
import { PatientProfile } from '../types/medlens';

const testPatientRecord: PatientProfile = {
  ...INITIAL_PATIENT,
  labs: INITIAL_LABS,
  medications: INITIAL_MEDS,
  conditions: INITIAL_CONDITIONS,
  allergies: [],
};

describe('Navbar Component', () => {
  const defaultProps = {
    patient: testPatientRecord,
    activeTab: 'overview',
    setActiveTab: vi.fn(),
    onOpenIntake: vi.fn(),
    onOpenUpload: vi.fn(),
    onOpenQR: vi.fn(),
    onOpenPreVisit: vi.fn(),
    onOpenCareCircle: vi.fn(),
    onOpenAmbient: vi.fn(),
    onOpenQuiz: vi.fn(),
    onExportFHIR: vi.fn(),
    onOpenAiDrawer: vi.fn(),
    onLogout: vi.fn(),
    onBackToIntro: vi.fn(),
    literacyScore: 100,
    onOpenAlignmentMatrix: vi.fn(),
  };

  it('renders brand name and patient information correctly', () => {
    render(<Navbar {...defaultProps} />);
    expect(screen.getByText('MedLens AI')).toBeInTheDocument();
    expect(screen.getByText('Eleanor Vance')).toBeInTheDocument();
  });

  it('renders navigation tabs with proper accessibility roles', () => {
    render(<Navbar {...defaultProps} />);
    const tabList = screen.getByRole('tablist');
    expect(tabList).toBeInTheDocument();

    const overviewTab = screen.getByRole('tab', { name: /Executive Overview/i });
    expect(overviewTab).toHaveAttribute('aria-selected', 'true');
  });

  it('calls setActiveTab when a navigation tab is clicked', () => {
    render(<Navbar {...defaultProps} />);
    const labTab = screen.getByRole('tab', { name: /Structured Lab Records/i });
    fireEvent.click(labTab);
    expect(defaultProps.setActiveTab).toHaveBeenCalledWith('lab-records');
  });

  it('triggers action modals on button clicks', () => {
    render(<Navbar {...defaultProps} />);
    const uploadBtn = screen.getByRole('button', { name: /Upload Report/i });
    fireEvent.click(uploadBtn);
    expect(defaultProps.onOpenUpload).toHaveBeenCalled();
  });
});
