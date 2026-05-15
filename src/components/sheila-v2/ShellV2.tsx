import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Bell } from "lucide-react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { BottomNavV2 } from "./BottomNavV2";
import { SheilaFAB } from "./SheilaFAB";
import { SheilaV2Provider, useSheilaV2 } from "./SheilaV2Store";

interface Props {
  title?: string;
  back?: string;
  children: ReactNode;
  showNav?: boolean;
  showFAB?: boolean;
  fabSide?: "start" | "end";
  variant?: "default" | "warm" | "calm" | "energetic";
  rightSlot?: ReactNode;
  bare?: boolean;
}

/** هيكل موحّد لشاشات v2 — هيدر + content + bottom nav + FAB. */
export function ShellV2({
  title, back, children, showNav = true, showFAB = true, fabSide = "end",
  variant = "default", rightSlot, bare = false,
}: Props) {
  return (
    <SheilaV2Provider>
      <DeviceFrame>
        <div className="relative h-full overflow-hidden">
          <LiquidBackdrop variant={variant} />
          <div className={`relative z-10 h-full overflow-y-auto no-scrollbar ${showNav ? "pb-28" : "pb-8"}`}>
            {!bare && (title || back || rightSlot) && (
              <header className="px-5 pt-6 pb-3 flex items-center gap-3">
                {back ? (
                  <Link to={back as "/"} className="glass w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <ArrowRight size={17} strokeWidth={1.75} className="relative z-10" />
                  </Link>
                ) : <div className="w-10" />}
                <h1 className="flex-1 font-display text-[22px] leading-none">{title}</h1>
                {rightSlot}
              </header>
            )}
            {children}
          </div>
          {showFAB && <SheilaFAB side={fabSide} />}
          {showNav && <BottomNavV2 />}
        </div>
      </DeviceFrame>
    </SheilaV2Provider>
  );
}

/** هيدر الرئيسيّة — أفاتار يمين، جرس يسار، عنوان مخصّص. */
export function HomeHeader({ name, onAvatar = "/sheila-v2/profile" }: { name: string; onAvatar?: string }) {
  return (
    <div className="grid grid-cols-3 items-center px-5 pt-5 gap-3">
      <Link to={onAvatar as "/"} className="justify-self-start flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-full grid place-items-center font-display text-[14px] text-primary-foreground"
             style={{ background: "var(--gradient-primary)", boxShadow: "0 6px 14px -6px oklch(0.46 0.135 328 / 0.5)" }}>
          {name[0]}
        </div>
        <div className="min-w-0">
          <div className="text-[10px] tracking-widest text-foreground/55">مرحباً</div>
          <div className="font-display text-[14px] truncate leading-tight">{name}</div>
        </div>
      </Link>
      <div className="justify-self-center" />
      <Link to="/sheila-v2/notifications" className="justify-self-end relative w-10 h-10 rounded-full bg-white/70 backdrop-blur border border-white/60 flex items-center justify-center shadow-sm">
        <Bell size={17} strokeWidth={1.75} className="text-foreground/75" />
        <span className="absolute top-2 end-2 w-1.5 h-1.5 rounded-full bg-destructive" />
      </Link>
    </div>
  );
}

/** شارة المرحلة — تفتح شاشة تعليم مرحلة. */
export function PhasePill({ phase, name, color }: { phase: string; name: string; color: string }) {
  return (
    <Link
      to="/sheila-v2/cycle/phase/$phase" params={{ phase }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-[11px] font-medium"
    >
      <span className="w-1.5 h-1.5 rounded-full relative z-10" style={{ background: color }} />
      <span className="relative z-10">{name}</span>
    </Link>
  );
}
