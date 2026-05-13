import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2c-2 1.5-4.6 2.4-7.3 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.2 5.2C41.3 35.7 44 30.3 44 24c0-1.3-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.365 1.43c0 1.14-.42 2.22-1.26 3.06-.84.84-1.86 1.32-3 1.26-.06-1.14.42-2.22 1.2-3.06.84-.84 2.04-1.32 3.06-1.26zM20.94 17.34c-.6 1.32-1.32 2.58-2.34 3.78-1.02 1.2-2.46 2.7-4.32 2.7-1.74 0-2.22-1.08-4.5-1.08-2.28 0-2.82 1.08-4.5 1.08-1.86 0-3.18-1.38-4.2-2.58C-1.5 17.4-.84 11.34 3.06 9.12c1.62-.96 3.18-1.5 4.86-1.5 1.74 0 2.82 1.08 4.5 1.08 1.62 0 2.58-1.08 4.5-1.08 1.5 0 3.06.84 4.2 2.22-3.66 2.04-3.06 7.32-.18 7.5z"/>
    </svg>
  );
}

export const Route = createFileRoute("/auth/login")({ component: LoginPage });

function LoginPage() {
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  return (
    <DeviceFrame>
      <div className="relative h-full flex flex-col overflow-hidden">
        <LiquidBackdrop variant="calm" />
        <header className="relative z-10 px-5 pt-6 pb-3 flex items-center">
          <Link to="/onboarding/welcome" className="glass w-10 h-10 rounded-full flex items-center justify-center">
            <ArrowRight size={17} strokeWidth={1.75} className="relative z-10" />
          </Link>
        </header>

        <div className="relative z-10 flex-1 px-7 pt-8 animate-rise">
          <h1 className="font-display text-[30px]">مرحباً بعودتكِ</h1>
          <p className="text-sm text-foreground/65 mt-2">سجّلي الدخول لمتابعة رحلتكِ.</p>

          <div className="mt-8 space-y-3">
            <Field label="البريد الإلكتروني" placeholder="noura@example.com" type="email" />
            <Field label="كلمة السرّ" placeholder="••••••••" type={show ? "text" : "password"}
              suffix={
                <button onClick={() => setShow(s => !s)} className="text-foreground/55">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-[12px]">
            <button onClick={() => setRemember(r => !r)} className="flex items-center gap-2 text-foreground/70">
              <span className={`w-4 h-4 rounded-md border ${remember ? "bg-primary border-primary" : "border-foreground/30"} flex items-center justify-center`}>
                {remember && <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" /></svg>}
              </span>
              تذكّريني
            </button>
            <Link to="/auth/forgot" className="text-primary font-medium">نسيتُ كلمة السرّ</Link>
          </div>
        </div>

        <div className="relative z-10 px-7 pb-9 space-y-3">
          <PrimaryCTA to="/home">تسجيل الدخول</PrimaryCTA>

          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">أو</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button className="w-full py-3.5 rounded-2xl border border-border bg-white/80 flex items-center justify-center gap-3 text-sm font-semibold text-foreground">
            <GoogleIcon className="w-5 h-5" />
            تسجيل الدخول بجوجل
          </button>

          <button className="w-full py-3.5 rounded-2xl border border-border bg-black flex items-center justify-center gap-3 text-sm font-semibold text-white">
            <AppleIcon className="w-5 h-5 text-white" />
            تسجيل الدخول بآبل
          </button>

          <p className="text-[12px] text-center text-foreground/65">
            ليس لديكِ حساب؟ <Link to="/onboarding/welcome" className="text-primary font-medium">ابدئي مجّاناً</Link>
          </p>
        </div>
      </div>
    </DeviceFrame>
  );
}

function Field({ label, placeholder, type, suffix }: { label: string; placeholder: string; type: string; suffix?: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl px-4 py-3">
      <label className="relative z-10 block text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-1">{label}</label>
      <div className="relative z-10 flex items-center gap-2">
        <input type={type} placeholder={placeholder}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/30 nums" />
        {suffix}
      </div>
    </div>
  );
}
