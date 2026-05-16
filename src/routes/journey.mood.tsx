import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { Smile, Meh, Zap, Moon, AlertCircle, Frown } from "lucide-react";

export const Route = createFileRoute("/journey/mood")({ component: Page });

const MOODS = [
  { id: "joy", name: "سعيدة", Icon: Smile, color: "var(--phase-follicular)" },
  { id: "calm", name: "هادئة", Icon: Meh, color: "var(--phase-luteal)" },
  { id: "energetic", name: "نشيطة", Icon: Zap, color: "var(--phase-ovulation)" },
  { id: "tired", name: "متعبة", Icon: Moon, color: "var(--phase-menstrual)" },
  { id: "anxious", name: "قلقة", Icon: AlertCircle, color: "var(--phase-luteal)" },
  { id: "irritable", name: "متوتّرة", Icon: Frown, color: "var(--phase-menstrual)" },
];

function Page() {
  const [mood, setMood] = useState("calm");
  const [note, setNote] = useState("");
  return (
    <FeatureShell title="مزاج اليوم" back="/journey" variant="calm">
      <div className="px-5 pb-8">
        <p className="text-[12.5px] text-foreground/65 mb-4 leading-relaxed">كيف تشعرين الآن؟ تتبّع المزاج يساعد على فهم نمط دورتكِ.</p>
        <div className="grid grid-cols-3 gap-2.5 stagger">
          {MOODS.map((m) => {
            const on = mood === m.id;
            return (
              <button key={m.id} onClick={() => setMood(m.id)}
                className={`glass rounded-2xl p-4 flex flex-col items-center gap-1.5 ${on ? "ring-2 ring-primary/40" : ""}`}
                style={on ? { background: `color-mix(in oklab, ${m.color} 18%, transparent)` } : undefined}>
                <m.Icon size={28} strokeWidth={1.75} className="relative z-10" style={{ color: m.color }} />
                <span className="relative z-10 text-[12px] font-medium">{m.name}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-5">
          <label className="block text-[11px] text-foreground/60 mb-1.5 px-1">ملاحظات (اختياري)</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} placeholder="اكتبي ما يدور في خاطركِ…"
            className="glass w-full rounded-xl px-4 py-3 text-[13px] resize-none relative z-10 bg-transparent outline-none" />
        </div>
        <div className="mt-6"><PrimaryCTA to="/journey">حفظ المزاج</PrimaryCTA></div>
      </div>
    </FeatureShell>
  );
}
