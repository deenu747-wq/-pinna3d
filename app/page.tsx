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
    setTimeout(()=>setDone(true),800)
  }
  const openPicker = () => fileRef.current?.click()

  return (
    <div style={{background:'#0B0A14',color:'#fff',fontFamily:'Inter,system-ui,sans-serif',minHeight:'100vh'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 36px',borderBottom:'1px solid #1e1c32',background:'#0B0A14',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <img src="/logo.png" alt="Pinna3d" style={{height:'44px',width:'auto'}} />
          <span style={{fontWeight:800,letterSpacing:'-0.5px'}}>Pinna3d</span>
          <span style={{fontSize:'10px',background:'#A020F0',padding:'2px 8px',borderRadius:'20px'}}>MESHY+</span>
        </div>
        <div style={{display:'flex',gap:'10px',alignItems:'center',fontSize:'12px'}}>
          <span style={{opacity:.5}}>Explore</span><span style={{opacity:.5}}>API</span>
          <span style={{color:'#A020F0',fontWeight:700}}>Pricing</span>
          <button style={{background:'#2a2840',padding:'8px 16px',borderRadius:'8px',border:'none',color:'#fff',cursor:'pointer'}}>Sign In</button>
          <button style={{background:'#fff',padding:'8px 18px',borderRadius:'20px',border:'none',color:'#000',fontWeight:700,cursor:'pointer'}}>Start Free — 100 credits</button>
        </div>
      </header>

      {/* TABS LIKE MESHY */}
      <div style={{display:'flex',gap:'8px',padding:'14px 36px',background:'#0f0e1a',borderBottom:'1px solid #1a1830'}}>
        {[
          {id:'text3d',l:'Text to 3D'},
          {id:'image3d',l:'Image to 3D'},
          {id:'multi',l:'Multi-Image to 3D'},
          {id:'texture',l:'Text to Texture'},
          {id:'vector',l:'Image to Vector ★ NEW'},
          {id:'template',l:'Template Studio ★ NEW'},
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'7px 14px',borderRadius:'20px',fontSize:'11px',border:'1px solid #2a2840',background:tab===t.id?'#fff':'transparent',color:tab===t.id?'#000':'#fff',cursor:'pointer',fontWeight:tab===t.id?700:400}}>{t.l}</button>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'20px',padding:'28px 36px',maxWidth:'1440px',margin:'0 auto'}}>
        {/* LEFT - HERO + CONTROLS */}
        <div>
          {tab==='text3d' && <>
            <h1 style={{fontSize:'38px',lineHeight:'1.05',fontWeight:800,margin:0}}>Your Text Just Got<br/>a Promotion.</h1>
            <p style={{opacity:.6,marginTop:'12px',fontSize:'13px',lineHeight:'1.6'}}>Describe → 30s preview → 60s textured PBR 4K model. Same as Meshy, cheaper.</p>
            <textarea placeholder="A cute dragon wearing sneakers, PBR, ultra detailed..." style={{width:'100%',height:'110px',marginTop:'16px',background:'#13111F',border:'1px solid #2a2840',borderRadius:'12px',padding:'12px',color:'#fff',fontSize:'12px',outline:'none'}}></textarea>
            <div style={{display:'flex',gap:'8px',marginTop:'10px'}}>
              <select style={{flex:1,background:'#13111F',border:'1px solid #2a2840',borderRadius:'8px',padding:'8px',color:'#fff',fontSize:'11px'}}><option>30K Polys (Recommended)</option><option>10K</option><option>100K</option></select>
              <select style={{flex:1,background:'#13111F',border:'1px solid #2a2840',borderRadius:'8px',padding:'8px',color:'#fff',fontSize:'11px'}}><option>Realistic</option><option>Cartoon</option><option>Low Poly</option></select>
            </div>
            <button style={{width:'100%',marginTop:'14px',background:'#A020F0',padding:'12px',borderRadius:'10px',fontWeight:700,border:'none',color:'#fff',cursor:'pointer'}}>Generate 3D — 20 Credits ✦</button>
          </>}

          {tab==='image3d' && <>
            <h1 style={{fontSize:'38px',lineHeight:'1.05',fontWeight:800,margin:0}}>Flat to Fat.<br/>Image to Empire.</h1>
            <p style={{opacity:.6,marginTop:'12px',fontSize:'13px'}}>Upload flat. Download 7 formats + Vector. Sell for 10x. No Blender.</p>
            <div style={{marginTop:'16px',background:'#1a1630',border:'1px solid #A020F0',borderRadius:'12px',padding:'12px',fontSize:'11px'}}><b style={{color:'#A020F0'}}>MESHY FEATURES INCLUDED:</b> PBR 4K • Remesh • Auto-Rig • Print-Ready 97% • 7 Formats</div>
          </>}

          {tab==='vector' && <>
            <h1 style={{fontSize:'36px',fontWeight:800,margin:0}}>JPG to SVG<br/>in 2 Seconds.</h1>
            <p style={{opacity:.6,marginTop:'12px',fontSize:'13px'}}>Extra power over Meshy — browser instant, unlimited exports.</p>
            <div style={{marginTop:'16px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>{['SVG','EPS','PDF','AI'].map(f=><div key={f} style={{background:'#13111F',border:'1px solid #2a2840',padding:'12px',borderRadius:'10px',textAlign:'center',fontSize:'11px'}}>{f} <br/><span style={{opacity:.4}}>infinite scale</span></div>)}</div>
          </>}

          {tab==='template' && <>
            <h1 style={{fontSize:'36px',fontWeight:800,margin:0}}>Prompt to Banner.<br/>Any Size.</h1>
            <p style={{opacity:.6,marginTop:'12px',fontSize:'13px'}}>Shopify, Instagram, YouTube — one prompt, any dimension.</p>
            <textarea placeholder="Diwali Sale 50% OFF banner, neon, bold..." style={{width:'100%',height:'80px',marginTop:'16px',background:'#13111F',border:'1px solid #2a2840',borderRadius:'12px',padding:'12px',color:'#fff',fontSize:'12px'}}></textarea>
            <div style={{display:'flex',gap:'6px',marginTop:'10px',flexWrap:'wrap'}}>{['Insta 1080x1080','Story 1080x1920','YT 1280x720','Shopify 1920x600','Logo 1024','PPT 16:9'].map(s=><span key={s} style={{fontSize:'10px',background:'#1a1830',border:'1px solid #2a2840',padding:'5px 10px',borderRadius:'20px'}}>{s}</span>)}</div>
          </>}

          {tab==='multi' && <div style={{padding:'40px 0',fontSize:'13px',opacity:.5}}>Multi-Image to 3D — upload 3-4 angles for best geometry. Same as Meshy multi-image feature.</div>}
          {tab==='texture' && <div style={{padding:'40px 0',fontSize:'13px',opacity:.5}}>Text to Texture — retexture any mesh with AI. PBR materials.</div>}

          <div style={{display:'flex',gap:'12px',marginTop:'20px'}}>
            <button style={{background:'#A020F0',padding:'12px 20px',borderRadius:'10px',fontWeight:700,border:'none',color:'#fff',cursor:'pointer',fontSize:'12px'}}>✦ Start Creating — Free</button>
            <button style={{border:'1px solid #2a2840',background:'transparent',padding:'12px 20px',borderRadius:'10px',color:'#fff',cursor:'pointer',fontSize:'12px'}}>◉ Watch Demo</button>
          </div>
          <div style={{display:'flex',gap:'8px',marginTop:'16px',flexWrap:'wrap',fontSize:'10px'}}>
            {['⚡ 60s Magic','💸 10x Sellable','🎨 No Skills Needed','♾️ 7 Formats + Vector'].map(t=>(
              <span key={t} style={{background:'#13111F',border:'1px solid #201e33',padding:'5px 12px',borderRadius:'20px'}}>{t}</span>
            ))}
          </div>
        </div>

        {/* MIDDLE - UPLOAD - CLICKABLE AS YOU WANTED */}
        <div onClick={openPicker} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed #A020F0',borderRadius:'18px',background:'#13111F',padding:'20px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer',minHeight:'340px'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'56px',height:'56px',background:'#1e1b33',borderRadius:'12px',display:'grid',placeItems:'center',fontSize:'26px',color:'#A020F0',marginBottom:'14px'}}>☁️</div>
          <b style={{fontSize:'14px'}}>Drag & drop your image here</b>
          <span style={{opacity:.5,fontSize:'11px',marginTop:'6px'}}>or browse files to upload</span>
          <span style={{opacity:.35,fontSize:'10px',marginTop:'14px'}}>PNG, JPG, WEBP • Max 20MB • Auto BG removal</span>
          <div style={{marginTop:'14px',background:'#A020F0',color:'#fff',padding:'10px 20px',borderRadius:'8px',fontSize:'12px',fontWeight:600}}>Browse Files</div>
          {preview && <img src={preview} alt="preview" style={{width:'90px',borderRadius:'8px',marginTop:'12px',border:'1px solid #2a2840'}}/>}
          {done && <span style={{marginTop:'8px',fontSize:'10px',color:'#00ff88'}}>✓ Ready — 20 credits will be used</span>}
        </div>

        {/* RIGHT - VIEWER + 7 FORMATS LIKE MESHY */}
        <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'18px',padding:'12px',display:'flex',flexDirection:'column'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'10px',opacity:.5,padding:'6px'}}><span>Viewer • PBR • Wireframe • 4K</span><span>↻ ⛶</span></div>
          <div style={{background:'radial-gradient(ellipse at center,#2a1a4a,#0f0e1a)',borderRadius:'12px',height:'220px',marginTop:'8px',display:'grid',placeItems:'center',position:'relative',overflow:'hidden'}}>
            {done && preview? <img src={preview} alt="3d" style={{height:'140px',borderRadius:'8px'}}/> : <div style={{fontSize:'64px'}}>👟</div>}
            <div style={{position:'absolute',bottom:'10px',left:'10px',background:'rgba(0,0,0,0.6)',padding:'5px 10px',borderRadius:'6px',fontSize:'9px'}}>Model: Sneaker_v01.glb • 30K polys • Watertight ✓</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'6px',marginTop:'10px'}}>
            {['GLB','FBX','OBJ','STL','3MF','USDZ','BLEND'].map(f=><button key={f} style={{background:'#1a1830',border:'1px solid #2a2840',padding:'8px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'10px'}}>{f}</button>)}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'8px'}}>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'10px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'11px'}}>Remesh</button>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'10px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'11px'}}>Rig & Animate</button>
          </div>
          <button style={{marginTop:'8px',background:'#A020F0',padding:'10px',borderRadius:'8px',color:'#fff',border:'none',cursor:'pointer',fontSize:'11px',fontWeight:700}}>Download All 7 + Vector</button>
          <div style={{marginTop:'10px',background:'#0f0e1a',borderRadius:'8px',padding:'8px',fontSize:'9px',opacity:.5}}>PBR Textures: BaseColor • Normal • Roughness • Metallic • AO — same as Meshy</div>
        </div>
      </div>

      {/* PRICING - CREDIT SYSTEM LIKE MESHY */}
      <div style={{padding:'24px 36px 50px',maxWidth:'1400px',margin:'0 auto',borderTop:'1px solid #161426'}}>
        <h2 style={{textAlign:'center',fontSize:'26px',fontWeight:800,margin:'12px 0 6px'}}>Credits, not limits — like Meshy</h2>
        <p style={{textAlign:'center',opacity:.5,fontSize:'12px',marginBottom:'24px'}}>Text to 3D = 20 credits • Image to 3D = 20 • Texture = 5 • Rig = 3 • Vector = 1 • Template = 5</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'18px'}}>
          {[
            {t:'FREE',p:'₹0',c:'100 credits',d:'~5 models',f:['10 downloads/mo','All 7 formats: GLB FBX OBJ STL 3MF USDZ BLEND','PBR 4K preview','Vector 50 exports','CC BY license'],btn:'Get Started Free',pop:false},
            {t:'PRO',p:'₹999',c:'1000 credits',d:'~50 models',f:['Unlimited downloads','Private commercial license','HD & 4K + Remesh + Rig & Animate','Vector unlimited SVG/EPS/PDF/AI','Template Studio 100 banners','API access','60% faster + 4 retries'],btn:'Go Pro — Most Popular',pop:true},
            {t:'BUSINESS',p:'₹2499',c:'4000 credits',d:'~200 models',f:['10 concurrent tasks','Team 5 seats','All Pro features','Template unlimited','Razorpay GST invoice','Priority support'],btn:'Contact Sales',pop:false},
          ].map(c=>(
            <div key={c.t} style={{background:'#13111F',border:c.pop?'1.5px solid #A020F0':'1px solid #201e33',borderRadius:'16px',padding:'22px',position:'relative'}}>
              {c.pop && <div style={{position:'absolute',top:'-11px',left:'50%',transform:'translateX(-50%)',background:'#A020F0',padding:'3px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:700}}>☆ Most Popular</div>}
              <div style={{textAlign:'center',fontSize:'11px',opacity:.7}}>{c.t} • {c.c}</div>
              <div style={{textAlign:'center',fontSize:'32px',fontWeight:800,marginTop:'8px'}}>{c.p}<span style={{fontSize:'11px',opacity:.5,fontWeight:400}}> /mo • {c.d}</span></div>
              <div style={{marginTop:'16px'}}>{c.f.map(fe=><div key={fe} style={{fontSize:'11px',margin:'6px 0',opacity:.8}}>✓ {fe}</div>)}</div>
              <button style={{marginTop:'20px',width:'100%',background:c.pop?'#A020F0':'transparent',border:c.pop?'none':'1px solid #2a2840',padding:'11px',borderRadius:'10px',color:'#fff',cursor:'pointer',fontSize:'12px',fontWeight:600}}>{c.btn}</button>
            </div>
          ))}
        </div>
        <p style={{textAlign:'center',fontSize:'10px',opacity:.3,marginTop:'16px'}}>Why Pinna3d over Meshy? Same 7 formats + PBR + Rig + Remesh + Print Ready 97% + EXTRA Vector + EXTRA Template Studio + Cheaper ₹999 vs $20</p>
      </div>
    </div>
  )
}
