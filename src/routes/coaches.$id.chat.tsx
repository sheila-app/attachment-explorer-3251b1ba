import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Send, Paperclip } from "lucide-react";

export const Route = createFileRoute("/coaches/$id/chat")({ component: Page });

type Msg = { id: string; from: "me" | "coach"; text: string; time: string };

const initial: Msg[] = [
  { id: "1", from: "coach", text: "أهلاً نورة، كيف تشعرين اليوم؟", time: "10:24" },
  { id: "2", from: "me", text: "مرحباً، عندي ألم خفيف قبل الدورة وأريد نصائح.", time: "10:25" },
  { id: "3", from: "coach", text: "هذا طبيعي في المرحلة الأصفريّة. جرّبي تقليل الكافيين وزيادة الماغنيسيوم — هل تمارسين أيّ يوغا حالياً؟", time: "10:26" },
];

function Page() {
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [text, setText] = useState("");
  const send = () => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { id: String(Date.now()), from: "me", text, time: "الآن" }]);
    setText("");
  };
  return (
    <FeatureShell title="د. سارة المنصور" back="/coaches/$id" showNav={false} variant="default">
      <div className="px-5 pb-32">
        <div className="space-y-3 stagger">
          {msgs.map(m => (
            <div key={m.id} className={`flex ${m.from === "me" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${m.from === "me" ? "text-white" : "glass"}`}
                style={m.from === "me" ? { background: "var(--gradient-primary)" } : undefined}>
                <div className="relative z-10">{m.text}</div>
                <div className="relative z-10 text-[9.5px] mt-1 opacity-65 nums">{m.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 px-4 pb-4 pt-2 z-30">
        <div className="glass-strong rounded-full flex items-center gap-2 pl-2 pr-3 py-1.5">
          <button className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-foreground/60">
            <Paperclip size={16} strokeWidth={1.75} />
          </button>
          <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
            placeholder="اكتبي رسالتكِ…" className="relative z-10 flex-1 bg-transparent outline-none text-[13px] py-2" />
          <button onClick={send} className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-white"
            style={{ background: "var(--gradient-primary)" }}>
            <Send size={15} strokeWidth={2} />
          </button>
        </div>
      </div>
    </FeatureShell>
  );
}
