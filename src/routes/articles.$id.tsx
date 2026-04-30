import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Clock, Bookmark, Share2 } from "lucide-react";

export const Route = createFileRoute("/articles/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  return (
    <FeatureShell title="مقال" back="/articles" showNav={false} variant="warm"
      trailing={
        <div className="flex gap-2">
          <button className="glass w-9 h-9 rounded-full flex items-center justify-center"><Bookmark size={15} className="relative z-10" strokeWidth={1.75} /></button>
          <button className="glass w-9 h-9 rounded-full flex items-center justify-center"><Share2 size={15} className="relative z-10" strokeWidth={1.75} /></button>
        </div>
      }>
      <article className="px-5 pb-8">
        <div className="h-44 rounded-2xl mb-4" style={{ background: "linear-gradient(135deg, var(--phase-menstrual-soft), oklch(1 0 0 / 0.3))" }} />
        <div className="text-[10px] tracking-[0.15em] uppercase text-primary mb-2">الدورة</div>
        <h1 className="font-display text-[22px] leading-tight">كيف تؤثّر مراحل الدورة على طاقتكِ؟</h1>
        <div className="flex items-center gap-2 mt-2 text-[10.5px] text-foreground/55 nums">
          <Clock size={11} /> 6 دقائق قراءة · بقلم د. سارة المنصور
        </div>
        <div className="prose prose-sm max-w-none mt-5 text-[13.5px] leading-[1.85] text-foreground/80 space-y-3">
          <p>تمرّ المرأة بأربع مراحل رئيسيّة خلال الدورة، ولكلّ مرحلة بصمتها الخاصّة على الطاقة، التركيز، والمزاج. فهم هذه المراحل يساعدكِ على تخطيط يومكِ بذكاء.</p>
          <p>في <strong>المرحلة الجريبيّة</strong>، يرتفع الإستروجين تدريجياً، وتشعرين بطاقة متجدّدة وحماس للأشياء الجديدة — وقت رائع للتمارين الصعبة وتعلّم مهارات جديدة.</p>
          <p>عند <strong>الإباضة</strong>، تصلين لذروة الطاقة والثقة. استثمري هذه الأيّام في الأنشطة الاجتماعيّة والتمارين الجماعيّة عالية الكثافة.</p>
          <p>أمّا <strong>المرحلة الأصفريّة</strong>، فتبدأ الطاقة بالانخفاض. خفّفي شدّة التمرين وركّزي على التغذية الداعمة للمزاج كالشوكولاتة الداكنة والمكسّرات.</p>
        </div>
        <p className="text-[10px] text-foreground/40 mt-6">معرّف المقال: {id}</p>
      </article>
    </FeatureShell>
  );
}
