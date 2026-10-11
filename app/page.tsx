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
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh',WebkitFontSmoothing:'antialiased'}}>
      {/* HEADER - Screenshot style */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 40px',background:'#0A0814',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <img src="/logo.png" alt="Pinna3d.com" style={{height:'46px',width:'auto',objectFit:'contain'}} />
          <span style={{fontSize:'28px',fontWeight:700,letterSpacing:'-0.02em'}}>Pinna3d<span style={{fontSize:'16px',color:'#A020F0',fontWeight:400}}>.com</span></span>
        </div>
        <div style={{display:'flex',gap:'24px',alignItems:'center',fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.7)'}}>
          <span>Features</span>
          <span style={{color:'#A020F0'}}>Pricing</span>
          <span>Docs</span>
          <span>Blog</span>
          <button style={{background:'#2A2838',padding:'8px 16px',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',fontSize:'13px'}}>Sign In</button>
          <button style={{background:'#A020F0',padding:'8px 18px',borderRadius:'8px',border:'none',color:'#fff',fontWeight:500,fontSize:'13px'}}>Get Started</button>
        </div>
      </header>

      {/* 1. FIRST SECTION - Screenshot formatting / square boxes / borders / but your colors */}
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.85fr 0.85fr',gap:'18px',padding:'36px 40px',background:'#0A0814',maxWidth:'1440px',margin:'0 auto'}}>
        <div>
          <h1 style={{fontSize:'38px',lineHeight:'1.1',fontWeight:700,letterSpacing:'-0.02em',margin:0,color:'#fff'}}>Every Image to 3D or Vector<br/>in 60 Seconds</h1>
          <p style={{color:'rgba(255,255,255,0.7)',marginTop:'14px',fontSize:'14px',lineHeight:'1.6',fontWeight:400,maxWidth:'440px'}}>Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators worldwide.</p>
          <div style={{display:'flex',gap:'10px',marginTop:'20px'}}>
            <button style={{background:'#A020F0',padding:'10px 18px',borderRadius:'8px',fontWeight:500,border:'none',color:'#fff',fontSize:'13px',display:'flex',alignItems:'center',gap:'6px'}}>✦ Start Creating — Free</button>
            <button style={{border:'1px solid rgba(255,255,255,0.14)',background:'transparent',padding:'10px 18px',borderRadius:'8px',color:'#fff',fontSize:'13px',fontWeight:400,display:'flex',alignItems:'center',gap:'6px'}}>◉ Watch Demo</button>
          </div>
          <div style={{display:'flex',gap:'8px',marginTop:'18px',flexWrap:'wrap'}}>
            {["60s Turnaround","100k+ assets generated","No credit card required"].map(t=>(
              <span key={t} style={{background:'rgba(160,32,240,0.12)',border:'1px solid rgba(160,32,240,0.2)',padding:'4px 10px',borderRadius:'20px',fontSize:'11px',color:'rgba(255,255,255,0.8)'}}>• {t}</span>
            ))}
          </div>
        </div>

        {/* Square dashed box - screenshot style */}
        <div onClick={openPicker} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed #A020F0',borderRadius:'12px',background:'rgba(255,255,255,0.03)',padding:'18px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'64px',height:'64px',background:'rgba(160,32,240,0.12)',border:'1px solid rgba(160,32,240,0.3)',borderRadius:'12px',display:'grid',placeItems:'center',fontSize:'28px',marginBottom:'12px',color:'#A020F0'}}>☁️</div>
          <b style={{fontSize:'15px',fontWeight:600,color:'#fff'}}>Drag & drop your image here</b>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.6)',marginTop:'4px'}}>or browse files to upload</div>
          <div style={{fontSize:'10px',color:'rgba(255,255,255,0.45)',marginTop:'12px'}}>Supports PNG, JPG, WEBP • Max 20MB • JPG/PNG to 3D or SVG</div>
          <div style={{marginTop:'14px',border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.05)',padding:'6px 12px',borderRadius:'6px',fontSize:'10px',color:'rgba(255,255,255,0.7)'}}>Instant preview • Background removal included</div>
          {preview && <img src={preview} alt="preview" style={{width:'90px',borderRadius:'8px',marginTop:'12px'}}/>}
        </div>

        {/* Square 3D Viewer - screenshot style */}
        <div style={{background:'#15131E',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',padding:'12px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.6)',padding:'4px 4px 10px'}}>3D Viewer Preview <span>↻ ⛶ •••</span></div>
          <div style={{background:'radial-gradient(ellipse at center,rgba(160,32,240,0.25),transparent 70%)',borderRadius:'8px',height:'200px',display:'grid',placeItems:'center',overflow:'hidden',border:'1px solid rgba(255,255,255,0.06)'}}>
            {done && preview? <img src={preview} alt="3d" style={{height:'160px'}}/> : <img src="/sneaker.webp" alt="Sneaker" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'8px'}}/>}
          </div>
          <div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'8px',padding:'0 4px'}}>Model: Sneaker_v01.glb</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
            <button style={{background:'transparent',border:'1px solid rgba(255,255,255,0.12)',padding:'8px',borderRadius:'6px',color:'#fff',fontSize:'12px'}}>Download GLB</button>
            <button style={{background:'#A020F0',border:'none',padding:'8px',borderRadius:'6px',color:'#fff',fontSize:'12px'}}>Export SVG</button>
          </div>
        </div>
      </div>

      {/* 2. SECOND SECTION - 4 Studios but in square boxes like screenshot pricing */}
      <div style={{padding:'36px 40px',background:'#0F0E18',borderTop:'1px solid rgba(255,255,255,0.06)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{textAlign:'center',maxWidth:'800px',margin:'0 auto 28px'}}>
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.3)',padding:'5px 12px',borderRadius:'20px',fontSize:'11px',letterSpacing:'.1em',color:'#D6A5FF'}}>FOUR STUDIOS • ONE PLATFORM</div>
          <h2 style={{fontSize:'30px',fontWeight:600,margin:'12px 0 8px',color:'#fff'}}>Everything you need to create</h2>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',margin:0}}>Photo, Vector, 3D and Motion — built for creators worldwide.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'16px',maxWidth:'1440px',margin:'0 auto'}}>
          {[
            {icon:'📸',title:'Photo Studio',desc:'Your Shopify photos, studio-ready.',bullets:["Remove Background","Remove Object","AI Backgrounds","Upscaler + Banner"],formats:'JPG, PNG, EPS, SVG, PSD, AI'},
            {icon:'✒️',title:'Vector Studio',desc:'Blurry logo → sharp SVG.',bullets:["Image to Vector","Photo to Line Art","Logo Vectorizer","Batch 100x"],formats:'JPG, PNG, EPS, SVG, PSD, CDR, AI',pop:true},
            {icon:'🧊',title:'3D Studio',desc:'Photo → production 3D.',bullets:["Image to 3D – 60 sec","Multi-Image to 3D","Text to 3D & Texture","Remesh, Rig & Animate"],formats:'GLB, OBJ, FBX, STL, USDZ, BLEND'},
            {icon:'🎬',title:'Motion Studio',desc:'Static → viral Reels.',bullets:["Text/Image to Video","Logo & Text Animation","Reels, Promo, Ads","Stock, Music, LUTs"],formats:'MP4, MOV, GIF, AE, 9:16'},
          ].map(s=>(
            <div key={s.title} style={{background:'#15131E',border:s.pop?'1.5px solid #A020F0':'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',padding:'20px',position:'relative'}}>
              {s.pop && <div style={{position:'absolute',top:'10px',right:'10px',background:'#A020F0',padding:'3px 8px',borderRadius:'12px',fontSize:'10px'}}>YOUR USP ★</div>}
              <div style={{width:'40px',height:'40px',background:s.pop?'rgba(160,32,240,0.2)':'#2A2838',borderRadius:'8px',display:'grid',placeItems:'center',fontSize:'20px'}}>{s.icon}</div>
              <h3 style={{fontSize:'16px',fontWeight:500,margin:'12px 0 6px',color:'#fff'}}>{s.title}</h3>
              <p style={{fontSize:'12px',color:'rgba(255,255,255,0.6)',margin:0,lineHeight:'1.4'}}>{s.desc}</p>
              <div style={{marginTop:'12px',display:'grid',gap:'6px',fontSize:'12px',color:'rgba(255,255,255,0.85)'}}>
                {s.bullets.map(b=><span key={b}><span style={{color:'#A020F0'}}>•</span> {b}</span>)}
              </div>
              <div style={{marginTop:'12px',fontSize:'10px',color:'rgba(255,255,255,0.35)',borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'8px'}}>{s.formats}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. BOTTOM - Your current 4 plans */}
      <div style={{padding:'48px 40px 70px',maxWidth:'1440px',margin:'0 auto',background:'#0A0814'}}>
        <div style={{textAlign:'center'}}>
          <h2 style={{fontSize:'28px',fontWeight:600,margin:'0',color:'#fff'}}>Simple, transparent pricing</h2>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',marginTop:'8px'}}>Start free. Upgrade when you need more.</p>
          <div style={{display:'inline-flex',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'24px',padding:'4px',marginTop:'18px'}}>
            <button onClick={()=>setBilling("monthly")} style={{padding:'8px 18px',borderRadius:'18px',border:'none',background:billing==="monthly"?'#fff':'transparent',color:billing==="monthly"?'#000':'rgba(255,255,255,0.7)',fontWeight:500,fontSize:'12px',cursor:'pointer'}}>Monthly</button>
            <button onClick={()=>setBilling("yearly")} style={{padding:'8px 18px',borderRadius:'18px',border:'none',background:billing==="yearly"?'#fff':'transparent',color:billing==="yearly"?'#000':'rgba(255,255,255,0.7)',fontWeight:500,fontSize:'12px',cursor:'pointer'}}>Yearly <span style={{background:'#A020F0',color:'#fff',padding:'2px 6px',borderRadius:'10px',fontSize:'10px',marginLeft:'4px'}}>-20%</span></button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'16px',marginTop:'28px'}}>
          {plans.map((p)=>{
            const isPopular = p.name==="Creator"
            const display = billing==="monthly"? p.m : p.y
            const yearlyTotal = p.m*12*0.8
            return (
              <div key={p.name} style={{background:isPopular?'#1A162E':'#15131E',border:isPopular?'1.5px solid #A020F0':'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',padding:'22px',position:'relative',boxShadow:isPopular?'0 0 30px rgba(160,32,240,0.2)':'none'}}>
                <div style={{position:'absolute',top:'-10px',left:'50%',transform:'translateX(-50%)',background:p.name==="Free Trial"?'#fff':isPopular?'#A020F0':'rgba(255,255,255,0.12)',color:p.name==="Free Trial"?'#000':'#fff',padding:'4px 12px',borderRadius:'12px',fontSize:'10px',fontWeight:500,whiteSpace:'nowrap'}}>{p.badge}</div>
                <div style={{fontSize:'28px',fontWeight:600,marginTop:'10px',color:'#fff'}}>₹{display}<span style={{fontSize:'13px',fontWeight:400,color:'rgba(255,255,255,0.5)'}}> /mo</span></div>
                <div style={{fontSize:'12px',color:'rgba(255,255,255,0.6)',marginTop:'6px',lineHeight:1.4,minHeight:'34px'}}>
                  {p.name==="Free Trial"? "Free forever • 100 credits • No CC" : billing==="monthly"? `Billed monthly • ${p.credits}` : <>₹{display}/mo • ₹{Math.round(yearlyTotal).toLocaleString('en-IN')}/yr<br/><span style={{color:'#A6FF9A'}}>Save 20% • {p.credits}</span></>}
                </div>
                <div style={{marginTop:'14px',fontSize:'12px',display:'grid',gap:'7px',color:'rgba(255,255,255,0.8)'}}>
                  <div style={{color:'#fff',fontWeight:500}}><span style={{color:'#A020F0'}}>•</span> {p.exp}</div>
                  {p.feats.map(f=><div key={f}><span style={{color:'#A020F0'}}>•</span> {f}</div>)}
                </div>
                <button style={{marginTop:'18px',width:'100%',background:isPopular?'#A020F0':p.name==="Free Trial"?'transparent':'rgba(255,255,255,0.08)',border:p.name==="Free Trial"?'1px solid rgba(255,255,255,0.1)':isPopular?'none':'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff',fontWeight:500,cursor:'pointer',fontSize:'12px'}}>{p.cta}</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
