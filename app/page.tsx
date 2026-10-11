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
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh',backgroundImage:`radial-gradient(900px 480px at 50% -10%, rgba(160,32,240,0.22), transparent 70%)`,WebkitFontSmoothing:'antialiased',MozOsxFontSmoothing:'grayscale',textRendering:'optimizeLegibility'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
        <img src="/logo.png" alt="Pinna3d.com" style={{height:'46px',width:'auto',objectFit:'contain'}} />
        <div style={{display:'flex',gap:'26px',alignItems:'center',fontSize:'14px',fontWeight:400}}>
          <span style={{color:'rgba(255,255,255,0.9)'}}>Features</span>
          <span style={{color:'#A020F0',fontWeight:500}}>Pricing</span>
          <span style={{color:'rgba(255,255,255,0.9)'}}>Docs</span>
          <span style={{color:'rgba(255,255,255,0.9)'}}>Blog</span>
          <button style={{background:'rgba(255,255,255,0.1)',padding:'10px 18px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.14)',color:'#fff',fontSize:'14px',fontWeight:400}}>Sign In</button>
          <button style={{background:'#A020F0',boxShadow:'0 0 24px rgba(160,32,240,0.55)',padding:'10px 20px',borderRadius:'10px',border:'none',color:'#fff',fontWeight:500,fontSize:'14px'}}>Get Started</button>
        </div>
      </header>

      <div style={{display:'flex',gap:'10px',padding:'14px 40px',background:'rgba(255,255,255,0.02)',borderBottom:'1px solid rgba(255,255,255,0.06)',overflowX:'auto'}}>
        {["Image to 3D","Multi-Image to 3D","Text to 3D","Text to Texture"].map((t,i)=>{
          const k=["image3d","multi","text3d","texture"][i]
          return <button key={k} onClick={()=>setTab(k)} style={{padding:'10px 18px',borderRadius:'22px',fontSize:'13px',fontWeight:400,border:tab===k?'1px solid #A020F0':'1px solid rgba(255,255,255,0.14)',background:tab===k?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>{t}</button>
        })}
        <button style={{padding:'10px 18px',borderRadius:'22px',fontSize:'13px',fontWeight:400,border:'1px solid rgba(255,255,255,0.14)',background:'transparent',color:'#fff'}}>Template Studio ★ NEW</button>
        <a href="/image-to-vector" style={{padding:'10px 18px',borderRadius:'22px',fontSize:'13px',fontWeight:500,border:'1px solid rgba(160,32,240,0.5)',background:'rgba(160,32,240,0.14)',color:'#fff',textDecoration:'none'}}>Image to Vector ★ NEW</a>
      </div>

      {/* === SECTION 1 UPDATED - Screenshot alignment + Worldwide + Gradient === */}
      <div style={{display:'grid',gridTemplateColumns:'1.15fr 0.85fr 0.85fr',gap:'22px',padding:'44px 40px',maxWidth:'1440px',margin:'0 auto',alignItems:'stretch'}}>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
          <h1 style={{fontSize:'36px',lineHeight:'1.12',fontWeight:700,letterSpacing:'-0.02em',margin:0,color:'#fff'}}>
            Every Image to 3D or Vector<br/>
            <span style={{background:'linear-gradient(90deg,#A020F0 0%,#FF7AD1 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>in 60 Seconds</span>
          </h1>
          <p style={{color:'rgba(255,255,255,0.62)',marginTop:'14px',fontSize:'13.5px',lineHeight:'1.65',fontWeight:400,maxWidth:'420px'}}>
            Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators Worldwide.
          </p>
          <div style={{display:'flex',gap:'10px',marginTop:'22px',alignItems:'center'}}>
            <button style={{background:'#A020F0',boxShadow:'0 0 20px rgba(160,32,240,0.35)',padding:'10px 18px',borderRadius:'8px',border:'none',color:'#fff',fontSize:'13px',fontWeight:500,display:'flex',alignItems:'center',gap:'6px'}}>
              <span>✦</span> Start Creating — Free
            </button>
            <button style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.12)',padding:'9px 16px',borderRadius:'8px',color:'#fff',fontSize:'13px',fontWeight:400,display:'flex',alignItems:'center',gap:'8px'}}>
              <span style={{width:'20px',height:'20px',borderRadius:'50%',border:'1px solid rgba(255,255,255,0.2)',display:'grid',placeItems:'center',fontSize:'10px'}}>▶</span> Watch Demo
            </button>
          </div>
          <div style={{display:'flex',gap:'8px',marginTop:'20px',flexWrap:'wrap',alignItems:'center'}}>
            <span style={{background:'rgba(160,32,240,0.18)',border:'1px solid rgba(160,32,240,0.25)',padding:'5px 10px',borderRadius:'6px',fontSize:'10.5px',color:'#D6A5FF',fontWeight:500,display:'flex',alignItems:'center',gap:'4px'}}>⚡ 60s Turnaround</span>
            <span style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',padding:'5px 10px',borderRadius:'6px',fontSize:'10.5px',color:'rgba(255,255,255,0.7)'}}>• 100k+ assets generated</span>
            <span style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',padding:'5px 10px',borderRadius:'6px',fontSize:'10.5px',color:'rgba(255,255,255,0.7)'}}>• No credit card required</span>
            <span style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',padding:'5px 10px',borderRadius:'6px',fontSize:'10.5px',color:'rgba(255,255,255,0.7)',display:'flex',alignItems:'center',gap:'4px'}}>📍 Made for Worldwide 🌍</span>
          </div>
        </div>

        <div onClick={openPicker} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed rgba(160,32,240,0.7)',borderRadius:'14px',background:'rgba(15,13,28,0.9)',padding:'22px 18px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer',boxShadow:'0 0 30px rgba(160,32,240,0.08) inset'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'68px',height:'68px',background:'rgba(160,32,240,0.12)',border:'1px solid rgba(160,32,240,0.25)',borderRadius:'12px',display:'grid',placeItems:'center',marginBottom:'16px',boxShadow:'0 0 20px rgba(160,32,240,0.2)'}}>
            <span style={{fontSize:'32px'}}>☁️</span>
          </div>
          <b style={{fontSize:'15px',fontWeight:600,color:'#fff',letterSpacing:'-0.01em'}}>Drag & drop your image here</b>
          <div style={{fontSize:'12px',color:'rgba(255,255,255,0.55)',marginTop:'6px'}}>or browse files to upload</div>
          <div style={{fontSize:'9.5px',color:'rgba(255,255,255,0.4)',marginTop:'14px',letterSpacing:'0.02em'}}>Supports PNG, JPG, WEBP • Max 20MB • JPG/PNG to 3D or SVG</div>
          <div style={{marginTop:'16px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',padding:'7px 14px',borderRadius:'6px',fontSize:'10px',color:'rgba(255,255,255,0.6)'}}>Instant preview • Background removal included</div>
          {preview && <img src={preview} alt="preview" style={{width:'90px',borderRadius:'8px',marginTop:'12px'}}/>}
        </div>

        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'14px',padding:'14px',display:'flex',flexDirection:'column'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.75)',padding:'6px',fontWeight:400}}><span>3D Viewer Preview</span><span>↻ ⛶</span></div>
          <div style={{background:'radial-gradient(ellipse at center,rgba(160,32,240,0.24),transparent 70%)',borderRadius:'12px',flex:1,minHeight:'210px',display:'grid',placeItems:'center',overflow:'hidden'}}>
            {done && preview? <img src={preview} alt="3d" style={{height:'170px'}}/> : <img src="/sneaker.webp" alt="Sneaker 3D" style={{width:'100%',height:'220px',objectFit:'cover',borderRadius:'12px'}}/>}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'10px'}}>
            <span style={{fontSize:'11px',color:'rgba(255,255,255,0.55)',fontWeight:400}}>Model: Sneaker_v01.glb</span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'8px'}}>
            <button style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',padding:'8px',borderRadius:'8px',color:'#fff',fontSize:'12px',fontWeight:400}}>Download GLB</button>
            <button style={{background:'#A020F0',border:'none',padding:'8px',borderRadius:'8px',color:'#fff',fontSize:'12px',fontWeight:400}}>Export SVG</button>
          </div>
        </div>
      </div>

      {/* === OTHER SECTIONS UNCHANGED - AS YOUR BASE CODE === */}
      <div style={{padding:'40px 40px 20px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{textAlign:'center',maxWidth:'820px',margin:'0 auto'}}>
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.32)',padding:'6px 12px',borderRadius:'20px',fontSize:'11px',letterSpacing:'.12em',color:'#D6A5FF',fontWeight:500}}>FOUR STUDIOS • ONE PLATFORM</div>
          <h2 style={{fontSize:'32px',fontWeight:500,letterSpacing:'-0.02em',margin:'14px 0 10px',lineHeight:1.2,color:'#fff'}}>Everything you need to create,<br/>in one place</h2>
          <p style={{color:'rgba(255,255,255,0.82)',fontSize:'16px',lineHeight:'1.6',margin:0,fontWeight:400}}>Photo, Vector, 3D and Motion — built for creators worldwide. One click export to any format.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'18px',marginTop:'32px'}}>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.15) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'18px',padding:'22px'}}>
            <div style={{width:'46px',height:'46px',background:'#A020F0',borderRadius:'11px',display:'grid',placeItems:'center',fontSize:'24px'}}>📸</div>
            <h3 style={{fontSize:'18px',fontWeight:500,margin:'16px 0 8px',color:'#fff'}}>Photo Studio</h3>
            <p style={{fontSize:'15px',color:'rgba(255,255,255,0.85)',lineHeight:'1.55',margin:0,fontWeight:400}}>Your Shopify photos, studio-ready in 1 sec.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'8px',fontSize:'15px',color:'rgba(255,255,255,0.92)',fontWeight:400}}><span><span style={{color:'#A020F0'}}>•</span> Remove Background</span><span><span style={{color:'#A020F0'}}>•</span> Remove Object</span><span><span style={{color:'#A020F0'}}>•</span> AI Backgrounds & Shadows</span><span><span style={{color:'#A020F0'}}>•</span> Upscaler + Banner Maker</span></div>
            <div style={{marginTop:'14px',fontSize:'12px',color:'rgba(255,255,255,0.5)',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'10px'}}>JPG, PNG, EPS, SVG, PSD, AI</div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.26) 0%, rgba(255,255,255,0.04) 100%)',border:'1.6px solid #A020F0',borderRadius:'18px',padding:'22px',position:'relative'}}>
            <div style={{position:'absolute',top:'12px',right:'12px',background:'#A020F0',padding:'4px 10px',borderRadius:'20px',fontSize:'10px',fontWeight:500}}>YOUR USP ★</div>
            <div style={{width:'46px',height:'46px',background:'rgba(255,255,255,0.07)',border:'1px solid #A020F0',borderRadius:'11px',display:'grid',placeItems:'center',fontSize:'24px'}}>✒️</div>
            <h3 style={{fontSize:'18px',fontWeight:500,margin:'16px 0 8px',color:'#fff'}}>Vector Studio</h3>
            <p style={{fontSize:'15px',color:'rgba(255,255,255,0.85)',lineHeight:'1.55',margin:0,fontWeight:400}}>Blurry logo → sharp print-ready SVG.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'8px',fontSize:'15px',color:'rgba(255,255,255,0.92)',fontWeight:400}}><span><span style={{color:'#A020F0'}}>•</span> Image to Vector</span><span><span style={{color:'#A020F0'}}>•</span> Photo to Line Art</span><span><span style={{color:'#A020F0'}}>•</span> Logo Vectorizer</span><span><span style={{color:'#A020F0'}}>•</span> Batch 100x</span></div>
            <div style={{marginTop:'14px',fontSize:'12px',color:'rgba(255,255,255,0.5)',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'10px'}}>JPG, PNG, EPS, SVG, PSD, CDR, AI</div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'18px',padding:'22px'}}>
            <div style={{width:'46px',height:'46px',background:'rgba(255,255,255,0.09)',borderRadius:'11px',display:'grid',placeItems:'center',fontSize:'24px'}}>🧊</div>
            <h3 style={{fontSize:'18px',fontWeight:500,margin:'16px 0 8px',color:'#fff'}}>3D Studio</h3>
            <p style={{fontSize:'15px',color:'rgba(255,255,255,0.85)',lineHeight:'1.55',margin:0,fontWeight:400}}>Photo → production 3D for Shopify & games.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'8px',fontSize:'15px',color:'rgba(255,255,255,0.92)',fontWeight:400}}><span><span style={{color:'#A020F0'}}>•</span> Image to 3D – 60 sec</span><span><span style={{color:'#A020F0'}}>•</span> Multi-Image to 3D</span><span><span style={{color:'#A020F0'}}>•</span> Text to 3D & Texture</span><span><span style={{color:'#A020F0'}}>•</span> Remesh, Rig & Animate</span></div>
            <div style={{marginTop:'14px',fontSize:'12px',color:'rgba(255,255,255,0.5)',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'10px'}}>GLB, OBJ, FBX, STL, USDZ, BLEND</div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.15) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'18px',padding:'22px'}}>
            <div style={{width:'46px',height:'46px',background:'#A020F0',borderRadius:'11px',display:'grid',placeItems:'center',fontSize:'24px'}}>🎬</div>
            <h3 style={{fontSize:'18px',fontWeight:500,margin:'16px 0 8px',color:'#fff'}}>Motion Studio</h3>
            <p style={{fontSize:'15px',color:'rgba(255,255,255,0.85)',lineHeight:'1.55',margin:0,fontWeight:400}}>Static → viral Reels, ads, intros.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'8px',fontSize:'15px',color:'rgba(255,255,255,0.92)',fontWeight:400}}><span><span style={{color:'#A020F0'}}>•</span> Text/Image to Video</span><span><span style={{color:'#A020F0'}}>•</span> Logo & Text Animation</span><span><span style={{color:'#A020F0'}}>•</span> Reels, Promo, Ads</span><span><span style={{color:'#A020F0'}}>•</span> Stock, Music, LUTs</span></div>
            <div style={{marginTop:'14px',fontSize:'12px',color:'rgba(255,255,255,0.5)',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'10px'}}>MP4, MOV, GIF, AE, 9:16</div>
          </div>
        </div>
      </div>

      <div style={{padding:'52px 40px 80px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)',marginTop:'24px'}}>
        <div style={{textAlign:'center'}}>
          <h2 style={{fontSize:'32px',fontWeight:500,letterSpacing:'-0.02em',margin:'0',color:'#fff'}}>Start free. Pay only for<br/>what you <span style={{color:'#A020F0'}}>actually create.</span></h2>
          <p style={{color:'rgba(255,255,255,0.82)',fontSize:'16px',marginTop:'10px',fontWeight:400}}>Free trial includes all studios. No CC required.</p>
          <div style={{display:'inline-flex',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.14)',borderRadius:'32px',padding:'5px',marginTop:'20px'}}>
            <button onClick={()=>setBilling("monthly")} style={{padding:'10px 22px',borderRadius:'22px',border:'none',background:billing==="monthly"?'#fff':'transparent',color:billing==="monthly"?'#000':'rgba(255,255,255,0.85)',fontWeight:500,fontSize:'13px',cursor:'pointer'}}>Monthly</button>
            <button onClick={()=>setBilling("yearly")} style={{padding:'10px 22px',borderRadius:'22px',border:'none',background:billing==="yearly"?'#fff':'transparent',color:billing==="yearly"?'#000':'rgba(255,255,255,0.85)',fontWeight:500,fontSize:'13px',cursor:'pointer'}}>Yearly <span style={{background:'#A020F0',color:'#fff',padding:'3px 8px',borderRadius:'12px',fontSize:'10px',marginLeft:'6px'}}>-20%</span></button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'18px',marginTop:'32px'}}>
          {plans.map((p)=>{
            const isPopular = p.name==="Creator"
            const display = billing==="monthly"? p.m : p.y
            const yearlyTotal = p.m*12*0.8
            return (
              <div key={p.name} style={{background:isPopular?'linear-gradient(180deg, rgba(160,32,240,0.24) 0%, rgba(255,255,255,0.05) 100%)':'rgba(255,255,255,0.05)',border:isPopular?'1.8px solid #A020F0':'1px solid rgba(255,255,255,0.12)',borderRadius:'18px',padding:'24px',position:'relative',boxShadow:isPopular?'0 0 50px rgba(160,32,240,0.22)':'none'}}>
                <div style={{position:'absolute',top:'-13px',left:'50%',transform:'translateX(-50%)',background:p.name==="Free Trial"?'#fff':isPopular?'#A020F0':'rgba(255,255,255,0.12)',color:p.name==="Free Trial"?'#000':'#fff',padding:'5px 14px',borderRadius:'20px',fontSize:'11px',fontWeight:500}}>{p.badge}</div>
                <div style={{fontSize:'34px',fontWeight:500,marginTop:'12px',color:'#fff',lineHeight:1}}>₹{display}<span style={{fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.65)'}}> /mo</span></div>
                <div style={{fontSize:'14px',color:'rgba(255,255,255,0.78)',marginTop:'8px',lineHeight:1.4,minHeight:'40px',fontWeight:400}}>
                  {p.name==="Free Trial"? "Free forever • 100 credits • No CC" : billing==="monthly"? `Billed monthly • ${p.credits}` : <>₹{display}/mo • ₹{Math.round(yearlyTotal).toLocaleString('en-IN')}/yr billed<br/><span style={{color:'#A6FF9A'}}>Save 20% • {p.credits}</span></>}
                </div>
                <div style={{marginTop:'18px',fontSize:'15px',display:'grid',gap:'9px',color:'rgba(255,255,255,0.92)',fontWeight:400}}>
                  <div style={{color:'#fff',fontWeight:500,fontSize:'15px'}}><span style={{color:'#A020F0'}}>•</span> {p.exp}</div>
                  {p.feats.map(f=><div key={f}><span style={{color:'#A020F0'}}>•</span> {f}</div>)}
                </div>
                <button style={{marginTop:'22px',width:'100%',background:isPopular?'#A020F0':p.name==="Free Trial"?'transparent':'rgba(255,255,255,0.1)',boxShadow:isPopular?'0 0 24px rgba(160,32,240,0.45)':'none',border:p.name==="Free Trial"?'1px solid rgba(255,255,255,0.14)':isPopular?'none':'1px solid rgba(255,255,255,0.14)',padding:'13px',borderRadius:'12px',color:'#fff',fontWeight:500,cursor:'pointer',fontSize:'14px'}}>{p.cta}</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
