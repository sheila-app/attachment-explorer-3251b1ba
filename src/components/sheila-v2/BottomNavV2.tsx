import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Home, Calendar, Dumbbell, Apple, Sparkle } from "lucide-react";
import { useLifeStage } from "./LifeStageContext";

/**
 * شريط تنقّل سفلي v2 — 5 تابات، التاب الثاني يتكيّف مع مرحلة الحياة.
 */
export function BottomNavV2() {
  const { pathname } = useLocation();
  const { tabLabel, tabPath } = useLifeStage();

  const items = [
    { to: "/sheila-v2/home",     label: "الرئيسية", icon: Home },
    { to: tabPath,                label: tabLabel,   icon: Calendar },
    { to: "/sheila-v2/workouts", label: "التمارين", icon: Dumbbell },
    { to: "/sheila-v2/nutrition",label: "التغذية",  icon: Apple },
    { to: "/sheila-v2/journey",  label: "رحلتك",    icon: Sparkle },
  ];

  return (
    <nav className="absolute bottom-0 inset-x-0 z-30 px-4 pb-4 pt-2">
      <div className="glass-strong rounded-2xl overflow-hidden">
        <div className="grid grid-cols-5 h-[68px]">
          {items.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || pathname.startsWith(to + "/");
            return (
              <Link key={to + label} to={to as "/"} className="relative flex flex-col items-center justify-center gap-1 text-[10px]">
                {active && (
                  <motion.span
                    layoutId="nav-v2-indicator"
                    className="absolute inset-1.5 rounded-lg"
                    style={{
                      background: "linear-gradient(135deg, oklch(1 0 0 / 0.5), oklch(0.66 0.16 322 / 0.18))",
                      boxShadow: "inset 0 1px 0 0 oklch(1 0 0 / 0.7), 0 4px 14px -6px oklch(0.46 0.135 328 / 0.35)",
                    }}
                  />
                )}
                <motion.div whileTap={{ scale: 0.85 }} className="flex flex-col items-center gap-1">
                  <Icon size={20} strokeWidth={active ? 2.25 : 1.75} className={`relative ${active ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`relative ${active ? "text-primary font-medium" : "text-muted-foreground"}`}>{label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
