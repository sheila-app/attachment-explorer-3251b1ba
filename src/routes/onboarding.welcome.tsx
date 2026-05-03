import { createFileRoute, Link } from "@tanstack/react-router";
import { Dumbbell, Moon, Apple } from "lucide-react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { FloatingDoodles } from "@/components/sheila/FloatingDoodles";

export const Route = createFileRoute("/onboarding/welcome")({
  component: WelcomePage,
});

function WelcomePage() {
  return (
    <DeviceFrame>
      <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", backgroundColor: "var(--background)" }}>

        {/* Background layer */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <LiquidBackdrop variant="default" />
          <FloatingDoodles />
        </div>

        {/* Content layer — inline styles to guarantee visibility */}
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", height: "100%", padding: "0 24px" }}>

          {/* Brand — top */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "80px", gap: "8px" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 900, color: "var(--foreground)", letterSpacing: "-2px", margin: 0 }}>
              شيلا
            </h1>
            <p style={{ fontSize: "14px", color: "var(--muted-foreground)", textAlign: "center", margin: 0 }}>
              رفيقتكِ في رحلة الصحّة واللياقة
            </p>
          </div>

          {/* Pills — middle */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginTop: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", borderRadius: "999px", padding: "12px 20px", border: "1px solid rgba(255,255,255,0.5)" }}>
              <Dumbbell style={{ width: "16px", height: "16px", color: "var(--primary)", flexShrink: 0 }} />
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>٥٠٠+ تمرين بالعربية</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", borderRadius: "999px", padding: "12px 20px", border: "1px solid rgba(255,255,255,0.5)" }}>
              <Moon style={{ width: "16px", height: "16px", color: "var(--primary)", flexShrink: 0 }} />
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>تتبّعي دورتكِ الشهرية</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", borderRadius: "999px", padding: "12px 20px", border: "1px solid rgba(255,255,255,0.5)" }}>
              <Apple style={{ width: "16px", height: "16px", color: "var(--primary)", flexShrink: 0 }} />
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>٢٠٠+ وصفة عربية صحية</span>
            </div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Buttons — bottom */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "48px" }}>
            <Link
              to="/onboarding/auth"
              style={{ display: "block", width: "100%", padding: "16px", borderRadius: "999px", background: "var(--primary)", color: "white", textAlign: "center", fontWeight: 600, fontSize: "16px", textDecoration: "none", boxSizing: "border-box" }}
            >
              ابدئي رحلتكِ
            </Link>
            <Link
              to="/auth/login"
              style={{ display: "block", width: "100%", padding: "12px", textAlign: "center", fontSize: "14px", color: "var(--muted-foreground)", textDecoration: "none" }}
            >
              لديّ حساب بالفعل
            </Link>
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}
