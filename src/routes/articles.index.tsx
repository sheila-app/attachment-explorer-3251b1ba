import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/articles/")({ component: Page });

const TABS = ["الكل", "الدورة", "تغذية", "صحّة نفسيّة", "حمل"] as const;

const articles = [
  { id: "a1", title: "كيف تؤثّر مراحل الدورة على طاقتكِ؟", cat: "الدورة", read: 6, soft: "var(--phase-menstrual-soft)" },
  { id: "a2", title: "أطعمة تخفّف ألم الطمث", cat: "تغذية", read: 4, soft: "var(--phase-follicular-soft)" },
  { id: "a3", title: "التعامل مع تقلّبات المزاج", cat: "صحّة نفسيّة", read: 7, soft: "var(--phase-luteal-soft)" },
  { id: "a4", title: "تمارين آمنة في الحمل", cat: "حمل", read: 8, soft: "var(--phase-ovulation-soft)" },
  { id: "a5", title: "متى تستشيرين الطبيبة؟", cat: "الدورة", read: 5, soft: "var(--phase-menstrual-soft)" },
];

function Page() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("الكل");
  const items = articles.filter(a => tab === "الكل" || a.cat === tab);
  return (
    <FeatureShell title="مكتبة المقالات" back="/journey" variant="warm">
      <div className="px-5 pb-3 flex gap-1.5 overflow-x-auto no-scrollbar">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="shrink-0 px-3.5 py-1.5 rounded-full text-[11.5px] font-medium glass"
            style={tab === t ? { background: "var(--gradient-primary)", color: "white" } : undefined}>
            <span className="relative z-10">{t}</span>
          </button>
        ))}
      </div>
      <div className="px-5 space-y-3 stagger">
        {items.map(a => (
          <Link to="/articles/$id" params={{ id: a.id }} key={a.id} className="glass rounded-2xl overflow-hidden block">
            <div className="relative z-10 h-28" style={{ background: `linear-gradient(135deg, ${a.soft}, oklch(1 0 0 / 0.3))` }} />
            <div className="relative z-10 p-4">
              <div className="text-[10px] tracking-[0.15em] uppercase text-primary mb-1">{a.cat}</div>
              <div className="text-[13.5px] font-medium leading-tight">{a.title}</div>
              <div className="flex items-center gap-1 mt-2 text-[10.5px] text-foreground/55 nums">
                <Clock size={10} /> {a.read} دقائق قراءة
              </div>
            </div>
          </Link>
        ))}
      </div>
    </FeatureShell>
  );
}
