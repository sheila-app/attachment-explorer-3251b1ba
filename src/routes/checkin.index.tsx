import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { ArrowRight, Check, Sparkles, Heart } from "lucide-react";
import { mockUser } from "@/data/mock";
import { flowsByPhase, exceptionFlows, type CheckinFlow, type CheckinStep } from "@/data/checkinFlows";

export const Route = createFileRoute("/checkin/")({ component: CheckinPage });

function selectFlow(): CheckinFlow {
  if (mockUser.ramadanMode) return exceptionFlows.ramadan as unknown as CheckinFlow;
  if (mockUser.lifeStage === "pregnant" && mockUser.trimester === 1) return exceptionFlows.pregnancyT1 as unknown as CheckinFlow;
  if (mockUser.lifeStage === "menopause" || mockUser.lifeStage === "senior") return exceptionFlows.noCycle as unknown as CheckinFlow;
  return flowsByPhase[mockUser.currentPhase];
}

function CheckinPage() {
  const flow = useMemo(selectFlow, []);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number | string[]>>({});
  const [done, setDone] = useState(false);

  const step = flow.steps[stepIdx];
  const totalSteps = flow.steps.length;
  const progress = ((stepIdx + (done ? 1 : 0)) / totalSteps) * 100;

  const setAnswer = (v: string | number | string[]) => setAnswers((a) => ({ ...a, [stepIdx]: v }));
  const next = () => (stepIdx + 1 >= totalSteps ? setDone(true) : setStepIdx(stepIdx + 1));

  return (
    <DeviceFrame>
      <div className="relative h-full flex flex-col overflow-hidden bg-background">
        <LiquidBackdrop variant="calm" />

        {/* Header */}
        <header className="relative z-10 px-5 pt-6 pb-3 flex items-center gap-3">
          <Link to="/home" className="glass w-10 h-10 rounded-full flex items-center justify-center">
            <ArrowRight size={17} strokeWidth={1.75} />
          </Link>
          <div className="flex-1">
            <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">تسجيل اليوم</div>
            <div className="font-display text-[18px] leading-tight" style={{ color: flow.color }}>{flow.greeting}</div>
          </div>
        </header>

        {/* Progress bar */}
        <div className="relative z-10 px-5 mb-1">
          <div className="h-1 rounded-full bg-foreground/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: flow.color }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 px-5 pt-3 pb-6 overflow-y-auto no-scrollbar">
          {!done ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={stepIdx}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                {/* SHEILA says (only first step) */}
                {stepIdx === 0 && (
                  <div className="glass rounded-2xl p-4 mb-5 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `linear-gradient(135deg, ${flow.color}, color-mix(in oklab, ${flow.color} 60%, white))` }}
                    >
                      <Sparkles size={16} className="text-white" strokeWidth={2} />
                    </div>
                    <div className="relative z-10">
                      <div className="text-[11px] text-foreground/55">SHEILA</div>
                      <p className="text-[13px] leading-relaxed mt-0.5">{flow.message}</p>
                    </div>
                  </div>
                )}

                <h2 className="font-display text-[22px] leading-tight">{step.label}</h2>
                {step.hint && <p className="text-[12px] text-foreground/60 mt-1.5">{step.hint}</p>}

                <div className="mt-5">
                  <StepInput
                    step={step}
                    value={answers[stepIdx]}
                    onChange={setAnswer}
                    color={flow.color}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <SummaryView flow={flow} />
          )}
        </div>

        {/* Footer CTA */}
        {!done && (
          <div className="relative z-10 px-5 pb-7 pt-2">
            <button
              onClick={next}
              className="w-full text-white rounded-full py-3.5 font-semibold text-[14px]"
              style={{ background: `linear-gradient(135deg, ${flow.color}, color-mix(in oklab, ${flow.color} 55%, white))`, boxShadow: `0 12px 26px -12px ${flow.color}` }}
            >
              {stepIdx + 1 >= totalSteps ? "إنهاء التسجيل" : "متابعة"}
            </button>
            <div className="text-center mt-2 text-[10.5px] text-foreground/50 nums">
              {stepIdx + 1} / {totalSteps}
            </div>
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
  value: string | number | string[] | undefined;
  onChange: (v: string | number | string[]) => void;
  color: string;
}) {
  // 1-5 scale for pain / energy when no options
  if ((step.type === "pain" || step.type === "energy") && !step.options) {
    const sel = typeof value === "number" ? value : 0;
    return (
      <div className="flex gap-2 mt-2">
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
      <div className="glass rounded-2xl p-4 mt-2">
        <p className="relative z-10 text-[13px] leading-relaxed text-foreground/80">{step.hint}</p>
      </div>
    );
  }

  // multi-select for symptoms / bodySignals
  const multi = step.type === "symptoms" || step.type === "bodySignals";
  const selectedArr: string[] = Array.isArray(value) ? value : [];
  const selectedOne = typeof value === "string" ? value : null;

  if (!step.options) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {step.options.map((o) => {
        const active = multi ? selectedArr.includes(o) : selectedOne === o;
        return (
          <button
            key={o}
            onClick={() => {
              if (multi) {
                const next = selectedArr.includes(o) ? selectedArr.filter((x) => x !== o) : [...selectedArr, o];
                onChange(next);
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
        <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${flow.color}, color-mix(in oklab, ${flow.color} 55%, white))` }}
        >
          <Check size={26} className="text-white" strokeWidth={2.5} />
        </div>
        <h2 className="font-display text-[24px] mt-4 leading-tight">شكراً لكِ</h2>
        <p className="relative z-10 text-[13px] text-foreground/75 mt-2 leading-relaxed">{flow.affirmation}</p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2"
          style={{ background: `color-mix(in oklab, ${flow.color} 14%, transparent)`, color: flow.color }}
        >
          <Heart size={14} strokeWidth={2} />
          <span className="text-[12px] font-semibold nums">+{flow.bodyIQReward} نقطة Body IQ</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-4">
        <button
          onClick={() => navigate({ to: "/home" })}
          className="glass rounded-2xl py-3.5 text-[13px] font-medium"
        >
          العودة للرئيسيّة
        </button>
        <Link to="/bodyiq" className="glass-strong rounded-2xl py-3.5 text-[13px] font-medium text-center"
          style={{ background: `color-mix(in oklab, ${flow.color} 14%, transparent)`, color: flow.color }}
        >
          عرض Body IQ
        </Link>
      </div>
    </motion.div>
  );
}
