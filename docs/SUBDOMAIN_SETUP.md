# Multi-Subdomain Setup Guide

## Architecture Overview

```
ecomate.vn                 → Main website
variant-a.ecomate.vn       → Variant A Landing Page
variant-b.ecomate.vn       → Variant B Landing Page
variant-c.ecomate.vn       → Variant C Landing Page
variant-d.ecomate.vn       → Variant D Landing Page
```

## Implementation Strategy

**Single Next.js App with Subdomain Routing** ✅

Benefits:
- ✅ Share components (Header, Footer, UI)
- ✅ Single deployment
- ✅ Easy maintenance
- ✅ Consistent styling
- ✅ Centralized analytics
- ✅ No code duplication

## Step 1: Update Next.js Config

Add subdomain configuration to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

## Step 2: Create Middleware for Subdomain Detection

File: `src/middleware.ts`

**Note**: Next.js 16 introduces a new "proxy.ts" convention, but we use "middleware.ts" for better Vercel compatibility until their build infrastructure fully supports the new convention.

The middleware will:
1. Extract subdomain from request
2. Rewrite URL to appropriate variant
3. Preserve query params

## Step 3: Create Subdomain-Specific Routes

Structure:
```
app/
├── page.tsx                    # Main site (ecomate.vn)
├── variant-a/
│   └── page.tsx               # variant-a.ecomate.vn
├── variant-b/
│   └── page.tsx               # variant-b.ecomate.vn
├── variant-c/
│   └── page.tsx               # variant-c.ecomate.vn
└── variant-d/
    └── page.tsx               # variant-d.ecomate.vn
```

## Step 4: DNS Configuration

### For Vercel/Netlify (Recommended):

1. Add domains in dashboard:
   - `variant-a.ecomate.vn`
   - `variant-b.ecomate.vn`
   - `variant-c.ecomate.vn`
   - `variant-d.ecomate.vn`

2. DNS Records (at domain registrar):
   ```
   Type    Name        Value
   CNAME   variant-a   cname.vercel-dns.com
   CNAME   variant-b   cname.vercel-dns.com
   CNAME   variant-c   cname.vercel-dns.com
   CNAME   variant-d   cname.vercel-dns.com
   ```

### For Custom Hosting:

1. Nginx Configuration:
   ```nginx
   server {
       server_name variant-a.ecomate.vn;
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
       }
   }
   ```

2. DNS A Records:
   ```
   Type    Name        Value
   A       variant-a   YOUR_SERVER_IP
   A       variant-b   YOUR_SERVER_IP
   A       variant-c   YOUR_SERVER_IP
   A       variant-d   YOUR_SERVER_IP
   ```

## Step 5: Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_MAIN_DOMAIN=ecomate.vn
NEXT_PUBLIC_SUBDOMAIN_A=variant-a.ecomate.vn
NEXT_PUBLIC_SUBDOMAIN_B=variant-b.ecomate.vn
NEXT_PUBLIC_SUBDOMAIN_C=variant-c.ecomate.vn
NEXT_PUBLIC_SUBDOMAIN_D=variant-d.ecomate.vn
```

## Alternative: Monorepo Setup (NOT RECOMMENDED for your case)

Only consider if:
- Different tech stacks per variant
- Separate teams per variant
- Independent deployment schedules
- Need to scale services independently

Structure would be:
```
apps/
├── variant-a/          # Separate Next.js app
├── variant-b/          # Separate Next.js app
├── variant-c/          # Separate Next.js app
└── variant-d/          # Separate Next.js app
packages/
├── ui/                 # Shared components
└── config/            # Shared configs
```

Tools: Turborepo, Nx, Lerna

**Cons:**
- More complex setup
- Duplicate dependencies
- Harder to sync changes
- More build time
- More deployment overhead

## Recommended Approach

**✅ Use Single App + Middleware**

Reasons:
1. You already have shared components
2. Same tech stack (Next.js)
3. Easier A/B testing analytics
4. Single deployment = faster iterations
5. No code duplication
6. Simpler CI/CD

## Testing Locally

Add to `/etc/hosts` (Mac/Linux) or `C:\Windows\System32\drivers\etc\hosts` (Windows):

```
127.0.0.1 variant-a.localhost
127.0.0.1 variant-b.localhost
127.0.0.1 variant-c.localhost
127.0.0.1 variant-d.localhost
```

Then access:
- http://variant-a.localhost:3000
- http://variant-b.localhost:3000
- etc.

## Deployment Checklist

- [ ] Update Next.js config
- [ ] Implement middleware
- [ ] Create subdomain routes
- [ ] Test locally with /etc/hosts
- [ ] Configure DNS records
- [ ] Add domains to hosting provider
- [ ] Test SSL certificates
- [ ] Update analytics to track subdomains
- [ ] Update sitemap.xml

## Analytics Tracking

Update your analytics to include subdomain:

```javascript
gtag('config', 'GA_MEASUREMENT_ID', {
  'page_path': window.location.pathname,
  'page_location': window.location.href,
  'subdomain': window.location.hostname.split('.')[0]
});
```

## Sitemap Generation

Include all subdomains in sitemap:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://variant-a.ecomate.vn/</loc>
  </url>
  <url>
    <loc>https://variant-b.ecomate.vn/</loc>
  </url>
  <url>
    <loc>https://variant-c.ecomate.vn/</loc>
  </url>
  <url>
    <loc>https://variant-d.ecomate.vn/</loc>
  </url>
</urlset>
```

## Cost Comparison

**Single App:**
- 1 hosting instance
- 1 domain + 4 subdomains
- 1 SSL certificate (wildcard)
- Total: ~$10-30/month

**Monorepo (4 apps):**
- 4 hosting instances OR 1 with 4x resources
- 1 domain + 4 subdomains
- 1 SSL certificate (wildcard)
- Total: ~$40-120/month

## Conclusion

**Recommendation: Stick with Single App + Middleware Routing**

This approach:
- Saves money
- Faster development
- Easier maintenance
- Better DX (Developer Experience)
- Your current architecture already supports it
