import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { Check, Info, Sprout, Leaf, Flame } from "lucide-react";

export const Route = createFileRoute("/onboarding/level")({ component: LevelPage });

const LEVELS = [
  {
    id: "begin",
    icon: <Sprout className="w-8 h-8" style={{ color: "var(--phase-follicular)" }} />,
    title: "مبتدئة",
    desc: "أنتِ في بداية رحلتكِ مع اللياقة البدنية، أو عدتِ بعد انقطاع طويل.",
    workouts: ["يوغا تمهيدية", "تمارين الجسم الخفيفة", "المشي السريع", "تمدّد صباحي"],
    freq: "٢–٣ أيّام أسبوعياً",
    color: "var(--phase-follicular)",
  },
  {
    id: "inter",
    icon: <Leaf className="w-8 h-8" style={{ color: "var(--phase-ovulation)" }} />,
    title: "متوسّطة",
    desc: "لديكِ ٦ أشهر أو أكثر من التمرين المنتظم، وتعرفين أساسيات الحركة الصحيحة.",
    workouts: ["HIIT خفيف", "تمارين القوّة", "البيلاتس", "كارديو متوسّط"],
    freq: "٣–٤ أيّام أسبوعياً",
    color: "var(--phase-ovulation)",
  },
  {
    id: "adv",
    icon: <Flame className="w-8 h-8" style={{ color: "var(--phase-menstrual)" }} />,
    title: "متقدّمة",
    desc: "أكثر من سنتين من التمرين المنتظم والمكثّف — اللياقة جزء أساسي من حياتكِ.",
    workouts: ["HIIT مكثّف", "رفع الأثقال", "تدريبات مركّبة", "تحدّيات أسبوعية"],
    freq: "٤–٦ أيّام أسبوعياً",
    color: "var(--phase-menstrual)",
  },
];

function LevelPage() {
  const [sel, setSel] = useState("inter");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <OnboardingShell
        step={5}
        total={12}
        back="/onboarding/location-pref"
        title="كيف تصفين مستواكِ الحالي؟"
        subtitle="لا حكم هنا — الصدق يساعدنا على تخصيص تجربتكِ تماماً."
        footer={<PrimaryCTA to="/onboarding/stats">متابعة</PrimaryCTA>}
      >
        <div className="space-y-3">
          {LEVELS.map((lv) => {
            const active = sel === lv.id;
            return (
              <motion.div
                key={lv.id}
                animate={active ? { scale: 1.01 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button
                  onClick={() => setSel(lv.id)}
                  className="w-full text-right transition-all active:scale-[0.99]"
                >
                  <div
                    className="glass rounded-2xl px-4 pt-3 pb-4 relative overflow-hidden"
                    style={
                      active
                        ? {
                            boxShadow: `inset 0 0 0 2px ${lv.color}, 0 8px 24px -8px ${lv.color}44`,
                            background: `color-mix(in oklab, ${lv.color} 8%, oklch(1 0 0 / 0.7))`,
                          }
                        : undefined
                    }
                  >
                    {active && (
                      <div
                        className="absolute -top-4 -end-4 w-24 h-24 rounded-full opacity-25 pointer-events-none"
                        style={{ background: lv.color, filter: "blur(30px)" }}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between gap-3 min-h-7">
                      <span className="leading-none flex items-center">{lv.icon}</span>
                      {active && (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: lv.color }}
                        >
                          <Check size={13} className="text-white" strokeWidth={2.5} />
                        </div>
                      )}
                    </div>

                    <h3
                      className="relative z-10 font-display text-xl mt-1 leading-tight"
                      style={active ? { color: lv.color } : undefined}
                    >
                      {lv.title}
                    </h3>

                    <p className="relative z-10 text-[12.5px] text-foreground/70 mt-1.5 leading-relaxed">
                      {lv.desc}
                    </p>

                    <div className="relative z-10 my-3 border-t border-border/60" />

                    <div className="relative z-10">
                      <p className="text-[10px] text-foreground/50 tracking-wider uppercase mb-2">
                        أمثلة على التمارين
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {lv.workouts.map((w) => (
                          <span
                            key={w}
                            className="text-[11px] px-2.5 py-1 rounded-full"
                            style={{
                              background: active
                                ? `color-mix(in oklab, ${lv.color} 18%, transparent)`
                                : "oklch(0 0 0 / 0.06)",
                              color: active ? lv.color : "var(--color-foreground)",
                            }}
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative z-10 mt-3 flex items-center gap-1.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: lv.color }}
                      />
                      <span className="text-[11.5px] text-foreground/65">
                        يُنصح بـ{" "}
                        <span
                          className="font-medium"
                          style={active ? { color: lv.color } : undefined}
                        >
                          {lv.freq}
                        </span>
                      </span>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}

          <div className="flex items-start gap-2.5 px-1 py-2">
            <Info size={13} className="text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
            <p className="text-[11.5px] text-foreground/60 leading-relaxed">
              يمكنكِ تعديل مستواكِ في أيّ وقت من صفحة الإعدادات.
            </p>
          </div>
        </div>
      </OnboardingShell>
    </motion.div>
  );
}
