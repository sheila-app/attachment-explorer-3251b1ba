import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/onboarding/dob")({ component: DobPage });

function DobPage() {
  const navigate = useNavigate();
  const [day, setDay] = useState("15");
  const [month, setMonth] = useState("06");
  const [year, setYear] = useState("1996");

  return (
    <OnboardingShell
      step={2} total={12} back="/onboarding/auth"
      title="ما تاريخ ميلادكِ؟"
      subtitle="نستخدمه لتخصيص توصياتكِ. يجب أن تكوني 16 سنة فأكثر."
      footer={<PrimaryCTA to="/onboarding/goal">متابعة</PrimaryCTA>}
    >
      <div className="glass rounded-2xl p-5">
        <div className="relative z-10 grid grid-cols-3 gap-3 nums">
          <NumField label="اليوم" value={day} onChange={setDay} max={31} />
          <NumField label="الشهر" value={month} onChange={setMonth} max={12} />
          <NumField label="السنة" value={year} onChange={setYear} max={2010} />
        </div>
      </div>
      <p className="text-[11px] text-foreground/55 mt-4 text-center">سنّكِ المحسوب: <span className="text-primary font-medium">28 سنة</span></p>
    </OnboardingShell>
  );
}

function NumField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void; max: number }) {
  return (
    <div className="text-center">
      <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-2">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-center font-display text-3xl text-primary outline-none"
        inputMode="numeric"
      />
    </div>
  );
}
