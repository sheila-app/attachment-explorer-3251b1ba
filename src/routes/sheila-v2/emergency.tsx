import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Heart } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";

export const Route = createFileRoute("/sheila-v2/emergency")({ component: Emergency });

const RES = [
  { name: "الخطّ السعودي للدعم النفسي", phone: "920033360", icon: Phone, color: "var(--phase-menstrual)" },
  { name: "الإمارات — مركز الدعم", phone: "800-4673", icon: Phone, color: "var(--phase-follicular)" },
  { name: "خطّ مصر للصحّة النفسية", phone: "08008880700", icon: Phone, color: "var(--phase-ovulation)" },
  { name: "محادثة فوريّة مع مختصّ", phone: "افتحي المحادثة", icon: MessageCircle, color: "var(--primary)" },
];

function Emergency() {
  return (
    <ShellV2 title="موارد الدعم" back="/sheila-v2/sheila" showFAB={false} showNav={false}>
      <div className="px-5">
        <div className="rounded-3xl p-5 text-center" style={{ background: "linear-gradient(135deg, oklch(0.96 0.04 322), oklch(0.97 0.03 18))" }}>
          <Heart size={24} className="mx-auto text-primary mb-2" strokeWidth={1.75} />
          <div className="font-display text-[18px]">لستِ وحدك</div>
          <p className="text-[12px] text-foreground/70 mt-2 leading-relaxed">إن كنتِ تشعرين بضائقة شديدة، تواصلي مباشرةً مع أحد الأرقام التالية. الاتّصال مجاني وسرّي.</p>
        </div>
        <div className="grid gap-2.5 mt-4">
          {RES.map((r, i) => (
            <div key={i} className="rounded-2xl bg-white/85 border border-border p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${r.color}22` }}>
                <r.icon size={18} style={{ color: r.color }} strokeWidth={1.9} />
              </div>
              <div className="flex-1">
                <div className="text-[12.5px] font-semibold">{r.name}</div>
                <div className="text-[12px] text-primary mt-0.5 nums">{r.phone}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ShellV2>
  );
}
