import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { OnboardingShell, PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { User, Sparkles } from "lucide-react";

export const Route = createFileRoute("/onboarding/name")({ component: NamePage });

const SUGGESTIONS = ["سارة", "نور", "ريم", "ليلى", "هدى"];

function NamePage() {
  const [name, setName] = useState("");
  const trimmed = name.trim();
  const valid = trimmed.length >= 2;

  const initial = useMemo(() => (trimmed ? trimmed[0] : ""), [trimmed]);

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
      {/* بطاقة المعاينة التفاعلية */}
      <div
        className="relative rounded-3xl p-6 mb-5 overflow-hidden text-center transition-all duration-500"
        style={{
          background: valid
            ? "linear-gradient(135deg, oklch(0.66 0.16 322 / 0.18), oklch(0.46 0.135 328 / 0.08))"
            : "oklch(0.96 0.01 320 / 0.5)",
          boxShadow: valid
            ? "inset 0 1px 0 0 oklch(1 0 0 / 0.6), 0 12px 32px -16px oklch(0.46 0.135 328 / 0.35)"
            : "inset 0 1px 0 0 oklch(1 0 0 / 0.4)",
        }}
      >
        {/* أفاتار بالحرف الأول */}
        <div
          className="mx-auto w-20 h-20 rounded-full flex items-center justify-center text-3xl font-display transition-transform duration-500"
          style={{
            background: "var(--gradient-primary)",
            color: "white",
            transform: valid ? "scale(1)" : "scale(0.85)",
            opacity: valid ? 1 : 0.5,
            boxShadow: "0 10px 28px -10px oklch(0.46 0.135 328 / 0.45)",
          }}
        >
          {initial || <User size={28} strokeWidth={1.75} />}
        </div>

        {/* عبارة الترحيب المتغيّرة */}
        <div className="mt-4 h-6 flex items-center justify-center">
          {valid ? (
            <p className="text-[14px] font-medium text-foreground/85 animate-rise">
              يسعدنا انضمامكِ لعائلة شيلا
            </p>
          ) : (
            <p className="text-[12.5px] text-foreground/45 flex items-center gap-1.5">
              <Sparkles size={13} className="text-primary/60" />
              اكتبي اسمكِ لتري المعاينة
            </p>
          )}
        </div>
      </div>

      {/* حقل الإدخال */}
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
        {trimmed && (
          <span className="relative z-10 text-[11px] text-foreground/45 nums tabular-nums shrink-0">
            {trimmed.length}
          </span>
        )}
      </div>

      <p className="text-[11px] text-foreground/50 mt-5 text-center leading-relaxed">
        يمكنكِ تغيير الاسم لاحقاً من إعدادات الحساب.
      </p>
    </OnboardingShell>
  );
}
