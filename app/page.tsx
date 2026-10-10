"use client"
import { useState, useRef } from "react"

export default function Page(){
  const [preview,setPreview]=useState("")
  const [done,setDone]=useState(false)
  const [tab,setTab]=useState("image3d")
  const [billing,setBilling]=useState<"monthly"|"yearly">("monthly")
  const fileRef = useRef<HTMLInputElement>(null)

  const onFile = (e:any)=>{
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    setPreview(URL.createObjectURL(f))
    setDone(false)
    setTimeout(()=>setDone(true),1000)
  }
  const openPicker = () => fileRef.current?.click()

  const plans = [
    {name:"Free Trial", m:0, y:0, badge:"FREE TRIAL", cta:"Get Started Free", credits:"100 credits", exp:"5 exports FREE", feats:["Photo Studio – 5 exports","Vector preview only","Standard quality","No CC required"]},
    {name:"Starter", m:999, y:799, badge:"FOR SELLERS", cta:"Choose Starter", credits:"1500 credits", exp:"100 exports / mo", feats:["Photo + Vector full","All 2D: JPG, SVG, EPS, AI","HD + Banner Maker","100% refund"]},
    {name:"Creator", m:2999, y:2399, badge:"MOST POPULAR", cta:"Start Free Trial →", credits:"6000 credits", exp:"400 exports / mo", feats:["Photo + Vector + 3D Studio","4K + Batch 100x","Motion Studio beta","Best value: 2.5x more"]},
    {name:"Pro", m:4999, y:3999, badge:"FOR TEAMS", cta:"Choose Pro", credits:"15000 + API", exp:"1000 + API", feats:["All studios + all formats","GLB, FBX, SVG, MP4, BLEND, AE","Team 3 seats + API","White-label + SLA"]},
  ]

  return (
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh',backgroundImage:`radial-gradient(900px 480px at 50% -10%, rgba(160,32,240,0.22), transparent 70%)`,WebkitFontSmoothing:'antialiased'}}>
      {/* HEADER - Logo bigger + Buttons smaller */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 32px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
        {/* 3. INCREASED LOGO SIZE + HIGHLIGHTED */}
        <img src="/logo.png" alt="Pinna3d.com" style={{height:'62px',width:'auto',objectFit:'contain',filter:'drop-shadow(0 0 12px rgba(160,32,240,0.6))'}} />
        <div style={{display:'flex',gap:'18px',alignItems:'center',fontSize:'13px',fontWeight:400}}>
          <span>Features</span>
          <span style={{color:'#A020F0'}}>Pricing</span>
          <span>Docs</span>
          <span>Blog</span>
          {/* 1. REDUCED TOP RIGHT BUTTON SIZE */}
          <button style={{background:'rgba(255,255,255,0.08)',padding:'6px 12px',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.12)',color:'#fff',fontSize:'12px',fontWeight:400,height:'32px'}}>Sign In</button>
          <button style={{background:'#A020F0',padding:'6px 14px',borderRadius:'8px',border:'none',color:'#fff',fontWeight:500,fontSize:'12px',height:'32px',boxShadow:'0 0 16px rgba(160,32,240,0.45)'}}>Get Started</button>
        </div>
      </header>

      {/* TOP LEFT PILLS - 2. REDUCED SPACING */}
      <div style={{display:'flex',gap:'6px',padding:'10px 32px',background:'rgba(255,255,255,0.02)',borderBottom:'1px solid rgba(255,255,255,0.06)',overflowX:'auto'}}>
        {["Image to 3D","Multi-Image to 3D","Text to 3D","Text to Texture"].map((t,i)=>{
          const k=["image3d","multi","text3d","texture"][i]
          return <button key={k} onClick={()=>setTab(k)} style={{padding:'6px 12px',borderRadius:'18px',fontSize:'11px',fontWeight:400,border:tab===k?'1px solid #A020F0':'1px solid rgba(255,255,255,0.14)',background:tab===k?'#A020F0':'transparent',color:'#fff',cursor:'pointer',whiteSpace:'nowrap',height:'28px'}}>{t}</button>
        })}
        <button style={{padding:'6px 12px',borderRadius:'18px',fontSize:'11px',fontWeight:400,border:'1px solid rgba(255,255,255,0.14)',background:'transparent',color:'#fff',whiteSpace:'nowrap',height:'28px'}}>Template Studio ★ NEW</button>
        <a href="/image-to-vector" style={{padding:'6px 12px',borderRadius:'18px',fontSize:'11px',fontWeight:500,border:'1px solid rgba(160,32,240,0.5)',background:'rgba(160,32,240,0.14)',color:'#fff',textDecoration:'none',whiteSpace:'nowrap',height:'28px',display:'grid',placeItems:'center'}}>Image to Vector ★ NEW</a>
      </div>

      {/* 6. REDUCED SPACING AMONG EACH SECTION */}
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'16px',padding:'28px 32px',maxWidth:'1440px',margin:'0 auto'}}>
        <div>
          <h1 style={{fontSize:'42px',lineHeight:'1.05',fontWeight:600,letterSpacing:'-0.03em',margin:0,color:'#fff'}}>Every Image to 3D<br/><span style={{background:'linear-gradient(90deg,#A020F0,#FF7AD1)',WebkitBackgroundClip:'text',color:'transparent'}}>in 60 Seconds</span></h1>
          <p style={{color:'rgba(255,255,255,0.85)',marginTop:'12px',fontSize:'14px',lineHeight:'1.6',fontWeight:400}}>Upload any photo → get studio-ready 3D, vector & video. Trusted by 100k+ sellers worldwide.</p>
          <div style={{display:'flex',gap:'10px',marginTop:'18px'}}>
            <button style={{background:'#A020F0',boxShadow:'0 0 20px rgba(160,32,240,0.45)',padding:'10px 18px',borderRadius:'10px',fontWeight:500,border:'none',color:'#fff',fontSize:'12px',height:'36px'}}>✦ Start Creating — Free</button>
            <button style={{border:'1px solid rgba(255,255,255,0.18)',background:'rgba(255,255,255,0.06)',padding:'10px 18px',borderRadius:'10px',color:'#fff',fontSize:'12px',fontWeight:400,height:'36px'}}>◉ Watch Demo</button>
          </div>
        </div>

        {/* 4. REPLACE DOTS WITH LINES/DASHES */}
        <div onClick={openPicker} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.8px dashed rgba(168,85,247,0.85)',borderRadius:'14px',background:'rgba(255,255,255,0.03)',padding:'18px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'52px',height:'52px',background:'rgba(160,32,240,0.18)',borderRadius:'10px',display:'grid',placeItems:'center',fontSize:'24px',marginBottom:'10px'}}>☁️</div>
          <b style={{fontSize:'13px',fontWeight:500,color:'#fff'}}>Drag & drop your image here</b>
          <div style={{marginTop:'14px',background:'#A020F0',color:'#fff',padding:'8px 18px',borderRadius:'8px',fontSize:'11px',fontWeight:400}}>Browse Files</div>
          {preview && <img src={preview} alt="preview" style={{width:'80px',borderRadius:'8px',marginTop:'10px'}}/>}
        </div>

        {/* 5. IMAGE FIXED - Now shows sneaker.webp */}
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'14px',padding:'10px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'rgba(255,255,255,0.65)',padding:'4px',fontWeight:400}}><span>3D Viewer Preview</span><span>↻ ⛶</span></div>
          <div style={{background:'radial-gradient(ellipse at center,rgba(160,32,240,0.24),transparent 70%)',borderRadius:'10px',height:'190px',display:'grid',placeItems:'center',overflow:'hidden'}}>
            {done && preview? <img src={preview} alt="3d" style={{height:'140px',borderRadius:'8px'}}/> : <img src="/sneaker.webp" alt="Sneaker 3D" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'10px'}}/>}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'8px'}}>
            <span style={{fontSize:'10px',color:'rgba(255,255,255,0.5)',fontWeight:400}}>Model: Sneaker_v01.glb</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',marginTop:'6px'}}>
            <button style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',padding:'6px',borderRadius:'6px',color:'#fff',fontSize:'11px',fontWeight:400,height:'28px'}}>Download GLB</button>
            <button style={{background:'#A020F0',border:'none',padding:'6px',borderRadius:'6px',color:'#fff',fontSize:'11px',fontWeight:400,height:'28px'}}>Export SVG</button>
          </div>
        </div>
      </div>

      {/* 6. REDUCED SECTION GAP */}
      <div style={{padding:'20px 32px 16px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{textAlign:'center',maxWidth:'720px',margin:'0 auto'}}>
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.32)',padding:'4px 10px',borderRadius:'20px',fontSize:'10px',letterSpacing:'.12em',color:'#D6A5FF',fontWeight:500}}>FOUR STUDIOS • ONE PLATFORM</div>
          <h2 style={{fontSize:'26px',fontWeight:500,letterSpacing:'-0.02em',margin:'10px 0 6px',lineHeight:1.2,color:'#fff'}}>Everything you need to create,<br/>in one place</h2>
          <p style={{color:'rgba(255,255,255,0.75)',fontSize:'13px',lineHeight:'1.5',margin:0,fontWeight:400}}>Photo, Vector, 3D and Motion — built for creators worldwide.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'12px',marginTop:'18px'}}>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.15) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'14px',padding:'16px'}}>
            <div style={{width:'36px',height:'36px',background:'#A020F0',borderRadius:'8px',display:'grid',placeItems:'center',fontSize:'18px'}}>📸</div>
            <h3 style={{fontSize:'15px',fontWeight:500,margin:'12px 0 6px',color:'#fff'}}>Photo Studio</h3>
            <p style={{fontSize:'12px',color:'rgba(255,255,255,0.75)',lineHeight:'1.4',margin:0,fontWeight:400}}>Your Shopify photos, studio-ready in 1 sec.</p>
            <div style={{marginTop:'10px',display:'grid',gap:'5px',fontSize:'12px',color:'rgba(255,255,255,0.85)',fontWeight:400}}><span><span style={{color:'#A020F0'}}>•</span> Remove Background</span><span><span style={{color:'#A020F0'}}>•</span> Remove Object</span><span><span style={{color:'#A020F0'}}>•</span> AI Backgrounds</span><span><span style={{color:'#A020F0'}}>•</span> Upscaler + Banner</span></div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.26) 0%, rgba(255,255,255,0.04) 100%)',border:'1.6px solid #A020F0',borderRadius:'14px',padding:'16px',position:'relative'}}>
            <div style={{position:'absolute',top:'8px',right:'8px',background:'#A020F0',padding:'3px 8px',borderRadius:'20px',fontSize:'9px',fontWeight:500}}>YOUR USP ★</div>
            <div style={{width:'36px',height:'36px',background:'rgba(255,255,255,0.07)',border:'1px solid #A020F0',borderRadius:'8px',display:'grid',placeItems:'center',fontSize:'18px'}}>✒️</div>
            <h3 style={{fontSize:'15px',fontWeight:500,margin:'12px 0 6px',color:'#fff'}}>Vector Studio</h3>
            <p style={{fontSize:'12px',color:'rgba(255,255,255,0.75)',lineHeight:'1.4',margin:0,fontWeight:400}}>Blurry logo → sharp print-ready SVG.</p>
            <div style={{marginTop:'10px',display:'grid',gap:'5px',fontSize:'12px',color:'rgba(255,255,255,0.85)',fontWeight:400}}><span><span style={{color:'#A020F0'}}>•</span> Image to Vector</span><span><span style={{color:'#A020F0'}}>•</span> Photo to Line Art</span><span><span style={{color:'#A020F0'}}>•</span> Logo Vectorizer</span><span><span style={{color:'#A020F0'}}>•</span> Batch 100x</span></div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'14px',padding:'16px'}}>
            <div style={{width:'36px',height:'36px',background:'rgba(255,255,255,0.09)',borderRadius:'8px',display:'grid',placeItems:'center',fontSize:'18px'}}>🧊</div>
            <h3 style={{fontSize:'15px',fontWeight:500,margin:'12px 0 6px',color:'#fff'}}>3D Studio</h3>
            <p style={{fontSize:'12px',color:'rgba(255,255,255,0.75)',lineHeight:'1.4',margin:0,fontWeight:400}}>Photo → production 3D for Shopify & games.</p>
            <div style={{marginTop:'10px',display:'grid',gap:'5px',fontSize:'12px',color:'rgba(255,255,255,0.85)',fontWeight:400}}><span><span style={{color:'#A020F0'}}>•</span> Image to 3D – 60 sec</span><span><span style={{color:'#A020F0'}}>•</span> Multi-Image to 3D</span><span><span style={{color:'#A020F0'}}>•</span> Text to 3D</span><span><span style={{color:'#A020F0'}}>•</span> Remesh, Rig</span></div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.15) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'14px',padding:'16px'}}>
            <div style={{width:'36px',height:'36px',background:'#A020F0',borderRadius:'8px',display:'grid',placeItems:'center',fontSize:'18px'}}>🎬</div>
            <h3 style={{fontSize:'15px',fontWeight:500,margin:'12px 0 6px',color:'#fff'}}>Motion Studio</h3>
            <p style={{fontSize:'12px',color:'rgba(255,255,255,0.75)',lineHeight:'1.4',margin:0,fontWeight:400}}>Static → viral Reels, ads, intros.</p>
            <div style={{marginTop:'10px',display:'grid',gap:'5px',fontSize:'12px',color:'rgba(255,255,255,0.85)',fontWeight:400}}><span><span style={{color:'#A020F0'}}>•</span> Text/Image to Video</span><span><span style={{color:'#A020F0'}}>•</span> Logo Animation</span><span><span style={{color:'#A020F0'}}>•</span> Reels, Promo</span><span><span style={{color:'#A020F0'}}>•</span> Stock, Music</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
