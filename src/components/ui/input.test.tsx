import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './input';

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeInTheDocument();
  });

  it('accepts text input', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText(/enter text/i);

    await user.type(input, 'Hello World');
    expect(input).toHaveValue('Hello World');
  });

  it('renders with error variant', () => {
    render(<Input variant="error" placeholder="Error" />);
    const input = screen.getByPlaceholderText(/error/i);
    expect(input).toHaveClass('border-destructive');
  });

  it('renders with success variant', () => {
    render(<Input variant="success" placeholder="Success" />);
    const input = screen.getByPlaceholderText(/success/i);
    expect(input).toHaveClass('border-primary-500');
  });

  it('can be disabled', () => {
    render(<Input disabled placeholder="Disabled" />);
    const input = screen.getByPlaceholderText(/disabled/i);
    expect(input).toBeDisabled();
  });

  it('renders with different types', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />);
    let input = screen.getByPlaceholderText(/email/i);
    expect(input).toHaveAttribute('type', 'email');

    rerender(<Input type="password" placeholder="Password" />);
    input = screen.getByPlaceholderText(/password/i);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('renders with large size', () => {
    render(<Input inputSize="lg" placeholder="Large" />);
    const input = screen.getByPlaceholderText(/large/i);
    expect(input).toHaveClass('h-12');
  });

  it('handles onChange event', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} placeholder="Test" />);
    const input = screen.getByPlaceholderText(/test/i);

    await user.type(input, 'a');
    expect(handleChange).toHaveBeenCalled();
  });
});
