import { createFileRoute, Link } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";

export const Route = createFileRoute("/onboarding/welcome")({
  component: WelcomePage,
});

function WelcomePage() {
  return (
    <DeviceFrame>
      <div className="relative h-screen flex flex-col bg-gradient-to-b from-primary-soft/60 to-background">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/10 blur-3xl -translate-y-20 translate-x-10" />
        <div className="absolute bottom-40 left-0 w-60 h-60 rounded-full bg-phase-luteal/10 blur-3xl" />

        <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 text-center">
          {/* Abstract illustration */}
          <div className="relative w-56 h-56 mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/30" />
            <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-phase-ovulation/20 to-phase-follicular/20" />
            <div className="absolute inset-14 rounded-full bg-surface flex items-center justify-center">
              <svg viewBox="0 0 64 64" className="w-20 h-20 text-primary" fill="none">
                <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                <circle cx="32" cy="32" r="8" fill="currentColor" />
              </svg>
            </div>
          </div>

          <h1 className="font-display text-3xl text-foreground leading-tight">
            أهلاً بكِ في <span className="text-primary">شيلا</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-xs">
            رفيقتكِ الذكيّة لتتبّع دورتكِ، لياقتكِ، وتغذيتكِ — بأسلوب يفهم جسمكِ ومراحله.
          </p>
        </div>

        <div className="px-6 pb-10 space-y-3 relative z-10">
          <Link
            to="/onboarding/auth"
            className="block w-full text-center bg-gradient-to-r from-primary to-primary-glow text-primary-foreground py-4 rounded-2xl font-medium shadow-lg shadow-primary/25"
          >
            ابدئي رحلتكِ
          </Link>
          <Link
            to="/screens"
            className="block w-full text-center text-sm text-muted-foreground py-2"
          >
            عرض جميع الشاشات
          </Link>
        </div>
      </div>
    </DeviceFrame>
  );
}
