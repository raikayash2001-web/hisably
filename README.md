# HISABLY – Phase 1 Foundation

This is the first code-first prototype for HISABLY.

## Included
- Existing HISABLY visual direction recreated as a clean card-based UI
- Next.js App Router + TypeScript
- Home page with tool categories
- GST Calculator as Tool #1
- Add GST and Remove/Reverse GST
- CGST + SGST / IGST display
- Custom GST rate
- Copy result + reset
- SEO metadata
- Canonical URL
- WebApplication JSON-LD
- sitemap.xml
- robots.txt
- About / Contact / Privacy / Terms / Disclaimer foundation

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production test

Vercel deployment is configured for the Phase 1 frontend-only build. No backend or AI API key is required for Phase 1.


```bash
npm run build
npm start
```

## Important
The production domain is currently set to `https://hisably.com` in metadata/sitemap. Change it if the final domain is different.

GST rates and tax treatment should be verified against current official GST/CBIC information before production launch. This prototype intentionally keeps a Custom Rate option.

## Next phase
Before adding all 120 tools, review:
1. UI against the approved HISABLY design reference
2. Calculation accuracy with test cases
3. SEO copy and keyword mapping
4. Accessibility and mobile UX
5. Technical SEO
6. AdSense placement strategy after the content/policy pages are finalized
