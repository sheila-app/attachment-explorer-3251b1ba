import { createFileRoute, Link } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { allScreens } from "@/data/mock";

export const Route = createFileRoute("/screens")({
  component: ScreensIndex,
});

function ScreensIndex() {
  return (
    <DeviceFrame>
      <div className="h-screen overflow-y-auto no-scrollbar pb-10">
        <header className="sticky top-0 z-20 bg-background/95 backdrop-blur px-5 py-4 border-b border-border">
          <h1 className="font-display text-2xl text-primary">فهرس الشاشات</h1>
          <p className="text-xs text-muted-foreground mt-1">للتنقّل السريع أثناء العرض</p>
        </header>

        <div className="px-5 py-4 space-y-6">
          {allScreens.map((group) => (
            <section key={group.group}>
              <h2 className="text-xs font-medium text-muted-foreground mb-2 px-1">
                {group.group}
              </h2>
              <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
                {group.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center justify-between px-4 py-3 hover:bg-accent/40 transition-colors"
                  >
                    <span className="text-sm">{item.name}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{item.path}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </DeviceFrame>
  );
}
