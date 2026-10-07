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
    <div style={{background:'#0B0A14',color:'#fff',fontFamily:'Inter, system-ui, sans-serif',minHeight:'100vh'}}>

      {/* HEADER */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 32px',borderBottom:'1px solid #1e1c32',background:'#0B0A14',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center'}}>
         <img src="/logo.png" alt="Pinna3d.com" style={{height:'100px',width:'auto',display:'block',filter:'drop-shadow(0 0 10px rgba(160,32,240,0.3))'}} />
        </div>
        <div style={{display:'flex',gap:'24px',alignItems:'center',fontSize:'14px'}}>
          <span style={{opacity:.6,cursor:'pointer'}}>Features</span>
          <span style={{color:'#A020F0',fontWeight:700,cursor:'pointer'}}>Pricing</span>
          <span style={{opacity:.6,cursor:'pointer'}}>Docs</span>
          <span style={{opacity:.6,cursor:'pointer'}}>Blog</span>
          <span style={{background:'#1e1c32',padding:'8px 16px',borderRadius:'8px',cursor:'pointer'}}>Sign In</span>
          <span style={{background:'#A020F0',padding:'8px 18px',borderRadius:'8px',fontWeight:700,cursor:'pointer'}}>Get Started</span>
        </div>
      </header>

      {/* HERO SECTION */}
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'20px',padding:'36px',maxWidth:'1400px',margin:'0 auto'}}>
        <div>
          <h1 style={{fontSize:'42px',lineHeight:'1.05',fontWeight:800,margin:0,letterSpacing:'-1px'}}>Every Image to 3D or Vector<br/>in 60 Seconds</h1>
          <p style={{opacity:.6,marginTop:'14px',fontSize:'14px',lineHeight:'1.6'}}>Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators in Delhi.</p>
          <div style={{display:'flex',gap:'12px',marginTop:'22px'}}>
            <div style={{background:'#A020F0',padding:'12px 20px',borderRadius:'10px',fontWeight:700,fontSize:'14px',cursor:'pointer'}}>✦ Start Creating — Free</div>
            <div style={{border:'1px solid #2a2840',padding:'12px 20px',borderRadius:'10px',fontSize:'14px',cursor:'pointer'}}>◉ Watch Demo</div>
          </div>
          <div style={{display:'flex',gap:'8px',marginTop:'20px',flexWrap:'wrap'}}>
            {['⚡ 60s Turnaround','100k+ assets generated','No credit card required','📍 Made in Delhi, India 🇮🇳'].map(t=>(
              <span key={t} style={{background:'#13111F',border:'1px solid #201e33',padding:'5px 12px',borderRadius:'20px',fontSize:'11px',opacity:.8}}>{t}</span>
            ))}
          </div>
        </div>

        <div onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed #A020F0',borderRadius:'18px',background:'#13111F',padding:'24px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <div style={{width:'56px',height:'56px',background:'#1e1b33',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'26px',color:'#A020F0',marginBottom:'14px'}}>☁️</div>
          <b style={{fontSize:'15px'}}>Drag & drop your image here</b>
          <span style={{opacity:.5,fontSize:'12px',marginTop:'6px'}}>or browse files to upload</span>
          <span style={{opacity:.35,fontSize:'10px',marginTop:'18px'}}>Supports PNG, JPG, WEBP • Max 20MB</span>
          <div style={{marginTop:'14px',background:'#1a1830',border:'1px solid #2a2840',padding:'6px 12px',borderRadius:'20px',fontSize:'10px',opacity:.7}}>Instant preview • Background removal included</div>
          <label style={{marginTop:'16px',cursor:'pointer',color:'#A020F0',fontSize:'13px',fontWeight:600}}><input type="file" hidden onChange={onFile}/>Browse Files</label>
          {preview && <img src={preview} alt="preview" style={{width:'90px',borderRadius:'8px',marginTop:'12px',border:'1px solid #2a2840'}}/>}
        </div>

        <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'18px',padding:'12px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',opacity:.5,padding:'6px'}}><span>3D Viewer Preview</span><span>↻ ⛶</span></div>
          <div style={{background:'radial-gradient(ellipse at center,#2a1a4a,#0f0e1a)',borderRadius:'12px',height:'230px',marginTop:'8px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
            {done && preview? <img src={preview} alt="3d" style={{height:'150px',filter:'drop-shadow(0 20px 30px #A020F0)',borderRadius:'8px'}}/> : <div style={{fontSize:'64px',opacity:.8}}>👟</div>}
            <div style={{position:'absolute',bottom:'10px',left:'10px',background:'rgba(0,0,0,0.6)',padding:'5px 10px',borderRadius:'6px',fontSize:'10px'}}>Model: Sneaker_v01.glb</div>
            {done && <div style={{position:'absolute',top:'10px',right:'10px',background:'#00c950',padding:'3px 8px',borderRadius:'6px',fontSize:'10px',fontWeight:700}}>Ready ✓</div>}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'12px'}}>
            <div style={{background:'#1a1830',border:'1px solid #2a2840',padding:'10px',borderRadius:'8px',textAlign:'center',fontSize:'12px',cursor:'pointer'}}>Download GLB</div>
            <div style={{background:'#A020F0',padding:'10px',borderRadius:'8px',textAlign:'center',fontSize:'12px',fontWeight:700,cursor:'pointer'}}>Export SVG</div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div style={{padding:'24px 36px 50px',maxWidth:'1400px',margin:'0 auto',borderTop:'1px solid #161426',marginTop:'10px'}}>
        <h2 style={{textAlign:'center',fontSize:'26px',fontWeight:800,margin:'12px 0 6px'}}>Simple, transparent pricing</h2>
        <p style={{textAlign:'center',opacity:.5,fontSize:'13px',marginBottom:'24px'}}>Start free. Upgrade when you need more.</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'18px'}}>
          {[
            {t:'Free',p:'₹0',d:'For individuals trying it out',f:['5 exports per month','3D preview only','Standard resolution','Community support'],btn:'Get Started Free',pop:false},
            {t:'Pro',p:'₹999',d:'For creators & small teams',f:['200 exports per month','Full 3D + Vector export','HD & 4K exports','Priority ~60s','Commercial license'],btn:'Start Pro Trial',pop:true},
            {t:'Business',p:'₹2499',d:'For teams & agencies',f:['1000 exports per month','API access + bulk','Team workspaces (5 seats)','Custom vector styles','Priority support'],btn:'Contact Sales',pop:false},
          ].map(c=>(
            <div key={c.t} style={{background:'#13111F',border:c.pop?'1.5px solid #A020F0':'1px solid #201e33',borderRadius:'16px',padding:'22px',position:'relative',boxShadow:c.pop?'0 0 40px rgba(160,32,240,0.25)':''}}>
              {c.pop && <div style={{position:'absolute',top:'-11px',left:'50%',transform:'translateX(-50%)',background:'#A020F0',padding:'3px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:700}}>☆ Most Popular</div>}
              <div style={{textAlign:'center',fontSize:'13px',fontWeight:600,opacity:.7}}>{c.t}</div>
              <div style={{textAlign:'center',fontSize:'34px',fontWeight:800,marginTop:'8px'}}>{c.p}<span style={{fontSize:'13px',opacity:.5,fontWeight:400}}> /mo</span></div>
              <div style={{textAlign:'center',fontSize:'11px',opacity:.5,marginTop:'6px'}}>{c.d}</div>
              <div style={{marginTop:'16px'}}>{c.f.map(fe=><div key={fe} style={{fontSize:'12px',margin:'7px 0',opacity:.8}}>✓ {fe}</div>)}</div>
              <div style={{marginTop:'20px',background:c.pop?'#A020F0':'transparent',border:c.pop?'none':'1px solid #2a2840',padding:'11px',borderRadius:'10px',textAlign:'center',fontSize:'13px',fontWeight:600,cursor:'pointer'}}>{c.btn}</div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{display:'flex',justifyContent:'space-between',padding:'16px 36px',fontSize:'11px',opacity:.4,borderTop:'1px solid #161426'}}>
        <span>© 2024 Pinna3d.com • Delhi, India</span>
        <span style={{display:'flex',gap:'18px'}}><span>Privacy</span><span>Terms</span><span>Discord</span><span>Twitter/X</span></span>
      </footer>
    </div>
  )
}
