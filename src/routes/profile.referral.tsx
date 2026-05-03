import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Copy, Gift, Share2 } from "lucide-react";

export const Route = createFileRoute("/profile/referral")({ component: Page });

function Page() {
  const code = "NOURA-2026";
  return (
    <FeatureShell title="ادعي صديقاتكِ" back="/profile" showNav={false} variant="warm">
      <div className="px-5 pb-8 space-y-5">
        <div className="glass-strong rounded-3xl p-5 text-center">
          <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3"
            style={{ background: "var(--gradient-primary)" }}>
            <Gift size={24} className="text-white" strokeWidth={1.75} />
          </div>
          <div className="font-display text-[20px] leading-tight">شهر مجاني لكلتيكما</div>
          <p className="text-[12px] text-foreground/65 mt-2 leading-relaxed">عند انضمام صديقتكِ بكوبونكِ، تحصلان على شهر برو مجّاناً.</p>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="text-[10px] tracking-[0.18em] text-foreground/55 uppercase mb-1.5">كوبونكِ</div>
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl text-primary tracking-wider">{code}</span>
            <button className="glass-strong w-9 h-9 rounded-full flex items-center justify-center"><Copy size={14} className="relative z-10 text-primary" /></button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          {[["مدعوّات", "8"], ["مشتركات", "3"], ["أشهر مكسوبة", "3"]].map(([l, v]) => (
            <div key={l} className="glass rounded-2xl p-3">
              <div className="font-display text-xl text-primary nums">{v}</div>
              <div className="text-[10px] text-foreground/55 mt-0.5">{l}</div>
            </div>
          ))}
        </div>

        <button className="w-full rounded-2xl py-3.5 flex items-center justify-center gap-2 text-white text-sm"
          style={{ background: "var(--gradient-primary)" }}>
          <Share2 size={15} /> شاركي الكوبون
        </button>
      </div>
    </FeatureShell>
  );
}
