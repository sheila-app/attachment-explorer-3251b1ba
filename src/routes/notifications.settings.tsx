import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { IOSWheel } from "@/components/sheila/IOSWheel";

export const Route = createFileRoute("/notifications/settings")({ component: Page });

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));

function Page() {
  const [from, setFrom] = useState("22");
  const [to, setTo] = useState("07");
  const [prefs, setPrefs] = useState({
    workouts: true, cycle: true, meals: false, water: true, community: true,
    achievements: true, marketing: false, expert: true,
    medical: true, expertCalls: true, weekendQuiet: false,
  });
  const flip = (k: keyof typeof prefs) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  const groups: { title: string; items: [keyof typeof prefs, string][] }[] = [
    { title: "اللّياقة", items: [["workouts", "تذكير بالتمارين"], ["meals", "وجبات اليوم"], ["water", "تذكير شرب الماء"]] },
    { title: "الصحّة", items: [["cycle", "توقّعات الدورة"], ["expert", "نصائح الخبيرات"]] },
    { title: "اجتماعي", items: [["community", "تفاعل المجتمع"], ["achievements", "الإنجازات الجديدة"]] },
    { title: "أخرى", items: [["marketing", "العروض والترويج"]] },
  ];

  const quietExceptions: [keyof typeof prefs, string][] = [
    ["medical", "استثناء التذكيرات الطبّيّة"],
    ["expertCalls", "السماح بمكالمات الخبيرات"],
    ["weekendQuiet", "صامت في عطلة نهاية الأسبوع"],
  ];

  return (
    <FeatureShell title="إعدادات الإشعارات" back="/notifications" showNav={false} variant="calm">
      <div className="px-5 pb-8 space-y-5">
        {/* === Do Not Disturb === */}
        <div>
          <h3 className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-2 px-1">وضع عدم الإزعاج</h3>
          <p className="text-[12px] text-foreground/65 leading-relaxed mb-3">
            حدّدي ساعات الهدوء — لن تصلكِ إشعارات عدا التذكيرات الحرجة.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass rounded-2xl p-4">
              <div className="text-[10px] tracking-[0.18em] text-foreground/55 uppercase mb-2 text-center">من</div>
              <div className="flex justify-center" style={{ direction: "ltr" }}>
                <IOSWheel values={hours} value={from} onChange={(v) => setFrom(String(v))} width={86} />
              </div>
            </div>
            <div className="glass rounded-2xl p-4">
              <div className="text-[10px] tracking-[0.18em] text-foreground/55 uppercase mb-2 text-center">إلى</div>
              <div className="flex justify-center" style={{ direction: "ltr" }}>
                <IOSWheel values={hours} value={to} onChange={(v) => setTo(String(v))} width={86} />
              </div>
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-4 text-center mt-3">
            <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">الفترة الهادئة</div>
            <div className="font-display text-2xl text-primary mt-1 nums">{from}:00 → {to}:00</div>
          </div>

          <div className="glass rounded-2xl overflow-hidden mt-3">
            {quietExceptions.map(([key, label]) => (
              <Toggle key={key} label={label} on={prefs[key]} onClick={() => flip(key)} />
            ))}
          </div>
        </div>

        {/* === Per-category prefs === */}
        <div className="space-y-3">
          <h3 className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase px-1">تفضيلات الإشعارات</h3>
          {groups.map((g) => (
            <div key={g.title}>
              <div className="text-[10.5px] text-foreground/55 mb-1.5 px-1">{g.title}</div>
              <div className="glass rounded-2xl overflow-hidden">
                {g.items.map(([key, label]) => (
                  <Toggle key={key} label={label} on={prefs[key]} onClick={() => flip(key)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </FeatureShell>
  );
}

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <div className="px-4 py-3.5 flex items-center justify-between border-b border-foreground/5 last:border-b-0">
      <span className="relative z-10 text-[13px]">{label}</span>
      <button onClick={onClick} className="relative z-10 w-11 h-6 rounded-full transition-colors"
        style={{ background: on ? "var(--primary)" : "color-mix(in oklab, var(--foreground) 15%, transparent)" }}>
        <span className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform"
          style={{ transform: on ? "translateX(-22px)" : "translateX(-2px)" }} />
      </button>
    </div>
  );
}
