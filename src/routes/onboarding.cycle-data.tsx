import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/onboarding/cycle-data")({ component: Page });

type Status = "regular" | "irregular" | "unknown" | "none";
type NoneReason = "pregnant" | "breastfeeding" | "menopause" | "unsure";

const months = [
  "يناير","فبراير","مارس","أبريل","مايو","يونيو",
  "يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",
];
const today = new Date();
const yearNow = today.getFullYear();

function Page() {
  const [day, setDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(yearNow);
  const [length, setLength] = useState(28);
  const [status, setStatus] = useState<Status>("regular");
  const [reason, setReason] = useState<NoneReason | null>(null);

  const noneAdvice: Record<NoneReason, { title: string; body: string }> = {
    pregnant: { title: "تفعيل وضع الحمل", body: "سنخصّص لكِ تمارين وتغذية ملائمة لمرحلة الحمل." },
    breastfeeding: { title: "تفعيل وضع ما بعد الولادة", body: "برنامج لطيف للتعافي ودعم الإرضاع." },
    menopause: { title: "تفعيل وضع انقطاع الطمث", body: "نوصي بتمارين قوّة وتغذية تدعم الهرمونات." },
    unsure: { title: "نصيحة", body: "ننصح بمراجعة طبيبتكِ لتحديد السبب. سنبدأ معكِ بوضع عام مرن قابل للتعديل لاحقاً." },
  };

  const showCalendar = status === "regular" || status === "irregular";

  return (
    <OnboardingShell
      step={12} total={12} back="/onboarding/types"
      title="آخر دورة شهرية"
      subtitle="نحتاج لبدء التتبّع وتخصيص توصياتنا."
      footer={<PrimaryCTA to="/onboarding/trial">متابعة</PrimaryCTA>}
    >
      {/* Status options */}
      <div className="space-y-2 mb-4">
        <OptionCard title="منتظمة" selected={status === "regular"} onClick={() => { setStatus("regular"); setReason(null); }} />
        <OptionCard title="غير منتظمة" selected={status === "irregular"} onClick={() => { setStatus("irregular"); setReason(null); }} />
        <OptionCard title="لا أعلم تاريخها" selected={status === "unknown"} onClick={() => { setStatus("unknown"); setReason(null); }} />
        <OptionCard title="لا أحيض" selected={status === "none"} onClick={() => setStatus("none")} />
      </div>

      {/* Date wheel pickers */}
      {showCalendar && (
        <>
          <div className="glass rounded-2xl p-4 mb-3">
            <div className="relative z-10 text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-3 text-center">
              تاريخ بدء آخر دورة
            </div>
            <div className="relative z-10 grid grid-cols-3 gap-2" style={{ direction: "ltr" }}>
              <Wheel label="يوم" value={day} min={1} max={31} onChange={setDay} />
              <Wheel label="شهر" value={month + 1} min={1} max={12} onChange={(v) => setMonth(v - 1)} display={months[month]} />
              <Wheel label="سنة" value={year} min={yearNow - 5} max={yearNow} onChange={setYear} />
            </div>
          </div>

          <div className="glass rounded-2xl p-4">
            <div className="relative z-10 text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-3 text-center">
              معدّل طول الدورة (يوم)
            </div>
            <div className="relative z-10" style={{ direction: "ltr" }}>
              <Wheel label="" value={length} min={21} max={45} onChange={setLength} center />
            </div>
            <p className="relative z-10 text-[11px] text-foreground/55 mt-2 text-center">الافتراضي 28 • النطاق 21–45</p>
          </div>
        </>
      )}

      {status === "unknown" && (
        <div className="glass rounded-2xl p-4 text-[12.5px] text-foreground/75 leading-relaxed">
          لا مشكلة — سنستخدم تقديراً افتراضيّاً (28 يوم) ونحسّن التوقّعات بمرور الوقت بعد تسجيلكِ لدورتكِ القادمة.
        </div>
      )}

      {status === "none" && (
        <div className="space-y-2 stagger">
          <div className="text-[12px] text-foreground/65 mb-1 px-1">ما السبب؟</div>
          <OptionCard title="حامل" selected={reason === "pregnant"} onClick={() => setReason("pregnant")} />
          <OptionCard title="مرضعة" selected={reason === "breastfeeding"} onClick={() => setReason("breastfeeding")} />
          <OptionCard title="انقطاع الطمث" selected={reason === "menopause"} onClick={() => setReason("menopause")} />
          <OptionCard title="السبب غير معروف" selected={reason === "unsure"} onClick={() => setReason("unsure")} />

          {reason && (
            <div className="glass-strong rounded-2xl p-4 mt-3">
              <div className="relative z-10 font-display text-[15px] text-primary">{noneAdvice[reason].title}</div>
              <p className="relative z-10 text-[12.5px] text-foreground/75 mt-1.5 leading-relaxed">{noneAdvice[reason].body}</p>
            </div>
          )}
        </div>
      )}
    </OnboardingShell>
  );
}

function Wheel({
  label, value, min, max, onChange, display, center,
}: { label: string; value: number; min: number; max: number; onChange: (v: number) => void; display?: string; center?: boolean }) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <div className={`flex flex-col items-center ${center ? "" : ""}`}>
      {label && <div className="text-[10px] text-foreground/55 mb-1.5">{label}</div>}
      <button onClick={() => onChange(clamp(value + 1))} className="w-7 h-7 rounded-full glass-strong text-primary text-sm leading-none flex items-center justify-center">▲</button>
      <input
        type="number"
        value={value}
        min={min} max={max}
        onChange={(e) => onChange(clamp(parseInt(e.target.value || `${min}`, 10)))}
        className="relative z-10 my-1.5 bg-transparent w-full text-center font-display text-2xl text-primary outline-none nums"
      />
      {display && <div className="text-[10px] text-foreground/55 -mt-1 mb-1">{display}</div>}
      <button onClick={() => onChange(clamp(value - 1))} className="w-7 h-7 rounded-full glass-strong text-primary text-sm leading-none flex items-center justify-center">▼</button>
    </div>
  );
}
