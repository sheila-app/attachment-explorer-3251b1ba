import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";

export const Route = createFileRoute("/sheila-v2/health")({ component: Health });
const SYMPTOMS = ["هبّات حرارة", "اضطراب نوم", "تقلّبات مزاج", "جفاف", "تشنّج عضلي", "صداع"];

function Health() {
  return (
    <ShellV2 title="صحتي" variant="calm">
      <div className="px-5">
        <div className="rounded-3xl p-5 glass-strong">
          <div className="flex items-center gap-2 relative z-10"><Activity size={16} className="text-primary" /><span className="text-[11px] font-semibold text-primary">المتابعة الهرمونيّة</span></div>
          <p className="relative z-10 text-[12.5px] text-foreground/75 mt-2 leading-relaxed">لا توجد توقّعات للدورة في هذه المرحلة. ركّزي على تتبّع الأعراض ومتابعة العلاج الهرموني (HRT) إن وُجد.</p>
        </div>
        <h2 className="text-[12px] font-semibold mt-6 mb-2.5">سجّلي ما تشعرين به اليوم</h2>
        <div className="grid grid-cols-2 gap-2">
          {SYMPTOMS.map((s) => (
            <button key={s} className="rounded-2xl bg-white/85 border border-border p-3 text-[12.5px] text-right active:scale-[0.97] transition-transform">{s}</button>
          ))}
        </div>
        <div className="mt-5 rounded-2xl bg-white/85 border border-border p-4">
          <div className="text-[13px] font-semibold">صحّة العظام</div>
          <div className="text-[11.5px] text-foreground/65 mt-1.5">جلسات قوّة هذا الأسبوع: 2 من 3</div>
          <div className="text-[11.5px] text-foreground/65 mt-1">كالسيوم/فيتامين د: مكتمل</div>
        </div>
      </div>
    </ShellV2>
  );
}
