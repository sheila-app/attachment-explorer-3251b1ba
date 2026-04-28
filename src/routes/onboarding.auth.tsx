import { createFileRoute, Link } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { ArrowLeft, Mail, Phone, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/onboarding/auth")({
  component: AuthPage,
});

function AuthPage() {
  return (
    <DeviceFrame>
      <div className="h-full min-h-screen flex flex-col bg-background relative">
        {/* Subtle aurora top */}
        <div className="absolute top-0 inset-x-0 h-64 opacity-60" style={{ background: "var(--gradient-aurora)" }} />

        <header className="relative px-5 pt-6 pb-4 flex items-center justify-between">
          <Link
            to="/onboarding/welcome"
            className="w-10 h-10 rounded-full bg-surface border border-border/60 flex items-center justify-center"
          >
            <ArrowRight size={18} strokeWidth={1.75} />
          </Link>
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">خطوة ١ / ١٢</span>
          <div className="w-10" />
        </header>

        <div className="relative flex-1 px-7 pt-6 animate-rise">
          <h1 className="font-display text-[28px] leading-tight">أنشئي حسابكِ</h1>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            خطوة واحدة لتبدأي رحلتكِ الذكيّة مع شيلا.
          </p>

          <div className="mt-9 space-y-2.5 stagger">
            <AuthOption icon={Mail} label="المتابعة عبر البريد" hint="moc.liame@aruon" />
            <AuthOption icon={Phone} label="المتابعة عبر الجوال" hint="٩٦٦+ ٥٠ ٠٠٠ ٠٠٠٠" />
          </div>

          <div className="my-7 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">أو</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button className="w-full px-4 py-3.5 bg-surface-warm border border-border/60 rounded-2xl text-sm text-foreground font-medium transition-transform active:scale-[0.99]">
            المتابعة كضيف
          </button>
        </div>

        <div className="relative px-7 pb-9 space-y-4">
          <Link
            to="/home"
            className="group flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-primary-foreground font-medium text-sm transition-transform active:scale-[0.98]"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            الدخول التجريبي
            <ArrowLeft size={18} strokeWidth={2} className="transition-transform group-hover:-translate-x-1" />
          </Link>
          <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
            بمتابعتكِ توافقين على <span className="text-foreground underline">شروط الاستخدام</span>
            {" "}و<span className="text-foreground underline">سياسة الخصوصية</span>
          </p>
        </div>
      </div>
    </DeviceFrame>
  );
}

function AuthOption({ icon: Icon, label, hint }: { icon: typeof Mail; label: string; hint: string }) {
  return (
    <button
      className="group w-full flex items-center gap-3 px-4 py-4 bg-card border border-border/60 rounded-2xl text-right transition-transform active:scale-[0.99]"
      style={{ boxShadow: "var(--shadow-xs)" }}
    >
      <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center shrink-0">
        <Icon size={18} className="text-primary" strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13.5px] font-medium">{label}</div>
        <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{hint}</div>
      </div>
      <ArrowLeft size={16} className="text-muted-foreground transition-transform group-hover:-translate-x-1" strokeWidth={2} />
    </button>
  );
}
