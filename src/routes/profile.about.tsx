import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/profile/about")({ component: Page });

function Page() {
  const links = [
    { t: "شروط الاستخدام", to: "/profile/terms" },
    { t: "سياسة الخصوصيّة", to: "/profile/privacy" },
    { t: "تراخيص مفتوحة المصدر", to: "/profile/about" },
    { t: "تواصلي معنا", to: "/profile/help" },
  ];
  return (
    <FeatureShell title="عن شيلا" back="/profile" showNav={false} variant="default">
      <div className="px-5 pb-8 space-y-5">
        <div className="glass-strong rounded-3xl p-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3"
            style={{ background: "var(--gradient-primary)" }}>
            <Heart size={28} className="text-white" fill="white" />
          </div>
          <div className="font-display text-[22px]">شيلا</div>
          <div className="text-[11px] text-foreground/55 nums">الإصدار 1.4.2 (build 240)</div>
          <p className="text-[12px] text-foreground/65 mt-3 leading-relaxed">رفيقتكِ في رحلة الصحّة واللّياقة، مصمّمة بحبّ للمرأة العربيّة.</p>
        </div>

        <div className="glass rounded-2xl divide-y divide-foreground/5 overflow-hidden">
          {links.map(l => (
            <Link key={l.t} to={l.to as "/"} className="relative z-10 flex items-center justify-between px-4 py-3.5 text-[13px]">
              <span>{l.t}</span>
              <span className="text-foreground/40">›</span>
            </Link>
          ))}
        </div>

        <p className="text-center text-[10.5px] text-foreground/45">صُنع بـ ♡ في الرياض</p>
      </div>
    </FeatureShell>
  );
}
