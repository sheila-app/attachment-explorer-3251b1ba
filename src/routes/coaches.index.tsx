import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Star, Calendar, Gift } from "lucide-react";

export const Route = createFileRoute("/coaches/")({ component: Page });

const coaches = [
  { id: "c1", name: "د. سارة الراشد", title: "أخصائيّة تغذية", rating: 4.9, reviews: 128, price: 80, avail: "اليوم 15:00" },
  { id: "c2", name: "المدرّبة دانة", title: "مدرّبة لياقة معتمدة", rating: 4.8, reviews: 96, price: 60, avail: "غداً 09:00" },
  { id: "c3", name: "د. ليلى محمد", title: "استشاريّة صحّة المرأة", rating: 5.0, reviews: 210, price: 120, avail: "الخميس 11:00" },
  { id: "c4", name: "المدرّبة ريم", title: "مدرّبة يوغا", rating: 4.7, reviews: 64, price: 50, avail: "اليوم 18:30" },
  { id: "c5", name: "المدرّبة لين", title: "بيلاتس معتمدة", rating: 4.6, reviews: 45, price: 55, avail: "غداً ١٠:٠٠" },
  { id: "c6", name: "المدرّبة نور", title: "HIIT وتغذية رياضية", rating: 4.8, reviews: 89, price: 70, avail: "اليوم ٢٠:٠٠" },
];

const filters = ["الكل", "لياقة", "تغذية", "يوغا", "HIIT", "صحة المرأة"];

function Page() {
  const [activeFilter, setActiveFilter] = useState("الكل");

  return (
    <FeatureShell title="الخبيرات" back="/home" variant="default">
      <div className="pb-8">
        {/* Free first session banner */}
        <div
          className="mx-5 mb-4 p-4 rounded-2xl flex items-center gap-3"
          style={{ background: "oklch(0.46 0.135 328 / 0.08)", border: "1px solid oklch(0.46 0.135 328 / 0.15)" }}
        >
          <Gift size={28} className="text-primary flex-shrink-0" strokeWidth={1.75} />
          <div>
            <p className="text-sm font-semibold text-foreground">جلستكِ الأولى مجانية</p>
            <p className="text-xs text-muted-foreground mt-0.5">احجزي مع أي خبيرة وابدئي مجاناً</p>
          </div>
        </div>

        {/* Specialty filter chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4 px-5 -mx-0">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="glass shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-medium"
              style={
                activeFilter === f
                  ? { background: "var(--gradient-primary)", color: "white" }
                  : undefined
              }
            >
              {activeFilter !== f && <span className="text-foreground/70">{f}</span>}
              {activeFilter === f && f}
            </button>
          ))}
        </div>

        {/* Coach cards */}
        <div className="px-5 space-y-3">
          {coaches.map(c => (
            <Link
              key={c.id}
              to="/coaches/$id"
              params={{ id: c.id }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-border p-4 flex items-center gap-3"
            >
              <div
                className="relative z-10 w-14 h-14 rounded-full shrink-0 flex items-center justify-center font-display text-xl text-white"
                style={{ background: "var(--gradient-primary)" }}
              >
                {c.name.charAt(0)}
              </div>

              <div className="relative z-10 flex-1 min-w-0">
                <div className="text-[14px] font-bold text-foreground truncate">{c.name}</div>
                <div className="text-[11.5px] text-muted-foreground truncate">{c.title}</div>
                <div className="flex items-center gap-3 mt-1.5 text-[10.5px] text-foreground/65">
                  <span className="flex items-center gap-1 nums">
                    <Star size={10} className="text-primary fill-primary" />
                    <span className="text-sm font-semibold text-foreground">{c.rating}</span>
                    <span>({c.reviews})</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    {c.avail}
                  </span>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-end gap-2">
                <div className="text-end">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-lg font-bold text-primary nums">{c.price}</span>
                    <span className="text-[10px] text-muted-foreground">د.إ / جلسة</span>
                  </div>
                </div>
                <button
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-white flex-shrink-0"
                  style={{ background: "var(--gradient-primary)" }}
                  onClick={e => e.preventDefault()}
                >
                  احجزي
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </FeatureShell>
  );
}
