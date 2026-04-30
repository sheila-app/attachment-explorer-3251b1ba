import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";

export const Route = createFileRoute("/profile/terms")({ component: Page });

function Page() {
  const sections = [
    { t: "1. القبول", b: "باستخدامكِ تطبيق شيلا، توافقين على هذه الشروط بالكامل." },
    { t: "2. الحساب", b: "أنتِ مسؤولة عن سرّيّة حسابكِ وكلّ نشاط يجري عبره." },
    { t: "3. المحتوى", b: "المحتوى المقدَّم تثقيفي ولا يغني عن استشارة طبيب مختصّ." },
    { t: "4. الاشتراك", b: "اشتراك شيلا برو يجدَّد تلقائيّاً ما لم يُلغَ قبل 24 ساعة." },
    { t: "5. الإلغاء", b: "يحقّ لكِ إلغاء اشتراككِ أو حذف حسابكِ في أيّ وقت." },
    { t: "6. حدود المسؤوليّة", b: "نسعى لتقديم خدمة موثوقة، لكنّنا غير مسؤولين عن أيّ ضرر غير مباشر." },
  ];
  return (
    <FeatureShell title="الشروط والأحكام" back="/profile/about" showNav={false} variant="calm">
      <div className="px-5 pb-8 space-y-3">
        <p className="text-[11px] text-foreground/55">آخر تحديث: 1 أبريل 2026</p>
        {sections.map(s => (
          <div key={s.t} className="glass rounded-2xl p-4">
            <div className="text-[13.5px] font-medium mb-1.5">{s.t}</div>
            <p className="relative z-10 text-[12px] text-foreground/70 leading-relaxed">{s.b}</p>
          </div>
        ))}
      </div>
    </FeatureShell>
  );
}
