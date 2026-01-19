# Atheryon Website

Corporate website for Atheryon - AI-Driven Data for Leading Financial Institutions.

**Production URL:** https://www.atheryon.com.au

## Tech Stack

- **Frontend:** Static HTML/CSS/JS (single-page site)
- **Hosting:** Azure Static Web Apps
- **CI/CD:** GitHub Actions
- **Testing:** Playwright

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
npm install
```

### Run Locally

```bash
npm run serve
```

Opens at http://localhost:3000

### Run Tests

```bash
npm test                 # Run all tests
npm run test:chromium    # Run Chromium only
npm run test:headed      # Run with browser visible
npm run test:ui          # Interactive UI mode
```

## Deployment

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub Repository                         │
│                                                                  │
│   ┌──────────┐    PR    ┌──────────┐   merge   ┌──────────┐    │
│   │   dev    │ ───────► │    PR    │ ────────► │   main   │    │
│   └──────────┘          └──────────┘           └──────────┘    │
│                              │                       │          │
└──────────────────────────────┼───────────────────────┼──────────┘
                               │                       │
                               ▼                       ▼
                    ┌──────────────────┐    ┌──────────────────┐
                    │  Preview Environment│    │    Production    │
                    │  (auto-generated)  │    │ atheryon.com.au  │
                    └──────────────────┘    └──────────────────┘
```

### Automatic Deployment

Deployments are fully automated via GitHub Actions:

| Trigger | Action | Environment |
|---------|--------|-------------|
| Push to `main` | Auto-deploy | Production (atheryon.com.au) |
| Open/Update PR | Auto-deploy | Preview (unique URL per PR) |
| Close PR | Teardown | Preview environment removed |

### Deploy to Production

**Option 1: Direct push to main**
```bash
git add .
git commit -m "Your changes"
git push origin main
```

**Option 2: Using the workflow script**
```bash
# 1. Make changes on dev branch
git checkout dev

# 2. Create preview PR
./dev-workflow.sh preview

# 3. Review preview URL (posted in PR comments)
./dev-workflow.sh status

# 4. When ready, publish to production
./dev-workflow.sh publish
```

### Workflow Commands

| Command | Description |
|---------|-------------|
| `./dev-workflow.sh preview` | Create/view PR with staging environment |
| `./dev-workflow.sh status` | Check current preview URL |
| `./dev-workflow.sh publish` | Merge to main (deploy to production) |
| `./dev-workflow.sh sync` | Sync dev branch with main |

## Configuration Files

| File | Purpose |
|------|---------|
| `staticwebapp.config.json` | Azure SWA routing & caching rules |
| `.github/workflows/*.yml` | CI/CD pipeline configuration |
| `playwright.config.ts` | Test runner configuration |

### Azure Static Web Apps Config

```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  },
  "globalHeaders": {
    "Cache-Control": "public, max-age=3600"
  }
}
```

## Project Structure

```
atheryon-website/
├── index.html              # Main website (single page)
├── assets/
│   └── logo.png            # Logo and images
├── tests/
│   ├── homepage.spec.ts    # Homepage content tests
│   ├── accessibility.spec.ts
│   ├── responsive.spec.ts
│   └── visual.spec.ts      # Visual regression tests
├── staticwebapp.config.json
├── playwright.config.ts
├── package.json
└── dev-workflow.sh         # Development workflow helper
```

## Testing

The test suite includes:

- **Homepage Tests:** Content verification, navigation, sections
- **Accessibility Tests:** WCAG compliance checks
- **Responsive Tests:** Mobile, tablet, desktop layouts
- **Visual Tests:** Screenshot regression testing

Generate visual test baselines:
```bash
npm run test:chromium -- --update-snapshots
```

## Environment URLs

| Environment | URL |
|-------------|-----|
| Production | https://www.atheryon.com.au |
| Preview | Auto-generated per PR (check PR comments) |
| Local | http://localhost:3000 |

## License

Copyright 2025 Atheryon. A Direct2Client Company.
