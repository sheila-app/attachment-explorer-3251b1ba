import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DeviceFrame } from "./DeviceFrame";
import { LiquidBackdrop } from "./LiquidBackdrop";
import { BottomNav } from "./BottomNav";

interface Props {
  title: string;
  back?: string;
  trailing?: ReactNode;
  children: ReactNode;
  showNav?: boolean;
  variant?: "default" | "warm" | "calm" | "energetic";
}

/**
 * هيكل موحّد لشاشات الميزات الأساسيّة (تمارين، تغذية، رحلة، ...) — هيدر زجاجي + محتوى قابل للتمرير + شريط سفلي اختياري.
 */
export function FeatureShell({ title, back, trailing, children, showNav = true, variant = "default" }: Props) {
  return (
    <DeviceFrame>
      <div className="relative h-full overflow-hidden">
        <LiquidBackdrop variant={variant} />
        <div className={`relative z-10 h-full overflow-y-auto no-scrollbar ${showNav ? "pb-28" : "pb-8"}`}>
          <header className="px-5 pt-6 pb-3 flex items-center gap-3">
            {back ? (
              <Link to={back as "/"} className="glass w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <ArrowRight size={17} strokeWidth={1.75} className="relative z-10" />
              </Link>
            ) : <div className="w-10" />}
            <h1 className="flex-1 font-display text-[22px] leading-none">{title}</h1>
            {trailing}
          </header>
          {children}
        </div>
        {showNav && <BottomNav />}
      </div>
    </DeviceFrame>
  );
}
