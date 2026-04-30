import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/onboarding/types")({ component: Page });

/** أيقونات SVG تعبيريّة بسيطة بدلاً من الإيموجي */
function Icon({ id }: { id: string }) {
  const stroke = "var(--primary-deep)";
  const sw = 1.5;
  switch (id) {
    case "strength":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="17" width="3" height="6" rx="1" />
          <rect x="32" y="17" width="3" height="6" rx="1" />
          <rect x="9" y="14" width="3" height="12" rx="1" />
          <rect x="28" y="14" width="3" height="12" rx="1" />
          <line x1="12" y1="20" x2="28" y2="20" />
        </svg>
      );
    case "hiit":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 5 C 14 14, 26 17, 20 27 C 16 33, 24 35, 24 35" />
          <path d="M14 28 C 17 25, 19 26, 20 30" />
        </svg>
      );
    case "pilates":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="20" cy="9" r="3" />
          <path d="M12 30 L 20 14 L 28 30" />
          <path d="M14 24 L 26 24" />
          <path d="M20 14 L 20 22" />
        </svg>
      );
    case "yoga":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="20" cy="10" r="3" />
          <path d="M20 13 L 20 24" />
          <path d="M8 22 C 14 18, 26 18, 32 22" />
          <path d="M14 32 L 20 24 L 26 32" />
        </svg>
      );
    case "cardio":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="24" cy="8" r="3" />
          <path d="M24 11 L 19 19 L 24 23 L 21 32" />
          <path d="M19 19 L 12 22" />
          <path d="M24 23 L 30 19" />
        </svg>
      );
    case "func":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 5 L 23 17 L 35 17 L 25 24 L 29 35 L 20 28 L 11 35 L 15 24 L 5 17 L 17 17 Z" />
        </svg>
      );
    default:
      return null;
  }
}

function Page() {
  const [sel, setSel] = useState<string[]>(["yoga", "hiit"]);
  const toggle = (id: string) => setSel(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const opts = [
    { id: "strength", t: "قوّة" },
    { id: "hiit", t: "HIIT" },
    { id: "pilates", t: "بيلاتس" },
    { id: "yoga", t: "يوغا" },
    { id: "cardio", t: "كارديو" },
    { id: "func", t: "وظيفي" },
  ];
  return (
    <OnboardingShell
      step={11} total={12} back="/onboarding/frequency"
      title="أيّ أنواع تمارين تستمتعين بها؟"
      subtitle="اختاري واحداً على الأقل."
      footer={<PrimaryCTA to="/onboarding/permissions">متابعة</PrimaryCTA>}
    >
      <div className="grid grid-cols-2 gap-2.5">
        {opts.map(o => (
          <button key={o.id} onClick={() => toggle(o.id)}
            className="glass rounded-2xl py-5 flex flex-col items-center gap-2"
            style={sel.includes(o.id) ? { boxShadow: "0 0 0 2px var(--primary), inset 0 1px 0 0 oklch(1 0 0 / 0.6)" } : undefined}
          >
            <span className="relative z-10"><Icon id={o.id} /></span>
            <span className="relative z-10 text-sm font-medium">{o.t}</span>
          </button>
        ))}
      </div>
    </OnboardingShell>
  );
}
