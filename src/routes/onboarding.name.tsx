import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { User } from "lucide-react";

export const Route = createFileRoute("/onboarding/name")({ component: NamePage });

function NamePage() {
  const [name, setName] = useState("");
  const trimmed = name.trim();
  const valid = trimmed.length >= 2;

  return (
    <OnboardingShell
      step={1}
      total={12}
      back="/onboarding/auth"
      title="ما اسمكِ؟"
      subtitle="سنستخدم اسمكِ لتخصيص تجربتكِ مع شيلا."
      variant="warm"
      footer={
        <PrimaryCTA to={valid ? "/onboarding/dob" : undefined} disabled={!valid}>
          متابعة
        </PrimaryCTA>
      }
    >
      <div className="glass rounded-2xl px-4 h-16 flex items-center gap-3">
        <div
          className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.66 0.16 322 / 0.3), oklch(0.46 0.135 328 / 0.15))",
            boxShadow: "inset 0 1px 0 0 oklch(1 0 0 / 0.5)",
          }}
        >
          <User size={18} className="text-primary" strokeWidth={1.75} />
        </div>
        <input
          type="text"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اكتبي اسمكِ هنا"
          maxLength={40}
          className="relative z-10 flex-1 min-w-0 bg-transparent outline-none text-[15px] placeholder:text-foreground/40"
        />
      </div>

      {valid && (
        <p className="text-[12.5px] text-foreground/65 mt-4 text-center animate-rise">
          أهلاً بكِ يا <span className="text-primary font-medium">{trimmed}</span> 🌸
        </p>
      )}

      <p className="text-[11px] text-foreground/50 mt-3 text-center leading-relaxed">
        يمكنكِ تغيير الاسم لاحقاً من إعدادات الحساب.
      </p>
    </OnboardingShell>
  );
}
