import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkin/")({ component: CheckinPage });

function CheckinPage() {
  const [sleep, setSleep] = useState(2);
  const [energy, setEnergy] = useState(2);
  const [schedule, setSchedule] = useState(1);

  return (
    <DeviceFrame>
      <div className="relative h-full min-h-screen flex flex-col overflow-hidden">
        <LiquidBackdrop variant="calm" />

        <header className="relative z-10 px-5 pt-6 pb-3 flex items-center">
          <Link to="/home" className="glass w-10 h-10 rounded-full flex items-center justify-center">
            <ArrowRight size={17} strokeWidth={1.75} className="relative z-10" />
          </Link>
        </header>

        <div className="relative z-10 flex-1 px-7 pt-6 animate-rise">
          <h1 className="font-display text-[26px]">كيف حالكِ اليوم؟</h1>
          <p className="text-sm text-foreground/65 mt-2">ثلاثة أسئلة سريعة لنخصّص يومكِ.</p>

          <Q label="كيف نمتِ؟" opts={["ممتاز", "جيّد", "عادي", "سيّئ"]} v={sleep} on={setSleep} />
          <Q label="مستوى طاقتكِ" opts={["عالي", "متوسّط", "منخفض"]} v={energy} on={setEnergy} />
          <Q label="جدولكِ اليوم" opts={["مزدحم", "عادي", "مرن"]} v={schedule} on={setSchedule} />
        </div>

        <div className="relative z-10 px-7 pb-9">
          <PrimaryCTA to="/home">حفظ ومتابعة</PrimaryCTA>
        </div>
      </div>
    </DeviceFrame>
  );
}

function Q({ label, opts, v, on }: { label: string; opts: string[]; v: number; on: (n: number) => void }) {
  return (
    <div className="mt-6">
      <div className="text-[12px] text-foreground/70 mb-2">{label}</div>
      <div className="flex gap-2">
        {opts.map((o, i) => (
          <button key={o} onClick={() => on(i)}
            className="glass flex-1 py-3 rounded-xl text-[12px] font-medium"
            style={v === i ? { background: "var(--gradient-primary)", color: "white", boxShadow: "0 10px 24px -10px oklch(0.46 0.135 328 / 0.5)" } : undefined}
          >
            <span className="relative z-10">{o}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
