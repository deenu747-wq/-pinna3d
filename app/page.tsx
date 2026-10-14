"use client"
import { useState, useRef } from "react"

export default function Page(){
  const [preview,setPreview]=useState("")
  const [done,setDone]=useState(false)
  const [tab,setTab]=useState("image3d")
  const [billing,setBilling]=useState<"monthly"|"yearly">("monthly")
  const [studioOpen,setStudioOpen]=useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const onFile = (e:any)=>{ const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]; if(!f) return; setPreview(URL.createObjectURL(f)); setDone(false); setTimeout(()=>setDone(true),1000) }
  const openPicker = () => fileRef.current?.click()
  const scrollSlider = (dir:"left"|"right")=>{
    if(!sliderRef.current) return
    const amount = 360
    sliderRef.current.scrollBy({left: dir==="left"? -amount : amount, behavior:'smooth'})
  }
  const plans = [
    {name:"Free Trial", m:0, y:0, badge:"FREE TRIAL", cta:"Get Started Free", credits:"100 credits", exp:"5 exports FREE", feats:["Photo Studio – 5 exports","Vector preview only","Standard quality","No CC required"]},
    {name:"Starter", m:999, y:799, badge:"FOR SELLERS", cta:"Choose Starter", credits:"1500 credits", exp:"100 exports / mo", feats:["Photo + Vector full","All 2D: JPG, SVG, EPS, AI","HD + Banner Maker","100% refund"]},
    {name:"Creator", m:2999, y:2399, badge:"MOST POPULAR", cta:"Start Free Trial →", credits:"6000 credits", exp:"400 exports / mo", feats:["Photo + Vector + 3D Studio","4K + Batch 100x","Motion Studio beta","Best value: 2.5x more"]},
    {name:"Pro", m:4999, y:3999, badge:"FOR TEAMS", cta:"Choose Pro", credits:"15000 + API", exp:"1000 + API", feats:["All studios + all formats","GLB, FBX, SVG, MP4, BLEND, AE","Team 3 seats + API","White-label + SLA"]},
  ]
  const check = <span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>

  const studios = [
    {slug:"/photo-studio", icon:"📸", title:"Photo Studio", desc:"Your Shopify photos, studio-ready in 1 sec.", feats:["Remove Background","Enhance Image","AI Backgrounds & Shadows","Upscaler + Banner Maker"], footer:"JPG, PNG, WEBP → PNG, JPG", style:{background:'linear-gradient(180deg, rgba(160,32,240,0.15) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)'}},
    {slug:"/vector-studio", icon:"✒️", title:"Vector Studio", desc:"Blurry logo → sharp print-ready SVG.", feats:["Image to Vector","Photo to Line Art","Logo Vectorizer","Batch 100x"], footer:"SVG, EPS, AI, PDF, CDR + PNG", isUSP:true, style:{background:'linear-gradient(180deg, rgba(160,32,240,0.26) 0%, rgba(255,255,255,0.04) 100%)',border:'1.6px solid #A020F0'}},
    {slug:"/3d-studio", icon:"🧊", title:"3D Studio", desc:"Photo → production 3D for Shopify & games.", feats:["Image to 3D – 60 sec","Multi-Image to 3D","Text to 3D & Texture","Remesh, Rig & Animate"], footer:"GLB, OBJ, FBX, STL, USDZ, BLEND", style:{background:'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)'}},
    {slug:"/motion-studio", icon:"🎬", title:"Motion Studio", desc:"Static → viral Reels, ads, intros.", feats:["Text/Image to Video","Logo & Text Animation","Reels, Promo, Ads","Stock, Music, LUTs"], footer:"MP4, MOV, GIF, AE, 9:16", style:{background:'linear-gradient(180deg, rgba(160,32,240,0.15) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)'}},
    {slug:"/mockup-studio", icon:"📦", title:"Mockup Studio", desc:"Product → realistic mockups in 1 click.", feats:["Device Mockups","Packaging & Box","Apparel & Print","Branding Mockups"], footer:"PNG, JPG, PSD, SMART", style:{background:'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)'}},
    {slug:"/template-maker", icon:"🎨", title:"Template Maker", desc:"Ideas → ready templates in seconds.", feats:["Social Media Kits","Presentations","Posters & Flyers","Docs & Resume"], footer:"PSD, AI, PPT, PDF + PNG", style:{background:'linear-gradient(180deg, rgba(160,32,240,0.15) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)'}},
  ]

  return (
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh',backgroundImage:`radial-gradient(900px 480px at 50% -10%, rgba(160,32,240,0.22), transparent 70%)`}}>
      <style>{`
   .studio-slider-wrap{position:relative;max-width:1440px;margin:32px auto 0}
   .studio-slider{display:flex;gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;padding:0 48px 10px;scrollbar-width:none}
   .studio-slider::-webkit-scrollbar{display:none}
   .studio-card{scroll-snap-align:start;min-width:320px;max-width:340px;flex:0 0 320px;border-radius:18px;padding:22px;text-decoration:none;color:#fff;position:relative;transition:transform.2s}
   .studio-card:hover{transform:translateY(-4px)}
   .arrow-btn{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;background:rgba(10,8,20,0.9);border:1px solid rgba(255,255,255,0.15);color:#fff;display:grid;place-items:center;cursor:pointer;z-index:5;backdrop-filter:blur(10px)}
   .arrow-btn:hover{background:#A020F0}
   .hero-grid{display:grid;grid-template-columns:1.2fr 0.7fr 0.7fr;gap:12px;padding:20px 24px;max-width:1440px;margin:0 auto;align-items:end}
   .pricing-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:32px}
        @media(max-width:1200px){.hero-grid{grid-template-columns:1fr 1fr}.pricing-grid{grid-template-columns:repeat(2,1fr)}.studio-card{min-width:300px;flex:0 0 300px}}
        @media(max-width:640px){.hero-grid{grid-template-columns:1fr;padding:16px}.pricing-grid{grid-template-columns:1fr;padding:0 16px}.studio-slider{padding:0 16px}.studio-card{min-width:85vw;flex:0 0 85vw}.arrow-btn{display:none}}
      `}</style>

      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 24px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
       <a href="/" style={{marginLeft:'-8px'}}><img src="/logo.png" alt="Pinna3d.com" style={{height:'80px',width:'auto',objectFit:'contain'}} /></a>
        <div style={{display:'flex',gap:'26px',alignItems:'center',fontSize:'14px'}}>
          {/* STUDIOS DROPDOWN - CHANGED FROM FEATURES */}
          <div style={{position:'relative'}} onMouseEnter={()=>setStudioOpen(true)} onMouseLeave={()=>setStudioOpen(false)}>
            <span style={{color:'rgba(255,255,255,0.9)',cursor:'pointer',display:'flex',alignItems:'center',gap:'4px'}}>Studios ▾</span>
            {studioOpen && (
              <div style={{position:'absolute',top:'28px',left:'-20px',background:'#15131E',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'12px',padding:'8px',minWidth:'220px',boxShadow:'0 10px 30px rgba(0,0,0,0.5)'}}>
                {studios.map(s=>(
                  <a key={s.slug} href={s.slug} style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 12px',borderRadius:'8px',color:'#fff',textDecoration:'none',fontSize:'13px'}} onMouseEnter={e=>e.currentTarget.style.background='rgba(160,32,240,0.15)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <span>{s.icon}</span>{s.title}
                  </a>
                ))}
              </div>
            )}
          </div>
          <span style={{color:'#A020F0'}}>Pricing</span><span style={{color:'rgba(255,255,255,0.7)'}}>Docs</span><span style={{color:'rgba(255,255,255,0.7)'}}>Blog</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.1)',padding:'10px 18px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.14)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',boxShadow:'0 0 24px rgba(160,32,240,0.55)',padding:'10px 20px',borderRadius:'10px',border:'none',color:'#fff',textDecoration:'none',fontWeight:600}}>Get Started</a>
        </div>
      </header>

      <div style={{display:'flex',gap:'10px',padding:'14px 24px',background:'rgba(255,255,255,0.02)',borderBottom:'1px solid rgba(255,255,255,0.06)',overflowX:'auto'}}>
        {["Image to 3D","Multi-Image to 3D","Text to 3D","Text to Texture"].map((t,i)=>{const k=["image3d","multi","text3d","texture"][i];return <button key={k} onClick={()=>setTab(k)} style={{padding:'10px 18px',borderRadius:'22px',fontSize:'13px',border:tab===k?'1px solid #A020F0':'1px solid rgba(255,255,255,0.14)',background:tab===k?'#A020F0':'transparent',color:'#fff',whiteSpace:'nowrap'}}>{t}</button>})}
        <button style={{padding:'10px 18px',borderRadius:'22px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.14)',background:'transparent',color:'#fff',whiteSpace:'nowrap'}}>Template Studio ★ NEW</button>
        <a href="/vector-studio" style={{padding:'10px 18px',borderRadius:'22px',fontSize:'13px',border:'1px solid rgba(160,32,240,0.5)',background:'rgba(160,32,240,0.14)',color:'#fff',textDecoration:'none',whiteSpace:'nowrap'}}>Image to Vector ★ NEW</a>
        <a href="/photo-studio" style={{padding:'10px 18px',borderRadius:'22px',fontSize:'13px',border:'1px solid rgba(160,32,240,0.5)',background:'rgba(160,32,240,0.14)',color:'#fff',textDecoration:'none',whiteSpace:'nowrap',display:'inline-flex',alignItems:'center',gap:'4px'}}>Background Remover ★ NEW</a>
      </div>

      <div className="hero-grid">
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',paddingRight:'10px'}}>
          <h1 style={{fontSize:'50px',lineHeight:'1.12',fontWeight:700,letterSpacing:'-0.02em',margin:0}}>Every Image to 3D or Vector<br/><span style={{background:'linear-gradient(90deg,#A020F0 0%,#FF7AD1 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>in 60 Seconds</span></h1>
          <p style={{color:'rgba(255,255,255,0.62)',marginTop:'14px',fontSize:'14px',lineHeight:'1.65',maxWidth:'500px'}}>Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators Worldwide.</p>
          <div style={{display:'flex',gap:'10px',marginTop:'20px'}}>
            <a href="/signup" style={{background:'#A020F0',boxShadow:'0 0 20px rgba(160,32,240,0.35)',padding:'10px 18px',borderRadius:'8px',border:'none',color:'#fff',fontSize:'13px',fontWeight:500,textDecoration:'none'}}>✦ Start Creating — Free</a>
            <button style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.12)',padding:'9px 16px',borderRadius:'8px',color:'#fff',fontSize:'13px'}}>▶ Watch Demo</button>
          </div>
        </div>
        <div onClick={openPicker} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'3px dashed rgba(160,32,240,0.6)',borderRadius:'15px',background:'rgba(15,13,28,0.95)',padding:'18px 14px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer',minHeight:'320px',height:'320px'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'52px',height:'52px',background:'rgba(160,32,240,0.18)',border:'3px solid rgba(160,32,240,0.35)',borderRadius:'15px',display:'grid',placeItems:'center',marginBottom:'12px'}}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#A020F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15l3-3 3 3"/></svg>
          </div>
          <b style={{fontSize:'16px',fontWeight:600}}>Drag & drop your image here</b>
          <div style={{fontSize:'14px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>or browse files to upload</div>
          <div style={{fontSize:'10px',color:'rgba(255,255,255,0.35)',marginTop:'10px'}}>PNG, JPG, WEBP, TIFF → SVG, EPS, AI, PDF, CDR + PNG Bonus</div>
          {preview && <img src={preview} style={{width:'70px',borderRadius:'6px',marginTop:'8px'}} alt="preview"/>}
        </div>
        <div style={{background:'#15131E',border:'2px solid rgba(255,255,255,0.08)',borderRadius:'15px',padding:'10px',display:'flex',flexDirection:'column',minHeight:'320px',height:'320px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'rgba(255,255,255,0.6)',marginBottom:'6px'}}><span>Preview</span><span>↻ ⛶ •••</span></div>
          <div style={{background:'radial-gradient(ellipse at 50% 20%, rgba(160,32,240,0.35) 0%, rgba(10,8,20,0.9) 70%)',borderRadius:'10px',flex:1,display:'grid',placeItems:'center',overflow:'hidden',position:'relative'}}>{done && preview? <img src={preview} style={{height:'150px'}} alt="3d"/> : <img src="/sneaker.webp" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'10px'}} alt="sneaker"/>}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'8px'}}><a href="/signup" style={{background:'#2A2838',border:'1px solid rgba(255,255,255,0.1)',padding:'7px',borderRadius:'6px',color:'#fff',fontSize:'11px',textAlign:'center',textDecoration:'none'}}>Download GLB</a><a href="/vector-studio" style={{background:'#A020F0',border:'none',padding:'7px',borderRadius:'6px',color:'#fff',fontSize:'11px',textAlign:'center',textDecoration:'none'}}>Export SVG</a></div>
        </div>
      </div>

      <div style={{padding:'40px 40px 40px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{textAlign:'center',maxWidth:'820px',margin:'0 auto'}}>
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.32)',padding:'6px 12px',borderRadius:'20px',fontSize:'11px',letterSpacing:'.12em',color:'#D6A5FF'}}>FOUR STUDIOS • ONE PLATFORM</div>
          <h2 style={{fontSize:'34px',fontWeight:500,margin:'14px 0 10px',lineHeight:1.2}}>Everything you need to create,<br/>in one place</h2>
          <p style={{color:'rgba(255,255,255,0.82)',fontSize:'16px',margin:0}}>Photo, Vector, 3D and Motion — built for creators worldwide.</p>
        </div>

        {/* HORIZONTAL SLIDER - 6 STUDIOS - NOT WRAPPING */}
        <div className="studio-slider-wrap">
          <button className="arrow-btn" style={{left:'6px'}} onClick={()=>scrollSlider("left")}>‹</button>
          <button className="arrow-btn" style={{right:'6px'}} onClick={()=>scrollSlider("right")}>›</button>
          <div ref={sliderRef} className="studio-slider">
            {studios.map((s)=>(
              <a key={s.title} href={s.slug} className="studio-card" style={s.style as any}>
                {s.isUSP && <div style={{position:'absolute',top:'12px',right:'12px',background:'#A020F0',padding:'4px 10px',borderRadius:'20px',fontSize:'10px'}}>YOUR USP ★</div>}
                <div style={{width:'46px',height:'46px',background:s.title==="Vector Studio"?'rgba(255,255,255,0.07)':s.title==="Photo Studio"||s.title==="Motion Studio"?'#A020F0':'rgba(255,255,255,0.09)',border:s.title==="Vector Studio"?'1px solid #A020F0':'none',borderRadius:'11px',display:'grid',placeItems:'center'}}>{s.icon}</div>
                <h3 style={{fontSize:'18px',fontWeight:500,margin:'16px 0 8px'}}>{s.title}</h3>
                <p style={{fontSize:'15px',color:'rgba(255,255,255,0.85)',margin:0}}>{s.desc}</p>
                <div style={{marginTop:'14px',display:'grid',gap:'8px',fontSize:'15px'}}>{s.feats.map(f=><div key={f}>{check}{f}</div>)}</div>
                <div style={{marginTop:'14px',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'10px'}}>
                  <div style={{fontSize:'10px',color:'rgba(255,255,255,0.45)',letterSpacing:'.06em'}}>{s.title.includes("Vector")? "OUTPUT • Vector + Bonus" : "INPUT → OUTPUT"}</div>
                  <div style={{fontSize:'12px',color:s.title.includes("Vector")?'#fff':'rgba(255,255,255,0.75)',marginTop:'4px',fontWeight:s.title.includes("Vector")?700:400}}>{s.footer}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{padding:'40px 40px 40px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{textAlign:'center'}}><h2 style={{fontSize:'32px',fontWeight:500,margin:0}}>Start free. Pay only for<br/>what you <span style={{color:'#A020F0'}}>actually create.</span></h2><p style={{color:'rgba(255,255,255,0.82)',fontSize:'16px',marginTop:'10px'}}>Start free. Upgrade when you need more. Perfect for startups and studios</p><div style={{display:'inline-flex',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.14)',borderRadius:'32px',padding:'5px',marginTop:'20px'}}><button onClick={()=>setBilling("monthly")} style={{padding:'10px 22px',borderRadius:'22px',border:'none',background:billing==="monthly"?'#fff':'transparent',color:billing==="monthly"?'#000':'rgba(255,255,255,0.85)'}}>Monthly</button><button onClick={()=>setBilling("yearly")} style={{padding:'10px 22px',borderRadius:'22px',border:'none',background:billing==="yearly"?'#fff':'transparent',color:billing==="yearly"?'#000':'rgba(255,255,255,0.85)'}}>Yearly <span style={{background:'#A020F0',color:'#fff',padding:'3px 8px',borderRadius:'12px',fontSize:'10px',marginLeft:'6px'}}>-20%</span></button></div></div>
        <div className="pricing-grid" style={{marginTop:'32px'}}>
          {plans.map((p)=>{const isPopular=p.name==="Creator"; const display=billing==="monthly"?p.m:p.y; const yearlyTotal=p.m*12*0.8; return(<div key={p.name} style={{background:isPopular?'linear-gradient(180deg, rgba(160,32,240,0.24) 0%, rgba(255,255,255,0.05) 100%)':'rgba(255,255,255,0.05)',border:isPopular?'1.8px solid #A020F0':'1px solid rgba(255,255,255,0.12)',borderRadius:'18px',padding:'24px',position:'relative'}}><div style={{position:'absolute',top:'-13px',left:'50%',transform:'translateX(-50%)',background:p.name==="Free Trial"?'#fff':isPopular?'#A020F0':'rgba(255,255,255,0.12)',color:p.name==="Free Trial"?'#000':'#fff',padding:'5px 14px',borderRadius:'20px',fontSize:'11px'}}>{p.badge}</div><div style={{fontSize:'34px',fontWeight:500,marginTop:'12px'}}>₹{display}<span style={{fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.65)'}}> /mo</span></div><div style={{fontSize:'14px',color:'rgba(255,255,255,0.78)',marginTop:'8px',minHeight:'40px'}}>{p.name==="Free Trial"?"Free forever • 100 credits • No CC":billing==="monthly"?`Billed monthly • ${p.credits}`:<>₹{display}/mo • ₹{Math.round(yearlyTotal).toLocaleString('en-IN')}/yr billed<br/><span style={{color:'#A6FF9A'}}>Save 20% • {p.credits}</span></>}</div><div style={{marginTop:'18px',fontSize:'15px',display:'grid',gap:'9px'}}><div style={{fontWeight:500,display:'flex'}}>{check}{p.exp}</div>{p.feats.map(f=><div key={f} style={{display:'flex'}}>{check}{f}</div>)}</div><a href="/signup" style={{display:'block',textAlign:'center',marginTop:'22px',width:'100%',boxSizing:'border-box',background:isPopular?'#A020F0':p.name==="Free Trial"?'transparent':'rgba(255,255,255,0.1)',border:p.name==="Free Trial"?'1px solid rgba(255,255,255,0.14)':isPopular?'none':'1px solid rgba(255,255,255,0.14)',padding:'13px',borderRadius:'12px',color:'#fff',fontWeight:500,textDecoration:'none'}}>{p.cta}</a></div>)})}
        </div>
      </div>

      <footer style={{borderTop:'1px solid rgba(255,255,255,0.08)',padding:'40px 40px 24px',background:'rgba(0,0,0,0.2)'}}>
        <div style={{maxWidth:'1440px',margin:'0 auto',display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'24px'}}>
          <div>
            <img src="/logo.png" style={{height:'60px'}} alt="Pinna3d"/>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginTop:'12px',maxWidth:'320px',lineHeight:'1.6'}}>Every Image to 3D or Vector in 60 Seconds. Photo, Vector, 3D, Motion — one platform for creators worldwide.</p>
            <div style={{marginTop:'12px',fontSize:'11px',color:'rgba(255,255,255,0.35)'}}>PNG, JPG, WEBP, TIFF → SVG, EPS, AI, PDF, CDR, DXF + PNG Bonus</div>
          </div>
          <div><div style={{fontSize:'13px',fontWeight:600,marginBottom:'12px'}}>Studios</div><div style={{display:'grid',gap:'8px',fontSize:'13px',color:'rgba(255,255,255,0.6)'}}><a href="/photo-studio" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Photo Studio</a><a href="/vector-studio" style={{color:'#fff',textDecoration:'none'}}>Vector Studio</a><a href="/3d-studio" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>3D Studio</a><a href="/motion-studio" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Motion Studio</a><a href="/mockup-studio" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Mockup Studio</a><a href="/template-maker" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Template Maker</a></div></div>
          <div><div style={{fontSize:'13px',fontWeight:600,marginBottom:'12px'}}>Company</div><div style={{display:'grid',gap:'8px',fontSize:'13px',color:'rgba(255,255,255,0.6)'}}><span>Pricing</span><span>Docs</span><span>Blog</span><span>Contact</span></div></div>
          <div><div style={{fontSize:'13px',fontWeight:600,marginBottom:'12px'}}>Legal</div><div style={{display:'grid',gap:'8px',fontSize:'13px',color:'rgba(255,255,255,0.6)'}}><span>Terms</span><span>Privacy</span><span>Refund</span></div></div>
        </div>
        <div style={{maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)',marginTop:'32px',paddingTop:'16px',display:'flex',justifyContent:'space-between',fontSize:'11px',color:'rgba(255,255,255,0.35)',flexWrap:'wrap',gap:'8px'}}>
          <span>© 2026 Pinna3d.com • Made for Worldwide</span>
          <span>All formats: SVG, EPS, AI, PDF, CDR, GLB, FBX, MP4 • JPG, PNG, WEBP → Vector</span>
        </div>
      </footer>
    </div>
  )
}
