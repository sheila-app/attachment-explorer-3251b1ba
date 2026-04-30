import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { FileText, Download, TrendingUp, Calendar } from "lucide-react";

export const Route = createFileRoute("/reports")({ component: Page });

const reports = [
  { id: "r-monthly", title: "التقرير الشهري", hint: "ملخّص شامل لأبريل 2026", icon: Calendar, badge: "جديد" },
  { id: "r-cycle", title: "تقرير الدورات", hint: "آخر 6 أشهر — متوسّط 28 يوم", icon: TrendingUp },
  { id: "r-fitness", title: "تقرير اللّياقة", hint: "تطوّر القوّة والقدرة", icon: TrendingUp },
  { id: "r-nutrition", title: "تقرير التغذية", hint: "السعرات والماكروز", icon: FileText },
  { id: "r-sleep", title: "تقرير النوم", hint: "جودة النوم الأسبوعيّة", icon: FileText },
];

function Page() {
  return (
    <FeatureShell title="التقارير" back="/journey" variant="calm">
      <div className="px-5 space-y-3">
        <div className="glass-strong rounded-3xl p-5">
          <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-1">تقريركِ الذكي</div>
          <div className="font-display text-[20px] leading-tight">إنجازات أبريل تتفوّق على مارس بـ 18%</div>
          <p className="text-[11.5px] text-foreground/65 mt-2 leading-relaxed">شيلا حلّلت بياناتكِ — أنتِ في أفضل أسبوعين منذ بداية رحلتكِ.</p>
          <Link to="/reports/$id" params={{ id: "r-monthly" }} className="inline-flex items-center gap-1.5 text-primary text-[12px] mt-3">
            افتحي التقرير الكامل ←
          </Link>
        </div>

        {reports.map(r => (
          <Link key={r.id} to="/reports/$id" params={{ id: r.id }} className="glass rounded-2xl p-4 flex items-center gap-3">
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
          </Link>
        ))}
      </div>
    </FeatureShell>
  );
}
