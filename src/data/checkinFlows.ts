// تعريفات فلوهات الـ Check-in حسب الحالة — مأخوذة من SHEILA_CheckIn_Flows
import type { CyclePhase } from "./mock";

export type CheckinFieldType =
  | "mood"
  | "energy"
  | "sleep"
  | "pain"
  | "flow"
  | "symptoms"
  | "bodySignals"
  | "workout"
  | "info"
  | "barrier";

export interface CheckinStep {
  type: CheckinFieldType;
  label: string;
  options?: string[];
  hint?: string;
}

export interface CheckinFlow {
  key: string;
  trigger?: string;            // وصف منطقي للترايقر
  greeting: string;
  tone: string;
  affirmation: string;
  message: string;             // SHEILA says
  steps: CheckinStep[];
  bodyIQReward: number;
  color: string;
}

const moodMenstrual = ["مُنهَكة", "عاطفيّة", "تحتاج دفء", "هادئة", "متوتّرة", "حسّاسة", "طاقة منخفضة", "ضبابيّة الذهن"];
const moodFollicular = ["نشيطة", "متحمّسة", "اجتماعيّة", "مبدعة", "مركّزة", "متفائلة", "مرحة", "صافية"];
const moodOvulation  = ["واثقة", "جاذبة", "معبّرة", "طاقة عالية", "اجتماعيّة", "حادّة", "جريئة", "حسّاسة الجمال"];
const moodLuteal     = ["متعبة", "حسّاسة", "متوتّرة", "متأمّلة", "صبور", "هادئة", "متقلّبة", "عمليّة"];

export const flowsByPhase: Record<CyclePhase, CheckinFlow> = {
  menstrual: {
    key: "A1",
    trigger: "cycleDay 1–5",
    greeting: "الراحة إنتاج ❤️",
    tone: "دافئة، حاضنة، لا ضغط مطلقاً.",
    affirmation: "الراحة ليست كسلاً — هي حكمة.",
    message: "جسمكِ يعمل بجدّ الآن — لا شيء يستحقّ القفز فوقه اليوم.",
    bodyIQReward: 12,
    color: "var(--phase-menstrual)",
    steps: [
      { type: "mood", label: "كيف تشعرين اليوم؟", options: moodMenstrual },
      { type: "flow", label: "كيف تدفّق الدم اليوم؟", options: ["نزّاز خفيف", "خفيف", "متوسّط", "غزير", "غزير جدّاً"] },
      { type: "pain", label: "مستوى التشنّج / الألم", hint: "من ١ (لا شيء) إلى ٥ (شديد)" },
      { type: "symptoms", label: "أعراض اليوم", options: ["انتفاخ", "صداع", "ألم ظهر", "حسّاسيّة الصدر", "غثيان", "حبوب", "إرهاق", "قشعريرة"] },
      { type: "workout", label: "تمرين اليوم", hint: "اقتراح: حركة لطيفة أو راحة", options: ["ابدئي الآن", "لاحقاً", "راحة اليوم"] },
    ],
  },
  follicular: {
    key: "A2",
    trigger: "cycleDay 6–13",
    greeting: "قوّتكِ تتراكم 🌱",
    tone: "محفّزة، تطلّعيّة، احتفال بالزخم.",
    affirmation: "كلّ يوم جديد يحمل طاقة جديدة.",
    message: "هذه المرحلة صُنعت للزخم. طاقتكِ ترتفع — كيف توجّهينها؟",
    bodyIQReward: 12,
    color: "var(--phase-follicular)",
    steps: [
      { type: "mood", label: "كيف تشعرين اليوم؟", options: moodFollicular },
      { type: "energy", label: "مستوى الطاقة اليوم؟", hint: "١ منخفض جداً → ٥ مرتفع جداً" },
      { type: "sleep", label: "كيف كان نومكِ؟", options: ["سيّئ جدّاً", "ضعيف", "عاديّ", "جيّد", "ممتاز"] },
      { type: "workout", label: "تمرين اليوم", hint: "اقتراح: قوّة أو كارديو", options: ["ابدئي الآن", "لاحقاً", "راحة اليوم"] },
    ],
  },
  ovulation: {
    key: "A3",
    trigger: "cycleDay 14–16",
    greeting: "نافذة الذروة ✨",
    tone: "جريئة، احتفاليّة، ذروة طاقة.",
    affirmation: "أنتِ في ذروة قوّتكِ — تألّقي.",
    message: "أنتِ في ذروتكِ. قدراتكِ في أعلى مستوياتها — تحدّي نفسكِ!",
    bodyIQReward: 15,
    color: "var(--phase-ovulation)",
    steps: [
      { type: "mood", label: "كيف تشعرين اليوم؟", options: moodOvulation },
      { type: "energy", label: "مستوى الطاقة اليوم؟" },
      { type: "sleep", label: "كيف كان نومكِ؟", options: ["سيّئ جدّاً", "ضعيف", "عاديّ", "جيّد", "ممتاز"] },
      { type: "bodySignals", label: "إشارات جسديّة (اختياري)", options: ["تشنّج خفيف", "إفرازات", "تغيّرات الصدر"] },
      { type: "workout", label: "تمرين اليوم", hint: "اقتراح: HIIT أو تحدّي جديد", options: ["ابدئي الآن", "لاحقاً", "تخطّي اليوم"] },
    ],
  },
  luteal: {
    key: "A4",
    trigger: "cycleDay 17–28",
    greeting: "وقت العمق 🌙",
    tone: "متأنّية، حاضنة، حضور لا أداء.",
    affirmation: "جسمكِ يستعدّ لشيء جديد — هذا قوّة.",
    message: "هذه نافذة العمق. لا حكم اليوم — استمعي لما يحتاجه جسمكِ. أنا معكِ.",
    bodyIQReward: 12,
    color: "var(--phase-luteal)",
    steps: [
      { type: "mood", label: "كيف تشعرين اليوم؟", options: moodLuteal },
      { type: "energy", label: "مستوى الطاقة اليوم؟" },
      { type: "sleep", label: "كيف كان نومكِ؟", options: ["سيّئ جدّاً", "ضعيف", "عاديّ", "جيّد", "ممتاز"] },
      { type: "symptoms", label: "ما تلاحظينه", options: ["انتفاخ", "حبوب", "حسّاسيّة الصدر", "اشتهاء", "تقلّب مزاج", "صداع", "إرهاق", "أرق"] },
      { type: "workout", label: "تمرين اليوم", hint: "اقتراح: حركة معتدلة", options: ["ابدئي الآن", "لاحقاً", "راحة اليوم"] },
    ],
  },
};

// حالات استثنائيّة
export const exceptionFlows = {
  noCycle: {
    key: "B1",
    greeting: "صحّتكِ، بشروطكِ ✨",
    tone: "محايدة، داعمة، بلا لغة المراحل.",
    message: "كلّ جسم يتحدّث بلغته — لنبدأ من حيث أنتِ اليوم.",
    affirmation: "الانتباه لنفسكِ هو أوّل خطوة في الرحلة.",
    bodyIQReward: 10,
    color: "var(--primary)",
    steps: [
      { type: "mood", label: "كيف حالكِ الآن؟" } as CheckinStep,
      { type: "energy", label: "مستوى الطاقة" } as CheckinStep,
      { type: "sleep", label: "كيف كان نومكِ؟", options: ["سيّئ جدّاً", "ضعيف", "عاديّ", "جيّد", "ممتاز"] } as CheckinStep,
    ],
  },
  pregnancyT1: {
    key: "C1",
    greeting: "أنتِ على أعتاب شيء لا يوصف ❤️",
    tone: "حنونة جدّاً، آمنة، بلا ضغط.",
    message: "أنتِ على أعتاب شيء لا يُوصف. الراحة استعداد — ليست كسلاً.",
    affirmation: "أنتِ على أعتاب شيء لا يُوصف.",
    bodyIQReward: 10,
    color: "var(--primary-glow)",
    steps: [
      { type: "mood", label: "كيف تشعرين اليوم؟", options: ["هادئة", "مشعّة", "قلقة", "مغمورة", "تحضير العشّ", "عاطفيّة", "نشيطة", "متعبة"] } as CheckinStep,
      { type: "energy", label: "مستوى الطاقة" } as CheckinStep,
      { type: "symptoms", label: "أعراض اليوم", options: ["غثيان صباحي", "إرهاق", "حساسيّة شمّ", "حسّاسيّة صدر", "إمساك", "صداع"] } as CheckinStep,
    ],
  },
  ramadan: {
    key: "D1",
    greeting: "بارك الله رحلتكِ 🌙",
    tone: "روحيّة، خفيفة، بلا أرقام صارمة.",
    message: "خطواتكِ في طريق الله أعظم رياضة للروح.",
    affirmation: "خطواتكِ في طريق الله أعظم رياضة للروح.",
    bodyIQReward: 8,
    color: "var(--phase-luteal)",
    steps: [
      { type: "mood", label: "كيف حالكِ اليوم؟" } as CheckinStep,
      { type: "energy", label: "مستوى الطاقة قبل الإفطار" } as CheckinStep,
      { type: "info", label: "تذكير", hint: "الترطيب بعد الإفطار، تمرين ٢٠–٣٠ دقيقة قبل السحور أو بعد التراويح." } as CheckinStep,
    ],
  },
};

export type CheckinFlowKey = "menstrual" | "follicular" | "ovulation" | "luteal" | "noCycle" | "pregnancyT1" | "ramadan";
