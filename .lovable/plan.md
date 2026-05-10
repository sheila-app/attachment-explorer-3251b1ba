
# خطة بناء الشاشات والمنطق الناقصة — SHEILA v2

بعد قراءة الملفات المرفقة (SRS v2، Use Cases v2، Check-In Flows، Gamification، Nutrition Spec، Meals Library) قارنّاها بالتطبيق الحالي. يوجد فجوات كبيرة في **التغذية، الـ Check-in، الـ Gamification، Onboarding**. يبقى النموذج أولياً ببيانات وهمية فقط — لا Backend.

---

## المرحلة 1 — توسيع البيانات والمنطق المركزي (`src/data/mock.ts` + `src/lib/`)

1. **توسيع `mockUser`**: `lifeStage` (reproductive / pregnant / postpartum / perimenopause / menopause / senior)، `trimester`، `postpartumWeeks`، `birthControl`، `dietaryPrefs[]`، `displayMacros`، `cyclePhase` بستّ حالات (menstrual / follicular / ovulation / luteal_early / luteal_late)، `bodyIQ`، `bodyIQTier`، `streak`، `streakGrace`، `ramadanMode`.
2. **`gamification.ts`**: ثوابت النقاط والتدهور والتيرز الست، دالة `computeTier(bodyIQ)`، دالّ تدهور (decay) بحسب أيّام الخمول.
3. **`mealsLibrary.ts`**: 30–40 وجبة عيّنة من المكتبة موزّعة على المراحل والوسوم (omnivore/vegan/vegetarian/halal/dairy-free/gluten-free) مع micros + “Why this works”.
4. **`foodDatabase.ts`**: ~60 صنف غذائي مفرد للبحث (اسم/كالوري/ماكرو/Serving/barcode وهمي).
5. **`checkinFlows.ts`**: تعريفات الفلوهات (A1–A4، B1–B3، C1–C7، D1–D2، E1–E3، F1–F2) — كلٌّ بـ greeting، tone، steps[].
6. **`store.ts`** خفيف (Zustand أو Context) لحفظ: Body IQ، streak، nutritionLog يومي، waterLog، checkin records — كلّها بالذاكرة فقط.

---

## المرحلة 2 — إعادة بناء وحدة التغذية (Nutrition)

تطابق مواصفة `SHEILA_nutrition_page_spec.md`.

- **`nutrition.index.tsx`**: Day navigation (سهم/تاريخ/سهم) + شارة الحالة (اليوم/سابق/تخطيط) + Phase chip حيّ + Macro Ring بـ kcal+P+C+F + زر Recipe Library الدائم + 4 بطاقات وجبات + Water Tracker (8 قطرات).
- **`nutrition.ai.$slot.tsx`** — AI Suggestions: 3 بطاقات مرتّبة، Best Match مع “لماذا تنفع لكِ”، CTAs (إضافة/استبدال/إضافة بجانب)، زر Regenerate.
- **`nutrition.add.$slot.tsx`** — Add Sheet (Bottom Sheet) بأربعة خيارات.
- **`nutrition.search.$slot.tsx`** — بحث الطعام: Recent + Suggested for Phase + Serving Sheet ‎بـ Stepper (0.5×).
- **`nutrition.barcode.$slot.tsx`** — صندوق ماسح وهمي → Loading → Result card.
- **`nutrition.scan.$slot.tsx`** — Photograph My Meal: viewfinder وهمي → تحليل ‎1.4s → نتيجة + Confidence.
- **`nutrition.recipes.tsx` (موجود — يُعاد بناؤه)**: شريط بحث + زر Create + 4 مجموعات فلاتر متعدّدة الاختيار + قسمَا SHEILA Recipes / My Recipes.
- **`nutrition.recipes.build.tsx`** — Build a Recipe: حقول + قائمة مكوّنات حيّة + ماكرو يحسب تلقائياً + Save toggle.
- **`nutrition.shopping.tsx` (موجود — يُحسّن)**: قائمة مجمّعة من اللوغ والخطّط مرتّبة بالتصنيف مع تحرير يدوي وExport.
- **منطق Day State**: Today/Past/Planning يُخفي/يُظهر أزرار الكتابة. Past = banner للقراءة فقط.
- **نظام Toast + Undo** عام (Sonner) لكل add/remove/clear.

---

## المرحلة 3 — منظومة الـ Check-in الديناميكية

استبدال `checkin.index.tsx` الحالي بمحرّك يقرأ الفلو من `checkinFlows.ts` بحسب حالة المستخدمة:

- محرّك Step-by-Step موحّد (`CheckinFlowRunner`) يقدّم: Mood Grid، Flow Intensity selector، Pain Scale dots، Symptoms multi-select، Energy slider، Sleep quality، Workout prompt، Body signals، Info Card، Barrier Audit.
- **شاشات الفلوهات (تظهر تلقائياً حسب الحالة):**
  - A1 Menstrual / A2 Follicular / A3 Ovulation / A4 Luteal Early / A5 Luteal Late.
  - B1 No-cycle / B2 Birth-control / B3 Late period.
  - C1–C3 Pregnancy T1/T2/T3 + C4–C6 Postpartum + C7 Adoption + C8 Perimenopause + C9 Menopause.
  - D1 Ramadan fasting / D2 Eid.
  - E1 Completed in-app / E2 Missed / E3 First-ever + E4 External workout.
  - F1 High distress overlay / F2 Postpartum mental flag (warm، non-clinical، روابط مساعدة).
- شاشة ملخّص ‎check-in تعطي Affirmation + +Body IQ.

---

## المرحلة 4 — منظومة Gamification

- **مكوّن `BodyIQCard`** على الرئيسية: العدد، التير، شريط للتير التالي، أيقونة تدهور إن وُجد.
- **شاشة `bodyiq.tsx`**: تفاصيل النقاط، السجلّ، سلسلة من +/– حركة آخر 14 يوم، شرح الـ6 تيرز.
- **مكوّن `PhaseWindow`** على الرئيسية: عدّاد بالأيام/الساعات حسب المرحلة + تقدّم التحدّيات (مثلاً 2/5).
- **شاشة `challenges.phase.tsx`**: تحدّيات المرحلة الحالية فقط، مع نتيجة Window عند انتهائه.
- **`streak.tsx`**: شعلة، grace days menstrual تلقائي، Retroactive Fill (مرّة واحدة)، **The Wager** modal عند day 6.
- **`circle.tsx`** (المجموعة الخاصّة): Leaderboard مباشر بأسماء وهمية (Phase pseudonyms)، إشعارات تجاوز/تجاوزكِ، تحدّي جماعيّ أسبوعي + Accountability Partner.
- **شاشة `achievements.tsx` (محسّنة)**: ثلاث طبقات Micro / Macro / Legacy بتصاميم مختلفة.

---

## المرحلة 5 — استكمال Onboarding ليطابق Use Cases v2

- إضافة الخطوات الناقصة:
  - **Macro display preference** (Display/Hide).
  - **Goal Check-in Frequency** (1/3/6 months / Don't).
  - **Pregnancy / Planning Status** + متابعة (Trimester + Doctor clearance).
  - **Birth Control Status** + ملاحظة تأثير التوقّع.
  - **Cycle Length** (21–45، افتراضي 28).
  - **Location** (Country dropdown + City).
  - **Notifications breakdown** (Email/Push + checkboxes).
- إعادة ترقيم خطوات الـ Onboarding وضبط مؤشّر التقدّم.

---

## المرحلة 6 — تحديثات الرئيسية (Home) والربط

- تطعيم `home.tsx` بـ: BodyIQCard، Streak Flame، PhaseWindow countdown، Today’s Workout card، Daily Check-in CTA يفتح الفلو الصحيح، نسخة AI لاقتراح الوجبة بحسب المرحلة.
- ربط جميع الشاشات في `screens.tsx` و`mock.ts › allScreens`.

---

## ما هو خارج النطاق (يبقى كما هو)
- لا Backend / لا Auth حقيقي / لا AI فعلي / لا Push فعلي.
- Dark mode غير مفعّل.
- يبقى التطبيق عربي RTL.

---

## ملاحظات تقنية
- لن نلمس `routeTree.gen.ts` يدوياً — يُولَّد ذاتياً.
- منطق التدهور والـ Body IQ مُحاكَى بـ‎`useEffect` و‎mockNow مرنة في الذاكرة.
- Toasts عبر `sonner` المتوفّر.
- جميع البيانات الحسّاسة (Past-day write rejection، RLS) موصوفة في تعليقات داخل الكود لكن غير منفذة (لا backend).
- التنفيذ على دفعات؛ بعد كلّ مرحلة سأتحقّق من البناء بصرياً قبل الانتقال للتي تليها.
