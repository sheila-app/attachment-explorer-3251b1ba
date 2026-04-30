import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { OptionCard, PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { Sun, Moon, Smartphone } from "lucide-react";

export const Route = createFileRoute("/profile/theme")({ component: Page });

function Page() {
  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState("rose");
  const accents = [
    { id: "rose", c: "oklch(0.66 0.16 322)", n: "وردي" },
    { id: "lavender", c: "oklch(0.7 0.1 290)", n: "خزامي" },
    { id: "peach", c: "oklch(0.78 0.13 50)", n: "خوخي" },
    { id: "mint", c: "oklch(0.78 0.1 165)", n: "نعناعي" },
    { id: "sky", c: "oklch(0.72 0.12 230)", n: "سمائي" },
  ];
  return (
    <FeatureShell title="المظهر" back="/profile/settings" showNav={false} variant="calm">
      <div className="px-5 pb-8 space-y-5">
        <div>
          <h2 className="text-sm font-medium mb-2 px-1">السمة</h2>
          <div className="space-y-2">
            <OptionCard title="فاتحة" selected={theme === "light"} onClick={() => setTheme("light")} leading={<Sun size={17} className="text-primary" />} />
            <OptionCard title="داكنة" selected={theme === "dark"} onClick={() => setTheme("dark")} leading={<Moon size={17} className="text-primary" />} />
            <OptionCard title="حسب النظام" selected={theme === "system"} onClick={() => setTheme("system")} leading={<Smartphone size={17} className="text-primary" />} />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium mb-2 px-1">اللون المميّز</h2>
          <div className="glass rounded-2xl p-4 flex justify-between gap-2">
            {accents.map(a => (
              <button key={a.id} onClick={() => setAccent(a.id)}
                className="relative z-10 flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full" style={{ background: a.c, boxShadow: accent === a.id ? `0 0 0 3px white, 0 0 0 5px ${a.c}` : undefined }} />
                <span className="text-[10px] text-foreground/65">{a.n}</span>
              </button>
            ))}
          </div>
        </div>

        <PrimaryCTA to="/profile/settings">حفظ</PrimaryCTA>
      </div>
    </FeatureShell>
  );
}
