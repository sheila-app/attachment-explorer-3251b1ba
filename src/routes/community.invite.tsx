import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { Copy, Share2, Mail, MessageCircle, Check } from "lucide-react";

export const Route = createFileRoute("/community/invite")({ component: Page });

function Page() {
  const code = "NOURA-2026";
  const [copied, setCopied] = useState(false);

  return (
    <FeatureShell title="ادعي صديقاتكِ" back="/community" showNav={false} variant="default">
      <div className="px-5 pb-8 space-y-5">
        <div className="glass-strong rounded-3xl p-6 text-center">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
            style={{ background: "var(--gradient-primary)", boxShadow: "0 14px 32px -10px oklch(0.46 0.135 328 / 0.5)" }}>
            <Share2 size={28} className="text-white" strokeWidth={1.5} />
          </div>
          <h2 className="font-display text-[18px] mt-4">شاركي رحلتكِ</h2>
          <p className="text-[12.5px] text-foreground/65 mt-2 leading-relaxed">
            احصلي وصديقتكِ على شهر مجّاني عند انضمامها.
          </p>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-2 px-1">رمز الدعوة</div>
          <button onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
            className="glass rounded-2xl w-full p-4 flex items-center justify-between">
            <span className="relative z-10 font-display text-xl text-primary nums tracking-widest">{code}</span>
            {copied
              ? <Check size={16} className="relative z-10 text-primary" strokeWidth={2.5} />
              : <Copy size={16} className="relative z-10 text-primary" />}
          </button>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-2 px-1">شاركي عبر</div>
          <div className="grid grid-cols-3 gap-2">
            <ShareBtn icon={MessageCircle} label="واتساب" />
            <ShareBtn icon={Mail} label="بريد" />
            <ShareBtn icon={Share2} label="المزيد" />
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <h3 className="relative z-10 text-sm font-medium mb-2">دعواتكِ</h3>
          <div className="relative z-10 space-y-2">
            {[
              { n: "ريم العتيبي", s: "انضمّت — +30 يوم" },
              { n: "هدى السبيعي", s: "بانتظار التسجيل" },
            ].map(d => (
              <div key={d.n} className="flex items-center justify-between text-[12px]">
                <span>{d.n}</span>
                <span className="text-[10.5px] text-foreground/55">{d.s}</span>
              </div>
            ))}
          </div>
        </div>

        <PrimaryCTA to="/community">عودة للمجتمع</PrimaryCTA>
      </div>
    </FeatureShell>
  );
}

function ShareBtn({ icon: Ic, label }: { icon: any; label: string }) {
  return (
    <button className="glass rounded-2xl py-3.5 flex flex-col items-center gap-1.5">
      <Ic size={18} className="relative z-10 text-primary" strokeWidth={1.75} />
      <span className="relative z-10 text-[11px]">{label}</span>
    </button>
  );
}
