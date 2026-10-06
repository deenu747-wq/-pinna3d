"use client"
import { useState } from "react"

export default function Page(){
  const [preview,setPreview]=useState("")
  const [done,setDone]=useState(false)
  const onFile = (e:any)=>{
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    setPreview(URL.createObjectURL(f))
    setTimeout(()=>setDone(true),1500)
  }

  return (
    <div style={{background:'#0B0A14',color:'#fff',fontFamily:'Inter, system-ui',minHeight:'100vh'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap'); *{font-family:Inter,system-ui}`}</style>

      {/* HEADER WITH YOUR LOGO */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'22px 36px',borderBottom:'1px solid #161426'}}>
        <img src="/logo.png" alt="Pinna3d.com" style={{height:'38px',width:'auto'}} onError={(e:any)=>{e.target.style.display='none'; e.target.nextSibling.style.display='flex'}}/>
        <div style={{display:'none',alignItems:'center',gap:'12px'}}>
          <div style={{width:'42px',height:'42px',background:'linear-gradient(135deg,#A020F0,#7a0fc0)',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px'}}>⬢</div>
          <div style={{fontSize:'32px',fontWeight:800,letterSpacing:'-1px'}}>Pinna3d<span style={{fontSize:'14px',color:'#A020F0',fontWeight:600,marginLeft:'2px',verticalAlign:'super'}}>.com</span></div>
        </div>
        <div style={{display:'flex',gap:'28px',alignItems:'center',fontSize:'14px'}}>
          <span style={{opacity:.6}}>Features</span>
          <span style={{color:'#A020F0',fontWeight:700}}>Pricing</span>
          <span style={{opacity:.6}}>Docs</span>
          <span style={{opacity:.6}}>Blog</span>
          <span style={{background:'#2a2840',padding:'8px 16px',borderRadius:'8px'}}>Sign In</span>
          <span style={{background:'#A020F0',padding:'8px 16px',borderRadius:'8px',fontWeight:700}}>Get Started</span>
        </div>
      </header>

      {/* HERO */}
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'22px',padding:'36px',maxWidth:'1400px',margin:'0 auto'}}>
        <div>
          <h1 style={{fontSize:'42px',lineHeight:'1.1',fontWeight:800,margin:0}}>Every Image to 3D or Vector<br/>in 60 Seconds</h1>
          <p style={{opacity:.6,marginTop:'14px',fontSize:'14px',lineHeight:'1.5'}}>Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators in Delhi.</p>
          <div style={{display:'flex',gap:'10px',marginTop:'20px'}}>
            <div style={{background:'#A020F0',padding:'10px 18px',borderRadius:'8px',fontWeight:700,fontSize:'14px'}}>✦ Start Creating — Free</div>
            <div style={{border:'1px solid #2a2840',padding:'10px 18px',borderRadius:'8px',fontSize:'14px'}}>◉ Watch Demo</div>
          </div>
          <div style={{display:'flex',gap:'8px',marginTop:'18px',flexWrap:'wrap'}}>
            {['⚡ 60s Turnaround','• 100k+ assets generated','• No credit card required','📍 Made in Delhi, India 🇮🇳'].map(t=>(
              <span key={t} style={{background:'#1a1830',border:'1px solid #2a2840',padding:'4px 10px',borderRadius:'20px',fontSize:'11px',opacity:.8}}>{t}</span>
            ))}
          </div>
        </div>

        <div onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed #A020F0',borderRadius:'18px',background:'#13111F',padding:'22px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',boxShadow:'0 0 0 4px rgba(160,32,240,0.08)'}}>
          <div style={{width:'64px',height:'64px',background:'#1e1b33',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',color:'#A020F0',marginBottom:'14px'}}>☁️</div>
          <b style={{fontSize:'16px'}}>Drag & drop your image here</b>
          <span style={{opacity:.5,fontSize:'13px',marginTop:'4px'}}>or browse files to upload</span>
          <span style={{opacity:.4,fontSize:'10px',marginTop:'16px'}}>Supports PNG, JPG, WEBP • Max 20MB • JPG/PNG to 3D or SVG</span>
          <div style={{marginTop:'14px',background:'#1a1830',border:'1px solid #2a2840',padding:'6px 12px',borderRadius:'20px',fontSize:'10px',opacity:.7}}>Instant preview • Background removal included</div>
          <label style={{marginTop:'16px',cursor:'pointer'}}><input type="file" hidden onChange={onFile}/>{preview && <img src={preview} style={{width:'100px',borderRadius:'8px',margin:'0 auto'}}/>}</label>
        </div>

        <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'18px',padding:'12px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',opacity:.6,padding:'4px 6px'}}><span>3D Viewer Preview</span><span>↻ ⛶...</span></div>
          <div style={{background:'radial-gradient(ellipse at center,#2a1a4a,#0f0e1a)',borderRadius:'12px',height:'220px',marginTop:'8px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(transparent 60%, rgba(160,32,240,0.2))'}}></div>
            <div style={{width:'100%',height:'1px',background:'repeating-linear-gradient(90deg,#A020F0 0 10px, transparent 10px 20px)',position:'absolute',bottom:'60px',opacity:.3}}></div>
            {done? <img src={preview} style={{height:'140px',filter:'drop-shadow(0 20px 30px #A020F0)'}}/> : <div style={{fontSize:'60px'}}>👟</div>}
            <div style={{position:'absolute',bottom:'10px',left:'10px',background:'rgba(0,0,0,0.6)',padding:'4px 8px',borderRadius:'6px',fontSize:'10px'}}>Model: Sneaker_v01.glb</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
            <div style={{background:'#1a1830',border:'1px solid #2a2840',padding:'8px',borderRadius:'8px',textAlign:'center',fontSize:'12px'}}>Download GLB</div>
            <div style={{background:'#A020F0',padding:'8px',borderRadius:'8px',textAlign:'center',fontSize:'12px',fontWeight:700}}>Export SVG</div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div style={{padding:'20px 36px 40px',maxWidth:'1400px',margin:'0 auto',borderTop:'1px solid #161426',marginTop:'10px'}}>
        <h2 style={{textAlign:'center',fontSize:'26px',fontWeight:800,margin:'10px 0 6px'}}>Simple, transparent pricing</h2>
        <p style={{textAlign:'center',opacity:.5,fontSize:'13px',marginBottom:'20px'}}>Start free. Upgrade when you need more. Perfect for startups and studios in Delhi.</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'18px'}}>
          {[
            {t:'Free',p:'₹0',d:'For individuals trying it out',f:['5 exports per month','3D preview only','Standard resolution exports','Community support'],btn:'Get Started Free',pop:false},
            {t:'Pro',p:'₹999',d:'For creators & small teams',f:['200 exports per month','Full 3D + Vector export','HD & 4K exports','Priority processing ~60s','Commercial license'],btn:'Start Pro Trial',pop:true},
            {t:'Business',p:'₹2499',d:'For teams & agencies',f:['1000 exports per month','API access + bulk uploads','Team workspaces (5 seats)','Custom vector style controls','Priority support • Slack'],btn:'Contact Sales',pop:false},
          ].map(c=>(
            <div key={c.t} style={{background:'#13111F',border:c.pop?'1.5px solid #A020F0':'1px solid #201e33',borderRadius:'16px',padding:'20px',position:'relative',boxShadow:c.pop?'0 0 30px rgba(160,32,240,0.25)':''}}>
              {c.pop && <div style={{position:'absolute',top:'-10px',left:'50%',transform:'translateX(-50%)',background:'#A020F0',padding:'2px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:700}}>☆ Most Popular</div>}
              <div style={{textAlign:'center',fontSize:'14px',fontWeight:600}}>{c.t}</div>
              <div style={{textAlign:'center',fontSize:'32px',fontWeight:800,marginTop:'6px'}}>{c.p}<span style={{fontSize:'14px',opacity:.5,fontWeight:400}> /mo</span></div>
              <div style={{textAlign:'center',fontSize:'12px',opacity:.6,marginTop:'4px'}}>{c.d}</div>
              <div style={{marginTop:'14px'}}>
                {c.f.map(fe=><div key={fe} style={{fontSize:'12px',margin:'6px 0',opacity:.8}}>✓ {fe}</div>)}
              </div>
              <div style={{marginTop:'18px',background:c.pop?'#A020F0':'transparent',border:c.pop?'none':'1px solid #2a2840',padding:'10px',borderRadius:'8px',textAlign:'center',fontSize:'13px',fontWeight:600}}>{c.btn}</div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{display:'flex',justifyContent:'space-between',padding:'14px 36px',fontSize:'11px',opacity:.4,borderTop:'1px solid #161426'}}>
        <span>© 2024 Pinna3d.com • Delhi, India</span>
        <span style={{display:'flex',gap:'16px'}}><span>Privacy</span><span>Terms</span><span>Discord</span><span>Twitter/X</span></span>
      </footer>
    </div>
  )
}
