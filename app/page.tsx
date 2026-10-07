"use client"
import { useState } from "react"

export default function Page(){
  const [preview,setPreview]=useState("")
  const [done,setDone]=useState(false)

  const onFile = (e:any)=>{
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    setPreview(URL.createObjectURL(f))
    setTimeout(()=>setDone(true),1200)
  }

  return (
    <div style={{background:'#0B0A14',color:'#fff',fontFamily:'Inter, system-ui',minHeight:'100vh'}}>

      {/* HEADER - EXACT LIKE SCREENSHOT */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 40px',borderBottom:'1px solid #1e1c32',background:'#0B0A14',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',fontWeight:800,fontSize:'26px'}}>
          <div style={{width:'38px',height:'38px',background:'linear-gradient(135deg,#A020F0,#6A11CB)',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center'}}>◈</div>
          <span>Pinna3d<span style={{fontSize:'13px',opacity:.6,marginLeft:'2px'}}>.com</span></span>
        </div>
        <div style={{display:'flex',gap:'28px',alignItems:'center',fontSize:'14px'}}>
          <span style={{opacity:.6,cursor:'pointer'}}>Features</span>
          <span style={{color:'#A020F0',fontWeight:700,cursor:'pointer'}}>Pricing</span>
          <span style={{opacity:.6,cursor:'pointer'}}>Docs</span>
          <span style={{opacity:.6,cursor:'pointer'}}>Blog</span>
          <button style={{background:'#2a2840',padding:'8px 16px',borderRadius:'8px',cursor:'pointer',border:'none',color:'#fff'}}>Sign In</button>
          <button style={{background:'#A020F0',padding:'8px 18px',borderRadius:'8px',fontWeight:700,cursor:'pointer',border:'none',color:'#fff'}}>Get Started</button>
        </div>
      </header>

      {/* HERO - EXACT LIKE SCREENSHOT */}
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'24px',padding:'40px',maxWidth:'1400px',margin:'0 auto'}}>
        <div>
          <h1 style={{fontSize:'44px',lineHeight:'1.05',fontWeight:800,margin:0,letterSpacing:'-1px'}}>Every Image to 3D or Vector<br/>in 60 Seconds</h1>
          <p style={{opacity:.6,marginTop:'16px',fontSize:'14px',lineHeight:'1.6'}}>Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators in Delhi.</p>
          <div style={{display:'flex',gap:'12px',marginTop:'24px'}}>
            <button style={{background:'#A020F0',padding:'12px 20px',borderRadius:'10px',fontWeight:700,fontSize:'14px',cursor:'pointer',border:'none',color:'#fff'}}>✦ Start Creating — Free</button>
            <button style={{border:'1px solid #2a2840',background:'transparent',padding:'12px 20px',borderRadius:'10px',fontSize:'14px',cursor:'pointer',color:'#fff'}}>◉ Watch Demo</button>
          </div>
          <div style={{display:'flex',gap:'8px',marginTop:'22px',flexWrap:'wrap'}}>
            <span style={{background:'#1f1c33',border:'1px solid #2a2840',padding:'5px 12px',borderRadius:'20px',fontSize:'11px'}}>⚡ 60s Turnaround</span>
            <span style={{background:'#1f1c33',border:'1px solid #2a2840',padding:'5px 12px',borderRadius:'20px',fontSize:'11px'}}>• 100k+ assets generated</span>
            <span style={{background:'#1f1c33',border:'1px solid #2a2840',padding:'5px 12px',borderRadius:'20px',fontSize:'11px'}}>• No credit card required</span>
            <span style={{background:'#1f1c33',border:'1px solid #2a2840',padding:'5px 12px',borderRadius:'20px',fontSize:'11px'}}>📍 Made in Delhi, India 🇮🇳</span>
          </div>
        </div>

        {/* UPLOAD BOX - CLICKABLE */}
        <div onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed #A020F0',borderRadius:'18px',background:'#13111F',padding:'28px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',boxShadow:'0 0 30px rgba(160,32,240,0.15)'}}>
          <div style={{width:'64px',height:'64px',background:'#1e1b33',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'32px',color:'#A020F0',marginBottom:'16px'}}>☁️</div>
          <b style={{fontSize:'16px'}}>Drag & drop your image here</b>
          <span style={{opacity:.5,fontSize:'13px',marginTop:'6px'}}>or browse files to upload</span>
          <span style={{opacity:.35,fontSize:'10px',marginTop:'18px'}}>Supports PNG, JPG, WEBP • Max 20MB • JPG/PNG to 3D or SVG</span>
          <div style={{marginTop:'14px',background:'#1a1830',border:'1px solid #2a2840',padding:'6px 14px',borderRadius:'20px',fontSize:'10px',opacity:.7}}>Instant preview • Background removal included</div>

          <label style={{marginTop:'18px',cursor:'pointer',background:'#A020F0',color:'#fff',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:600,display:'inline-block'}}>
            <input type="file" hidden onChange={onFile} accept="image/*" />
            {preview? 'Change Image' : 'Browse Files'}
          </label>
          {preview && <img src={preview} alt="preview" style={{width:'100px',borderRadius:'8px',marginTop:'14px',border:'1px solid #2a2840'}}/>}
        </div>

        {/* 3D VIEWER - EXACT LIKE SCREENSHOT */}
        <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'18px',padding:'14px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',opacity:.5,padding:'6px'}}><span>3D Viewer Preview</span><span>↻ ⛶...</span></div>
          <div style={{background:'radial-gradient(ellipse at center,#2a1a4a,#0f0e1a)',borderRadius:'12px',height:'240px',marginTop:'8px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden',border:'1px solid #1e1c32'}}>
            {done && preview?
              <img src={preview} alt="model" style={{height:'150px',filter:'drop-shadow(0 20px 30px #A020F0)',borderRadius:'8px'}}/>
              :
              <img src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400" alt="sneaker" style={{width:'90%',objectFit:'contain',filter:'drop-shadow(0 0 20px #A020F0)'}} />
            }
            <div style={{position:'absolute',bottom:'10px',left:'10px',background:'rgba(0,0,0,0.7)',padding:'5px 10px',borderRadius:'6px',fontSize:'10px'}}>Model: Sneaker_v01.glb</div>
            {done && <div style={{position:'absolute',top:'10px',right:'10px',background:'#00c950',padding:'4px 10px',borderRadius:'6px',fontSize:'10px',fontWeight:700}}>Ready ✓</div>}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginTop:'14px'}}>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'11px',borderRadius:'10px',textAlign:'center',fontSize:'12px',cursor:'pointer',color:'#fff'}}>Download GLB</button>
            <button style={{background:'#A020F0',padding:'11px',borderRadius:'10px',textAlign:'center',fontSize:'12px',fontWeight:700,cursor:'pointer',border:'none',color:'#fff'}}>Export SVG</button>
          </div>
        </div>
      </div>

      {/* PRICING - EXACT LIKE SCREENSHOT */}
      <div style={{padding:'30px 40px 20px',maxWidth:'1400px',margin:'0 auto',borderTop:'1px solid #161426',background:'#0e0c1a'}}>
        <h2 style={{textAlign:'center',fontSize:'28px',fontWeight:800,margin:'0'}}>Simple, transparent pricing</h2>
        <p style={{textAlign:'center',opacity:.5,fontSize:'13px',margin:'8px 0 28px'}}>Start free. Upgrade when you need more. Perfect for startups and studios in Delhi.</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'20px'}}>
          <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'16px',padding:'24px'}}>
            <div style={{textAlign:'center',fontSize:'14px',fontWeight:600}}>Free</div>
            <div style={{textAlign:'center',fontSize:'36px',fontWeight:800,marginTop:'6px'}}>₹0<span style={{fontSize:'14px',opacity:.5,fontWeight:400}}> /mo</span></div>
            <div style={{textAlign:'center',fontSize:'12px',opacity:.5,marginTop:'6px'}}>For individuals trying it out</div>
            <div style={{marginTop:'18px',fontSize:'12px',lineHeight:'2'}}><div>✓ 5 exports per month</div><div>✓ 3D preview only</div><div>✓ Standard resolution exports</div><div>✓ Community support</div></div>
            <button style={{marginTop:'22px',width:'100%',background:'transparent',border:'1px solid #2a2840',padding:'11px',borderRadius:'10px',color:'#fff',cursor:'pointer'}}>Get Started Free</button>
          </div>

          <div style={{background:'#13111F',border:'1.5px solid #A020F0',borderRadius:'16px',padding:'24px',position:'relative',boxShadow:'0 0 40px rgba(160,32,240,0.25)'}}>
            <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#A020F0',padding:'4px 14px',borderRadius:'20px',fontSize:'11px',fontWeight:700}}>☆ Most Popular</div>
            <div style={{textAlign:'center',fontSize:'14px',fontWeight:600}}>Pro</div>
            <div style={{textAlign:'center',fontSize:'36px',fontWeight:800,marginTop:'6px'}}>₹999<span style={{fontSize:'14px',opacity:.5,fontWeight:400}}> /mo</span></div>
            <div style={{textAlign:'center',fontSize:'12px',opacity:.5,marginTop:'6px'}}>For creators & small teams</div>
            <div style={{marginTop:'18px',fontSize:'12px',lineHeight:'2'}}><div>✓ 200 exports per month</div><div>✓ Full 3D + Vector export</div><div>✓ HD & 4K exports</div><div>✓ Priority processing ~60s</div><div>✓ Commercial license</div></div>
            <button style={{marginTop:'22px',width:'100%',background:'#A020F0',border:'none',padding:'11px',borderRadius:'10px',color:'#fff',fontWeight:700,cursor:'pointer'}}>Start Pro Trial</button>
          </div>

          <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'16px',padding:'24px'}}>
            <div style={{textAlign:'center',fontSize:'14px',fontWeight:600}}>Business</div>
            <div style={{textAlign:'center',fontSize:'36px',fontWeight:800,marginTop:'6px'}}>₹2499<span style={{fontSize:'14px',opacity:.5,fontWeight:400}}> /mo</span></div>
            <div style={{textAlign:'center',fontSize:'12px',opacity:.5,marginTop:'6px'}}>For teams & agencies</div>
            <div style={{marginTop:'18px',fontSize:'12px',lineHeight:'2'}}><div>✓ 1000 exports per month</div><div>✓ API access + bulk uploads</div><div>✓ Team workspaces (5 seats)</div><div>✓ Custom vector style controls</div><div>✓ Priority support • Slack</div></div>
            <button style={{marginTop:'22px',width:'100%',background:'transparent',border:'1px solid #2a2840',padding:'11px',borderRadius:'10px',color:'#fff',cursor:'pointer'}}>Contact Sales</button>
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'30px',fontSize:'11px',opacity:.5}}>
          <span style={{background:'#1e1b33',padding:'4px 10px',borderRadius:'20px'}}>📍 Bootstrapped from Delhi • IIT Delhi alumni</span>
          <span>Trusted by 2k+ Delhi creators • Startups from Hauz Khas • Connaught Place • Gurugram</span>
        </div>
      </div>

      <footer style={{display:'flex',justifyContent:'space-between',padding:'16px 40px',fontSize:'11px',opacity:.4,borderTop:'1px solid #161426'}}>
        <span>© 2024 Pinna3d.com • Delhi, India • Bootstrapped</span>
        <span style={{display:'flex',gap:'20px'}}><span>Privacy</span><span>Terms</span><span>Discord</span><span>Twitter/X</span></span>
      </footer>
    </div>
  )
}
