import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA, OptionCard } from "@/components/sheila/OnboardingShell";

export const Route = createFileRoute("/profile/language")({ component: Page });

function Page() {
  const [lang, setLang] = useState("ar");
  const langs = [
    { id: "ar", t: "العربيّة", h: "Arabic" },
    { id: "en", t: "English", h: "الإنجليزية" },
    { id: "fr", t: "Français", h: "الفرنسية" },
    { id: "tr", t: "Türkçe", h: "التركية" },
    { id: "ur", t: "اردو", h: "Urdu" },
  ];
  return (
    <FeatureShell title="اللغة" back="/profile/settings" showNav={false} variant="calm">
      <div className="px-5 pb-8 space-y-3">
        {langs.map(l => (
          <OptionCard key={l.id} title={l.t} hint={l.h} selected={lang === l.id} onClick={() => setLang(l.id)} />
        ))}
        <PrimaryCTA to="/profile/settings">حفظ</PrimaryCTA>
      </div>
    </FeatureShell>
  );
}
