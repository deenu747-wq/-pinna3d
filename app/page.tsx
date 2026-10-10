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
    {name:"Free Trial", m:0, y:0, badge:"FREE TRIAL", cta:"Start Free Trial", credits:"100 credits", exp:"5 exports FREE", feats:["Photo Studio – 5 exports","Vector preview only","Standard quality","No CC required"]},
    {name:"Starter", m:999, y:799, badge:"FOR SELLERS", cta:"Choose Starter", credits:"1500 credits", exp:"100 exports / mo", feats:["Photo + Vector full","All 2D: JPG, SVG, EPS, AI","HD + Banner Maker","100% refund"]},
    {name:"Creator", m:2999, y:2399, badge:"MOST POPULAR", cta:"Start Free Trial →", credits:"6000 credits", exp:"400 exports / mo", feats:["Photo + Vector + 3D Studio","4K + Batch 100x","Motion Studio beta","Best value: 2.5x more"]},
    {name:"Pro", m:4999, y:3999, badge:"FOR TEAMS", cta:"Choose Pro", credits:"15000 + API", exp:"1000 + API", feats:["All studios + all formats","GLB, FBX, SVG, MP4","Team 3 seats + API","White-label + SLA"]},
  ]

  return (
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, sans-serif',minHeight:'100vh',backgroundImage:`radial-gradient(900px 480px at 50% -10%, rgba(160,32,240,0.22), transparent 70%)`}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
        <img src="/logo.png" alt="Pinna3d.com" style={{height:'100px',width:'auto',objectFit:'contain'}} />
        <div style={{display:'flex',gap:'26px',alignItems:'center',fontSize:'15px',fontWeight:500}}>
          <span style={{color:'rgba(255,255,255,0.9)'}}>Features</span>
          <span style={{color:'#A020F0',fontWeight:700}}>Pricing</span>
          <span style={{color:'rgba(255,255,255,0.9)'}}>Docs</span>
          <span style={{color:'rgba(255,255,255,0.9)'}}>Blog</span>
          <button style={{background:'rgba(255,255,255,0.1)',padding:'11px 20px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.14)',color:'#fff',fontSize:'15px',fontWeight:600}}>Sign In</button>
          <button style={{background:'#A020F0',boxShadow:'0 0 24px rgba(160,32,240,0.55)',padding:'12px 22px',borderRadius:'10px',border:'none',color:'#fff',fontWeight:800,fontSize:'15px'}}>Start Free Trial</button>
        </div>
      </header>

      <div style={{display:'flex',gap:'10px',padding:'14px 40px',background:'rgba(255,255,255,0.02)',borderBottom:'1px solid rgba(255,255,255,0.06)',overflowX:'auto'}}>
        {["Image to 3D","Multi-Image to 3D","Text to 3D","Text to Texture"].map((t,i)=>{
          const k=["image3d","multi","text3d","texture"][i]
          return <button key={k} onClick={()=>setTab(k)} style={{padding:'10px 18px',borderRadius:'22px',fontSize:'14px',fontWeight:600,border:tab===k?'1px solid #A020F0':'1px solid rgba(255,255,255,0.14)',background:tab===k?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>{t}</button>
        })}
        <button style={{padding:'10px 18px',borderRadius:'22px',fontSize:'14px',fontWeight:600,border:'1px solid rgba(255,255,255,0.14)',background:'transparent',color:'#fff'}}>Template Studio ★ NEW</button>
        <a href="/image-to-vector" style={{padding:'10px 18px',borderRadius:'22px',fontSize:'14px',fontWeight:700,border:'1px solid rgba(160,32,240,0.5)',background:'rgba(160,32,240,0.14)',color:'#fff',textDecoration:'none'}}>Image to Vector ★ NEW</a>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'24px',padding:'44px 40px',maxWidth:'1440px',margin:'0 auto'}}>
        <div>
          <h1 style={{fontSize:'52px',lineHeight:'1.04',fontWeight:800,letterSpacing:'-0.03em',margin:0,color:'#fff'}}>Every Image to 3D<br/><span style={{background:'linear-gradient(90deg,#A020F0,#FF7AD1)',WebkitBackgroundClip:'text',color:'transparent'}}>in 60 Seconds</span></h1>
          <p style={{color:'rgba(255,255,255,0.85)',marginTop:'16px',fontSize:'16px',lineHeight:'1.65'}}>Upload any photo → get studio-ready 3D, vector & video. Trusted by 100k+ sellers.</p>
          <div style={{display:'flex',gap:'12px',marginTop:'26px'}}>
            <button style={{background:'#A020F0',boxShadow:'0 0 28px rgba(160,32,240,0.5)',padding:'15px 26px',borderRadius:'12px',fontWeight:800,border:'none',color:'#fff',fontSize:'15px'}}>✦ Start Free Trial — No CC</button>
            <button style={{border:'1px solid rgba(255,255,255,0.18)',background:'rgba(255,255,255,0.06)',padding:'15px 26px',borderRadius:'12px',color:'#fff',fontSize:'15px',fontWeight:600}}>◉ Watch Demo</button>
          </div>
        </div>
        <div onClick={openPicker} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.6px dashed rgba(160,32,240,0.65)',borderRadius:'18px',background:'rgba(255,255,255,0.04)',padding:'26px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'66px',height:'66px',background:'rgba(160,32,240,0.18)',borderRadius:'14px',display:'grid',placeItems:'center',fontSize:'30px',marginBottom:'14px'}}>☁️</div>
          <b style={{fontSize:'16px',fontWeight:700,color:'#fff'}}>Drag & drop your image here</b>
          <div style={{marginTop:'18px',background:'#A020F0',color:'#fff',padding:'12px 26px',borderRadius:'10px',fontSize:'14px',fontWeight:700}}>Browse Files</div>
          {preview && <img src={preview} alt="preview" style={{width:'110px',borderRadius:'10px',marginTop:'14px'}}/>}
        </div>
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'18px',padding:'14px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px',color:'rgba(255,255,255,0.75)',padding:'6px'}}><span>3D Viewer Preview</span><span>↻ ⛶</span></div>
          <div style={{background:'radial-gradient(ellipse at center,rgba(160,32,240,0.24),transparent 70%)',borderRadius:'12px',height:'250px',display:'grid',placeItems:'center'}}>{done && preview? <img src={preview} alt="3d" style={{height:'170px'}}/> : <div style={{fontSize:'72px'}}>👟</div>}</div>
        </div>
      </div>

      {/* 4 BOXES - HEADING SMALL, SUBHEADING BIGGER */}
      <div style={{padding:'40px 40px 20px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{textAlign:'center',maxWidth:'820px',margin:'0 auto'}}>
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.32)',padding:'6px 12px',borderRadius:'20px',fontSize:'11px',letterSpacing:'.12em',color:'#D6A5FF',fontWeight:800}}>FOUR STUDIOS • ONE PLATFORM</div>
          {/* HEADING - KEPT SMALL AS ORIGINAL */}
          <h2 style={{fontSize:'32px',fontWeight:700,letterSpacing:'-0.02em',margin:'14px 0 10px',lineHeight:1.2,color:'#fff'}}>Everything you need to create,<br/>in one place</h2>
          {/* SUBHEADING - INCREASED */}
          <p style={{color:'rgba(255,255,255,0.82)',fontSize:'16px',lineHeight:'1.6',margin:0,fontWeight:400}}>Photo, Vector, 3D and Motion — built for creators in India and worldwide. One click export to any format.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'18px',marginTop:'32px'}}>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.15) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'18px',padding:'22px'}}>
            <div style={{width:'46px',height:'46px',background:'#A020F0',borderRadius:'11px',display:'grid',placeItems:'center',fontSize:'24px'}}>📸</div>
            <h3 style={{fontSize:'18px',fontWeight:700,margin:'16px 0 8px',color:'#fff'}}>Photo Studio</h3>
            <p style={{fontSize:'15px',color:'rgba(255,255,255,0.85)',lineHeight:'1.55',margin:0,fontWeight:400}}>Your Shopify photos, studio-ready in 1 sec.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'8px',fontSize:'15px',color:'rgba(255,255,255,0.92)',fontWeight:500}}><span>• Remove Background</span><span>• Remove Object</span><span>• AI Backgrounds & Shadows</span><span>• Upscaler + Banner Maker</span></div>
            <div style={{marginTop:'14px',fontSize:'12px',color:'rgba(255,255,255,0.5)',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'10px'}}>JPG, PNG, EPS, SVG, PSD, AI</div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.26) 0%, rgba(255,255,255,0.04) 100%)',border:'1.6px solid #A020F0',borderRadius:'18px',padding:'22px',position:'relative'}}>
            <div style={{position:'absolute',top:'12px',right:'12px',background:'#A020F0',padding:'4px 10px',borderRadius:'20px',fontSize:'10px',fontWeight:800}}>YOUR USP ★</div>
            <div style={{width:'46px',height:'46px',background:'rgba(255,255,255,0.07)',border:'1px solid #A020F0',borderRadius:'11px',display:'grid',placeItems:'center',fontSize:'24px'}}>✒️</div>
            <h3 style={{fontSize:'18px',fontWeight:700,margin:'16px 0 8px',color:'#fff'}}>Vector Studio</h3>
            <p style={{fontSize:'15px',color:'rgba(255,255,255,0.85)',lineHeight:'1.55',margin:0,fontWeight:400}}>Blurry logo → sharp print-ready SVG.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'8px',fontSize:'15px',color:'rgba(255,255,255,0.92)',fontWeight:500}}><span>• Image to Vector</span><span>• Photo to Line Art</span><span>• Logo Vectorizer</span><span>• Batch 100x</span></div>
            <div style={{marginTop:'14px',fontSize:'12px',color:'rgba(255,255,255,0.5)',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'10px'}}>JPG, PNG, EPS, SVG, PSD, CDR, AI</div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'18px',padding:'22px'}}>
            <div style={{width:'46px',height:'46px',background:'rgba(255,255,255,0.09)',borderRadius:'11px',display:'grid',placeItems:'center',fontSize:'24px'}}>🧊</div>
            <h3 style={{fontSize:'18px',fontWeight:700,margin:'16px 0 8px',color:'#fff'}}>3D Studio</h3>
            <p style={{fontSize:'15px',color:'rgba(255,255,255,0.85)',lineHeight:'1.55',margin:0,fontWeight:400}}>Photo → production 3D for Shopify & games.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'8px',fontSize:'15px',color:'rgba(255,255,255,0.92)',fontWeight:500}}><span>• Image to 3D – 60 sec</span><span>• Multi-Image to 3D</span><span>• Text to 3D & Texture</span><span>• Remesh, Rig & Animate</span></div>
            <div style={{marginTop:'14px',fontSize:'12px',color:'rgba(255,255,255,0.5)',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'10px'}}>GLB, OBJ, FBX, STL, USDZ</div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.15) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'18px',padding:'22px'}}>
            <div style={{width:'46px',height:'46px',background:'#A020F0',borderRadius:'11px',display:'grid',placeItems:'center',fontSize:'24px'}}>🎬</div>
            <h3 style={{fontSize:'18px',fontWeight:700,margin:'16px 0 8px',color:'#fff'}}>Motion Studio</h3>
            <p style={{fontSize:'15px',color:'rgba(255,255,255,0.85)',lineHeight:'1.55',margin:0,fontWeight:400}}>Static → viral Reels, ads, intros.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'8px',fontSize:'15px',color:'rgba(255,255,255,0.92)',fontWeight:500}}><span>• Text/Image to Video</span><span>• Logo & Text Animation</span><span>• Reels, Promo, Ads</span><span>• Stock, Music, LUTs</span></div>
            <div style={{marginTop:'14px',fontSize:'12px',color:'rgba(255,255,255,0.5)',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'10px'}}>MP4, MOV, GIF 9:16</div>
          </div>
        </div>
      </div>

      {/* PRICING - HEADING SMALL, SUBHEADING BIGGER */}
      <div style={{padding:'52px 40px 80px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)',marginTop:'24px'}}>
        <div style={{textAlign:'center'}}>
          <h2 style={{fontSize:'32px',fontWeight:700,letterSpacing:'-0.02em',margin:'0',color:'#fff'}}>Start free. Pay only for<br/>what you <span style={{color:'#A020F0'}}>actually create.</span></h2>
          <p style={{color:'rgba(255,255,255,0.82)',fontSize:'16px',marginTop:'10px',fontWeight:400}}>Free trial includes all studios. No CC required.</p>
          <div style={{display:'inline-flex',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.14)',borderRadius:'32px',padding:'5px',marginTop:'20px'}}>
            <button onClick={()=>setBilling("monthly")} style={{padding:'10px 22px',borderRadius:'22px',border:'none',background:billing==="monthly"?'#fff':'transparent',color:billing==="monthly"?'#000':'rgba(255,255,255,0.85)',fontWeight:700,fontSize:'14px',cursor:'pointer'}}>Monthly</button>
            <button onClick={()=>setBilling("yearly")} style={{padding:'10px 22px',borderRadius:'22px',border:'none',background:billing==="yearly"?'#fff':'transparent',color:billing==="yearly"?'#000':'rgba(255,255,255,0.85)',fontWeight:700,fontSize:'14px',cursor:'pointer'}}>Yearly <span style={{background:'#A020F0',color:'#fff',padding:'3px 8px',borderRadius:'12px',fontSize:'11px',marginLeft:'6px'}}>-20%</span></button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'18px',marginTop:'32px'}}>
          {plans.map((p)=>{
            const isPopular = p.name==="Creator"
            const display = billing==="monthly"? p.m : p.y
            const yearlyTotal = p.m*12*0.8
            return (
              <div key={p.name} style={{background:isPopular?'linear-gradient(180deg, rgba(160,32,240,0.24) 0%, rgba(255,255,255,0.05) 100%)':'rgba(255,255,255,0.05)',border:isPopular?'1.8px solid #A020F0':'1px solid rgba(255,255,255,0.12)',borderRadius:'18px',padding:'24px',position:'relative',boxShadow:isPopular?'0 0 50px rgba(160,32,240,0.22)':'none'}}>
                <div style={{position:'absolute',top:'-13px',left:'50%',transform:'translateX(-50%)',background:p.name==="Free Trial"?'#fff':isPopular?'#A020F0':'rgba(255,255,255,0.12)',color:p.name==="Free Trial"?'#000':'#fff',padding:'5px 14px',borderRadius:'20px',fontSize:'11px',fontWeight:800}}>{p.badge}</div>
                <div style={{fontSize:'34px',fontWeight:800,marginTop:'12px',color:'#fff',lineHeight:1}}>₹{display}<span style={{fontSize:'14px',fontWeight:500,color:'rgba(255,255,255,0.65)'}}> /mo</span></div>
                <div style={{fontSize:'14px',color:'rgba(255,255,255,0.78)',marginTop:'8px',lineHeight:1.4,minHeight:'40px',fontWeight:400}}>
                  {p.name==="Free Trial"? "Free forever • 100 credits • No CC" : billing==="monthly"? `Billed monthly • ${p.credits}` : <>₹{display}/mo • ₹{Math.round(yearlyTotal).toLocaleString('en-IN')}/yr billed<br/><span style={{color:'#A6FF9A'}}>Save 20% • {p.credits}</span></>}
                </div>
                <div style={{marginTop:'18px',fontSize:'15px',display:'grid',gap:'9px',color:'rgba(255,255,255,0.92)',fontWeight:500}}>
                  <div style={{color:'#fff',fontWeight:700,fontSize:'15px'}}>✓ {p.exp}</div>
                  {p.feats.map(f=><div key={f}>✓ {f}</div>)}
                </div>
                <button style={{marginTop:'22px',width:'100%',background:isPopular?'#A020F0':p.name==="Free Trial"?'#fff':'rgba(255,255,255,0.1)',boxShadow:isPopular?'0 0 24px rgba(160,32,240,0.45)':'none',border:isPopular?'none':'1px solid rgba(255,255,255,0.14)',padding:'13px',borderRadius:'12px',color:isPopular?'#fff':p.name==="Free Trial"?'#000':'#fff',fontWeight:800,cursor:'pointer',fontSize:'15px'}}>{p.cta}</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
