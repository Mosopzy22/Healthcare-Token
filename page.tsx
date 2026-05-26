"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { GenerateProfileResponse } from "@/lib/caretoken-agent";

interface StoredResult extends GenerateProfileResponse {
  patientForm: {
    nickname: string;
    age: string;
    condition: string;
    symptoms: string;
    treatment: string;
    fundingGoal: string;
    notes: string;
  };
}

const TABS = [
  { id: "summary",    label: "Medical Summary" },
  { id: "milestones", label: "Milestones" },
  { id: "funding",    label: "Funding" },
  { id: "swarms",     label: "Swarms Listing" },
  { id: "token",      label: "Token Utility" },
  { id: "agent",      label: "Agent JSON" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);
  const [tab, setTab] = useState<TabId>("summary");

  useEffect(() => {
    const raw = sessionStorage.getItem("caretoken_result");
    if (!raw) { router.push("/create"); return; }
    try { setResult(JSON.parse(raw)); } catch { router.push("/create"); }
  }, [router]);

  if (!result) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="spinner" />
      </div>
    );
  }

  const { medicalSummary, recoveryMilestones, fundingSummary,
          swarmsCampaignSummary, tokenUtilitySummary, agentMetadata,
          patientForm } = result;

  const goalNum = Number(patientForm.fundingGoal);

  return (
    <main className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
      {/* Header */}
      <div className="pt-12 mb-8">
        <Link href="/create" className="btn-ghost text-xs px-3 py-2 inline-block mb-5">
          ← New Campaign
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="tag"><span className="glow-dot" />AI Generated</span>
          <span className="tag tag-gold">⚡ Frenzy Ready</span>
          <span className="tag tag-pink">🪙 Tokenizable</span>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="syne text-3xl font-extrabold">
              {patientForm.nickname}&apos;s{" "}
              <span className="grad-text">Recovery Campaign</span>
            </h1>
            <p className="text-muted text-sm mt-1">
              {patientForm.condition} · Age {patientForm.age} ·{" "}
              Goal:{" "}
              <span style={{ color: "#00e5c8" }}>
                ${goalNum.toLocaleString()}
              </span>
            </p>
          </div>
          <Link href="/agent" className="btn-primary px-6 py-3 text-sm whitespace-nowrap">
            Agent JSON →
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 overflow-x-auto mb-6 p-1 rounded-xl"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="syne whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-all"
            style={{
              background:
                tab === t.id
                  ? "linear-gradient(135deg, #00e5c8, #4fa8ff)"
                  : "transparent",
              color: tab === t.id ? "#04080f" : "var(--muted)",
              border: "none",
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Medical Summary ── */}
      {tab === "summary" && (
        <div className="card fade-up">
          <h3 className="syne font-bold text-base mb-4">
            About {patientForm.nickname}&apos;s Condition
          </h3>
          <p className="text-muted text-sm leading-relaxed whitespace-pre-wrap">{medicalSummary}</p>
        </div>
      )}

      {/* ── Tab: Milestones ── */}
      {tab === "milestones" && (
        <div className="space-y-4 fade-up">
          {(recoveryMilestones ?? []).map((m, i) => (
            <div key={i} className="card flex gap-5 items-start">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(0,229,200,0.12),rgba(79,168,255,0.12))",
                  border: "1px solid rgba(0,229,200,0.18)",
                }}
              >
                {m.icon}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center mb-1">
                  <span className="syne font-bold text-sm">{m.phase}</span>
                  <span className="tag text-xs">{m.timeframe}</span>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{
                      background: "rgba(0,229,200,0.06)",
                      border: "1px solid rgba(0,229,200,0.14)",
                      color: "var(--muted)",
                    }}
                  >
                    Step {i + 1}
                  </span>
                </div>
                <p className="text-muted text-sm leading-relaxed">{m.goal}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Tab: Funding ── */}
      {tab === "funding" && (
        <div className="space-y-4 fade-up">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <span className="syne font-bold text-sm">Funding Goal</span>
              <span className="syne font-extrabold text-2xl" style={{ color: "#00e5c8" }}>
                ${goalNum.toLocaleString()}
              </span>
            </div>
            <div
              className="rounded-full h-2 mb-2"
              style={{ background: "var(--surface2)" }}
            >
              <div
                className="h-2 rounded-full"
                style={{
                  width: "12%",
                  background: "linear-gradient(90deg, #00e5c8, #4fa8ff)",
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted">
              <span>$0 raised (demo)</span>
              <span>Goal: ${goalNum.toLocaleString()}</span>
            </div>
          </div>
          <div className="card">
            <p className="text-muted text-sm leading-relaxed whitespace-pre-wrap">{fundingSummary}</p>
          </div>
        </div>
      )}

      {/* ── Tab: Swarms Listing ── */}
      {tab === "swarms" && (
        <div className="space-y-4 fade-up">
          <div
            className="card"
            style={{
              background:
                "linear-gradient(135deg,rgba(0,229,200,0.05),rgba(79,168,255,0.05))",
              border: "1px solid rgba(0,229,200,0.18)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl">🐝</span>
              <span className="syne font-bold text-sm">Swarms Marketplace Listing</span>
              <span className="tag ml-auto">Ready to Publish</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">{swarmsCampaignSummary}</p>
          </div>
          <div
            className="rounded-xl px-4 py-3 text-xs"
            style={{
              background: "rgba(245,200,66,0.06)",
              border: "1px solid rgba(245,200,66,0.2)",
              color: "#f5c842",
            }}
          >
            ⚡ To publish: paste this listing into your Swarms agent card. Set{" "}
            <code>tokenizable: true</code> and <code>frenzyMode: true</code> in your agent metadata.
          </div>
        </div>
      )}

      {/* ── Tab: Token Utility ── */}
      {tab === "token" && (
        <div
          className="card fade-up"
          style={{
            background:
              "linear-gradient(135deg,rgba(245,200,66,0.05),rgba(255,94,132,0.05))",
            border: "1px solid rgba(245,200,66,0.18)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">🪙</span>
            <span className="syne font-bold text-sm">Frenzy Mode Token Utility</span>
            <span className="tag tag-gold ml-auto">⚡ Active</span>
          </div>
          <p className="text-muted text-sm leading-relaxed">{tokenUtilitySummary}</p>
        </div>
      )}

      {/* ── Tab: Agent JSON ── */}
      {tab === "agent" && agentMetadata && (
        <div className="fade-up space-y-4">
          <div className="tag tag-pink">lib/caretoken-agent.ts → agentMetadata export</div>
          <div
            className="rounded-xl p-5 overflow-x-auto"
            style={{
              background: "#020509",
              border: "1px solid var(--border)",
              fontFamily: "monospace",
              fontSize: 12,
              color: "#7fdbca",
              lineHeight: 1.7,
            }}
          >
            <pre>{JSON.stringify(agentMetadata, null, 2)}</pre>
          </div>
          <p className="text-muted text-xs">
            This JSON is returned by the API route and mirrors the{" "}
            <code className="text-accent">lib/caretoken-agent.ts</code> metadata export.
          </p>
        </div>
      )}
    </main>
  );
}
