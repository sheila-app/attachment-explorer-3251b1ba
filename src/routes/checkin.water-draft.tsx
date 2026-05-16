import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { ArrowRight, Plus, Minus, Droplet } from "lucide-react";

export const Route = createFileRoute("/checkin/water-draft")({ component: Page });

function Page() {
  const goal = 8;
  const [cups, setCups] = useState(5);
  const fillPct = Math.min(100, (cups / goal) * 100);

  return (
    <DeviceFrame>
      <div className="relative h-full overflow-hidden" style={{ background: "linear-gradient(180deg, oklch(0.95 0.04 230) 0%, oklch(0.92 0.06 230) 100%)" }}>
        {/* Water fill background */}
        <div
          className="absolute inset-x-0 bottom-0 transition-[height] duration-700 ease-out overflow-hidden"
          style={{ height: `${fillPct}%` }}
        >
          {/* Water body */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.78 0.13 230 / 0.85) 0%, oklch(0.62 0.16 240 / 0.95) 100%)",
            }}
          />
          {/* Wave 1 */}
          <svg
            className="absolute -top-[28px] left-0 w-[200%] h-[60px] animate-[wave_7s_linear_infinite]"
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C150,60 350,0 600,30 C850,60 1050,0 1200,30 L1200,60 L0,60 Z"
              fill="oklch(0.85 0.1 230 / 0.6)"
            />
          </svg>
          {/* Wave 2 */}
          <svg
            className="absolute -top-[20px] left-0 w-[200%] h-[50px] animate-[wave_5s_linear_infinite_reverse]"
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C200,0 400,60 600,30 C800,0 1000,60 1200,30 L1200,60 L0,60 Z"
              fill="oklch(0.92 0.06 230 / 0.5)"
            />
          </svg>
        </div>

        {/* 8 section dividers */}
        <div className="absolute inset-0 pointer-events-none flex flex-col-reverse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-t border-dashed border-[oklch(0.55_0.1_230_/_0.25)] flex items-center pe-3 justify-end"
            >
              <span
                className={`text-[10px] nums tabular-nums ${
                  i < cups ? "text-white/85" : "text-foreground/35"
                }`}
              >
                {i + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Foreground UI */}
        <div className="relative z-10 h-full flex flex-col">
          <header className="px-5 pt-6 pb-3 flex items-center gap-3">
            <Link
              to="/checkin"
              className="w-10 h-10 rounded-full bg-white/70 backdrop-blur flex items-center justify-center shadow-sm"
            >
              <ArrowRight size={17} strokeWidth={1.75} />
            </Link>
            <h1 className="flex-1 font-display text-[22px] leading-none text-foreground">
              تتبّع الماء
            </h1>
            <Link
              to="/checkin"
              className="h-10 px-3 rounded-full bg-white/70 backdrop-blur flex items-center gap-1.5 shadow-sm text-[12px] font-medium text-foreground"
            >
              <Droplet size={13} strokeWidth={1.75} className="text-primary" />
              سجل الأيام
            </Link>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-5">
            <div
              className={`flex flex-col items-center transition-colors ${
                fillPct > 45 ? "text-white" : "text-primary"
              }`}
            >
              <Droplet size={28} strokeWidth={1.5} />
              <div className="font-display text-6xl mt-2 nums">
                {cups}
                <span className="text-2xl opacity-70">/{goal}</span>
              </div>
              <div className="text-xs mt-1 opacity-80">كوب اليوم</div>
            </div>
          </div>

          <div className="px-5 pb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={() => setCups(Math.max(0, cups - 1))}
                className="w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow"
              >
                <Minus size={18} className="text-primary" />
              </button>
              <button
                onClick={() => setCups(Math.min(8, cups + 1))}
                className="w-16 h-16 rounded-full flex items-center justify-center text-primary-foreground"
                style={{
                  background: "var(--gradient-primary)",
                  boxShadow: "0 12px 32px -8px oklch(0.46 0.135 328 / 0.5)",
                }}
              >
                <Plus size={26} />
              </button>
            </div>
            <PrimaryCTA to="/home">حفظ</PrimaryCTA>
          </div>
        </div>

        <style>{`
          @keyframes wave {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </DeviceFrame>
  );
}
