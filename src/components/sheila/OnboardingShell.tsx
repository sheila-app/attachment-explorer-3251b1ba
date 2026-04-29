import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DeviceFrame } from "./DeviceFrame";
import { LiquidBackdrop } from "./LiquidBackdrop";

interface Props {
  step: number;
  total: number;
  back?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** أزرار سفليّة مثبّتة (CTA) */
  footer: ReactNode;
  variant?: "default" | "warm" | "calm" | "energetic";
}

/**
 * هيكل موحّد لشاشات Onboarding — هيدر بمؤشّر تقدّم، عنوان، محتوى، CTA سفلي.
 */
export function OnboardingShell({ step, total, back, title, subtitle, children, footer, variant = "default" }: Props) {
  const pct = (step / total) * 100;
  return (
    <DeviceFrame>
      <div className="relative h-full min-h-screen flex flex-col overflow-hidden">
        <LiquidBackdrop variant={variant} />

        <header className="relative z-10 px-5 pt-6 pb-3 flex items-center gap-3">
          {back ? (
            <Link to={back as "/"} className="glass w-10 h-10 rounded-full flex items-center justify-center shrink-0">
              <ArrowRight size={17} strokeWidth={1.75} className="relative z-10" />
            </Link>
          ) : <div className="w-10" />}
          <div className="flex-1 h-1 rounded-full bg-foreground/10 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: "var(--gradient-primary)" }} />
          </div>
          <span className="text-[10px] tracking-[0.2em] text-foreground/65 nums tabular-nums">{step}/{total}</span>
        </header>

        <div className="relative z-10 flex-1 px-7 pt-6 pb-4 overflow-y-auto no-scrollbar animate-rise">
          <h1 className="font-display text-[26px] leading-tight">{title}</h1>
          {subtitle && <p className="text-sm text-foreground/65 mt-2 leading-relaxed">{subtitle}</p>}
          <div className="mt-7">{children}</div>
        </div>

        <div className="relative z-10 px-7 pb-8 pt-2">{footer}</div>
      </div>
    </DeviceFrame>
  );
}

interface CTAProps {
  to?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "ghost";
}

export function PrimaryCTA({ to, onClick, children }: CTAProps) {
  const cls = "group relative flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-primary-foreground font-medium text-sm transition-transform active:scale-[0.98] overflow-hidden";
  const style = {
    background: "var(--gradient-primary)",
    boxShadow: "0 12px 32px -8px oklch(0.46 0.135 328 / 0.5), inset 0 1px 0 0 oklch(1 0 0 / 0.4)",
  };
  const inner = (
    <>
      <span
        className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl pointer-events-none"
        style={{ background: "linear-gradient(180deg, oklch(1 0 0 / 0.25), transparent)" }}
      />
      <span className="relative">{children}</span>
    </>
  );
  if (to) return <Link to={to as "/"} className={cls} style={style}>{inner}</Link>;
  return <button onClick={onClick} className={cls} style={style}>{inner}</button>;
}

export function GhostCTA({ to, onClick, children }: CTAProps) {
  const cls = "block w-full text-center text-sm text-foreground/70 py-3";
  if (to) return <Link to={to as "/"} className={cls}>{children}</Link>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

/** عنصر اختيار من قائمة (single-select) — بطاقة زجاجيّة قابلة للنقر */
export function OptionCard({
  selected, onClick, title, hint, leading,
}: {
  selected?: boolean;
  onClick?: () => void;
  title: string;
  hint?: string;
  leading?: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="glass w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-right transition-transform active:scale-[0.99]"
      style={selected ? {
        boxShadow: "0 0 0 2px var(--primary), 0 12px 30px -10px oklch(0.46 0.135 328 / 0.4), inset 0 1px 0 0 oklch(1 0 0 / 0.6)",
      } : undefined}
    >
      {leading && <div className="relative z-10 shrink-0">{leading}</div>}
      <div className="relative z-10 flex-1 min-w-0">
        <div className="text-[14px] font-medium">{title}</div>
        {hint && <div className="text-[11px] text-foreground/60 mt-0.5">{hint}</div>}
      </div>
      {selected && (
        <div
          className="relative z-10 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "var(--gradient-primary)" }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M2 5.5l2.5 2.5L9 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </button>
  );
}
