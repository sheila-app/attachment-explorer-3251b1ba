import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PHASE_META, type CyclePhase } from "@/data/mock";
import { Clock, Bookmark, Share2, ChevronLeft, FileText } from "lucide-react";

export const Route = createFileRoute("/articles/$id")({ component: Page });

function arNum(n: number) {
  return n.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
}

const ARTICLES: Record<string, {
  title: string;
  category: string;
  phase: CyclePhase;
  author: string;
  authorInitial: string;
  date: string;
  readTime: number;
  sections: { heading?: string; body: string }[];
  related: { id: string; title: string; category: string; readTime: number }[];
}> = {
  a1: {
    title: "كيف تؤثّر مراحل الدورة على طاقتكِ؟",
    category: "الدورة والهرمونات",
    phase: "menstrual",
    author: "د. سارة المنصور",
    authorInitial: "س",
    date: "١٥ أبريل ٢٠٢٦",
    readTime: 6,
    sections: [
      { body: "تمرّ المرأة بأربع مراحل رئيسيّة خلال الدورة الشهريّة، ولكلّ مرحلة بصمتها الخاصّة على مستوى الطاقة، التركيز، والمزاج العام. فهم هذه المراحل بعمق يساعدكِ على تخطيط أسبوعكِ، تمارينكِ، وحتى اجتماعاتكِ المهنيّة بذكاء حقيقي." },
      { heading: "المرحلة الجريبيّة: الطاقة في صعود", body: "في أعقاب انتهاء الحيض، يبدأ الإستروجين بالارتفاع تدريجياً، فتشعرين بطاقة متجدّدة وحماس ملحوظ. هذه المرحلة مثاليّة للتمارين الصعبة، تعلّم مهارات جديدة، وخوض المشاريع التي تتطلّب إبداعاً." },
      { heading: "الإباضة: ذروة الطاقة والثقة", body: "عند الإباضة، يبلغ الإستروجين ذروته. تصلين لأعلى مستويات الطاقة والثقة بالنفس. استثمري هذه الأيّام في الأنشطة الجماعيّة، التمارين عالية الكثافة كـHIIT، والمواقف التي تتطلّب حضوراً قيادياً." },
      { heading: "المرحلة الأصفريّة: الهدوء والتأمّل", body: "بعد الإباضة، تبدأ الطاقة بالانخفاض التدريجي. خفّفي شدّة التمرين إلى البيلاتس أو اليوغا، وركّزي على الوجبات الداعمة للمزاج كالشوكولاتة الداكنة والمكسّرات." },
      { heading: "الحيض: وقت الراحة والتجدّد", body: "خلال أيّام الحيض، ينخفض كلّ من الإستروجين والبروجسترون. الجسم في وضع التجدّد — امنحيه ما يحتاجه من راحة ودفء وتغذية مدعّمة بالحديد. التمارين الخفيفة كالمشي والتمدّد مفيدة جداً." },
    ],
    related: [
      { id: "a2", title: "تغذية الحمل: أهم ١٠ عناصر لا غنى عنها", category: "تغذية", readTime: 8 },
      { id: "a3", title: "تمارين الإباضة: استثمري ذروة طاقتكِ", category: "التمارين", readTime: 5 },
    ],
  },
  a2: {
    title: "تغذية الحمل: أهم ١٠ عناصر لا غنى عنها",
    category: "تغذية",
    phase: "follicular",
    author: "د. ليلى محمد",
    authorInitial: "ل",
    date: "٢٢ أبريل ٢٠٢٦",
    readTime: 8,
    sections: [
      { body: "التغذية السليمة خلال فترة الحمل تُعدّ الركيزة الأساسيّة لصحّة الأم والجنين. بعض العناصر الغذائيّة تكتسب أهمّية مضاعفة في هذه المرحلة الحساسة." },
      { heading: "حمض الفوليك", body: "من أهمّ العناصر في الأشهر الأولى. يقي من عيوب الأنبوب العصبي. يتوفّر في الخضروات الورقية والبقوليّات." },
      { heading: "الحديد والكالسيوم", body: "الحديد ضروري لمنع فقر الدم. الكالسيوم أساسي لبناء عظام الجنين. اجمعيهما مع فيتامين D وC لتعزيز الامتصاص." },
    ],
    related: [
      { id: "a1", title: "كيف تؤثّر مراحل الدورة على طاقتكِ؟", category: "الدورة", readTime: 6 },
      { id: "a3", title: "تمارين الإباضة: استثمري طاقتكِ", category: "التمارين", readTime: 5 },
    ],
  },
  a3: {
    title: "تمارين الإباضة: استثمري ذروة طاقتكِ",
    category: "التمارين",
    phase: "ovulation",
    author: "المدرّبة دانة",
    authorInitial: "د",
    date: "٢٨ أبريل ٢٠٢٦",
    readTime: 5,
    sections: [
      { body: "أسبوع الإباضة هو ذروة دورتكِ من حيث الطاقة والقوّة. الهرمونات في أعلى مستوياتها، واستجابة الجسم للتدريب المكثّف في قمّته." },
      { heading: "HIIT: الأفضل في هذه المرحلة", body: "تمارين التدريب المتقطّع عالي الكثافة مثاليّة الآن. جسمكِ يتحمّل الضغط بكفاءة أعلى ويتعافى أسرع." },
      { heading: "تمارين القوّة الثقيلة", body: "ارفعي الأثقال، مارسي السكوات والديدليفت. القوّة والتحمّل في ذروتهما — استثمريهما." },
    ],
    related: [
      { id: "a1", title: "كيف تؤثّر مراحل الدورة على طاقتكِ؟", category: "الدورة", readTime: 6 },
      { id: "a2", title: "تغذية الحمل: أهم ١٠ عناصر", category: "تغذية", readTime: 8 },
    ],
  },
};

function Page() {
  const { id } = Route.useParams();
  const article = ARTICLES[id] ?? ARTICLES.a1;
  const phaseMeta = PHASE_META[article.phase];

  return (
    <FeatureShell
      title={article.category}
      back="/articles"
      showNav={false}
      variant="warm"
      trailing={
        <div className="flex gap-2">
          <button className="glass w-9 h-9 rounded-full flex items-center justify-center">
            <Bookmark size={15} className="relative z-10" strokeWidth={1.75} />
          </button>
          <button className="glass w-9 h-9 rounded-full flex items-center justify-center">
            <Share2 size={15} className="relative z-10" strokeWidth={1.75} />
          </button>
        </div>
      }
    >
      <article className="pb-8">
        {/* hero */}
        <div
          className="h-52 mx-5 rounded-2xl mb-5 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${phaseMeta.soft}, oklch(1 0 0 / 0.4))`,
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${phaseMeta.color}, transparent 70%)`,
            }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 208" fill="none">
            <circle cx="200" cy="104" r="80" stroke={phaseMeta.color} strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="200" cy="104" r="50" stroke={phaseMeta.color} strokeWidth="0.8" strokeDasharray="3 5" />
          </svg>
          <div className="absolute bottom-4 start-4">
            <span
              className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full font-medium"
              style={{ background: phaseMeta.color, color: "white" }}
            >
              {article.category}
            </span>
          </div>
        </div>

        <div className="px-5">
          <h1 className="font-display text-[22px] leading-snug">{article.title}</h1>

          {/* author row */}
          <div className="flex items-center gap-3 mt-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-display text-white shrink-0"
              style={{ background: phaseMeta.color }}
            >
              {article.authorInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-medium">{article.author}</p>
              <div className="flex items-center gap-2 mt-0.5 text-[10.5px] text-foreground/55 nums">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-foreground/30" />
                <Clock size={10} strokeWidth={1.75} />
                <span>{arNum(article.readTime)} دقائق قراءة</span>
              </div>
            </div>
          </div>

          <div className="my-5 border-t border-border/60" />

          {/* body */}
          <div className="space-y-5">
            {article.sections.map((sec, i) => (
              <div key={i}>
                {sec.heading && (
                  <h2 className="font-display text-[17px] mb-2" style={{ color: phaseMeta.color }}>
                    {sec.heading}
                  </h2>
                )}
                <p className="text-[13.5px] leading-[1.9] text-foreground/80">{sec.body}</p>
              </div>
            ))}
          </div>

          <div className="my-6 border-t border-border/60" />

          {/* related */}
          <h3 className="font-display text-[16px] mb-3">مقالات ذات صلة</h3>
          <div className="space-y-2.5">
            {article.related.map((rel) => (
              <Link
                key={rel.id}
                to="/articles/$id"
                params={{ id: rel.id }}
                className="glass rounded-2xl p-4 flex items-center gap-3"
              >
                <div
                  className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "var(--primary-soft)" }}
                >
                  <FileText size={18} strokeWidth={1.75} className="text-primary" />
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                  <p className="text-[13px] font-medium leading-tight">{rel.title}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-[10.5px] text-foreground/55 nums">
                    <span>{rel.category}</span>
                    <span className="w-1 h-1 rounded-full bg-foreground/30" />
                    <Clock size={9} strokeWidth={1.75} />
                    <span>{arNum(rel.readTime)} د</span>
                  </div>
                </div>
                <ChevronLeft size={14} className="relative z-10 text-foreground/40" strokeWidth={2} />
              </Link>
            ))}
          </div>
        </div>
      </article>
    </FeatureShell>
  );
}
