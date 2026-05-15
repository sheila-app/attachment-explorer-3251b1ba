
# خطّة بناء SHEILA v2

نسخة كاملة من التطبيق المُعاد تصميمه في مجلّد `sheila-v2` منفصل تماماً عن الشاشات الحاليّة (لا حذف، لا تعديل). نفس نظام التصميم (DeviceFrame، LiquidBackdrop، oklch tokens، Tajawal/Cairo، RTL).

## البنية

```text
src/routes/sheila-v2/
  index.tsx                    ← فهرس كل شاشات v2 (للتصفّح والاختبار)
  home.tsx                     ← الرئيسية (5 بلوكات)
  cycle.index.tsx              ← تاب الدورة (تقويم + توقّعات)
  cycle.phase.$phase.tsx       ← 4 شاشات تعليم المراحل
  pregnancy.tsx                ← رحلة الحمل (تاب 2 بديل)
  postpartum.tsx               ← ما بعد الولادة (تاب 2 بديل)
  health.tsx                   ← صحتي (سن اليأس / حالات هرمونيّة)
  workouts.index.tsx           ← التمارين 3 zones
  workouts.player.tsx          ← Active Session Player (شاشة جديدة)
  workouts.builder.tsx         ← Custom Workout Builder (شيلا)
  nutrition.index.tsx          ← التغذية 4 slots
  nutrition.meal.$id.tsx       ← Meal Detail
  nutrition.log.tsx            ← تسجيل وجبة
  nutrition.photo.tsx          ← Photo Meal ID (محاكاة كاميرا)
  nutrition.recipes.tsx        ← الوصفات + Recipe Builder
  nutrition.shopping.tsx       ← قائمة التسوّق
  circle.index.tsx             ← دائرة شيلا (Feed)
  circle.compose.tsx           ← Post Composer
  circle.groups.tsx            ← المجموعات
  circle.events.tsx            ← الفعاليّات
  circle.accountability.tsx    ← شريك المساءلة + AI matching
  journey.index.tsx            ← رحلتك (3 zones)
  journey.insights.tsx         ← Smart Insights (4 رؤى AI)
  journey.report.$month.tsx    ← التقرير الشهري + رؤى شيلا
  journey.achievements.tsx     ← الإنجازات (6 أعمدة + 5 tiers)
  profile.index.tsx            ← حسابي
  profile.appearance.tsx       ← المظهر (مع ملاحظة قفل ألوان المراحل)
  profile.subscription.tsx
  notifications.tsx            ← من جرس الهيدر
  sheila.chat.tsx              ← شات شيلا العام + كشف الضائقة
  emergency.tsx                ← شاشة الموارد الطارئة

src/components/sheila-v2/
  ShellV2.tsx                  ← هيكل موحّد (هيدر + content + bottom nav + FAB)
  BottomNavV2.tsx              ← 5 تابات (الرئيسية / تاب متكيّف / تمارين / تغذية / رحلتك)
  SheilaFAB.tsx                ← زر شيلا العائم (أسفل-يمين)
  PhasePill.tsx                ← شارة المرحلة (تفتح شاشة تعليم)
  TierBadge.tsx                ← Seedling/Blooming/Sharp/Fluent/Radiant
  StreakArc.tsx                ← قوس Body IQ
  AITypingBubble.tsx           ← محاكاة typing تدريجيّة
  AIGeneratingCard.tsx         ← skeleton shimmer أثناء التوليد
  DailyMessageCard.tsx         ← رسالة الصباح
  MealSlot.tsx                 ← بطاقة وجبة (4 slots)
  WorkoutCard.tsx
  InsightCard.tsx              ← بطاقة رؤية (مع label)
  CommunityShortcut.tsx        ← اختصار دائرة شيلا في الرئيسية
  LifeStageContext.tsx         ← مزوّد سياق مرحلة الحياة (لتبديل تاب 2)

src/data/sheila-v2/
  dailyMessages.ts             ← أمثلة Daily Messages بحسب المرحلة + الطاقة
  smartInsights.ts             ← 4 رؤى أسبوعيّة + 3 شهريّة
  tiers.ts                     ← نظام المستويات الـ 5 + الأعمدة الـ 6
  workoutsLibrary.ts           ← ~30 تمرين عيّنة مصنّفة بالمرحلة
  mealsLibrary.ts              ← ~30 وجبة عيّنة مصنّفة
  communityFeed.ts
  achievementsList.ts
  lifeStages.ts                ← 7 مراحل الحياة + إعدادات تاب 2
```

## محاكاة الذكاء الاصطناعي

`AITypingBubble` يعرض النصّ حرفاً حرفاً (≈25ms/حرف) مع cursor وامض. كل وظائف شيلا (Daily Message، Recipe Builder، Workout Builder، Insights، Photo ID، Free Text Logging، Chat) تستخدم نفس النمط:

1. عرض `AIGeneratingCard` shimmer لـ 800–1500ms
2. ثم `AITypingBubble` يكتب الإجابة من `src/data/sheila-v2/`
3. زر "اقتراح آخر" يُعيد الدورة برسالة مختلفة من نفس الملفّ

## المبادئ المُطبّقة من الملفّين

- **حذف كل أزرار "عودة" السفليّة** — back في الهيدر فقط (←)
- **زر شيلا عائم** أسفل-يمين كل شاشة، وفي تاب المجتمع ينتقل زر النشر لأسفل-يسار
- **ألوان المراحل مقفلة** — ملاحظة صريحة في شاشة المظهر
- **بدون BMI، بدون heart rate في Player، بدون wearables**
- **تاب 2 يتكيّف**: يقرأ `LifeStageContext` ويعرض الشاشة المناسبة (الدورة / الحمل / النفاس / صحتي)
- **عربيّة فقط، RTL، logical properties (ms-/me-/ps-/pe-)**
- **Body IQ events** كـ toasts عبر `sonner`
- **Tier visuals**: Seedling مسطّح → Radiant مع sparkles + gyroscope tilt (يُحاكى بـ mouse position)

## شاشة /sheila-v2 (الفهرس)

شبكة بطاقات بكل الشاشات الـ 30 مجمّعة حسب القسم (الرئيسيّة، الدورة، التمارين، التغذية، المجتمع، الرحلة، الحساب، الذكاء الاصطناعي) — لتسهيل التصفّح والمراجعة.

## ما لن يُلمس

- أي ملفّ في `src/routes/` خارج `sheila-v2/`
- `src/components/sheila/` (يبقى كما هو)
- `src/data/mock.ts` و البيانات الحاليّة
- `BottomNav` الحاليّ، `OnboardingShell`، `FeatureShell`

## ترتيب التنفيذ

1. البنية التحتيّة: `ShellV2` + `BottomNavV2` + `SheilaFAB` + `LifeStageContext` + بيانات mock
2. مكوّنات AI المشتركة: `AITypingBubble` + `AIGeneratingCard`
3. الشاشات الأساسيّة: home → cycle → workouts (+ player + builder) → nutrition (+ recipes + builder + photo)
4. المجتمع + Accountability + AI matching
5. رحلتك + Smart Insights + التقارير + الإنجازات (5 tiers)
6. حسابي + المظهر + الإشعارات + شات شيلا + Emergency
7. شاشة الفهرس `/sheila-v2`

النتيجة: نسخة v2 كاملة قابلة للتصفّح من `/sheila-v2`، التطبيق الحاليّ يعمل دون أي تغيير.
