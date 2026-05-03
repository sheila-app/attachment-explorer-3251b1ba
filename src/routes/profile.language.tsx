import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { Check, RefreshCw, Globe } from "lucide-react";

export const Route = createFileRoute("/profile/language")({ component: Page });

const LANGS = [
  { id: "ar", code: "ع", native: "العربيّة", arabic: "Arabic", isCurrent: true },
  { id: "en", code: "En", native: "English", arabic: "الإنجليزيّة", isCurrent: false },
  { id: "fr", code: "Fr", native: "Français", arabic: "الفرنسيّة", isCurrent: false },
  { id: "tr", code: "Tr", native: "Türkçe", arabic: "التركيّة", isCurrent: false },
  { id: "ur", code: "اردو", native: "اردو", arabic: "الأرديّة", isCurrent: false },
  { id: "ms", code: "Ms", native: "Bahasa Melayu", arabic: "الملايويّة", isCurrent: false },
];

function Page() {
  const [lang, setLang] = useState("ar");
  const changed = lang !== "ar";

  return (
    <FeatureShell title="اللغة" back="/profile/settings" showNav={false} variant="calm">
      <div className="px-5 pb-8">
        {/* current indicator */}
        <div className="glass rounded-2xl p-4 mb-5 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "var(--primary-soft)" }}
          >
            <Globe size={18} className="text-primary" strokeWidth={1.75} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11.5px] text-foreground/60">اللغة الحاليّة للتطبيق</p>
            <p className="text-[14px] font-medium mt-0.5">العربيّة</p>
          </div>
        </div>

        <p className="text-[11px] text-foreground/50 tracking-[0.15em] uppercase px-1 mb-3">
          اختاري لغة
        </p>

        <div className="space-y-2.5 stagger">
          {LANGS.map((l) => {
            const active = lang === l.id;
            return (
              <button
                key={l.id}
                onClick={() => setLang(l.id)}
                className="w-full text-right transition-all active:scale-[0.99]"
              >
                <div
                  className="glass rounded-2xl p-4 flex items-center gap-4"
                  style={
                    active
                      ? {
                          boxShadow:
                            "inset 0 0 0 1.5px var(--primary), 0 4px 16px -6px oklch(0.46 0.135 328 / 0.25)",
                          background: "var(--primary-soft)",
                        }
                      : undefined
                  }
                >
                  <div className="relative z-10 w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-medium text-[13px]" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>{l.code}</div>

                  <div className="relative z-10 flex-1 min-w-0">
                    <p className="text-[15px] font-medium leading-tight">{l.native}</p>
                    <p className="text-[11.5px] text-foreground/55 mt-0.5">{l.arabic}</p>
                  </div>

                  <div className="relative z-10 shrink-0">
                    {active ? (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: "var(--primary)" }}
                      >
                        <Check size={13} className="text-white" strokeWidth={2.5} />
                      </div>
                    ) : l.isCurrent ? (
                      <span className="text-[9.5px] px-2 py-0.5 rounded-full text-primary border border-primary/30">
                        الحاليّة
                      </span>
                    ) : null}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {changed && (
          <div className="mt-5 glass rounded-2xl p-4 flex items-start gap-3 animate-rise">
            <RefreshCw size={14} className="text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
            <p className="text-[12px] text-foreground/70 leading-relaxed">
              تغيير اللغة يتطلّب إعادة تشغيل التطبيق حتى يسري التغيير على جميع الشاشات.
            </p>
          </div>
        )}

        <div className="mt-6">
          <Link
            to="/profile/settings"
            className="block w-full bg-primary text-primary-foreground rounded-full py-3.5 font-semibold text-center text-[15px]"
          >
            {changed ? "حفظ وإعادة التشغيل" : "تأكيد"}
          </Link>
        </div>
      </div>
    </FeatureShell>
  );
}
