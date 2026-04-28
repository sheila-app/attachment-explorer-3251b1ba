// بيانات وهمية مركزية لنموذج SHEILA الأولي

export type CyclePhase = "menstrual" | "follicular" | "ovulation" | "luteal";

export const PHASE_META: Record<CyclePhase, { name: string; color: string; soft: string; description: string }> = {
  menstrual: {
    name: "الطمث",
    color: "var(--phase-menstrual)",
    soft: "var(--phase-menstrual-soft)",
    description: "وقت الراحة والتجدّد. تمارين خفيفة وتغذية مدعّمة بالحديد.",
  },
  follicular: {
    name: "الجريبية",
    color: "var(--phase-follicular)",
    soft: "var(--phase-follicular-soft)",
    description: "الطاقة في تصاعد. وقت مثالي للتمارين الجديدة والتحديّات.",
  },
  ovulation: {
    name: "الإباضة",
    color: "var(--phase-ovulation)",
    soft: "var(--phase-ovulation-soft)",
    description: "ذروة الطاقة والثقة. تمارين عالية الكثافة ومجموعات اجتماعية.",
  },
  luteal: {
    name: "الأصفرية",
    color: "var(--phase-luteal)",
    soft: "var(--phase-luteal-soft)",
    description: "اهدئي تدريجياً. تمارين متوسّطة وتغذية تدعم المزاج.",
  },
};

export const mockUser = {
  name: "نورة",
  age: 28,
  cycleDay: 14,
  cycleLength: 28,
  currentPhase: "ovulation" as CyclePhase,
  streak: 7,
  goal: "تحسين اللّياقة العامة",
};

export const mockWorkouts = [
  { id: "w1", title: "يوغا الصباح", duration: 20, level: "مبتدئ", phase: "menstrual" as CyclePhase, calories: 80 },
  { id: "w2", title: "كارديو متوسّط", duration: 30, level: "متوسّط", phase: "follicular" as CyclePhase, calories: 240 },
  { id: "w3", title: "HIIT حارق", duration: 25, level: "متقدّم", phase: "ovulation" as CyclePhase, calories: 320 },
  { id: "w4", title: "تمدّد وراحة", duration: 15, level: "مبتدئ", phase: "luteal" as CyclePhase, calories: 60 },
  { id: "w5", title: "قوّة الجزء العلوي", duration: 35, level: "متوسّط", phase: "follicular" as CyclePhase, calories: 280 },
  { id: "w6", title: "بيلاتس للجذع", duration: 25, level: "متوسّط", phase: "luteal" as CyclePhase, calories: 180 },
];

export const mockMeals = [
  { id: "m1", title: "شوفان بالتمر واللوز", kcal: 320, type: "فطور", phase: "menstrual" as CyclePhase },
  { id: "m2", title: "سلطة كينوا بالدجاج", kcal: 480, type: "غداء", phase: "follicular" as CyclePhase },
  { id: "m3", title: "سمك السلمون مع خضار", kcal: 520, type: "عشاء", phase: "ovulation" as CyclePhase },
  { id: "m4", title: "شوربة عدس دافئة", kcal: 280, type: "عشاء", phase: "luteal" as CyclePhase },
  { id: "m5", title: "زبادي يوناني بالعسل", kcal: 180, type: "وجبة خفيفة", phase: "follicular" as CyclePhase },
];

export const mockPosts = [
  { id: "p1", author: "ريم", time: "منذ ساعة", text: "أكملت اليوم تحدّي ٣٠ يوم يوغا، الإحساس رائع!", likes: 24, comments: 6 },
  { id: "p2", author: "سارة", time: "منذ ٣ ساعات", text: "هل من نصائح لتمارين خفيفة في فترة الطمث؟", likes: 12, comments: 18 },
  { id: "p3", author: "هند", time: "أمس", text: "وصفة العشاء اليوم كانت لذيذة جداً، شكراً شيلا.", likes: 41, comments: 9 },
];

export const allScreens = [
  { group: "البداية", items: [
    { path: "/", name: "Splash" },
    { path: "/screens", name: "فهرس الشاشات" },
  ]},
  { group: "Onboarding", items: [
    { path: "/onboarding/welcome", name: "ترحيب" },
    { path: "/onboarding/auth", name: "تسجيل / دخول" },
  ]},
  { group: "الرئيسية", items: [
    { path: "/home", name: "الصفحة الرئيسية" },
  ]},
];
