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
    <nav className="absolute bottom-0 inset-x-0 bg-surface/95 backdrop-blur border-t border-border z-30">
      <div className="grid grid-cols-5 h-16">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to as "/home"}
              className={`flex flex-col items-center justify-center gap-1 text-[11px] transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={20} strokeWidth={1.75} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
