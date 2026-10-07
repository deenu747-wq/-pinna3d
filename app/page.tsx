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

  return (
    <div style={{background:'#0B0A14',color:'#fff',fontFamily:'Inter,system-ui,sans-serif',minHeight:'100vh'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 36px',borderBottom:'1px solid #1e1c32',background:'#0B0A14',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <img src="/logo.png" alt="Pinna3d.com" style={{height:'110px',width:'auto',objectFit:'contain'}} />
        </div>
        <div style={{display:'flex',gap:'24px',alignItems:'center',fontSize:'14px'}}>
          <span style={{opacity:.6}}>Features</span>
          <span style={{color:'#A020F0',fontWeight:700}}>Pricing</span>
          <span style={{opacity:.6}}>Docs</span>
          <span style={{opacity:.6}}>Blog</span>
          <button style={{background:'#2a2840',padding:'8px 16px',borderRadius:'8px',border:'none',color:'#fff',cursor:'pointer'}}>Sign In</button>
          <button style={{background:'#A020F0',padding:'8px 18px',borderRadius:'8px',border:'none',color:'#fff',fontWeight:700,cursor:'pointer'}}>Get Started</button>
        </div>
      </header>

      {/* NEW: MESHY STYLE TABS - ADDED, COLORS SAME */}
      <div style={{display:'flex',gap:'8px',padding:'12px 36px',background:'#0f0e1a',borderBottom:'1px solid #1e1c32',overflowX:'auto'}}>
        {[
          {id:'text3d',l:'Text to 3D'},
          {id:'image3d',l:'Image to 3D'},
          {id:'multi',l:'Multi-Image to 3D'},
          {id:'texture',l:'Text to Texture'},
          {id:'vector',l:'Image to Vector ★ NEW'},
          {id:'template',l:'Template Studio ★ NEW'},
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'7px 14px',borderRadius:'20px',fontSize:'11px',border:tab===t.id?'1px solid #A020F0':'1px solid #2a2840',background:tab===t.id?'#A020F0':'transparent',color:'#fff',cursor:'pointer',whiteSpace:'nowrap',fontWeight:tab===t.id?700:400}}>{t.l}</button>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'20px',padding:'36px',maxWidth:'1400px',margin:'0 auto'}}>
        <div>
          {/* TEXT CHANGED TO CATCHY, NO DELHI */}
          {tab==='text3d' && <>
            <h1 style={{fontSize:'42px',lineHeight:'1.05',fontWeight:800,margin:0}}>Your Text Just Got<br/>a Promotion.</h1>
            <p style={{opacity:.6,marginTop:'14px',fontSize:'14px',lineHeight:'1.6'}}>Type prompt → 30s preview → 60s textured PBR 4K. Same as Meshy, plus Vector & Banner.</p>
            <textarea placeholder="A cute dragon wearing sneakers, PBR, ultra detailed..." style={{width:'100%',height:'90px',marginTop:'16px',background:'#13111F',border:'1px solid #2a2840',borderRadius:'12px',padding:'12px',color:'#fff',fontSize:'12px',outline:'none'}}></textarea>
            <div style={{display:'flex',gap:'8px',marginTop:'10px',fontSize:'11px'}}>
              <select style={{flex:1,background:'#13111F',border:'1px solid #2a2840',borderRadius:'8px',padding:'8px',color:'#fff'}}><option>30K Polys (Recommended)</option><option>10K</option><option>100K</option></select>
              <select style={{flex:1,background:'#13111F',border:'1px solid #2a2840',borderRadius:'8px',padding:'8px',color:'#fff'}}><option>Realistic</option><option>Cartoon</option><option>Low Poly</option></select>
            </div>
            <button style={{marginTop:'12px',width:'100%',background:'#A020F0',padding:'12px',borderRadius:'10px',fontWeight:700,border:'none',color:'#fff',cursor:'pointer',fontSize:'13px'}}>Generate 3D — 20 Credits ✦</button>
          </>}
          {tab==='image3d' && <>
            <h1 style={{fontSize:'42px',lineHeight:'1.05',fontWeight:800,margin:0}}>Every Image to 3D or Vector<br/>in 60 Seconds</h1>
            <p style={{opacity:.6,marginTop:'14px',fontSize:'14px',lineHeight:'1.6'}}>Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators worldwide.</p>
          </>}
          {tab==='multi' && <>
            <h1 style={{fontSize:'42px',lineHeight:'1.05',fontWeight:800,margin:0}}>Multi-Image to 3D<br/>More Angles, Better Model</h1>
            <p style={{opacity:.6,marginTop:'14px',fontSize:'14px',lineHeight:'1.6'}}>Upload 3-4 angles of same object — AI builds perfect geometry. Same as Meshy multi-image.</p>
          </>}
          {tab==='texture' && <>
            <h1 style={{fontSize:'42px',lineHeight:'1.05',fontWeight:800,margin:0}}>Text to Texture<br/>Retexture Any Mesh</h1>
            <p style={{opacity:.6,marginTop:'14px',fontSize:'14px',lineHeight:'1.6'}}>Upload your mesh + type prompt → PBR 4K textures: BaseColor, Normal, Roughness, Metallic.</p>
          </>}
          {tab==='vector' && <>
            <h1 style={{fontSize:'42px',lineHeight:'1.05',fontWeight:800,margin:0}}>JPG to SVG<br/>in 2 Seconds ★</h1>
            <p style={{opacity:.6,marginTop:'14px',fontSize:'14px',lineHeight:'1.6'}}>Extra power over Meshy — Instant browser vectorization. SVG, EPS, PDF, AI. Infinite scale, no pixelation.</p>
          </>}
          {tab==='template' && <>
            <h1 style={{fontSize:'42px',lineHeight:'1.05',fontWeight:800,margin:0}}>Prompt to Banner<br/>Any Size ★</h1>
            <p style={{opacity:.6,marginTop:'14px',fontSize:'14px',lineHeight:'1.6'}}>Extra power over Meshy — Type prompt → Instagram Post, Story, YouTube Thumb, Shopify Banner, Logo of any size.</p>
            <textarea placeholder="Diwali Sale 50% OFF banner, neon modern..." style={{width:'100%',height:'70px',marginTop:'14px',background:'#13111F',border:'1px solid #2a2840',borderRadius:'12px',padding:'12px',color:'#fff',fontSize:'12px'}}></textarea>
          </>}

          <div style={{display:'flex',gap:'12px',marginTop:'22px'}}>
            <button style={{background:'#A020F0',padding:'12px 20px',borderRadius:'10px',fontWeight:700,border:'none',color:'#fff',cursor:'pointer'}}>✦ Start Creating — Free</button>
            <button style={{border:'1px solid #2a2840',background:'transparent',padding:'12px 20px',borderRadius:'10px',color:'#fff',cursor:'pointer'}}>◉ Watch Demo</button>
          </div>
          <div style={{display:'flex',gap:'8px',marginTop:'20px',flexWrap:'wrap',fontSize:'11px'}}>
            {['⚡ 60s Turnaround','• 100k+ assets generated','• No credit card required','♾️ 7 Formats: GLB FBX OBJ STL 3MF USDZ BLEND'].map(t=>(
              <span key={t} style={{background:'#13111F',border:'1px solid #201e33',padding:'5px 12px',borderRadius:'20px'}}>{t}</span>
            ))}
          </div>
          {/* NEW: MESHY FEATURES BADGES */}
          <div style={{display:'flex',gap:'8px',marginTop:'12px',flexWrap:'wrap',fontSize:'10px'}}>
            {['PBR 4K Textures','Smart Remesh','Auto-Rig + 500 Anims','97% Print-Ready','API Access'].map(t=>(
              <span key={t} style={{background:'#1a1830',border:'1px solid #2a2840',padding:'4px 10px',borderRadius:'20px',opacity:.7}}>{t}</span>
            ))}
          </div>
        </div>

        {/* THIS WHOLE BOX IS NOW CLICKABLE - SAME AS BEFORE */}
        <div onClick={openPicker} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed #A020F0',borderRadius:'18px',background:'#13111F',padding:'24px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'56px',height:'56px',background:'#1e1b33',borderRadius:'12px',display:'grid',placeItems:'center',fontSize:'26px',color:'#A020F0',marginBottom:'14px'}}>☁️</div>
          <b style={{fontSize:'15px'}}>{tab==='text3d'?'Type prompt on left, or upload reference':tab==='vector'?'Drop JPG/PNG for Vector':'Drag & drop your image here'}</b>
          <span style={{opacity:.5,fontSize:'12px',marginTop:'6px'}}>or browse files to upload</span>
          <span style={{opacity:.35,fontSize:'10px',marginTop:'18px'}}>Supports PNG, JPG, WEBP • Max 20MB</span>
          <div style={{marginTop:'14px',background:'#1a1830',border:'1px solid #2a2840',padding:'6px 12px',borderRadius:'20px',fontSize:'10px',opacity:.7}}>{tab==='vector'?'SVG • EPS • PDF • AI export':'Instant preview • Background removal included'}</div>
          <div style={{marginTop:'16px',background:'#A020F0',color:'#fff',padding:'10px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:600}}>Browse Files</div>
          {preview && <img src={preview} alt="preview" style={{width:'90px',borderRadius:'8px',marginTop:'12px',border:'1px solid #2a2840'}}/>}
        </div>

        <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'18px',padding:'12px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'11px',opacity:.5,padding:'6px'}}><span>3D Viewer Preview • PBR 4K • Wireframe</span><span>↻ ⛶</span></div>
          <div style={{background:'radial-gradient(ellipse at center,#2a1a4a,#0f0e1a)',borderRadius:'12px',height:'230px',marginTop:'8px',display:'grid',placeItems:'center',position:'relative',overflow:'hidden'}}>
            {done && preview? <img src={preview} alt="3d" style={{height:'150px',borderRadius:'8px'}}/> : <div style={{fontSize:'64px'}}>👟</div>}
            <div style={{position:'absolute',bottom:'10px',left:'10px',background:'rgba(0,0,0,0.6)',padding:'5px 10px',borderRadius:'6px',fontSize:'10px'}}>Model: Sneaker_v01.glb • 30K • Watertight ✓</div>
          </div>
          {/* NEW: 7 FORMATS LIKE MESHY - SAME COLORS */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'6px',marginTop:'10px'}}>
            {['GLB','FBX','OBJ','STL','3MF','USDZ','BLEND'].map(f=>(
              <button key={f} style={{background:'#1a1830',border:'1px solid #2a2840',padding:'8px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'10px',fontWeight:600}}>{f}</button>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'8px'}}>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'10px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'12px'}}>Remesh</button>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'10px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'12px'}}>Rig & Animate</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'8px'}}>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'10px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'12px'}}>Download GLB</button>
            <button style={{background:'#A020F0',padding:'10px',borderRadius:'8px',color:'#fff',border:'none',cursor:'pointer',fontSize:'12px',fontWeight:700}}>Export SVG</button>
          </div>
          <div style={{marginTop:'8px',fontSize:'9px',opacity:.4,textAlign:'center'}}>PBR: BaseColor • Normal • Roughness • Metallic • AO • Print-Ready 97%</div>
        </div>
      </div>

      <div style={{padding:'24px 36px 50px',maxWidth:'1400px',margin:'0 auto',borderTop:'1px solid #161426'}}>
        <h2 style={{textAlign:'center',fontSize:'26px',fontWeight:800,margin:'12px 0 6px'}}>Simple, transparent pricing — Credits like Meshy</h2>
        <p style={{textAlign:'center',opacity:.5,fontSize:'12px',marginBottom:'8px'}}>Text to 3D = 20 credits • Image to 3D = 20 • Texture = 5 • Rig = 3 • Vector = 1 • Template = 5 • Credits reset monthly</p>
        <p style={{textAlign:'center',opacity:.5,fontSize:'13px',marginBottom:'24px'}}>Start free. Upgrade when you need more.</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'18px'}}>
          {[
            {t:'Free',p:'₹0',c:'100 credits • ~5 models',d:'For individuals trying it out',f:['10 downloads/mo','All 7 formats: GLB FBX OBJ STL 3MF USDZ BLEND','PBR 4K preview','Vector 50 exports','CC BY license'],btn:'Get Started Free',pop:false},
            {t:'Pro',p:'₹999',c:'1000 credits • ~50 models',d:'For creators & small teams',f:['Unlimited downloads','Private commercial license','HD & 4K + Remesh + Rig & Animate 500','Vector unlimited SVG/EPS/PDF/AI','Template Studio 100 banners (Insta, YT, Shopify)','API access + 60% faster + 4 retries'],btn:'Start Pro Trial',pop:true},
            {t:'Business',p:'₹2499',c:'4000 credits • ~200 models',d:'For teams & agencies',f:['10 concurrent tasks','Team workspaces (5 seats)','Template unlimited any size','Custom vector styles','Razorpay GST invoice','Priority support'],btn:'Contact Sales',pop:false},
          ].map(c=>(
            <div key={c.t} style={{background:'#13111F',border:c.pop?'1.5px solid #A020F0':'1px solid #201e33',borderRadius:'16px',padding:'22px',position:'relative'}}>
              {c.pop && <div style={{position:'absolute',top:'-11px',left:'50%',transform:'translateX(-50%)',background:'#A020F0',padding:'3px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:700}}>☆ Most Popular</div>}
              <div style={{textAlign:'center',fontSize:'13px',opacity:.7}}>{c.t} • {c.c}</div>
              <div style={{textAlign:'center',fontSize:'34px',fontWeight:800,marginTop:'8px'}}>{c.p}<span style={{fontSize:'13px',opacity:.5,fontWeight:400}}> /mo</span></div>
              <div style={{textAlign:'center',fontSize:'11px',opacity:.5,marginTop:'4px'}}>{c.d}</div>
              <div style={{marginTop:'16px'}}>{c.f.map(fe=><div key={fe} style={{fontSize:'12px',margin:'7px 0',opacity:.8}}>✓ {fe}</div>)}</div>
              <button style={{marginTop:'20px',width:'100%',background:c.pop?'#A020F0':'transparent',border:c.pop?'none':'1px solid #2a2840',padding:'11px',borderRadius:'10px',color:'#fff',cursor:'pointer'}}>{c.btn}</button>
            </div>
          ))}
        </div>
        <p style={{textAlign:'center',fontSize:'10px',opacity:.3,marginTop:'16px'}}>Why Pinna3d over Meshy? Same 7 formats + PBR + Remesh + Rig + Print Ready + EXTRA Vector (Meshy no) + EXTRA Template Studio (Meshy no) + Cheaper ₹999 vs $20</p>
      </div>
    </div>
  )
}
