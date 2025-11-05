# Subdomain Quick Start Guide

## 🚀 Your Setup is READY!

Good news: **You DON'T need monorepo!** Your current architecture already supports multi-subdomain routing.

## ✅ What's Already Done

1. ✅ **Middleware Created**: `/src/middleware.ts`
   - Auto-detects subdomains
   - Routes to correct variant
   - Works locally and in production
   - **Note**: Using `middleware.ts` (not `proxy.ts`) for Vercel compatibility

2. ✅ **Landing Pages Exist**: `/src/app/landing/[variant]/page.tsx`
   - Variant A, B, C, D already created
   - Shared Header & Footer
   - Optimized with 8pt spacing

3. ✅ **Components Shared**: `/src/components/common/`
   - Header with animations
   - Footer with SEO content
   - No duplication needed

## 🎯 Subdomain Mapping

```
variant-a.ecomate.vn  →  Shows Variant A (Professional)
variant-b.ecomate.vn  →  Shows Variant B (Emotional)
variant-c.ecomate.vn  →  Shows Variant C (Simple)
variant-d.ecomate.vn  →  Shows Variant D (Premium 3D)
```

## 🧪 Test Locally (5 Minutes)

### Step 1: Edit Hosts File

**Mac/Linux:**
```bash
sudo nano /etc/hosts
```

**Windows:**
```
notepad C:\Windows\System32\drivers\etc\hosts
```

Add these lines:
```
127.0.0.1 variant-a.localhost
127.0.0.1 variant-b.localhost
127.0.0.1 variant-c.localhost
127.0.0.1 variant-d.localhost
```

### Step 2: Start Dev Server

```bash
npm run dev
```

### Step 3: Visit URLs

- http://variant-a.localhost:3000 → Variant A
- http://variant-b.localhost:3000 → Variant B
- http://variant-c.localhost:3000 → Variant C
- http://variant-d.localhost:3000 → Variant D

**Magic!** The middleware automatically detects the subdomain and shows the right variant.

## 🌐 Deploy to Production

### Option 1: Vercel (Easiest - 10 minutes)

1. **Deploy to Vercel:**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Add Domains in Vercel Dashboard:**
   - Go to Project → Settings → Domains
   - Add:
     - `variant-a.ecomate.vn`
     - `variant-b.ecomate.vn`
     - `variant-c.ecomate.vn`
     - `variant-d.ecomate.vn`

3. **Configure DNS at Domain Registrar:**
   ```
   Type    Name        Value                      TTL
   CNAME   variant-a   cname.vercel-dns.com.     3600
   CNAME   variant-b   cname.vercel-dns.com.     3600
   CNAME   variant-c   cname.vercel-dns.com.     3600
   CNAME   variant-d   cname.vercel-dns.com.     3600
   ```

4. **Done!** Vercel auto-provisions SSL. Wait 5-10 minutes for DNS propagation.

### Option 2: Netlify (Similar to Vercel)

1. Deploy: `netlify deploy --prod`
2. Add domains in Netlify dashboard
3. Configure DNS with CNAME records

### Option 3: Custom VPS (Advanced)

See full guide: `/docs/SUBDOMAIN_SETUP.md`

## 📊 Verify It Works

Check middleware is working:

```bash
# Should show Variant A page
curl -H "Host: variant-a.ecomate.vn" http://localhost:3000

# Should show Variant B page
curl -H "Host: variant-b.ecomate.vn" http://localhost:3000
```

## 🎨 Customize Per Subdomain (Optional)

If you want subdomain-specific customizations:

### Add Subdomain Detection Hook

Create `/src/hooks/useSubdomain.ts`:

```typescript
export function useSubdomain() {
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');

    if (parts.length >= 2) {
      setSubdomain(parts[0]);
    }
  }, []);

  return subdomain;
}
```

### Use in Components

```typescript
import { useSubdomain } from '@/hooks/useSubdomain';

export default function MyComponent() {
  const subdomain = useSubdomain();

  return (
    <div>
      {subdomain === 'variant-a' && <SpecialOfferA />}
      {subdomain === 'variant-b' && <SpecialOfferB />}
    </div>
  );
}
```

## 📈 Analytics Tracking

Update Google Analytics to track subdomains:

```typescript
// In your analytics file
const subdomain = window.location.hostname.split('.')[0];

gtag('config', 'GA_MEASUREMENT_ID', {
  'page_path': window.location.pathname,
  'custom_map': {
    'dimension1': 'subdomain'
  },
  'subdomain': subdomain
});
```

## 🔍 SEO Considerations

Each subdomain is treated as a separate site by Google:

1. **Separate Sitemaps** (optional):
   - `https://variant-a.ecomate.vn/sitemap.xml`
   - `https://variant-b.ecomate.vn/sitemap.xml`

2. **Canonical URLs**: Add to each variant page:
   ```tsx
   <link rel="canonical" href={`https://${subdomain}.ecomate.vn`} />
   ```

3. **Unique Meta Tags**: Update title/description per variant

## ❓ FAQ

**Q: Do I need separate databases?**
A: No, use one database with a `variant` field.

**Q: Can I A/B test across subdomains?**
A: Yes! Track which subdomain users came from in analytics.

**Q: What about www.ecomate.vn?**
A: Add redirect in middleware or DNS to main site.

**Q: SSL certificates?**
A: Vercel/Netlify auto-provision. For custom hosting, use Let's Encrypt wildcard cert: `*.ecomate.vn`

**Q: Cost?**
A: Same as single domain! Most hosts allow unlimited subdomains.

**Q: Should I use monorepo?**
A: NO! Your current setup is perfect. Monorepo adds complexity without benefits.

## 🎉 Summary

**What You Have Now:**

✅ Single codebase
✅ 4 landing page variants
✅ Automatic subdomain routing
✅ Shared components (no duplication)
✅ Ready to deploy

**What You DON'T Need:**

❌ Monorepo
❌ Multiple deployments
❌ Code duplication
❌ Complex orchestration

**Next Steps:**

1. Test locally with /etc/hosts
2. Deploy to Vercel/Netlify
3. Add domains in hosting dashboard
4. Configure DNS
5. Done! ✨

## 📞 Need Help?

See full technical guide: `/docs/SUBDOMAIN_SETUP.md`
