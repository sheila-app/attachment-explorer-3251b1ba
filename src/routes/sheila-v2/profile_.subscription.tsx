import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";

export const Route = createFileRoute("/sheila-v2/profile/subscription")({ component: Sub });

function Sub() {
  return (
    <ShellV2 title="الاشتراك" back="/sheila-v2/profile" showFAB={false}>
      <div className="px-5">
        <div className="rounded-3xl p-5 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
          <Crown size={22} className="mb-2" />
          <div className="text-[11px] opacity-80">الباقة الحاليّة</div>
          <div className="font-display text-[20px] mt-1">شيلا برو — شهري</div>
          <div className="text-[11px] opacity-80 mt-2">يتجدّد في 12 أبريل 2026</div>
          <div className="text-[20px] font-display mt-3 nums">29 ر.س / شهر</div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          <div className="rounded-2xl bg-white/85 border border-border p-4 text-center">
            <div className="text-[11px] text-foreground/55">سنوي</div>
            <div className="font-display text-[18px] mt-1 nums">249 ر.س</div>
            <div className="text-[10px] text-phase-ovulation mt-0.5">وفّري 30٪</div>
          </div>
          <div className="rounded-2xl bg-white/85 border border-border p-4 text-center">
            <div className="text-[11px] text-foreground/55">عائلي</div>
            <div className="font-display text-[18px] mt-1 nums">399 ر.س</div>
            <div className="text-[10px] text-foreground/55 mt-0.5">حتّى 4 حسابات</div>
          </div>
        </div>
      </div>
    </ShellV2>
  );
}
