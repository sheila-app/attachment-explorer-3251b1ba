import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Search, Check, X } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { AIGenerating, AITyping } from "@/components/sheila-v2/AITyping";
import { useSheilaV2 } from "@/components/sheila-v2/SheilaV2Store";
import { PARTNER_SUGGESTIONS } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/circle_/accountability")({ component: Accountability });

function Accountability() {
  const { state, dispatch } = useSheilaV2();
  const navigate = useNavigate();
  const [stage, setStage] = useState<"idle" | "gen" | "done">(state.partner ? "done" : "idle");
  const [idx, setIdx] = useState(0);
  const p = PARTNER_SUGGESTIONS[idx];

  function aiPick() { setStage("gen"); setTimeout(() => setStage("done"), 1500); }
  function decline() { setIdx((i) => Math.min(i + 1, PARTNER_SUGGESTIONS.length - 1)); setStage("done"); }
  function accept() {
    dispatch({ type: "matchPartner", partner: p });
    navigate({ to: "/sheila-v2/home" });
  }

  return (
    <ShellV2 title="شريك المساءلة" back="/sheila-v2/circle" showFAB={false}>
      <div className="px-5">
        {state.partner && (
          <div className="rounded-2xl bg-primary/10 border border-primary/30 p-4 mb-4 text-center">
            <div className="text-[11px] text-foreground/65">شريكتك الحاليّة</div>
            <div className="font-display text-[18px] mt-1">{state.partner.name}</div>
            <div className="text-[10.5px] text-primary mt-1 nums">سلسلة {state.partner.streak} يوماً</div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2.5">
          <button onClick={aiPick} className="rounded-2xl p-4 text-primary-foreground text-right" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles size={18} className="mb-2" />
            <div className="text-[13px] font-semibold">دعي شيلا تختار</div>
            <div className="text-[10.5px] opacity-80 mt-1">اقتراح ذكي بناءً على هدفك</div>
          </button>
          <button className="rounded-2xl p-4 bg-white/85 border border-border text-right">
            <Search size={18} className="mb-2 text-foreground/65" />
            <div className="text-[13px] font-semibold">ابحثي يدويّاً</div>
            <div className="text-[10.5px] text-foreground/55 mt-1">تصفّحي بنفسك</div>
          </button>
        </div>

        {stage === "gen" && <div className="mt-5"><AIGenerating label="شيلا تبحث عن شريك مناسبة…" /></div>}
        {stage === "done" && (
          <div className="mt-5 rounded-2xl bg-white/85 border border-border p-5 text-center">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white font-display text-[24px]" style={{ background: "var(--gradient-primary)" }}>{p.name[0]}</div>
            <div className="font-display text-[18px] mt-3">{p.name}</div>
            <p className="text-[11px] text-foreground/65 mt-2 leading-relaxed"><AITyping text={`اقتراح متوافق: نفس الهدف (${p.goal})، ${p.freq}، مستوى ${p.level}.`} speed={20} /></p>
            <div className="text-[10.5px] text-primary mt-2 nums">سلسلة {p.streak} يوماً</div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button onClick={decline} className="py-2.5 rounded-xl bg-secondary/60 text-[12.5px] font-medium flex items-center justify-center gap-1.5"><X size={13} /> اقتراح آخر</button>
              <button onClick={accept} className="py-2.5 rounded-xl text-primary-foreground text-[12.5px] font-semibold flex items-center justify-center gap-1.5" style={{ background: "var(--gradient-primary)" }}><Check size={13} /> قبول</button>
            </div>
          </div>
        )}
      </div>
    </ShellV2>
  );
}
