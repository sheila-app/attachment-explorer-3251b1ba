import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Cloud, CheckCircle2, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/profile/backup")({ component: Page });

function Page() {
  return (
    <FeatureShell title="النسخ الاحتياطي" back="/profile/settings" showNav={false} variant="calm">
      <div className="px-5 pb-8 space-y-4">
        <div className="glass-strong rounded-3xl p-5 text-center">
          <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3"
            style={{ background: "linear-gradient(135deg, oklch(0.66 0.16 322 / 0.25), oklch(0.46 0.135 328 / 0.12))" }}>
            <Cloud size={26} className="text-primary" strokeWidth={1.5} />
          </div>
          <div className="font-display text-[18px]">آخر نسخة: اليوم 03:14 ص</div>
          <div className="flex items-center justify-center gap-1 text-[11.5px] text-primary mt-1">
            <CheckCircle2 size={11} /> محفوظة بأمان
          </div>
        </div>

        <Row title="النسخ التلقائي" hint="مرّة يوميّاً عبر Wi-Fi" toggle />
        <Row title="تشفير end-to-end" hint="فقط أنتِ تستطيعين فكّ التشفير" toggle on />
        <Row title="استعادة من نسخة" hint="من أيّ جهاز سابق" />

        <button className="w-full glass-strong rounded-2xl py-3.5 flex items-center justify-center gap-2 text-primary text-sm">
          <RefreshCw size={15} /> ابدئي نسخة احتياطيّة الآن
        </button>
      </div>
    </FeatureShell>
  );
}

function Row({ title, hint, toggle, on }: { title: string; hint: string; toggle?: boolean; on?: boolean }) {
  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-3">
      <div className="relative z-10 flex-1">
        <div className="text-[13.5px] font-medium">{title}</div>
        <div className="text-[11px] text-foreground/60 mt-0.5">{hint}</div>
      </div>
      {toggle && (
        <div className="relative z-10 w-10 h-6 rounded-full p-0.5" style={{ background: on ? "var(--gradient-primary)" : "oklch(0.9 0.01 320)" }}>
          <div className="w-5 h-5 rounded-full bg-white transition-transform" style={{ transform: on ? "translateX(-16px)" : "translateX(0)" }} />
        </div>
      )}
    </div>
  );
}
