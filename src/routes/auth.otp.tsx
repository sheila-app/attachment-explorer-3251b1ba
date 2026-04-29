import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth/otp")({ component: OtpPage });

function OtpPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [cooldown, setCooldown] = useState(45);
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  return (
    <DeviceFrame>
      <div className="relative h-full min-h-screen flex flex-col overflow-hidden">
        <LiquidBackdrop variant="calm" />
        <header className="relative z-10 px-5 pt-6 pb-3 flex items-center">
          <Link to="/auth/forgot" className="glass w-10 h-10 rounded-full flex items-center justify-center">
            <ArrowRight size={17} strokeWidth={1.75} className="relative z-10" />
          </Link>
        </header>

        <div className="relative z-10 flex-1 px-7 pt-6 animate-rise">
          <h1 className="font-display text-[26px]">رمز التحقّق</h1>
          <p className="text-sm text-foreground/65 mt-2">أدخلي الرمز المكوّن من 6 أرقام المُرسل إلى <span className="text-foreground nums">noura@example.com</span></p>

          <div className="mt-8 flex justify-between gap-2 nums" dir="ltr">
            {code.map((c, i) => (
              <input key={i} value={c} maxLength={1}
                onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); const arr = [...code]; arr[i] = v; setCode(arr); }}
                className="glass w-12 h-14 rounded-2xl text-center font-display text-2xl text-primary outline-none focus:ring-2 focus:ring-primary"
                inputMode="numeric"
              />
            ))}
          </div>

          <div className="mt-6 text-center text-[12px] text-foreground/65">
            {cooldown > 0 ? (
              <>إعادة الإرسال خلال <span className="text-primary font-medium nums">{cooldown}</span> ث</>
            ) : (
              <button onClick={() => setCooldown(45)} className="text-primary font-medium">إعادة إرسال الرمز</button>
            )}
          </div>
        </div>

        <div className="relative z-10 px-7 pb-9">
          <PrimaryCTA to="/auth/new-password">تأكيد</PrimaryCTA>
        </div>
      </div>
    </DeviceFrame>
  );
}
