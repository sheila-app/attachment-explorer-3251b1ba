import { createFileRoute, Link } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { FloatingDoodles } from "@/components/sheila/FloatingDoodles";
import { toAr } from "@/lib/format";
import { Home, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/404")({ component: Page });

function Page() {
  return (
    <DeviceFrame>
      <div className="relative h-full flex flex-col items-center justify-center overflow-hidden text-center px-7">
        <LiquidBackdrop variant="calm" />
        <FloatingDoodles />

        <div className="relative z-10 animate-rise">
          {/* decorative SVG circles */}
          <div className="relative flex items-center justify-center mb-6">
            <svg width="200" height="120" viewBox="0 0 200 120" fill="none" className="absolute opacity-30">
              <circle cx="100" cy="60" r="55" stroke="var(--phase-menstrual)" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="100" cy="60" r="38" stroke="var(--phase-follicular)" strokeWidth="0.8" strokeDasharray="3 5" />
              <circle cx="100" cy="60" r="20" stroke="var(--phase-ovulation)" strokeWidth="0.6" strokeDasharray="2 4" />
            </svg>

            {/* floating phase dots */}
            <div
              className="absolute w-5 h-5 rounded-full -top-2 -end-8 animate-bounce"
              style={{
                background: "var(--phase-menstrual)",
                boxShadow: "0 4px 12px -4px var(--phase-menstrual)",
                animationDelay: "0s",
                animationDuration: "2.2s",
              }}
            />
            <div
              className="absolute w-3.5 h-3.5 rounded-full top-6 -start-10 animate-bounce"
              style={{
                background: "var(--phase-follicular)",
                boxShadow: "0 4px 12px -4px var(--phase-follicular)",
                animationDelay: "0.4s",
                animationDuration: "2.6s",
              }}
            />
            <div
              className="absolute w-4 h-4 rounded-full -bottom-1 start-4 animate-bounce"
              style={{
                background: "var(--phase-ovulation)",
                boxShadow: "0 4px 12px -4px var(--phase-ovulation)",
                animationDelay: "0.8s",
                animationDuration: "2.8s",
              }}
            />

            {/* large 404 number */}
            <span
              className="font-display nums relative z-10"
              style={{
                fontSize: "96px",
                lineHeight: 1,
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {toAr(404)}
            </span>
          </div>

          {/* message */}
          <h1 className="font-display text-[24px] mt-2 leading-tight">
            الصفحة غير موجودة
          </h1>
          <p className="text-[13px] text-foreground/65 mt-3 leading-relaxed max-w-xs mx-auto">
            ربّما تمّ نقل هذه الصفحة أو حذفها. لا تقلقي، سنعيدكِ للمسار الصحيح.
          </p>

          {/* buttons */}
          <div className="mt-8 flex flex-col gap-3 w-full max-w-[260px] mx-auto">
            <Link
              to="/home"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-[15px] text-primary-foreground"
              style={{
                background: "var(--gradient-primary)",
                boxShadow: "0 12px 28px -8px oklch(0.46 0.135 328 / 0.45)",
              }}
            >
              <Home size={16} strokeWidth={2} />
              العودة للرئيسيّة
            </Link>

            <Link
              to="/profile/help"
              className="glass flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-medium text-[15px] text-primary"
            >
              <MessageCircle size={16} strokeWidth={1.75} className="relative z-10" />
              <span className="relative z-10">تواصلي معنا</span>
            </Link>
          </div>

          {/* subtle footer note */}
          <p className="mt-8 text-[10.5px] text-foreground/40 nums">
            رمز الخطأ: {toAr(404)}
          </p>
        </div>
      </div>
    </DeviceFrame>
  );
}
