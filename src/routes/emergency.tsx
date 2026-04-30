import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Phone, Heart, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/emergency")({ component: Page });

const contacts = [
  { name: "الإسعاف", num: "997", hint: "خدمات الطوارئ" },
  { name: "خط دعم نفسي", num: "920033360", hint: "متاح 24/7" },
  { name: "صديقة الطوارئ", num: "—", hint: "أضيفي رقم موثوق" },
];

function Page() {
  return (
    <FeatureShell title="طوارئ صحّيّة" back="/profile" showNav={false} variant="warm">
      <div className="px-5 pb-8 space-y-4">
        <div className="rounded-3xl p-5"
          style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 25 / 0.15), oklch(0.62 0.22 25 / 0.05))", border: "1px solid oklch(0.62 0.22 25 / 0.2)" }}>
          <div className="flex items-center gap-2">
            <AlertCircle size={18} style={{ color: "oklch(0.55 0.22 25)" }} />
            <div className="font-display text-[16px]">إن كنتِ في خطر فوري</div>
          </div>
          <p className="text-[12px] text-foreground/70 mt-2 leading-relaxed">اتّصلي بـ 997 مباشرة أو اضغطي زرّ الطوارئ في هاتفكِ.</p>
        </div>

        <h2 className="text-[11px] font-medium text-foreground/55 uppercase tracking-wider px-1">جهات الاتّصال</h2>
        <div className="space-y-2">
          {contacts.map(c => (
            <div key={c.name} className="glass rounded-2xl p-4 flex items-center gap-3">
              <div className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, oklch(0.66 0.16 322 / 0.25), oklch(0.46 0.135 328 / 0.12))" }}>
                <Phone size={16} className="text-primary" strokeWidth={1.75} />
              </div>
              <div className="relative z-10 flex-1">
                <div className="text-[13.5px] font-medium">{c.name}</div>
                <div className="text-[11px] text-foreground/60 nums">{c.num} · {c.hint}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-4 flex items-start gap-3">
          <Heart size={16} className="text-primary mt-0.5" />
          <p className="relative z-10 text-[12px] text-foreground/75 leading-relaxed">
            أنتِ لستِ وحدكِ. أيّاً كان ما تشعرين به، هناك من يستمع — تواصلي بدون تردّد.
          </p>
        </div>
      </div>
    </FeatureShell>
  );
}
