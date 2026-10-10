"use client"
import { useState, useRef } from "react"

export default function Page(){
  const [preview,setPreview]=useState("")
  const [done,setDone]=useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const onFile = (e:any)=>{
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    setPreview(URL.createObjectURL(f))
    setDone(false)
    setTimeout(()=>setDone(true),900)
  }

  return (
    <div style={{background:'#111018',color:'#E9E8F0',fontFamily:'Inter, system-ui, sans-serif',minHeight:'100vh'}}>
      {/* NAV BAR - As per screenshot */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 32px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',fontSize:'28px',fontWeight:600,letterSpacing:'-0.02em'}}>
          <div style={{width:'36px',height:'36px',background:'linear-gradient(135deg,#A020F0,#7A1FD1)',borderRadius:'8px',display:'grid',placeItems:'center'}}>◆</div>
          <span>Pinna3d<span style={{fontSize:'13px',color:'#8B5CF6',marginLeft:'2px',fontWeight:500,verticalAlign:'super'}}>.com</span></span>
        </div>
        <div style={{display:'flex',gap:'28px',alignItems:'center',fontSize:'14px',fontWeight:400}}>
          <span style={{color:'rgba(255,255,255,0.6)'}}>Features</span>
          <span style={{color:'#A020F0',fontWeight:500}}>Pricing</span>
          <span style={{color:'rgba(255,255,255,0.6)'}}>Docs</span>
          <span style={{color:'rgba(255,255,255,0.6)'}}>Blog</span>
          <button style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)',padding:'8px 16px',borderRadius:'8px',color:'#fff',fontSize:'14px',fontWeight:400}}>Sign In</button>
          <button style={{background:'#A020F0',border:'none',padding:'8px 18px',borderRadius:'8px',color:'#fff',fontSize:'14px',fontWeight:500}}>Get Started</button>
        </div>
      </header>

      {/* HERO - As per your 3 check marks */}
      <div style={{display:'grid',gridTemplateColumns:'1.2fr 0.9fr 0.9fr',gap:'18px',padding:'32px',maxWidth:'1280px',margin:'0 auto'}}>
        {/* Left */}
        <div>
          <h1 style={{fontSize:'36px',lineHeight:'1.15',fontWeight:600,letterSpacing:'-0.02em',margin:0,color:'#fff'}}>Every Image to 3D or Vector<br/>in 60 Seconds</h1>
          <p style={{color:'rgba(255,255,255,0.55)',fontSize:'14px',lineHeight:'1.6',marginTop:'12px',fontWeight:400,maxWidth:'420px'}}>Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators in Delhi.</p>
          <div style={{display:'flex',gap:'10px',marginTop:'18px'}}>
            <button style={{background:'#A020F0',border:'none',padding:'10px 16px',borderRadius:'8px',color:'#fff',fontSize:'14px',fontWeight:500}}>✦ Start Creating — Free</button>
            <button style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',padding:'10px 16px',borderRadius:'8px',color:'#fff',fontSize:'14px',fontWeight:400}}>◉ Watch Demo</button>
          </div>
          <div style={{display:'flex',gap:'8px',marginTop:'16px',flexWrap:'wrap'}}>
            {['⚡ 60s Turnaround','• 100k+ assets generated','• No credit card required','📍 Made in Delhi, India 🇮🇳'].map(t=><span key={t} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',padding:'5px 10px',borderRadius:'20px',fontSize:'11px',color:'rgba(255,255,255,0.7)',fontWeight:400}}>{t}</span>)}
          </div>
        </div>

        {/* Middle - Drag & Drop - Checked */}
        <div onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed rgba(160,32,240,0.7)',borderRadius:'14px',background:'rgba(255,255,255,0.03)',padding:'18px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'56px',height:'56px',background:'rgba(160,32,240,0.14)',borderRadius:'12px',display:'grid',placeItems:'center',fontSize:'28px',color:'#A020F0'}}>☁️</div>
          <b style={{fontSize:'15px',fontWeight:500,color:'#fff',marginTop:'12px'}}>Drag & drop your image here</b>
          <span style={{fontSize:'13px',color:'rgba(255,255,255,0.55)',marginTop:'4px',fontWeight:400}}>or browse files to upload</span>
          <span style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',marginTop:'10px'}}>Supports PNG, JPG, WEBP • Max 20MB • JPG/PNG to 3D or SVG</span>
          <div style={{marginTop:'14px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'6px 12px',borderRadius:'6px',fontSize:'10px',color:'rgba(255,255,255,0.6)'}}>Instant preview • Background removal included</div>
          {preview && <img src={preview} alt="preview" style={{width:'80px',borderRadius:'8px',marginTop:'10px'}}/>}
        </div>

        {/* Right - 3D Viewer - Checked */}
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'14px',padding:'10px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.6)',padding:'6px 4px',fontWeight:400}}><span>3D Viewer Preview</span><span>↻ ⛶ ⋯</span></div>
          <div style={{background:'radial-gradient(ellipse at center, rgba(160,32,240,0.25) 0%, #1A1630 60%)',borderRadius:'10px',height:'200px',display:'grid',placeItems:'center',position:'relative',overflow:'hidden',border:'1px solid rgba(255,255,255,0.06)'}}>
            <div style={{position:'absolute',bottom:'0',width:'100%',height:'40%',background:'linear-gradient(to top, rgba(160,32,240,0.2), transparent)',display:'grid',placeItems:'center'}}>
              <div style={{width:'80%',height:'1px',background:'repeating-linear-gradient(90deg, rgba(160,32,240,0.5) 0 8px, transparent 8px 16px)'}}></div>
            </div>
            <div style={{fontSize:'64px',filter:'drop-shadow(0 0 20px rgba(160,32,240,0.6))'}}>👟</div>
          </div>
          <div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)',padding:'8px 4px 6px',fontWeight:400}}>Model: Sneaker_v01.glb</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
            <button style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'8px',borderRadius:'6px',color:'#fff',fontSize:'12px',fontWeight:400}}>Download GLB</button>
            <button style={{background:'#A020F0',border:'none',padding:'8px',borderRadius:'6px',color:'#fff',fontSize:'12px',fontWeight:500}}>Export SVG</button>
          </div>
        </div>
      </div>

      {/* PRICING - Checked as per screenshot */}
      <div style={{padding:'36px 32px 24px',maxWidth:'1280px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)',marginTop:'10px'}}>
        <div style={{textAlign:'center'}}>
          <h2 style={{fontSize:'24px',fontWeight:600,color:'#fff',margin:0}}>Simple, transparent pricing</h2>
          <p style={{color:'rgba(255,255,255,0.55)',fontSize:'14px',marginTop:'6px',fontWeight:400}}>Start free. Upgrade when you need more. Perfect for startups and studios in Delhi.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px',marginTop:'24px'}}>
          {/* Free */}
          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'14px',padding:'22px'}}>
            <div style={{textAlign:'center',fontSize:'14px',fontWeight:500,color:'#fff'}}>Free</div>
            <div style={{textAlign:'center',fontSize:'32px',fontWeight:600,color:'#fff',marginTop:'6px'}}>₹0<span style={{fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.5)'}}> /mo</span></div>
            <div style={{textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.5)',marginTop:'4px',fontWeight:400}}>For individuals trying it out</div>
            <div style={{marginTop:'16px',display:'grid',gap:'8px',fontSize:'13px',fontWeight:400,color:'rgba(255,255,255,0.75)'}}>
              <div><span style={{color:'#A020F0'}}>✓</span> 5 exports per month</div>
              <div><span style={{color:'#A020F0'}}>✓</span> 3D preview only</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Standard resolution exports</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Community support</div>
            </div>
            <button style={{marginTop:'20px',width:'100%',background:'transparent',border:'1px solid rgba(255,255,255,0.14)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'13px',fontWeight:400}}>Get Started Free</button>
          </div>

          {/* Pro - Most Popular */}
          <div style={{background:'rgba(20,16,40,0.8)',border:'1.5px solid #A020F0',borderRadius:'14px',padding:'22px',position:'relative',boxShadow:'0 0 30px rgba(160,32,240,0.18)'}}>
            <div style={{position:'absolute',top:'-10px',left:'50%',transform:'translateX(-50%)',background:'#A020F0',padding:'3px 10px',borderRadius:'12px',fontSize:'11px',fontWeight:500,display:'flex',alignItems:'center',gap:'4px'}}>☆ Most Popular</div>
            <div style={{textAlign:'center',fontSize:'14px',fontWeight:500,color:'#fff',marginTop:'6px'}}>Pro</div>
            <div style={{textAlign:'center',fontSize:'32px',fontWeight:600,color:'#fff',marginTop:'6px'}}>₹999<span style={{fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.5)'}}> /mo</span></div>
            <div style={{textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.5)',marginTop:'4px',fontWeight:400}}>For creators & small teams</div>
            <div style={{marginTop:'16px',display:'grid',gap:'8px',fontSize:'13px',fontWeight:400,color:'rgba(255,255,255,0.75)'}}>
              <div><span style={{color:'#A020F0'}}>✓</span> 200 exports per month</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Full 3D + Vector export</div>
              <div><span style={{color:'#A020F0'}}>✓</span> HD & 4K exports</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Priority processing ~60s</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Commercial license</div>
            </div>
            <button style={{marginTop:'20px',width:'100%',background:'#A020F0',border:'none',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'13px',fontWeight:500}}>Start Pro Trial</button>
          </div>

          {/* Business */}
          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'14px',padding:'22px'}}>
            <div style={{textAlign:'center',fontSize:'14px',fontWeight:500,color:'#fff'}}>Business</div>
            <div style={{textAlign:'center',fontSize:'32px',fontWeight:600,color:'#fff',marginTop:'6px'}}>₹2499<span style={{fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.5)'}}> /mo</span></div>
            <div style={{textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.5)',marginTop:'4px',fontWeight:400}}>For teams & agencies</div>
            <div style={{marginTop:'16px',display:'grid',gap:'8px',fontSize:'13px',fontWeight:400,color:'rgba(255,255,255,0.75)'}}>
              <div><span style={{color:'#A020F0'}}>✓</span> 1000 exports per month</div>
              <div><span style={{color:'#A020F0'}}>✓</span> API access + bulk uploads</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Team workspaces (5 seats)</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Custom vector style controls</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Priority support • Slack</div>
            </div>
            <button style={{marginTop:'20px',width:'100%',background:'transparent',border:'1px solid rgba(255,255,255,0.14)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'13px',fontWeight:400}}>Contact Sales</button>
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'22px',fontSize:'11px',color:'rgba(255,255,255,0.4)',fontWeight:400}}>
          <span style={{background:'rgba(160,32,240,0.12)',border:'1px solid rgba(160,32,240,0.2)',padding:'4px 10px',borderRadius:'20px'}}>📍 Bootstrapped from Delhi • IIT Delhi alumni</span>
          <span>Trusted by 2k+ Delhi creators • Startups from Hauz Khas • Connaught Place • Gurugram</span>
        </div>
      </div>
    </div>
  )
}
