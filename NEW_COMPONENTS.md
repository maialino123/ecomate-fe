# New Components Added

## Checkbox

Accessible checkbox built on Radix UI.

```tsx
import { Checkbox } from '@/components/ui';

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms</label>
</div>
```

## RadioGroup

Radio button group for mutually exclusive options.

```tsx
import { RadioGroup, RadioGroupItem, Label } from '@/components/ui';

<RadioGroup defaultValue="option-1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-1" id="opt1" />
    <Label htmlFor="opt1">Option 1</Label>
  </div>
</RadioGroup>
```

## Switch

Toggle switch component.

```tsx
import { Switch, Label } from '@/components/ui';

<div className="flex items-center space-x-2">
  <Switch id="airplane" />
  <Label htmlFor="airplane">Airplane Mode</Label>
</div>
```

## Select

Dropdown select component.

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

## Tooltip

Information tooltip on hover.

```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Tooltip text</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Label

Accessible label for form inputs.

```tsx
import { Label } from '@/components/ui';

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

---

## Testing

All components have Jest + React Testing Library tests:

```bash
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

## Storybook

View and interact with all components:

```bash
npm run storybook       # Start Storybook on port 6006
```

Visit http://localhost:6006 to see all component variations.
