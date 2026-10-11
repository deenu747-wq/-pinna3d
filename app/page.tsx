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
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 40px',background:'#0A0814',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <img src="/logo.png" alt="Pinna3d.com" style={{height:'42px',width:'auto'}} />
        <div style={{display:'flex',gap:'22px',alignItems:'center',fontSize:'13px',color:'rgba(255,255,255,0.7)'}}>
          <span>Features</span><span style={{color:'#A020F0'}}>Pricing</span><span>Docs</span><span>Blog</span>
          <button style={{background:'#2A2838',padding:'7px 14px',borderRadius:'6px',border:'1px solid rgba(255,255,255,0.1)',color:'#fff',fontSize:'12px'}}>Sign In</button>
          <button style={{background:'#A020F0',padding:'7px 16px',borderRadius:'6px',border:'none',color:'#fff',fontSize:'12px',fontWeight:500}}>Get Started</button>
        </div>
      </header>

      <div style={{display:'flex',gap:'8px',padding:'12px 40px',background:'rgba(255,255,255,0.02)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        {["Image to 3D","Multi-Image to 3D","Text to 3D","Text to Texture"].map((t,i)=>{
          const k=["image3d","multi","text3d","texture"][i]
          return <button key={k} onClick={()=>setTab(k)} style={{padding:'7px 14px',borderRadius:'20px',fontSize:'12px',border:tab===k?'1px solid #A020F0':'1px solid rgba(255,255,255,0.14)',background:tab===k?'#A020F0':'transparent',color:'#fff'}}>{t}</button>
        })}
        <button style={{padding:'7px 14px',borderRadius:'20px',fontSize:'12px',border:'1px solid rgba(255,255,255,0.14)',background:'transparent',color:'#fff'}}>Template Studio ★ NEW</button>
        <a href="/image-to-vector" style={{padding:'7px 14px',borderRadius:'20px',fontSize:'12px',border:'1px solid rgba(160,32,240,0.5)',background:'rgba(160,32,240,0.14)',color:'#fff',textDecoration:'none'}}>Image to Vector ★ NEW</a>
      </div>

      {/* TOP - SQUARE BOXES 8px */}
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'20px',padding:'36px 40px',maxWidth:'1440px',margin:'0 auto'}}>
        <div>
          <h1 style={{fontSize:'38px',lineHeight:'1.15',fontWeight:700,margin:0}}>Every Image to 3D or Vector<br/>in 60 Seconds</h1>
          <p style={{color:'rgba(255,255,255,0.65)',marginTop:'12px',fontSize:'13px',lineHeight:'1.6',maxWidth:'420px'}}>Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators worldwide.</p>
          <div style={{display:'flex',gap:'10px',marginTop:'18px'}}>
            <button style={{background:'#A020F0',padding:'9px 16px',borderRadius:'6px',border:'none',color:'#fff',fontSize:'12px',fontWeight:500}}>✦ Start Creating — Free</button>
            <button style={{background:'transparent',border:'1px solid rgba(255,255,255,0.15)',padding:'9px 16px',borderRadius:'6px',color:'#fff',fontSize:'12px'}}>◉ Watch Demo</button>
          </div>
        </div>

        <div onClick={openPicker} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1px dashed #A020F0',borderRadius:'8px',background:'rgba(255,255,255,0.02)',padding:'20px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'56px',height:'56px',background:'#1E1A32',borderRadius:'6px',display:'grid',placeItems:'center',marginBottom:'12px'}}>☁️</div>
          <b style={{fontSize:'14px'}}>Drag & drop your image here</b>
          <div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>or browse files to upload</div>
          {preview && <img src={preview} alt="p" style={{width:'80px',marginTop:'10px',borderRadius:'4px'}}/>}
        </div>

        <div style={{background:'#15131E',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',padding:'12px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',color:'rgba(255,255,255,0.5)',marginBottom:'8px'}}><span>3D Viewer Preview</span><span>↻ ⛶ •••</span></div>
          <div style={{background:'radial-gradient(ellipse at center,rgba(160,32,240,0.3),transparent 70%)',borderRadius:'6px',height:'190px',display:'grid',placeItems:'center',overflow:'hidden'}}>
            {done && preview? <img src={preview} alt="3d" style={{height:'150px'}}/> : <img src="/sneaker.webp" alt="sneaker" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'6px'}}/>}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
            <button style={{background:'transparent',border:'1px solid rgba(255,255,255,0.1)',padding:'7px',borderRadius:'4px',color:'#fff',fontSize:'11px'}}>Download GLB</button>
            <button style={{background:'#A020F0',border:'none',padding:'7px',borderRadius:'4px',color:'#fff',fontSize:'11px'}}>Export SVG</button>
          </div>
        </div>
      </div>

      {/* SECOND - PROFESSIONAL CATCHY SQUARE STUDIOS */}
      <div style={{padding:'40px 40px',background:'#0F0E18',borderTop:'1px solid rgba(255,255,255,0.06)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{textAlign:'center',marginBottom:'30px'}}>
          <div style={{display:'inline-flex',background:'linear-gradient(90deg,rgba(160,32,240,0.2),rgba(160,32,240,0.08))',border:'1px solid rgba(160,32,240,0.35)',padding:'6px 14px',borderRadius:'20px',fontSize:'10px',letterSpacing:'.14em',color:'#D6A5FF',fontWeight:600}}>FOUR STUDIOS • ONE PLATFORM • INFINITE CREATION</div>
          <h2 style={{fontSize:'32px',fontWeight:700,margin:'16px 0 8px',letterSpacing:'-0.02em'}}>Everything you need to <span style={{color:'#A020F0'}}>create</span>,<br/>nothing you don't.</h2>
          <p style={{fontSize:'14px',color:'rgba(255,255,255,0.55)',margin:0}}>Trusted by 100k+ sellers • Photo, Vector, 3D and Motion — one click export.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'16px',maxWidth:'1440px',margin:'0 auto'}}>
          {/* Photo - Square */}
          <div style={{background:'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',padding:'20px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:'linear-gradient(90deg,#FF7AD1,#A020F0)'}}></div>
            <div style={{width:'42px',height:'42px',background:'rgba(255,255,255,0.08)',borderRadius:'6px',display:'grid',placeItems:'center',fontSize:'20px',border:'1px solid rgba(255,255,255,0.1)'}}>📸</div>
            <h3 style={{fontSize:'16px',fontWeight:600,margin:'14px 0 4px'}}>Photo Studio</h3>
            <p style={{fontSize:'12px',color:'#A020F0',fontWeight:500,margin:'0 0 10px'}}>Shopify Ready in 1 Sec</p>
            <p style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',margin:'0 0 12px',lineHeight:'1.5'}}>Your product photos, studio-ready automatically.</p>
            <div style={{display:'grid',gap:'6px',fontSize:'11px',color:'rgba(255,255,255,0.85)'}}>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><span style={{width:'14px',height:'14px',background:'rgba(160,32,240,0.2)',borderRadius:'3px',display:'grid',placeItems:'center',fontSize:'8px'}}>✓</span> Remove Background</span>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><span style={{width:'14px',height:'14px',background:'rgba(160,32,240,0.2)',borderRadius:'3px',display:'grid',placeItems:'center',fontSize:'8px'}}>✓</span> Remove Object + AI BG</span>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><span style={{width:'14px',height:'14px',background:'rgba(160,32,240,0.2)',borderRadius:'3px',display:'grid',placeItems:'center',fontSize:'8px'}}>✓</span> Upscaler + Banner Maker</span>
            </div>
            <div style={{marginTop:'14px',background:'rgba(0,0,0,0.3)',borderRadius:'4px',padding:'6px 8px',fontSize:'9px',color:'rgba(255,255,255,0.4)',letterSpacing:'0.05em'}}>JPG • PNG • PSD • AI • EPS • SVG</div>
          </div>

          {/* Vector - Highlighted Square */}
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.18) 0%, rgba(21,19,30,1) 100%)',border:'1.5px solid #A020F0',borderRadius:'8px',padding:'20px',position:'relative',overflow:'hidden',boxShadow:'0 0 30px rgba(160,32,240,0.25)'}}>
            <div style={{position:'absolute',top:'10px',right:'10px',background:'#A020F0',padding:'3px 8px',borderRadius:'4px',fontSize:'9px',fontWeight:700,letterSpacing:'0.05em'}}>YOUR USP ★ BESTSELLER</div>
            <div style={{width:'42px',height:'42px',background:'#A020F0',borderRadius:'6px',display:'grid',placeItems:'center',fontSize:'20px',boxShadow:'0 0 12px rgba(160,32,240,0.5)'}}>✒️</div>
            <h3 style={{fontSize:'16px',fontWeight:700,margin:'14px 0 4px'}}>Vector Studio</h3>
            <p style={{fontSize:'12px',color:'#fff',fontWeight:600,margin:'0 0 10px'}}>Blurry → Print-Ready SVG</p>
            <p style={{fontSize:'11px',color:'rgba(255,255,255,0.6)',margin:'0 0 12px',lineHeight:'1.5'}}>Industry's sharpest AI vectorizer. No more potrace.</p>
            <div style={{display:'grid',gap:'6px',fontSize:'11px',color:'#fff'}}>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><span style={{width:'14px',height:'14px',background:'#A020F0',borderRadius:'3px',display:'grid',placeItems:'center',fontSize:'8px'}}>✓</span> Image to Vector — HD</span>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><span style={{width:'14px',height:'14px',background:'#A020F0',borderRadius:'3px',display:'grid',placeItems:'center',fontSize:'8px'}}>✓</span> Photo to Line Art</span>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><span style={{width:'14px',height:'14px',background:'#A020F0',borderRadius:'3px',display:'grid',placeItems:'center',fontSize:'8px'}}>✓</span> Logo Vectorizer + Batch 100x</span>
            </div>
            <div style={{marginTop:'14px',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.3)',borderRadius:'4px',padding:'6px 8px',fontSize:'9px',color:'#D6A5FF',letterSpacing:'0.05em'}}>SVG • EPS • AI • CDR • PDF • PNG</div>
          </div>

          {/* 3D - Square */}
          <div style={{background:'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',padding:'20px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:'linear-gradient(90deg,#00D1FF,#A020F0)'}}></div>
            <div style={{width:'42px',height:'42px',background:'rgba(0,209,255,0.12)',borderRadius:'6px',display:'grid',placeItems:'center',fontSize:'20px',border:'1px solid rgba(0,209,255,0.2)'}}>🧊</div>
            <h3 style={{fontSize:'16px',fontWeight:600,margin:'14px 0 4px'}}>3D Studio</h3>
            <p style={{fontSize:'12px',color:'#00D1FF',fontWeight:500,margin:'0 0 10px'}}>Photo → Game-Ready 3D</p>
            <p style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',margin:'0 0 12px',lineHeight:'1.5'}}>Production 3D for Shopify & games in 60s.</p>
            <div style={{display:'grid',gap:'6px',fontSize:'11px',color:'rgba(255,255,255,0.85)'}}>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><span style={{width:'14px',height:'14px',background:'rgba(0,209,255,0.2)',borderRadius:'3px',display:'grid',placeItems:'center',fontSize:'8px'}}>✓</span> Image to 3D — 60 sec</span>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><span style={{width:'14px',height:'14px',background:'rgba(0,209,255,0.2)',borderRadius:'3px',display:'grid',placeItems:'center',fontSize:'8px'}}>✓</span> Multi-Image + Text to 3D</span>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><span style={{width:'14px',height:'14px',background:'rgba(0,209,255,0.2)',borderRadius:'3px',display:'grid',placeItems:'center',fontSize:'8px'}}>✓</span> Remesh, Rig & Animate</span>
            </div>
            <div style={{marginTop:'14px',background:'rgba(0,0,0,0.3)',borderRadius:'4px',padding:'6px 8px',fontSize:'9px',color:'rgba(255,255,255,0.4)'}}>GLB • FBX • OBJ • USDZ • BLEND • STL</div>
          </div>

          {/* Motion - Square */}
          <div style={{background:'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'8px',padding:'20px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:'linear-gradient(90deg,#FFB800,#A020F0)'}}></div>
            <div style={{width:'42px',height:'42px',background:'rgba(255,184,0,0.12)',borderRadius:'6px',display:'grid',placeItems:'center',fontSize:'20px',border:'1px solid rgba(255,184,0,0.2)'}}>🎬</div>
            <h3 style={{fontSize:'16px',fontWeight:600,margin:'14px 0 4px'}}>Motion Studio</h3>
            <p style={{fontSize:'12px',color:'#FFB800',fontWeight:500,margin:'0 0 10px'}}>Static → Viral Reels</p>
            <p style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',margin:'0 0 12px',lineHeight:'1.5'}}>Turn any asset into ads, intros, promos.</p>
            <div style={{display:'grid',gap:'6px',fontSize:'11px',color:'rgba(255,255,255,0.85)'}}>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><span style={{width:'14px',height:'14px',background:'rgba(255,184,0,0.2)',borderRadius:'3px',display:'grid',placeItems:'center',fontSize:'8px'}}>✓</span> Text/Image to Video</span>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><span style={{width:'14px',height:'14px',background:'rgba(255,184,0,0.2)',borderRadius:'3px',display:'grid',placeItems:'center',fontSize:'8px'}}>✓</span> Logo & Text Animation</span>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><span style={{width:'14px',height:'14px',background:'rgba(255,184,0,0.2)',borderRadius:'3px',display:'grid',placeItems:'center',fontSize:'8px'}}>✓</span> Reels, Ads, Stock + Music</span>
            </div>
            <div style={{marginTop:'14px',background:'rgba(0,0,0,0.3)',borderRadius:'4px',padding:'6px 8px',fontSize:'9px',color:'rgba(255,255,255,0.4)'}}>MP4 • MOV • GIF • AE • 9:16 • 16:9</div>
          </div>
        </div>
      </div>

      {/* PLANS - SQUARE BOXES 8px */}
      <div style={{padding:'44px 40px 70px',maxWidth:'1440px',margin:'0 auto'}}>
        <div style={{textAlign:'center'}}>
          <h2 style={{fontSize:'26px',fontWeight:600,margin:0}}>Simple, transparent pricing</h2>
          <p style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>Start free. Upgrade when you need more.</p>
          <div style={{display:'inline-flex',background:'rgba(255,255,255,0.06)',borderRadius:'6px',padding:'4px',marginTop:'16px'}}>
            <button onClick={()=>setBilling("monthly")} style={{padding:'6px 14px',borderRadius:'4px',border:'none',background:billing==="monthly"?'#fff':'transparent',color:billing==="monthly"?'#000':'#aaa',fontSize:'11px'}}>Monthly</button>
            <button onClick={()=>setBilling("yearly")} style={{padding:'6px 14px',borderRadius:'4px',border:'none',background:billing==="yearly"?'#fff':'transparent',color:billing==="yearly"?'#000':'#aaa',fontSize:'11px'}}>Yearly -20%</button>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'16px',marginTop:'28px'}}>
          {plans.map((p)=>{
            const isPopular=p.name==="Creator"
            const display=billing==="monthly"?p.m:p.y
            return(
              <div key={p.name} style={{background:isPopular?'#1A162E':'#15131E',border:isPopular?'1.5px solid #A020F0':'1px solid rgba(255,255,255,0.07)',borderRadius:'8px',padding:'20px',position:'relative'}}>
                <div style={{position:'absolute',top:'-9px',left:'50%',transform:'translateX(-50%)',background:isPopular?'#A020F0':p.name==="Free Trial"?'#fff':'#2A2838',color:p.name==="Free Trial"?'#000':'#fff',padding:'3px 10px',borderRadius:'4px',fontSize:'9px',whiteSpace:'nowrap'}}>{p.badge}</div>
                <div style={{fontSize:'26px',fontWeight:700,marginTop:'10px'}}>₹{display}<span style={{fontSize:'12px',color:'rgba(255,255,255,0.4)'}}> /mo</span></div>
                <div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>{p.credits} • {p.exp}</div>
                <div style={{marginTop:'14px',fontSize:'11px',display:'grid',gap:'6px'}}>{p.feats.map(f=><div key={f}><span style={{color:'#A020F0'}}>•</span> {f}</div>)}</div>
                <button style={{marginTop:'16px',width:'100%',background:isPopular?'#A020F0':'transparent',border:'1px solid rgba(255,255,255,0.1)',padding:'9px',borderRadius:'6px',color:'#fff',fontSize:'11px',fontWeight:600}}>{p.cta}</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
