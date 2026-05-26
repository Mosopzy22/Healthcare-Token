// ─────────────────────────────────────────────────────────────────────────────
// lib/caretoken-agent.ts
//
// CareToken AI — Swarms Marketplace Agent
// This file is the canonical source of agent metadata.
// Import it in the API route and any Swarms integration layer.
// ─────────────────────────────────────────────────────────────────────────────

// ── Input / Output types ──────────────────────────────────────────────────

export interface AgentInput {
  nickname: string;
  age: string;
  condition: string;
  symptoms: string;
  treatment: string;
  fundingGoal: string;
  notes?: string;
}

export interface RecoveryMilestone {
  phase: string;
  timeframe: string;
  goal: string;
  icon: string;
}

export interface AgentMetadata {
  name: string;
  description: string;
  category: string;
  version: string;
  tokenizable: boolean;
  frenzyMode: boolean;
  fundingGoal: number;
  inputs: string[];
  outputs: string[];
  marketplace: {
    listable: boolean;
    featured: boolean;
    category: string;
    tags: string[];
  };
  deployment: {
    vercel: boolean;
    nextjs: string;
    api: string;
  };
}

export interface GenerateProfileResponse {
  medicalSummary: string;
  recoveryMilestones: RecoveryMilestone[];
  fundingSummary: string;
  swarmsCampaignSummary: string;
  tokenUtilitySummary: string;
  agentMetadata: AgentMetadata;
  _agentVersion?: string;
}

// ── Static agent metadata ─────────────────────────────────────────────────
// This is the base metadata for the CareToken AI agent registered on Swarms.
// Per-campaign metadata (with patient name, fundingGoal, etc.) is generated
// dynamically by the API route and returned in GenerateProfileResponse.agentMetadata.

export const caretokenAgentMetadata = {
  name: "CareToken AI",
  version: "1.0.0",
  description:
    "An AI-powered healthcare funding and recovery agent that transforms patient stories into transparent, tokenized campaigns for the Swarms Marketplace.",
  category: "healthcare",
  author: "CareToken AI Team",
  license: "MIT",

  // Swarms Marketplace flags
  tokenizable: true,
  frenzyMode: true,

  inputs: [
    "patient_nickname",
    "age",
    "condition",
    "symptoms",
    "treatment_needed",
    "funding_goal",
    "notes",
  ],

  outputs: [
    "medicalSummary",
    "recoveryMilestones",
    "fundingSummary",
    "swarmsCampaignSummary",
    "tokenUtilitySummary",
    "agentMetadata",
  ],

  marketplace: {
    listable: true,
    featured: false,
    category: "healthcare",
    tags: ["healthcare", "funding", "recovery", "tokenization", "ai-agent", "frenzy"],
  },

  deployment: {
    vercel: true,
    nextjs: "14",
    typescript: true,
    api: "/api/generate-profile",
  },
} as const;

// ── Example Swarms Marketplace listing text ───────────────────────────────

export const swarmsMarketplaceListing = `
## CareToken AI 🏥🪙

**Category:** Healthcare  
**Tokenizable:** ✅  **Frenzy Mode:** ⚡ Enabled

### What it does
CareToken AI turns healthcare recovery campaigns into transparent,
AI-powered funding journeys. Enter basic patient info and the agent
generates a plain-language medical summary, recovery milestones,
a funding breakdown, and a full Swarms campaign listing —
all in seconds.

### Inputs
Patient nickname · Age · Condition · Symptoms
Treatment needed · Funding goal · Optional notes

### Outputs
- 📋 Plain-language medical summary
- 📊 Phase-by-phase recovery milestones
- 💰 Funding allocation explanation
- 🐝 Swarms campaign listing text
- 🪙 Frenzy Mode token utility description

### Why tokenize healthcare?
Supporters become stakeholders — tokens track milestone
completion, making every dollar accountable. Frenzy Mode
amplifies community participation and campaign visibility.

### Deploy
One-click Vercel deployment. API key stays server-side.
Swarms-compatible metadata included out of the box.
`.trim();

// ── Client-side runner ────────────────────────────────────────────────────
// Call this from any page component to invoke the agent via the API route.
// API key is NEVER exposed — all OpenAI calls happen in the route handler.

export async function runCaretokenAgent(
  input: AgentInput
): Promise<GenerateProfileResponse> {
  const res = await fetch("/api/generate-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<GenerateProfileResponse>;
}
