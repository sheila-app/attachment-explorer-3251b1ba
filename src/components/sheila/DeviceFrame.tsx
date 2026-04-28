import type { ReactNode } from "react";

/**
 * إطار جهاز الموبايل — يحدّ المحتوى بعرض 430px على الشاشات الكبيرة
 * مع خلفية رمادية فاتحة لإبراز نموذج الموبايل.
 */
export function DeviceFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-muted/60 to-muted/30 flex items-stretch justify-center">
      <div
        className={`w-full max-w-[430px] min-h-screen bg-background shadow-[0_0_60px_-20px_rgba(139,71,137,0.25)] relative overflow-hidden ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
