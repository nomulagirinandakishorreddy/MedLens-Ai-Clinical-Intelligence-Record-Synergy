import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SignupPage } from './SignupPage';

describe('SignupPage Component', () => {
  const defaultProps = {
    onSignupSuccess: vi.fn(),
    onGoToLogin: vi.fn(),
    onBackToIntro: vi.fn(),
  };

  it('renders account creation form fields', () => {
    render(<SignupPage {...defaultProps} />);
    expect(screen.getByRole('heading', { name: /Create Patient Account/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. Sarah Jenkins/i)).toBeInTheDocument();
  });

  it('handles account creation submission', () => {
    render(<SignupPage {...defaultProps} />);
    const nameInput = screen.getByPlaceholderText(/e.g. Sarah Jenkins/i);
    const submitBtn = screen.getByRole('button', { name: /Sign Up/i });

    fireEvent.change(nameInput, { target: { value: 'Dr. Jane Smith' } });
    fireEvent.click(submitBtn);

    expect(nameInput).toHaveValue('Dr. Jane Smith');
  });

  it('navigates to login page when button is clicked', () => {
    render(<SignupPage {...defaultProps} />);
    const signInBtn = screen.getByRole('button', { name: /Sign In/i });
    fireEvent.click(signInBtn);
    expect(defaultProps.onGoToLogin).toHaveBeenCalled();
  });
});
