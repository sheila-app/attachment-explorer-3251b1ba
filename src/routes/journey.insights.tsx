import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import {
  Award, Calendar, Activity, Flame, ChevronLeft,
  FileText, Download, TrendingUp, Share2, Sparkles, Droplets, Moon,
} from "lucide-react";

export const Route = createFileRoute("/journey/insights")({ component: Page });

const REPORTS = [
  { id: "r-monthly", title: "التقرير الشهري", hint: "ملخّص شامل لأبريل 2026", icon: Calendar, badge: "جديد" },
  { id: "r-cycle", title: "تقرير الدورات", hint: "آخر 6 أشهر — متوسّط 28 يوم", icon: TrendingUp },
  { id: "r-fitness", title: "تقرير اللّياقة", hint: "تطوّر القوّة والقدرة", icon: TrendingUp },
  { id: "r-nutrition", title: "تقرير التغذية", hint: "السعرات والماكروز", icon: FileText },
  { id: "r-sleep", title: "تقرير النوم", hint: "جودة النوم الأسبوعيّة", icon: FileText },
];

function Page() {
  const [openReport, setOpenReport] = useState<string | null>(null);

  return (
    <FeatureShell title="رؤى وتقارير" back="/journey" variant="calm">
      <div className="px-5 pb-8 space-y-4">
        {/* === Smart insights === */}
        <div className="glass-strong rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Award size={14} className="text-primary" />
            <span className="text-[11px] tracking-[0.18em] uppercase text-primary">أفضل أداء</span>
          </div>
          <p className="relative z-10 text-[13px] leading-relaxed">
            أنتِ أكثر التزاماً بالتمرين أيّام <span className="text-primary font-medium">الثلاثاء والخميس</span> — حافظي على هذا النمط.
          </p>
        </div>

        <InsightCard icon={Flame} title="أنماط الطاقة" body="طاقتكِ في ذروتها بين 16:00 و 19:00 — وقت مثالي لتمارين القوّة." />
        <InsightCard icon={Calendar} title="تأثير الدورة" body="خلال مرحلة الطمث، تنخفض شدّة تمرينكِ بنسبة 30%. ننصح بتمارين خفيفة." />
        <InsightCard icon={Activity} title="توازن التغذية" body="استهلاككِ من البروتين أقلّ بـ 20% من المستهدف. أضيفي مصدراً في كلّ وجبة." />

        {/* === Smart report highlight === */}
        <div className="glass-strong rounded-3xl p-5">
          <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-1">تقريركِ الذكي</div>
          <div className="font-display text-[20px] leading-tight">إنجازات أبريل تتفوّق على مارس بـ 18%</div>
          <p className="text-[11.5px] text-foreground/65 mt-2 leading-relaxed">
            شيلا حلّلت بياناتكِ — أنتِ في أفضل أسبوعين منذ بداية رحلتكِ.
          </p>
          <button onClick={() => setOpenReport("r-monthly")} className="inline-flex items-center gap-1.5 text-primary text-[12px] mt-3">
            افتحي التقرير الكامل ←
          </button>
        </div>

        {/* === Reports list === */}
        <div>
          <h2 className="text-[11px] text-foreground/50 tracking-[0.15em] uppercase px-1 mb-2">التقارير</h2>
          <div className="space-y-2">
            {REPORTS.map((r) => (
              <button key={r.id} onClick={() => setOpenReport(r.id)}
                className="w-full text-right glass rounded-2xl p-4 flex items-center gap-3 active:scale-[0.99] transition-transform"
              >
                <div className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, oklch(0.66 0.16 322 / 0.25), oklch(0.46 0.135 328 / 0.12))" }}>
                  <r.icon size={18} className="text-primary" strokeWidth={1.75} />
                </div>
                <div className="relative z-10 flex-1">
                  <div className="text-[13.5px] font-medium flex items-center gap-2">
                    {r.title}
                    {r.badge && <span className="text-[9px] px-1.5 py-0.5 rounded-full text-white" style={{ background: "var(--gradient-primary)" }}>{r.badge}</span>}
                  </div>
                  <div className="text-[11px] text-foreground/60 mt-0.5">{r.hint}</div>
                </div>
                <Download size={15} className="relative z-10 text-foreground/45" />
              </button>
            ))}
          </div>
        </div>

        <Link to="/assistant" className="glass rounded-2xl p-4 flex items-center justify-between">
          <span className="relative z-10 text-[13px] font-medium">اطلبي تحليلاً مفصّلاً من شيلا</span>
          <ChevronLeft size={15} className="relative z-10 text-primary" />
        </Link>
      </div>

      {/* === Report detail overlay === */}
      {openReport && <ReportDetail id={openReport} onClose={() => setOpenReport(null)} />}
    </FeatureShell>
  );
}

function InsightCard({ icon: Ic, title, body }: { icon: any; title: string; body: string }) {
  return (
    <div className="glass rounded-2xl p-4 flex gap-3">
      <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
        <Ic size={16} className="text-white" />
      </div>
      <div className="relative z-10 flex-1">
        <h3 className="text-[13px] font-medium">{title}</h3>
        <p className="text-[12px] text-foreground/70 mt-1 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function ReportDetail({ id, onClose }: { id: string; onClose: () => void }) {
  const r = REPORTS.find((x) => x.id === id) ?? REPORTS[0];
  const stats = [
    { l: "تمارين", v: "18", d: "+4 عن الشهر السابق" },
    { l: "سعرات محروقة", v: "4,820", d: "متوسّط 268/يوم" },
    { l: "أيّام نشاط", v: "24", d: "من أصل 30" },
    { l: "متوسّط النوم", v: "7.4س", d: "تحسّن 12 د" },
  ];
  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur overflow-y-auto">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur px-5 py-4 border-b border-border flex items-center justify-between">
        <button onClick={onClose} className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center">
          <ChevronLeft size={16} />
        </button>
        <div className="font-display text-[15px]">{r.title}</div>
        <button className="glass w-9 h-9 rounded-full flex items-center justify-center"><Share2 size={14} className="relative z-10" /></button>
      </header>
      <div className="px-5 py-5 pb-10 space-y-5">
        <div className="glass-strong rounded-3xl p-5 text-center">
          <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">شهر أبريل 2026</div>
          <div className="font-display text-4xl text-primary mt-2 nums">87<span className="text-base text-foreground/55">/100</span></div>
          <div className="text-[12px] text-foreground/65 mt-1">نتيجة صحّية ممتازة</div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {stats.map((s) => (
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
            <li className="flex items-start gap-1.5"><Sparkles size={13} strokeWidth={1.75} className="text-primary shrink-0 mt-0.5" /> أفضل أداء كان أيام الإباضة — كثفي التمارين عالية الكثافة فيها.</li>
            <li className="flex items-start gap-1.5"><Droplets size={13} strokeWidth={1.75} className="text-primary shrink-0 mt-0.5" /> نقص في شرب الماء أيام الأحد — احتفظي بزجاجة قريبة منكِ.</li>
            <li className="flex items-start gap-1.5"><Moon size={13} strokeWidth={1.75} className="text-primary shrink-0 mt-0.5" /> جودة نومكِ تحسّنت بعد جلسات التأمّل المسائي — استمرّي.</li>
          </ul>
        </div>

        <button className="w-full glass-strong rounded-2xl py-3.5 flex items-center justify-center gap-2 text-primary text-sm">
          <Download size={15} /> حمّلي PDF
        </button>
      </div>
    </div>
  );
}
