import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA } from "@/components/sheila/OnboardingShell";
import { User, Camera } from "lucide-react";

export const Route = createFileRoute("/profile/edit")({ component: EditProfile });

function EditProfile() {
  const [name, setName] = useState("نورة العتيبي");
  const [email, setEmail] = useState("noura@example.com");
  const [phone, setPhone] = useState("+966500000000");
  const [bio, setBio] = useState("في رحلة لتعزيز قوّتي وصحّتي");

  return (
    <FeatureShell title="تعديل الملف الشخصي" back="/profile" showNav={false}>
      <div className="px-5 pb-8 space-y-5">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-full glass-strong flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <User size={36} className="text-primary-foreground" strokeWidth={1.5} />
            </div>
            <button className="absolute -bottom-1 -left-1 w-9 h-9 rounded-full glass-strong flex items-center justify-center">
              <Camera size={15} className="relative z-10 text-primary" strokeWidth={1.75} />
            </button>
          </div>
          <button className="text-[12px] text-primary font-medium">تغيير الصورة</button>
        </div>

        <div className="space-y-3">
          <Field label="الاسم الكامل" value={name} onChange={setName} />
          <Field label="البريد الإلكتروني" value={email} onChange={setEmail} type="email" />
          <Field label="رقم الجوّال" value={phone} onChange={setPhone} type="tel" dir="ltr" />
          <Field label="نبذة عنكِ" value={bio} onChange={setBio} multiline />
        </div>

        <PrimaryCTA to="/profile">حفظ التغييرات</PrimaryCTA>
      </div>
    </FeatureShell>
  );
}

function Field({ label, value, onChange, type = "text", dir, multiline }: any) {
  return (
    <div>
      <label className="block text-[11px] text-foreground/60 mb-1.5 px-1">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
          className="glass w-full rounded-xl px-4 py-3 text-[13px] resize-none relative z-10 bg-transparent outline-none focus:ring-2 focus:ring-primary/30" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} type={type} dir={dir}
          className="glass w-full rounded-xl px-4 py-3 text-[13px] relative z-10 bg-transparent outline-none focus:ring-2 focus:ring-primary/30" />
      )}
    </div>
  );
}
