// طبقة توافق رفيعة فوق SheilaV2Store.
import type { ReactNode } from "react";
import { SheilaV2Provider, useLifeStageV2 } from "./SheilaV2Store";

export function LifeStageProvider({ children }: { children: ReactNode }) {
  return <SheilaV2Provider>{children}</SheilaV2Provider>;
}

export function useLifeStage() {
  return useLifeStageV2();
}
