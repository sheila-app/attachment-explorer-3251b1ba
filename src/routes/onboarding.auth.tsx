import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { ArrowLeft, ArrowRight, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/onboarding/auth")({
  component: AuthPage,
});

function AuthPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const valid =
    email.trim().length > 3 &&
    phone.trim().length >= 8 &&
    password.length >= 6 &&
    password === confirm;

  return (
    <DeviceFrame>
      <div className="h-full flex flex-col relative overflow-hidden">
        <LiquidBackdrop variant="calm" />

        <header className="relative z-10 px-5 pt-6 pb-4 flex items-center justify-between">
          <Link
            to="/onboarding/welcome"
            className="glass w-10 h-10 rounded-full flex items-center justify-center"
          >
            <ArrowRight size={18} strokeWidth={1.75} className="relative z-10" />
          </Link>
          <span className="glass px-3 py-1.5 rounded-full text-[10px] tracking-[0.3em] text-foreground/70 uppercase">
            <span className="relative z-10">خطوة ١ / ١٢</span>
          </span>
          <div className="w-10" />
        </header>

        <div className="relative z-10 flex-1 px-7 pt-4 pb-2 overflow-y-auto no-scrollbar animate-rise">
          <h1 className="font-display text-[28px] leading-tight">أنشئي حسابكِ</h1>
          <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
            خطوة واحدة لتبدأي رحلتكِ الذكيّة مع شيلا.
          </p>

          <div className="mt-6 space-y-3 stagger">
            <Field
              icon={Mail}
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={setEmail}
              dir="ltr"
            />
            <Field
              icon={Phone}
              type="tel"
              placeholder="رقم الجوال"
              value={phone}
              onChange={setPhone}
              dir="ltr"
            />
            <Field
              icon={Lock}
              type={showPwd ? "text" : "password"}
              placeholder="كلمة المرور"
              value={password}
              onChange={setPassword}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="text-foreground/55"
                  aria-label="إظهار كلمة المرور"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
            <Field
              icon={Lock}
              type={showConfirm ? "text" : "password"}
              placeholder="تأكيد كلمة المرور"
              value={confirm}
              onChange={setConfirm}
              error={confirm.length > 0 && confirm !== password ? "كلمة المرور غير مطابقة" : undefined}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="text-foreground/55"
                  aria-label="إظهار تأكيد كلمة المرور"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-foreground/15" />
            <span className="text-[10px] tracking-[0.3em] text-foreground/60 uppercase">أو</span>
            <div className="flex-1 h-px bg-foreground/15" />
          </div>

          <div className="space-y-3 stagger">
            <SocialButton provider="apple" label="المتابعة باستخدام Apple" />
            <SocialButton provider="google" label="المتابعة باستخدام Google" />
          </div>
        </div>

        <div className="relative z-10 px-7 pb-8 pt-3 space-y-3">
          <Link
            to="/home"
            className="group relative flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-primary-foreground font-medium text-sm transition-transform active:scale-[0.98] overflow-hidden"
            style={{
              background: "var(--gradient-primary)",
              boxShadow:
                "0 12px 32px -8px oklch(0.46 0.135 328 / 0.5), inset 0 1px 0 0 oklch(1 0 0 / 0.4)",
              opacity: valid ? 1 : 0.5,
              pointerEvents: valid ? "auto" : "none",
            }}
          >
            <span
              className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl pointer-events-none"
              style={{
                background: "linear-gradient(180deg, oklch(1 0 0 / 0.25), transparent)",
              }}
            />
            <span className="relative">إنشاء الحساب</span>
            <ArrowLeft
              size={18}
              strokeWidth={2}
              className="relative transition-transform group-hover:-translate-x-1"
            />
          </Link>
          <p className="text-[11px] text-center text-foreground/60 leading-relaxed">
            بمتابعتكِ توافقين على{" "}
            <span className="text-foreground underline">شروط الاستخدام</span> و
            <span className="text-foreground underline">سياسة الخصوصية</span>
          </p>
        </div>
      </div>
    </DeviceFrame>
  );
}

function Field({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  dir,
  trailing,
  error,
}: {
  icon: typeof Mail;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  dir?: "ltr" | "rtl";
  trailing?: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <div
        className="glass w-full flex items-center gap-3 px-4 h-14 rounded-2xl"
        style={error ? { boxShadow: "0 0 0 1px oklch(0.6 0.2 25 / 0.5)" } : undefined}
      >
        <div
          className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.66 0.16 322 / 0.3), oklch(0.46 0.135 328 / 0.15))",
            boxShadow: "inset 0 1px 0 0 oklch(1 0 0 / 0.5)",
          }}
        >
          <Icon size={16} className="text-primary" strokeWidth={1.75} />
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          dir={dir}
          className="relative z-10 flex-1 min-w-0 bg-transparent outline-none text-[13.5px] placeholder:text-foreground/45"
        />
        {trailing && <div className="relative z-10 shrink-0">{trailing}</div>}
      </div>
      {error && (
        <p className="text-[11px] text-destructive/90 mt-1.5 ps-2">{error}</p>
      )}
    </div>
  );
}

function SocialButton({
  provider,
  label,
}: {
  provider: "apple" | "google";
  label: string;
}) {
  return (
    <button
      type="button"
      className="glass w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl text-[13.5px] font-medium transition-transform active:scale-[0.99]"
    >
      <span className="relative z-10 flex items-center gap-3">
        {provider === "apple" ? <AppleIcon /> : <GoogleIcon />}
        <span>{label}</span>
      </span>
    </button>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.42 2.21-1.12 3.03-.79.92-2.06 1.63-3.18 1.55-.13-1.1.45-2.27 1.13-3.05.78-.91 2.13-1.6 3.17-1.53zm3.36 17.18c-.51 1.13-.76 1.64-1.41 2.65-.92 1.42-2.21 3.18-3.81 3.2-1.42.01-1.79-.92-3.72-.91-1.93.01-2.34.93-3.76.91-1.6-.02-2.83-1.62-3.75-3.04C1.62 18.05.78 13.81 2.83 11.06c1.18-1.59 3.04-2.6 4.79-2.6 1.78 0 2.9 1 4.36 1 1.42 0 2.28-1 4.34-1 1.55 0 3.2.85 4.37 2.31-3.85 2.11-3.22 7.62-1.96 7.84z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  );
}
