# Atheryon Website

Corporate website for Atheryon - From AI potential to production reality.

## Environments

| Environment | URL | Branch | Deployment |
|-------------|-----|--------|------------|
| **Local Dev** | http://localhost:3000 | any | Manual (`npm run dev`) |
| **Test** | https://icy-tree-093dcc800.6.azurestaticapps.net | `dev` | Auto on push |
| **Production** | https://www.atheryon.com.au | `main` | Manual (disabled) |

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Azure Static Web Apps
- **CI/CD:** GitHub Actions
- **Testing:** Playwright

## Quick Start

### Prerequisites

- Node.js 20+
- npm

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Opens at http://localhost:3000

### Preview Production Build

```bash
npm run preview
```

Builds and serves the static export at http://localhost:3000

## Deployment Process

| | DEV | TEST | PROD |
|---|---|---|---|
| **Environment** | Local | Azure Static Web Apps | Azure Static Web Apps |
| **URL** | http://localhost:3000 | https://icy-tree-093dcc800.6.azurestaticapps.net | https://www.atheryon.com.au |
| **Branch** | Any | `dev` | `main` |
| **Trigger** | Manual | Auto on push | Disabled |
| **Command** | `npm run dev` | `git push origin dev` | — |

---

### 1. DEV (Local Development)

Run the site locally for development and testing.

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Build and preview production build locally
npm run preview
```

**URL:** http://localhost:3000

---

### 2. TEST (Azure Staging)

Deploy to Azure Static Web Apps for testing. **Not visible on www.atheryon.com.au.**

#### Quick Deploy
```bash
git checkout dev
git add .
git commit -m "Your changes"
git push origin dev
```

#### What Happens
1. GitHub Action triggers on push to `dev` branch
2. Installs dependencies (`npm ci`)
3. Builds Next.js site (`npm run build`)
4. Deploys static files to Azure Static Web Apps

#### Test URL
**https://icy-tree-093dcc800.6.azurestaticapps.net**

#### Workflow File
`.github/workflows/deploy-test.yml`

#### Required Secret
`AZURE_STATIC_WEB_APPS_API_TOKEN_ICY_TREE_093DCC800` (already configured)

---

### 3. PROD (Production)

Deploy to the live production site. **Currently disabled.**

#### Status: DISABLED

Production deployment to www.atheryon.com.au is disabled by default to prevent accidental deployments.

#### To Enable Production Deployments

1. **Create Azure Static Web App** for production in Azure Portal
2. **Add GitHub Secret:** `AZURE_STATIC_WEB_APPS_API_TOKEN_PRODUCTION`
3. **Configure Custom Domain:** Add `www.atheryon.com.au` in Azure Portal
4. **Enable Workflow:** Uncomment the trigger in `.github/workflows/deploy-production.yml`:
   ```yaml
   on:
     push:
       branches:
         - main
   ```

#### Production URL
**https://www.atheryon.com.au** (when enabled)

#### Workflow File
`.github/workflows/deploy-production.yml`

## Project Structure

```
atheryon-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home page
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles
│   │   ├── how-we-work/
│   │   ├── what-we-deliver/
│   │   ├── recovery-migration/
│   │   ├── reference-architectures/
│   │   ├── ai-ready-data/
│   │   ├── about/
│   │   └── contact/
│   ├── components/             # Reusable components
│   │   ├── Hero.tsx
│   │   ├── Section.tsx
│   │   ├── Card.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   └── content/
│       └── site.ts             # Centralized content (all copy)
├── public/
│   ├── logo.png
│   ├── robots.txt
│   └── sitemap.xml
├── .github/
│   └── workflows/
│       ├── deploy-test.yml     # Test environment deployment
│       └── deploy-production.yml # Production deployment (disabled)
├── staticwebapp.config.json    # Azure SWA routing config
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production (outputs to `/out`) |
| `npm run preview` | Build and serve production locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run Playwright tests |
| `npm run deploy:test` | Push to dev branch (triggers test deploy) |

## Content Management

All website copy is centralized in `src/content/site.ts`. To update content:

1. Edit `src/content/site.ts`
2. The changes will reflect across all pages
3. No hardcoded strings in page components

## Configuration Files

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js configuration (static export) |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `staticwebapp.config.json` | Azure SWA routing & headers |
| `tsconfig.json` | TypeScript configuration |
| `.github/workflows/*.yml` | CI/CD pipelines |

## Testing

```bash
npm test                 # Run all tests
npm run test:headed      # Run with browser visible
npm run test:ui          # Interactive UI mode
```

## License

Copyright 2025 Atheryon. All rights reserved.
