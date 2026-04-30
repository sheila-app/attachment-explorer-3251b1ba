import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Shield, Download, Trash2 } from "lucide-react";

export const Route = createFileRoute("/profile/privacy")({ component: Page });

function Page() {
  const [analytics, setAnalytics] = useState(true);
  const [share, setShare] = useState(false);
  const [personalize, setPersonalize] = useState(true);
  return (
    <FeatureShell title="الخصوصيّة والأمان" back="/profile" showNav={false}>
      <div className="px-5 pb-8 space-y-3">
        <div className="glass-strong rounded-2xl p-4 flex items-start gap-3">
          <Shield size={18} className="text-primary mt-0.5" strokeWidth={1.75} />
          <p className="relative z-10 text-[12px] text-foreground/70 leading-relaxed">بياناتكِ مشفّرة بمعايير عالميّة. نحن لا نشاركها مع أي طرف ثالث دون إذنكِ الصريح.</p>
        </div>

        <Section title="جمع البيانات">
          <Toggle label="تحليلات الاستخدام" v={analytics} on={() => setAnalytics(!analytics)} />
          <Toggle label="مشاركة بيانات مجهولة للأبحاث" v={share} on={() => setShare(!share)} />
          <Toggle label="تخصيص التوصيات" v={personalize} on={() => setPersonalize(!personalize)} />
        </Section>

        <Section title="بياناتي">
          <Row icon={Download} label="تنزيل بياناتي" />
          <Row icon={Trash2} label="حذف بيانات الدورة" danger />
          <Row icon={Trash2} label="حذف الحساب نهائيّاً" danger />
        </Section>
      </div>
    </FeatureShell>
  );
}

function Section({ title, children }: any) {
  return (
    <div>
      <h3 className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-1.5 px-1">{title}</h3>
      <div className="glass rounded-2xl overflow-hidden">{children}</div>
    </div>
  );
}

function Toggle({ label, v, on }: { label: string; v: boolean; on: () => void }) {
  return (
    <div className="px-4 py-3.5 flex items-center justify-between border-b border-foreground/5 last:border-b-0">
      <span className="relative z-10 text-[13px]">{label}</span>
      <button onClick={on} className="relative z-10 w-11 h-6 rounded-full transition-colors"
        style={{ background: v ? "var(--primary)" : "color-mix(in oklab, var(--foreground) 15%, transparent)" }}>
        <span className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform"
          style={{ transform: v ? "translateX(-22px)" : "translateX(-2px)" }} />
      </button>
    </div>
  );
}

function Row({ icon: Icon, label, danger }: any) {
  return (
    <button className="relative z-10 w-full flex items-center gap-3 px-4 py-3.5 border-b border-foreground/5 last:border-b-0">
      <Icon size={15} className={danger ? "text-destructive" : "text-foreground/65"} strokeWidth={1.75} />
      <span className={`text-[13px] flex-1 text-right ${danger ? "text-destructive" : ""}`}>{label}</span>
    </button>
  );
}
