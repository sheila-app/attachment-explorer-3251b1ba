import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, AlertCircle, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { AITyping } from "@/components/sheila-v2/AITyping";
import { SHEILA_REPLIES, SHEILA_DEFAULT } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/sheila")({ component: SheilaChat });

type Msg = { role: "user" | "ai"; text: string; distress?: boolean };

const DISTRESS = /انتحار|أؤذي نفسي|أكره نفسي|لا أريد العيش|بلا فائدة|ميؤوس|لا فائدة من حياتي/;

const STARTERS = [
  "اقترحي وصفة عشاء سريعة",
  "أنا متعبة اليوم، ماذا أفعل؟",
  "ماذا أتناول قبل التمرين؟",
  "اشرحي مرحلتي الحاليّة",
];

function reply(text: string): { text: string; distress: boolean } {
  if (DISTRESS.test(text)) {
    return { text: "أسمعكِ. ما تشعرين به ثقيل، ولستِ وحدك. أنا هنا، ولا أريدك أن تواجهي هذا بمفردك. هل يمكنني عرض موارد دعم فوريّة عليكِ؟", distress: true };
  }
  for (const r of SHEILA_REPLIES) {
    if (r.match instanceof RegExp ? r.match.test(text) : text.includes(r.match as string)) {
      return { text: r.reply, distress: false };
    }
  }
  return { text: SHEILA_DEFAULT, distress: false };
}

function SheilaChat() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "مرحباً نوران 🌷 أنا شيلا. اسأليني عن مرحلتك، تمرين، وجبة، أو أيّ شيء يخصّ صحّتك." },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, thinking]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text };
    setMsgs((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const r = reply(text);
      setMsgs((m) => [...m, { role: "ai", text: r.text, distress: r.distress }]);
      setThinking(false);
    }, 900 + Math.random() * 600);
  }

  return (
    <ShellV2 title="شيلا" back="/sheila-v2/home" showNav={false} showFAB={false}>
      <div ref={scroller} className="px-5 pb-32 space-y-3">
        {msgs.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            {m.role === "user" ? (
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-[13px] text-primary-foreground"
                     style={{ background: "var(--gradient-primary)", boxShadow: "0 6px 18px -6px oklch(0.46 0.135 328 / 0.4)" }}>
                  {m.text}
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <Sparkles size={14} className="text-primary-foreground" strokeWidth={2} />
                </div>
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-white/85 border border-border px-3.5 py-2.5 text-[13px] leading-relaxed">
                  {i === msgs.length - 1 ? <AITyping text={m.text} speed={18} /> : m.text}
                  {m.distress && (
                    <Link to="/sheila-v2/emergency" className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl border border-destructive/40 bg-destructive/5 text-destructive">
                      <AlertCircle size={14} strokeWidth={2} />
                      <span className="text-[12px] font-medium">موارد الدعم الفوريّة</span>
                      <ChevronLeft size={12} className="ms-auto" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
        {thinking && (
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
              <Sparkles size={14} className="text-primary-foreground" strokeWidth={2} />
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-white/85 border border-border px-4 py-3 flex gap-1">
              {[0,1,2].map(i => (
                <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-primary/60"
                  animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
              ))}
            </div>
          </div>
        )}

        {msgs.length === 1 && (
          <div className="pt-2">
            <div className="text-[10.5px] tracking-widest text-foreground/55 mb-2 px-1">جرّبي</div>
            <div className="grid grid-cols-2 gap-2">
              {STARTERS.map(s => (
                <button key={s} onClick={() => send(s)} className="text-right text-[12px] rounded-xl bg-white/70 border border-border px-3 py-2.5 active:scale-[0.98]">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 inset-x-4 z-30">
        <div className="glass-strong rounded-full flex items-center gap-2 px-2 py-1.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="اكتبي لشيلا…"
            className="relative z-10 flex-1 bg-transparent outline-none text-[13px] px-3 placeholder:text-foreground/45"
          />
          <button onClick={() => send(input)} className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "var(--gradient-primary)" }}>
            <Send size={15} className="text-primary-foreground -scale-x-100" strokeWidth={2} />
          </button>
        </div>
      </div>
    </ShellV2>
  );
}
