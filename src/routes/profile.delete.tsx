import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { GhostCTA } from "@/components/sheila/OnboardingShell";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/profile/delete")({ component: Page });

function Page() {
  const [confirm, setConfirm] = useState("");
  return (
    <FeatureShell title="حذف الحساب" back="/profile/privacy" showNav={false} variant="warm">
      <div className="px-5 pb-8 space-y-4">
        <div className="rounded-3xl p-5"
          style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 25 / 0.15), oklch(0.62 0.22 25 / 0.05))", border: "1px solid oklch(0.62 0.22 25 / 0.2)" }}>
          <AlertTriangle size={22} style={{ color: "oklch(0.55 0.22 25)" }} />
          <div className="font-display text-[18px] mt-2">سنفتقدكِ — هل أنتِ متأكّدة؟</div>
          <p className="text-[12px] text-foreground/70 mt-2 leading-relaxed">
            سيُحذف حسابكِ وكلّ بياناتكِ نهائيّاً خلال 30 يوماً. يمكنكِ استعادته خلال هذه المدّة بتسجيل الدخول.
          </p>
        </div>

        <ul className="space-y-2 text-[12px] text-foreground/70 leading-relaxed">
          <li>• سيُلغى اشتراككِ تلقائيّاً.</li>
          <li>• ستُمسح كلّ سجلّاتكِ الصحّيّة والتمارين.</li>
          <li>• لن يمكنكِ استرجاع البيانات بعد 30 يوماً.</li>
        </ul>

        <div className="glass rounded-2xl p-4">
          <div className="text-[10px] tracking-[0.18em] text-foreground/55 uppercase mb-1">أكّدي بكتابة "حذف"</div>
          <input value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="حذف"
            className="relative z-10 w-full bg-transparent text-[14px] outline-none placeholder:text-foreground/35" />
        </div>

        <button disabled={confirm !== "حذف"}
          className="w-full rounded-2xl py-4 text-white text-sm font-medium disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 25), oklch(0.5 0.2 25))" }}>
          احذفي حسابي نهائيّاً
        </button>
        <GhostCTA to="/profile/privacy">إلغاء</GhostCTA>
      </div>
    </FeatureShell>
  );
}
