import { createFileRoute } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";

export const Route = createFileRoute("/404")({ component: Page });

function Page() {
  return (
    <DeviceFrame>
      <div className="relative h-full min-h-screen flex flex-col items-center justify-center overflow-hidden text-center px-7">
        <LiquidBackdrop variant="default" />
        <div className="relative z-10 animate-rise">
          <div className="font-display text-[88px] leading-none nums" style={{
            background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>404</div>
          <h1 className="font-display text-[22px] mt-4">الصفحة غير موجودة</h1>
          <p className="text-[13px] text-foreground/65 mt-2">يبدو أنّكِ ضللتِ الطريق — لا بأس، نعيدكِ للرئيسيّة.</p>
          <a href="/home" className="inline-block mt-6 px-6 py-3 rounded-2xl text-white text-[13px] font-medium"
            style={{ background: "var(--gradient-primary)", boxShadow: "0 12px 28px -10px oklch(0.46 0.135 328 / 0.5)" }}>
            العودة للرئيسيّة
          </a>
        </div>
      </div>
    </DeviceFrame>
  );
}
