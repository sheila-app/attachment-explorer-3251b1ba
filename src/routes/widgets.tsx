import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { GripVertical, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/widgets")({ component: Page });

const initial = [
  { id: "cycle", name: "حلقة الدورة", on: true },
  { id: "today", name: "تمرين اليوم", on: true },
  { id: "water", name: "تتبّع الماء", on: true },
  { id: "habits", name: "العادات اليوميّة", on: false },
  { id: "mood", name: "مزاج اليوم", on: true },
  { id: "challenges", name: "التحدّيات النشطة", on: false },
  { id: "tip", name: "نصيحة شيلا", on: true },
];

function Page() {
  const [items, setItems] = useState(initial);
  const toggle = (id: string) => setItems(it => it.map(x => x.id === id ? { ...x, on: !x.on } : x));
  return (
    <FeatureShell title="تخصيص الرئيسيّة" back="/profile/settings" showNav={false} variant="default">
      <div className="px-5 pb-8 space-y-3">
        <p className="text-[12px] text-foreground/65 leading-relaxed">اختاري ما يظهر على شاشتكِ الرئيسيّة وأعيدي ترتيبه.</p>
        {items.map(it => (
          <div key={it.id} className="glass rounded-2xl p-3.5 flex items-center gap-3">
            <GripVertical size={16} className="relative z-10 text-foreground/40" />
            <span className="relative z-10 flex-1 text-[13.5px] font-medium">{it.name}</span>
            <button onClick={() => toggle(it.id)} className="relative z-10">
              {it.on ? <Eye size={16} className="text-primary" /> : <EyeOff size={16} className="text-foreground/40" />}
            </button>
          </div>
        ))}
      </div>
    </FeatureShell>
  );
}
