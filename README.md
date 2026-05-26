# CareToken AI 🏥🪙

> AI-powered healthcare funding through tokenization.  
> Swarms Marketplace compatible · Frenzy Mode enabled · One-click Vercel deploy.

---

## What it does

CareToken AI transforms patient recovery stories into transparent, AI-generated funding campaigns. Enter basic patient info and the agent produces:

- Plain-language **medical summary**
- Phase-by-phase **recovery milestones**
- **Funding allocation** explanation
- **Swarms Marketplace** campaign listing
- **Frenzy Mode** token utility description

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom CSS vars |
| AI | OpenAI GPT-4o (server-side only) |
| Deploy | Vercel |
| Marketplace | Swarms |

---

## Local Setup

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/caretoken-ai.git
cd caretoken-ai
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your key:

```
OPENAI_API_KEY=sk-...
```

> ⚠️ Never commit `.env.local`. It's already in `.gitignore`.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
caretoken-ai/
├── app/
│   ├── layout.tsx                    # Root layout + Nav
│   ├── globals.css                   # Design system
│   ├── page.tsx                      # Landing page
│   ├── create/
│   │   └── page.tsx                  # Campaign form
│   ├── results/
│   │   └── page.tsx                  # AI results display
│   └── api/
│       └── generate-profile/
│           └── route.ts              # ← API route (uses OPENAI_API_KEY)
├── components/
│   └── Nav.tsx
├── lib/
│   └── caretoken-agent.ts            # Agent metadata + types + runner
├── .env.local.example
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

> **Security**: `OPENAI_API_KEY` is only used in `app/api/generate-profile/route.ts`.  
> It is never sent to or accessible from the browser.

---

## Vercel Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial CareToken AI"
git remote add origin https://github.com/YOUR_USERNAME/caretoken-ai.git
git push -u origin main
```

### 2. Import on Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)

### 3. Add environment variable

In Vercel dashboard → **Project → Settings → Environment Variables**:

| Name | Value |
|---|---|
| `OPENAI_API_KEY` | `sk-...` |

### 4. Deploy

Click **Deploy**. Vercel builds and publishes automatically.  
You'll receive a `*.vercel.app` URL.

---

## Swarms Marketplace Integration

### 1. Register your agent

- Go to [swarms.world](https://swarms.world)
- Create a new agent listing

### 2. Paste agent metadata

The metadata is in `lib/caretoken-agent.ts` → `caretokenAgentMetadata`.  
The API route also returns per-campaign metadata in `agentMetadata`.

Key flags:
```json
{
  "tokenizable": true,
  "frenzyMode": true,
  "category": "healthcare"
}
```

### 3. Set your API endpoint

```
POST https://your-app.vercel.app/api/generate-profile
```

### 4. Marketplace listing text

The full listing copy is exported from `lib/caretoken-agent.ts` → `swarmsMarketplaceListing`.

---

## API Reference

### `POST /api/generate-profile`

**Request body:**
```json
{
  "nickname": "Alex",
  "age": "34",
  "condition": "Stage 2 Kidney Disease",
  "symptoms": "Chronic fatigue, swelling, reduced kidney function",
  "treatment": "Dialysis 3x/week, transplant evaluation",
  "fundingGoal": "45000",
  "notes": "Optional additional context"
}
```

**Response:**
```json
{
  "medicalSummary": "...",
  "recoveryMilestones": [
    { "phase": "...", "timeframe": "...", "goal": "...", "icon": "💊" }
  ],
  "fundingSummary": "...",
  "swarmsCampaignSummary": "...",
  "tokenUtilitySummary": "...",
  "agentMetadata": { ... }
}
```

---

## License

MIT — built for the Swarms ACM Hackathon.
