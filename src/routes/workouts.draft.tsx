import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockWorkouts, PHASE_META } from "@/data/mock";
import { Flame, ChevronLeft, Calendar, Users, Clock, Wind, Footprints, Droplets, Dumbbell } from "lucide-react";

export const Route = createFileRoute("/workouts/draft")({ component: Page });

const PROGRAMS = [
  { id: "p1", name: "30 يوم قوّة", weeks: 4, level: "متوسّط", sessions: 20, color: "var(--phase-ovulation)" },
  { id: "p2", name: "بداية اليوغا", weeks: 3, level: "مبتدئ", sessions: 15, color: "var(--phase-luteal)" },
  { id: "p3", name: "حرق دهون مكثّف", weeks: 6, level: "متقدّم", sessions: 30, color: "var(--phase-menstrual)" },
  { id: "p4", name: "بيلاتس للجذع", weeks: 4, level: "متوسّط", sessions: 16, color: "var(--phase-follicular)" },
];

const CHALLENGES = [
  { id: "ch1", title: "تحدّي 7 أيام يوغا", days: 7, joined: 1240, Icon: Wind, reward: "شارة الهدوء" },
  { id: "ch2", title: "30 يوماً من المشي", days: 30, joined: 3580, Icon: Footprints, reward: "شارة المثابرة" },
  { id: "ch3", title: "أسبوع الترطيب", days: 7, joined: 890, Icon: Droplets, reward: "شارة النقاء" },
  { id: "ch4", title: "تحدّي القوّة", days: 14, joined: 620, Icon: Dumbbell, reward: "شارة البطلة" },
];

function getWorkoutGradient(type: string): string {
  if (type.includes("يوغا")) return "linear-gradient(135deg, oklch(0.88 0.06 290), oklch(0.92 0.04 320))";
  if (type === "HIIT") return "linear-gradient(135deg, oklch(0.88 0.08 30), oklch(0.94 0.04 20))";
  if (type.includes("كارديو")) return "linear-gradient(135deg, oklch(0.88 0.06 260), oklch(0.92 0.04 280))";
  if (type.includes("قوة") || type.includes("قوّة")) return "linear-gradient(135deg, oklch(0.85 0.07 328), oklch(0.92 0.04 320))";
  if (type.includes("بيلاتس")) return "linear-gradient(135deg, oklch(0.90 0.06 150), oklch(0.94 0.04 160))";
  return "linear-gradient(135deg, oklch(0.90 0.04 320), oklch(0.95 0.02 310))";
}

function Page() {
  const [filter, setFilter] = useState("الكل");
  const [query, setQuery] = useState("");

  const filteredWorkouts = useMemo(() => {
    return mockWorkouts.filter(w => {
      const matchType = filter === "الكل" || w.type === filter;
      const matchQuery = !query || w.title.includes(query) || w.type.includes(query);
      return matchType && matchQuery;
    });
  }, [filter, query]);

  const filteredPrograms = useMemo(() => {
    return PROGRAMS.filter(p => !query || p.name.includes(query) || p.level.includes(query));
  }, [query]);

  const filteredChallenges = useMemo(() => {
    return CHALLENGES.filter(c => !query || c.title.includes(query));
  }, [query]);

  return (
    <FeatureShell title="مكتبة التمارين" variant="energetic">
      <div className="px-5 space-y-5">
        {/* Search */}
        <div className="glass rounded-full px-4 py-2.5 flex items-center gap-2">
          <Search size={15} className="relative z-10 text-foreground/55 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحثي عن تمرين أو برنامج..."
            className="relative z-10 bg-transparent outline-none text-[12.5px] flex-1 min-w-0 placeholder:text-foreground/45"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
          {FILTERS.map(f => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              className="glass shrink-0 px-4 py-2 rounded-full text-[12px] whitespace-nowrap"
              style={filter === f
                ? { background: "var(--gradient-primary)", color: "white", boxShadow: "0 8px 20px -8px oklch(0.46 0.135 328 / 0.5)" }
                : undefined}
              whileTap={{ scale: 0.94 }}
            >
              <span className={`relative z-10 ${filter === f ? "font-semibold text-white" : "font-medium text-foreground/70"}`}>{f}</span>
            </motion.button>
          ))}
        </div>

        {/* Section: Workouts */}
        <Section title="التمارين" to="/workouts" count={filteredWorkouts.length}>
          <HorizontalScroll>
            {filteredWorkouts.map((w) => {
              const p = PHASE_META[w.phase];
              return (
                <Link
                  key={w.id}
                  to="/workouts/$id"
                  params={{ id: w.id }}
                  className="shrink-0 w-44 bg-white/90 backdrop-blur-sm rounded-2xl border border-border overflow-hidden shadow-sm"
                >
                  <div className="h-28 relative flex items-center justify-center" style={{ background: getWorkoutGradient(w.type) }}>
                    <span className="text-[10px] font-medium text-white px-2 py-0.5 rounded-full absolute top-2 start-2" style={{ background: p.color }}>
                      {p.name}
                    </span>
                    <Flame size={32} style={{ color: p.color }} strokeWidth={1.5} />
                  </div>
                  <div className="p-3">
                    <h3 className="text-[13px] font-semibold leading-tight">{w.title}</h3>
                    <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-muted-foreground nums">
                      <span>{w.duration} د</span>
                      <span className="w-1 h-1 rounded-full bg-foreground/30" />
                      <span>{w.level}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
            {filteredWorkouts.length === 0 && <EmptyHint />}
          </HorizontalScroll>
        </Section>

        {/* Section: Programs */}
        <Section title="البرامج" to="/workouts/programs" count={filteredPrograms.length}>
          <HorizontalScroll>
            {filteredPrograms.map((p) => (
              <Link
                key={p.id}
                to="/workouts/programs/$id"
                params={{ id: p.id }}
                className="shrink-0 w-56 glass-strong rounded-2xl p-4 relative overflow-hidden"
              >
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-30" style={{ background: p.color, filter: "blur(40px)" }} />
                <div className="relative z-10 flex items-start justify-between">
                  <div className="min-w-0">
                    <div className="font-display text-[15px] leading-tight">{p.name}</div>
                    <div className="text-[11px] text-foreground/60 mt-1">{p.level}</div>
                  </div>
                  <div className="flex items-center gap-1 text-[10.5px] text-primary nums shrink-0">
                    <Calendar size={11} /> {p.weeks} أسابيع
                  </div>
                </div>
                <div className="relative z-10 flex items-center gap-3 mt-4 text-[11px] text-foreground/65">
                  <span className="flex items-center gap-1 nums"><Flame size={11} /> {p.sessions} جلسة</span>
                </div>
              </Link>
            ))}
            {filteredPrograms.length === 0 && <EmptyHint />}
          </HorizontalScroll>
        </Section>

        {/* Section: Challenges */}
        <Section title="التحدّيات" to="/challenges" count={filteredChallenges.length}>
          <HorizontalScroll>
            {filteredChallenges.map((c) => (
              <Link
                key={c.id}
                to="/challenges/$id"
                params={{ id: c.id }}
                className="shrink-0 w-56 glass rounded-2xl p-4"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                    <c.Icon size={18} strokeWidth={1.75} className="text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-medium leading-tight truncate">{c.title}</div>
                    <div className="text-[10px] text-primary mt-0.5">{c.reward}</div>
                  </div>
                </div>
                <div className="relative z-10 flex items-center gap-3 mt-3 text-[10.5px] text-foreground/60 nums">
                  <span className="flex items-center gap-1"><Clock size={10} /> {c.days} يوم</span>
                  <span className="flex items-center gap-1"><Users size={10} /> {c.joined.toLocaleString("ar-EG")}</span>
                </div>
              </Link>
            ))}
            {filteredChallenges.length === 0 && <EmptyHint />}
          </HorizontalScroll>
        </Section>
      </div>
    </FeatureShell>
  );
}

function Section({ title, to, count, children }: { title: string; to: string; count: number; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-[16px]">{title}</h2>
          <span className="text-[10.5px] text-foreground/50 nums">({count})</span>
        </div>
        <Link to={to as "/"} className="flex items-center gap-0.5 text-[11.5px] text-primary font-medium">
          إظهار الكل
          <ChevronLeft size={13} />
        </Link>
      </div>
      {children}
    </div>
  );
}

function HorizontalScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
      {children}
    </div>
  );
}

function EmptyHint() {
  return (
    <div className="shrink-0 w-full text-center text-[12px] text-foreground/50 py-6">
      لا توجد نتائج
    </div>
  );
}
