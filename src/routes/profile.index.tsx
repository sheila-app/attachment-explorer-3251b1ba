import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockUser } from "@/data/mock";
import { Settings, ChevronLeft, Crown, Bell, Shield, HelpCircle, LogOut, Edit3, Ruler, Users, Sparkles, Gift, Download, Info } from "lucide-react";

export const Route = createFileRoute("/profile/")({ component: ProfilePage });

function ProfilePage() {
  return (
    <FeatureShell title="حسابي" variant="default"
      trailing={
        <Link to="/profile/settings" className="glass w-10 h-10 rounded-full flex items-center justify-center">
          <Settings size={16} className="relative z-10" strokeWidth={1.75} />
        </Link>
      }
    >
      <div className="px-5">
        <div className="glass-strong rounded-2xl p-5 flex items-center gap-4">
          <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-primary-foreground font-display text-2xl"
            style={{ background: "var(--gradient-primary)", boxShadow: "0 10px 24px -8px oklch(0.46 0.135 328 / 0.5)" }}>
            {mockUser.name.charAt(0)}
          </div>
          <div className="relative z-10 flex-1">
            <div className="font-display text-xl">{mockUser.name}</div>
            <div className="text-[11.5px] text-foreground/60 mt-0.5">{mockUser.email}</div>
            <div className="text-[11px] text-foreground/55 nums mt-1">منضمّة منذ {mockUser.joinedDays} يوم</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          <Mini label="عمر" v={`${mockUser.age}`} />
          <Mini label="طول" v={`${mockUser.height}`} unit="سم" />
          <Mini label="وزن" v={`${mockUser.weight}`} unit="كجم" />
        </div>

        {/* Subscription */}
        <Link to="/profile/subscription" className="glass mt-3 rounded-2xl p-4 flex items-center gap-3">
          <div className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <Crown size={17} className="text-primary-foreground" strokeWidth={1.75} />
          </div>
          <div className="relative z-10 flex-1">
            <div className="text-[13px] font-medium">العضويّة</div>
            <div className="text-[11px] text-foreground/60 mt-0.5">تجربة مجانيّة · تنتهي خلال 23 يوم</div>
          </div>
          <ChevronLeft size={16} className="relative z-10 text-foreground/50" />
        </Link>

        {/* Menu */}
        <div className="glass mt-3 rounded-2xl overflow-hidden">
          <Item icon={Edit3} label="تعديل الملف الشخصي" to="/profile/edit" />
          <Item icon={Ruler} label="القياسات" to="/journey/measurements" />
          <Item icon={Users} label="الخبيرات والمدرّبات" to="/coaches" />
          <Item icon={Gift} label="ادعي صديقاتكِ" to="/profile/referral" />
          <Item icon={Sparkles} label="ترقية لشيلا برو" to="/paywall" />
          <Item icon={Bell} label="تفضيلات الإشعارات" to="/profile/notifications-prefs" />
          <Item icon={Shield} label="الخصوصية والأمان" to="/profile/privacy" />
          <Item icon={Download} label="تصدير بياناتي" to="/profile/export" />
          <Item icon={HelpCircle} label="المساعدة والدعم" to="/profile/help" />
          <Item icon={Info} label="عن شيلا" to="/profile/about" />
        </div>

        <button className="mt-3 w-full glass rounded-2xl py-3.5 flex items-center justify-center gap-2 text-destructive text-sm font-medium">
          <LogOut size={15} className="relative z-10" strokeWidth={1.75} />
          <span className="relative z-10">تسجيل الخروج</span>
        </button>
      </div>
    </FeatureShell>
  );
}

function Mini({ label, v, unit }: { label: string; v: string; unit?: string }) {
  return (
    <div className="glass rounded-xl p-3 text-center">
      <div className="relative z-10 text-[10px] text-foreground/55 uppercase tracking-widest">{label}</div>
      <div className="relative z-10 font-display text-xl text-primary mt-1 nums">{v}{unit && <span className="text-[10px] text-foreground/55 font-normal me-1">{unit}</span>}</div>
    </div>
  );
}

function Item({ icon: Icon, label, to }: { icon: any; label: string; to?: string }) {
  const inner = (
    <>
      <Icon size={16} className="relative z-10 text-foreground/65" strokeWidth={1.75} />
      <span className="relative z-10 flex-1 text-[13px]">{label}</span>
      <ChevronLeft size={15} className="relative z-10 text-foreground/45" />
    </>
  );
  const cls = "w-full flex items-center gap-3 px-4 py-3.5 border-b border-foreground/5 last:border-b-0";
  if (to) return <Link to={to as "/"} className={cls}>{inner}</Link>;
  return <button className={cls}>{inner}</button>;
}
