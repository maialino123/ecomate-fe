# Component Library Documentation

Component-Driven Development (CDD) base components built on Radix UI primitives.

## 📚 Table of Contents

- [Philosophy](#philosophy)
- [Components](#components)
  - [Button](#button)
  - [Input](#input)
  - [Card](#card)
  - [Dialog](#dialog)
- [Design Tokens](#design-tokens)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)

---

## Philosophy

Our component library follows **Component-Driven Development (CDD)** principles:

1. **Unstyled Primitives** - Built on Radix UI for accessibility
2. **Full Control** - Style components to match any design
3. **Composable** - Combine components to build complex UIs
4. **Type Safe** - Full TypeScript support
5. **Variant-based** - Use CVA for consistent variant management

---

## Components

### Button

Versatile button component with multiple variants and sizes.

**Import:**
```tsx
import { Button } from '@/components/ui';
```

**Props:**
```typescript
interface ButtonProps {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon';
  asChild?: boolean; // Render as child element (Radix Slot)
}
```

**Examples:**
```tsx
// Basic button
<Button>Click me</Button>

// Primary button
<Button variant="primary" size="lg">
  Sign Up
</Button>

// As Link (using asChild)
<Button asChild>
  <Link href="/about">Learn More</Link>
</Button>

// Icon button
<Button size="icon">
  <IconPlus />
</Button>

// Destructive action
<Button variant="destructive">
  Delete Account
</Button>
```

**Variants:**
- `default` - Standard button with shadow
- `primary` - Primary action (green, prominent)
- `secondary` - Secondary action (gray, subtle)
- `ghost` - Transparent, hover effect
- `outline` - Border only
- `destructive` - Red, for dangerous actions
- `link` - Text with underline

---

### Input

Flexible input field with validation states.

**Import:**
```tsx
import { Input } from '@/components/ui';
```

**Props:**
```typescript
interface InputProps {
  variant?: 'default' | 'error' | 'success';
  inputSize?: 'default' | 'sm' | 'lg';
  // + all standard input props
}
```

**Examples:**
```tsx
// Basic input
<Input type="email" placeholder="Enter your email" />

// Error state
<Input
  variant="error"
  placeholder="Invalid email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// Large size
<Input inputSize="lg" placeholder="Large input" />

// With label
<div>
  <label htmlFor="email" className="block mb-2">Email</label>
  <Input id="email" type="email" required />
</div>
```

**Variants:**
- `default` - Standard input
- `error` - Red border, for validation errors
- `success` - Green border, for successful validation

---

### Card

Compound component for card-based layouts.

**Import:**
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui';
```

**Props:**
```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  hover?: 'none' | 'lift' | 'glow';
}
```

**Examples:**
```tsx
// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Elevated card with hover effect
<Card variant="elevated" hover="lift">
  <CardContent className="p-8">
    <h3>Feature Title</h3>
    <p>Feature description</p>
  </CardContent>
</Card>

// Simple stat card
<Card variant="default">
  <CardContent className="p-6 text-center">
    <div className="text-3xl font-bold">50K+</div>
    <div className="text-sm text-gray-600">Active Users</div>
  </CardContent>
</Card>
```

**Sub-components:**
- `Card` - Root container
- `CardHeader` - Top section (padding included)
- `CardTitle` - Title text (h3)
- `CardDescription` - Subtitle text
- `CardContent` - Main content area
- `CardFooter` - Bottom section for actions

---

### Dialog

Modal dialog built on Radix UI Dialog primitive.

**Import:**
```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui';
```

**Examples:**
```tsx
// Basic dialog
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Controlled dialog
const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    <div>Content here</div>
  </DialogContent>
</Dialog>
```

**Features:**
- Auto-focus management
- Backdrop click to close
- ESC to close
- Close button (X) included
- Fully accessible (ARIA)
- Smooth animations

---

## Design Tokens

Design tokens are defined in:
- `tailwind.config.ts` - Tailwind theme extension
- `src/app/globals.css` - CSS variables

### Colors

**Primary (Green):**
- `primary-50` to `primary-950` - Brand green scale
- `primary-600` - Main brand color

**Semantic Colors (HSL-based):**
- `background` / `foreground` - Base colors
- `border` / `input` - UI element colors
- `ring` - Focus ring color
- `muted` / `muted-foreground` - Subtle colors
- `accent` / `accent-foreground` - Accent colors
- `destructive` / `destructive-foreground` - Error/danger colors

### Border Radius

- `rounded-sm` - Small radius
- `rounded-md` - Medium radius
- `rounded-lg` - Large radius (default)

### Animations

- `animate-fade-in` - Fade in animation (0.3s)
- `animate-slide-in` - Slide in animation (0.3s)

---

## Usage Examples

### Landing Page Form

```tsx
'use client';

import { useState } from 'react';
import { Button, Input } from '@/components/ui';

export default function LandingForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          inputSize="lg"
          className="flex-1"
        />
        <Button type="submit" variant="primary" size="lg">
          Get Started
        </Button>
      </div>
    </form>
  );
}
```

### Feature Cards Grid

```tsx
import { Card, CardContent } from '@/components/ui';

export default function Features() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <Card variant="default">
        <CardContent className="p-8 text-center">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-bold mb-3">Track Your Impact</h3>
          <p className="text-gray-600">
            Monitor your carbon footprint with detailed analytics.
          </p>
        </CardContent>
      </Card>
      {/* More cards... */}
    </div>
  );
}
```

### Confirmation Dialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui';
import { Button } from '@/components/ui';

export default function DeleteButton() {
  const handleDelete = () => {
    // Perform delete action
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            Yes, delete my account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Best Practices

### 1. Use Semantic Variants

```tsx
// ✅ Good - Clear intent
<Button variant="destructive">Delete</Button>
<Button variant="primary">Sign Up</Button>

// ❌ Bad - Generic styling
<Button className="bg-red-500">Delete</Button>
```

### 2. Compose, Don't Duplicate

```tsx
// ✅ Good - Reuse base components
<Card>
  <CardContent>
    <Input placeholder="Email" />
    <Button>Submit</Button>
  </CardContent>
</Card>

// ❌ Bad - Recreate styles
<div className="rounded-lg border bg-white p-6">
  <input className="..." />
  <button className="...">Submit</button>
</div>
```

### 3. Extend with className

```tsx
// ✅ Good - Extend base styles
<Button className="w-full">Full Width Button</Button>

// ✅ Good - Override specific styles
<Button className="shadow-xl hover:scale-105">
  Animated Button
</Button>
```

### 4. Use TypeScript

```tsx
// ✅ Good - Type-safe
import { Button, type ButtonProps } from '@/components/ui';

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

// ❌ Bad - No types
const CustomButton = (props: any) => { ... }
```

### 5. Accessibility First

```tsx
// ✅ Good - Proper labels and ARIA
<div>
  <label htmlFor="email">Email Address</label>
  <Input id="email" type="email" aria-required="true" />
</div>

<Button aria-label="Close menu" size="icon">
  <IconClose />
</Button>

// ❌ Bad - Missing accessibility
<input type="email" />
<button><IconClose /></button>
```

---

## Adding New Components

When creating new components:

1. **Use CVA for variants**
```tsx
const componentVariants = cva(
  "base-styles",
  {
    variants: { ... },
    defaultVariants: { ... }
  }
);
```

2. **Extend from Radix UI** (when applicable)
```tsx
import * as PrimitiveName from "@radix-ui/react-primitive-name";
```

3. **Export from index**
```tsx
// src/components/ui/index.ts
export { NewComponent } from './new-component';
```

4. **Document with examples** in this file

5. **Add to landing pages** as needed

---

## Resources

- [Radix UI Docs](https://www.radix-ui.com/)
- [CVA Docs](https://cva.style/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Component-Driven Development](https://www.componentdriven.org/)
