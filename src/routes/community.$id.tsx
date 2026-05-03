import { createFileRoute, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Heart, MessageCircle, Send, Share2 } from "lucide-react";

export const Route = createFileRoute("/community/$id")({ component: Post });

function Post() {
  const { id } = useParams({ from: "/community/$id" });
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);

  return (
    <FeatureShell title="المنشور" back="/community" showNav={false}>
      <div className="px-5 pb-8 space-y-4">
        <div className="glass-strong rounded-2xl p-5">
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full" style={{ background: "var(--gradient-primary)" }} />
            <div className="flex-1">
              <div className="text-[13px] font-medium">سارة الأحمد</div>
              <div className="text-[10.5px] text-foreground/55 nums">منذ 3 ساعات</div>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full glass">إنجاز</span>
          </div>
          <p className="relative z-10 mt-3 text-[13px] leading-relaxed text-foreground/85">
            أكملتُ اليوم أسبوعي الثامن في رحلتي مع شيلا، شعور لا يوصف بالقوّة والثقة. شكراً لكل الفتيات اللواتي شجّعنني!
          </p>
          <div className="relative z-10 aspect-video mt-3 rounded-xl overflow-hidden flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--phase-ovulation-soft), var(--primary-soft))" }}>
            <span className="font-display text-5xl text-primary nums">8</span>
          </div>
          <div className="relative z-10 flex items-center gap-4 mt-4 text-[12px] text-foreground/65">
            <button onClick={() => setLiked(!liked)} className="flex items-center gap-1.5">
              <Heart size={15} fill={liked ? "currentColor" : "none"} className={liked ? "text-primary" : ""} strokeWidth={1.75} />
              <span className="nums">{liked ? 125 : 124}</span>
            </button>
            <span className="flex items-center gap-1.5"><MessageCircle size={15} strokeWidth={1.75} /><span className="nums">18</span></span>
            <button className="flex items-center gap-1.5 mr-auto"><Share2 size={15} strokeWidth={1.75} /></button>
          </div>
        </div>

        <div className="space-y-2">
          {[
            { n: "ليلى", t: "ما شاء الله! ملهمة", a: "منذ ساعة" },
            { n: "هند", t: "عشتي، شدّي حيلكِ", a: "منذ 30 دقيقة" },
            { n: "ريم", t: "كم تمرّنين أسبوعياً؟", a: "منذ 12 دقيقة" },
          ].map((c, i) => (
            <div key={i} className="glass rounded-xl p-3 flex gap-3">
              <div className="relative z-10 w-9 h-9 rounded-full shrink-0" style={{ background: "var(--gradient-primary)" }} />
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[12.5px] font-medium">{c.n}</span>
                  <span className="text-[10px] text-foreground/55">{c.a}</span>
                </div>
                <p className="text-[12px] text-foreground/80 mt-0.5">{c.t}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="glass rounded-full flex items-center gap-2 px-4 py-2 sticky bottom-4">
          <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="اكتبي تعليقاً…"
            className="relative z-10 flex-1 bg-transparent outline-none text-[12.5px]" />
          <button className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <Send size={14} className="text-primary-foreground" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </FeatureShell>
  );
}
