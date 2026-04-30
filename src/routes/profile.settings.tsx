import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/profile/settings")({ component: SettingsPage });

function SettingsPage() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");

  return (
    <FeatureShell title="الإعدادات" back="/profile" showNav={false}>
      <div className="px-5 space-y-3">
        <Section title="الإشعارات">
          <Toggle label="إشعارات Push" v={push} on={() => setPush(!push)} />
          <Toggle label="إشعارات البريد" v={email} on={() => setEmail(!email)} />
        </Section>

        <Section title="الوحدات">
          <div className="px-4 py-3 flex items-center justify-between border-b border-foreground/5 last:border-b-0">
            <span className="text-[13px]">نظام القياس</span>
            <div className="flex gap-1 glass-strong rounded-full p-0.5">
              {(["metric", "imperial"] as const).map(u => (
                <button key={u} onClick={() => setUnits(u)}
                  className="px-3 py-1 rounded-full text-[11px] font-medium"
                  style={units === u ? { background: "var(--gradient-primary)", color: "white" } : { color: "var(--color-foreground)" }}
                >
                  {u === "metric" ? "متري" : "إمبراطوري"}
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section title="المظهر">
          <LinkRow to="/profile/theme" label="السمة واللون" hint="فاتحة · وردي" />
          <LinkRow to="/widgets" label="تخصيص الرئيسيّة" />
          <LinkRow to="/notifications/settings" label="وضع عدم الإزعاج" />
        </Section>

        <Section title="التكاملات">
          <LinkRow to="/profile/devices" label="الأجهزة المتصلة" />
          <LinkRow to="/profile/language" label="اللغة" hint="العربيّة" />
          <LinkRow to="/profile/backup" label="النسخ الاحتياطي" />
        </Section>

        <Section title="الحساب">
          <LinkRow to="/profile/edit" label="تعديل الملف الشخصي" />
          <LinkRow to="/auth/new-password" label="تغيير كلمة السرّ" />
          <LinkRow to="/profile/export" label="تنزيل بياناتي" />
          <LinkRow to="/profile/delete" label="حذف الحساب" />
        </Section>

        <Section title="عن التطبيق">
          <LinkRow to="/profile/about" label="عن شيلا" hint="v1.4.2" />
          <LinkRow to="/profile/terms" label="شروط الاستخدام" />
          <LinkRow to="/profile/privacy" label="سياسة الخصوصية" />
          <LinkRow to="/profile/feedback" label="أرسلي ملاحظة" />
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

function Row({ label, hint, danger }: { label: string; hint?: string; danger?: boolean }) {
  return (
    <button className="relative z-10 w-full flex items-center justify-between px-4 py-3.5 border-b border-foreground/5 last:border-b-0">
      <span className={`text-[13px] ${danger ? "text-destructive" : ""}`}>{label}</span>
      {hint ? <span className="text-[11.5px] text-foreground/55 nums">{hint}</span> : <ChevronLeft size={15} className="text-foreground/45" />}
    </button>
  );
}

function LinkRow({ to, label, hint }: { to: string; label: string; hint?: string }) {
  return (
    <Link to={to as "/"} className="relative z-10 w-full flex items-center justify-between px-4 py-3.5 border-b border-foreground/5 last:border-b-0">
      <span className="text-[13px]">{label}</span>
      {hint ? <span className="text-[11.5px] text-foreground/55">{hint}</span> : <ChevronLeft size={15} className="text-foreground/45" />}
    </Link>
  );
}
