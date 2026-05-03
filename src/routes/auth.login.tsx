import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { ArrowRight, Eye, EyeOff, Globe, Apple } from "lucide-react";

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
            <Globe className="w-5 h-5 text-blue-500" strokeWidth={1.75} />
            تسجيل الدخول بجوجل
          </button>

          <button className="w-full py-3.5 rounded-2xl border border-border bg-white/80 flex items-center justify-center gap-3 text-sm font-semibold text-foreground">
            <Apple className="w-5 h-5 text-foreground" strokeWidth={1.75} />
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
