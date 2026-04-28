import type { ReactNode } from "react";

/**
 * إطار الموبايل — على الديسكتوب يُحاط بمنصّة هادئة تُبرز الجهاز كقطعة فنّية.
 * على الموبايل: يملأ الشاشة بالكامل دون إطار.
 */
export function DeviceFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen w-full bg-muted flex items-stretch justify-center md:items-center md:p-8">
      {/* Ambient backdrop on desktop */}
      <div className="hidden md:block fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-phase-luteal/5 blur-3xl" />
      </div>

      <div
        className={`
          relative w-full max-w-[430px] min-h-screen md:min-h-0 md:h-[900px]
          bg-background overflow-hidden
          md:rounded-[44px] md:border md:border-border/40
          md:shadow-[0_40px_80px_-30px_rgba(70,30,90,0.25),0_20px_50px_-20px_rgba(70,30,90,0.15)]
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  );
}
