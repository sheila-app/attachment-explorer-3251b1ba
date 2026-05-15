import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

/** زرّ شيلا العائم — أسفل-يمين فوق شريط التنقّل. */
export function SheilaFAB({ side = "end" }: { side?: "start" | "end" }) {
  const pos = side === "end" ? "end-5" : "start-5";
  return (
    <Link to="/sheila-v2/sheila" className={`absolute z-40 bottom-[92px] ${pos}`}>
      <motion.div
        whileTap={{ scale: 0.92 }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: "var(--gradient-primary)",
          boxShadow: "0 14px 36px -8px oklch(0.46 0.135 328 / 0.55), inset 0 1px 0 0 oklch(1 0 0 / 0.5)",
        }}
      >
        <Sparkles size={22} className="text-primary-foreground" strokeWidth={2} />
      </motion.div>
    </Link>
  );
}
