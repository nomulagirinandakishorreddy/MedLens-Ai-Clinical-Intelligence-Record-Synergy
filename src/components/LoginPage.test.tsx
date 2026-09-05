import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LoginPage } from './LoginPage';

describe('LoginPage Component', () => {
  const defaultProps = {
    onLoginSuccess: vi.fn(),
    onGoToSignup: vi.fn(),
    onBackToIntro: vi.fn(),
  };

  it('renders login heading and credentials form', () => {
    render(<LoginPage {...defaultProps} />);
    expect(screen.getByRole('heading', { name: /Sign in to MedLens/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('eleanor.vance@medlens.health')).toBeInTheDocument();
  });

  it('allows user to submit login form', () => {
    render(<LoginPage {...defaultProps} />);
    const submitBtn = screen.getByRole('button', { name: /^Sign In$/i });
    fireEvent.click(submitBtn);

    expect(submitBtn).toBeInTheDocument();
  });

  it('navigates to signup page when button is clicked', () => {
    render(<LoginPage {...defaultProps} />);
    const signupBtn = screen.getByRole('button', { name: /Sign Up Now/i });
    fireEvent.click(signupBtn);
    expect(defaultProps.onGoToSignup).toHaveBeenCalled();
  });
});
