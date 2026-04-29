import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Send, Sparkles } from "lucide-react";

export const Route = createFileRoute("/assistant")({ component: Page });

interface Msg { id: number; from: "me" | "ai"; text: string; }

const seed: Msg[] = [
  { id: 1, from: "ai", text: "أهلاً نورة 💜 أنا شيلا، مساعدتكِ الذكيّة. كيف أقدر أساعدكِ اليوم؟" },
];
const suggestions = [
  "اقترحي لي تمرين اليوم",
  "ما الأطعمة المناسبة لمرحلة الإباضة؟",
  "أعاني من تشنّجات، ماذا أفعل؟",
];

function Page() {
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [text, setText] = useState("");

  const send = (t: string) => {
    if (!t.trim()) return;
    const id = msgs.length + 1;
    setMsgs([...msgs, { id, from: "me", text: t }]);
    setText("");
    setTimeout(() => {
      setMsgs(m => [...m, { id: id + 1, from: "ai", text: "بناءً على دورتكِ الحاليّة (يوم 14 — مرحلة الإباضة)، أنصحكِ بتمرين HIIT لمدّة 25 دقيقة وكأس ماء إضافي." }]);
    }, 600);
  };

  return (
    <FeatureShell title="مساعدة شيلا" back="/home" showNav={false} variant="default">
      <div className="px-5 pb-32 space-y-3">
        {msgs.map(m => (
          <div key={m.id} className={`flex ${m.from === "me" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${m.from === "me" ? "glass-strong" : ""}`}
              style={m.from === "ai" ? { background: "var(--gradient-primary)", color: "white", boxShadow: "0 8px 22px -10px oklch(0.46 0.135 328 / 0.5)" } : undefined}>
              <span className="relative z-10">{m.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 inset-x-0 z-30 p-4 space-y-2">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {suggestions.map(s => (
            <button key={s} onClick={() => send(s)} className="glass shrink-0 rounded-full px-3 py-1.5 text-[11px]">
              <span className="relative z-10">{s}</span>
            </button>
          ))}
        </div>
        <div className="glass-strong rounded-2xl flex items-center gap-2 px-3 py-2">
          <Sparkles size={16} className="relative z-10 text-primary shrink-0" />
          <input value={text} onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(text)}
            placeholder="اسأليني أيّ شيء..."
            className="relative z-10 flex-1 bg-transparent text-[13px] outline-none placeholder:text-foreground/40" />
          <button onClick={() => send(text)} className="w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground shrink-0"
            style={{ background: "var(--gradient-primary)" }}>
            <Send size={15} className="relative z-10" />
          </button>
        </div>
      </div>
    </FeatureShell>
  );
}
