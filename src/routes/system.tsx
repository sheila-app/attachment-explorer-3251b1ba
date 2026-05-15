import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { OptionCard, PrimaryCTA, GhostCTA } from "@/components/sheila/OnboardingShell";
import { IOSWheel, wheelRange } from "@/components/sheila/IOSWheel";
import { CyclePhaseRing } from "@/components/sheila/CyclePhaseRing";
import { allScreens, PHASE_META } from "@/data/mock";
import { Bell, Sparkles, Flame, Droplet, Moon, ChevronLeft, Activity } from "lucide-react";
import { MOOD_LIST } from "@/data/moods";
import { AITyping, AIGenerating } from "@/components/sheila-v2/AITyping";
import { TierBadge } from "@/components/sheila-v2/TierBadge";
import { TIERS, PHASE_META as V2_PHASE_META } from "@/data/sheila-v2";

export const Route = createFileRoute("/system")({ component: Page });

const V2_SCREENS: { group: string; items: { name: string; path: string }[] }[] = [
  { group: "v2 · رئيسي", items: [
    { name: "معرض v2", path: "/sheila-v2" },
    { name: "الرئيسية", path: "/sheila-v2/home" },
    { name: "شيلا (شات)", path: "/sheila-v2/sheila" },
    { name: "الإشعارات", path: "/sheila-v2/notifications" },
    { name: "الطوارئ", path: "/sheila-v2/emergency" },
    { name: "الصحّة", path: "/sheila-v2/health" },
  ]},
  { group: "v2 · تغذية", items: [
    { name: "هاب التغذية", path: "/sheila-v2/nutrition" },
    { name: "تسجيل وجبة", path: "/sheila-v2/nutrition/log" },
    { name: "صورة وجبة", path: "/sheila-v2/nutrition/photo" },
    { name: "وصفات", path: "/sheila-v2/nutrition/recipes" },
    { name: "تسوّق", path: "/sheila-v2/nutrition/shopping" },
  ]},
  { group: "v2 · تمارين", items: [
    { name: "هاب التمارين", path: "/sheila-v2/workouts" },
    { name: "بناء التمرين", path: "/sheila-v2/workouts/builder" },
    { name: "مشغّل التمرين", path: "/sheila-v2/workouts/player" },
  ]},
  { group: "v2 · دورة ومراحل", items: [
    { name: "الدورة", path: "/sheila-v2/cycle" },
    { name: "الحمل", path: "/sheila-v2/pregnancy" },
    { name: "ما بعد الولادة", path: "/sheila-v2/postpartum" },
  ]},
  { group: "v2 · دائرة", items: [
    { name: "الدائرة", path: "/sheila-v2/circle" },
    { name: "أصحاب المسؤوليّة", path: "/sheila-v2/circle/accountability" },
    { name: "نشر منشور", path: "/sheila-v2/circle/compose" },
    { name: "الفعاليّات", path: "/sheila-v2/circle/events" },
    { name: "المجموعات", path: "/sheila-v2/circle/groups" },
  ]},
  { group: "v2 · رحلتي", items: [
    { name: "الرحلة", path: "/sheila-v2/journey" },
    { name: "الإنجازات", path: "/sheila-v2/journey/achievements" },
    { name: "رؤى", path: "/sheila-v2/journey/insights" },
    { name: "تقرير", path: "/sheila-v2/journey/report" },
  ]},
  { group: "v2 · بروفايل", items: [
    { name: "البروفايل", path: "/sheila-v2/profile" },
    { name: "المظهر", path: "/sheila-v2/profile/appearance" },
    { name: "الاشتراك", path: "/sheila-v2/profile/subscription" },
  ]},
];

/**
 * صفحة نظام التصميم — مرجع شامل للألوان والمكوّنات والشاشات.
 * تحديث إلزامي عند إضافة عنصر جديد أو شاشة جديدة (يُسحب فهرس الشاشات تلقائيّاً من mock.ts).
 */
function Page() {
  const [tab, setTab] = useState<"tokens" | "components" | "screens" | "v2">("tokens");
  const [wheel, setWheel] = useState<number>(28);
  const today = new Date();
  const months = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
  const yearNow = today.getFullYear();
  const [day, setDay] = useState<number>(today.getDate());
  const [monthIdx, setMonthIdx] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(yearNow);
  const [moods, setMoods] = useState<string[]>(["calm"]);
  const toggleMood = (id: string) => setMoods(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const moodList = MOOD_LIST;

  return (
    <FeatureShell title="نظام التصميم" back="/" showNav={false} variant="default">
      <div className="px-5 pb-10 space-y-5">
        {/* Tabs */}
        <div className="glass-strong rounded-2xl p-1 grid grid-cols-3 gap-1">
          {([
            ["tokens", "الرموز"],
            ["components", "المكوّنات"],
            ["screens", "الشاشات"],
          ] as const).map(([k, t]) => (
            <button key={k} onClick={() => setTab(k)}
              className="rounded-xl py-2 text-[12px] font-medium relative"
              style={tab === k ? { background: "var(--gradient-primary)", color: "white", boxShadow: "0 8px 18px -8px oklch(0.46 0.135 328 / 0.5)" } : undefined}
            >
              <span className="relative z-10">{t}</span>
            </button>
          ))}
        </div>

        {tab === "tokens" && (
          <>
            <Block title="الألوان الأساسيّة">
              <div className="grid grid-cols-3 gap-2">
                <Swatch name="primary" v="var(--primary)" />
                <Swatch name="primary-glow" v="var(--primary-glow)" />
                <Swatch name="primary-deep" v="var(--primary-deep)" />
                <Swatch name="background" v="var(--background)" border />
                <Swatch name="foreground" v="var(--foreground)" />
                <Swatch name="muted" v="var(--muted)" border />
              </div>
            </Block>

            <Block title="ألوان مراحل الدورة">
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(PHASE_META) as Array<keyof typeof PHASE_META>).map(k => (
                  <div key={k} className="glass rounded-2xl p-3 flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full" style={{ background: PHASE_META[k].color }} />
                    <div className="relative z-10">
                      <div className="text-[12px] font-medium">{PHASE_META[k].name}</div>
                      <div className="text-[10px] text-foreground/55 font-mono">{k}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Block>

            <Block title="التدرّجات">
              <div className="space-y-2">
                <div className="h-14 rounded-2xl" style={{ background: "var(--gradient-primary)" }} />
                <div className="text-[10px] text-foreground/55 font-mono px-1">--gradient-primary</div>
              </div>
            </Block>

            <Block title="الخطوط">
              <div className="space-y-2">
                <div className="glass rounded-2xl p-4">
                  <div className="font-display text-2xl">عنوان رئيسي — Cairo</div>
                  <div className="text-[10px] text-foreground/55 font-mono mt-1">font-display</div>
                </div>
                <div className="glass rounded-2xl p-4">
                  <div className="text-sm">نصّ افتراضي للقراءة — Tajawal</div>
                  <div className="text-[10px] text-foreground/55 font-mono mt-1">font-sans</div>
                </div>
                <div className="glass rounded-2xl p-4">
                  <div className="nums tabular-nums text-lg">0 1 2 3 4 5 6 7 8 9 — أرقام إنجليزيّة</div>
                  <div className="text-[10px] text-foreground/55 font-mono mt-1">.nums (Intl en-US)</div>
                </div>
              </div>
            </Block>

            <Block title="نصف الأقطار والظلال">
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["sm", "rounded-md"], ["md", "rounded-xl"], ["lg", "rounded-2xl"],
                ].map(([n, c]) => (
                  <div key={n} className={`glass-strong ${c} h-16 flex items-center justify-center text-[11px] font-mono`}>{n}</div>
                ))}
              </div>
            </Block>
          </>
        )}

        {tab === "components" && (
          <>
            <Block title="الأزرار (CTA)">
              <div className="space-y-2">
                <PrimaryCTA onClick={() => undefined}>زرّ رئيسي</PrimaryCTA>
                <GhostCTA onClick={() => undefined}>زرّ ثانوي</GhostCTA>
              </div>
            </Block>

            <Block title="بطاقات الاختيار">
              <div className="space-y-2">
                <OptionCard title="خيار محدّد" hint="مع وصف اختياري" selected />
                <OptionCard title="خيار غير محدّد" />
              </div>
            </Block>

            <Block title="بطاقات زجاجيّة">
              <div className="grid grid-cols-2 gap-2">
                <div className="glass rounded-2xl p-4 text-[12px]"><span className="relative z-10">.glass</span></div>
                <div className="glass-strong rounded-2xl p-4 text-[12px]"><span className="relative z-10">.glass-strong</span></div>
              </div>
            </Block>

            <Block title="عجلة iOS">
              <div className="glass-strong rounded-2xl p-4 flex justify-center" style={{ direction: "ltr" }}>
                <IOSWheel values={wheelRange(20, 40)} value={wheel} onChange={(v) => setWheel(Number(v))} />
              </div>
              <p className="text-[10px] text-foreground/55 mt-2 px-1 font-mono">IOSWheel · القيمة: <span className="nums">{wheel}</span></p>
            </Block>

            <Block title="بطاقة اختيار التاريخ">
              <div className="glass rounded-2xl p-4">
                <div className="relative z-10 flex justify-center gap-2" style={{ direction: "ltr" }}>
                  <IOSWheel values={wheelRange(1, 31)} value={day} onChange={(v) => setDay(Number(v))} width={56} />
                  <IOSWheel values={months} value={months[monthIdx]} onChange={(v) => setMonthIdx(months.indexOf(String(v)))} width={92} />
                  <IOSWheel values={wheelRange(yearNow - 5, yearNow)} value={year} onChange={(v) => setYear(Number(v))} width={64} />
                </div>
              </div>
              <p className="text-[10px] text-foreground/55 mt-2 px-1 font-mono">DateWheelCard · <span className="nums">{day}/{monthIdx + 1}/{year}</span></p>
            </Block>

            <Block title="بطاقة اختيار المزاج">
              <div className="glass rounded-2xl p-3">
                <div className="relative z-10 grid grid-cols-4 gap-2">
                  {moodList.map(m => {
                    const on = moods.includes(m.id);
                    return (
                      <button key={m.id} onClick={() => toggleMood(m.id)}
                        className="rounded-2xl py-2.5 px-1 flex flex-col items-center gap-1 transition"
                        style={on
                          ? { background: `color-mix(in oklab, ${m.tone} 18%, transparent)`, boxShadow: `inset 0 0 0 1.5px ${m.tone}` }
                          : { background: "color-mix(in oklab, var(--foreground) 4%, transparent)" }}
                      >
                        <img src={m.img} alt={m.name} className="w-9 h-9 object-contain" style={{ opacity: on ? 1 : 0.75 }} />
                        <span className="text-[10.5px] font-medium leading-tight text-center" style={{ color: on ? m.tone : "var(--foreground)" }}>{m.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <p className="text-[10px] text-foreground/55 mt-2 px-1 font-mono">MoodPicker · {moods.length} محدّد</p>
            </Block>

            <Block title="حلقة مرحلة الدورة">
              <div className="flex justify-center"><CyclePhaseRing phase="ovulation" day={14} cycleLength={28} size={150} /></div>
            </Block>

            <Block title="رقاقات (Chips)">
              <div className="flex flex-wrap gap-2">
                <span className="glass rounded-full px-3 py-1.5 text-[11px]"><span className="relative z-10">عادي</span></span>
                <span className="rounded-full px-3 py-1.5 text-[11px] text-white" style={{ background: "var(--gradient-primary)" }}>نشط</span>
                <span className="rounded-full px-2 py-0.5 text-[9px] font-medium text-white nums" style={{ background: "var(--phase-menstrual)" }}>● مباشر</span>
              </div>
            </Block>

            <Block title="حقل إدخال">
              <div className="glass rounded-2xl px-3 py-2.5">
                <input placeholder="اكتبي هنا..." className="relative z-10 w-full bg-transparent text-[13px] outline-none placeholder:text-foreground/40" />
              </div>
            </Block>

            <Block title="شريط تقدّم">
              <div className="h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "62%", background: "var(--gradient-primary)" }} />
              </div>
            </Block>

            <Block title="بطاقة إحصاء">
              <div className="grid grid-cols-3 gap-2">
                {[[Flame, "سعرات", "320"], [Droplet, "ماء", "6/8"], [Moon, "نوم", "7.2"]].map(([Ic, l, v]: any, i) => (
                  <div key={i} className="glass rounded-xl p-3">
                    <div className="relative z-10 flex items-center justify-between mb-1.5">
                      <Ic size={14} className="text-primary" strokeWidth={2} />
                      <span className="text-[9px] tracking-wider text-foreground/55 uppercase">{l}</span>
                    </div>
                    <div className="relative z-10 text-lg font-semibold nums">{v}</div>
                  </div>
                ))}
              </div>
            </Block>

            <Block title="أيقونات النظام (Lucide)">
              <div className="glass rounded-2xl p-4 grid grid-cols-7 gap-3 text-primary">
                {[Bell, Sparkles, Flame, Droplet, Moon, ChevronLeft, Activity].map((Ic, i) => (
                  <Ic key={i} size={18} strokeWidth={1.75} className="relative z-10 mx-auto" />
                ))}
              </div>
            </Block>
          </>
        )}

        {tab === "screens" && (
          <div className="space-y-4">
            <p className="text-[11px] text-foreground/55 px-1">
              عدد الشاشات: <span className="nums text-primary font-medium">{allScreens.reduce((a, g) => a + g.items.length, 0)}</span> — تُحدَّث تلقائيّاً من <span className="font-mono">src/data/mock.ts</span>.
            </p>
            {allScreens.map(group => (
              <div key={group.group}>
                <h2 className="text-[11px] font-medium text-foreground/55 mb-1.5 px-1 uppercase tracking-wider">{group.group}</h2>
                <div className="glass rounded-2xl divide-y divide-foreground/5 overflow-hidden">
                  {group.items.map(it => (
                    <Link key={it.path} to={it.path as "/"}
                      className="relative z-10 flex items-center justify-between px-4 py-2.5 hover:bg-primary/5 transition">
                      <span className="text-[13px]">{it.name}</span>
                      <span className="text-[10px] text-foreground/55 font-mono">{it.path}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </FeatureShell>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[11px] font-medium text-foreground/65 mb-2 px-1 uppercase tracking-wider">{title}</h2>
      {children}
    </div>
  );
}

function Swatch({ name, v, border }: { name: string; v: string; border?: boolean }) {
  return (
    <div className="glass rounded-2xl p-2.5">
      <div className="h-12 rounded-xl mb-2" style={{ background: v, border: border ? "1px solid color-mix(in oklab, var(--foreground) 8%, transparent)" : undefined }} />
      <div className="relative z-10 text-[10.5px] font-mono">{name}</div>
    </div>
  );
}
