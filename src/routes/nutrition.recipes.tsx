import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockMeals } from "@/data/mock";
import { Clock, Flame } from "lucide-react";

export const Route = createFileRoute("/nutrition/recipes")({ component: Page });

const TABS = ["الكل", "فطور", "غداء", "عشاء", "وجبة خفيفة"] as const;

function Page() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("الكل");
  const items = mockMeals.filter((m) => tab === "الكل" || m.type === tab);
  return (
    <FeatureShell title="الوصفات" back="/nutrition" variant="warm">
      <div className="px-5 pb-4">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="shrink-0 px-3.5 py-1.5 rounded-full text-[11.5px] font-medium glass"
              style={tab === t ? { background: "var(--gradient-primary)", color: "white" } : undefined}>
              <span className="relative z-10">{t}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 grid grid-cols-2 gap-2.5 stagger">
        {items.map((m) => (
          <Link to="/nutrition/$id" params={{ id: m.id }} key={m.id} className="glass rounded-2xl p-3">
            <div className="relative z-10 aspect-square rounded-xl mb-2" style={{ background: "var(--gradient-primary)", opacity: 0.85 }} />
            <div className="relative z-10 text-[12px] font-medium leading-tight">{m.title}</div>
            <div className="relative z-10 flex items-center gap-2 mt-1 text-[10px] text-foreground/60 nums">
              <span className="flex items-center gap-0.5"><Flame size={10} /> {m.kcal}</span>
              <span className="flex items-center gap-0.5"><Clock size={10} /> {m.prep}د</span>
            </div>
          </Link>
        ))}
      </div>
    </FeatureShell>
  );
}
