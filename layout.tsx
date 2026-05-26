import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "CareToken AI — Healthcare Funding Through Tokenization",
  description:
    "AI-powered healthcare recovery campaigns, tokenized for the Swarms Marketplace. Generate medical summaries, milestones, and funding explanations instantly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Noise overlay */}
        <div className="noise" aria-hidden />

        {/* Mesh background blobs */}
        <div className="mesh-bg" aria-hidden>
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>

        <Nav />
        {children}
      </body>
    </html>
  );
}
