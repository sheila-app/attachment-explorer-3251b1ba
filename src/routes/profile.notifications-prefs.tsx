import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";

export const Route = createFileRoute("/profile/notifications-prefs")({ component: Page });

function Page() {
  const [prefs, setPrefs] = useState({
    workouts: true, cycle: true, meals: false, water: true, community: true,
    achievements: true, marketing: false, expert: true,
  });
  const flip = (k: keyof typeof prefs) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  const groups = [
    { title: "اللّياقة", items: [["workouts", "تذكير بالتمارين"], ["meals", "وجبات اليوم"], ["water", "تذكير شرب الماء"]] },
    { title: "الصحّة", items: [["cycle", "توقّعات الدورة"], ["expert", "نصائح الخبيرات"]] },
    { title: "اجتماعي", items: [["community", "تفاعل المجتمع"], ["achievements", "الإنجازات الجديدة"]] },
    { title: "أخرى", items: [["marketing", "العروض والترويج"]] },
  ] as const;

  return (
    <FeatureShell title="تفضيلات الإشعارات" back="/profile/settings" showNav={false}>
      <div className="px-5 pb-8 space-y-3">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-1.5 px-1">{g.title}</h3>
            <div className="glass rounded-2xl overflow-hidden">
              {g.items.map(([key, label]) => (
                <div key={key} className="px-4 py-3.5 flex items-center justify-between border-b border-foreground/5 last:border-b-0">
                  <span className="relative z-10 text-[13px]">{label}</span>
                  <button onClick={() => flip(key as keyof typeof prefs)} className="relative z-10 w-11 h-6 rounded-full transition-colors"
                    style={{ background: prefs[key as keyof typeof prefs] ? "var(--primary)" : "color-mix(in oklab, var(--foreground) 15%, transparent)" }}>
                    <span className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform"
                      style={{ transform: prefs[key as keyof typeof prefs] ? "translateX(-22px)" : "translateX(-2px)" }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FeatureShell>
  );
}
