import { createFileRoute } from"@tanstack/react-router";
import { FeatureShell } from"@/components/sheila/FeatureShell";
import { Baby, Heart, Apple, Activity } from"lucide-react";

export const Route = createFileRoute("/pregnancy")({ component: Page });

function Page() {
 const week = 18;
 const total = 40;
 const pct = (week / total) * 100;
 const sections = [
 { icon: Baby, title:"تطوّر الجنين", hint:"بحجم حبّة الفلفل الحلو" },
 { icon: Heart, title:"ما تشعرين به", hint:"حركات جنينيّة خفيفة، طاقة متجدّدة" },
 { icon: Apple, title:"تغذية الأسبوع", hint:"أكثري من الحديد والكالسيوم" },
 { icon: Activity, title:"تمارين آمنة", hint:"يوغا الحمل والمشي 30د يومياً" },
 ];
 return (
 <FeatureShell title="رحلة الحمل" back="/journey" variant="warm">
 <div className="px-5 space-y-4">
 <div className="glass-strong rounded-2xl p-5">
 <div className="relative z-10 text-[10px] tracking-[0.2em] uppercase text-foreground/55">الأسبوع</div>
 <div className="relative z-10 flex items-baseline gap-2 mt-1">
 <span className="font-display text-[44px] text-primary nums leading-none">{week}</span>
 <span className="text-foreground/50 text-sm">من {total}</span>
 </div>
 <div className="relative z-10 mt-3 h-2 rounded-full bg-foreground/10 overflow-hidden">
 <div className="h-full rounded-full" style={{ width: `${pct}%`, background:"var(--gradient-primary)" }} />
 </div>
 <div className="relative z-10 flex justify-between text-[10px] text-foreground/55 mt-2">
 <span>الثلث الثاني</span>
 <span className="nums">{Math.round(pct)}%</span>
 </div>
 </div>

 <div className="grid grid-cols-2 gap-2.5 stagger">
 {sections.map(s => (
 <div key={s.title} className="glass rounded-2xl p-4">
 <div className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center mb-2"
 style={{ background:"linear-gradient(135deg, oklch(0.66 0.16 322 / 0.25), oklch(0.46 0.135 328 / 0.12))" }}>
 <s.icon size={17} className="text-primary" strokeWidth={1.75} />
 </div>
 <div className="relative z-10 text-[13px] font-medium">{s.title}</div>
 <div className="relative z-10 text-[11px] text-foreground/60 mt-1 leading-relaxed">{s.hint}</div>
 </div>
 ))}
 </div>

 <div className="glass rounded-2xl p-4">
 <div className="relative z-10 text-[12px] font-medium mb-2">موعدكِ القادم</div>
 <div className="relative z-10 flex items-center justify-between">
 <div>
 <div className="text-[13px]">فحص السكّر التحمّلي</div>
 <div className="text-[10.5px] text-foreground/60 mt-0.5 nums">15 مايو · 10:30 ص</div>
 </div>
 <button className="px-3 py-1.5 rounded-full text-[10.5px] text-white" style={{ background:"var(--gradient-primary)" }}>
 ذكّريني
 </button>
 </div>
 </div>
 </div>
 </FeatureShell>
 );
}
