import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { caretokenAgentMetadata } from "@/lib/caretoken-agent";

// ── Types ─────────────────────────────────────────────────────────────────
interface RequestBody {
  nickname: string;
  age: string;
  condition: string;
  symptoms: string;
  treatment: string;
  fundingGoal: string;
  notes?: string;
}

// ── Build the AI prompt ───────────────────────────────────────────────────
function buildPrompt(b: RequestBody): string {
  return `You are CareToken AI, a compassionate healthcare campaign agent for the Swarms Marketplace.

Patient Information:
- Nickname: ${b.nickname}
- Age: ${b.age}
- Condition: ${b.condition}
- Symptoms: ${b.symptoms}
- Treatment Needed: ${b.treatment}
- Funding Goal: $${b.fundingGoal}
- Additional Notes: ${b.notes || "None provided"}

Generate a complete healthcare funding campaign profile.

Rules:
- Use simple, plain language. No medical jargon.
- Never make diagnosis claims or clinical recommendations.
- Keep a hopeful, warm, supportive tone throughout.
- Write for a general audience of potential supporters.

Return ONLY valid JSON (no markdown, no code fences, no preamble) with exactly these keys:

{
  "medicalSummary": "2-3 paragraph plain-language explanation of the condition, symptoms, and treatment path. Hopeful tone. No diagnosis claims.",
  "recoveryMilestones": [
    {
      "phase": "Short phase name",
      "timeframe": "e.g. Week 1-2",
      "goal": "What happens in this phase and what it means for the patient",
      "icon": "single relevant emoji"
    }
  ],
  "fundingSummary": "2 paragraphs. Explain specifically how the funds will be used, what each dollar enables, and the impact on the patient's recovery journey.",
  "swarmsCampaignSummary": "A compelling ~150-word campaign listing suitable for the Swarms Marketplace agent card. Include patient nickname, condition, treatment needed, and funding goal. Engaging and clear.",
  "tokenUtilitySummary": "Explain how Frenzy Mode tokenization works for this campaign — what supporters receive, how tokens represent milestone progress, and why this increases transparency and accountability for all parties.",
  "agentMetadata": {
    "name": "CareToken AI — ${b.nickname} Recovery Campaign",
    "description": "AI-powered healthcare recovery funding agent for ${b.nickname}, a ${b.age}-year-old patient with ${b.condition}.",
    "category": "healthcare",
    "version": "1.0.0",
    "tokenizable": true,
    "frenzyMode": true,
    "fundingGoal": ${Number(b.fundingGoal) || 0},
    "inputs": ["patient_nickname", "age", "condition", "symptoms", "treatment_needed", "funding_goal", "notes"],
    "outputs": ["medicalSummary", "recoveryMilestones", "fundingSummary", "swarmsCampaignSummary", "tokenUtilitySummary"],
    "marketplace": {
      "listable": true,
      "featured": false,
      "category": "healthcare",
      "tags": ["healthcare", "funding", "recovery", "tokenization", "ai-agent"]
    },
    "deployment": {
      "vercel": true,
      "nextjs": "14",
      "api": "/api/generate-profile"
    }
  }
}`;
}

// ── Route handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Validate env
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  // Parse body
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Validate required fields
  const required: (keyof RequestBody)[] = [
    "nickname", "age", "condition", "symptoms", "treatment", "fundingGoal",
  ];
  const missing = required.filter((k) => !body[k]?.toString().trim());
  if (missing.length) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 422 }
    );
  }

  // Call OpenAI
  const openai = new OpenAI({ apiKey });

  let raw: string;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are CareToken AI. You generate compassionate, plain-language healthcare funding campaign profiles. Always respond with valid JSON only.",
        },
        {
          role: "user",
          content: buildPrompt(body),
        },
      ],
    });
    raw = completion.choices[0]?.message?.content ?? "";
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "OpenAI API error";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  // Parse JSON response
  let parsed: Record<string, unknown>;
  try {
    // Strip any accidental markdown fences just in case
    const clean = raw.replace(/```json|```/g, "").trim();
    parsed = JSON.parse(clean);
  } catch {
    return NextResponse.json(
      { error: "AI returned invalid JSON. Please try again." },
      { status: 500 }
    );
  }

  // Merge in the static agent metadata as a fallback shape reference
  const response = {
    ...parsed,
    _agentVersion: caretokenAgentMetadata.version,
  };

  return NextResponse.json(response, { status: 200 });
}
