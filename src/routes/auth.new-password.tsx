import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/auth/new-password")({ component: NewPwPage });

function NewPwPage() {
  const [show, setShow] = useState(false);
  return (
    <DeviceFrame>
      <div className="relative h-full min-h-screen flex flex-col overflow-hidden">
        <LiquidBackdrop variant="calm" />
        <header className="relative z-10 px-5 pt-6 pb-3 flex items-center">
          <Link to="/auth/otp" className="glass w-10 h-10 rounded-full flex items-center justify-center">
            <ArrowRight size={17} strokeWidth={1.75} className="relative z-10" />
          </Link>
        </header>

        <div className="relative z-10 flex-1 px-7 pt-6 animate-rise">
          <h1 className="font-display text-[26px]">كلمة سرّ جديدة</h1>
          <p className="text-sm text-foreground/65 mt-2">يجب أن تكون 8 أحرف على الأقل، تحوي رقماً وحرفاً كبيراً.</p>

          <div className="mt-7 space-y-3">
            <PwField label="كلمة السرّ الجديدة" show={show} setShow={setShow} />
            <PwField label="تأكيد كلمة السرّ" show={show} setShow={setShow} />
          </div>

          <div className="mt-4 flex gap-1 nums">
            <span className="flex-1 h-1 rounded-full bg-phase-follicular" />
            <span className="flex-1 h-1 rounded-full bg-phase-follicular" />
            <span className="flex-1 h-1 rounded-full bg-phase-follicular" />
            <span className="flex-1 h-1 rounded-full bg-foreground/15" />
          </div>
          <p className="text-[11px] text-phase-follicular-deep mt-2">قوّة كلمة السرّ: قويّة</p>
        </div>

        <div className="relative z-10 px-7 pb-9">
          <PrimaryCTA to="/auth/login">حفظ كلمة السرّ</PrimaryCTA>
        </div>
      </div>
    </DeviceFrame>
  );
}

function PwField({ label, show, setShow }: { label: string; show: boolean; setShow: (v: boolean) => void }) {
  return (
    <div className="glass rounded-2xl px-4 py-3">
      <label className="relative z-10 block text-[10px] tracking-[0.2em] text-foreground/55 uppercase mb-1">{label}</label>
      <div className="relative z-10 flex items-center gap-2">
        <input type={show ? "text" : "password"} placeholder="••••••••"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/30 nums" />
        <button onClick={() => setShow(!show)} className="text-foreground/55">
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
