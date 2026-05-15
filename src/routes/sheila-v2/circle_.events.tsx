import { createFileRoute } from "@tanstack/react-router";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { EVENTS } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/circle/events")({ component: Events });

function Events() {
  return (
    <ShellV2 title="الفعاليّات" back="/sheila-v2/circle" showFAB={false}>
      <div className="px-5 space-y-2.5">
        {EVENTS.map(e => (
          <div key={e.id} className="rounded-2xl bg-white/85 border border-border p-4">
            <div className="flex items-center gap-2 text-[10.5px]">
              <span className={`px-2 py-0.5 rounded-full ${e.type === "أونلاين" ? "bg-phase-ovulation/15 text-phase-ovulation-deep" : "bg-phase-follicular/15 text-phase-follicular-deep"}`}>{e.type}</span>
              <span className={`px-2 py-0.5 rounded-full ${e.price === "مجاني" ? "bg-phase-luteal/15 text-phase-luteal-deep" : "bg-foreground/10 text-foreground/65"}`}>{e.price}</span>
            </div>
            <div className="font-display text-[15px] mt-2">{e.title}</div>
            <div className="text-[11px] text-foreground/60 mt-1">{e.date} • {e.host}</div>
            <button className="mt-3 w-full py-2.5 rounded-xl bg-primary/10 text-primary text-[12px] font-semibold">سجّلي</button>
          </div>
        ))}
      </div>
    </ShellV2>
  );
}
