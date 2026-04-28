/**
 * خلفيّة سائلة — كرات لونيّة عائمة بضبابيّة عالية تُحاكي زجاج iOS.
 * تمنح الطبقات الزجاجيّة أعلاها العمق والحياة.
 */
export function LiquidBackdrop({
  variant = "default",
}: {
  variant?: "default" | "warm" | "calm" | "energetic";
}) {
  const palettes = {
    default: [
      { color: "var(--primary)", size: 380, top: "-8%", left: "-12%", opacity: 0.55 },
      { color: "var(--phase-ovulation)", size: 320, top: "30%", right: "-15%", opacity: 0.45 },
      { color: "var(--phase-luteal)", size: 360, bottom: "-10%", left: "20%", opacity: 0.5 },
    ],
    warm: [
      { color: "var(--phase-menstrual)", size: 360, top: "-10%", right: "-10%", opacity: 0.5 },
      { color: "var(--phase-ovulation)", size: 320, top: "40%", left: "-15%", opacity: 0.45 },
      { color: "var(--primary-glow)", size: 340, bottom: "-12%", right: "10%", opacity: 0.4 },
    ],
    calm: [
      { color: "var(--phase-luteal)", size: 380, top: "-5%", left: "-10%", opacity: 0.5 },
      { color: "var(--primary)", size: 320, bottom: "-10%", right: "-12%", opacity: 0.45 },
      { color: "var(--phase-follicular)", size: 280, top: "50%", left: "30%", opacity: 0.35 },
    ],
    energetic: [
      { color: "var(--phase-follicular)", size: 360, top: "-8%", right: "-10%", opacity: 0.55 },
      { color: "var(--phase-ovulation)", size: 340, top: "40%", left: "-15%", opacity: 0.5 },
      { color: "var(--primary-glow)", size: 320, bottom: "-10%", right: "10%", opacity: 0.45 },
    ],
  };

  return (
    <div className="liquid-bg absolute inset-0 -z-0">
      {palettes[variant].map((b, i) => (
        <span
          key={i}
          className="blob"
          style={{
            background: b.color,
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            opacity: b.opacity,
            animationDelay: `${i * 3}s`,
          }}
        />
      ))}
      {/* Subtle noise overlay for grain */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
