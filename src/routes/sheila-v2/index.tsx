import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Home, Calendar, Heart, Baby, Activity, Dumbbell, Play, Wand2,
  Apple, BookOpen, Camera, ListChecks, Sparkles, Trophy, FileText,
  Users, MessageCircle, CalendarDays, UserPlus, User2, Palette,
  CreditCard, Bell, AlertCircle, LayoutGrid,
} from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";

export const Route = createFileRoute("/sheila-v2/")({ component: GalleryPage });

const SECTIONS: { title: string; items: { to: string; label: string; icon: any; desc?: string }[] }[] = [
  { title: "الرئيسيّة", items: [
    { to: "/sheila-v2/home", label: "الرئيسيّة", icon: Home, desc: "5 بلوكات + Daily Message" },
  ]},
  { title: "تاب الصحّة المتكيّف", items: [
    { to: "/sheila-v2/cycle", label: "الدورة", icon: Calendar, desc: "تقويم + توقّعات" },
    { to: "/sheila-v2/cycle/phase/follicular", label: "تعليم مرحلة", icon: Calendar },
    { to: "/sheila-v2/pregnancy", label: "رحلة الحمل", icon: Baby },
    { to: "/sheila-v2/postpartum", label: "ما بعد الولادة", icon: Heart },
    { to: "/sheila-v2/health", label: "صحتي", icon: Activity, desc: "سن اليأس / حالات" },
  ]},
  { title: "التمارين", items: [
    { to: "/sheila-v2/workouts", label: "التمارين", icon: Dumbbell, desc: "3 zones" },
    { to: "/sheila-v2/workouts/player", label: "Active Player", icon: Play, desc: "شاشة جديدة" },
    { to: "/sheila-v2/workouts/builder", label: "Builder شيلا", icon: Wand2 },
  ]},
  { title: "التغذية", items: [
    { to: "/sheila-v2/nutrition", label: "التغذية", icon: Apple, desc: "4 slots" },
    { to: "/sheila-v2/nutrition/recipes", label: "الوصفات", icon: BookOpen, desc: "+ Recipe Builder" },
    { to: "/sheila-v2/nutrition/photo", label: "صوّري وجبتك", icon: Camera, desc: "Photo ID" },
    { to: "/sheila-v2/nutrition/log", label: "سجّلي وجبة", icon: ListChecks },
    { to: "/sheila-v2/nutrition/shopping", label: "قائمة التسوّق", icon: ListChecks },
  ]},
  { title: "دائرة شيلا", items: [
    { to: "/sheila-v2/circle", label: "Feed", icon: Users },
    { to: "/sheila-v2/circle/compose", label: "نشر", icon: MessageCircle },
    { to: "/sheila-v2/circle/groups", label: "مجموعات", icon: Users },
    { to: "/sheila-v2/circle/events", label: "فعاليّات", icon: CalendarDays },
    { to: "/sheila-v2/circle/accountability", label: "شريك المساءلة", icon: UserPlus, desc: "AI matching" },
  ]},
  { title: "رحلتك", items: [
    { to: "/sheila-v2/journey", label: "رحلتك", icon: Sparkles },
    { to: "/sheila-v2/journey/insights", label: "Smart Insights", icon: Sparkles, desc: "4 رؤى AI" },
    { to: "/sheila-v2/journey/achievements", label: "إنجازاتي", icon: Trophy, desc: "5 tiers" },
    { to: "/sheila-v2/journey/report", label: "تقرير شهري", icon: FileText },
  ]},
  { title: "حسابي وشيلا", items: [
    { to: "/sheila-v2/profile", label: "حسابي", icon: User2 },
    { to: "/sheila-v2/profile/appearance", label: "المظهر", icon: Palette },
    { to: "/sheila-v2/profile/subscription", label: "الاشتراك", icon: CreditCard },
    { to: "/sheila-v2/notifications", label: "الإشعارات", icon: Bell },
    { to: "/sheila-v2/sheila", label: "شات شيلا", icon: Sparkles, desc: "+ كشف ضائقة" },
    { to: "/sheila-v2/emergency", label: "موارد طارئة", icon: AlertCircle },
  ]},
];

function GalleryPage() {
  return (
    <ShellV2 showNav={false} showFAB={false} bare>
      <div className="px-5 pt-7 pb-10">
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "var(--gradient-primary)", boxShadow: "0 8px 20px -6px oklch(0.46 0.135 328 / 0.5)" }}>
            <LayoutGrid size={20} className="text-primary-foreground" strokeWidth={2} />
          </div>
          <div>
            <h1 className="font-display text-[24px] leading-none">SHEILA v2</h1>
            <p className="text-[12px] text-foreground/60 mt-1">إعادة تصميم كاملة — تصفّحي كل الشاشات الجديدة</p>
          </div>
        </div>
        <Link to="/sheila-v2/home" className="mt-5 block rounded-2xl p-4 text-primary-foreground"
              style={{ background: "var(--gradient-primary)", boxShadow: "0 14px 36px -10px oklch(0.46 0.135 328 / 0.5)" }}>
          <div className="text-[12px] opacity-80">ابدئي من</div>
          <div className="font-display text-[18px] mt-0.5">الرئيسيّة</div>
        </Link>

        {SECTIONS.map((sec) => (
          <section key={sec.title} className="mt-6">
            <h2 className="text-[12.5px] font-semibold text-foreground/65 mb-2.5 px-1">{sec.title}</h2>
            <div className="grid grid-cols-2 gap-2.5">
              {sec.items.map((it) => (
                <Link key={it.to} to={it.to as "/"} className="glass rounded-2xl p-3.5 active:scale-[0.98] transition-transform">
                  <div className="relative z-10 flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/70 flex items-center justify-center shrink-0 border border-white/60">
                      <it.icon size={16} strokeWidth={1.75} className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] font-medium leading-tight">{it.label}</div>
                      {it.desc && <div className="text-[10px] text-foreground/55 mt-0.5">{it.desc}</div>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </ShellV2>
  );
}
