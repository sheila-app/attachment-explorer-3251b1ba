// SHEILA v2 — كل بيانات mock للنسخة الجديدة (مصدر واحد للحقيقة)

export type LifeStage =
  | "regular" | "pregnant" | "postpartum"
  | "perimenopause" | "menopause" | "no-period-hc" | "no-period-bc";

export type CyclePhase = "menstrual" | "follicular" | "ovulation" | "luteal";

export const LIFE_STAGES: { id: LifeStage; label: string; tabLabel: string; tabPath: string }[] = [
  { id: "regular", label: "دورة منتظمة", tabLabel: "الدورة", tabPath: "/sheila-v2/cycle" },
  { id: "pregnant", label: "حامل", tabLabel: "رحلة الحمل", tabPath: "/sheila-v2/pregnancy" },
  { id: "postpartum", label: "ما بعد الولادة", tabLabel: "ما بعد الولادة", tabPath: "/sheila-v2/postpartum" },
  { id: "perimenopause", label: "ما قبل سن اليأس", tabLabel: "الدورة", tabPath: "/sheila-v2/cycle" },
  { id: "menopause", label: "سن اليأس", tabLabel: "صحتي", tabPath: "/sheila-v2/health" },
  { id: "no-period-hc", label: "بدون دورة (PCOS)", tabLabel: "صحتي", tabPath: "/sheila-v2/health" },
  { id: "no-period-bc", label: "موانع حمل", tabLabel: "صحتي", tabPath: "/sheila-v2/health" },
];

export const PHASE_META: Record<CyclePhase, { name: string; color: string; soft: string; deep: string; description: string }> = {
  menstrual:  { name: "الطمث",      color: "var(--phase-menstrual)",  soft: "var(--phase-menstrual-soft)",  deep: "var(--phase-menstrual-deep)",  description: "وقت الراحة والتجدّد. اسمعي جسمك واخفضي الإيقاع." },
  follicular: { name: "الجريبيّة",  color: "var(--phase-follicular)", soft: "var(--phase-follicular-soft)", deep: "var(--phase-follicular-deep)", description: "طاقة صاعدة ومزاج منفتح — وقت ممتاز لتجربة الجديد." },
  ovulation:  { name: "الإباضة",    color: "var(--phase-ovulation)",  soft: "var(--phase-ovulation-soft)",  deep: "var(--phase-ovulation-deep)",  description: "ذروة الطاقة والتركيز — استثمري في تمارين عالية الكثافة." },
  luteal:     { name: "الأصفريّة",  color: "var(--phase-luteal)",     soft: "var(--phase-luteal-soft)",     deep: "var(--phase-luteal-deep)",     description: "هدوء وتأمّل — اختاري ما هو مألوف ومريح." },
};

export const userV2 = {
  name: "نوران",
  cycleDay: 14,
  cycleLength: 28,
  currentPhase: "ovulation" as CyclePhase,
  lifeStage: "regular" as LifeStage,
  bodyIQ: 547,
  streak: 18,
  goal: "تحسين اللياقة العامّة",
  fitnessLevel: "متوسّط",
  energy: "عالية" as "منخفضة" | "متوسّطة" | "عالية",
  caloriesTarget: 1800,
  caloriesToday: 1240,
  proteinG: 68,
  proteinTarget: 95,
  waterCups: 6,
  waterTarget: 8,
  sleepHours: 7.4,
};

// ── Daily Messages ──
export const DAILY_MESSAGES: Record<CyclePhase, string[]> = {
  menstrual: [
    "جسمك في يوم راحة طبيعيّة. كوب شاي دافئ، تمرين تمدّد لخمس عشرة دقيقة، وأكلة غنيّة بالحديد — هذا ما يحتاجه اليوم.",
    "الطمث ليس ضعفاً — هو إعادة ضبط. خفّضي الإيقاع، اشربي الماء بوفرة، وامنحي نفسك إذناً بالبطء.",
    "ألاحظ أنّك سجّلتِ نوماً جيّداً البارحة — هذا ينعكس على هرموناتك اليوم. حاولي المشي عشرين دقيقة فقط.",
  ],
  follicular: [
    "هرمون الإستروجين يصعد — والأرجح أنّك تشعرين بصفاء ذهني واضح. هذا أفضل وقت لبدء عادة جديدة.",
    "الطاقة في تصاعد. جرّبي تمريناً جديداً اليوم، ووجبة لم تجرّبيها قبلاً — جسمك مستعدّ للجديد.",
    "صباح الجريبيّة عادةً ما يكون الأنشط في الشهر. استثمري الساعة الأولى بعد الاستيقاظ في شيء مهمّ لكِ.",
  ],
  ovulation: [
    "أنتِ في ذروة طاقتك الشهريّة. تمرين قوّة عالي الكثافة + وجبة غنيّة بالبروتين = أفضل قراريْن اليوم.",
    "هرمون التستوستيرون مرتفع — ثقتك بنفسك في أعلى نقطة الآن. اطلبي ما تستحقّينه.",
    "الإباضة وقت ذروة. كلّ ما تفعلينه اليوم يأتي بضعف الأثر — اختاري بحكمة.",
  ],
  luteal: [
    "جسمك في الأصفريّة يحتاج للراحة أكثر من الدفع — هذا ليس تراجعاً، هذا ذكاء. تمرين خفيف وكوب ماء إضافي سيُحدثان فرقاً.",
    "تقلّبات المزاج طبيعيّة الآن — البروجسترون يرتفع. كربوهيدرات معقّدة + مغنيسيوم = هدنة لطيفة.",
    "حاولي تجنّب اتّخاذ قرارات كبيرة في الأسبوع الأخير من دورتك. ركّزي على الإنجاز التدريجي.",
  ],
};

// ── الوجبات ──
export type Meal = {
  id: string; name: string; type: "breakfast" | "lunch" | "dinner" | "snack";
  cal: number; protein: number; carbs: number; fats: number;
  phase?: CyclePhase[]; rationale: string;
};

export const MEAL_TYPES: { id: Meal["type"]; label: string; time: string }[] = [
  { id: "breakfast", label: "فطور",       time: "07:00 - 10:00" },
  { id: "lunch",     label: "غداء",       time: "12:00 - 15:00" },
  { id: "dinner",    label: "عشاء",       time: "18:00 - 21:00" },
  { id: "snack",     label: "وجبة خفيفة", time: "بين الوجبات" },
];

export const MEALS: Meal[] = [
  { id: "m1",  name: "شوفان بالموز والمكسّرات",      type: "breakfast", cal: 380, protein: 14, carbs: 52, fats: 12, phase: ["follicular", "ovulation"], rationale: "كربوهيدرات معقّدة لطاقة الصباح في مرحلتك النشطة." },
  { id: "m2",  name: "بيض مسلوق مع خبز أسمر وأفوكادو", type: "breakfast", cal: 420, protein: 22, carbs: 30, fats: 22, phase: ["ovulation"], rationale: "بروتين عالٍ يدعم تمرين القوّة في يوم الإباضة." },
  { id: "m3",  name: "فول مدمّس بزيت الزيتون",        type: "breakfast", cal: 340, protein: 18, carbs: 42, fats: 10, phase: ["menstrual"], rationale: "حديد وبروتين نباتي لتعويض ما يُفقد في الطمث." },
  { id: "m4",  name: "سلطة كينوا بالدجاج المشوي",     type: "lunch",     cal: 480, protein: 32, carbs: 44, fats: 18, phase: ["follicular", "ovulation"], rationale: "بروتين كامل وكربوهيدرات لإعادة بناء العضلات." },
  { id: "m5",  name: "سمك سلمون مشوي مع خضار",        type: "lunch",     cal: 520, protein: 38, carbs: 22, fats: 28, phase: ["luteal", "menstrual"], rationale: "أوميغا 3 يخفّف احتباس السوائل والتقلّبات." },
  { id: "m6",  name: "كبسة دجاج مع سلطة",             type: "lunch",     cal: 580, protein: 30, carbs: 60, fats: 18, phase: ["ovulation", "follicular"], rationale: "وجبة شبع كاملة لذروة طاقتك." },
  { id: "m7",  name: "شوربة عدس مع خبز",              type: "dinner",    cal: 360, protein: 18, carbs: 50, fats: 8,  phase: ["menstrual", "luteal"], rationale: "حديد وألياف لراحة الجهاز الهضمي مساءً." },
  { id: "m8",  name: "صدر دجاج مع بطاطا حلوة",        type: "dinner",    cal: 460, protein: 36, carbs: 38, fats: 12, phase: ["follicular", "ovulation"], rationale: "كربوهيدرات بطيئة لتعافٍ أفضل أثناء النوم." },
  { id: "m9",  name: "تمر مع لوز",                    type: "snack",     cal: 180, protein: 4,  carbs: 22, fats: 9,  rationale: "طاقة سريعة ومغنيسيوم." },
  { id: "m10", name: "لبن يوناني بالعسل",             type: "snack",     cal: 160, protein: 14, carbs: 16, fats: 4,  rationale: "بروتين سهل الهضم بين الوجبات." },
  { id: "m11", name: "حمّص بالطحينة وخبز",            type: "snack",     cal: 240, protein: 10, carbs: 28, fats: 11, rationale: "وجبة خفيفة متوازنة." },
  { id: "m12", name: "موز مع زبدة فول سوداني",        type: "snack",     cal: 220, protein: 7,  carbs: 28, fats: 10, rationale: "بوتاسيوم للعضلات وطاقة للتمرين." },
];

// ── التمارين ──
export type Workout = {
  id: string; title: string; duration: number; level: "مبتدئ" | "متوسّط" | "متقدّم";
  cal: number; type: "قوّة" | "كارديو" | "يوغا" | "تمدّد" | "HIIT" | "بيلاتس";
  phase: CyclePhase[]; rationale: string;
  blocks?: { name: string; items: { name: string; sets?: number; reps?: string; rest?: string; duration?: string }[] }[];
};

export const WORKOUTS: Workout[] = [
  { id: "w1", title: "قوّة الجزء العلوي", duration: 35, level: "متوسّط", cal: 280, type: "قوّة", phase: ["ovulation", "follicular"],
    rationale: "ذروة طاقتك تجعل تمرين القوّة الأكثر ربحاً اليوم.",
    blocks: [
      { name: "إحماء", items: [{ name: "دوران الأكتاف", duration: "30 ث" }, { name: "تمدّد الصدر", duration: "30 ث" }, { name: "قفز خفيف", duration: "60 ث" }] },
      { name: "رئيسي", items: [
        { name: "بنش برس بالدمبل", sets: 3, reps: "10", rest: "60 ث" },
        { name: "تجديف منحني", sets: 3, reps: "12", rest: "60 ث" },
        { name: "ضغط كتف", sets: 3, reps: "10", rest: "60 ث" },
        { name: "بايسبس كيرل", sets: 3, reps: "12", rest: "45 ث" },
        { name: "ترايسبس إكستنشن", sets: 3, reps: "12", rest: "45 ث" },
      ]},
      { name: "تهدئة", items: [{ name: "تمدّد الصدر", duration: "45 ث" }, { name: "تمدّد الكتف", duration: "45 ث" }] },
    ],
  },
  { id: "w2", title: "كارديو HIIT 20 دقيقة", duration: 20, level: "متقدّم", cal: 240, type: "HIIT", phase: ["ovulation"],
    rationale: "إيقاع مرتفع يستفيد من الذروة الهرمونيّة." },
  { id: "w3", title: "يوغا التعافي اللطيفة", duration: 25, level: "مبتدئ", cal: 90, type: "يوغا", phase: ["menstrual", "luteal"],
    rationale: "تمدّد لطيف يخفّف التقلّصات ويهدّئ الجهاز العصبي." },
  { id: "w4", title: "بيلاتس للجذع", duration: 30, level: "متوسّط", cal: 180, type: "بيلاتس", phase: ["follicular", "luteal"],
    rationale: "تقوية الجذع دون إجهاد عالي." },
  { id: "w5", title: "تمدّد كامل الجسم", duration: 15, level: "مبتدئ", cal: 60, type: "تمدّد", phase: ["menstrual", "luteal"],
    rationale: "تمدّد قصير يحسّن الدورة الدمويّة." },
  { id: "w6", title: "كارديو متوسّط 30 دقيقة", duration: 30, level: "متوسّط", cal: 220, type: "كارديو", phase: ["follicular", "ovulation"],
    rationale: "تمرين كارديو معتدل لرفع التحمّل." },
];

// ── Smart Insights ──
export type Insight = { id: string; category: "أفضل أداء" | "أنماط الطاقة" | "تأثير الدورة" | "توازن التغذية"; text: string; link?: string };
export const SMART_INSIGHTS: Insight[] = [
  { id: "i1", category: "أفضل أداء",     text: "أنتِ أكثر التزاماً بالتمرين أيام الثلاثاء والخميس — حافظي على هذا النمط.", link: "/sheila-v2/workouts" },
  { id: "i2", category: "أنماط الطاقة",  text: "طاقتكِ في ذروتها بين 16:00 و 19:00 — وقت مثالي لتمارين القوّة.", link: "/sheila-v2/workouts" },
  { id: "i3", category: "تأثير الدورة",  text: "خلال مرحلة الطمث، تنخفض شدّة تمرينك بنسبة 30٪ — هذا طبيعي تماماً.", link: "/sheila-v2/cycle" },
  { id: "i4", category: "توازن التغذية", text: "استهلاكك من البروتين أقلّ بـ 20٪ من المستهدف — أضيفي مصدراً في كل وجبة.", link: "/sheila-v2/nutrition" },
];

export const MONTHLY_INSIGHTS: string[] = [
  "أفضل أداء كان أيام الإباضة — كثّفي التمارين عالية الكثافة فيها.",
  "نقص في شرب الماء أيام الأحد — احتفظي بزجاجة قريبة منك.",
  "جودة نومك تحسّنت بعد جلسات التأمّل المسائيّة — استمرّي.",
];

// ── المستويات (Tier System) ──
export type Tier = { id: string; name: string; min: number; max: number; color: string; gradient: string; description: string };
export const TIERS: Tier[] = [
  { id: "seedling", name: "البذرة",   min: 0,    max: 199,  color: "oklch(0.78 0.06 145)", gradient: "linear-gradient(135deg, oklch(0.94 0.04 145), oklch(0.92 0.04 145))", description: "البداية الهادئة — كلّ خطوة تُحسب." },
  { id: "blooming", name: "الإزهار",  min: 200,  max: 399,  color: "var(--phase-follicular)", gradient: "linear-gradient(135deg, oklch(0.94 0.07 55), oklch(0.92 0.06 322))", description: "أنتِ تنمين بثبات — العادات بدأت تتشكّل." },
  { id: "sharp",    name: "المتألّقة", min: 400,  max: 799,  color: "var(--primary)",          gradient: "linear-gradient(135deg, oklch(0.66 0.16 322), oklch(0.78 0.14 280))", description: "وعي ناضج بجسمك ودورتك." },
  { id: "fluent",   name: "المتمكّنة", min: 800,  max: 999,  color: "var(--phase-ovulation)",  gradient: "linear-gradient(135deg, oklch(0.66 0.16 322), oklch(0.72 0.14 165), oklch(0.78 0.14 55))", description: "تمكّن واضح — أنتِ تعرفين جسمك بعمق." },
  { id: "radiant",  name: "المشرقة",  min: 1000, max: 9999, color: "oklch(0.78 0.14 75)",     gradient: "linear-gradient(135deg, oklch(0.85 0.12 75), oklch(0.78 0.14 322), oklch(0.72 0.14 165), oklch(0.85 0.12 75))", description: "نادرة — أقلّ من 5٪ من المستخدمات يصلن هنا." },
];

export function tierFor(score: number): Tier {
  return TIERS.find((t) => score >= t.min && score <= t.max) ?? TIERS[0];
}

// ── أعمدة الإنجاز ──
export const PILLARS = [
  { id: "consistency", name: "الثبات",  color: "oklch(0.7 0.16 25)",  desc: "سلاسل: 7 / 14 / 30 / 100 يوم" },
  { id: "movement",    name: "الحركة",  color: "var(--phase-ovulation)", desc: "تمارين: 1 / 10 / 50 / 100 جلسة" },
  { id: "cycle",       name: "الدورة",  color: "var(--phase-luteal)", desc: "وعي بالدورة وتسجيلها" },
  { id: "nutrition",   name: "التغذية", color: "oklch(0.7 0.16 145)", desc: "وجبات، ماء، وصفات" },
  { id: "community",   name: "المجتمع", color: "oklch(0.78 0.14 75)", desc: "مشاركة، دعم، تحدّيات" },
  { id: "sheila",      name: "شيلا",    color: "var(--primary)",      desc: "تفاعل مع الذكاء الاصطناعي" },
];

// ── الإنجازات ──
export type Achievement = { id: string; name: string; pillar: string; tier: string; unlocked: boolean; desc: string };
export const ACHIEVEMENTS: Achievement[] = [
  { id: "a1", name: "أوّل جلسة",      pillar: "movement",    tier: "seedling", unlocked: true,  desc: "أكملتِ أوّل تمرين لكِ في التطبيق." },
  { id: "a2", name: "سلسلة الأسبوع",  pillar: "consistency", tier: "blooming", unlocked: true,  desc: "سبعة أيام متتالية من النشاط." },
  { id: "a3", name: "10 تمارين",      pillar: "movement",    tier: "blooming", unlocked: true,  desc: "أكملتِ عشر جلسات تمرين." },
  { id: "a4", name: "أسبوعا الماء",   pillar: "nutrition",   tier: "blooming", unlocked: true,  desc: "حقّقتِ هدف الماء أربعة عشر يوماً متتالياً." },
  { id: "a5", name: "أوّل وصفة شيلا", pillar: "sheila",      tier: "blooming", unlocked: true,  desc: "بنيتِ أوّل وصفة مع شيلا." },
  { id: "a6", name: "30 يوماً ثبات",  pillar: "consistency", tier: "sharp",    unlocked: false, desc: "ثلاثون يوماً متتالياً من النشاط — تحدٍّ مُتاح." },
  { id: "a7", name: "50 تمريناً",     pillar: "movement",    tier: "sharp",    unlocked: false, desc: "أكملي خمسين جلسة لتفتحي هذا الإنجاز." },
  { id: "a8", name: "صديقة فعّالة",   pillar: "community",   tier: "sharp",    unlocked: false, desc: "ادعمي عشر منشورات في دائرة شيلا." },
];

// ── دائرة شيلا — Feed ──
export type Post = { id: string; author: string; tier: string; cat: string; time: string; text: string; likes: number; replies: number };
export const FEED: Post[] = [
  { id: "p1", author: "ريم",   tier: "sharp",    cat: "إنجاز",    time: "قبل 12 د",  text: "أكملت اليوم 30 يوماً متتالية من التمرين! شكراً لكلّ من شجّعني — السلسلة الأطول في حياتي.", likes: 24, replies: 7 },
  { id: "p2", author: "سارة", tier: "blooming", cat: "سؤال",     time: "قبل ساعة", text: "بنات، أحدكنّ جرّبت تمرين القوّة في يوم الإباضة؟ هل لاحظتنّ فرقاً واضحاً؟", likes: 11, replies: 14 },
  { id: "p3", author: "نورة", tier: "fluent",   cat: "تحدّي",    time: "قبل 3 س",  text: "بدأت تحدّي السبعة أيام بدون سكر مضاف — من معي؟ نتشارك التقدّم هنا يوميّاً.", likes: 38, replies: 22 },
  { id: "p4", author: "ميسر", tier: "blooming", cat: "وصفة",     time: "قبل 5 س",  text: "اكتشفت وصفة شوفان مع تمر ولوز — لذيذة وتسدّ النَفَس لساعات. شيلا اقترحتها وأنا منبهرة.", likes: 17, replies: 6 },
];

// ── المجموعات / الفعاليّات ──
export const GROUPS = [
  { id: "g1", name: "أمّهات بعد الولادة",   members: 248, icon: "🤱" },
  { id: "g2", name: "PCOS وصحة الهرمونات", members: 412, icon: "🌸" },
  { id: "g3", name: "تمارين منزليّة",        members: 1240, icon: "🏠" },
  { id: "g4", name: "رمضان والصيام الصحي",  members: 892, icon: "🌙" },
];
export const EVENTS = [
  { id: "e1", title: "ورشة التغذية في رمضان",    date: "25 مارس",  type: "أونلاين", price: "مجاني",    host: "د. هند" },
  { id: "e2", title: "تمارين بعد الولادة — حضوري", date: "3 أبريل",  type: "حضوري",  price: "120 ر.س",  host: "م. ريم" },
  { id: "e3", title: "دائرة دعم PCOS",             date: "10 أبريل", type: "أونلاين", price: "مجاني",    host: "شيلا" },
];

// ── شريك المساءلة ──
export const PARTNER_SUGGESTIONS = [
  { name: "ليلى", goal: "تحسين اللياقة العامّة", streak: 21, freq: "5 مرّات أسبوعيّاً", level: "متوسّط" },
  { name: "هند",  goal: "بناء العضلات",          streak: 34, freq: "4 مرّات أسبوعيّاً", level: "متوسّط" },
  { name: "ريما", goal: "زيادة النشاط اليومي",   streak: 12, freq: "5 مرّات أسبوعيّاً", level: "متوسّط" },
];

// ── شات شيلا — ردود جاهزة ──
export const SHEILA_REPLIES: { match: RegExp | string; reply: string }[] = [
  { match: /وصفة|طبخ|أكل/, reply: "بنيت لكِ وصفة جاهزة — كينوا بالدجاج والخضار: 480 سعرة، 32غ بروتين. وقت التحضير 25 دقيقة. أفتح بطاقة الوصفة؟" },
  { match: /تمرين|رياضة/,  reply: "بناءً على مرحلتك الحاليّة (الإباضة) ومستواك المتوسّط، أقترح تمرين قوّة الجزء العلوي 35 دقيقة. تريدين أبدأه الآن؟" },
  { match: /متعب|تعبان|إرهاق|مكتئب/, reply: "أسمعك. الإرهاق في هذه المرحلة طبيعي وله تفسير هرموني. هل تريدين تمريناً خفيفاً جدّاً (15 د تمدّد)، أو أن نتحدّث عمّا تشعرين به؟" },
  { match: /ماء|شرب/,      reply: "اليوم شربتِ 6 كؤوس من 8. كأسان فقط لإكمال الهدف — اشربي واحداً الآن وآخر قبل النوم." },
  { match: /دورة|طمث|بريود/, reply: "أنتِ في اليوم 14، مرحلة الإباضة. ذروة الطاقة. الإباضة المتوقّعة اليوم أو غداً، والدورة القادمة بعد 14 يوماً تقريباً." },
];
export const SHEILA_DEFAULT = "أنا هنا. اسأليني عن مرحلتك، وجبة، تمرين، أو أيّ شيء يخصّ صحّتك — وسأجاوبك بناءً على بياناتك.";

// ── تنبيهات ──
export const NOTIFICATIONS = [
  { id: "n1", title: "تمرين اليوم جاهز", body: "قوّة الجزء العلوي — 35 دقيقة. هيّا نبدأ؟", time: "قبل 5 د",  unread: true,  icon: "💪" },
  { id: "n2", title: "+15 Body IQ",       body: "أكملتِ سلسلة المياه — أحسنت!",            time: "قبل ساعة", unread: true,  icon: "✨" },
  { id: "n3", title: "ريم علّقت على منشورك", body: "في دائرة شيلا",                          time: "قبل 3 س",  unread: false, icon: "💬" },
  { id: "n4", title: "تذكير شرب الماء",   body: "كأسان فقط لإكمال هدف اليوم.",              time: "قبل 5 س",  unread: false, icon: "💧" },
];
