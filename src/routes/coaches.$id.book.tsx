import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";
import { Calendar, Clock, Video, Phone, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/coaches/$id/book")({ component: Page });

function Page() {
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState("15:00");
  const [type, setType] = useState("video");
  const days = [
    { l: "اليوم", d: "30/04" }, { l: "غداً", d: "01/05" }, { l: "السبت", d: "02/05" },
    { l: "الأحد", d: "03/05" }, { l: "الاثنين", d: "04/05" },
  ];
  const times = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];

  return (
    <FeatureShell title="حجز جلسة" back="/coaches/$id" showNav={false} variant="default">
      <div className="px-5 pb-8 space-y-5">
        <div>
          <h3 className="text-sm font-medium mb-2">اختاري اليوم</h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {days.map((dd, i) => (
              <button key={i} onClick={() => setDay(i)}
                className="shrink-0 glass rounded-2xl px-4 py-3 text-center min-w-[72px]"
                style={day === i ? { background: "var(--gradient-primary)", color: "white" } : undefined}>
                <div className="relative z-10 text-[10px] opacity-75">{dd.l}</div>
                <div className="relative z-10 text-[13px] font-medium nums mt-0.5">{dd.d}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">الوقت</h3>
          <div className="grid grid-cols-3 gap-2">
            {times.map(t => (
              <button key={t} onClick={() => setSlot(t)}
                className="glass rounded-xl py-2.5 text-[12px] font-medium nums"
                style={slot === t ? { background: "var(--gradient-primary)", color: "white" } : undefined}>
                <span className="relative z-10 flex items-center justify-center gap-1"><Clock size={10} />{t}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">نوع الجلسة</h3>
          <div className="space-y-2">
            <OptionCard title="مكالمة فيديو" hint="45 دقيقة عبر الفيديو" selected={type === "video"} onClick={() => setType("video")} leading={<Video size={16} className="text-primary" />} />
            <OptionCard title="مكالمة صوتيّة" hint="30 دقيقة" selected={type === "voice"} onClick={() => setType("voice")} leading={<Phone size={16} className="text-primary" />} />
            <OptionCard title="استشارة كتابيّة" hint="ردّ خلال 24 ساعة" selected={type === "chat"} onClick={() => setType("chat")} leading={<MessageCircle size={16} className="text-primary" />} />
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-4">
          <div className="relative z-10 flex items-center gap-2 text-[12px] text-foreground/65 mb-2">
            <Calendar size={12} /> ملخّص الحجز
          </div>
          <div className="relative z-10 text-[13px] font-medium">{days[day].l} {days[day].d} — {slot}</div>
          <div className="relative z-10 flex items-center justify-between mt-2 pt-2 border-t border-foreground/10">
            <span className="text-[11px] text-foreground/55">الإجمالي</span>
            <span className="font-display text-xl text-primary nums">٨٠ د.إ</span>
          </div>
        </div>

        <PrimaryCTA to="/profile/payment">تأكيد الحجز والدفع</PrimaryCTA>
      </div>
    </FeatureShell>
  );
}
