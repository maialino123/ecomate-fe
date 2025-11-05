import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Label } from './label';

/**
 * Flexible input field with validation states.
 */
const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Visual variant (validation state)',
    },
    inputSize: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Size of the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type',
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default input
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

/**
 * Email input
 */
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email',
  },
};

/**
 * Password input
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
};

/**
 * Error state (validation failed)
 */
export const Error: Story = {
  args: {
    variant: 'error',
    placeholder: 'Invalid email',
    value: 'invalid@',
  },
};

/**
 * Success state (validation passed)
 */
export const Success: Story = {
  args: {
    variant: 'success',
    placeholder: 'Valid email',
    value: 'user@example.com',
  },
};

/**
 * Small size
 */
export const Small: Story = {
  args: {
    inputSize: 'sm',
    placeholder: 'Small input',
  },
};

/**
 * Large size
 */
export const Large: Story = {
  args: {
    inputSize: 'lg',
    placeholder: 'Large input',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

/**
 * With label
 */
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

/**
 * Form example with multiple inputs
 */
export const FormExample: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" placeholder="John Doe" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="john@example.com" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="••••••••" />
      </div>
    </div>
  ),
};
