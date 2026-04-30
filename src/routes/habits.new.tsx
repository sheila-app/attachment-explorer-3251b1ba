import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/habits/new")({ component: Page });

function Page() {
  const [name, setName] = useState("");
  const [freq, setFreq] = useState("daily");
  return (
    <FeatureShell title="عادة جديدة" back="/habits" showNav={false} variant="calm">
      <div className="px-5 pb-8 space-y-4">
        <div className="glass rounded-2xl p-4">
          <div className="text-[10px] tracking-[0.18em] text-foreground/55 uppercase mb-1">اسم العادة</div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="مثلاً: قراءة 30 دقيقة"
            className="relative z-10 w-full bg-transparent text-[14px] outline-none placeholder:text-foreground/35" />
        </div>

        <div>
          <h2 className="text-sm font-medium mb-2 px-1">التكرار</h2>
          <div className="space-y-2">
            <OptionCard title="يوميّاً" selected={freq === "daily"} onClick={() => setFreq("daily")} />
            <OptionCard title="أيّام محدّدة" hint="اختاري الأيّام لاحقاً" selected={freq === "custom"} onClick={() => setFreq("custom")} />
            <OptionCard title="مرّات في الأسبوع" hint="3 مرّات مثلاً" selected={freq === "weekly"} onClick={() => setFreq("weekly")} />
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="text-[10px] tracking-[0.18em] text-foreground/55 uppercase mb-2">وقت التذكير</div>
          <div className="flex items-center justify-between">
            <span className="text-[13px]">7:00 صباحاً</span>
            <button className="text-primary text-[11px]">تغيير</button>
          </div>
        </div>

        <PrimaryCTA to="/habits">إنشاء العادة</PrimaryCTA>
      </div>
    </FeatureShell>
  );
}
