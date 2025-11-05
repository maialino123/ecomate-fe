import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('can be checked', async () => {
    const user = userEvent.setup();
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('can be unchecked', async () => {
    const user = userEvent.setup();
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('calls onCheckedChange when toggled', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<Checkbox onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('can be disabled', () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('cannot be toggled when disabled', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(<Checkbox disabled onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders with defaultChecked', () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
