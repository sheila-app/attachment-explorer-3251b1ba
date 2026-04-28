import { createFileRoute, Link } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { ChevronRight, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/onboarding/auth")({
  component: AuthPage,
});

function AuthPage() {
  return (
    <DeviceFrame>
      <div className="h-screen flex flex-col bg-background">
        <header className="px-5 pt-6 pb-4 flex items-center">
          <Link to="/onboarding/welcome" className="text-muted-foreground">
            <ChevronRight size={22} />
          </Link>
        </header>

        <div className="flex-1 px-6 pt-4">
          <h1 className="font-display text-2xl">أنشئي حسابكِ</h1>
          <p className="text-sm text-muted-foreground mt-2">
            خطوة واحدة لتبدأي رحلتكِ مع شيلا.
          </p>

          <div className="mt-8 space-y-3">
            <button className="w-full flex items-center gap-3 px-4 py-4 bg-card border border-border rounded-2xl text-right">
              <Mail size={20} className="text-primary" strokeWidth={1.75} />
              <span className="text-sm">المتابعة عبر البريد الإلكتروني</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-4 bg-card border border-border rounded-2xl text-right">
              <Phone size={20} className="text-primary" strokeWidth={1.75} />
              <span className="text-sm">المتابعة عبر رقم الجوال</span>
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">أو</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button className="w-full px-4 py-3.5 bg-surface border border-border rounded-2xl text-sm text-foreground">
            المتابعة كضيف
          </button>
        </div>

        <div className="px-6 pb-10 space-y-3">
          <Link
            to="/home"
            className="block w-full text-center bg-gradient-to-r from-primary to-primary-glow text-primary-foreground py-4 rounded-2xl font-medium shadow-lg shadow-primary/25"
          >
            الدخول التجريبي
          </Link>
          <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
            بمتابعتكِ فإنّكِ توافقين على شروط الاستخدام وسياسة الخصوصية
          </p>
        </div>
      </div>
    </DeviceFrame>
  );
}
