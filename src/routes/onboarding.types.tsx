import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";
import {
  Dumbbell,
  Activity,
  Zap,
  Wind,
  Layers,
  Music,
  PersonStanding,
  MoveHorizontal,
  HeartPulse,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/onboarding/types")({ component: Page });

const TYPES = [
  { id: "strength",    label: "قوة",      Icon: Dumbbell },
  { id: "cardio",      label: "كارديو",   Icon: Activity },
  { id: "hiit",        label: "HIIT",     Icon: Zap },
  { id: "yoga",        label: "يوغا",     Icon: Wind },
  { id: "pilates",     label: "بيلاتس",   Icon: Layers },
  { id: "barre",       label: "باري",     Icon: Music },
  { id: "functional",  label: "وظيفي",    Icon: PersonStanding },
  { id: "stretch",     label: "تمدد",     Icon: MoveHorizontal },
  { id: "recovery",    label: "تعافي",    Icon: HeartPulse },
];

function Page() {
  const [sel, setSel] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSel((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <OnboardingShell
        step={8}
        total={12}
        back="/onboarding/goal"
        title="ما أنواع التمارين المفضّلة لديكِ؟"
        subtitle="اختاري كلّ ما يناسبكِ"
        footer={
          <PrimaryCTA to="/onboarding/diet" disabled={sel.size === 0}>
            متابعة
          </PrimaryCTA>
        }
      >
        <div className="grid grid-cols-3 gap-2.5">
          {TYPES.map(({ id, label, Icon }) => {
            const selected = sel.has(id);
            return (
              <motion.button
                key={id}
                onClick={() => toggle(id)}
                className="glass rounded-2xl p-4 flex flex-col items-center gap-2 text-center cursor-pointer relative"
                style={
                  selected
                    ? {
                        boxShadow: "inset 0 0 0 2px var(--primary)",
                        background:
                          "color-mix(in oklab, var(--primary) 8%, transparent)",
                      }
                    : undefined
                }
                animate={selected ? { scale: 1.02 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {selected && (
                  <span
                    className="absolute top-2 end-2 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: "var(--primary)" }}
                  >
                    <Check size={12} className="text-primary-foreground" strokeWidth={2.5} />
                  </span>
                )}
                <Icon size={28} strokeWidth={1.5} className="text-foreground/75" />
                <span className="text-[12px] font-medium mt-1">{label}</span>
              </motion.button>
            );
          })}
        </div>
      </OnboardingShell>
    </motion.div>
  );
}
