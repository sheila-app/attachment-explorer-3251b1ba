/**
 * رسومات عائمة دقيقة — أشكال هندسيّة، نقاط، وخطوط متموّجة تمنح التصميم حياة.
 * كلها SVG خفيفة الوزن مع حركات لطيفة. لا تتدخّل مع التفاعل (pointer-events: none).
 */
export function FloatingDoodles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
      {/* خطّ متموّج علوي */}
      <svg
        className="absolute top-12 -right-6 opacity-40 animate-doodle-drift"
        width="140"
        height="40"
        viewBox="0 0 140 40"
        fill="none"
      >
        <path
          d="M2 20 Q 20 4, 40 20 T 80 20 T 120 20 T 138 20"
          stroke="var(--primary-glow)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* نقاط متناثرة */}
      <svg
        className="absolute top-24 left-4 opacity-50 animate-doodle-spin"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
      >
        {[...Array(6)].map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={30 + Math.cos(a) * 22}
              cy={30 + Math.sin(a) * 22}
              r={i % 2 ? 1.4 : 2.2}
              fill="var(--phase-ovulation)"
            />
          );
        })}
      </svg>

      {/* مثلّث منقّط */}
      <svg
        className="absolute top-1/3 -left-2 opacity-35 animate-doodle-float"
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
      >
        <path
          d="M35 8 L60 56 L10 56 Z"
          stroke="var(--phase-luteal)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          fill="none"
        />
      </svg>

      {/* قوس + نجمة صغيرة */}
      <svg
        className="absolute bottom-40 right-6 opacity-45 animate-doodle-float-rev"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
      >
        <path
          d="M10 60 Q 40 10, 70 60"
          stroke="var(--phase-follicular)"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M40 18 L42 24 L48 25 L43 29 L45 35 L40 32 L35 35 L37 29 L32 25 L38 24 Z"
          fill="var(--phase-ovulation)"
          opacity="0.6"
        />
      </svg>

      {/* دائرة فارغة كبيرة بخطّ رفيع */}
      <svg
        className="absolute -bottom-10 -left-10 opacity-25 animate-doodle-spin-slow"
        width="180"
        height="180"
        viewBox="0 0 180 180"
        fill="none"
      >
        <circle cx="90" cy="90" r="80" stroke="var(--primary)" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="90" cy="90" r="60" stroke="var(--primary-glow)" strokeWidth="0.8" strokeDasharray="1 4" />
      </svg>
    </div>
  );
}
