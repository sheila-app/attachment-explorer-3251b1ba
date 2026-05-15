import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

/** بطاقة Skeleton أثناء توليد شيلا للنتيجة. */
export function AIGenerating({ label = "شيلا تفكّر…" }: { label?: string }) {
  return (
    <div className="rounded-2xl p-4 bg-white/85 border border-border overflow-hidden relative">
      <div className="flex items-center gap-2 text-[12px] text-primary font-medium">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}>
          <Sparkles size={14} strokeWidth={2.2} />
        </motion.div>
        {label}
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-2.5 rounded-full bg-foreground/10 w-full overflow-hidden relative">
          <motion.div
            className="absolute inset-y-0 -translate-x-full"
            style={{ width: "40%", background: "linear-gradient(90deg, transparent, oklch(0.66 0.16 322 / 0.4), transparent)" }}
            animate={{ x: ["-100%", "250%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="h-2.5 rounded-full bg-foreground/10 w-5/6" />
        <div className="h-2.5 rounded-full bg-foreground/10 w-2/3" />
      </div>
    </div>
  );
}

/** يكتب نصّاً حرفاً حرفاً بعد تأخّر اختياري. */
export function AITyping({
  text,
  speed = 22,
  startDelay = 0,
  className = "",
  onDone,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  onDone?: () => void;
}) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const t0 = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          onDone?.();
        }
      }, speed);
    }, startDelay);
    return () => clearTimeout(t0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className}>
      {out}
      {out.length < text.length && (
        <motion.span
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 0.9, repeat: Infinity }}
          className="inline-block w-[2px] h-[1em] align-middle bg-primary mx-0.5"
        />
      )}
    </span>
  );
}

/** Hook بسيط: محاكاة "توليد" مع تأخّر، ثمّ عرض النصّ. */
export function useFakeGenerate(seed: unknown, delayMs = 1100) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(false);
    const id = setTimeout(() => setReady(true), delayMs);
    return () => clearTimeout(id);
  }, [seed, delayMs]);
  return ready;
}
