import { Link, useLocation } from "@tanstack/react-router";
import { Home, Calendar, Dumbbell, Apple, User } from "lucide-react";

const items = [
  { to: "/home", label: "الرئيسية", icon: Home },
  { to: "/cycle", label: "الدورة", icon: Calendar },
  { to: "/workouts", label: "التمارين", icon: Dumbbell },
  { to: "/nutrition", label: "التغذية", icon: Apple },
  { to: "/profile", label: "حسابي", icon: User },
];

/**
 * شريط تنقّل سفلي بنمط Liquid Glass — عائم، شفّاف، حافّة مضيئة.
 */
export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="absolute bottom-0 inset-x-0 z-30 px-4 pb-4 pt-2">
      <div className="glass-strong rounded-2xl overflow-hidden">
        <div className="grid grid-cols-5 h-[68px] relative z-10">
          {items.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || pathname.startsWith(to + "/");
            return (
              <Link
                key={to}
                to={to as "/home"}
                className="relative flex flex-col items-center justify-center gap-1 text-[10px]"
              >
                {active && (
                  <span
                    className="absolute inset-1.5 rounded-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.66 0.16 322 / 0.22), oklch(0.46 0.135 328 / 0.12))",
                      boxShadow:
                        "inset 0 1px 0 0 oklch(1 0 0 / 0.6), 0 4px 12px -4px oklch(0.46 0.135 328 / 0.3)",
                    }}
                  />
                )}
                <Icon
                  size={20}
                  strokeWidth={active ? 2.25 : 1.75}
                  className={`relative ${active ? "text-primary" : "text-muted-foreground"}`}
                />
                <span
                  className={`relative ${active ? "text-primary font-medium" : "text-muted-foreground"}`}
                >
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
