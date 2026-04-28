import { Link } from "@tanstack/react-router";
import { Home, Calendar, Dumbbell, Apple, User } from "lucide-react";

const items = [
  { to: "/home", label: "الرئيسية", icon: Home },
  { to: "/cycle", label: "الدورة", icon: Calendar },
  { to: "/workouts", label: "التمارين", icon: Dumbbell },
  { to: "/nutrition", label: "التغذية", icon: Apple },
  { to: "/profile", label: "حسابي", icon: User },
] as const;

export function BottomNav() {
  return (
    <nav className="absolute bottom-0 inset-x-0 bg-surface/95 backdrop-blur border-t border-border z-30">
      <div className="grid grid-cols-5 h-16">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center justify-center gap-1 text-[11px] text-muted-foreground transition-colors data-[status=active]:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            <Icon size={20} strokeWidth={1.75} />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
