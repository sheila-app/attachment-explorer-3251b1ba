import { createFileRoute } from "@tanstack/react-router";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { PHASE_META, type CyclePhase } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/cycle_/phase/$phase")({ component: PhaseEdu });

const TIPS: Record<CyclePhase, { food: string[]; move: string[]; mood: string[] }> = {
  menstrual: { food: ["أطعمة غنيّة بالحديد", "شاي زنجبيل دافئ", "مكسّرات وبذور"], move: ["يوغا تعافي", "مشي خفيف 20 د", "تمدّد لطيف"], mood: ["إذن للراحة", "تجنّبي القرارات الكبيرة", "نوم جيّد ضروري"] },
  follicular: { food: ["كربوهيدرات معقّدة", "بروتين متنوّع", "خضار خضراء"], move: ["تمارين جديدة", "كارديو معتدل", "قوّة تدريجيّة"], mood: ["ابدئي مشاريع", "ثقة عالية", "اجتماعيّة"] },
  ovulation: { food: ["بروتين عالي", "خضار غنيّة بمضادّات الأكسدة", "ماء بوفرة"], move: ["HIIT", "قوّة عالية", "تحدّي شخصي"], mood: ["ثقة قياديّة", "تواصل ممتاز", "اطلبي ما تستحقّينه"] },
  luteal: { food: ["مغنيسيوم", "كربوهيدرات بطيئة", "تجنّب السكّر المضاف"], move: ["بيلاتس", "يوغا", "تمارين مألوفة"], mood: ["تقلّبات طبيعيّة", "قلّلي الكافيين", "تأمّل مساءً"] },
};

function PhaseEdu() {
  const { phase } = Route.useParams();
  const p = phase as CyclePhase;
  const m = PHASE_META[p];
  const t = TIPS[p];
  return (
    <ShellV2 title={m.name} back="/sheila-v2/cycle" showFAB={false}>
      <div className="px-5">
        <div className="rounded-3xl p-5 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${m.color}33, ${m.color}11)`, border: `1px solid ${m.color}33` }}>
          <div className="font-display text-[22px]" style={{ color: m.deep }}>{m.name}</div>
          <p className="text-[13px] text-foreground/75 mt-2 leading-relaxed">{m.description}</p>
        </div>

        {([["تغذية", t.food], ["حركة", t.move], ["مزاج", t.mood]] as const).map(([title, items]) => (
          <section key={title} className="mt-5">
            <h2 className="text-[12px] font-semibold mb-2.5 px-1">{title}</h2>
            <div className="rounded-2xl bg-white/85 border border-border divide-y divide-border">
              {items.map((it, i) => (
                <div key={i} className="px-4 py-3 text-[13px] flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: m.color }} />
                  {it}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </ShellV2>
  );
}
