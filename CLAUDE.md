# SHEILA App — Prototype

## Project
React + Vite + TypeScript + TanStack Router + Tailwind CSS v4
Arabic-first (RTL) FemTech app prototype for Arab women.
No backend — all data is mocked. No real auth. No dark mode.

## Commands
- bun run dev — start dev server
- bun run build — production build
- bun run lint — ESLint check

## Architecture

### Routing
TanStack Router with file-based routing. Files in src/routes/ automatically become routes.
src/routeTree.gen.ts is AUTO-GENERATED — NEVER edit it manually.
It regenerates when you add/rename/delete route files during bun run dev.
Route naming: feature.subfeature.tsx → /feature/subfeature | feature.$param.tsx → dynamic segment.

### Data
All mock data lives in src/data/mock.ts. No API layer. Import directly from mock data.
Never hardcode data inline in components.

### Components
- src/components/ui/ — shadcn/ui components. Do not rewrite, only extend.
- src/components/sheila/ — Custom components:
  - DeviceFrame — mobile phone bezel wrapper, used in EVERY screen
  - CyclePhaseRing — animated SVG cycle visualization
  - BottomNav — 5-tab navigation (activeTab prop required)
  - LiquidBackdrop / FloatingDoodles — visual FX
  - OnboardingShell / FeatureShell — page layout wrappers

### Styling
- Tailwind CSS v4 with design system in src/styles.css
- All colors use oklch color space as CSS variables
- Four cycle phases: follicular / ovulatory / luteal / menstrual
- Liquid Glass effect via backdrop-blur + custom shadow utilities
- USE logical properties: ms- me- ps- pe- (NOT ml- mr- pl- pr-) for RTL
- Import alias: @/* resolves to src/*

### Typography
- Body: Tajawal (Google Fonts)
- Display/headings: Cairo (Google Fonts)
- Arabic numerals helper in src/lib/format.ts

## Design System Rules

### Every screen MUST follow this pattern:
- Wrap in <DeviceFrame>
- Sticky header: className="sticky top-0 z-20 bg-background/95 backdrop-blur px-5 py-4 border-b border-border"
- Scrollable content: className="h-screen overflow-y-auto no-scrollbar pb-10"
- Cards: className="bg-card rounded-2xl border border-border"
- Primary button: className="w-full bg-primary text-primary-foreground rounded-full py-3.5 font-semibold"
- Back button: className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center"
- Bottom nav: <BottomNav activeTab="home" /> (pass correct tab)

### Phase colors (use these classes):
- text-phase-menstrual / bg-phase-menstrual-soft
- text-phase-follicular / bg-phase-follicular-soft
- text-phase-ovulation / bg-phase-ovulation-soft
- text-phase-luteal / bg-phase-luteal-soft

### Gold standard reference files (read before building any screen):
- src/routes/home.tsx ← best complete screen example
- src/styles.css ← all design tokens
- src/components/sheila/DeviceFrame.tsx ← wrapper
- src/data/mock.ts ← all data

## Key Constraints
- RTL-FIRST: All layouts must work RTL. Never use left/right directional classes.
- ARABIC ONLY: Zero English user-facing strings.
- NO BACKEND: No API calls. Mock data only.
- NO DARK MODE: Single light theme only.
- routeTree.gen.ts is auto-generated: NEVER edit it.
- No arbitrary Tailwind values like w-[347px].
- bun run build must pass with zero TypeScript errors.
