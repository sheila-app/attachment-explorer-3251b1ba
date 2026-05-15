import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { useSheilaV2 } from "@/components/sheila-v2/SheilaV2Store";

export const Route = createFileRoute("/sheila-v2/circle_/compose")({ component: Compose });
const CATS = ["إنجاز", "سؤال", "تحدّي", "وصفة", "دعم"];

function Compose() {
  const { dispatch } = useSheilaV2();
  const navigate = useNavigate();
  const [cat, setCat] = useState("إنجاز");
  const [txt, setTxt] = useState("");
  function publish() {
    if (!txt.trim()) return;
    dispatch({ type: "publishPost", cat, text: txt.trim() });
    navigate({ to: "/sheila-v2/circle" });
  }
  return (
    <ShellV2 title="منشور جديد" back="/sheila-v2/circle" showFAB={false} showNav={false}>
      <div className="px-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`text-[11.5px] px-3 py-1.5 rounded-full ${cat === c ? "bg-primary text-primary-foreground" : "bg-white/70 border border-border"}`}>{c}</button>
          ))}
        </div>
        <textarea value={txt} onChange={(e) => setTxt(e.target.value)} rows={8} placeholder="شاركي ما تريدين…"
          className="w-full bg-white/85 border border-border rounded-2xl p-4 text-[13.5px] outline-none leading-relaxed" />
        <button onClick={publish} disabled={!txt.trim()} className="mt-4 w-full py-3.5 rounded-2xl text-primary-foreground text-[13px] font-semibold disabled:opacity-50" style={{ background: "var(--gradient-primary)" }}>نشر</button>
      </div>
    </ShellV2>
  );
}
