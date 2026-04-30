import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA, GhostCTA } from "@/components/sheila/OnboardingShell";
import { Star, MessageCircle, Calendar, Award } from "lucide-react";

export const Route = createFileRoute("/coaches/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  // بيانات وهميّة بسيطة
  const c = { id, name: "د. سارة الراشد", title: "أخصائيّة تغذية إكلينيكيّة", rating: 4.9, reviews: 128, price: 80,
    bio: "خبرة 12 سنة في التغذية الموجَّهة لصحّة المرأة، الدورة الشهريّة والحمل. حاصلة على شهادة من الأكاديميّة السعوديّة للتغذية." };
  const slots = ["اليوم 15:00", "اليوم 17:30", "غداً 09:00", "غداً 14:00", "السبت 10:00"];

  return (
    <FeatureShell title={c.name} back="/coaches" showNav={false} variant="default">
      <div className="px-5 pb-8 space-y-5">
        <div className="glass-strong rounded-3xl p-5 flex items-center gap-4">
          <div className="relative z-10 w-20 h-20 rounded-full shrink-0 flex items-center justify-center font-display text-3xl text-white"
            style={{ background: "var(--gradient-primary)" }}>
            {c.name.charAt(0)}
          </div>
          <div className="relative z-10 flex-1">
            <h2 className="font-display text-[18px]">{c.name}</h2>
            <p className="text-[12px] text-foreground/65 mt-0.5">{c.title}</p>
            <div className="flex items-center gap-3 mt-2 text-[11px]">
              <span className="flex items-center gap-1 nums text-primary"><Star size={12} className="fill-primary" />{c.rating}</span>
              <span className="text-foreground/55 nums">{c.reviews} تقييم</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Stat icon={Award} v="12 سنة" l="خبرة" />
          <Stat icon={MessageCircle} v="2.4k" l="جلسات" />
          <Stat icon={Star} v="98%" l="رضا" />
        </div>

        <div className="glass rounded-2xl p-4">
          <h3 className="relative z-10 text-sm font-medium mb-2">عن الخبيرة</h3>
          <p className="relative z-10 text-[12.5px] text-foreground/75 leading-relaxed">{c.bio}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 px-1">المواعيد المتاحة</h3>
          <div className="grid grid-cols-2 gap-2">
            {slots.map((s, i) => (
              <button key={s} className="glass rounded-xl py-3 text-[12px] font-medium"
                style={i === 0 ? { boxShadow: "0 0 0 2px var(--primary)" } : undefined}>
                <span className="relative z-10 flex items-center justify-center gap-1.5"><Calendar size={11} className="text-primary" />{s}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <PrimaryCTA to="/profile/payment">احجزي الآن — ${c.price}</PrimaryCTA>
          <Link to="/coaches/$id/chat" params={{ id: c.id }} className="glass-strong w-full rounded-2xl py-3.5 flex items-center justify-center text-[13px] font-medium">
            <span className="relative z-10">💬 ابدئي محادثة</span>
          </Link>
          <GhostCTA to="/coaches">عودة</GhostCTA>
        </div>
      </div>
    </FeatureShell>
  );
}

function Stat({ icon: Ic, v, l }: { icon: any; v: string; l: string }) {
  return (
    <div className="glass rounded-2xl p-3 text-center">
      <Ic size={15} className="relative z-10 mx-auto text-primary" strokeWidth={1.75} />
      <div className="relative z-10 font-display text-[15px] mt-1.5 nums">{v}</div>
      <div className="relative z-10 text-[10px] text-foreground/55">{l}</div>
    </div>
  );
}
