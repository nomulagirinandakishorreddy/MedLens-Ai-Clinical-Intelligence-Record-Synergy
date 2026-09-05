import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ReportUploaderModal } from './ReportUploaderModal';

describe('ReportUploaderModal Component', () => {
  const defaultProps = {
    onClose: vi.fn(),
    onUploadSuccess: vi.fn(),
  };

  it('renders modal header when mounted', () => {
    render(<ReportUploaderModal {...defaultProps} />);
    expect(screen.getByText(/Clinical Document Intake & Provenance AI/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<ReportUploaderModal {...defaultProps} />);
    const closeBtn = screen.getByRole('button', { name: /Close modal/i });
    fireEvent.click(closeBtn);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
