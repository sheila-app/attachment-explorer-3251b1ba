// SHEILA v2 — كل بيانات الـ mock للنسخة الجديدة
// لا backend — مصدر واحد للحقيقة لجميع الشاشات الجديدة

export type LifeStage =
  | "regular"        // دورة منتظمة
  | "pregnant"       // حامل
  | "postpartum"     // ما بعد الولادة
  | "perimenopause"  // ما قبل سن اليأس
  | "menopause"      // سن اليأس
  | "no-period-hc"  // حالة صحية (PCOS / HA)
  | "no-period-bc"; // موانع حمل هرمونيّة

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
  menstrual: {
    name: "الطمث",
    color: "var(--phase-menstrual)",
    soft: "var(--phase-menstrual-soft)",
    deep: "var(--phase-menstrual-deep)",
    description: "وقت الراحة والتجدّد. اسمعي جسمك واخفضي الإيقاع.",
  },
  follicular: {
    name: "الجريبيّة",
    color: "var(--phase-follicular)",
    soft: "var(--phase-follicular-soft)",
    deep: "var(--phase-follicular-deep)",
    description: "طاقة صاعدة ومزاج منفتح — وقت ممتاز لتجربة الجديد.",
  },
  ovulation: {
    name: "الإباضة",
    color: "var(--phase-ovulation)",
    soft: "var(--phase-ovulation-soft)",
    deep: "var(--phase-ovulation-deep)",
    description: "ذروة الطاقة والتركيز — استثمري في تمارين عالية الكثافة.",
  },
  luteal: {
    name: "الأصفريّة",
    color: "var(--phase-luteal)",
    soft: "var(--phase-luteal-soft)",
    deep: "var(--phase-luteal-deep)",
    description: "هدوء وتأمّل — اختاري ما هو مألوف ومريح.",
  },
};

// ── المستخدمة الافتراضيّة ──
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

// ── Daily Messages — مصنّفة بحسب المرحلة + الطاقة ──
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
    "أنتِ في ذروة طاقتك الشهريّة. تمرين قوّة عالي الكثافة + وجبة غنيّة بالبروتين = أفضل قرارين اليوم.",
    "هرمون التستوستيرون مرتفع — ثقتك بنفسك في أعلى نقطة الآن. اطلبي ما تستحقّينه.",
    "الإباضة وقت ذروة. كلّ ما تفعلينه اليوم يأتي بضعف الأثر — اختاري بحكمة.",
  ],
  luteal: [
    "جسمك في مرحلة الأصفريّة يحتاج للراحة أكثر من الدفع — هذا ليس تراجعاً، هذا ذكاء. تمرين خفيف وكوب ماء إضافي سيجعلانك تشعرين بفرق.",
    "تقلّبات المزاج طبيعيّة الآن — البروجسترون يرتفع. كربوهيدرات معقّدة + مغنيسيوم = هدنة لطيفة.",
    "حاولي تجنّب اتّخاذ قرارات كبيرة في الأسبوع الأخير من دورتك. ركّزي على الإنجاز التدريجي.",
  ],
};

// ── الوجبات ──
export type Meal = {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  cal: number; protein: number; carbs: number; fats: number;
  phase?: CyclePhase[];
  rationale: string;
  tags?: string[];
};

export const MEALS: Meal[] = [
  { id: "m1", name: "شوفان بالموز والمكسّرات", type: "breakfast", cal: 380, protein: 14, carbs: 52, fats: 12, phase: ["follicular", "ovulation"], rationale: "كربوهيدرات معقّدة لطاقة الصباح في مرحلتك النشطة." },
  { id: "m2", name: "بيض مسلوق مع خبز أسمر وأفوكادو", type: "breakfast", cal: 420, protein: 22, carbs: 30, fats: 22, phase: ["ovulation"], rationale: "بروتين عالي يدعم تمرين القوّة في يوم الإباضة." },
  { id: "m3", name: "فول مدمّس بزيت الزيتون", type: "breakfast", cal: 340, protein: 18, carbs: 42, fats: 10, phase: ["menstrual"], rationale: "حديد + بروتين نباتي لتعويض ما يُفقد في الطمث." },
  { id: "m4", name: "سلطة كينوا بالدجاج المشوي", type: "lunch", cal: 480, protein: 32, carbs: 44, fats: 18, phase: ["follicular", "ovulation"], rationale: "بروتين كامل + كربوهيدرات لإعادة بناء العضلات." },
  { id: "m5", name: "سمك سلمون مشوي مع خضار", type: "lunch", cal: 520, protein: 38, carbs: 22, fats: 28, phase: ["luteal", "menstrual"], rationale: "أوميغا 3 يخفّف من احتباس السوائل والتقلّبات." },
  { id: "m6", name: "كبسة دجاج مع سلطة", type: "lunch", cal: 580, protein: 30, carbs: 60, fats: 18, phase: ["ovulation", "follicular"], rationale: "وجبة شبع كاملة لذروة طاقتك." },
  { id: "m7", name: "شوربة عدس مع خبز", type: "dinner", cal: 360, protein: 18, carbs: 50, fats: 8, phase: ["menstrual", "luteal"], rationale: "حديد + ألياف لراحة الجهاز الهضمي مساءً." },
  { id: "m8", name: "صدر دجاج مع بطاطا حلوة", type: "dinner", cal: 460, protein: 36, carbs: 38, fats: 12, phase: ["follicular", "ovulation"], rationale: "كربوهيدرات بطيئة لتعافٍ أفضل أثناء النوم." },
  { id: "m9", name: "تمر مع لوز", type: "snack", cal: 180, protein: 4, carbs: 22, fats: 9, rationale: "طاقة سريعة + مغنيسيوم." },
  { id: "m10", name: "لبن يوناني بالعسل", type: "snack", cal: 160, protein: 14, carbs: 16, fats: 4, rationale: "بروتين سهل الهضم بين الوجبات." },
  { id: "m11", name: "حمّص بالطحينة وخبز", type: "snack", cal: 240, protein: 10, carbs: 28, fats: 11, rationale: "وجبة خفيفة متوازنة." },
  { id: "m12", name: "موز مع زبدة فول سوداني", type: "snack", cal: 220, protein: 7, carbs: 28, fats: 10, rationale: "بوتاسيوم للعضلات + طاقة للتمرين." },
];

// ── التمارين ──
export type Workout = {
  id: string;
  title: string;
  duration: number; // دقائق
  level: "مبتدئ" | "متوسّط" | "متقدّم";
  cal: number;
  type: "قوّة" | "كارديو" | "ي