import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { ShellV2 } from "@/components/sheila-v2/ShellV2";
import { GROUPS } from "@/data/sheila-v2";

export const Route = createFileRoute("/sheila-v2/circle_/groups")({ component: Groups });

function Groups() {
  return (
    <ShellV2 title="المجموعات" back="/sheila-v2/circle" showFAB={false}>
      <div className="px-5 space-y-2.5">
        {GROUPS.map(g => (
          <div key={g.id} className="rounded-2xl bg-white/85 border border-border p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary/60 flex items-center justify-center text-[22px]">{g.icon}</div>
            <div className="flex-1"><div className="text-[13px] font-semibold">{g.name}</div><div className="text-[11px] text-foreground/55 mt-0.5 nums">{g.members} عضوة</div></div>
            <ChevronLeft size={16} className="text-foreground/40" />
          </div>
        ))}
      </div>
    </ShellV2>
  );
}
