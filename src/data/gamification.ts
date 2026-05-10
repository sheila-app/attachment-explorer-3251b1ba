// نظام Body IQ — وفق وثيقة SHEILA Gamification System
// النموذج أوّلي: لا backend، الحساب في الذاكرة فقط.

export type BodyIQTier =
  | "curious"
  | "aware"
  | "attuned"
  | "sharp"
  | "fluent"
  | "radiant";

export const TIERS: { key: BodyIQTier; name: string; min: number; max: number; color: string; desc: string }[] = [
  { key: "curious",  name: "فضوليّة",  min: 0,    max: 199,  color: "var(--phase-follicular)", desc: "البداية. كلّ خطوة تُكسِبكِ نقاطاً كبيرة." },
  { key: "aware",    name: "واعية",    min: 200,  max: 399,  color: "var(--phase-ovulation)",  desc: "إيقاعكِ يستقرّ. الدائرة تظهر هنا." },
  { key: "attuned",  name: "منسجمة",   min: 400,  max: 599,  color: "var(--primary)",           desc: "إكمال المراحل ضروريّ للنموّ." },
  { key: "sharp",    name: "حادّة",    min: 600,  max: 799,  color: "var(--phase-luteal)",      desc: "أعلى ٢٠٪ — اتّساق متعدّد المحاور." },
  { key: "fluent",   name: "طليقة",    min: 800,  max: 999,  color: "var(--phase-menstrual)",   desc: "أعلى ٨٪ — ٦ دورات متتالية قويّة." },
  { key: "radiant",  name: "متألّقة",  min: 1000, max: 1000, color: "var(--primary-glow)",      desc: "التاج. أقلّ من ٥٪ يصلن إليه." },
];

export const POINTS = {
  dailyLog: 5,
  fullSymptomLog: 12,
  phaseSyncedWorkout: 18,
  phaseChallenge: 15,
  fullPhaseBonus: 40,
  streak7: 25,
  streak14: 50,
  streak30: 100,
  streak60: 150,
  fullCycle: 80,
  patternConfirmed: 30,
  wagerWin: 50,
  wagerLoss: -20,
  streakBreak: -15,
} as const;

export const DECAY = {
  startsAfterDays: 6,
  perDayBefore14: -3,
  perDayAfter14: -7,
};

export function computeTier(score: number): BodyIQTier {
  for (const t of TIERS) if (score >= t.min && score <= t.max) return t.key;
  return score >= 1000 ? "radiant" : "curious";
}

export function tierMeta(score: number) {
  const key = computeTier(score);
  const t = TIERS.find((x) => x.key === key)!;
  const next = TIERS[TIERS.indexOf(t) + 1];
  const toNext = next ? next.min - score : 0;
  const pctInTier = next ? (score - t.min) / (next.min - t.min) : 1;
  return { tier: t, next, toNext, pctInTier: Math.min(1, Math.max(0, pctInTier)) };
}

// Phase Windows — نوافذ زمنيّة للتحدّيات حسب المرحلة
export const PHASE_WINDOWS = {
  menstrual:  { name: "وضع الراحة",       days: 5,  challenges: 0, urgency: "rest" as const,   color: "var(--phase-menstrual)" },
  follicular: { name: "نافذة القوّة",      days: 8,  challenges: 5, urgency: "day" as const,    color: "var(--phase-follicular)" },
  ovulation:  { name: "نافذة الذروة",     days: 3,  challenges: 3, urgency: "hour" as const,   color: "var(--phase-ovulation)" },
  luteal:     { name: "نافذة العمق",      days: 10, challenges: 10, urgency: "daily" as const,  color: "var(--phase-luteal)" },
};

export const PHASE_CHALLENGES_FOLLICULAR = [
  { id: "fc1", title: "تمرين قوّة جديد",      done: true,  pts: 15 },
  { id: "fc2", title: "وجبة عالية البروتين",   done: true,  pts: 15 },
  { id: "fc3", title: "نوم ٧+ ساعات",         done: false, pts: 15 },
  { id: "fc4", title: "نشاط اجتماعي",          done: false, pts: 15 },
  { id: "fc5", title: "تسجيل ٣ أيّام متتالية", done: false, pts: 15 },
];

export const PHASE_CHALLENGES_OVULATION = [
  { id: "ov1", title: "HIIT أو تحدّي جديد", done: true,  pts: 15 },
  { id: "ov2", title: "وجبة غنيّة بمضادّات الأكسدة", done: false, pts: 15 },
  { id: "ov3", title: "مشاركة في الدائرة", done: false, pts: 15 },
];

export const PHASE_CHALLENGES_LUTEAL = [
  { id: "lu1", title: "تسجيل يوميّ متتالٍ × ٧", done: false, pts: 18 },
  { id: "lu2", title: "تمرين متوسّط × ٣",       done: false, pts: 15 },
  { id: "lu3", title: "تأمّل / تنفّس × ٢",       done: false, pts: 12 },
];

// سجل آخر ١٤ يوم للـ Body IQ — للرسم البياني
export const bodyIQHistory: { date: string; delta: number; reason: string }[] = [
  { date: "اليوم",   delta: 18, reason: "تمرين متزامن مع المرحلة" },
  { date: "أمس",    delta: 12, reason: "تسجيل أعراض كامل" },
  { date: "قبل ٢",  delta: 5,  reason: "تسجيل يوميّ" },
  { date: "قبل ٣",  delta: 5,  reason: "تسجيل يوميّ" },
  { date: "قبل ٤",  delta: 25, reason: "ذروة سلسلة ٧ أيام" },
  { date: "قبل ٥",  delta: 5,  reason: "تسجيل يوميّ" },
  { date: "قبل ٦",  delta: 15, reason: "تحدّي مرحلة" },
  { date: "قبل ٧",  delta: 5,  reason: "تسجيل يوميّ" },
  { date: "قبل ٨",  delta: 0,  reason: "—" },
  { date: "قبل ٩",  delta: 18, reason: "تمرين متزامن" },
  { date: "قبل ١٠", delta: 12, reason: "تسجيل أعراض كامل" },
  { date: "قبل ١١", delta: 5,  reason: "تسجيل يوميّ" },
  { date: "قبل ١٢", delta: 30, reason: "نمط مؤكّد" },
  { date: "قبل ١٣", delta: 5,  reason: "تسجيل يوميّ" },
];

// أعضاء الدائرة الخاصّة
export const circleMembers = [
  { id: "m1", alias: "نور",    bodyIQ: 612, phase: "ovulation",  weeklyDelta: 45, you: false },
  { id: "you", alias: "أنتِ",   bodyIQ: 589, phase: "ovulation", weeklyDelta: 38, you: true  },
  { id: "m2", alias: "ليلى",   bodyIQ: 571, phase: "luteal",     weeklyDelta: 28, you: false },
  { id: "m3", alias: "سارة",   bodyIQ: 554, phase: "follicular", weeklyDelta: 22, you: false },
  { id: "m4", alias: "ريم",    bodyIQ: 498, phase: "menstrual",  weeklyDelta: 18, you: false },
  { id: "m5", alias: "هيا",    bodyIQ: 472, phase: "follicular", weeklyDelta: 26, you: false },
  { id: "m6", alias: "دانة",   bodyIQ: 441, phase: "luteal",     weeklyDelta: 12, you: false },
];

// إنجازات بثلاث طبقات
export const achievementsTiered = {
  micro: [
    { id: "mi1", name: "أوّل تسجيل", unlocked: true,  date: "اليوم" },
    { id: "mi2", name: "تسجيل قبل الفطور", unlocked: true,  date: "أمس" },
    { id: "mi3", name: "ماء ٨ أكواب", unlocked: false },
    { id: "mi4", name: "تأمّل ٥ دقائق", unlocked: true, date: "قبل يومين" },
  ],
  macro: [
    { id: "ma1", name: "بطلة المرحلة الجريبيّة", desc: "٥/٥ تحدّيات", unlocked: true,  date: "آخر دورة", arName: "بطلة المرحلة" },
    { id: "ma2", name: "دورة كاملة ٨٠+", desc: "إكمال شامل", unlocked: false, arName: "الدائرة الكاملة" },
    { id: "ma3", name: "صديقة الدائرة", desc: "إكمال تحدّي جماعي", unlocked: true, date: "قبل أسبوع", arName: "روحُ الدائرة" },
  ],
  legacy: [
    { id: "lg1", name: "البصمة الهرمونيّة", desc: "١٢ دورة كاملة", unlocked: false, arName: "البَصمة الهُرمونيّة" },
    { id: "lg2", name: "متألّقة دائمة", desc: "تير ١٠٠٠ لـ٣ أشهر", unlocked: false, arName: "المُتألّقة" },
  ],
};
