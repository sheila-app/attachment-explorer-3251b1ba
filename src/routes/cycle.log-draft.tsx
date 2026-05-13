import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { OptionCard, PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cycle/log-draft")({ component: LogDraftPage });

function FlowDots({ count, active }: { count: 1 | 2 | 3; active: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full transition-colors"
          style={{
            background: active ? "var(--phase-menstrual-deep)" : "color-mix(in oklab, var(--phase-menstrual) 55%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

function formatDateAr(d: Date) {
  return d.toLocaleDateString("ar", { day: "numeric", month: "long", year: "numeric" });
}

function LogDraftPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [flow, setFlow] = useState<"light" | "med" | "heavy">("med");
  const [symptoms, setSymptoms] = useState<string[]>(["cramp"]);

  const flows: { id: "light" | "med" | "heavy"; t: string; dots: 1 | 2 | 3 }[] = [
    { id: "light", t: "خفيف", dots: 1 },
    { id: "med", t: "متوسّط", dots: 2 },
    { id: "heavy", t: "غزير", dots: 3 },
  ];

  const sym = [
    { id: "cramp", t: "تشنّج" }, { id: "head", t: "صداع" }, { id: "tired", t: "إرهاق" },
    { id: "mood", t: "تقلّب مزاجي" }, { id: "bloat", t: "انتفاخ" }, { id: "back", t: "ألم ظهر" },
  ];
  const toggle = (id: string) => setSymptoms(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <FeatureShell title="تسجيل الدورة" back="/cycle" showNav={false} variant="warm">
      <div className="px-5 pb-6">
        <h2 className="text-sm font-medium mb-2.5">التاريخ</h2>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              className="glass w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-right mb-6 transition-transform active:scale-[0.99]"
            >
              <div className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "color-mix(in oklab, var(--phase-menstrual) 18%, transparent)" }}
              >
                <CalendarIcon size={16} className="text-phase-menstrual-deep" strokeWidth={2} />
              </div>
              <div className="relative z-10 flex-1 min-w-0">
                <div className="text-[10px] tracking-[0.18em] text-foreground/55 uppercase">يوم التسجيل</div>
                <div className="text-[14px] font-medium mt-0.5">
                  {date ? formatDateAr(date) : "اختاري التاريخ"}
                </div>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => { setDate(d); setOpen(false); }}
              disabled={(d) => d > new Date()}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        <h2 className="text-sm font-medium mb-2.5">شدّة التدفّق</h2>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {flows.map(f => {
            const active = flow === f.id;
            return (
              <button key={f.id} onClick={() => setFlow(f.id)}
                className="glass rounded-2xl py-3 flex flex-col items-center justify-center gap-1.5"
                style={active ? { boxShadow: "0 0 0 2px var(--phase-menstrual), inset 0 1px 0 0 oklch(1 0 0 / 0.6)", color: "var(--phase-menstrual-deep)" } : undefined}
              >
                <span className="relative z-10"><FlowDots count={f.dots} active={active} /></span>
                <span className="relative z-10 text-[12.5px] font-medium">{f.t}</span>
              </button>
            );
          })}
        </div>

        <h2 className="text-sm font-medium mb-2.5">الأعراض</h2>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {sym.map(s => (
            <OptionCard key={s.id} title={s.t} selected={symptoms.includes(s.id)} onClick={() => toggle(s.id)} />
          ))}
        </div>

        <h2 className="text-sm font-medium mb-2.5">ملاحظات</h2>
        <div className="glass rounded-2xl p-4">
          <textarea rows={3} placeholder="كيف تشعرين اليوم؟"
            className="relative z-10 w-full bg-transparent text-sm outline-none placeholder:text-foreground/40 resize-none" />
        </div>

        <div className="mt-6">
          <PrimaryCTA to="/cycle">حفظ التسجيل</PrimaryCTA>
        </div>
      </div>
    </FeatureShell>
  );
}
