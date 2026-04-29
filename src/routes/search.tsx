import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Search as SearchIcon, Dumbbell, Apple, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { mockWorkouts, mockMeals } from "@/data/mock";

export const Route = createFileRoute("/search")({ component: Page });

function Page() {
  const [q, setQ] = useState("");
  const ql = q.trim().toLowerCase();

  const w = mockWorkouts.filter(x => !ql || x.title.toLowerCase().includes(ql) || x.type.toLowerCase().includes(ql));
  const m = mockMeals.filter(x => !ql || x.title.toLowerCase().includes(ql));

  return (
    <FeatureShell title="بحث" back="/home" variant="default">
      <div className="px-5 pb-8">
        <div className="glass-strong rounded-2xl flex items-center gap-2 px-3 py-2.5 mb-5">
          <SearchIcon size={16} className="relative z-10 text-foreground/55" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="ابحثي عن تمارين، وجبات، مقالات..."
            className="relative z-10 flex-1 bg-transparent text-[13px] outline-none placeholder:text-foreground/40" />
        </div>

        {!q && (
          <div>
            <h2 className="text-sm font-medium mb-2.5">عمليّات بحث شائعة</h2>
            <div className="flex flex-wrap gap-2">
              {["يوغا", "HIIT", "تشنّج", "فطور صحّي", "تأمّل"].map(t => (
                <button key={t} onClick={() => setQ(t)} className="glass rounded-full px-3 py-1.5 text-[12px]">
                  <span className="relative z-10">{t}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {q && (
          <div className="space-y-5">
            <Section title="تمارين" icon={Dumbbell} count={w.length}>
              {w.map(x => (
                <Link key={x.id} to="/workouts/$id" params={{ id: x.id }} className="glass rounded-2xl px-4 py-3 flex items-center justify-between">
                  <span className="relative z-10 text-[13px] font-medium">{x.title}</span>
                  <span className="relative z-10 text-[11px] text-foreground/55 nums">{x.duration} د</span>
                </Link>
              ))}
            </Section>
            <Section title="وجبات" icon={Apple} count={m.length}>
              {m.map(x => (
                <Link key={x.id} to="/nutrition/$id" params={{ id: x.id }} className="glass rounded-2xl px-4 py-3 flex items-center justify-between">
                  <span className="relative z-10 text-[13px] font-medium">{x.title}</span>
                  <span className="relative z-10 text-[11px] text-foreground/55 nums">{x.kcal} kcal</span>
                </Link>
              ))}
            </Section>
            <Section title="المجتمع" icon={Users} count={0}>
              <div className="text-[12px] text-foreground/55 px-1">لا نتائج.</div>
            </Section>
          </div>
        )}
      </div>
    </FeatureShell>
  );
}

function Section({ title, icon: Icon, count, children }: { title: string; icon: any; count: number; children: any }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className="text-primary" />
        <h2 className="text-sm font-medium flex-1">{title}</h2>
        <span className="text-[10px] text-foreground/55 nums">{count}</span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
