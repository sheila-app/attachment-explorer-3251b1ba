import { createFileRoute, Link } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { ArrowRight, Sparkles } from "lucide-react";
import { allFlows, flowSections, type FlowSlug } from "@/data/checkinFlows";

export const Route = createFileRoute("/checkin/")({ component: CheckinIndex });

function CheckinIndex() {
  return (
    <DeviceFrame>
      <div className="relative h-full flex flex-col overflow-hidden bg-background">
        <LiquidBackdrop variant="calm" />

        <header className="relative z-10 px-5 pt-6 pb-3 flex items-center gap-3">
          <Link to="/home" className="glass w-10 h-10 rounded-full flex items-center justify-center">
            <ArrowRight size={17} strokeWidth={1.75} />
          </Link>
          <div className="flex-1">
            <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">تسجيل اليوم</div>
            <div className="font-display text-[20px] leading-tight">كلّ الحالات</div>
          </div>
          <Sparkles size={18} className="text-primary" strokeWidth={1.75} />
        </header>

        <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar px-5 pb-8 pt-2">
          <p className="text-[12.5px] text-foreground/65 leading-relaxed mb-5">
            اختاري حالتكِ اليوم — كلّ شاشة مصمّمة بنبرة ولغة مختلفة تناسب لحظتكِ.
          </p>

          <div className="space-y-6">
            {flowSections.map((section) => (
              <section key={section.id}>
                <div className="flex items-baseline gap-2 mb-2.5">
                  <span className="font-display text-[12px] text-foreground/45 nums">{section.id}</span>
                  <h2 className="font-display text-[15px] leading-tight">{section.title}</h2>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {section.slugs.map((slug) => {
                    const flow = allFlows[slug];
                    return (
                      <Link
                        key={slug}
                        to="/checkin/$slug"
                        params={{ slug }}
                        className="glass rounded-2xl p-3.5 flex flex-col gap-1.5 active:scale-[0.98] transition-transform"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[10px] font-bold tracking-[0.15em] nums"
                            style={{ color: flow.color }}
                          >
                            {flow.key}
                          </span>
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: flow.color }}
                          />
                        </div>
                        <div className="font-display text-[13px] leading-tight">{flow.greeting}</div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}

// تصدير للاستخدام في dynamic route
export type { FlowSlug };
