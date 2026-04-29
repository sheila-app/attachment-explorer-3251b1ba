import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Award, Calendar, Activity, Flame, ChevronLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/journey/insights")({ component: Page });

function Page() {
  return (
    <FeatureShell title="رؤى ذكيّة" back="/journey" variant="calm">
      <div className="px-5 pb-8 space-y-4">
        <div className="glass-strong rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Award size={14} className="text-primary" />
            <span className="text-[11px] tracking-[0.18em] uppercase text-primary">أفضل أداء</span>
          </div>
          <p className="relative z-10 text-[13px] leading-relaxed">
            أنتِ أكثر التزاماً بالتمرين أيّام <span className="text-primary font-medium">الثلاثاء والخميس</span> — حافظي على هذا النمط.
          </p>
        </div>

        <Card icon={Flame} title="أنماط الطاقة" body="طاقتكِ في ذروتها بين 16:00 و 19:00 — وقت مثالي لتمارين القوّة." />
        <Card icon={Calendar} title="تأثير الدورة" body="خلال مرحلة الطمث، تنخفض شدّة تمرينكِ بنسبة 30%. ننصح بتمارين خفيفة." />
        <Card icon={Activity} title="توازن التغذية" body="استهلاككِ من البروتين أقلّ بـ 20% من المستهدف. أضيفي مصدراً في كلّ وجبة." />

        <Link to="/assistant" className="glass rounded-2xl p-4 flex items-center justify-between">
          <span className="relative z-10 text-[13px] font-medium">اطلبي تحليلاً مفصّلاً من شيلا</span>
          <ChevronLeft size={15} className="relative z-10 text-primary" />
        </Link>
      </div>
    </FeatureShell>
  );
}

function Card({ icon: Ic, title, body }: { icon: any; title: string; body: string }) {
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
