import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Check, Sparkles, Heart } from "lucide-react";
import { DeviceFrame } from "./DeviceFrame";
import { LiquidBackdrop } from "./LiquidBackdrop";
import type { CheckinFlow, CheckinStep } from "@/data/checkinFlows";

type AnswerValue = string | number | string[];

export function CheckinScreen({ flow }: { flow: CheckinFlow }) {
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [done, setDone] = useState(false);
  const setAnswer = (idx: number, v: AnswerValue) =>
    setAnswers((a) => ({ ...a, [idx]: v }));

  return (
    <DeviceFrame>
      <div className="relative h-full flex flex-col overflow-hidden bg-background">
        <LiquidBackdrop variant="calm" />

        <header className="relative z-10 px-5 pt-6 pb-3 flex items-center gap-3">
          <Link to="/checkin" className="glass w-10 h-10 rounded-full flex items-center justify-center">
            <ArrowRight size={17} strokeWidth={1.75} />
          </Link>
          <div className="flex-1">
            <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">تسجيل اليوم</div>
            <div className="font-display text-[18px] leading-tight" style={{ color: flow.color }}>
              {flow.greeting}
            </div>
          </div>
        </header>

        <div className="relative z-10 flex-1 px-5 pt-3 pb-6 overflow-y-auto no-scrollbar">
          {!done ? (
            <>
              {/* SHEILA says */}
              <div className="glass rounded-2xl p-4 mb-5 flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${flow.color}, color-mix(in oklab, ${flow.color} 60%, white))`,
                  }}
                >
                  <Sparkles size={16} className="text-white" strokeWidth={2} />
                </div>
                <div className="relative z-10">
                  <div className="text-[11px] text-foreground/55">SHEILA</div>
                  <p className="text-[13px] leading-relaxed mt-0.5">{flow.message}</p>
                </div>
              </div>

              {/* All questions on one page */}
              <div className="space-y-6">
                {flow.steps.map((step, idx) => (
                  <motion.section
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <h2 className="font-display text-[18px] leading-tight">{step.label}</h2>
                    {step.hint && (
                      <p className="text-[12px] text-foreground/60 mt-1">{step.hint}</p>
                    )}
                    <div className="mt-3">
                      <StepInput
                        step={step}
                        value={answers[idx]}
                        onChange={(v) => setAnswer(idx, v)}
                        color={flow.color}
                      />
                    </div>
                  </motion.section>
                ))}
              </div>
            </>
          ) : (
            <SummaryView flow={flow} />
          )}
        </div>

        {!done && (
          <div className="relative z-10 px-5 pb-7 pt-2">
            <button
              onClick={() => setDone(true)}
              className="w-full text-white rounded-full py-3.5 font-semibold text-[14px]"
              style={{
                background: `linear-gradient(135deg, ${flow.color}, color-mix(in oklab, ${flow.color} 55%, white))`,
                boxShadow: `0 12px 26px -12px ${flow.color}`,
              }}
            >
              إنهاء التسجيل
            </button>
          </div>
        )}
      </div>
    </DeviceFrame>
  );
}

function StepInput({
  step,
  value,
  onChange,
  color,
}: {
  step: CheckinStep;
  value: AnswerValue | undefined;
  onChange: (v: AnswerValue) => void;
  color: string;
}) {
  if (step.type === "scale") {
    const sel = typeof value === "number" ? value : 0;
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = sel === n;
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              className="flex-1 aspect-square rounded-2xl glass flex items-center justify-center font-display text-xl nums transition-all"
              style={active ? { background: color, color: "white", boxShadow: `0 8px 20px -8px ${color}` } : undefined}
            >
              <span className="relative z-10">{n}</span>
            </button>
          );
        })}
      </div>
    );
  }

  if (step.type === "info") {
    return (
      <div className="glass rounded-2xl p-4">
        <p className="relative z-10 text-[13px] leading-relaxed text-foreground/80">{step.hint}</p>
      </div>
    );
  }

  if (step.type === "text") {
    const v = typeof value === "string" ? value : "";
    return (
      <textarea
        value={v}
        onChange={(e) => onChange(e.target.value)}
        placeholder={step.hint || "اكتبي ما تشعرين به..."}
        rows={3}
        className="w-full glass rounded-2xl p-4 text-[13px] leading-relaxed bg-transparent resize-none focus:outline-none focus:ring-2"
        style={{ outline: "none" }}
      />
    );
  }

  if (!step.options) return null;
  const multi = step.type === "multi";
  const arr: string[] = Array.isArray(value) ? value : [];
  const one = typeof value === "string" ? value : null;

  return (
    <div className="flex flex-wrap gap-2">
      {step.options.map((o) => {
        const active = multi ? arr.includes(o) : one === o;
        return (
          <button
            key={o}
            onClick={() => {
              if (multi) {
                onChange(arr.includes(o) ? arr.filter((x) => x !== o) : [...arr, o]);
              } else {
                onChange(o);
              }
            }}
            className="glass rounded-full px-4 py-2.5 text-[12.5px] transition-all"
            style={active ? { background: color, color: "white", boxShadow: `0 6px 16px -8px ${color}` } : undefined}
          >
            <span className="relative z-10">{o}</span>
          </button>
        );
      })}
    </div>
  );
}

function SummaryView({ flow }: { flow: CheckinFlow }) {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="glass-strong rounded-3xl p-6 text-center mt-4">
        <div
          className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${flow.color}, color-mix(in oklab, ${flow.color} 55%, white))` }}
        >
          <Check size={26} className="text-white" strokeWidth={2.5} />
        </div>
        <h2 className="font-display text-[24px] mt-4 leading-tight">شكراً لكِ</h2>
        <p className="relative z-10 text-[13px] text-foreground/75 mt-2 leading-relaxed">{flow.affirmation}</p>

        <div
          className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2"
          style={{ background: `color-mix(in oklab, ${flow.color} 14%, transparent)`, color: flow.color }}
        >
          <Heart size={14} strokeWidth={2} />
          <span className="text-[12px] font-semibold nums">+{flow.bodyIQReward} نقطة Body IQ</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-4">
        <button onClick={() => navigate({ to: "/home" })} className="glass rounded-2xl py-3.5 text-[13px] font-medium">
          العودة للرئيسيّة
        </button>
        <Link
          to="/bodyiq"
          className="glass-strong rounded-2xl py-3.5 text-[13px] font-medium text-center"
          style={{ background: `color-mix(in oklab, ${flow.color} 14%, transparent)`, color: flow.color }}
        >
          عرض Body IQ
        </Link>
      </div>
    </motion.div>
  );
}
