import { Link } from "@tanstack/react-router";
import { Sparkles, Plus, Barcode, BookOpen, Search, Camera, Check } from "lucide-react";
import type { ComponentType } from "react";

/**
 * بطاقة وجبة — هيكل فقط (هيدر + اقتراح شيلا + CTA + ٦ أزرار سريعة)
 * مع اعتماد كامل على نظام تصميم SHEILA (glass + primary + tokens).
 */

export interface MealCardProps {
  type: string;
  time: string;
  mealId: string;
  mealName: string;
  cal: number;
  protein: number;
  /** غير مستخدم بصرياً — مُبقى للتوافق */
  tint?: string;
  logged?: boolean;
  onLog?: () => void;
  onSheila?: () => void;
  onIngredients?: () => void;
  onBarcode?: () => void;
  onLibrary?: () => void;
  onSearch?: () => void;
  onPhoto?: () => void;
}

export function MealCard({
  type, time, mealId, mealName, cal, protein, logged = false,
  onLog, onSheila, onIngredients, onBarcode, onLibrary, onSearch, onPhoto,
}: MealCardProps) {
  return (
    <div className="rounded-3xl bg-card border border-border p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10.5px] text-foreground/50 nums" suppressHydrationWarning>{time}</div>
        <div className="font-display text-[14px]">{type}</div>
      </div>

      {/* اقتراح شيلا */}
      <Link
        to="/sheila-v2/nutrition/meal/$id"
        params={{ id: mealId }}
        className="block rounded-2xl p-3.5 mb-3 bg-primary-soft border border-primary/15 active:scale-[0.99] transition-transform"
      >
        <div className="flex items-center justify-end gap-1 mb-1">
          <span className="text-[11px] font-semibold text-primary">اقتراح شيلا</span>
          <Sparkles size={12} className="text-primary" strokeWidth={2.2} />
        </div>
        <div className="text-[15px] font-semibold text-right leading-snug">{mealName}</div>
        <div className="text-[11px] text-foreground/55 text-right mt-1 nums">
          {cal} سعرة • {protein}غ بروتين
        </div>
      </Link>

      {/* CTA */}
      {logged ? (
        <div
          aria-disabled
          className="w-full rounded-2xl py-3.5 mb-3 flex items-center justify-center gap-2 text-[13px] font-semibold text-primary bg-primary/10 border border-primary/25"
        >
          <Check size={16} strokeWidth={2.5} /> مسجّلة
        </div>
      ) : (
        <button
          onClick={onLog}
          className="w-full rounded-2xl py-3.5 mb-3 text-[13px] font-semibold text-primary-foreground active:scale-[0.99] transition-transform shadow-sm"
          style={{ background: "var(--gradient-primary, var(--primary))" }}
        >
          سجّلي هذا
        </button>
      )}

      {/* Quick actions grid */}
      <div className="grid grid-cols-6 gap-1.5">
        <MealQuickBtn icon={Sparkles} label="شيلا" onClick={onSheila} />
        <MealQuickBtn icon={Plus} label="مكوّنات" onClick={onIngredients} />
        <MealQuickBtn icon={Barcode} label="باركود" onClick={onBarcode} />
        <MealQuickBtn icon={BookOpen} label="المكتبة" onClick={onLibrary} />
        <MealQuickBtn icon={Search} label="ابحثي" onClick={onSearch} />
        <MealQuickBtn icon={Camera} label="صوّري" onClick={onPhoto} />
      </div>
    </div>
  );
}

function MealQuickBtn({ icon: Icon, label, onClick }: { icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl bg-secondary/50 border border-border py-2 flex flex-col items-center gap-1 text-[10px] text-foreground/70 active:scale-95 transition-transform"
    >
      <Icon size={14} strokeWidth={1.8} className="text-foreground/75" />
      <span>{label}</span>
    </button>
  );
}
