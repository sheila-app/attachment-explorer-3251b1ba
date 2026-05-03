import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { IOSWheel, wheelRange } from "@/components/sheila/IOSWheel";

export const Route = createFileRoute("/onboarding/dob")({ component: DobPage });

const months = [
  "يناير","فبراير","مارس","أبريل","مايو","يونيو",
  "يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",
];

function DobPage() {
  const yearNow = new Date().getFullYear();
  const [day, setDay] = useState<number>(15);
  const [monthIdx, setMonthIdx] = useState<number>(5);
  const [year, setYear] = useState<number>(1996);

  const age = useMemo(() => {
    const today = new Date();
    let a = today.getFullYear() - year;
    const m = today.getMonth() - monthIdx;
    if (m < 0 || (m === 0 && today.getDate() < day)) a--;
    return a;
  }, [day, monthIdx, year]);

  return (
    <OnboardingShell
      step={2} total={12} back="/onboarding/auth"
      title="ما تاريخ ميلادكِ؟"
      subtitle="اسحبي العجلات لاختيار التاريخ. يجب أن تكوني 16 سنة فأكثر."
      footer={<PrimaryCTA to="/onboarding/goal">متابعة</PrimaryCTA>}
    >
      <div className="glass rounded-2xl overflow-hidden p-4">
        <div className="relative z-10 flex justify-center gap-3" style={{ direction: "ltr" }}>
          <IOSWheel label="يوم" values={wheelRange(1, 31)} value={day} onChange={(v) => setDay(Number(v))} width={64} />
          <IOSWheel label="شهر" values={months} value={months[monthIdx]} onChange={(v) => setMonthIdx(months.indexOf(String(v)))} width={108} />
          <IOSWheel label="سنة" values={wheelRange(yearNow - 80, yearNow - 16)} value={year} onChange={(v) => setYear(Number(v))} width={78} />
        </div>
      </div>
      <p className="text-[11px] text-foreground/55 mt-4 text-center">
        سنّكِ المحسوب: <span className="text-primary font-medium nums">{age}</span> سنة
      </p>
    </OnboardingShell>
  );
}
