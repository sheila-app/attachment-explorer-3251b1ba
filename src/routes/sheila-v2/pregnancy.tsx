import { createFileRoute } from "@tanstack/react-router";
import { Baby } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";

export const Route = createFileRoute("/sheila-v2/pregnancy")({ component: Pregnancy });
const WEEKS = [{ w: 18, t: "ت2 — منتصف الرحلة", note: "حركة الجنين بدأت تُحسّ. ركّزي على الحديد والكالسيوم." }];

function Pregnancy() {
  const { w, t, note } = WEEKS[0];
  return (
    <ShellV2 title="رحلة الحمل" variant="warm">
      <div className="px-5">
        <div className="rounded-3xl p-5 text-center" style={{ background: "linear-gradient(135deg, oklch(0.95 0.04 55), oklch(0.96 0.04 322))" }}>
          <Baby className="mx-auto text-primary mb-2" size={28} strokeWidth={1.75} />
          <div className="text-[10.5px] tracking-widest text-foreground/55">الأسبوع</div>
          <div className="font-display text-[44px] leading-none mt-1 text-primary nums">{w}</div>
          <div className="text-[12px] mt-1.5 font-semibold text-primary">{t}</div>
          <p className="text-[12px] text-foreground/65 mt-2 leading-relaxed">{note}</p>
        </div>
        {[
          { title: "تمارين آمنة اليوم", body: "بيلاتس للجذع 25 د • تمدّد للحوض 10 د" },
          { title: "تغذية الأسبوع", body: "بروتين 75-100غ، حديد 27 ملغ، أوميغا 3 مرّتان أسبوعياً" },
          { title: "أعراض شائعة", body: "حرقة معدة، تورّم خفيف، حركة جنين متزايدة" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl bg-white/85 border border-border p-4 mt-3">
            <div className="text-[13px] font-semibold">{s.title}</div>
            <div className="text-[12px] text-foreground/65 mt-1.5 leading-relaxed">{s.body}</div>
          </div>
        ))}
      </div>
    </ShellV2>
  );
}
