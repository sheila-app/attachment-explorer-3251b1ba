import { createFileRoute, Link } from "@tanstack/react-router";
import { FeatureShell } from "@/components/sheila/FeatureShell";
import { mockPosts } from "@/data/mock";
import { Heart, MessageCircle, Plus, UserPlus } from "lucide-react";

export const Route = createFileRoute("/community")({ component: CommunityPage });

function CommunityPage() {
  return (
    <FeatureShell title="دائرة شيلا" variant="default"
      trailing={
        <Link to="/community/invite" className="glass w-10 h-10 rounded-full flex items-center justify-center">
          <UserPlus size={16} className="relative z-10 text-primary" strokeWidth={2} />
        </Link>
      }
    >
      <div className="px-5">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Link to="/community/groups" className="glass-strong rounded-2xl p-3 flex items-center justify-between">
            <span className="relative z-10 text-[12.5px] font-medium">المجموعات</span>
            <span className="relative z-10 text-[10px] text-primary">عرض ←</span>
          </Link>
          <Link to="/challenges" className="glass-strong rounded-2xl p-3 flex items-center justify-between">
            <span className="relative z-10 text-[12.5px] font-medium">🏆 التحدّيات</span>
            <span className="relative z-10 text-[10px] text-primary">انضمّي ←</span>
          </Link>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4 -mx-1 px-1">
          {["الكل", "تحدّيات", "صحّة المرأة", "تغذية", "إنجازات"].map((t, i) => (
            <span key={t} className="glass shrink-0 px-3 py-1.5 rounded-full text-[11.5px]"
              style={i === 0 ? { background: "var(--gradient-primary)", color: "white" } : undefined}>
              <span className="relative z-10">{t}</span>
            </span>
          ))}
        </div>

        <div className="space-y-3 stagger">
          {mockPosts.map(p => (
            <article key={p.id} className="glass rounded-2xl p-4">
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground font-medium"
                  style={{ background: "var(--gradient-primary)" }}>
                  {p.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-medium">{p.author}</div>
                  <div className="text-[10.5px] text-foreground/55">{p.time} · {p.group}</div>
                </div>
              </div>
              <p className="relative z-10 text-[13px] mt-3 leading-relaxed">{p.text}</p>
              <div className="relative z-10 flex items-center gap-4 mt-3 text-[11.5px] text-foreground/65">
                <button className="inline-flex items-center gap-1"><Heart size={13} /><span className="nums">{p.likes}</span></button>
                <button className="inline-flex items-center gap-1"><MessageCircle size={13} /><span className="nums">{p.comments}</span></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </FeatureShell>
  );
}
