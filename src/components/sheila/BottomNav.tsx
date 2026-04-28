import { Link, useLocation } from "@tanstack/react-router";
import { Home, Calendar, Dumbbell, Apple, User } from "lucide-react";

const items = [
  { to: "/home", label: "الرئيسية", icon: Home },
  { to: "/cycle", label: "الدورة", icon: Calendar },
  { to: "/workouts", label: "التمارين", icon: Dumbbell },
  { to: "/nutrition", label: "التغذية", icon: Apple },
  { to: "/profile", label: "حسابي", icon: User },
];

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav
      className="absolute bottom-0 inset-x-0 z-30 px-3 pb-3 pt-2"
      style={{
        background: "linear-gradient(180deg, transparent 0%, var(--background) 40%)",
      }}
    >
      <div
        className="bg-surface/95 backdrop-blur-xl border border-border/60 rounded-3xl"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        <div className="grid grid-cols-5 h-16">
          {items.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || pathname.startsWith(to + "/");
            return (
              <Link
                key={to}
                to={to as "/home"}
                className="relative flex flex-col items-center justify-center gap-1 text-[10px] transition-colors"
              >
                {active && (
                  <span className="absolute top-1.5 w-8 h-1 rounded-full bg-primary" />
                )}
                <Icon
                  size={20}
                  strokeWidth={active ? 2.25 : 1.75}
                  className={active ? "text-primary" : "text-muted-foreground"}
                />
                <span className={active ? "text-primary font-medium" : "text-muted-foreground"}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
