# Product Operating System

An interactive Next.js demo showcasing a four-engine Product Operating System that drives systematic AI and product management tooling adoption across portfolio companies. Built as a self-guided walkthrough, the demo illustrates how accountability mechanisms transform post-investment engagement—from diagnostic assessment through governance—turning decisions into shipped engineering artifacts.

## Four Engines

| Engine | Focus | Demo Act |
|--------|-------|----------|
| **Engine 1 — Diagnostic** | Maturity assessment synthesizing interviews, NPS, support tickets & usage analytics | Act 1 (2 min) |
| **Engine 2 — Prioritization** | Weighted scoring with explicit reasoning, trade-off analysis & stakeholder input | Act 2 (3 min) |
| **Engine 3 — Execution** | PRD generation, epic/story structures, collaboration workflows & time-reduction metrics | Act 3 (3 min) |
| **Engine 4 — Governance** | 90-day plans, KPI dashboards, escalation triggers & cross-portfolio intelligence | Act 4 (2 min) |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Primitives**: Radix UI
- **Charts**: Recharts
- **Database**: MongoDB Atlas (optional — mock data works standalone)
- **Testing**: Jest + React Testing Library, Playwright (E2E)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` as needed. Key variables:

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_PE_FIRM_NAME` | `[PE Firm]` | PE firm display name |
| `NEXT_PUBLIC_PORTFOLIO_CO_NAME` | `[Portfolio Co]` | Portfolio company display name |
| `NEXT_PUBLIC_PRODUCT_NAME` | `[Software]` | Product display name |
| `NEXT_PUBLIC_DEVELOPER_NAME` | `developer` | Developer attribution |
| `NEXT_PUBLIC_CEO_NAME` | `[CEO Name]` | CEO name in scenario |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | *(empty)* | Google Analytics 4 ID |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | *(empty)* | Microsoft Clarity ID |
| `MONGODB_URI` | *(empty)* | MongoDB Atlas connection string |

### 3. Seed the database (optional)

If using MongoDB Atlas, create an M0 (free-tier) cluster, add the connection string to `MONGODB_URI`, allowlist your IP, then run:

```bash
npm run seed
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm test` | Run unit/integration tests |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run seed` | Seed MongoDB with mock scenario data |
| `npm run lint` | Lint with ESLint |

## Deployment

Deployed on **Render** at subdomain `product-os.frederickli.pro`. Set all required environment variables in the Render dashboard and run `npm run build` as the build command.

## Project Structure

```
src/
├── app/              # Next.js App Router pages (dashboard + engine routes)
├── components/       # UI components organized by engine, layout, guided, shared
├── context/          # React Context providers (demo flow, theme)
├── data/mock/        # Embedded mock data (interviews, tickets, NPS, analytics)
├── data/seed/        # Database seed script
├── hooks/            # Custom hooks (analytics, progress, traceability)
├── lib/              # Utilities (analytics, DB, env config, company names)
└── types/            # TypeScript type definitions
tests/
├── unit/             # Jest unit tests
├── integration/      # Integration tests (analytics, DB, env, performance)
└── e2e/              # Playwright end-to-end tests
```
