import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockUser, mockWeightLog } from "@/data/mock";
import { TrendingDown, Flame, Activity, Trophy, Sparkles } from "lucide-react";

export const Route = createFileRoute("/journey")({ component: JourneyPage });

function JourneyPage() {
  const max = Math.max(...mockWeightLog.map(p => p.weight));
  const min = Math.min(...mockWeightLog.map(p => p.weight));

  return (
    <FeatureShell title="رحلتكِ" variant="calm">
      <div className="px-5">
        {/* Body IQ */}
        <div className="glass-strong rounded-2xl p-5 flex items-center gap-5">
          <div className="relative shrink-0">
            <svg width="80" height="80" className="-rotate-90">
              <circle cx="40" cy="40" r="32" fill="none" stroke="var(--color-border)" strokeWidth="6" opacity="0.4" />
              <circle cx="40" cy="40" r="32" fill="none" stroke="var(--primary)" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 32} strokeDashoffset={2 * Math.PI * 32 * (1 - mockUser.bodyIQ / 100)} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-xl text-primary nums">{mockUser.bodyIQ}</span>
            </div>
          </div>
          <div className="relative z-10 flex-1">
            <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">Body IQ</div>
            <div className="font-display text-lg mt-0.5">في تحسّن مستمرّ</div>
            <p className="text-[11.5px] text-foreground/60 mt-1 leading-relaxed">مؤشّرك ارتفع 8 نقاط هذا الشهر.</p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2.5 mt-3 stagger">
          <Stat icon={Flame} label="السلسلة" value={`${mockUser.streak}`} unit="يوم" color="var(--phase-menstrual)" />
          <Stat icon={Trophy} label="الأفضل" value={`${mockUser.bestStreak}`} unit="يوم" color="var(--phase-ovulation)" />
          <Stat icon={Activity} label="تمارين الأسبوع" value="5" unit="جلسة" color="var(--primary)" />
          <Stat icon={TrendingDown} label="نزلتِ" value="3.2" unit="كجم" color="var(--phase-follicular)" />
        </div>

        {/* Weight chart */}
        <div className="glass rounded-2xl p-4 mt-4">
          <div className="relative z-10 flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">تتبّع الوزن</h3>
            <span className="text-[11px] text-foreground/55 nums">آخر 6 أسابيع</span>
          </div>
          <div className="relative z-10">
            <svg viewBox="0 0 300 110" className="w-full h-28" preserveAspectRatio="none">
              <defs>
                <linearGradient id="wfill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {(() => {
                const pts = mockWeightLog.map((p, i) => {
                  const x = (i / (mockWeightLog.length - 1)) * 290 + 5;
                  const y = 100 - ((p.weight - min) / (max - min || 1)) * 80 - 5;
                  return [x, y] as const;
                });
                const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
                const fill = `${d} L 295 105 L 5 105 Z`;
                return (
                  <>
                    <path d={fill} fill="url(#wfill)" />
                    <path d={d} fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
                    {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill="var(--primary)" />)}
                  </>
                );
              })()}
            </svg>
            <div className="flex justify-between text-[9px] text-foreground/50 mt-1 nums">
              {mockWeightLog.map(p => <span key={p.date}>{p.date}</span>)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 mt-3">
          <Link to="/journey/awards" className="glass rounded-2xl p-3 flex flex-col items-center text-center gap-1.5">
            <Trophy size={18} className="relative z-10 text-primary" strokeWidth={1.75} />
            <div className="relative z-10 text-[12px] font-medium">الإنجازات</div>
            <div className="relative z-10 text-[10px] text-foreground/55 nums">3/6</div>
          </Link>
          <Link to="/journey/measurements" className="glass rounded-2xl p-3 flex flex-col items-center text-center gap-1.5">
            <TrendingDown size={18} className="relative z-10 text-primary" strokeWidth={1.75} />
            <div className="relative z-10 text-[12px] font-medium">القياسات</div>
            <div className="relative z-10 text-[10px] text-foreground/55">سجّلي</div>
          </Link>
          <Link to="/journey/goals" className="glass rounded-2xl p-3 flex flex-col items-center text-center gap-1.5">
            <Activity size={18} className="relative z-10 text-primary" strokeWidth={1.75} />
            <div className="relative z-10 text-[12px] font-medium">أهدافي</div>
            <div className="relative z-10 text-[10px] text-foreground/55 nums">4 نشطة</div>
          </Link>
        </div>

        <Link to="/journey/insights" className="glass-strong rounded-2xl p-4 mt-3 flex items-center gap-3">
          <div className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles size={16} className="text-white" />
          </div>
          <div className="relative z-10 flex-1">
            <div className="text-[13px] font-medium">رؤى ذكيّة</div>
            <div className="text-[11px] text-foreground/60">تحليلاتٌ مخصّصة من شيلا</div>
          </div>
        </Link>
      </div>
    </FeatureShell>
  );
}

function Stat({ icon: Icon, label, value, unit, color }: any) {
  return (
    <div className="glass rounded-2xl p-3">
      <Icon size={14} className="relative z-10" style={{ color }} strokeWidth={1.75} />
      <div className="relative z-10 text-[10px] text-foreground/55 mt-1.5 uppercase tracking-widest">{label}</div>
      <div className="relative z-10 flex items-baseline gap-1 mt-1">
        <span className="font-display text-2xl nums" style={{ color }}>{value}</span>
        <span className="text-[10px] text-foreground/55">{unit}</span>
      </div>
    </div>
  );
}
