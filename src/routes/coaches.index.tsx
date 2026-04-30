import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Star, MessageCircle, Calendar } from "lucide-react";

export const Route = createFileRoute("/coaches/")({ component: Page });

const coaches = [
  { id: "c1", name: "د. سارة الراشد", title: "أخصائيّة تغذية", rating: 4.9, reviews: 128, price: 80, avail: "اليوم 15:00" },
  { id: "c2", name: "المدرّبة دانة", title: "مدرّبة لياقة معتمدة", rating: 4.8, reviews: 96, price: 60, avail: "غداً 09:00" },
  { id: "c3", name: "د. ليلى محمد", title: "استشاريّة صحّة المرأة", rating: 5.0, reviews: 210, price: 120, avail: "الخميس 11:00" },
  { id: "c4", name: "المدرّبة ريم", title: "مدرّبة يوغا", rating: 4.7, reviews: 64, price: 50, avail: "اليوم 18:30" },
];

function Page() {
  return (
    <FeatureShell title="الخبيرات" back="/home" variant="default">
      <div className="px-5 pb-8 space-y-3">
        {coaches.map(c => (
          <Link key={c.id} to="/coaches/$id" params={{ id: c.id }} className="glass-strong rounded-2xl p-4 flex items-center gap-3">
            <div className="relative z-10 w-14 h-14 rounded-full shrink-0 flex items-center justify-center font-display text-xl text-white"
              style={{ background: "var(--gradient-primary)" }}>
              {c.name.charAt(0)}
            </div>
            <div className="relative z-10 flex-1 min-w-0">
              <div className="text-[13.5px] font-medium truncate">{c.name}</div>
              <div className="text-[11px] text-foreground/65 truncate">{c.title}</div>
              <div className="flex items-center gap-3 mt-1.5 text-[10.5px] text-foreground/65">
                <span className="flex items-center gap-1 nums"><Star size={10} className="text-primary fill-primary" />{c.rating} ({c.reviews})</span>
                <span className="flex items-center gap-1"><Calendar size={10} />{c.avail}</span>
              </div>
            </div>
            <div className="relative z-10 text-left">
              <div className="font-display text-base text-primary nums">${c.price}</div>
              <div className="text-[9px] text-foreground/55">/ جلسة</div>
            </div>
          </Link>
        ))}
      </div>
    </FeatureShell>
  );
}
