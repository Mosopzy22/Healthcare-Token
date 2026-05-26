"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const path = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6"
      style={{
        height: 60,
        background: "rgba(4,8,15,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 no-underline" style={{ textDecoration: "none" }}>
        <div
          className="syne font-extrabold text-sm flex items-center justify-center"
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "linear-gradient(135deg, #00e5c8, #4fa8ff)",
            color: "#04080f",
          }}
        >
          C
        </div>
        <span className="syne font-extrabold text-lg">
          <span className="grad-text">CareToken</span>
          <span style={{ color: "var(--muted)", fontWeight: 400 }}> AI</span>
        </span>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {path !== "/" && (
          <Link href="/" className="btn-ghost" style={{ padding: "7px 14px", fontSize: 13 }}>
            Home
          </Link>
        )}
        <Link href="/create" className="btn-primary" style={{ padding: "8px 18px", fontSize: 13 }}>
          + Create Campaign
        </Link>
      </div>
    </nav>
  );
}
