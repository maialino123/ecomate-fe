import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

/**
 * Button component with multiple variants and sizes.
 * Built on Radix Slot for composition.
 */
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'ghost', 'outline', 'destructive', 'link'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'xl', 'icon'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element (Slot pattern)',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button variant
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

/**
 * Primary action button (green, prominent)
 */
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

/**
 * Secondary action button (gray, subtle)
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

/**
 * Ghost button with transparent background
 */
export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

/**
 * Outlined button
 */
export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

/**
 * Destructive action button (red, dangerous)
 */
export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

/**
 * Link-styled button
 */
export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

/**
 * Small button size
 */
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

/**
 * Large button size
 */
export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'primary',
    size: 'lg',
  },
};

/**
 * Extra large button size
 */
export const ExtraLarge: Story = {
  args: {
    children: 'Extra Large Button',
    variant: 'primary',
    size: 'xl',
  },
};

/**
 * Icon button (square shape)
 */
export const Icon: Story = {
  args: {
    children: '❤️',
    size: 'icon',
    variant: 'outline',
  },
};

/**
 * Disabled button
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

/**
 * All variants showcased
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

/**
 * All sizes showcased
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="icon">❤️</Button>
    </div>
  ),
};
