import { createContext, useContext, useState, type ReactNode } from "react";
import type { LifeStage } from "@/data/sheila-v2";
import { LIFE_STAGES, userV2 } from "@/data/sheila-v2";

type Ctx = {
  stage: LifeStage;
  setStage: (s: LifeStage) => void;
  tabLabel: string;
  tabPath: string;
};

const LifeStageContext = createContext<Ctx | null>(null);

export function LifeStageProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<LifeStage>(userV2.lifeStage);
  const meta = LIFE_STAGES.find((s) => s.id === stage)!;
  return (
    <LifeStageContext.Provider value={{ stage, setStage, tabLabel: meta.tabLabel, tabPath: meta.tabPath }}>
      {children}
    </LifeStageContext.Provider>
  );
}

export function useLifeStage() {
  const c = useContext(LifeStageContext);
  if (!c) {
    // graceful fallback for screens not wrapped
    const meta = LIFE_STAGES.find((s) => s.id === userV2.lifeStage)!;
    return { stage: userV2.lifeStage, setStage: () => {}, tabLabel: meta.tabLabel, tabPath: meta.tabPath };
  }
  return c;
}
