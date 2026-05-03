import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { OnboardingShell, PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";
import { Dumbbell, Heart, Activity, Sparkles, Baby } from "lucide-react";

export const Route = createFileRoute("/onboarding/goal")({ component: GoalPage });

const OPTIONS = [
  { id: "trainer", title: "التدرّب مع مدرّبة محدّدة", icon: Sparkles },
  { id: "muscle", title: "بناء العضلات", icon: Dumbbell },
  { id: "lose", title: "خسارة الوزن", icon: Activity },
  { id: "fit", title: "الحصول على لياقة أفضل", icon: Heart },
  { id: "preg", title: "برامج الحمل", icon: Baby },
];

function GoalPage() {
  const [sel, setSel] = useState("fit");
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <OnboardingShell
        step={3} total={12} back="/onboarding/dob"
        title="ما هدفكِ؟"
        subtitle="اختاري الهدف الأقرب لكِ — يمكنكِ تغييره لاحقاً."
        footer={<PrimaryCTA to="/onboarding/location-pref">متابعة</PrimaryCTA>}
      >
        <div className="space-y-2.5">
          {OPTIONS.map((o) => (
            <motion.div
              key={o.id}
              animate={sel === o.id ? { scale: 1.02 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <OptionCard
                selected={sel === o.id}
                onClick={() => setSel(o.id)}
                title={o.title}
                leading={
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, oklch(0.66 0.16 322 / 0.25), oklch(0.46 0.135 328 / 0.12))" }}>
                    <o.icon size={17} className="text-primary" strokeWidth={1.75} />
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>
      </OnboardingShell>
    </motion.div>
  );
}
