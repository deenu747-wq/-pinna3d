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
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh'}}>
      {/* FIXED: Single logo only */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 40px',background:'#0A0814',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <img src="/logo.png" alt="Pinna3d.com" style={{height:'42px',width:'auto',objectFit:'contain'}} />
        <div style={{display:'flex',gap:'22px',alignItems:'center',fontSize:'13px',color:'rgba(255,255,255,0.7)'}}>
          <span>Features</span><span style={{color:'#A020F0'}}>Pricing</span><span>Docs</span><span>Blog</span>
          <button style={{background:'#2A2838',padding:'7px 14px',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',fontSize:'12px'}}>Sign In</button>
          <button style={{background:'#A020F0',padding:'7px 16px',borderRadius:'8px',border:'none',color:'#fff',fontSize:'12px',fontWeight:500}}>Get Started</button>
        </div>
      </header>

      {/* Tabs row - restored */}
      <div style={{display:'flex',gap:'8px',padding:'12px 40px',background:'rgba(255,255,255,0.02)',borderBottom:'1px solid rgba(255,255,255,0.06)',overflowX:'auto'}}>
        {["Image to 3D","Multi-Image to 3D","Text to 3D","Text to Texture"].map((t,i)=>{
          const k=["image3d","multi","text3d","texture"][i]
          return <button key={k} onClick={()=>setTab(k)} style={{padding:'7px 14px',borderRadius:'20px',fontSize:'12px',border:tab===k?'1px solid #A020F0':'1px solid rgba(255,255,255,0.14)',background:tab===k?'#A020F0':'transparent',color:'#fff'}}>{t}</button>
        })}
        <button style={{padding:'7px 14px',borderRadius:'20px',fontSize:'12px',border:'1px solid rgba(255,255,255,0.14)',background:'transparent',color:'#fff'}}>Template Studio ★ NEW</button>
        <a href="/image-to-vector" style={{padding:'7px 14px',borderRadius:'20px',fontSize:'12px',border:'1px solid rgba(160,32,240,0.5)',background:'rgba(160,32,240,0.14)',color:'#fff',textDecoration:'none'}}>Image to Vector ★ NEW</a>
      </div>

      {/* FIRST SECTION - Exact screenshot formatting, square boxes */}
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'20px',padding:'36px 40px',maxWidth:'1440px',margin:'0 auto'}}>
        <div>
          <h1 style={{fontSize:'38px',lineHeight:'1.15',fontWeight:700,margin:0}}>Every Image to 3D or Vector<br/>in 60 Seconds</h1>
          <p style={{color:'rgba(255,255,255,0.65)',marginTop:'12px',fontSize:'13px',lineHeight:'1.6',maxWidth:'420px'}}>Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators worldwide.</p>
          <div style={{display:'flex',gap:'10px',marginTop:'18px'}}>
            <button style={{background:'#A020F0',padding:'9px 16px',borderRadius:'8px',border:'none',color:'#fff',fontSize:'12px',fontWeight:500}}>✦ Start Creating — Free</button>
            <button style={{background:'transparent',border:'1px solid rgba(255,255,255,0.15)',padding:'9px 16px',borderRadius:'8px',color:'#fff',fontSize:'12px'}}>◉ Watch Demo</button>
          </div>
          <div style={{display:'flex',gap:'6px',marginTop:'16px',flexWrap:'wrap'}}>
            <span style={{background:'rgba(160,32,240,0.15)',padding:'4px 10px',borderRadius:'16px',fontSize:'10px'}}>• 60s Turnaround</span>
            <span style={{background:'rgba(255,255,255,0.06)',padding:'4px 10px',borderRadius:'16px',fontSize:'10px'}}>• 100k+ assets generated</span>
            <span style={{background:'rgba(255,255,255,0.06)',padding:'4px 10px',borderRadius:'16px',fontSize:'10px'}}>• No credit card required</span>
          </div>
        </div>

        <div onClick={openPicker} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1px dashed #A020F0',borderRadius:'12px',background:'rgba(255,255,255,0.02)',padding:'20px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'56px',height:'56px',background:'#1E1A32',borderRadius:'10px',display:'grid',placeItems:'center',marginBottom:'12px'}}>☁️</div>
          <b style={{fontSize:'14px'}}>Drag & drop your image here</b>
          <div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>or browse files to upload</div>
          <div style={{fontSize:'9px',color:'rgba(255,255,255,0.35)',marginTop:'10px'}}>Supports PNG, JPG, WEBP • Max 20MB • JPG/PNG to 3D or SVG</div>
          <div style={{marginTop:'12px',border:'1px solid rgba(255,255,255,0.08)',background:'rgba(255,255,255,0.04)',padding:'5px 10px',borderRadius:'6px',fontSize:'9px'}}>Instant preview • Background removal included</div>
          {preview && <img src={preview} alt="p" style={{width:'80px',marginTop:'10px',borderRadius:'6px'}}/>}
        </div>

        <div style={{background:'#15131E',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',padding:'12px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'rgba(255,255,255,0.5)',marginBottom:'8px'}}><span>3D Viewer Preview</span><span>↻ ⛶ •••</span></div>
          <div style={{background:'radial-gradient(ellipse at center,rgba(160,32,240,0.3),transparent 70%)',borderRadius:'8px',height:'190px',display:'grid',placeItems:'center',overflow:'hidden'}}>
            {done && preview? <img src={preview} alt="3d" style={{height:'150px'}}/> : <img src="/sneaker.webp" alt="sneaker" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'8px'}}/>}
          </div>
          <div style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',marginTop:'6px'}}>Model: Sneaker_v01.glb</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'8px'}}>
            <button style={{background:'transparent',border:'1px solid rgba(255,255,255,0.1)',padding:'7px',borderRadius:'6px',color:'#fff',fontSize:'11px'}}>Download GLB</button>
            <button style={{background:'#A020F0',border:'none',padding:'7px',borderRadius:'6px',color:'#fff',fontSize:'11px'}}>Export SVG</button>
          </div>
        </div>
      </div>

      {/* SECOND SECTION - 4 Studios in SQUARE boxes */}
      <div style={{padding:'32px 40px',background:'#0F0E18',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{textAlign:'center',marginBottom:'24px'}}>
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.12)',border:'1px solid rgba(160,32,240,0.25)',padding:'4px 12px',borderRadius:'16px',fontSize:'10px',letterSpacing:'.1em',color:'#C99AFF'}}>FOUR STUDIOS • ONE PLATFORM</div>
          <h2 style={{fontSize:'26px',fontWeight:600,margin:'12px 0 6px'}}>Everything you need to create</h2>
          <p style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',margin:0}}>Photo, Vector, 3D and Motion — built for creators worldwide.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'14px',maxWidth:'1440px',margin:'0 auto'}}>
          <div style={{background:'#15131E',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'18px'}}>
            <div style={{width:'36px',height:'36px',background:'#2A2838',borderRadius:'8px',display:'grid',placeItems:'center'}}>📸</div>
            <h3 style={{fontSize:'14px',margin:'10px 0 4px'}}>Photo Studio</h3>
            <p style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',margin:0}}>Your Shopify photos, studio-ready.</p>
            <div style={{marginTop:'10px',fontSize:'11px',display:'grid',gap:'5px',color:'rgba(255,255,255,0.75)'}}><span><span style={{color:'#A020F0'}}>•</span> Remove Background</span><span><span style={{color:'#A020F0'}}>•</span> Remove Object</span><span><span style={{color:'#A020F0'}}>•</span> AI Backgrounds</span><span><span style={{color:'#A020F0'}}>•</span> Upscaler + Banner</span></div>
          </div>
          <div style={{background:'#1A162E',border:'1.5px solid #A020F0',borderRadius:'12px',padding:'18px',position:'relative'}}>
            <div style={{position:'absolute',top:'8px',right:'8px',background:'#A020F0',padding:'2px 8px',borderRadius:'10px',fontSize:'9px'}}>YOUR USP ★</div>
            <div style={{width:'36px',height:'36px',background:'rgba(160,32,240,0.2)',borderRadius:'8px',display:'grid',placeItems:'center'}}>✒️</div>
            <h3 style={{fontSize:'14px',margin:'10px 0 4px'}}>Vector Studio</h3>
            <p style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',margin:0}}>Blurry logo → sharp SVG.</p>
            <div style={{marginTop:'10px',fontSize:'11px',display:'grid',gap:'5px',color:'rgba(255,255,255,0.75)'}}><span><span style={{color:'#A020F0'}}>•</span> Image to Vector</span><span><span style={{color:'#A020F0'}}>•</span> Photo to Line Art</span><span><span style={{color:'#A020F0'}}>•</span> Logo Vectorizer</span><span><span style={{color:'#A020F0'}}>•</span> Batch 100x</span></div>
          </div>
          <div style={{background:'#15131E',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'18px'}}>
            <div style={{width:'36px',height:'36px',background:'#2A2838',borderRadius:'8px',display:'grid',placeItems:'center'}}>🧊</div>
            <h3 style={{fontSize:'14px',margin:'10px 0 4px'}}>3D Studio</h3>
            <p style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',margin:0}}>Photo → production 3D.</p>
            <div style={{marginTop:'10px',fontSize:'11px',display:'grid',gap:'5px',color:'rgba(255,255,255,0.75)'}}><span><span style={{color:'#A020F0'}}>•</span> Image to 3D – 60 sec</span><span><span style={{color:'#A020F0'}}>•</span> Multi-Image to 3D</span><span><span style={{color:'#A020F0'}}>•</span> Text to 3D & Texture</span><span><span style={{color:'#A020F0'}}>•</span> Remesh, Rig</span></div>
          </div>
          <div style={{background:'#15131E',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'18px'}}>
            <div style={{width:'36px',height:'36px',background:'#2A2838',borderRadius:'8px',display:'grid',placeItems:'center'}}>🎬</div>
            <h3 style={{fontSize:'14px',margin:'10px 0 4px'}}>Motion Studio</h3>
            <p style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',margin:0}}>Static → viral Reels.</p>
            <div style={{marginTop:'10px',fontSize:'11px',display:'grid',gap:'5px',color:'rgba(255,255,255,0.75)'}}><span><span style={{color:'#A020F0'}}>•</span> Text/Image to Video</span><span><span style={{color:'#A020F0'}}>•</span> Logo Animation</span><span><span style={{color:'#A020F0'}}>•</span> Reels, Promo</span><span><span style={{color:'#A020F0'}}>•</span> Stock, Music</span></div>
          </div>
        </div>
      </div>

      {/* THIRD - Your 4 Plans */}
      <div style={{padding:'40px 40px 70px',maxWidth:'1440px',margin:'0 auto'}}>
        <div style={{textAlign:'center'}}>
          <h2 style={{fontSize:'26px',fontWeight:600,margin:0}}>Simple, transparent pricing</h2>
          <p style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>Start free. Upgrade when you need more.</p>
          <div style={{display:'inline-flex',background:'rgba(255,255,255,0.06)',borderRadius:'20px',padding:'4px',marginTop:'16px'}}>
            <button onClick={()=>setBilling("monthly")} style={{padding:'6px 14px',borderRadius:'16px',border:'none',background:billing==="monthly"?'#fff':'transparent',color:billing==="monthly"?'#000':'#aaa',fontSize:'11px'}}>Monthly</button>
            <button onClick={()=>setBilling("yearly")} style={{padding:'6px 14px',borderRadius:'16px',border:'none',background:billing==="yearly"?'#fff':'transparent',color:billing==="yearly"?'#000':'#aaa',fontSize:'11px'}}>Yearly -20%</button>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'14px',marginTop:'24px'}}>
          {plans.map((p)=>{
            const isPopular=p.name==="Creator"
            const display=billing==="monthly"?p.m:p.y
            return(
              <div key={p.name} style={{background:isPopular?'#1A162E':'#15131E',border:isPopular?'1.5px solid #A020F0':'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'20px',position:'relative'}}>
                <div style={{position:'absolute',top:'-9px',left:'50%',transform:'translateX(-50%)',background:isPopular?'#A020F0':p.name==="Free Trial"?'#fff':'#2A2838',color:p.name==="Free Trial"?'#000':'#fff',padding:'3px 10px',borderRadius:'10px',fontSize:'9px',whiteSpace:'nowrap'}}>{p.badge}</div>
                <div style={{fontSize:'24px',fontWeight:600,marginTop:'8px'}}>₹{display}<span style={{fontSize:'12px',color:'rgba(255,255,255,0.4)'}}> /mo</span></div>
                <div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>{p.credits} • {p.exp}</div>
                <div style={{marginTop:'12px',fontSize:'11px',display:'grid',gap:'5px'}}>{p.feats.map(f=><div key={f}><span style={{color:'#A020F0'}}>•</span> {f}</div>)}</div>
                <button style={{marginTop:'14px',width:'100%',background:isPopular?'#A020F0':'transparent',border:'1px solid rgba(255,255,255,0.1)',padding:'8px',borderRadius:'6px',color:'#fff',fontSize:'11px'}}>{p.cta}</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
