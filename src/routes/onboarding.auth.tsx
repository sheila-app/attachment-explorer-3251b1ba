import { createFileRoute, Link } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { ArrowLeft, Mail, Phone, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/onboarding/auth")({
  component: AuthPage,
});

function AuthPage() {
  return (
    <DeviceFrame>
      <div className="h-full min-h-screen flex flex-col relative overflow-hidden">
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

        <div className="relative z-10 flex-1 px-7 pt-6 animate-rise">
          <h1 className="font-display text-[28px] leading-tight">أنشئي حسابكِ</h1>
          <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
            خطوة واحدة لتبدأي رحلتكِ الذكيّة مع شيلا.
          </p>

          <div className="mt-9 space-y-3 stagger">
            <AuthOption icon={Mail} label="المتابعة عبر البريد" hint="moc.liame@aruon" />
            <AuthOption icon={Phone} label="المتابعة عبر الجوال" hint="٩٦٦+ ٥٠ ٠٠٠ ٠٠٠٠" />
          </div>

          <div className="my-7 flex items-center gap-3">
            <div className="flex-1 h-px bg-foreground/15" />
            <span className="text-[10px] tracking-[0.3em] text-foreground/60 uppercase">أو</span>
            <div className="flex-1 h-px bg-foreground/15" />
          </div>

          <button className="glass w-full px-4 py-3.5 rounded-2xl text-sm text-foreground font-medium transition-transform active:scale-[0.99]">
            <span className="relative z-10">المتابعة كضيف</span>
          </button>
        </div>

        <div className="relative z-10 px-7 pb-9 space-y-4">
          <Link
            to="/home"
            className="group relative flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-primary-foreground font-medium text-sm transition-transform active:scale-[0.98] overflow-hidden"
            style={{
              background: "var(--gradient-primary)",
              boxShadow:
                "0 12px 32px -8px oklch(0.46 0.135 328 / 0.5), inset 0 1px 0 0 oklch(1 0 0 / 0.4)",
            }}
          >
            <span
              className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, oklch(1 0 0 / 0.25), transparent)",
              }}
            />
            <span className="relative">الدخول التجريبي</span>
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

function AuthOption({
  icon: Icon,
  label,
  hint,
}: {
  icon: typeof Mail;
  label: string;
  hint: string;
}) {
  return (
    <button className="glass group w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-right transition-transform active:scale-[0.99]">
      <div
        className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.66 0.16 322 / 0.3), oklch(0.46 0.135 328 / 0.15))",
          boxShadow: "inset 0 1px 0 0 oklch(1 0 0 / 0.5)",
        }}
      >
        <Icon size={18} className="text-primary" strokeWidth={1.75} />
      </div>
      <div className="relative z-10 flex-1 min-w-0">
        <div className="text-[13.5px] font-medium">{label}</div>
        <div className="text-[11px] text-foreground/60 mt-0.5 truncate">{hint}</div>
      </div>
      <ArrowLeft
        size={16}
        className="relative z-10 text-foreground/50 transition-transform group-hover:-translate-x-1"
        strokeWidth={2}
      />
    </button>
  );
}
