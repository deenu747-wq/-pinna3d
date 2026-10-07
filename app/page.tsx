"use client"
import { useState, useRef } from "react"

export default function Page(){
  const [preview,setPreview]=useState("")
  const [done,setDone]=useState(false)
  const [tab,setTab]=useState("image3d")
  const fileRef = useRef<HTMLInputElement>(null)

  const onFile = (e:any)=>{
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    setPreview(URL.createObjectURL(f))
    setDone(false)
    setTimeout(()=>setDone(true),1000)
  }
  const openPicker = () => fileRef.current?.click()

  // PREMIUM HEADING STYLE - professional
  const h1Style = {
    fontSize:'48px',
    lineHeight:'1.08',
    fontWeight:600,
    letterSpacing:'-0.02em',
    margin:0,
    fontFamily:"'Inter', 'SF Pro Display', -apple-system, sans-serif"
  } as const

  const h2Style = {
    fontSize:'32px',
    fontWeight:600,
    letterSpacing:'-0.015em',
    margin:'12px 0 6px',
  } as const

  return (
    <div style={{background:'#0B0A14',color:'#fff',fontFamily:"'Inter', system-ui, -apple-system, sans-serif",minHeight:'100vh',fontWeight:400}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 40px',borderBottom:'1px solid #1e1c32',background:'#0B0A14',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <img src="/logo.png" alt="Pinna3d.com" style={{height:'100px',width:'auto',objectFit:'contain'}} />
        </div>
        <div style={{display:'flex',gap:'28px',alignItems:'center',fontSize:'15px',fontWeight:500,letterSpacing:'-0.01em'}}>
          <span style={{opacity:.6}}>Features</span>
          <span style={{color:'#A020F0',fontWeight:600}}>Pricing</span>
          <span style={{opacity:.6}}>Docs</span>
          <span style={{opacity:.6}}>Blog</span>
          <button style={{background:'#2a2840',padding:'10px 18px',borderRadius:'8px',border:'none',color:'#fff',cursor:'pointer',fontSize:'14px',fontWeight:500}}>Sign In</button>
          <button style={{background:'#A020F0',padding:'10px 20px',borderRadius:'8px',border:'none',color:'#fff',fontWeight:600,cursor:'pointer',fontSize:'14px',letterSpacing:'-0.01em'}}>Get Started</button>
        </div>
      </header>

      <div style={{display:'flex',gap:'10px',padding:'14px 40px',background:'#0f0e1a',borderBottom:'1px solid #1e1c32',overflowX:'auto'}}>
        {[
          {id:'text3d',l:'Text to 3D'},
          {id:'image3d',l:'Image to 3D'},
          {id:'multi',l:'Multi-Image to 3D'},
          {id:'texture',l:'Text to Texture'},
          {id:'vector',l:'Image to Vector ★ NEW'},
          {id:'template',l:'Template Studio ★ NEW'},
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,letterSpacing:'-0.01em',border:tab===t.id?'1px solid #A020F0':'1px solid #2a2840',background:tab===t.id?'#A020F0':'transparent',color:'#fff',cursor:'pointer',whiteSpace:'nowrap'}}>{t.l}</button>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'24px',padding:'40px',maxWidth:'1440px',margin:'0 auto'}}>
        <div>
          {tab==='image3d' && <>
            <h1 style={h1Style}>Every Image to 3D<br/>or Vector in 60 Seconds</h1>
            <p style={{opacity:.6,marginTop:'16px',fontSize:'16px',lineHeight:'1.6',fontWeight:400,letterSpacing:'-0.01em'}}>Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators worldwide.</p>
          </>}
          {tab==='text3d' && <>
            <h1 style={h1Style}>Your Text Just Got<br/>a Promotion.</h1>
            <p style={{opacity:.6,marginTop:'16px',fontSize:'16px',lineHeight:'1.6',fontWeight:400}}>Type prompt → 30s preview → 60s textured PBR 4K. Same as Meshy, plus Vector & Banner.</p>
            <textarea placeholder="A cute dragon wearing sneakers, PBR, ultra detailed..." style={{width:'100%',height:'100px',marginTop:'18px',background:'#13111F',border:'1px solid #2a2840',borderRadius:'12px',padding:'14px',color:'#fff',fontSize:'14px',outline:'none',fontWeight:400}}></textarea>
            <button style={{marginTop:'14px',width:'100%',background:'#A020F0',padding:'13px',borderRadius:'10px',fontWeight:600,border:'none',color:'#fff',cursor:'pointer',fontSize:'14px',letterSpacing:'-0.01em'}}>Generate 3D — 20 Credits ✦</button>
          </>}
          {tab==='vector' && <>
            <h1 style={h1Style}>JPG to SVG<br/>in 2 Seconds ★</h1>
            <p style={{opacity:.6,marginTop:'16px',fontSize:'16px',lineHeight:'1.6',fontWeight:400}}>Extra power over Meshy — Instant browser vectorization. SVG, EPS, PDF, AI. Infinite scale.</p>
          </>}
          {tab==='template' && <>
            <h1 style={h1Style}>Prompt to Banner<br/>Any Size ★</h1>
            <p style={{opacity:.6,marginTop:'16px',fontSize:'16px',lineHeight:'1.6',fontWeight:400}}>Type prompt → Instagram, YouTube, Shopify Banner of any size.</p>
            <textarea placeholder="Diwali Sale 50% OFF banner, neon modern..." style={{width:'100%',height:'80px',marginTop:'18px',background:'#13111F',border:'1px solid #2a2840',borderRadius:'12px',padding:'14px',color:'#fff',fontSize:'14px'}}></textarea>
          </>}
          {tab==='multi' && <><h1 style={h1Style}>Multi-Image to 3D</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px',fontWeight:400}}>Upload 3-4 angles for perfect geometry.</p></>}
          {tab==='texture' && <><h1 style={h1Style}>Text to Texture</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px',fontWeight:400}}>Retexture any mesh with PBR 4K.</p></>}

          <div style={{display:'flex',gap:'12px',marginTop:'24px'}}>
            <button style={{background:'#A020F0',padding:'14px 22px',borderRadius:'10px',fontWeight:600,border:'none',color:'#fff',cursor:'pointer',fontSize:'14px',letterSpacing:'-0.01em'}}>✦ Start Creating — Free</button>
            <button style={{border:'1px solid #2a2840',background:'transparent',padding:'14px 22px',borderRadius:'10px',color:'#fff',cursor:'pointer',fontSize:'14px',fontWeight:500}}>◉ Watch Demo</button>
          </div>
          <div style={{display:'flex',gap:'8px',marginTop:'20px',flexWrap:'wrap',fontSize:'13px',fontWeight:400}}>
            {['⚡ 60s Turnaround','• 100k+ assets generated','• No credit card required','♾️ 7 Formats'].map(t=>(
              <span key={t} style={{background:'#13111F',border:'1px solid #201e33',padding:'6px 14px',borderRadius:'20px'}}>{t}</span>
            ))}
          </div>
        </div>

        <div onClick={openPicker} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed #A020F0',borderRadius:'18px',background:'#13111F',padding:'24px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'60px',height:'60px',background:'#1e1b33',borderRadius:'12px',display:'grid',placeItems:'center',fontSize:'28px',color:'#A020F0',marginBottom:'14px'}}>☁️</div>
          <b style={{fontSize:'16px',fontWeight:600,letterSpacing:'-0.01em'}}>Drag & drop your image here</b>
          <span style={{opacity:.5,fontSize:'13px',marginTop:'6px',fontWeight:400}}>or browse files to upload</span>
          <span style={{opacity:.35,fontSize:'11px',marginTop:'18px',fontWeight:400}}>Supports PNG, JPG, WEBP • Max 20MB</span>
          <div style={{marginTop:'16px',background:'#A020F0',color:'#fff',padding:'11px 22px',borderRadius:'8px',fontSize:'13px',fontWeight:600,letterSpacing:'-0.01em'}}>Browse Files</div>
          {preview && <img src={preview} alt="preview" style={{width:'100px',borderRadius:'8px',marginTop:'12px',border:'1px solid #2a2840'}}/>}
        </div>

        <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'18px',padding:'14px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',opacity:.5,padding:'6px',fontWeight:400}}><span>3D Viewer Preview</span><span>↻ ⛶</span></div>
          <div style={{background:'radial-gradient(ellipse at center,#2a1a4a,#0f0e1a)',borderRadius:'12px',height:'240px',marginTop:'8px',display:'grid',placeItems:'center',position:'relative',overflow:'hidden'}}>
            {done && preview? <img src={preview} alt="3d" style={{height:'160px',borderRadius:'8px'}}/> : <div style={{fontSize:'68px'}}>👟</div>}
            <div style={{position:'absolute',bottom:'10px',left:'10px',background:'rgba(0,0,0,0.6)',padding:'6px 10px',borderRadius:'6px',fontSize:'11px',fontWeight:400}}>Model: Sneaker_v01.glb</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'6px',marginTop:'12px'}}>
            {['GLB','FBX','OBJ','STL','3MF','USDZ','BLEND'].map(f=><button key={f} style={{background:'#1a1830',border:'1px solid #2a2840',padding:'9px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'11px',fontWeight:500}}>{f}</button>)}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'11px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'13px',fontWeight:500}}>Download GLB</button>
            <button style={{background:'#A020F0',padding:'11px',borderRadius:'8px',color:'#fff',border:'none',cursor:'pointer',fontSize:'13px',fontWeight:600}}>Export SVG</button>
          </div>
        </div>
      </div>

      <div style={{padding:'28px 40px 60px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid #161426'}}>
        <h2 style={h2Style}>Simple, transparent pricing</h2>
        <p style={{textAlign:'center',opacity:.5,fontSize:'15px',marginBottom:'28px',fontWeight:400,letterSpacing:'-0.01em'}}>Start free. Upgrade when you need more. Credits like Meshy.</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'20px'}}>
          {[
            {t:'Free',p:'₹0',s:'100 credits • ~5 models',f:['5 exports per month','3D preview only','Standard resolution','Community support'],btn:'Get Started Free',pop:false},
            {t:'Pro',p:'₹999',s:'1000 credits • ~50 models',f:['200 exports per month','Full 3D + Vector export','HD & 4K exports','Priority ~60s','Commercial license'],btn:'Start Pro Trial',pop:true},
            {t:'Business',p:'₹2499',s:'4000 credits • ~200 models',f:['1000 exports per month','API access + bulk','Team workspaces (5 seats)','Custom vector styles','Priority support'],btn:'Contact Sales',pop:false},
          ].map(c=>(
            <div key={c.t} style={{background:'#13111F',border:c.pop?'1.5px solid #A020F0':'1px solid #201e33',borderRadius:'16px',padding:'24px',position:'relative'}}>
              {c.pop && <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#A020F0',padding:'4px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:600,letterSpacing:'-0.01em'}}>☆ Most Popular</div>}
              <div style={{textAlign:'center',fontSize:'13px',opacity:.7,fontWeight:500,letterSpacing:'-0.01em'}}>{c.t} • {c.s}</div>
              <div style={{textAlign:'center',fontSize:'34px',fontWeight:600,marginTop:'10px',letterSpacing:'-0.02em'}}>{c.p}<span style={{fontSize:'14px',opacity:.5,fontWeight:400}}> /mo</span></div>
              <div style={{marginTop:'18px'}}>{c.f.map(fe=><div key={fe} style={{fontSize:'14px',margin:'8px 0',opacity:.8,fontWeight:400}}}>✓ {fe}</div>)}</div>
              <button style={{marginTop:'22px',width:'100%',background:c.pop?'#A020F0':'transparent',border:c.pop?'none':'1px solid #2a2840',padding:'12px',borderRadius:'10px',color:'#fff',cursor:'pointer',fontSize:'14px',fontWeight:600}}>{c.btn}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
