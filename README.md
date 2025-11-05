# EcoMate Frontend

Landing pages với A/B Testing được xây dựng với Next.js 14+ (App Router)

## 🚀 Features

- ✅ **Next.js 16** với App Router & Turbopack
- ✅ **TypeScript** cho type safety
- ✅ **Tailwind CSS v4** cho styling
- ✅ **Component-Driven Development (CDD)** với Radix UI
- ✅ **A/B Testing** với middleware
- ✅ **3 Landing Page Variants**:
  - **Variant A**: Professional & Trust-focused (stats, credibility)
  - **Variant B**: Emotional & Impact-focused (urgency, stories)
  - **Variant C**: Simple & Action-focused (minimalist, clear CTA)
- ✅ **Base Components Library** (10 components):
  - Button (7 variants, 5 sizes)
  - Input (3 variants, 3 sizes)
  - Card (compound component)
  - Dialog (Radix UI powered)
  - Checkbox, RadioGroup, Switch
  - Select (dropdown)
  - Tooltip
  - Label
- ✅ **Storybook** - Component documentation & playground
- ✅ **Jest + Testing Library** - 29 tests passing
- ✅ **Design Tokens** (colors, typography, spacing)
- ✅ **Analytics Tracking** system
- ✅ **Cookie-based** user assignment
- ✅ **Edge Middleware** cho performance

## 📁 Cấu trúc Project

```
ecomate-fe/
├── src/
│   ├── app/
│   │   ├── landing/
│   │   │   └── [variant]/
│   │   │       └── page.tsx       # Dynamic variant page
│   │   ├── api/
│   │   │   └── analytics/
│   │   │       └── route.ts       # Analytics API endpoint
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home (redirects to /landing)
│   │   └── globals.css            # Global styles + Design tokens
│   ├── components/
│   │   ├── ui/                    # Base component library (CDD)
│   │   │   ├── button.tsx         # Button component
│   │   │   ├── input.tsx          # Input component
│   │   │   ├── card.tsx           # Card compound component
│   │   │   ├── dialog.tsx         # Dialog (Radix UI)
│   │   │   └── index.ts           # Exports
│   │   └── landing/
│   │       ├── VariantA.tsx       # Variant A (uses base components)
│   │       ├── VariantB.tsx       # Variant B (uses base components)
│   │       └── VariantC.tsx       # Variant C (uses base components)
│   └── lib/
│       ├── ab-testing/
│       │   └── index.ts           # A/B testing logic
│       ├── analytics/
│       │   └── index.ts           # Analytics utilities
│       └── utils.ts               # cn() helper for class merging
├── middleware.ts                   # Edge middleware for A/B routing
├── tailwind.config.ts              # Design tokens + theme
├── tsconfig.json
├── COMPONENTS.md                   # Component library documentation
└── package.json
```

## 🎯 A/B Testing Flow

1. **User visits `/`** → Redirects to `/landing`
2. **Middleware checks cookie** `ab_variant`
   - If exists → Route to assigned variant
   - If not → Assign variant based on weights (A:34%, B:33%, C:33%)
3. **User sees variant** → Variant A, B, or C
4. **Conversion tracked** → Analytics API logs events

## 🛠️ Setup & Development

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

### Build for production
```bash
npm run build
npm start
```

### Run Storybook
```bash
npm run storybook
```

Visit [http://localhost:6006](http://localhost:6006) to view component library.

### Run Tests
```bash
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

## 🧪 Testing Variants

### Xem variant cụ thể:
- Variant A: `http://localhost:3000/landing/A`
- Variant B: `http://localhost:3000/landing/B`
- Variant C: `http://localhost:3000/landing/C`

### Test A/B routing:
1. Mở `http://localhost:3000/` trong incognito mode
2. Check console log để xem variant được assign
3. Xóa cookies và reload để được assign variant mới
4. Check cookie `ab_variant` trong DevTools

## 📊 Analytics

### Track events:
```typescript
import { trackEvent, trackConversion } from '@/lib/analytics';

// Track conversion
trackConversion('A', 'user@example.com');

// Track custom event
trackEvent('cta_click', { variant: 'B', location: 'hero' });
```

### API endpoint:
- POST `/api/analytics` - Receive analytics events

## ⚙️ Configuration

### Thay đổi variant weights:
Edit `src/lib/ab-testing/index.ts`:
```typescript
export const DEFAULT_AB_CONFIG: ABTestConfig = {
  variants: ['A', 'B', 'C'],
  weights: {
    A: 50,  // 50%
    B: 30,  // 30%
    C: 20,  // 20%
  },
};
```

### Thêm variant mới:
1. Tạo `src/components/landing/VariantD.tsx`
2. Update `src/app/landing/[variant]/page.tsx`
3. Update `src/lib/ab-testing/index.ts` với variant 'D'

## 🎨 Variant Differences

| Feature | Variant A | Variant B | Variant C |
|---------|-----------|-----------|-----------|
| **Theme** | Professional | Emotional | Minimalist |
| **Colors** | Green/Blue pastel | Dark green gradient | Clean white |
| **Messaging** | Trust & Stats | Urgency & Impact | Simple & Direct |
| **CTA** | "Get Started" | "Join the Movement" | "Start Free Today" |
| **Social Proof** | Numbers & ratings | Testimonials & stories | Company logos |

## 🧩 Component Library (CDD)

Project này sử dụng **Component-Driven Development (CDD)** pattern với base components được xây dựng trên **Radix UI**.

### Available Components:

#### Button
```tsx
import { Button } from '@/components/ui';

// 7 variants: default, primary, secondary, ghost, outline, destructive, link
<Button variant="primary" size="lg">Sign Up</Button>
```

#### Input
```tsx
import { Input } from '@/components/ui';

// 3 variants: default, error, success
<Input inputSize="lg" placeholder="Enter email" />
```

#### Card
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

<Card variant="elevated" hover="lift">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

#### Dialog
```tsx
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>Content here</DialogContent>
</Dialog>
```

### Features:
- ✅ **Radix UI primitives** - Accessibility built-in
- ✅ **CVA (Class Variance Authority)** - Type-safe variants
- ✅ **Composable** - Combine để tạo complex UIs
- ✅ **Full TypeScript support**
- ✅ **Tailwind CSS** styling với design tokens

📖 **Full documentation:** See [COMPONENTS.md](./COMPONENTS.md)

## 📈 Next Steps

- [ ] Integrate Google Analytics 4
- [ ] Connect to database for analytics
- [ ] Add more landing page variants
- [ ] Implement email capture backend
- [ ] Add loading states
- [ ] Implement error boundaries
- [ ] Add SEO metadata per variant
- [ ] Setup Vercel Edge Config
- [ ] Add conversion funnel tracking
- [ ] Implement heatmap tracking

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other platforms
Build and deploy the `.next` folder:
```bash
npm run build
```

## 📝 License

ISC
