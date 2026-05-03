import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle } from "lucide-react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";

export const Route = createFileRoute("/onboarding/complete")({ component: CompletePage });

function CompletePage() {
  return (
    <DeviceFrame>
      <div style={{position:'relative', height:'100%', display:'flex', flexDirection:'column', background:'linear-gradient(160deg, var(--primary) 0%, oklch(0.36 0.14 328) 100%)'}}>

        <div style={{position:'absolute', inset:0, zIndex:0, overflow:'hidden'}}>
          <LiquidBackdrop variant="default" />
        </div>

        <div style={{position:'relative', zIndex:10, display:'flex', flexDirection:'column', height:'100%', padding:'0 24px', alignItems:'center', justifyContent:'center', gap:'24px', textAlign:'center'}}>

          <div style={{width:'88px', height:'88px', borderRadius:'50%', background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(10px)'}}>
            <CheckCircle style={{width:'48px', height:'48px', color:'white'}} />
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
            <h1 style={{fontSize:'32px', fontWeight:900, color:'white', margin:0}}>أنتِ جاهزة!</h1>
            <p style={{fontSize:'15px', color:'rgba(255,255,255,0.8)', margin:0}}>رحلتكِ مع شيلا تبدأ الآن</p>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px', width:'100%'}}>
            <div style={{background:'rgba(255,255,255,0.15)', borderRadius:'16px', padding:'16px 8px', backdropFilter:'blur(10px)'}}>
              <div style={{fontSize:'22px', fontWeight:900, color:'white'}}>٥٠٠+</div>
              <div style={{fontSize:'10px', color:'rgba(255,255,255,0.7)', marginTop:'4px'}}>تمرين</div>
            </div>
            <div style={{background:'rgba(255,255,255,0.15)', borderRadius:'16px', padding:'16px 8px', backdropFilter:'blur(10px)'}}>
              <div style={{fontSize:'22px', fontWeight:900, color:'white'}}>٢٠٠+</div>
              <div style={{fontSize:'10px', color:'rgba(255,255,255,0.7)', marginTop:'4px'}}>وصفة</div>
            </div>
            <div style={{background:'rgba(255,255,255,0.15)', borderRadius:'16px', padding:'16px 8px', backdropFilter:'blur(10px)'}}>
              <div style={{fontSize:'22px', fontWeight:900, color:'white'}}>٣٠</div>
              <div style={{fontSize:'10px', color:'rgba(255,255,255,0.7)', marginTop:'4px'}}>يوم مجاناً</div>
            </div>
          </div>

          <Link to="/home"
            style={{display:'block', width:'100%', padding:'16px', borderRadius:'999px', background:'white', color:'var(--primary)', textAlign:'center', fontWeight:700, fontSize:'16px', textDecoration:'none', marginTop:'8px', boxSizing:'border-box'}}>
            ابدئي رحلتكِ
          </Link>
        </div>
      </div>
    </DeviceFrame>
  );
}
