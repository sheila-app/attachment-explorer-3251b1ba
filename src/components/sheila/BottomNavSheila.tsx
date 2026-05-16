import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Calendar, Dumbbell, Apple, Sparkles } from "lucide-react";
import sheilaIcon from "@/assets/sheila-icon.png";

const sideItems = [
  // RTL: العناصر تُرسم من اليمين لليسار — الترتيب البصري: الدورة | التمارين | [الرئيسية] | التغذية | رحلتك
  { to: "/cycle", label: "الدورة", icon: Calendar },
  { to: "/workouts", label: "التمارين", icon: Dumbbell },
] as const;

const sideItemsLeft = [
  { to: "/nutrition", label: "التغذية", icon: Apple },
  { to: "/journey", label: "رحلتك", icon: Sparkles },
] as const;

/** شريط تنقّل سفلي — زر الرئيسية في المنتصف بارز يحمل أيقونة شيلا. */
export function BottomNavSheila() {
  const { pathname } = useLocation();
  const homeActive = pathname === "/home";

  return (
    <nav className="absolute bottom-0 inset-x-0 z-30 px-4 pb-4 pt-2">
      <div className="glass-strong rounded-2xl relative">
        <div className="grid grid-cols-5 h-[68px] items-end">
          {sideItems.map((it) => <NavLink key={it.to} {...it} active={pathname.startsWith(it.to)} />)}

          {/* خانة فاضية للحفاظ على الشبكة — زر الرئيسية يطفو فوقها */}
          <div className="relative h-full flex items-end justify-center">
            <Link
              to="/home-draft"
              className="absolute -top-6 flex items-center justify-center"
              aria-label="الرئيسية"
            >
              <img
                src={sheilaIcon}
                alt="شيلا"
                width={52}
                height={52}
                loading="lazy"
                className="w-[52px] h-[52px] object-contain drop-shadow-md"
              />
            </Link>
            <span className={`text-[10px] mb-[14px] ${homeActive ? "text-primary font-medium" : "text-muted-foreground"}`}>
              الرئيسية
            </span>
          </div>

          {sideItemsLeft.map((it) => <NavLink key={it.to} {...it} active={pathname.startsWith(it.to)} />)}
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  to, label, icon: Icon, active,
}: {
  to: string; label: string; icon: typeof Calendar; active: boolean;
}) {
  return (
    <Link
      to={to}
      className="relative flex flex-col items-center justify-center gap-1 text-[10px] h-full"
    >
      {active && (
        <motion.span
          layoutId="nav-sheila-indicator"
          className="absolute inset-1.5 rounded-lg"
          style={{
            background: "linear-gradient(135deg, oklch(1 0 0 / 0.5), oklch(0.66 0.16 322 / 0.18))",
            boxShadow: "inset 0 1px 0 0 oklch(1 0 0 / 0.7), 0 4px 14px -6px oklch(0.46 0.135 328 / 0.35)",
          }}
        />
      )}
      <motion.div whileTap={{ scale: 0.85 }} className="flex flex-col items-center gap-1 relative">
        <Icon size={20} strokeWidth={active ? 2.25 : 1.75} className={active ? "text-primary" : "text-muted-foreground"} />
        <span className={active ? "text-primary font-medium" : "text-muted-foreground"}>{label}</span>
      </motion.div>
    </Link>
  );
}
