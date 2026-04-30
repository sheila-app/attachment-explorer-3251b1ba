import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { PrimaryCTA, GhostCTA } from "@/components/sheila/OnboardingShell";
import { ShoppingCart, Plus, Trash2, Check, Share2 } from "lucide-react";

export const Route = createFileRoute("/nutrition/shopping")({ component: Page });

type Item = { id: string; name: string; qty: string; cat: string; done: boolean };

const initial: Item[] = [
  { id: "1", name: "كينوا", qty: "500 جم", cat: "حبوب", done: false },
  { id: "2", name: "صدر دجاج", qty: "1 كجم", cat: "بروتين", done: false },
  { id: "3", name: "سلمون طازج", qty: "400 جم", cat: "بروتين", done: true },
  { id: "4", name: "زبادي يوناني", qty: "2 علبة", cat: "ألبان", done: false },
  { id: "5", name: "خيار", qty: "5 حبّات", cat: "خضار", done: false },
  { id: "6", name: "طماطم كرزيّة", qty: "علبة", cat: "خضار", done: true },
  { id: "7", name: "تمر مدجول", qty: "250 جم", cat: "متنوّع", done: false },
  { id: "8", name: "زيت زيتون بكر", qty: "زجاجة", cat: "متنوّع", done: false },
];

function Page() {
  const [items, setItems] = useState<Item[]>(initial);
  const [newName, setNewName] = useState("");
  const toggle = (id: string) => setItems(s => s.map(i => i.id === id ? { ...i, done: !i.done } : i));
  const remove = (id: string) => setItems(s => s.filter(i => i.id !== id));
  const add = () => {
    if (!newName.trim()) return;
    setItems(s => [{ id: String(Date.now()), name: newName, qty: "1", cat: "متنوّع", done: false }, ...s]);
    setNewName("");
  };
  const cats = Array.from(new Set(items.map(i => i.cat)));
  const doneCount = items.filter(i => i.done).length;

  return (
    <FeatureShell title="قائمة المشتريات" back="/nutrition" showNav={false} variant="warm">
      <div className="px-5 pb-8 space-y-4">
        <div className="glass-strong rounded-3xl p-5 flex items-center gap-4">
          <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--gradient-primary)" }}>
            <ShoppingCart size={22} className="text-white" strokeWidth={1.75} />
          </div>
          <div className="relative z-10 flex-1">
            <div className="text-[10px] tracking-[0.2em] text-foreground/55 uppercase">القائمة الأسبوعيّة</div>
            <div className="font-display text-2xl mt-0.5 nums">{doneCount} / {items.length}</div>
            <div className="mt-1.5 h-1 rounded-full bg-foreground/10 overflow-hidden">
              <div className="h-full transition-all" style={{ width: `${(doneCount / Math.max(items.length, 1)) * 100}%`, background: "var(--gradient-primary)" }} />
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl flex items-center gap-2 px-3 py-2">
          <Plus size={16} className="text-primary relative z-10" />
          <input value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === "Enter" && add()}
            placeholder="أضيفي عنصراً…" className="relative z-10 flex-1 bg-transparent outline-none text-[13px] py-2 placeholder:text-foreground/40" />
          <button onClick={add} className="relative z-10 text-[11px] text-primary font-medium px-3 py-1 rounded-full glass-strong">إضافة</button>
        </div>

        <div className="space-y-4 stagger">
          {cats.map(cat => (
            <div key={cat}>
              <div className="text-[10px] tracking-[0.22em] text-foreground/55 uppercase mb-1.5 px-1">{cat}</div>
              <div className="glass rounded-2xl divide-y divide-foreground/5 overflow-hidden">
                {items.filter(i => i.cat === cat).map(i => (
                  <div key={i.id} className="relative z-10 flex items-center gap-3 px-4 py-3">
                    <button onClick={() => toggle(i.id)}
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2"
                      style={i.done ? { background: "var(--primary)", borderColor: "var(--primary)" } : { borderColor: "color-mix(in oklab, var(--foreground) 25%, transparent)" }}>
                      {i.done && <Check size={13} className="text-white" strokeWidth={3} />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[13px] truncate ${i.done ? "line-through opacity-50" : ""}`}>{i.name}</div>
                      <div className="text-[10.5px] text-foreground/55 nums">{i.qty}</div>
                    </div>
                    <button onClick={() => remove(i.id)} className="w-7 h-7 flex items-center justify-center text-foreground/40">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-2">
          <PrimaryCTA to="/nutrition">حفظ القائمة</PrimaryCTA>
          <button className="glass-strong w-full rounded-2xl py-3.5 text-[13px] font-medium flex items-center justify-center gap-2">
            <Share2 size={14} className="relative z-10" /><span className="relative z-10">مشاركة القائمة</span>
          </button>
          <GhostCTA to="/nutrition">عودة</GhostCTA>
        </div>
      </div>
    </FeatureShell>
  );
}
