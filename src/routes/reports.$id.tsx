import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Share2, Download } from "lucide-react";

export const Route = createFileRoute("/reports/$id")({ component: Page });

function Page() {
  const stats = [
    { l: "تمارين", v: "18", d: "+4 عن الشهر السابق" },
    { l: "سعرات محروقة", v: "4,820", d: "متوسّط 268/يوم" },
    { l: "أيّام نشاط", v: "24", d: "من أصل 30" },
    { l: "متوسّط النوم", v: "7.4س", d: "تحسّن 12 د" },
  ];
  return (
    <FeatureShell title="التقرير الشهري" back="/reports" showNav={false} variant="calm"
      trailing={<button className="glass w-9 h-9 rounded-full flex items-center justify-center"><Share2 size={14} className="relative z-10" /></button>}
    >
      <div className="px-5 pb-8 space-y-5">
        <div className="glass-strong rounded-3xl p-5 text-center">
          <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">شهر أبريل 2026</div>
          <div className="font-display text-4xl text-primary mt-2 nums">87<span className="text-base text-foreground/55">/100</span></div>
          <div className="text-[12px] text-foreground/65 mt-1">نتيجة صحّية ممتازة</div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {stats.map(s => (
            <div key={s.l} className="glass rounded-2xl p-4">
              <div className="text-[10px] tracking-[0.18em] text-foreground/55 uppercase">{s.l}</div>
              <div className="font-display text-2xl text-primary nums mt-1">{s.v}</div>
              <div className="text-[10px] text-foreground/55 mt-1">{s.d}</div>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-5">
          <h2 className="text-sm font-medium mb-3">رؤى شيلا</h2>
          <ul className="space-y-2 text-[12px] text-foreground/75 leading-relaxed">
            <li>✨ أفضل أداء كان أيام الإباضة — كثفي التمارين عالية الكثافة فيها.</li>
            <li>💧 نقص في شرب الماء أيام الأحد — احتفظي بزجاجة قريبة منكِ.</li>
            <li>😴 جودة نومكِ تحسّنت بعد جلسات التأمّل المسائي — استمرّي.</li>
          </ul>
        </div>

        <button className="w-full glass-strong rounded-2xl py-3.5 flex items-center justify-center gap-2 text-primary text-sm">
          <Download size={15} /> حمّلي PDF
        </button>
      </div>
    </FeatureShell>
  );
}
