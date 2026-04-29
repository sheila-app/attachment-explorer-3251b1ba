import { createFileRoute, Link } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { ArrowRight, Mail } from "lucide-react";

export const Route = createFileRoute("/auth/forgot")({ component: ForgotPage });

function ForgotPage() {
  return (
    <DeviceFrame>
      <div className="relative h-full min-h-screen flex flex-col overflow-hidden">
        <LiquidBackdrop variant="calm" />
        <header className="relative z-10 px-5 pt-6 pb-3 flex items-center">
          <Link to="/auth/login" className="glass w-10 h-10 rounded-full flex items-center justify-center">
            <ArrowRight size={17} strokeWidth={1.75} className="relative z-10" />
          </Link>
        </header>

        <div className="relative z-10 flex-1 px-7 pt-6 animate-rise">
          <div className="glass-strong w-14 h-14 rounded-2xl flex items-center justify-center">
            <Mail size={22} className="relative z-10 text-primary" strokeWidth={1.75} />
          </div>
          <h1 className="font-display text-[26px] mt-5">إعادة تعيين كلمة السرّ</h1>
          <p className="text-sm text-foreground/65 mt-2">سنرسل لكِ رمز تحقّق على بريدكِ.</p>

          <div className="mt-7 glass rounded-2xl px-4 py-3">
            <label className="relative z-10 block text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-1">البريد الإلكتروني</label>
            <input type="email" placeholder="noura@example.com"
              className="relative z-10 w-full bg-transparent text-sm outline-none placeholder:text-foreground/30 nums" />
          </div>
        </div>

        <div className="relative z-10 px-7 pb-9">
          <PrimaryCTA to="/auth/otp">إرسال الرمز</PrimaryCTA>
        </div>
      </div>
    </DeviceFrame>
  );
}
