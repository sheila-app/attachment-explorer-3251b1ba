import type { ReactNode } from "react";

/**
 * إطار الموبايل — دائماً إطار هاتف مُعوَّم على خلفية ملوّنة.
 * rounded-[44px] و overflow-hidden مُطبَّقان دائماً (لا يعتمدان على md:).
 */
export function DeviceFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.96 0.018 320) 0%, oklch(0.97 0.012 60) 50%, oklch(0.95 0.025 300) 100%)",
      }}
    >
      {/* Ambient orbs — always visible to provide backdrop context for glass blur */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-phase-luteal/15 blur-[100px]" />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-phase-ovulation/12 blur-[100px]" />
      </div>

      <div
        className={`
          relative w-full max-w-[430px]
          h-[calc(100dvh-2rem)] md:h-[900px]
          overflow-hidden
          rounded-[44px]
          shadow-[0_50px_100px_-30px_rgba(70,30,90,0.35),0_25px_60px_-25px_rgba(70,30,90,0.2)]
          ring-1 ring-black/10
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  );
}
