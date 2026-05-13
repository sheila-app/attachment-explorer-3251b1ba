// كل فلوهات SHEILA Check-In — مأخوذة من SHEILA_CheckIn_Flows-4.pdf
// 28 حالة موزّعة على 6 أقسام (A–F)

export type CheckinStepType = "scale" | "info" | "single" | "multi" | "text";

export interface CheckinStep {
  type: CheckinStepType;
  label: string;
  hint?: string;
  options?: string[];
  alertOptions?: string[]; // خيارات تُحفّز تنبيه ⚠
}

export interface CheckinFlow {
  key: string;            // مثل A1 / B2
  slug: string;           // مسار الراوت
  greeting: string;
  message: string;
  affirmation: string;
  bodyIQReward: number;
  color: string;          // CSS variable أو لون
  variant?: "warm" | "calm" | "energetic" | "default";
  alert?: string;         // نص التنبيه إن وُجد
  steps: CheckinStep[];
}

// ========== مجموعات المزاج ==========
const MOOD_MENSTRUAL = ["مُنهَكة", "عاطفيّة", "تحتاج دفء", "هادئة", "متوتّرة", "حسّاسة", "طاقة منخفضة", "ضبابيّة الذهن"];
const MOOD_FOLLICULAR = ["نشيطة", "متحمّسة", "اجتماعيّة", "مبدعة", "مركّزة", "متفائلة", "مرحة", "صافية"];
const MOOD_OVULATION  = ["واثقة", "جاذبة", "معبّرة", "طاقة عالية", "اجتماعيّة", "حادّة", "جريئة", "حسّاسة الجمال"];
const MOOD_LUTEAL_EARLY = ["مركّزة", "متأمّلة", "منهجيّة", "حسّاسة", "متعبة", "تشتهي", "قلقة", "مصمّمة"];
const MOOD_LUTEAL_LATE  = ["متوتّرة", "دامعة", "منتفخة", "مُستنزَفة", "منعزلة", "مُثقَلة", "متبلّدة", "حسّاسة"];
const MOOD_GENERAL = ["سعيدة", "هادئة", "متعبة", "قلقة", "متحمّسة", "مُثقَلة", "متبلّدة", "ممتنّة"];
const MOOD_PREGNANCY = ["هادئة", "مشعّة", "قلقة", "مُثقَلة", "تحضير العشّ", "عاطفيّة", "نشيطة", "متعبة"];
const MOOD_POSTPARTUM = ["مبتهجة", "قلقة", "مُثقَلة", "محرومة من النوم", "تترابط جيّداً", "متعثّرة", "مُنهَكة", "ممتنّة"];
const MOOD_MENO = ["ضبابيّة", "تقلّبات مزاج", "قلقة", "هادئة", "متوتّرة", "متفائلة", "هبّات حرارة", "مضطربة"];

const SLEEP_OPTS = ["سيّئ جدّاً", "ضعيف", "عاديّ", "جيّد", "ممتاز"];
const WORKOUT_OPTS = ["ابدئي الآن", "لاحقاً", "راحة اليوم"];

// ========== A — حالات الدورة الأساسيّة ==========
const A1_menstrual: CheckinFlow = {
  key: "A1", slug: "menstrual",
  greeting: "الراحة إنتاج ❤️",
  message: "جسمكِ يعمل بجدّ الآن — حتّى وأنتِ ترتاحين. لا شيء يستحقّ القفز فوقه اليوم.",
  affirmation: "الراحة ليست كسلاً — هي حكمة.",
  bodyIQReward: 12, color: "var(--phase-menstrual)", variant: "warm",
  steps: [
    { type: "single", label: "كيف تشعرين اليوم؟", options: MOOD_MENSTRUAL },
    { type: "single", label: "كيف هو النزيف؟", options: ["نزّاز خفيف", "خفيف", "متوسّط", "غزير", "غزير جدّاً"] },
    { type: "scale",  label: "مستوى التشنّج / الألم", hint: "من ١ (لا شيء) إلى ٥ (شديد)" },
    { type: "multi",  label: "هل تلاحظين أيّاً من هذه؟", options: ["انتفاخ", "صداع", "ألم ظهر", "حسّاسيّة الصدر", "غثيان", "حبوب", "إرهاق", "قشعريرة"] },
    { type: "single", label: "تمرينك لليوم", hint: "اقتراح: حركة لطيفة أو راحة", options: WORKOUT_OPTS },
  ],
};

const A2_follicular: CheckinFlow = {
  key: "A2", slug: "follicular",
  greeting: "قوّتكِ تبني 🌱",
  message: "هذه المرحلة صُنعت للزخم. طاقتكِ ترتفع — كيف توجّهينها؟",
  affirmation: "كلّ يوم جديد يحمل طاقة جديدة.",
  bodyIQReward: 12, color: "var(--phase-follicular)", variant: "energetic",
  steps: [
    { type: "single", label: "كيف تشعرين اليوم؟", options: MOOD_FOLLICULAR },
    { type: "scale",  label: "مستوى الطاقة اليوم؟", hint: "١ منخفض جدّاً → ٥ مرتفع جدّاً" },
    { type: "single", label: "كيف كان نومكِ؟", options: SLEEP_OPTS },
    { type: "single", label: "تمرينك لليوم", hint: "اقتراح: قوّة أو كارديو", options: WORKOUT_OPTS },
  ],
};

const A3_ovulation: CheckinFlow = {
  key: "A3", slug: "ovulation",
  greeting: "نافذة الأداء الذروة ✨",
  message: "أنتِ في ذروتكِ. قدراتكِ في أعلى مستوياتها — تحدّي نفسكِ!",
  affirmation: "أنتِ في قمّة قوّتكِ — تألّقي.",
  bodyIQReward: 15, color: "var(--phase-ovulation)", variant: "energetic",
  steps: [
    { type: "single", label: "كيف تشعرين اليوم؟", options: MOOD_OVULATION },
    { type: "scale",  label: "مستوى الطاقة اليوم؟" },
    { type: "single", label: "كيف كان نومكِ؟", options: SLEEP_OPTS },
    { type: "multi",  label: "أيّ إشارات جسديّة؟ (اختياري)", options: ["تشنّج خفيف", "إفرازات", "تغيّرات الصدر"] },
    { type: "single", label: "تمرينك لليوم", hint: "اقتراح: HIIT أو تحدٍّ جديد", options: ["ابدئي الآن", "لاحقاً", "تخطّي اليوم"] },
  ],
};

const A4_lutealEarly: CheckinFlow = {
  key: "A4", slug: "luteal-early",
  greeting: "أكرمي التحوّل 🌙",
  message: "جسمكِ يتحوّل. استمعي إليه — لا تدفعي إن شعرتِ بثقل. كلّ شعور صالح.",
  affirmation: "في كلّ تحوّل حكمة — ثقي بجسمكِ.",
  bodyIQReward: 12, color: "var(--phase-luteal)", variant: "calm",
  steps: [
    { type: "single", label: "كيف تشعرين اليوم؟", options: MOOD_LUTEAL_EARLY },
    { type: "scale",  label: "مستوى الطاقة اليوم؟" },
    { type: "single", label: "هل لديكِ نزوات اليوم؟", hint: "النزوات رسائل — لا ذنب", options: ["مالح", "حلو", "كلاهما", "لا شيء"] },
    { type: "single", label: "تمرينك لليوم", hint: "اقتراح: قوّة معتدلة أو يوغا", options: WORKOUT_OPTS },
  ],
};

const A5_lutealLate: CheckinFlow = {
  key: "A5", slug: "luteal-late",
  greeting: "جسمكِ يستعدّ 💜",
  message: "متلازمة ما قبل الدورة قد تكون صعبة. لا حكم اليوم — استمعي لما يحتاجه جسمكِ. أنا معكِ.",
  affirmation: "جسمكِ يستعدّ لشيء جديد — هذا قوّة.",
  bodyIQReward: 12, color: "var(--phase-luteal)", variant: "calm",
  steps: [
    { type: "single", label: "كيف تشعرين اليوم؟", options: MOOD_LUTEAL_LATE },
    { type: "multi",  label: "هل تلاحظين أيّاً من هذه؟", options: ["انتفاخ", "تشنّج", "صداع", "حسّاسيّة الصدر", "اضطراب نوم", "ضبابيّة ذهن", "حبوب", "تغيّر شهيّة"] },
    { type: "scale",  label: "مستوى الألم اليوم؟", hint: "١ (لا شيء) → ٥ (شديد)" },
    { type: "single", label: "تمرينك لليوم", hint: "اقتراح: حركة لطيفة أو راحة", options: ["ابدئي الآن", "لاحقاً", "تخطّي اليوم"] },
  ],
};

// ========== B — حالات استثنائيّة للدورة ==========
const B1_newUser: CheckinFlow = {
  key: "B1", slug: "new-user",
  greeting: "رحلتكِ تبدأ هنا 🌸",
  message: "أهلاً بكِ! أنا شيلا. لا إجابة خاطئة هنا — فقط ابدئي من حيث أنتِ.",
  affirmation: "كلّ رحلة عظيمة تبدأ بخطوة.",
  bodyIQReward: 10, color: "var(--primary)", variant: "default",
  steps: [
    { type: "info",   label: "لنتعرّف على دورتكِ أوّلاً", hint: "أنا شيلا — مرافقتكِ في رحلة العافية. خذي وقتكِ." },
    { type: "info",   label: "متى بدأت آخر دورة شهريّة؟", hint: "يمكنكِ تخطّي السؤال لاحقاً من إعدادات الدورة." },
    { type: "single", label: "كيف تشعرين اليوم؟", options: MOOD_GENERAL },
  ],
};

const B2_returning: CheckinFlow = {
  key: "B2", slug: "returning",
  greeting: "مرحباً بعودتكِ 💜 اشتقنا إليكِ",
  message: "العودة تستحقّ — أيّاً كان شكلها. لن نذهب لأيّ مكان.",
  affirmation: "العودة وحدها إنجاز — أنتِ هنا، وهذا يكفي.",
  bodyIQReward: 10, color: "var(--phase-luteal)", variant: "calm",
  steps: [
    { type: "single", label: "هل جاءت دورتكِ أثناء غيابكِ؟", options: ["نعم", "لا", "لستُ متأكّدة"] },
    { type: "single", label: "كيف حالكِ الآن؟", options: MOOD_GENERAL },
    { type: "scale",  label: "مستوى الطاقة اليوم؟" },
  ],
};

const B3_irregular: CheckinFlow = {
  key: "B3", slug: "irregular",
  greeting: "جسمكِ له إيقاعه الخاص 🌊",
  message: "جسمكِ يتكلّم دائماً — نحن هنا فقط للإصغاء بدون افتراضات.",
  affirmation: "جسمكِ حكيم — ثقي بإيقاعه.",
  bodyIQReward: 10, color: "var(--primary-glow)", variant: "default",
  steps: [
    { type: "single", label: "هل كان هناك أيّ نزيف منذ آخر مرّة؟", options: ["نعم", "لا", "نزّاز خفيف"] },
    { type: "single", label: "كيف تشعرين الآن؟", options: MOOD_GENERAL },
    { type: "scale",  label: "مستوى الطاقة اليوم؟" },
  ],
};

const B4_contraception: CheckinFlow = {
  key: "B4", slug: "contraception",
  greeting: "صحّتكِ، بشروطكِ ✨",
  message: "طاقتكِ هي دليلنا اليوم. لا افتراضات حول المراحل — فقط أنتِ.",
  affirmation: "صحّتكِ رحلتكِ الخاصّة — لا مقارنات.",
  bodyIQReward: 10, color: "var(--primary)", variant: "default",
  steps: [
    { type: "single", label: "كيف حالكِ اليوم؟", options: MOOD_GENERAL },
    { type: "scale",  label: "مستوى طاقتكِ؟" },
    { type: "single", label: "كيف كان نومكِ؟", options: SLEEP_OPTS },
    { type: "single", label: "تمرينك لليوم", hint: "اقتراح حسب طاقتكِ فقط", options: WORKOUT_OPTS },
  ],
};

const B5_midBleed: CheckinFlow = {
  key: "B5", slug: "mid-bleed",
  greeting: "لاحظنا شيئاً 🌸",
  message: "أيّ إجابة لا بأس بها — فقط أخبرينا. جسمكِ يتكلّم ونحن نُصغي.",
  affirmation: "جسمكِ يتكلّم — أنا أُصغي.",
  bodyIQReward: 10, color: "var(--phase-menstrual)", variant: "warm",
  steps: [
    { type: "single", label: "هل هذا بداية دورتكِ؟", options: ["نعم، بدأت دورتي", "لا، نزّاز خفيف فقط"] },
    { type: "single", label: "كيف تشعرين الآن؟", options: MOOD_GENERAL },
  ],
};

const B6_latePeriod: CheckinFlow = {
  key: "B6", slug: "late-period",
  greeting: "دورتكِ تبدو متأخّرة 🌙",
  message: "أنا معكِ — لنُسجّل بهدوء. مهما يحدث لاحقاً، نحن هنا.",
  affirmation: "جسمكِ على وقته الخاصّ — وأنا معكِ في كلّ خطوة.",
  bodyIQReward: 10, color: "var(--phase-luteal)", variant: "calm",
  steps: [
    { type: "single", label: "هل كان هناك أيّ نزيف أو بقع؟", options: ["نعم، نزيف", "نزّاز خفيف", "لا شيء"] },
    { type: "info",   label: "هل تحتاجين معلومات؟", hint: "نقترح إجراء فحص + استشارة طبيبتكِ إن لزم. لا نُقدّم نصائح طبيّة." },
    { type: "single", label: "كيف تشعرين في هذه الفترة؟", options: MOOD_GENERAL },
  ],
};

const B7_amenorrhea: CheckinFlow = {
  key: "B7", slug: "amenorrhea",
  greeting: "نحن نهتمّ بكِ دائماً 💜",
  message: "جسمكِ يتكلّم وأنا أُصغي. لنطمئنّ بهدوء — لا ضغط، لا قلق.",
  affirmation: "الاعتناء بنفسكِ شجاعة — نحن هنا.",
  bodyIQReward: 10, color: "var(--primary)", variant: "calm",
  steps: [
    { type: "info",   label: "لم نُسجّل دورة منذ أكثر من ٩٠ يوماً", hint: "لا داعي للقلق — مجرّد اطمئنان. اقتراح لطيف باستشارة الطبيبة عند الحاجة." },
    { type: "single", label: "ما الذي يصف وضعكِ؟", options: ["تسجيل دورتي", "هذا متعمّد (رياضيّة / حالة طبيّة)", "لديّ حالة طبيّة"] },
    { type: "single", label: "كيف تشعرين جسديّاً ونفسيّاً؟", options: MOOD_GENERAL },
    { type: "scale",  label: "مستوى الطاقة؟" },
  ],
};

// ========== C — مراحل الحياة ==========
const C1_pregnancyT1: CheckinFlow = {
  key: "C1", slug: "pregnancy-t1",
  greeting: "تنمين شيئاً رائعاً ❤️",
  message: "أنتِ تعملين أكثر ممّا تتخيّلين — حتّى وأنتِ نائمة. كلّ لحظة تبنين فيها حياة.",
  affirmation: "تحملين حياة — لا شيء أعظم.",
  bodyIQReward: 10, color: "var(--primary-glow)", variant: "warm",
  alert: "إن اخترتِ «نزّاز خفيف» — تواصلي مع طبيبتكِ اليوم، لا تنتظري.",
  steps: [
    { type: "single", label: "كيف هو غثيان الصباح؟", options: ["لا شيء", "خفيف", "متوسّط", "شديد"] },
    { type: "scale",  label: "مستوى الطاقة اليوم؟" },
    { type: "multi",  label: "كيف يشعر جسمكِ اليوم؟", options: ["إرهاق", "غثيان", "ألم صدر", "انتفاخ", "صداع", "⚠️ نزّاز خفيف"], alertOptions: ["⚠️ نزّاز خفيف"] },
    { type: "single", label: "تمرينك لليوم", hint: "آمن للحمل: مشي، يوغا لطيفة، سباحة", options: ["ابدئي الآن", "لاحقاً", "تخطّي اليوم"] },
  ],
};

const C2_pregnancyT2: CheckinFlow = {
  key: "C2", slug: "pregnancy-t2",
  greeting: "أنتِ تتألّقين ✨",
  message: "الثلث الثاني يحمل تحوّلات جميلة. تحرّكي بثقة — جسمكِ قويّ.",
  affirmation: "في داخلكِ معجزة — أكرميها.",
  bodyIQReward: 12, color: "var(--phase-ovulation)", variant: "energetic",
  steps: [
    { type: "single", label: "كيف تشعرين اليوم؟", options: MOOD_PREGNANCY },
    { type: "scale",  label: "مستوى الطاقة؟" },
    { type: "multi",  label: "هل تلاحظين أيّاً من هذه؟", options: ["ألم ظهر", "ألم رباط مدوّر", "انقباضات براكستون هكس", "حرقة معدة", "تورّم كاحلين"] },
    { type: "single", label: "هل شعرتِ بحركة الطفل اليوم؟", options: ["نعم 💕", "ليس بعد", "لستُ متأكّدة"] },
    { type: "single", label: "تمرينك لليوم", hint: "قوّة معدّلة / يوغا حمل — بدون استلقاء على الظهر", options: ["ابدئي الآن", "لاحقاً", "تخطّي اليوم"] },
  ],
};

const C3_pregnancyT3: CheckinFlow = {
  key: "C3", slug: "pregnancy-t3",
  greeting: "خطّ النهاية قريب — جسمكِ رائع 🤍",
  message: "أنتِ على أعتاب شيء لا يُوصف. الراحة استعداد — ليست كسلاً.",
  affirmation: "أنتِ على أعتاب شيء لا يُوصف.",
  bodyIQReward: 12, color: "var(--primary-glow)", variant: "calm",
  steps: [
    { type: "scale",  label: "مستوى الطاقة اليوم؟" },
    { type: "multi",  label: "كيف يشعر جسمكِ هذه الأيّام؟", options: ["ضغط حوضي", "صعوبة نوم", "براكستون هكس", "حرقة معدة", "تورّم"] },
    { type: "single", label: "هل شعرتِ بحركات الطفل اليوم؟", hint: "إن كانت أقلّ من المعتاد — راقبي بهدوء", options: ["نعم 💕", "أقلّ من المعتاد", "لا"] },
    { type: "single", label: "تمرينك لليوم", hint: "مشي / تمدّد جالس / تنفّس فقط", options: ["ابدئي الآن", "لاحقاً", "تخطّي اليوم"] },
  ],
};

const C4_postpartumEarly: CheckinFlow = {
  key: "C4", slug: "postpartum-early",
  greeting: "الراحة والتعافي هي تمرينكِ اليوم 🤍",
  message: "النفاس يحمل مشاعر كثيرة — كلّها صالحة. أنجزتِ شيئاً عظيماً. امنحي نفسكِ وقتاً.",
  affirmation: "أنجزتِ شيئاً عظيماً — امنحي نفسكِ وقتاً.",
  bodyIQReward: 12, color: "var(--phase-luteal)", variant: "calm",
  alert: "إن استمرّ شعور «مُثقَلة» أو «متبلّدة» ٣ أيّام متتالية — لستِ وحدكِ، تحدّثي مع شخص تثقين به.",
  steps: [
    { type: "single", label: "كيف تشعرين اليوم؟", options: MOOD_POSTPARTUM, alertOptions: ["مُثقَلة", "متبلّدة"] },
    { type: "single", label: "كيف هو نزيف النفاس؟", options: ["خفيف", "متوسّط", "غزير", "توقّف"] },
    { type: "scale",  label: "مستوى الألم اليوم؟", hint: "١ (لا شيء) → ٥ (شديد)" },
    { type: "single", label: "طريقة الإطعام؟", hint: "أيّ طريقة هي حبّ — لا أحكام", options: ["رضاعة طبيعيّة", "حليب صناعيّ", "كلاهما"] },
  ],
};

const C5_postpartum6w: CheckinFlow = {
  key: "C5", slug: "postpartum-6w",
  greeting: "وقت فحص الأسبوع السادس! 🎉",
  message: "أنتِ نجحتِ. أيّاً كان شعوركِ اليوم — وصلتِ للأسبوع السادس.",
  affirmation: "نجحتِ — هذا إنجاز لا يُنسى.",
  bodyIQReward: 14, color: "var(--phase-ovulation)", variant: "energetic",
  steps: [
    { type: "info",   label: "تذكّري أن تسألي طبيبتكِ", hint: "هل أنتِ مؤهَّلة للتمارين؟ كيف قاع الحوض؟ هل التأم الجرح؟" },
    { type: "single", label: "ما نتيجة فحصكِ؟", options: ["مؤهَّلة! ✅", "غير مؤهَّلة بعد", "ذكّريني بعد أسبوع"] },
    { type: "single", label: "كيف حالكِ بشكل عامّ؟", options: MOOD_POSTPARTUM },
  ],
};

const C6_csection: CheckinFlow = {
  key: "C6", slug: "csection",
  greeting: "تعافيكِ هو أولويّتنا 💜",
  message: "جسمكِ مرّ بشيء كبير. امنحيه كلّ الوقت واللطف الذي يحتاجه.",
  affirmation: "جسمكِ أنجز أمراً استثنائيّاً — امنحيه حبّكِ.",
  bodyIQReward: 12, color: "var(--phase-luteal)", variant: "calm",
  alert: "إن اخترتِ «ألم أو قلق» على الجرح — هذا يستحقّ انتباه الطبيبة، لا تنتظري.",
  steps: [
    { type: "single", label: "كيف تشعرين اليوم؟", options: MOOD_POSTPARTUM },
    { type: "single", label: "كيف هو نزيف النفاس؟", options: ["خفيف", "متوسّط", "غزير", "توقّف"] },
    { type: "single", label: "كيف هو الجرح؟", options: ["يلتئم جيّداً", "بعض الانزعاج", "⚠️ ألم أو قلق"], alertOptions: ["⚠️ ألم أو قلق"] },
    { type: "scale",  label: "مستوى الألم العامّ اليوم؟", hint: "لا تمارين أساسيّة قبل تأهيل الطبيبة" },
  ],
};

const C7_adopted: CheckinFlow = {
  key: "C7", slug: "adopted",
  greeting: "الأمومة هي الأمومة، بأيّ طريقة جاءت 🤍",
  message: "أنتِ أمّ. حبّكِ هو ما يصنع الأمومة — وأنتِ تُعطينه بكلّ قلبكِ.",
  affirmation: "حبّكِ هو ما يصنع الأمومة — وأنتِ تُعطينه بكلّ قلبكِ.",
  bodyIQReward: 12, color: "var(--phase-follicular)", variant: "warm",
  steps: [
    { type: "single", label: "كيف تشعرين اليوم؟", options: MOOD_POSTPARTUM },
    { type: "scale",  label: "مستوى الطاقة؟" },
    { type: "single", label: "كيف كان نومكِ؟", options: SLEEP_OPTS },
    { type: "single", label: "تمرينك لليوم", hint: "تمارين مرنة وصديقة للأمّ الجديدة — متاحة من اليوم الأوّل", options: WORKOUT_OPTS },
  ],
};

const C8_perimenopause: CheckinFlow = {
  key: "C8", slug: "perimenopause",
  greeting: "أنتِ لا تتفكّكين — أنتِ في مرحلة تحوّل 🌿",
  message: "لستِ وحدكِ في هذا التحوّل — ملايين النساء معكِ. القوّة هي أفضل استثمار.",
  affirmation: "لستِ وحدكِ في هذا التحوّل — ملايين النساء معكِ.",
  bodyIQReward: 12, color: "var(--phase-luteal)", variant: "calm",
  steps: [
    { type: "single", label: "كيف تشعرين اليوم؟", options: MOOD_MENO },
    { type: "scale",  label: "مستوى الطاقة اليوم؟", hint: "قد يتغيّر يوم بيوم — هذا طبيعيّ" },
    { type: "single", label: "كيف كان نومكِ؟", options: SLEEP_OPTS },
    { type: "multi",  label: "ما الأعراض التي تلاحظينها؟", options: ["هبّات حرارة", "تعرّق ليلي", "ضبابيّة ذهن", "ألم مفاصل", "جفاف جلد", "اضطراب نوم", "تغيّر وزن", "انخفاض رغبة"] },
    { type: "single", label: "تمرينك لليوم", hint: "تدريب قوّة (لكثافة العظام) — لا HIIT في الأيّام منخفضة الطاقة", options: WORKOUT_OPTS },
  ],
};

const C9_menopause: CheckinFlow = {
  key: "C9", slug: "menopause",
  greeting: "هذا الفصل ينتمي لكِ ✨",
  message: "هذا فصل جديد من القوّة والحرّيّة. جسمكِ يستمرّ في التطوّر — استثمري فيه.",
  affirmation: "هذا فصل جديد من القوّة والحرّيّة — احتضنيه.",
  bodyIQReward: 12, color: "var(--phase-ovulation)", variant: "energetic",
  steps: [
    { type: "single", label: "كيف حالكِ اليوم؟", options: MOOD_MENO },
    { type: "scale",  label: "مستوى الطاقة اليوم؟" },
    { type: "single", label: "كيف كان نومكِ؟", options: SLEEP_OPTS },
    { type: "multi",  label: "هل تلاحظين أيّاً من هذه؟", options: ["هبّات حرارة", "تعرّق ليلي", "ضبابيّة ذهن", "ألم مفاصل", "جفاف جلد", "اضطراب نوم", "تغيّر وزن", "انخفاض رغبة"] },
    { type: "single", label: "تمرينك لليوم", hint: "قوّة، مرونة، تركيز على كثافة العظام", options: WORKOUT_OPTS },
  ],
};

// ========== D — حالات ثقافيّة ودينيّة ==========
const D1_ramadan: CheckinFlow = {
  key: "D1", slug: "ramadan",
  greeting: "مرحباً في رمضان 🌙",
  message: "صومكِ عبادة وصبركِ قوّة. رمضان كريم.",
  affirmation: "صومكِ عبادة وصبركِ قوّة — رمضان كريم.",
  bodyIQReward: 10, color: "var(--phase-luteal)", variant: "calm",
  steps: [
    { type: "single", label: "هل التسجيل قبل أم بعد الإفطار؟", options: ["قبل الإفطار", "بعد الإفطار"] },
    { type: "single", label: "كيف حالكِ في هذا اليوم المبارك؟", options: MOOD_GENERAL },
    { type: "scale",  label: "مستوى الطاقة اليوم؟", hint: "الصوم يؤثّر على الطاقة — هذا طبيعيّ" },
    { type: "single", label: "تمرينك لليوم", hint: "نافذة بعد الإفطار أو قبل السحور فقط", options: ["ابدئي الآن", "راحة اليوم"] },
  ],
};

const D2_ramadanRest: CheckinFlow = {
  key: "D2", slug: "ramadan-rest",
  greeting: "الراحة في رمضان عبادة أيضاً 💜",
  message: "لا ذنب، لا تأثير على الستريك. الراحة شكل من أشكال العبادة اليوم.",
  affirmation: "حتّى التوقّف حكمة في رمضان.",
  bodyIQReward: 8, color: "var(--phase-luteal)", variant: "calm",
  steps: [
    { type: "single", label: "كيف حالكِ اليوم؟", options: MOOD_GENERAL },
    { type: "scale",  label: "مستوى الطاقة؟", hint: "لا ضغط — خذي ما تحتاجين" },
    { type: "text",   label: "هل هناك شيء تريدين إخبار شيلا به؟", hint: "ملاحظة اختياريّة — لا حدّ أدنى" },
  ],
};

const D3_eid: CheckinFlow = {
  key: "D3", slug: "eid",
  greeting: "عيد مبارك! اليوم للاحتفال 🎉",
  message: "اليوم للفرح والعائلة والامتنان. التمرين في إجازة تلقائيّة!",
  affirmation: "كلّ عيد تذكير بالنِّعَم — تذوّقيها.",
  bodyIQReward: 8, color: "var(--phase-ovulation)", variant: "energetic",
  steps: [
    { type: "info",   label: "اليوم للفرح والعائلة", hint: "يوم راحة تلقائيّ — لا تمارين اليوم." },
    { type: "single", label: "كيف حالكِ في هذا اليوم المميّز؟", options: MOOD_GENERAL },
  ],
};

// ========== E — تتبّع التمارين ==========
const E1_workoutDone: CheckinFlow = {
  key: "E1", slug: "workout-done",
  greeting: "أنجزتِ التمرين! 🔥",
  message: "كلّ تمرين استثمار في نفسكِ. إجابتكِ تساعدني على تخصيص الغد لكِ.",
  affirmation: "كلّ تمرين استثمار في نفسكِ — أنتِ مذهلة.",
  bodyIQReward: 18, color: "var(--phase-ovulation)", variant: "energetic",
  steps: [
    { type: "single", label: "كيف كان شعوركِ أثناء التمرين؟", options: ["🔥 رائع، أريد المزيد", "🙂 مناسب", "😟 صعب", "😵 أكثر من اللازم"] },
  ],
};

const E2_workoutOutside: CheckinFlow = {
  key: "E2", slug: "workout-outside",
  greeting: "هل تحرّكتِ اليوم؟ 💪",
  message: "أيّ حركة تحتسب — داخل التطبيق أو خارجه. شيلا تحتفل دون أن تشترط الاكتمال داخل التطبيق.",
  affirmation: "كلّ خطوة تحتسب — أنتِ تتقدّمين دائماً.",
  bodyIQReward: 12, color: "var(--phase-follicular)", variant: "energetic",
  steps: [
    { type: "single", label: "ماذا فعلتِ؟", options: ["جيم", "مشي", "يوتيوب", "تمرين منزلي", "رياضة", "سباحة", "يوغا", "أخرى"] },
    { type: "single", label: "مستوى الجهد؟", options: ["خفيف", "متوسّط", "شديد"] },
  ],
};

const E3_workoutSkipped: CheckinFlow = {
  key: "E3", slug: "workout-skipped",
  greeting: "لا تمرين اليوم — لا بأس تماماً 🤍",
  message: "لا حكم. تمّ تسجيل تخطّيكِ وتعديل خطّتكِ.",
  affirmation: "الراحة قرار — وليست هزيمة.",
  bodyIQReward: 8, color: "var(--phase-luteal)", variant: "calm",
  steps: [
    { type: "single", label: "ما الذي منعكِ اليوم؟", options: ["متعبة جدّاً", "لا وقت", "لا أرغب", "ألم أو انزعاج", "أخرى"] },
    { type: "single", label: "كيف تشعرين بشكل عامّ؟", options: MOOD_GENERAL },
  ],
};

const E4_workoutBreak: CheckinFlow = {
  key: "E4", slug: "workout-break",
  greeting: "نحن هنا ولن نذهب لأيّ مكان 🤍",
  message: "الحياة تحدث — لا نحكم، فقط نهتمّ. كلّ عودة انتصار.",
  affirmation: "كلّ عودة انتصار — وأنتِ ستعودين.",
  bodyIQReward: 10, color: "var(--primary-glow)", variant: "calm",
  steps: [
    { type: "single", label: "ما الذي يحدث؟", options: ["مشغولة", "مريضة", "مسافرة", "حافز منخفض", "صعوبات شخصيّة", "أخرى"] },
    { type: "single", label: "ما الذي يساعدكِ الآن؟", options: ["خطّة معدّلة", "جلسات أقصر", "أسبوع راحة", "تحدّثي معي"] },
  ],
};

const E5_overtraining: CheckinFlow = {
  key: "E5", slug: "overtraining",
  greeting: "جسمكِ يرسل إشارات — هل تستمعين؟",
  message: "الراحة ليست تراجعاً — بل استثمار في قوّتكِ. جسمكِ أذكى منّا.",
  affirmation: "جسمكِ أذكى منّا — استمعي إليه.",
  bodyIQReward: 10, color: "var(--phase-menstrual)", variant: "warm",
  alert: "إن اخترتِ «ألم أو قلق إصابة» — لا تدفعي خلال الألم. ارتاحي اليوم وفكّري بمراجعة مختصّة.",
  steps: [
    { type: "single", label: "كيف يشعر جسمكِ الآن؟", options: ["نشيطة", "متوجّعة لكن بخير", "متعبة جدّاً", "⚠️ ألم أو قلق إصابة"], alertOptions: ["⚠️ ألم أو قلق إصابة"] },
    { type: "scale",  label: "مستوى طاقتكِ الحقيقيّ اليوم؟" },
  ],
};

const E6_firstWorkout: CheckinFlow = {
  key: "E6", slug: "first-workout",
  greeting: "أنتِ أقدمتِ — وهذا كلّ شيء 🌟",
  message: "أهلاً بكِ في رحلتكِ. البداية أصعب خطوة — وقد اتّخذتِها بالفعل.",
  affirmation: "البداية أصعب خطوة — وقد اتّخذتِها.",
  bodyIQReward: 20, color: "var(--phase-follicular)", variant: "energetic",
  steps: [
    { type: "single", label: "هل هناك توتّر أو قيود جسديّة نعرفها؟", options: ["متوتّرة قليلاً", "قيد جسديّ", "أنا جاهزة 💪"] },
    { type: "single", label: "كيف تشعرين قبل هذا التمرين الأوّل؟", options: MOOD_GENERAL },
  ],
};

// ========== F — الصحّة العاطفيّة والنفسيّة ==========
const F1_distress: CheckinFlow = {
  key: "F1", slug: "distress",
  greeting: "نراكِ. كيف حالكِ حقّاً؟ 💜",
  message: "مشاعركِ صالحة وأنتِ لستِ وحدكِ في هذا.",
  affirmation: "مشاعركِ صالحة وأنتِ لستِ وحدكِ.",
  bodyIQReward: 10, color: "var(--primary)", variant: "calm",
  steps: [
    { type: "single", label: "أخبريني كيف تشعرين — لا أحكام هنا أبداً", options: MOOD_GENERAL },
    { type: "single", label: "ماذا تحتاجين الآن؟", options: ["أحتاج دعم", "أنا بخير، يوم صعب فقط"] },
    { type: "scale",  label: "كيف طاقتكِ الجسديّة؟" },
  ],
};

const F2_postnatalDepression: CheckinFlow = {
  key: "F2", slug: "postnatal-depression",
  greeting: "أنتِ لستِ وحدكِ ولستِ أمّاً سيّئة 💜",
  message: "الأمومة صعبة — وطلب المساعدة قوّة، لا ضعف. أنتِ لستِ وحدكِ.",
  affirmation: "الأمومة صعبة — طلب المساعدة قوّة، لا ضعف.",
  bodyIQReward: 12, color: "var(--phase-luteal)", variant: "calm",
  steps: [
    { type: "info",   label: "بعض الأمّهات الجدد يشعرن بهذا", hint: "أكثر شيوعاً ممّا يُقال — أنتِ لستِ وحدكِ. شجّعينا أن تتحدّثي مع شخص تثقين به." },
    { type: "single", label: "ماذا تحتاجين الآن؟", options: ["أخبريني المزيد", "أنا بخير"] },
    { type: "single", label: "كيف حالكِ اليوم؟", options: MOOD_POSTPARTUM },
  ],
};

// ========== فهرس كل الفلوهات ==========
export const allFlows = {
  // A
  menstrual: A1_menstrual,
  follicular: A2_follicular,
  ovulation: A3_ovulation,
  "luteal-early": A4_lutealEarly,
  luteal: A4_lutealEarly, // backward-compat للراوت القديم
  "luteal-late": A5_lutealLate,
  // B
  "new-user": B1_newUser,
  "no-cycle": B1_newUser, // backward-compat
  returning: B2_returning,
  irregular: B3_irregular,
  contraception: B4_contraception,
  "mid-bleed": B5_midBleed,
  "late-period": B6_latePeriod,
  amenorrhea: B7_amenorrhea,
  // C
  "pregnancy-t1": C1_pregnancyT1,
  pregnancy: C1_pregnancyT1, // backward-compat
  "pregnancy-t2": C2_pregnancyT2,
  "pregnancy-t3": C3_pregnancyT3,
  "postpartum-early": C4_postpartumEarly,
  "postpartum-6w": C5_postpartum6w,
  csection: C6_csection,
  adopted: C7_adopted,
  perimenopause: C8_perimenopause,
  menopause: C9_menopause,
  // D
  ramadan: D1_ramadan,
  "ramadan-rest": D2_ramadanRest,
  eid: D3_eid,
  // E
  "workout-done": E1_workoutDone,
  "workout-outside": E2_workoutOutside,
  "workout-skipped": E3_workoutSkipped,
  "workout-break": E4_workoutBreak,
  overtraining: E5_overtraining,
  "first-workout": E6_firstWorkout,
  // F
  distress: F1_distress,
  "postnatal-depression": F2_postnatalDepression,
} satisfies Record<string, CheckinFlow>;

export type FlowSlug = keyof typeof allFlows;

// قائمة منظَّمة للعرض في صفحة فهرس الحالات
export const flowSections: Array<{ id: string; title: string; slugs: FlowSlug[] }> = [
  { id: "A", title: "حالات الدورة الأساسيّة", slugs: ["menstrual", "follicular", "ovulation", "luteal-early", "luteal-late"] },
  { id: "B", title: "حالات استثنائيّة للدورة", slugs: ["new-user", "returning", "irregular", "contraception", "mid-bleed", "late-period", "amenorrhea"] },
  { id: "C", title: "مراحل الحياة", slugs: ["pregnancy-t1", "pregnancy-t2", "pregnancy-t3", "postpartum-early", "postpartum-6w", "csection", "adopted", "perimenopause", "menopause"] },
  { id: "D", title: "ثقافيّة ودينيّة", slugs: ["ramadan", "ramadan-rest", "eid"] },
  { id: "E", title: "تتبّع التمارين", slugs: ["workout-done", "workout-outside", "workout-skipped", "workout-break", "overtraining", "first-workout"] },
  { id: "F", title: "الصحّة العاطفيّة والنفسيّة", slugs: ["distress", "postnatal-depression"] },
];

// إبقاء الاسم القديم للراوتات الموجودة
export const flowsByPhase = allFlows;
export const exceptionFlows = {
  noCycle: B1_newUser,
  pregnancyT1: C1_pregnancyT1,
  ramadan: D1_ramadan,
};
