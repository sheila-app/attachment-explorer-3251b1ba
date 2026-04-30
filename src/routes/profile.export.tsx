import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";
import { Download, FileText, Database } from "lucide-react";

export const Route = createFileRoute("/profile/export")({ component: Page });

function Page() {
  const [fmt, setFmt] = useState("pdf");
  const [scope, setScope] = useState<string[]>(["cycle", "workouts"]);
  const all = [
    { id: "cycle", t: "بيانات الدورة" },
    { id: "workouts", t: "سجلّ التمارين" },
    { id: "nutrition", t: "سجلّ التغذية" },
    { id: "measurements", t: "القياسات" },
    { id: "moods", t: "المزاج والأعراض" },
  ];
  const toggle = (id: string) => setScope(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <FeatureShell title="تصدير بياناتي" back="/profile/privacy" showNav={false} variant="calm">
      <div className="px-5 pb-8 space-y-4">
        <p className="text-[12px] text-foreground/65 leading-relaxed">احصلي على نسخة من كلّ بياناتكِ — بياناتكِ ملككِ.</p>

        <div>
          <h2 className="text-sm font-medium mb-2 px-1">الصيغة</h2>
          <div className="space-y-2">
            <OptionCard title="PDF" hint="تقرير منظّم للقراءة" selected={fmt === "pdf"} onClick={() => setFmt("pdf")} leading={<FileText size={17} className="text-primary" />} />
            <OptionCard title="CSV" hint="جداول للتحليل" selected={fmt === "csv"} onClick={() => setFmt("csv")} leading={<Database size={17} className="text-primary" />} />
            <OptionCard title="JSON" hint="بيانات خام" selected={fmt === "json"} onClick={() => setFmt("json")} leading={<Database size={17} className="text-primary" />} />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium mb-2 px-1">ما الذي تريدين تصديره؟</h2>
          <div className="space-y-2">
            {all.map(a => (
              <OptionCard key={a.id} title={a.t} selected={scope.includes(a.id)} onClick={() => toggle(a.id)} />
            ))}
          </div>
        </div>

        <PrimaryCTA onClick={() => undefined}>
          <Download size={15} className="inline ml-1" /> تصدير الآن
        </PrimaryCTA>
      </div>
    </FeatureShell>
  );
}
