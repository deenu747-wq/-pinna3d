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

  // Pricing logic - monthly base
  const plans = [
    {name:"Free", m:0, y:0, credits:"100 credits", exports:"5 exports", features:["Photo Studio – 5 exports","Vector Preview only","Standard quality"]},
    {name:"Starter", m:999, y:799, credits:"1500 credits", exports:"100 exports", features:["Photo + Vector full","All 2D: JPG, SVG, EPS, AI","HD + Banner Maker"]},
    {name:"Creator", m:2999, y:2399, credits:"6000 credits", exports:"400 exports", features:["Photo + Vector + 3D Studio","4K + Batch 100x","Motion beta"]},
    {name:"Pro", m:4999, y:3999, credits:"15000 credits", exports:"1000 exports + API", features:["All studios + all formats","GLB, FBX, SVG, MP4","Team 3 seats + API"]},
  ]

  return (
    <div style={{
      background:'#0A0814',
      color:'#fff',
      fontFamily:'Inter, system-ui, sans-serif',
      minHeight:'100vh',
      backgroundImage:`radial-gradient(1000px 600px at 50% 0%, rgba(140,35,255,0.20), transparent 70%)`,
    }}>
      {/* HEADER - ORIGINAL */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 40px',borderBottom:'1px solid rgba(255,255,255,0.07)',background:'rgba(10,8,20,0.85)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center'}}>
          <img src="/logo.png" alt="Pinna3d.com" style={{height:'100px',width:'auto',objectFit:'contain'}} />
        </div>
        <div style={{display:'flex',gap:'26px',alignItems:'center',fontSize:'15px',fontWeight:500}}>
          <span style={{color:'rgba(255,255,255,0.85)',cursor:'pointer'}}>Features</span>
          <span style={{color:'#A020F0',fontWeight:700,cursor:'pointer'}}>Pricing</span>
          <span style={{color:'rgba(255,255,255,0.85)',cursor:'pointer'}}>Docs</span>
          <span style={{color:'rgba(255,255,255,0.85)',cursor:'pointer'}}>Blog</span>
          <button style={{background:'rgba(255,255,255,0.08)',padding:'11px 20px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.12)',color:'#fff',cursor:'pointer',fontSize:'15px',fontWeight:500}}>Sign In</button>
          <button style={{background:'#A020F0',boxShadow:'0 0 20px rgba(160,32,240,0.45)',padding:'11px 22px',borderRadius:'10px',border:'none',color:'#fff',fontWeight:700,cursor:'pointer',fontSize:'15px'}}>Get Started</button>
        </div>
      </header>

      {/* TABS */}
      <div style={{display:'flex',gap:'10px',padding:'14px 40px',background:'rgba(255,255,255,0.02)',borderBottom:'1px solid rgba(255,255,255,0.06)',overflowX:'auto'}}>
        <button onClick={()=>setTab("image3d")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'14px',border:tab==="image3d"?'1px solid #A020F0':'1px solid rgba(255,255,255,0.12)',background:tab==="image3d"?'#A020F0':'transparent',color:'#fff',cursor:'pointer',fontWeight:500}}>Image to 3D</button>
        <button onClick={()=>setTab("multi")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'14px',border:tab==="multi"?'1px solid #A020F0':'1px solid rgba(255,255,255,0.12)',background:tab==="multi"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Multi-Image to 3D</button>
        <button onClick={()=>setTab("text3d")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'14px',border:tab==="text3d"?'1px solid #A020F0':'1px solid rgba(255,255,255,0.12)',background:tab==="text3d"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Text to 3D</button>
        <button onClick={()=>setTab("texture")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'14px',border:tab==="texture"?'1px solid #A020F0':'1px solid rgba(255,255,255,0.12)',background:tab==="texture"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Text to Texture</button>
        <button onClick={()=>setTab("template")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'14px',border:tab==="template"?'1px solid #A020F0':'1px solid rgba(255,255,255,0.12)',background:tab==="template"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Template Studio ★ NEW</button>
        <a href="/image-to-vector" style={{padding:'9px 16px',borderRadius:'20px',fontSize:'14px',fontWeight:700,border:'1px solid rgba(160,32,240,0.5)',background:'rgba(160,32,240,0.12)',color:'#fff',textDecoration:'none'}}>Image to Vector ★ NEW</a>
      </div>

      {/* HERO */}
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'24px',padding:'44px 40px',maxWidth:'1440px',margin:'0 auto'}}>
        <div>
          {tab==="image3d" && (<div><h1 style={{fontSize:'54px',lineHeight:'1.05',fontWeight:800,letterSpacing:'-0.03em',margin:0,color:'#fff'}}>Every Image to 3D<br/><span style={{background:'linear-gradient(90deg,#A020F0,#FF7AD1)',WebkitBackgroundClip:'text',color:'transparent'}}>in 60 Seconds</span></h1><p style={{color:'rgba(255,255,255,0.75)',marginTop:'16px',fontSize:'17px',lineHeight:'1.6',fontWeight:400}}>Transform photos into production-ready 3D models instantly. Built for designers, e-commerce, and creators worldwide.</p></div>)}
          <div style={{display:'flex',gap:'12px',marginTop:'26px'}}>
            <button style={{background:'#A020F0',boxShadow:'0 0 24px rgba(160,32,240,0.45)',padding:'15px 24px',borderRadius:'12px',fontWeight:700,border:'none',color:'#fff',cursor:'pointer',fontSize:'15px'}}>✦ Start Creating — Free</button>
            <button style={{border:'1px solid rgba(255,255,255,0.14)',background:'rgba(255,255,255,0.05)',padding:'15px 24px',borderRadius:'12px',color:'#fff',cursor:'pointer',fontSize:'15px',fontWeight:500}}>◉ Watch Demo</button>
          </div>
          <div style={{display:'flex',gap:'8px',marginTop:'20px',flexWrap:'wrap',fontSize:'14px'}}>
            <span style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'7px 14px',borderRadius:'20px',color:'rgba(255,255,255,0.9)'}}>⚡ 60s Turnaround</span>
            <span style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'7px 14px',borderRadius:'20px',color:'rgba(255,255,255,0.9)'}}>• 100k+ assets</span>
            <span style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'7px 14px',borderRadius:'20px',color:'rgba(255,255,255,0.9)'}}>• No CC required</span>
          </div>
        </div>
        <div onClick={openPicker} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed rgba(160,32,240,0.6)',borderRadius:'18px',background:'rgba(255,255,255,0.04)',padding:'24px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'64px',height:'64px',background:'rgba(160,32,240,0.18)',borderRadius:'14px',display:'grid',placeItems:'center',fontSize:'30px',marginBottom:'14px'}}>☁️</div>
          <b style={{fontSize:'17px',fontWeight:600,color:'#fff'}}>Drag & drop your image here</b>
          <span style={{color:'rgba(255,255,255,0.65)',fontSize:'14px',marginTop:'6px'}}>or browse files to upload</span>
          <div style={{marginTop:'18px',background:'#A020F0',color:'#fff',padding:'12px 24px',borderRadius:'10px',fontSize:'14px',fontWeight:700}}>Browse Files</div>
          {preview && <img src={preview} alt="preview" style={{width:'110px',borderRadius:'10px',marginTop:'14px'}}/>}
        </div>
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'18px',padding:'14px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px',color:'rgba(255,255,255,0.7)',padding:'6px'}}><span>3D Viewer Preview</span><span>↻ ⛶</span></div>
          <div style={{background:'radial-gradient(ellipse at center,rgba(160,32,240,0.22),transparent 70%)',borderRadius:'12px',height:'250px',marginTop:'8px',display:'grid',placeItems:'center'}}>{done && preview? <img src={preview} alt="3d" style={{height:'170px'}}/> : <div style={{fontSize:'70px'}}>👟</div>}</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'6px',marginTop:'12px'}}>
            {["GLB","FBX","OBJ","STL","USDZ","BLEND"].map(f=><button key={f} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',fontWeight:500}}>{f}</button>)}
          </div>
        </div>
      </div>

      {/* 4 BOXES SECTION - NEW CATCHY TITLE */}
      <div style={{padding:'44px 40px 20px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{textAlign:'center',maxWidth:'780px',margin:'0 auto'}}>
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.14)',border:'1px solid rgba(160,32,240,0.3)',padding:'7px 14px',borderRadius:'20px',fontSize:'11px',letterSpacing:'.12em',color:'#C084FF',fontWeight:700}}>FOUR STUDIOS • ONE PLATFORM</div>
          <h2 style={{fontSize:'40px',fontWeight:800,letterSpacing:'-0.03em',margin:'16px 0 12px',lineHeight:1.1,color:'#fff'}}>One Platform. Four Ways to<br/><span style={{color:'#A020F0'}}>Create Anything</span></h2>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:'16px',lineHeight:'1.6',margin:0}}>From product photo to vector logo to 3D model to viral video — all in 60 seconds. No design skills needed.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'18px',marginTop:'32px'}}>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.14) 0%, rgba(255,255,255,0.03) 100%)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'16px',padding:'22px'}}>
            <div style={{width:'48px',height:'48px',background:'#A020F0',borderRadius:'12px',display:'grid',placeItems:'center',fontSize:'24px'}}>📸</div>
            <h3 style={{fontSize:'19px',fontWeight:700,margin:'16px 0 8px',color:'#fff'}}>Photo Studio</h3>
            <p style={{fontSize:'14px',color:'rgba(255,255,255,0.7)',lineHeight:'1.5',margin:0}}>Make your product photo sell. AI background, shadows, upscaler.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'7px',fontSize:'13px',color:'rgba(255,255,255,0.85)'}}><span>✓ Remove Background in 1-sec</span><span>✓ AI Studio Backgrounds</span><span>✓ Banner Maker – Any size</span></div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.22) 0%, rgba(255,255,255,0.03) 100%)',border:'1.5px solid #A020F0',borderRadius:'16px',padding:'22px',position:'relative'}}>
            <div style={{position:'absolute',top:'14px',right:'14px',background:'#A020F0',padding:'4px 10px',borderRadius:'20px',fontSize:'10px',fontWeight:800}}>YOUR USP ★</div>
            <div style={{width:'48px',height:'48px',background:'rgba(255,255,255,0.06)',border:'1px solid #A020F0',borderRadius:'12px',display:'grid',placeItems:'center',fontSize:'24px'}}>✒️</div>
            <h3 style={{fontSize:'19px',fontWeight:700,margin:'16px 0 8px',color:'#fff'}}>Vector Studio</h3>
            <p style={{fontSize:'14px',color:'rgba(255,255,255,0.7)',lineHeight:'1.5',margin:0}}>Turn any image into infinite print-ready vector.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'7px',fontSize:'13px',color:'rgba(255,255,255,0.85)'}}><span>✓ JPG/PNG → SVG, EPS, AI</span><span>✓ Logo Vectorizer HD</span><span>✓ Batch 100 at once</span></div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'16px',padding:'22px'}}>
            <div style={{width:'48px',height:'48px',background:'rgba(255,255,255,0.08)',borderRadius:'12px',display:'grid',placeItems:'center',fontSize:'24px'}}>🧊</div>
            <h3 style={{fontSize:'19px',fontWeight:700,margin:'16px 0 8px',color:'#fff'}}>3D Studio</h3>
            <p style={{fontSize:'14px',color:'rgba(255,255,255,0.7)',lineHeight:'1.5',margin:0}}>Photo to 3D model for Shopify, Games, AR.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'7px',fontSize:'13px',color:'rgba(255,255,255,0.85)'}}><span>✓ Image to 3D – 60 sec</span><span>✓ Text to 3D + Texture 4K</span><span>✓ Remesh, Rig & Animate</span></div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.14) 0%, rgba(255,255,255,0.03) 100%)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'16px',padding:'22px'}}>
            <div style={{width:'48px',height:'48px',background:'#A020F0',borderRadius:'12px',display:'grid',placeItems:'center',fontSize:'24px'}}>🎬</div>
            <h3 style={{fontSize:'19px',fontWeight:700,margin:'16px 0 8px',color:'#fff'}}>Motion Studio</h3>
            <p style={{fontSize:'14px',color:'rgba(255,255,255,0.7)',lineHeight:'1.5',margin:0}}>Static image to viral video. Reels, ads, intros.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'7px',fontSize:'13px',color:'rgba(255,255,255,0.85)'}}><span>✓ Text/Image → Video</span><span>✓ Logo Animation + Reels</span><span>✓ Stock, Music, LUTs</span></div>
          </div>
        </div>
      </div>

      {/* PRICING - NEW CATCHY + FIXED YEARLY */}
      <div style={{padding:'56px 40px 80px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)',marginTop:'24px'}}>
        <div style={{textAlign:'center'}}>
          <h2 style={{fontSize:'38px',fontWeight:800,letterSpacing:'-0.02em',margin:'0',color:'#fff'}}>Pay for what you create.<br/>Not more.</h2>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:'16px',marginTop:'10px'}}>Start free. Upgrade only when you need more exports. No hidden fees.</p>
          <div style={{display:'inline-flex',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'30px',padding:'5px',marginTop:'22px'}}>
            <button onClick={()=>setBilling("monthly")} style={{padding:'9px 20px',borderRadius:'20px',border:'none',background:billing==="monthly"?'#fff':'transparent',color:billing==="monthly"?'#000':'rgba(255,255,255,0.8)',fontWeight:700,fontSize:'14px',cursor:'pointer',transition:'all.2s'}}>Monthly</button>
            <button onClick={()=>setBilling("yearly")} style={{padding:'9px 20px',borderRadius:'20px',border:'none',background:billing==="yearly"?'#fff':'transparent',color:billing==="yearly"?'#000':'rgba(255,255,255,0.8)',fontWeight:700,fontSize:'14px',cursor:'pointer',transition:'all.2s'}}>Yearly <span style={{background:'#A020F0',color:'#fff',padding:'2px 6px',borderRadius:'10px',fontSize:'11px',marginLeft:'4px'}}>Save 20%</span></button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'18px',marginTop:'34px'}}>
          {plans.map((p,i)=>{
            const displayPrice = billing==="monthly"? p.m : p.y
            const yearlyTotal = p.m*12*0.8
            const isPopular = p.name==="Creator"
            return (
              <div key={p.name} style={{
                background:isPopular?'linear-gradient(180deg, rgba(160,32,240,0.2) 0%, rgba(255,255,255,0.04) 100%)':'rgba(255,255,255,0.04)',
                border:isPopular?'1.5px solid #A020F0':'1px solid rgba(255,255,255,0.1)',
                borderRadius:'16px',
                padding:'24px',
                position:'relative',
                boxShadow:isPopular?'0 0 40px rgba(160,32,240,0.18)':'none'
              }}>
                {isPopular && <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#A020F0',padding:'4px 14px',borderRadius:'20px',fontSize:'11px',fontWeight:800,letterSpacing:'.05em'}}>MOST POPULAR</div>}
                <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'.1em',color:'rgba(255,255,255,0.6)'}}>{p.name.toUpperCase()} • {billing.toUpperCase()}</div>
                <div style={{fontSize:'36px',fontWeight:800,marginTop:'10px',color:'#fff'}}>₹{displayPrice}<span style={{fontSize:'14px',fontWeight:500,color:'rgba(255,255,255,0.6)'}}> /mo</span></div>
                <div style={{fontSize:'13px',color:'rgba(255,255,255,0.6)',marginTop:'4px',minHeight:'18px'}}>
                  {p.name==="Free"?"Free forever": billing==="monthly"?`Billed monthly • ${p.credits}` : `₹${Math.round(yearlyTotal).toLocaleString('en-IN')}/yr billed • Save 20% • ${p.credits}`}
                </div>
                <div style={{marginTop:'18px',fontSize:'14px',display:'grid',gap:'9px',color:'rgba(255,255,255,0.85)'}}>
                  <div>✓ {p.exports}</div>
                  {p.features.map(f=><div key={f}>✓ {f}</div>)}
                </div>
                <button style={{marginTop:'22px',width:'100%',background:isPopular?'#A020F0':'rgba(255,255,255,0.08)',boxShadow:isPopular?'0 0 20px rgba(160,32,240,0.35)':'none',border:isPopular?'none':'1px solid rgba(255,255,255,0.12)',padding:'12px',borderRadius:'10px',color:'#fff',fontWeight:700,cursor:'pointer',fontSize:'14px'}}>{p.name==="Free"?"Get Started Free":`Choose ${p.name}`}</button>
              </div>
            )
          })}
        </div>
        <p style={{textAlign:'center',color:'rgba(255,255,255,0.4)',fontSize:'12px',marginTop:'20px'}}>Credits: Photo 1 credit, Vector 5 credits, 3D 20 credits, Motion 10 credits. Cancel anytime. No extra charges.</p>
      </div>
    </div>
  )
}
