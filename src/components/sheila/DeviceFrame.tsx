import type { ReactNode } from "react";

/**
 * إطار الموبايل — على الديسكتوب منصّة هادئة بإضاءة محيطة.
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
      className="min-h-screen w-full flex items-stretch justify-center md:items-center md:p-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.96 0.018 320) 0%, oklch(0.97 0.012 60) 50%, oklch(0.95 0.025 300) 100%)",
      }}
    >
      <div className="hidden md:block fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-phase-luteal/15 blur-[100px]" />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-phase-ovulation/12 blur-[100px]" />
      </div>

      <div
        className={`
          relative w-full max-w-[430px] min-h-screen md:min-h-0 md:h-[900px]
          overflow-hidden
          md:rounded-[44px]
          md:shadow-[0_50px_100px_-30px_rgba(70,30,90,0.35),0_25px_60px_-25px_rgba(70,30,90,0.2)]
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  );
}
