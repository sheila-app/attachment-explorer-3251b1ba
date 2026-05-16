import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from"react";
import {
 userV2, MEALS, WORKOUTS, ACHIEVEMENTS, FEED, NOTIFICATIONS,
 LIFE_STAGES, type LifeStage, type CyclePhase, type Post,
} from"@/data/sheila-v2";

type LoggedMeal = { mealId: string; type: string; at: number };
type DoneWorkout = { workoutId: string; at: number };
type Notif = { id: string; title: string; body: string; icon: string; at: number; unread: boolean };
type Partner = { name: string; goal: string; freq: string; level: string; streak: number } | null;

type State = {
 bodyIQ: number;
 streak: number;
 waterCups: number;
 loggedMeals: LoggedMeal[];
 completedWorkouts: DoneWorkout[];
 unlockedAchievements: string[];
 feedPosts: Post[];
 partner: Partner;
 notifications: Notif[];
 lifeStage: LifeStage;
 currentPhase: CyclePhase;
 selectedWorkoutId: string | null;
};

type Action =
 | { type:"addWater" }
 | { type:"logMeal"; mealId: string }
 | { type:"removeMeal"; idx: number }
 | { type:"completeWorkout"; workoutId: string }
 | { type:"selectWorkout"; workoutId: string }
 | { type:"unlockAchievement"; id: string }
 | { type:"publishPost"; cat: string; text: string }
 | { type:"matchPartner"; partner: NonNullable<Partner> }
 | { type:"setLifeStage"; stage: LifeStage }
 | { type:"setPhase"; phase: CyclePhase }
 | { type:"markAllRead" }
 | { type:"reset" };

const STORAGE_KEY ="sheila-v2-state-v1";

const INITIAL: State = {
 bodyIQ: userV2.bodyIQ,
 streak: userV2.streak,
 waterCups: userV2.waterCups,
 loggedMeals: [],
 completedWorkouts: [],
 unlockedAchievements: ACHIEVEMENTS.filter((a) => a.unlocked).map((a) => a.id),
 feedPosts: [],
 partner: null,
 notifications: NOTIFICATIONS.map((n) => ({
 id: n.id, title: n.title, body: n.body, icon: n.icon, at: Date.now(), unread:!!n.unread,
 })),
 lifeStage: userV2.lifeStage,
 currentPhase: userV2.currentPhase,
 selectedWorkoutId: null,
};

let _seq = 1;
function notif(title: string, body: string, icon: string): Notif {
 return { id: `n-${Date.now()}-${_seq++}`, title, body, icon, at: Date.now(), unread: true };
}

function reducer(s: State, a: Action): State {
 switch (a.type) {
 case"addWater": {
 const cups = Math.min(s.waterCups + 1, userV2.waterTarget);
 const reached = cups === userV2.waterTarget && s.waterCups < userV2.waterTarget;
 return {
...s,
 waterCups: cups,
 bodyIQ: s.bodyIQ + (reached? 15 : 2),
 notifications: reached
? [notif("+15 Body IQ","أكملتِ هدف الماء اليوم",""),...s.notifications]
 : s.notifications,
 };
 }
 case"logMeal": {
 const m = MEALS.find((x) => x.id === a.mealId);
 if (!m) return s;
 return {
...s,
 loggedMeals: [...s.loggedMeals, { mealId: m.id, type: m.type, at: Date.now() }],
 bodyIQ: s.bodyIQ + 10,
 notifications: [notif("+10 Body IQ", `سجّلتِ ${m.name}`,""),...s.notifications],
 };
 }
 case"removeMeal":
 return {...s, loggedMeals: s.loggedMeals.filter((_, i) => i!== a.idx) };
 case"completeWorkout": {
 const w = WORKOUTS.find((x) => x.id === a.workoutId);
 if (!w) return s;
 const total = s.completedWorkouts.length + 1;
 const newAch: string[] = [];
 if (total === 1 &&!s.unlockedAchievements.includes("a1")) newAch.push("a1");
 if (total === 10 &&!s.unlockedAchievements.includes("a3")) newAch.push("a3");
 if (total === 50 &&!s.unlockedAchievements.includes("a7")) newAch.push("a7");
 const ns: Notif[] = [
 notif("+25 Body IQ", `أكملتِ ${w.title} `,""),
...newAch.map((id) => {
 const ach = ACHIEVEMENTS.find((x) => x.id === id);
 return notif("إنجاز جديد!", ach?.name??"","");
 }),
 ];
 return {
...s,
 completedWorkouts: [...s.completedWorkouts, { workoutId: w.id, at: Date.now() }],
 bodyIQ: s.bodyIQ + 25 + newAch.length * 20,
 unlockedAchievements: [...s.unlockedAchievements,...newAch],
 notifications: [...ns,...s.notifications],
 };
 }
 case"selectWorkout":
 return {...s, selectedWorkoutId: a.workoutId };
 case"unlockAchievement":
 if (s.unlockedAchievements.includes(a.id)) return s;
 return {
...s,
 unlockedAchievements: [...s.unlockedAchievements, a.id],
 bodyIQ: s.bodyIQ + 20,
 notifications: [notif("إنجاز جديد!", a.id,""),...s.notifications],
 };
 case"publishPost": {
 const post: Post = {
 id: `p-${Date.now()}`,
 author: userV2.name,
 tier:"blooming",
 cat: a.cat,
 time:"الآن",
 text: a.text,
 likes: 0,
 replies: 0,
 };
 return {
...s,
 feedPosts: [post,...s.feedPosts],
 bodyIQ: s.bodyIQ + 8,
 notifications: [notif("+8 Body IQ","نشرتِ في دائرة شيلا",""),...s.notifications],
 };
 }
 case"matchPartner":
 return {
...s,
 partner: a.partner,
 bodyIQ: s.bodyIQ + 12,
 notifications: [notif("شريك جديدة!", `${a.partner.name} انضمّت لرحلتك`,""),...s.notifications],
 };
 case"setLifeStage":
 return {...s, lifeStage: a.stage };
 case"setPhase":
 return {...s, currentPhase: a.phase };
 case"markAllRead":
 return {...s, notifications: s.notifications.map((n) => ({...n, unread: false })) };
 case"reset":
 return INITIAL;
 }
}

type Ctx = {
 state: State;
 dispatch: (a: Action) => void;
 // computed
 caloriesToday: number;
 proteinToday: number;
 unreadCount: number;
 // helpers
 isMealLogged: (id: string) => boolean;
 isWorkoutDone: (id: string) => boolean;
};

const SheilaV2Context = createContext<Ctx | null>(null);

export function SheilaV2Provider({ children }: { children: ReactNode }) {
 const [state, dispatch] = useReducer(reducer, INITIAL, (init) => {
 if (typeof window ==="undefined") return init;
 try {
 const raw = localStorage.getItem(STORAGE_KEY);
 if (!raw) return init;
 const parsed = JSON.parse(raw) as Partial<State>;
 return {...init,...parsed };
 } catch {
 return init;
 }
 });

 useEffect(() => {
 try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
 }, [state]);

 const value = useMemo<Ctx>(() => {
 const caloriesToday = state.loggedMeals.reduce((sum, lm) => {
 const m = MEALS.find((x) => x.id === lm.mealId);
 return sum + (m?.cal?? 0);
 }, 0);
 const proteinToday = state.loggedMeals.reduce((sum, lm) => {
 const m = MEALS.find((x) => x.id === lm.mealId);
 return sum + (m?.protein?? 0);
 }, 0);
 const unreadCount = state.notifications.filter((n) => n.unread).length;
 return {
 state,
 dispatch,
 caloriesToday,
 proteinToday,
 unreadCount,
 isMealLogged: (id) => state.loggedMeals.some((lm) => lm.mealId === id),
 isWorkoutDone: (id) => state.completedWorkouts.some((cw) => cw.workoutId === id),
 };
 }, [state]);

 return <SheilaV2Context.Provider value={value}>{children}</SheilaV2Context.Provider>;
}

export function useSheilaV2() {
 const c = useContext(SheilaV2Context);
 if (!c) throw new Error("useSheilaV2 must be used inside SheilaV2Provider");
 return c;
}

/** للوصول للمرحلة الحياتيّة (يستبدل LifeStageContext القديم). */
export function useLifeStageV2() {
 const { state, dispatch } = useSheilaV2();
 const meta = LIFE_STAGES.find((s) => s.id === state.lifeStage)!;
 return {
 stage: state.lifeStage,
 setStage: (s: LifeStage) => dispatch({ type:"setLifeStage", stage: s }),
 tabLabel: meta.tabLabel,
 tabPath: meta.tabPath,
 };
}
