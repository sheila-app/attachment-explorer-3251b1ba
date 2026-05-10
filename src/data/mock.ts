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

export type LifeStage = "reproductive" | "pregnant" | "postpartum" | "perimenopause" | "menopause" | "senior";

export const mockUser = {
  name: "نورة",
  age: 28,
  cycleDay: 14,
  cycleLength: 28,
  currentPhase: "ovulation" as CyclePhase,
  streak: 7,
  bestStreak: 21,
  streakGraceActive: false,
  goal: "تحسين اللّياقة العامة",
  location: "الرياض، السعودية",
  country: "السعودية",
  city: "الرياض",
  joinedDays: 142,
  bodyIQ: 589,
  weight: 62,
  height: 165,
  email: "noura@example.com",
  // إعدادات إضافيّة (Use Cases v2)
  lifeStage: "reproductive" as LifeStage,
  trimester: null as 1 | 2 | 3 | null,
  postpartumWeeks: null as number | null,
  birthControl: false,
  dietaryPrefs: ["halal"] as string[],
  displayMacros: true,
  ramadanMode: false,
  doctorClearance: null as boolean | null,
  goalCheckinFrequency: "3months",
  // Body IQ
  bodyIQYesterday: 571,
  // ماكرو هدف يوميّ
  dailyKcal: 1800,
  dailyProtein: 120,
  dailyCarbs: 220,
  dailyFat: 60,
};

export const mockWorkouts = [
  { id: "w1", title: "يوغا الصباح", duration: 20, level: "مبتدئ", phase: "menstrual" as CyclePhase, calories: 80, type: "يوغا", equipment: "سجادة" },
  { id: "w2", title: "كارديو متوسّط", duration: 30, level: "متوسّط", phase: "follicular" as CyclePhase, calories: 240, type: "كارديو", equipment: "بدون" },
  { id: "w3", title: "HIIT حارق", duration: 25, level: "متقدّم", phase: "ovulation" as CyclePhase, calories: 320, type: "HIIT", equipment: "بدون" },
  { id: "w4", title: "تمدّد وراحة", duration: 15, level: "مبتدئ", phase: "luteal" as CyclePhase, calories: 60, type: "تمدّد", equipment: "سجادة" },
  { id: "w5", title: "قوّة الجزء العلوي", duration: 35, level: "متوسّط", phase: "follicular" as CyclePhase, calories: 280, type: "قوّة", equipment: "دمبل" },
  { id: "w6", title: "بيلاتس للجذع", duration: 25, level: "متوسّط", phase: "luteal" as CyclePhase, calories: 180, type: "بيلاتس", equipment: "سجادة" },
];

export const mockExercises = [
  { id: "e1", name: "تحيّة الشمس", sets: 3, reps: "8 تكرارات", rest: 30 },
  { id: "e2", name: "وضعيّة المحارب", sets: 3, reps: "45 ثانية", rest: 30 },
  { id: "e3", name: "ركلات عالية", sets: 4, reps: "20 تكرار", rest: 45 },
  { id: "e4", name: "تمدّد القطّة", sets: 2, reps: "10 تكرارات", rest: 20 },
  { id: "e5", name: "البلانك", sets: 3, reps: "60 ثانية", rest: 45 },
];

export const mockMeals = [
  { id: "m1", title: "شوفان بالتمر واللوز", kcal: 320, type: "فطور", phase: "menstrual" as CyclePhase, prep: 10, protein: 12, carbs: 48, fat: 9 },
  { id: "m2", title: "سلطة كينوا بالدجاج", kcal: 480, type: "غداء", phase: "follicular" as CyclePhase, prep: 20, protein: 38, carbs: 42, fat: 14 },
  { id: "m3", title: "سمك السلمون مع خضار", kcal: 520, type: "عشاء", phase: "ovulation" as CyclePhase, prep: 25, protein: 42, carbs: 22, fat: 28 },
  { id: "m4", title: "شوربة عدس دافئة", kcal: 280, type: "عشاء", phase: "luteal" as CyclePhase, prep: 30, protein: 18, carbs: 38, fat: 6 },
  { id: "m5", title: "زبادي يوناني بالعسل", kcal: 180, type: "وجبة خفيفة", phase: "follicular" as CyclePhase, prep: 5, protein: 15, carbs: 22, fat: 4 },
];

export const mockPosts = [
  { id: "p1", author: "ريم", time: "منذ ساعة", text: "أكملت اليوم تحدّي 30 يوم يوغا، الإحساس رائع!", likes: 24, comments: 6, group: "تحدّيات" },
  { id: "p2", author: "سارة", time: "منذ 3 ساعات", text: "هل من نصائح لتمارين خفيفة في فترة الطمث؟", likes: 12, comments: 18, group: "صحّة المرأة" },
  { id: "p3", author: "هند", time: "أمس", text: "وصفة العشاء اليوم كانت لذيذة جداً، شكراً شيلا.", likes: 41, comments: 9, group: "تغذية" },
  { id: "p4", author: "ليان", time: "أمس", text: "أوّل أسبوع كامل ألتزم بالمشي 10,000 خطوة!", likes: 67, comments: 14, group: "إنجازات" },
];

export const mockNotifications = [
  { id: "n1", title: "تذكير بالتمرين", body: "تمرينكِ يبدأ خلال 30 دقيقة", time: "قبل 5 د", unread: true, type: "workout" },
  { id: "n2", title: "توقّع الدورة", body: "من المتوقّع أن تبدأ دورتكِ خلال 3 أيام", time: "قبل ساعة", unread: true, type: "cycle" },
  { id: "n3", title: "إنجاز جديد", body: "وصلتِ إلى سلسلة 7 أيام متتالية!", time: "أمس", unread: false, type: "award" },
  { id: "n4", title: "تعليق جديد", body: "ريم علّقت على منشوركِ", time: "قبل يومين", unread: false, type: "community" },
];

export const mockAchievements = [
  { id: "a1", name: "أوّل تمرين", iconName: "Sprout", unlocked: true, date: "قبل شهر" },
  { id: "a2", name: "سلسلة 7 أيام", iconName: "Flame", unlocked: true, date: "اليوم" },
  { id: "a3", name: "سلسلة 30 يوم", iconName: "Star", unlocked: false },
  { id: "a4", name: "ملكة اليوغا", iconName: "Wind", unlocked: true, date: "قبل أسبوع" },
  { id: "a5", name: "100 تمرين", iconName: "Trophy", unlocked: false },
  { id: "a6", name: "أخت داعمة", iconName: "Heart", unlocked: true, date: "قبل أسبوعين" },
];

export const mockWeightLog = [
  { date: "01/01", weight: 65.2 },
  { date: "08/01", weight: 64.8 },
  { date: "15/01", weight: 64.1 },
  { date: "22/01", weight: 63.5 },
  { date: "29/01", weight: 62.9 },
  { date: "05/02", weight: 62.4 },
  { date: "12/02", weight: 62.0 },
];

export const mockCycleHistory = [
  { id: 1, start: "01/03", end: "06/03", length: 28, symptoms: ["تشنّج", "إرهاق"] },
  { id: 2, start: "29/03", end: "03/04", length: 28, symptoms: ["صداع"] },
  { id: 3, start: "26/04", end: "01/05", length: 28, symptoms: ["تشنّج"] },
];

export const allScreens = [
  { group: "البداية", items: [
    { path: "/", name: "Splash" },
    { path: "/screens", name: "فهرس الشاشات" },
    { path: "/system", name: "نظام التصميم" },
    { path: "/404", name: "صفحة غير موجودة" },
    { path: "/paywall", name: "الترقية لشيلا برو" },
  ]},
  { group: "Onboarding", items: [
    { path: "/onboarding/welcome", name: "ترحيب" },
    { path: "/onboarding/auth", name: "تسجيل / دخول" },
    { path: "/onboarding/dob", name: "تاريخ الميلاد" },
    { path: "/onboarding/goal", name: "الهدف" },
    { path: "/onboarding/location-pref", name: "مكان التمرين" },
    { path: "/onboarding/level", name: "مستوى اللّياقة" },
    { path: "/onboarding/stats", name: "الطول والوزن" },
    { path: "/onboarding/nutrition-goal", name: "هدف التغذية" },
    { path: "/onboarding/activity", name: "مستوى النشاط" },
    { path: "/onboarding/diet", name: "الحميات" },
    { path: "/onboarding/frequency", name: "تكرار التمرين" },
    { path: "/onboarding/types", name: "أنواع التمرين" },
    { path: "/onboarding/permissions", name: "الأذونات" },
    { path: "/onboarding/cycle-data", name: "آخر دورة" },
    { path: "/onboarding/trial", name: "التجربة المجانية" },
    { path: "/onboarding/complete", name: "اكتمال الإعداد" },
  ]},
  { group: "المصادقة", items: [
    { path: "/auth/login", name: "تسجيل الدخول" },
    { path: "/auth/forgot", name: "نسيتُ كلمة السرّ" },
    { path: "/auth/otp", name: "رمز التحقّق" },
    { path: "/auth/new-password", name: "كلمة سرّ جديدة" },
  ]},
  { group: "الرئيسية", items: [
    { path: "/home", name: "الرئيسية" },
    { path: "/notifications", name: "الإشعارات" },
    { path: "/checkin", name: "تسجيل اليوم" },
    { path: "/checkin/water", name: "تتبّع الماء" },
    { path: "/checkin/sleep", name: "تتبّع النوم" },
    { path: "/checkin/steps", name: "تتبّع الخطوات" },
    { path: "/assistant", name: "مساعدة شيلا (AI)" },
    { path: "/search", name: "بحث" },
  ]},
  { group: "الدورة", items: [
    { path: "/cycle", name: "تقويم الدورة" },
    { path: "/cycle/log", name: "تسجيل الدورة" },
  ]},
  { group: "التمارين", items: [
    { path: "/workouts", name: "مكتبة التمارين" },
    { path: "/workouts/live", name: "جلسات مباشرة" },
    { path: "/workouts/programs", name: "البرامج التدريبيّة" },
    { path: "/workouts/programs/p1", name: "تفاصيل برنامج" },
    { path: "/workouts/w3", name: "تفاصيل تمرين" },
    { path: "/workouts/w3/play", name: "مشغّل التمرين" },
    { path: "/workouts/summary", name: "ملخّص التمرين" },
  ]},
  { group: "التغذية", items: [
    { path: "/nutrition", name: "خطة الوجبات" },
    { path: "/nutrition/m2", name: "تفاصيل وجبة" },
    { path: "/nutrition/log", name: "تسجيل وجبة" },
    { path: "/nutrition/recipes", name: "الوصفات" },
    { path: "/nutrition/shopping", name: "قائمة المشتريات" },
  ]},
  { group: "الرحلة", items: [
    { path: "/journey", name: "رحلة الصحّة" },
    { path: "/journey/awards", name: "الإنجازات" },
    { path: "/journey/measurements", name: "القياسات" },
    { path: "/journey/goals", name: "الأهداف" },
    { path: "/journey/insights", name: "رؤى ذكيّة" },
    { path: "/journey/symptoms", name: "تسجيل الأعراض" },
    { path: "/journey/mood", name: "تسجيل المزاج" },
    { path: "/habits", name: "العادات اليوميّة" },
    { path: "/habits/new", name: "عادة جديدة" },
    { path: "/calendar", name: "تقويمي" },
    { path: "/timer", name: "مؤقّت التركيز" },
    { path: "/reports", name: "التقارير" },
    { path: "/reports/r-monthly", name: "تفاصيل تقرير" },
    { path: "/mindfulness", name: "التأمّل والتنفّس" },
    { path: "/mindfulness/breath", name: "جلسة تنفّس" },
    { path: "/articles", name: "مكتبة المقالات" },
    { path: "/articles/a1", name: "تفاصيل مقال" },
    { path: "/supplements", name: "المكمّلات والأدوية" },
    { path: "/pregnancy", name: "رحلة الحمل" },
    { path: "/emergency", name: "طوارئ صحّيّة" },
  ]},
  { group: "المجتمع", items: [
    { path: "/community", name: "دائرة شيلا" },
    { path: "/community/p1", name: "تفاصيل منشور" },
    { path: "/community/invite", name: "دعوة صديقات" },
    { path: "/community/groups", name: "المجموعات" },
    { path: "/community/events", name: "فعاليّات" },
    { path: "/buddy", name: "أخت المتابعة" },
    { path: "/challenges", name: "التحدّيات" },
    { path: "/challenges/ch1", name: "تفاصيل تحدّي" },
  ]},
  { group: "الخبيرات", items: [
    { path: "/coaches", name: "قائمة الخبيرات" },
    { path: "/coaches/c1", name: "ملف خبيرة" },
    { path: "/coaches/c1/book", name: "حجز جلسة" },
    { path: "/coaches/c1/chat", name: "محادثة مع خبيرة" },
  ]},
  { group: "الحساب", items: [
    { path: "/profile", name: "الملف الشخصي" },
    { path: "/profile/edit", name: "تعديل الملف" },
    { path: "/profile/subscription", name: "الاشتراك" },
    { path: "/profile/payment", name: "الدفع" },
    { path: "/profile/referral", name: "ادعي صديقاتكِ" },
    { path: "/profile/help", name: "المساعدة" },
    { path: "/profile/feedback", name: "ملاحظاتكِ" },
    { path: "/profile/settings", name: "الإعدادات" },
    { path: "/profile/theme", name: "المظهر" },
    { path: "/widgets", name: "تخصيص الرئيسيّة" },
    { path: "/profile/devices", name: "الأجهزة المتصلة" },
    { path: "/profile/language", name: "اللغة" },
    { path: "/profile/privacy", name: "الخصوصيّة والأمان" },
    { path: "/profile/notifications-prefs", name: "تفضيلات الإشعارات" },
    { path: "/notifications/settings", name: "وضع عدم الإزعاج" },
    { path: "/profile/export", name: "تصدير بياناتي" },
    { path: "/profile/backup", name: "النسخ الاحتياطي" },
    { path: "/profile/about", name: "عن شيلا" },
    { path: "/profile/terms", name: "الشروط والأحكام" },
    { path: "/profile/delete", name: "حذف الحساب" },
  ]},
];
