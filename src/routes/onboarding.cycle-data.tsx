import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";
import { IOSWheel, wheelRange } from "@/components/sheila/IOSWheel";

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
  const [day, setDay] = useState<number>(today.getDate());
  const [monthIdx, setMonthIdx] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(yearNow);
  const [length, setLength] = useState<number>(28);
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
      <div className="space-y-2 mb-4">
        <OptionCard title="منتظمة" selected={status === "regular"} onClick={() => { setStatus("regular"); setReason(null); }} />
        <OptionCard title="غير منتظمة" selected={status === "irregular"} onClick={() => { setStatus("irregular"); setReason(null); }} />
        <OptionCard title="لا أعلم تاريخها" selected={status === "unknown"} onClick={() => { setStatus("unknown"); setReason(null); }} />
        <OptionCard title="لا أحيض" selected={status === "none"} onClick={() => setStatus("none")} />
      </div>

      {showCalendar && (
        <>
          <div className="glass rounded-2xl p-4 mb-3">
            <div className="relative z-10 text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-3 text-center">
              تاريخ بدء آخر دورة
            </div>
            <div className="relative z-10 flex justify-center gap-3" style={{ direction: "ltr" }}>
              <IOSWheel label="يوم" values={wheelRange(1, 31)} value={day} onChange={(v) => setDay(Number(v))} width={64} />
              <IOSWheel label="شهر" values={months} value={months[monthIdx]} onChange={(v) => setMonthIdx(months.indexOf(String(v)))} width={108} />
              <IOSWheel label="سنة" values={wheelRange(yearNow - 5, yearNow)} value={year} onChange={(v) => setYear(Number(v))} width={78} />
            </div>
          </div>

          <div className="glass rounded-2xl p-4">
            <div className="relative z-10 text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-3 text-center">
              معدّل طول الدورة (يوم)
            </div>
            <div className="relative z-10 flex justify-center" style={{ direction: "ltr" }}>
              <IOSWheel values={wheelRange(21, 45)} value={length} onChange={(v) => setLength(Number(v))} width={86} />
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
