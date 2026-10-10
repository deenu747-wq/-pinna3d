"use client"
import { useState, useRef } from "react"

export default function Page(){
  const [preview,setPreview]=useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const onFile = (e:any)=>{
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    setPreview(URL.createObjectURL(f))
  }

  return (
    <div style={{background:'#0F0E18',color:'#EDECF2',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh',WebkitFontSmoothing:'antialiased',MozOsxFontSmoothing:'grayscale',textRendering:'optimizeLegibility'}}>

      {/* NAV - Logo size proportion as screenshot */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 28px',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          {/* Logo - size matched to heading proportion */}
          <div style={{width:'44px',height:'44px',background:'linear-gradient(135deg,#A020F0,#7A1FD1)',borderRadius:'10px',display:'grid',placeItems:'center',fontSize:'22px'}}>⬣</div>
          <span style={{fontSize:'34px',fontWeight:600,letterSpacing:'-0.03em',lineHeight:1,color:'#fff'}}>Pinna3d<span style={{fontSize:'13px',color:'#A020F0',marginLeft:'3px',fontWeight:400,verticalAlign:'super'}}>.com</span></span>
        </div>
        <div style={{display:'flex',gap:'24px',alignItems:'center',fontSize:'14px',fontWeight:400}}>
          <span style={{color:'rgba(255,255,255,0.6)'}}>Features</span>
          <span style={{color:'#A020F0',fontWeight:500}}>Pricing</span>
          <span style={{color:'rgba(255,255,255,0.6)'}}>Docs</span>
          <span style={{color:'rgba(255,255,255,0.6)'}}>Blog</span>
          <button style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)',padding:'8px 16px',borderRadius:'8px',color:'#fff',fontSize:'14px',fontWeight:400}}>Sign In</button>
          <button style={{background:'#A020F0',border:'none',padding:'8px 16px',borderRadius:'8px',color:'#fff',fontSize:'14px',fontWeight:400}}>Get Started</button>
        </div>
      </header>

      {/* TOP 3 COLUMNS - EXACT AS YOUR GREEN CIRCLES */}
      <div style={{display:'grid',gridTemplateColumns:'1.15fr 0.85fr 1fr',gap:'22px',padding:'28px',maxWidth:'1340px',margin:'0 auto'}}>

        {/* CIRCLE 1 - Text + Buttons + Delhi removed -> worldwide */}
        <div>
          <h1 style={{fontSize:'34px',lineHeight:'1.15',fontWeight:600,margin:0,color:'#fff',letterSpacing:'-0.02em'}}>Every Image to 3D or Vector<br/>in 60 Seconds</h1>
          <p style={{color:'rgba(255,255,255,0.62)',fontSize:'15px',lineHeight:'1.6',marginTop:'12px',fontWeight:400,maxWidth:'420px'}}>
            Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators worldwide.
          </p>

          {/* Buttons as in screenshot - no change */}
          <div style={{display:'flex',gap:'10px',marginTop:'18px'}}>
            <button style={{background:'#A020F0',border:'none',padding:'10px 16px',borderRadius:'8px',color:'#fff',fontSize:'14px',fontWeight:400,display:'flex',alignItems:'center',gap:'6px'}}>✦ Start Creating — Free</button>
            <button style={{background:'transparent',border:'1.5px solid rgba(255,255,255,0.18)',padding:'10px 16px',borderRadius:'8px',color:'#fff',fontSize:'14px',fontWeight:400,display:'flex',alignItems:'center',gap:'6px'}}>◉ Watch Demo</button>
          </div>

          <div style={{display:'flex',gap:'6px',marginTop:'16px',flexWrap:'wrap'}}>
            {['⚡ 60s Turnaround','• 100k+ assets generated','• No credit card required','📍 Made for creators worldwide'].map(t=><span key={t} style={{background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.08)',padding:'5px 10px',borderRadius:'20px',fontSize:'11px',color:'rgba(255,255,255,0.68)',fontWeight:400}}>{t}</span>)}
          </div>
        </div>

        {/* CIRCLE 2 - Dotted Line Square Border - As It Is */}
        <div onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.8px dashed rgba(168,85,247,0.85)',borderRadius:'14px',background:'rgba(255,255,255,0.03)',padding:'22px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'64px',height:'64px',background:'rgba(24,18,42,0.9)',border:'1px solid rgba(168,85,247,0.3)',borderRadius:'14px',display:'grid',placeItems:'center'}}>
            <span style={{fontSize:'36px',color:'#A855F7'}}>☁</span>
          </div>
          <div style={{fontSize:'16px',fontWeight:500,color:'#fff',marginTop:'16px',lineHeight:1.2}}>Drag & drop your image here</div>
          <div style={{fontSize:'13px',color:'rgba(255,255,255,0.6)',marginTop:'6px',fontWeight:400}}>or browse files to upload</div>
          <div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)',marginTop:'14px',fontWeight:400,lineHeight:'1.4'}}>Supports PNG, JPG, WEBP • Max 20MB • JPG/PNG to 3D or SVG</div>
          <div style={{marginTop:'14px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'7px 12px',borderRadius:'6px',fontSize:'10px',color:'rgba(255,255,255,0.65)',fontWeight:400}}>Instant preview • Background removal included</div>
          {preview && <img src={preview} alt="preview" style={{width:'90px',borderRadius:'8px',marginTop:'12px'}}/>}
        </div>

        {/* CIRCLE 3 - 3D Viewer Preview - As It Is No Change */}
        <div style={{background:'rgba(25,23,38,0.9)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'14px',padding:'10px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'12px',color:'rgba(255,255,255,0.65)',padding:'4px 6px 10px',fontWeight:400}}>
            <span>3D Viewer Preview</span>
            <span style={{display:'flex',gap:'6px'}}>
              <span style={{width:'26px',height:'26px',background:'rgba(255,255,255,0.06)',borderRadius:'6px',display:'grid',placeItems:'center'}}>↻</span>
              <span style={{width:'26px',height:'26px',background:'rgba(255,255,255,0.06)',borderRadius:'6px',display:'grid',placeItems:'center'}}>⛶</span>
              <span style={{width:'26px',height:'26px',background:'rgba(255,255,255,0.06)',borderRadius:'6px',display:'grid',placeItems:'center'}}>⋯</span>
            </span>
          </div>
          <div style={{background:'radial-gradient(ellipse at 50% 20%, rgba(160,32,240,0.35) 0%, rgba(15,14,24,0.9) 60%)',borderRadius:'10px',height:'200px',display:'grid',placeItems:'center',position:'relative',overflow:'hidden',border:'1px solid rgba(255,255,255,0.05)'}}>
            <div style={{position:'absolute',inset:'0',backgroundImage:'linear-gradient(rgba(160,32,240,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(160,32,240,0.25) 1px, transparent 1px)',backgroundSize:'36px 36px',opacity:0.6,transform:'perspective(300px) rotateX(60deg)',transformOrigin:'bottom'}}></div>
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300" alt="sneaker" style={{width:'220px',height:'auto',position:'relative',zIndex:2,filter:'drop-shadow(0 0 28px rgba(168,85,247,0.8))',borderRadius:'12px'}} />
          </div>
          <div style={{fontSize:'11px',color:'rgba(255,255,255,0.65)',padding:'10px 6px 10px',fontWeight:400}}>Model: Sneaker_v01.glb</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
            <button style={{background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'13px',fontWeight:400}}>Download GLB</button>
            <button style={{background:'#A020F0',border:'none',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'13px',fontWeight:400}}>Export SVG</button>
          </div>
        </div>
      </div>

      {/* STUDIOS - With BLEND and AE added */}
      <div style={{padding:'28px',maxWidth:'1340px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'14px'}}>
          {[
            {t:'Photo Studio',d:'Your photos, studio-ready in 1 sec.',f:'JPG, PNG, EPS, SVG, PSD, AI'},
            {t:'Vector Studio',d:'Blurry logo → sharp print-ready SVG.',f:'JPG, PNG, EPS, SVG, PSD, CDR, AI'},
            {t:'3D Studio',d:'Photo → production 3D for stores & games.',f:'GLB, OBJ, FBX, STL, USDZ, BLEND'},
            {t:'Motion Studio',d:'Static → viral Reels, ads, intros.',f:'MP4, MOV, GIF, AE, LOTTIE'},
          ].map(s=>(
            <div key={s.t} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'16px'}}>
              <div style={{fontSize:'14px',fontWeight:500,color:'#fff'}}>{s.t}</div>
              <div style={{fontSize:'13px',color:'rgba(255,255,255,0.58)',marginTop:'4px',fontWeight:400}}>{s.d}</div>
              <div style={{fontSize:'11px',color:'rgba(255,255,255,0.42)',marginTop:'10px',borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'8px',fontWeight:400}}>{s.f}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING - Exact as screenshot - 3 plans + purple bullets */}
      <div style={{padding:'28px',maxWidth:'1340px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{textAlign:'center'}}>
          <h2 style={{fontSize:'22px',fontWeight:500,color:'#fff',margin:0}}>Simple, transparent pricing</h2>
          <p style={{color:'rgba(255,255,255,0.55)',fontSize:'14px',marginTop:'6px',fontWeight:400}}>Start free. Upgrade when you need more. Perfect for startups and studios worldwide.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px',marginTop:'24px'}}>
          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'14px',padding:'20px'}}>
            <div style={{textAlign:'center',fontSize:'14px',fontWeight:400,color:'#fff'}}>Free</div>
            <div style={{textAlign:'center',fontSize:'30px',fontWeight:600,color:'#fff',marginTop:'4px'}}>₹0<span style={{fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.5)'}}> /mo</span></div>
            <div style={{textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.5)',marginTop:'2px',fontWeight:400}}>For individuals trying it out</div>
            <div style={{marginTop:'14px',display:'grid',gap:'7px',fontSize:'13px',fontWeight:400,color:'rgba(255,255,255,0.72)'}}>
              <div><span style={{color:'#A020F0'}}>✓</span> 5 exports per month</div>
              <div><span style={{color:'#A020F0'}}>✓</span> 3D preview only</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Standard resolution exports</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Community support</div>
            </div>
            <button style={{marginTop:'18px',width:'100%',background:'transparent',border:'1px solid rgba(255,255,255,0.12)',padding:'9px',borderRadius:'8px',color:'#fff',fontSize:'13px',fontWeight:400}}>Get Started Free</button>
          </div>

          <div style={{background:'rgba(18,16,32,0.9)',border:'1.5px solid #A020F0',borderRadius:'14px',padding:'20px',position:'relative',boxShadow:'0 0 28px rgba(160,32,240,0.22)'}}>
            <div style={{position:'absolute',top:'-11px',left:'50%',transform:'translateX(-50%)',background:'#A020F0',padding:'3px 12px',borderRadius:'12px',fontSize:'11px',fontWeight:400,display:'flex',alignItems:'center',gap:'4px'}}>☆ Most Popular</div>
            <div style={{textAlign:'center',fontSize:'14px',fontWeight:400,color:'#fff',marginTop:'6px'}}>Pro</div>
            <div style={{textAlign:'center',fontSize:'30px',fontWeight:600,color:'#fff',marginTop:'4px'}}>₹999<span style={{fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.5)'}}> /mo</span></div>
            <div style={{textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.5)',marginTop:'2px',fontWeight:400}}>For creators & small teams</div>
            <div style={{marginTop:'14px',display:'grid',gap:'7px',fontSize:'13px',fontWeight:400,color:'rgba(255,255,255,0.72)'}}>
              <div><span style={{color:'#A020F0'}}>✓</span> 200 exports per month</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Full 3D + Vector export</div>
              <div><span style={{color:'#A020F0'}}>✓</span> HD & 4K exports</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Priority processing ~60s</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Commercial license</div>
            </div>
            <button style={{marginTop:'18px',width:'100%',background:'#A020F0',border:'none',padding:'9px',borderRadius:'8px',color:'#fff',fontSize:'13px',fontWeight:400}}>Start Pro Trial</button>
          </div>

          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'14px',padding:'20px'}}>
            <div style={{textAlign:'center',fontSize:'14px',fontWeight:400,color:'#fff'}}>Business</div>
            <div style={{textAlign:'center',fontSize:'30px',fontWeight:600,color:'#fff',marginTop:'4px'}}>₹2499<span style={{fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.5)'}}> /mo</span></div>
            <div style={{textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.5)',marginTop:'2px',fontWeight:400}}>For teams & agencies</div>
            <div style={{marginTop:'14px',display:'grid',gap:'7px',fontSize:'13px',fontWeight:400,color:'rgba(255,255,255,0.72)'}}>
              <div><span style={{color:'#A020F0'}}>✓</span> 1000 exports per month</div>
              <div><span style={{color:'#A020F0'}}>✓</span> API access + bulk uploads</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Team workspaces (5 seats)</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Custom vector style controls</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Priority support • Slack</div>
            </div>
            <button style={{marginTop:'18px',width:'100%',background:'transparent',border:'1px solid rgba(255,255,255,0.12)',padding:'9px',borderRadius:'8px',color:'#fff',fontSize:'13px',fontWeight:400}}>Contact Sales</button>
          </div>
        </div>
      </div>
    </div>
  )
}
