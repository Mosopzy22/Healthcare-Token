# ═══════════════════════════════════════════════════════════════════
# CARETOKEN AI — SWARMS MARKETPLACE LISTING CONTENT
# Copy-paste each section into the matching field on swarms.world
# ═══════════════════════════════════════════════════════════════════


# ── AGENT NAME ──────────────────────────────────────────────────────
CareToken AI


# ── SHORT TAGLINE (shown under name on card) ─────────────────────────
AI-powered healthcare recovery funding through tokenization.


# ── CATEGORY ────────────────────────────────────────────────────────
Healthcare


# ── TAGS ────────────────────────────────────────────────────────────
healthcare, funding, recovery, tokenization, ai-agent, frenzy, medical, campaign


# ══════════════════════════════════════════════════════════════════════
# TAB 1 — OVERVIEW
# ══════════════════════════════════════════════════════════════════════

## CareToken AI

AI-powered healthcare recovery funding through tokenization.
Turn any patient's recovery journey into a transparent,
AI-generated campaign that supporters can understand and fund.

---

## What It Does

CareToken AI is an AI healthcare funding agent that transforms
patient recovery stories into tokenized campaigns for the Swarms
Marketplace. It generates:

- **AI Medical Summary** — plain-language explanation of the condition,
  symptoms, and treatment path. No jargon. Hopeful tone.

- **Recovery Milestones** — a phase-by-phase care timeline so supporters
  see exactly how their contribution moves the patient forward.

- **Funding Breakdown** — clear explanation of how every dollar is used
  and what impact it creates.

- **Swarms Campaign Listing** — ready-to-publish agent card copy,
  formatted for the Swarms Marketplace.

- **Frenzy Mode Token Utility** — explains how tokenization works for
  the campaign, what supporters receive, and how tokens map to
  milestone progress.

Supports any condition: cancer, kidney disease, rare disorders,
surgical recovery, mental health treatment, and more.

---

## How to Use

### Option 1 — Web Demo (Recommended)

Visit the live demo, fill in patient info, and receive the full
AI-generated campaign profile instantly.

```
https://caretoken-ai.vercel.app
```

### Option 2 — Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/caretoken-ai.git
cd caretoken-ai
npm install
cp .env.local.example .env.local
# Add your OPENAI_API_KEY to .env.local
npm run dev
```

Open: http://localhost:3000

### Option 3 — API Direct Call

```bash
curl -X POST https://caretoken-ai.vercel.app/api/generate-profile \
  -H "Content-Type: application/json" \
  -d '{
    "nickname": "Alex",
    "age": "34",
    "condition": "Stage 2 Kidney Disease",
    "symptoms": "Chronic fatigue, swelling, reduced kidney function",
    "treatment": "Dialysis 3x per week, transplant evaluation",
    "fundingGoal": "45000",
    "notes": "Single parent, two children"
  }'
```

---

## API Response Shape

```json
{
  "medicalSummary": "...",
  "recoveryMilestones": [
    {
      "phase": "Initial Stabilization",
      "timeframe": "Week 1–2",
      "goal": "Begin dialysis protocol and stabilize kidney function",
      "icon": "💊"
    }
  ],
  "fundingSummary": "...",
  "swarmsCampaignSummary": "...",
  "tokenUtilitySummary": "...",
  "agentMetadata": {
    "name": "CareToken AI — Alex Recovery Campaign",
    "tokenizable": true,
    "frenzyMode": true,
    "fundingGoal": 45000,
    "category": "healthcare"
  }
}
```

---

## Source

```
https://github.com/YOUR_USERNAME/caretoken-ai
```


# ══════════════════════════════════════════════════════════════════════
# TAB 2 — SUMMARY
# ══════════════════════════════════════════════════════════════════════

CareToken AI is a Swarms-compatible healthcare funding agent that
uses GPT-4o to generate transparent, plain-language recovery
campaigns for patients in need.

Enter a patient's nickname, age, condition, symptoms, treatment
plan, and funding goal. The agent returns a complete campaign
package: medical summary, milestone timeline, funding explanation,
Swarms listing text, and Frenzy Mode token utility description.

Built for the Swarms ACM Hackathon. Category: Healthcare.
Frenzy Mode enabled. Tokenizable and listable for sale.

**Agent Metadata:**
- Name: CareToken AI
- Version: 1.0.0
- Category: healthcare
- Tokenizable: true
- Frenzy Mode: true
- Inputs: patient_nickname, age, condition, symptoms,
           treatment_needed, funding_goal, notes
- Outputs: medicalSummary, recoveryMilestones, fundingSummary,
           swarmsCampaignSummary, tokenUtilitySummary


# ══════════════════════════════════════════════════════════════════════
# TAB 3 — USE CASES
# ══════════════════════════════════════════════════════════════════════

## Use Cases

**1. Cancer Treatment Campaigns**
Generate a full funding campaign for chemotherapy, surgery, or
radiation treatment. The AI produces a compassionate summary and
clear milestone timeline that donors can follow.

**2. Chronic Illness Funding**
Kidney disease, diabetes complications, autoimmune conditions —
CareToken AI translates complex medical situations into simple,
trustworthy campaign copy.

**3. Surgical Recovery**
Patients needing major surgery can launch a campaign in minutes.
The agent explains the procedure, recovery phases, and exactly
how funds will be used.

**4. Rare Disease Awareness**
For conditions most people haven't heard of, the AI generates
accessible explanations that build understanding and encourage
support.

**5. Mental Health Treatment**
Therapy, inpatient care, rehabilitation — CareToken AI generates
campaigns with sensitivity and hope, removing stigma through
clear, warm language.

**6. Pediatric Care**
Parents fundraising for a child's treatment can use any nickname
to protect the child's identity while still telling a compelling,
honest story.

**7. Post-Disaster Medical Recovery**
After accidents or emergencies, families need to move fast.
CareToken AI generates a complete campaign in under 30 seconds.

**8. Swarms Agent Developers**
Use CareToken AI as a base agent. Fork it, extend the prompt,
add payment rails, or integrate with existing healthcare APIs.
The agent metadata and typed outputs make it easy to compose
with other Swarms agents.


# ══════════════════════════════════════════════════════════════════════
# REQUIREMENTS TABLE
# ══════════════════════════════════════════════════════════════════════

Package          | Installation
-----------------|---------------------------
next             | npx create-next-app@latest
openai           | npm install openai
typescript       | included with Next.js
tailwindcss      | included with Next.js
swarms (python)  | pip install swarms


# ══════════════════════════════════════════════════════════════════════
# ENVIRONMENT VARIABLES
# ══════════════════════════════════════════════════════════════════════

Variable         | Required | Description
-----------------|----------|-----------------------------
OPENAI_API_KEY   | Yes      | Your OpenAI API key (GPT-4o)
                 |          | Never exposed to the browser.
                 |          | Server-side only (API route).


# ══════════════════════════════════════════════════════════════════════
# BANNER IMAGE PROMPT
# (Use this prompt in any AI image generator for your banner)
# ══════════════════════════════════════════════════════════════════════

"Professional logo for 'CareToken AI', a healthcare funding AI agent.
Dark background (#04080f). A glowing teal and blue medical cross
merged with a tokenization/blockchain hexagon symbol. Clean, modern,
trustworthy. Text: CareToken AI in white bold Syne font.
Subtitle: AI-Powered Healthcare Funding. Gradient accent: #00e5c8
to #4fa8ff. Style: fintech meets healthcare. No clutter."
