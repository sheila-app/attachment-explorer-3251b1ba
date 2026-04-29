import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { ChevronLeft, Mail, MessageCircle, Phone, Search } from "lucide-react";

export const Route = createFileRoute("/profile/help")({ component: Help });

const FAQS = [
  { q: "كيف أبدأ تتبّع دورتي الشهريّة؟", a: "من الصفحة الرئيسيّة اضغطي على «الدورة» ثم سجّلي يوم بدء آخر دورة. سيقوم التطبيق بتوقّع المراحل تلقائياً." },
  { q: "هل يمكنني تخصيص التمارين حسب مرحلة الدورة؟", a: "نعم، شيلا تقترح تمارين مناسبة لكل مرحلة بناءً على مستويات الطاقة والهرمونات." },
  { q: "كيف ألغي اشتراكي؟", a: "من «الملف الشخصي» → «الاشتراك» → «إلغاء الاشتراك». ستحتفظين بالوصول حتى نهاية الفترة المدفوعة." },
  { q: "هل بياناتي خاصّة وآمنة؟", a: "بياناتكِ مشفّرة ولا نشاركها مع أي طرف ثالث. يمكنكِ تنزيلها أو حذفها متى شئتِ." },
  { q: "كيف أغيّر هدفي؟", a: "من «الملف الشخصي» → «تعديل» يمكنكِ تحديث هدفكِ ومستوى نشاطكِ في أي وقت." },
];

function Help() {
  const [open, setOpen] = useState<number | null>(0);
  const [q, setQ] = useState("");
  const items = FAQS.filter(f => !q || f.q.includes(q));

  return (
    <FeatureShell title="المساعدة والدعم" back="/profile" showNav={false}>
      <div className="px-5 pb-8 space-y-4">
        <div className="glass rounded-2xl flex items-center gap-2 px-4 py-3">
          <Search size={15} className="relative z-10 text-foreground/55" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحثي عن سؤالكِ…"
            className="relative z-10 flex-1 bg-transparent outline-none text-[13px]" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Channel icon={MessageCircle} label="دردشة" />
          <Channel icon={Mail} label="بريد" />
          <Channel icon={Phone} label="اتّصال" />
        </div>

        <div>
          <h3 className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-2 px-1">الأسئلة الشائعة</h3>
          <div className="glass rounded-2xl overflow-hidden">
            {items.map((f, i) => (
              <button key={f.q} onClick={() => setOpen(open === i ? null : i)}
                className="relative z-10 w-full text-right px-4 py-3.5 border-b border-foreground/5 last:border-b-0">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[12.5px] font-medium flex-1">{f.q}</span>
                  <ChevronLeft size={15} className="text-foreground/45 transition-transform"
                    style={{ transform: open === i ? "rotate(-90deg)" : "rotate(0deg)" }} />
                </div>
                {open === i && <p className="mt-2 text-[12px] text-foreground/65 leading-relaxed">{f.a}</p>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </FeatureShell>
  );
}

function Channel({ icon: Icon, label }: { icon: typeof Mail; label: string }) {
  return (
    <button className="glass rounded-2xl py-4 flex flex-col items-center gap-1.5">
      <Icon size={18} className="relative z-10 text-primary" strokeWidth={1.75} />
      <span className="relative z-10 text-[11.5px] font-medium">{label}</span>
    </button>
  );
}
