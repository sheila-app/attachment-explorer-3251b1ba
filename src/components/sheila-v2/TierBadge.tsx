import { motion } from "motion/react";
import { tierFor, type Tier } from "@/data/sheila-v2";

/** شارة المستوى — تتدرّج من Seedling مسطّحة إلى Radiant مع sparkles. */
export function TierBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" | "lg" }) {
  const t = tierFor(score);
  const dim = size === "sm" ? 56 : size === "lg" ? 110 : 80;
  const radiant = t.id === "radiant";
  const fluent = t.id === "fluent" || radiant;
  return (
    <motion.div
      style={{
        width: dim,
        height: dim,
        background: t.gradient,
        boxShadow: fluent ? `0 0 24px ${t.color}, inset 0 1px 0 oklch(1 0 0 / 0.6)` : `0 6px 16px -6px ${t.color}66, inset 0 1px 0 oklch(1 0 0 / 0.4)`,
      }}
      className="rounded-full flex items-center justify-center relative overflow-hidden"
      animate={radiant ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } : {}}
      transition={radiant ? { duration: 6, repeat: Infinity, ease: "linear" } : {}}
    >
      <span className="font-display text-white relative z-10" style={{ fontSize: dim * 0.32, textShadow: "0 1px 2px oklch(0 0 0 / 0.2)" }}>
        {score}
      </span>
      {radiant && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{ top: `${20 + Math.random() * 60}%`, insetInlineStart: `${20 + Math.random() * 60}%` }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}

export function tierName(score: number): Tier { return tierFor(score); }
