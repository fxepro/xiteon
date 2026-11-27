# Xiteon website

Marketing site for xiteon.com. Next.js 16 (App Router), TypeScript, plain CSS.
Design follows the mockups in `../index.html` (Noto Serif Light + DM Sans, orange/lime palette).

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Structure

| Path | What |
|---|---|
| `src/lib/content.ts` | Copy for services, audiences, expert areas and tiers. Edit text here. |
| `src/app/page.tsx` | Home |
| `src/app/solutions/[audience]` | ai-labs, enterprises, ai-startups |
| `src/app/services/[slug]` | rl-environments, expert-data, evals, deployment-readiness, indic-data |
| `src/app/join`, `contact`, `trust`, `impact`, `about`, `privacy` | Other pages |
| `src/components` | Nav, Footer, Hero/Blobs, Reveal, Icon, Blocks, Forms |
| `public/__forms.html` | Netlify Forms definitions for the `lead` and `apply` forms |
| `netlify.toml` | Netlify build settings, headers and redirects |

## Deploying

Hosted on Netlify, deploying automatically from `main`. See **[DEPLOY.md](DEPLOY.md)** for first-time setup, forms, the custom domain and the launch checklist.

## Before launch

- **Forms:** handled by Netlify Forms. In local dev, submissions are only logged to the console. If you add a form field, add it to `public/__forms.html` too.
- **Placeholders:** orange dashed `.ph` chips mark content still needed: pay ranges, stats, case study, team, certifications, booking link. Search for `className="ph"`.
- **Privacy notice:** `/privacy` is a draft and needs legal review (DPDP Act 2023).
- **Not built yet:** Industries pages, blog/resources, analytics, Hindi and regional-language versions.
