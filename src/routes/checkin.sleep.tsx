import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";
import { IOSWheel, wheelRange } from "@/components/sheila/IOSWheel";
import { Moon } from "lucide-react";

export const Route = createFileRoute("/checkin/sleep")({ component: Page });

function Page() {
  const [hours, setHours] = useState<number>(7);
  const [quality, setQuality] = useState("good");

  return (
    <FeatureShell title="تتبّع النوم" back="/checkin" showNav={false} variant="calm">
      <div className="px-5 pb-8">
        <div className="glass-strong rounded-3xl p-6 text-center">
          <Moon size={22} className="mx-auto text-primary mb-2" strokeWidth={1.5} />
          <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-3">عدد ساعات النوم</div>
          <div className="flex justify-center" style={{ direction: "ltr" }}>
            <IOSWheel values={wheelRange(3, 12)} value={hours} onChange={(v) => setHours(Number(v))} width={86} />
          </div>
        </div>

        <h2 className="text-sm font-medium mt-6 mb-2">جودة النوم</h2>
        <div className="space-y-2">
          <OptionCard title="ممتاز — استيقظتُ نشيطة" selected={quality === "great"} onClick={() => setQuality("great")} />
          <OptionCard title="جيّد — مرتاحة" selected={quality === "good"} onClick={() => setQuality("good")} />
          <OptionCard title="عادي" selected={quality === "ok"} onClick={() => setQuality("ok")} />
          <OptionCard title="سيّئ — متعبة" selected={quality === "bad"} onClick={() => setQuality("bad")} />
        </div>

        <div className="mt-6">
          <PrimaryCTA to="/home">حفظ</PrimaryCTA>
        </div>
      </div>
    </FeatureShell>
  );
}
