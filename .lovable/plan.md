# خطّة التكامل — SHEILA v2

الهدف: تحويل شاشات `/sheila-v2/*` من شاشات منفصلة إلى تطبيق متكامل، حيث كل إجراء يُحدث تأثيراً مرئياً في الشاشات الأخرى (الرئيسيّة، رحلتك، الإشعارات، Body IQ).

---

## 1) طبقة الحالة المشتركة (SheilaV2Store)

ملف جديد: `src/components/sheila-v2/SheilaV2Store.tsx`

`Context + useReducer` يحفظ الحالة في `localStorage` (مفتاح `sheila-v2-state`)، يلفّ جميع شاشات v2 من خلال `ShellV2`.

الحقول:
- `waterCups`, `caloriesToday`, `proteinToday`
- `loggedMeals: { mealId, type, at }[]`
- `completedWorkouts: { workoutId, at, durationActual }[]`
- `bodyIQ`, `streak`, `lastActiveDate`
- `unlockedAchievements: string[]`
- `feedPosts: Post[]` (يضمّ المنشورات المنشورة حديثاً فوق `FEED`)
- `partnerMatched: string | null`
- `notifications: Notification[]` (مع `unread`)
- `lifeStage` (يُنقل من LifeStageContext)

أحداث (actions):
- `logMeal`, `removeMeal`, `addWater`, `completeWorkout`, `unlockAchievement`,
  `publishPost`, `matchPartner`, `markNotificationRead`, `setLifeStage`.

كل حدث يُحدّث Body IQ ويُنشئ إشعاراً مناسباً (مثلاً «+15 Body IQ — أكملتِ تمرين القوّة»).

> ملاحظة: لا backend — كله mock في الذاكرة + localStorage.

---

## 2) تدفّقات الربط بين الشاشات

### أ — تدفّق التمرين
1. `home` → بطاقة «خطّة اليوم» تعرض تمرين مقترح من `WORKOUTS` حسب المرحلة.  
2. الضغط → `workouts` (يُبرز الموصى به) → `workouts/player` مع `?id=`.  
3. عند إنهاء المؤقّت → `completeWorkout(id)` → +25 Body IQ، إشعار، فتح إنجاز إن استحقّ، ثم العودة إلى `home`.  
4. `journey/insights` يقرأ `completedWorkouts` لاحتساب «أفضل أيّامك».

### ب — تدفّق التغذية
1. `home` → بطاقة الوجبة → `nutrition/meal/$id` فيها زرّ «سجّلي هذه الوجبة» → `logMeal` → +10 Body IQ.  
2. `nutrition` يعرض السعرات/البروتين الفعليّة من المتجر بدل القيم الثابتة في `userV2`.  
3. `nutrition/photo`: بعد «التعرّف» (محاكاة AI) → اقتراح وجبة من `MEALS` → زرّ تسجيل.  
4. `nutrition/recipes` (Builder): إنشاء وصفة → زرّ «أضيفيها لخطّة اليوم» → تظهر في `home`.  
5. `nutrition/shopping`: مولّدة من الوجبات المسجّلة + المقترحة.  
6. أزرار الماء (+1 كأس) في `home` و `nutrition` → `addWater`.

### ج — تدفّق الدورة والمراحل
1. `cycle` يبقى مصدر phase. تغيير المرحلة (للتجربة) عبر `cycle/phase/$phase` → زرّ «اعتمدي هذه المرحلة» → `setPhase` → كل بطاقات `home/workouts/nutrition` تتحدّث.  
2. تبديل `lifeStage` من `profile` → يُغيّر التاب الثاني في `BottomNavV2` فعليّاً (نقل LifeStage إلى المتجر).

### د — تدفّق الدائرة (Circle)
1. `circle/compose` → نص + فئة → `publishPost` → يظهر فوريّاً أعلى `circle` Feed.  
2. `circle/groups` → الانضمام لمجموعة يُولّد إشعاراً ويزيد Body IQ.  
3. `circle/accountability` → بعد «المطابقة» AI، اختيار شريك → `matchPartner` → يظهر الشريك في `home` (Shortcut «شريك» يعرض الاسم + Streak).

### هـ — تدفّق رحلتك
1. `journey` → بطاقات حيّة من المتجر: عدد التمارين، السلسلة، Body IQ، آخر إنجاز.  
2. `journey/achievements` → يدمج `ACHIEVEMENTS` مع `unlockedAchievements` من المتجر.  
3. `journey/insights` → الرؤى تُولَّد ديناميكيّاً (مثلاً: «أفضل تمارينك في مرحلة الإباضة» مبني على `completedWorkouts`).  
4. `journey/report` → ملخّص الشهر الفعلي + زرّ «شاركيها في الدائرة» → `publishPost`.

### و — شات شيلا
- اكتشاف نيّة الإجراء: «اقترحي وصفة» → ردّ + زرّ Action ينقل إلى `nutrition/meal/$id`.  
- «ابدئي تمرين» → زرّ ينقل مباشرة إلى `workouts/player?id=…`.  
- «أضيفي كأس ماء» → ينفّذ `addWater` ثم يؤكّد.  
- موارد الطوارئ: زرّ في الردّ عند `distress=true` ينقل إلى `emergency`.

### ز — الإشعارات
- `notifications` تقرأ من المتجر (وليس ثابتة). كل إجراء يضيف إشعاراً.  
- جرس الهيدر يعرض Badge بعدد `unread`.

---

## 3) تحسينات التنقل

- في `__root` أو `routes/index.tsx` (الجذر القديم): إضافة Banner صغير «جرّبي SHEILA v2» يفتح `/sheila-v2/home` (بدون استبدال).  
- داخل v2: زرّ صغير في `profile` للعودة إلى النسخة الكلاسيكيّة.  
- `index.tsx` (gallery) يبقى كأداة تطوير لكن نضيف زرّ «ابدئي v2 الآن» يفتح `home` ويُهيئ بيانات تجريبيّة.

---

## 4) الملفّات المتأثّرة

### جديدة
- `src/components/sheila-v2/SheilaV2Store.tsx` — Context + reducer + persist.
- `src/components/sheila-v2/ActionChip.tsx` — أزرار إجراء داخل ردود شيلا.

### معدّلة
- `src/components/sheila-v2/ShellV2.tsx` — يلفّ `SheilaV2Provider`، Badge الإشعارات.
- `src/components/sheila-v2/BottomNavV2.tsx` — يقرأ `lifeStage` من المتجر.
- `src/components/sheila-v2/LifeStageContext.tsx` — يصبح Wrapper رفيع فوق المتجر.
- شاشات: `home.tsx`, `workouts.tsx`, `workouts_.player.tsx`, `workouts_.builder.tsx`, `nutrition.tsx`, `nutrition_.meal.$id.tsx`, `nutrition_.photo.tsx`, `nutrition_.recipes.tsx`, `nutrition_.shopping.tsx`, `nutrition_.log.tsx`, `cycle.tsx`, `cycle_.phase.$phase.tsx`, `circle.tsx`, `circle_.compose.tsx`, `circle_.groups.tsx`, `circle_.accountability.tsx`, `journey.tsx`, `journey_.insights.tsx`, `journey_.achievements.tsx`, `journey_.report.tsx`, `notifications.tsx`, `sheila.tsx`, `profile.tsx`.

### غير ممسوسة
- `src/data/sheila-v2/index.ts` (يبقى كمصدر حقائق ثابت).  
- النسخة القديمة `/onboarding/*` و `src/routes/home.tsx` لا تتغيّر.

---

## 5) معايير القبول

- إكمال تمرين من `player` → يظهر فوراً في `home` (سعرات + Body IQ)، في `journey`، وفي `notifications`.  
- تسجيل وجبة → يحدّث «سعرات اليوم» في `home` وفي شريط `nutrition`.  
- نشر منشور → يظهر فوراً في أعلى `circle` Feed.  
- تغيير `lifeStage` من الإعدادات → يتغيّر التاب الثاني في الشريط السفلي عبر كل الشاشات.  
- Body IQ يتدرّج عبر الـ Tiers مع تراكم الإجراءات.  
- إعادة تحميل الصفحة لا تُفقد الحالة (localStorage).  
- لا تغيير على الشاشات القديمة خارج `sheila-v2`.
