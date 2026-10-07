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
    <div style={{background:'#0B0A14',color:'#fff',fontFamily:'Inter, system-ui, sans-serif',minHeight:'100vh'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 40px',borderBottom:'1px solid #1e1c32',background:'#0B0A14',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <img src="/logo.png" alt="Pinna3d.com" style={{height:'100px',width:'auto',objectFit:'contain'}} />
        </div>
        <div style={{display:'flex',gap:'24px',alignItems:'center',fontSize:'15px',fontWeight:500}}>
          <span style={{opacity:.6}}>Features</span>
          <a href="/image-to-vector" style={{background:'#1a1830',border:'1px solid #A020F0',padding:'7px 14px',borderRadius:'20px',color:'#A020F0',textDecoration:'none',fontSize:'13px',fontWeight:600}}>Image to Vector ★ NEW</a>
          <span style={{color:'#A020F0',fontWeight:600}}>Pricing</span>
          <span style={{opacity:.6}}>Docs</span>
          <button style={{background:'#2a2840',padding:'10px 18px',borderRadius:'8px',border:'none',color:'#fff',cursor:'pointer',fontSize:'14px',fontWeight:500}}>Sign In</button>
          <button style={{background:'#A020F0',padding:'10px 20px',borderRadius:'8px',border:'none',color:'#fff',fontWeight:600,cursor:'pointer',fontSize:'14px'}}>Get Started</button>
        </div>
      </header>

      <div style={{display:'flex',gap:'10px',padding:'14px 40px',background:'#0f0e1a',borderBottom:'1px solid #1e1c32',overflowX:'auto'}}>
        <button onClick={()=>setTab("text3d")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="text3d"?'1px solid #A020F0':'1px solid #2a2840',background:tab==="text3d"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Text to 3D</button>
        <button onClick={()=>setTab("image3d")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="image3d"?'1px solid #A020F0':'1px solid #2a2840',background:tab==="image3d"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Image to 3D</button>
        <button onClick={()=>setTab("multi")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="multi"?'1px solid #A020F0':'1px solid #2a2840',background:tab==="multi"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Multi-Image to 3D</button>
        <button onClick={()=>setTab("texture")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="texture"?'1px solid #A020F0':'1px solid #2a2840',background:tab==="texture"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Text to Texture</button>
        <a href="/image-to-vector" style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:600,border:'1px solid #A020F0',background:'#A020F0',color:'#fff',textDecoration:'none',cursor:'pointer'}}>Image to Vector ★ NEW</a>
        <button onClick={()=>setTab("template")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="template"?'1px solid #A020F0':'1px solid #2a2840',background:tab==="template"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Template Studio ★ NEW</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'24px',padding:'40px',maxWidth:'1440px',margin:'0 auto'}}>
        <div>
          {tab==="image3d" && (
            <div>
              <h1 style={{fontSize:'48px',lineHeight:'1.08',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>Every Image to 3D<br/>in 60 Seconds</h1>
              <p style={{opacity:.6,marginTop:'16px',fontSize:'16px',lineHeight:'1.6',fontWeight:400}}>Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators worldwide.</p>
            </div>
          )}
          {tab==="text3d" && (
            <div>
              <h1 style={{fontSize:'48px',lineHeight:'1.08',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>Your Text Just Got<br/>a Promotion.</h1>
              <p style={{opacity:.6,marginTop:'16px',fontSize:'16px',lineHeight:'1.6'}}>Type prompt → 30s preview → 60s textured PBR 4K. Same as Meshy, plus Vector & Banner.</p>
              <textarea placeholder="A cute dragon wearing sneakers, PBR, ultra detailed..." style={{width:'100%',height:'100px',marginTop:'18px',background:'#13111F',border:'1px solid #2a2840',borderRadius:'12px',padding:'14px',color:'#fff',fontSize:'14px',outline:'none'}}></textarea>
              <button style={{marginTop:'14px',width:'100%',background:'#A020F0',padding:'13px',borderRadius:'10px',fontWeight:600,border:'none',color:'#fff',cursor:'pointer',fontSize:'14px'}}>Generate 3D — 20 Credits</button>
            </div>
          )}
          {tab==="multi" && <div><h1 style={{fontSize:'48px',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>Multi-Image to 3D</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px'}}>Upload 3-4 angles for perfect geometry.</p></div>}
          {tab==="texture" && <div><h1 style={{fontSize:'48px',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>Text to Texture</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px'}}>Retexture any mesh with PBR 4K.</p></div>}
          {tab==="template" && <div><h1 style={{fontSize:'48px',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>Prompt to Banner<br/>Any Size ★</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px'}}>Type prompt → Instagram, YouTube, Shopify Banner of any size.</p></div>}

          <div style={{display:'flex',gap:'12px',marginTop:'24px',flexWrap:'wrap'}}>
            <button style={{background:'#A020F0',padding:'14px 22px',borderRadius:'10px',fontWeight:600,border:'none',color:'#fff',cursor:'pointer',fontSize:'14px'}}>✦ Start Creating — Free</button>
            <button style={{border:'1px solid #2a2840',background:'transparent',padding:'14px 22px',borderRadius:'10px',color:'#fff',cursor:'pointer',fontSize:'14px',fontWeight:500}}>◉ Watch Demo</button>
            <a href="/image-to-vector" style={{border:'1px solid #A020F0',background:'#1a1830',padding:'14px 22px',borderRadius:'10px',color:'#A020F0',textDecoration:'none',cursor:'pointer',fontSize:'14px',fontWeight:600}}>↗ Image to Vector — 1 Click</a>
          </div>
          <div style={{display:'flex',gap:'8px',marginTop:'20px',flexWrap:'wrap',fontSize:'13px'}}>
            <span style={{background:'#13111F',border:'1px solid #201e33',padding:'6px 14px',borderRadius:'20px'}}>⚡ 60s Turnaround</span>
            <span style={{background:'#13111F',border:'1px solid #201e33',padding:'6px 14px',borderRadius:'20px'}}>• 100k+ assets generated</span>
            <span style={{background:'#13111F',border:'1px solid #201e33',padding:'6px 14px',borderRadius:'20px'}}>• No credit card required</span>
            <span style={{background:'#13111F',border:'1px solid #201e33',padding:'6px 14px',borderRadius:'20px'}}>♾️ 7 Formats</span>
          </div>
        </div>

        <div onClick={openPicker} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed #A020F0',borderRadius:'18px',background:'#13111F',padding:'24px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'60px',height:'60px',background:'#1e1b33',borderRadius:'12px',display:'grid',placeItems:'center',fontSize:'28px',color:'#A020F0',marginBottom:'14px'}}>☁️</div>
          <b style={{fontSize:'16px',fontWeight:600}}>Drag & drop your image here</b>
          <span style={{opacity:.5,fontSize:'13px',marginTop:'6px'}}>or browse files to upload</span>
          <span style={{opacity:.35,fontSize:'11px',marginTop:'18px'}}>Supports PNG, JPG, WEBP • Max 20MB</span>
          <div style={{marginTop:'16px',background:'#A020F0',color:'#fff',padding:'11px 22px',borderRadius:'8px',fontSize:'13px',fontWeight:600}}>Browse Files</div>
          {preview && <img src={preview} alt="preview" style={{width:'100px',borderRadius:'8px',marginTop:'12px',border:'1px solid #2a2840'}}/>}
        </div>

        <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'18px',padding:'14px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',opacity:.5,padding:'6px'}}><span>3D Viewer Preview</span><span>↻ ⛶</span></div>
          <div style={{background:'radial-gradient(ellipse at center,#2a1a4a,#0f0e1a)',borderRadius:'12px',height:'240px',marginTop:'8px',display:'grid',placeItems:'center',position:'relative',overflow:'hidden'}}>
            {done && preview? <img src={preview} alt="3d" style={{height:'160px',borderRadius:'8px'}}/> : <div style={{fontSize:'68px'}}>👟</div>}
            <div style={{position:'absolute',bottom:'10px',left:'10px',background:'rgba(0,0,0,0.6)',padding:'6px 10px',borderRadius:'6px',fontSize:'11px'}}>Model: Sneaker_v01.glb</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'6px',marginTop:'12px'}}>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'9px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'11px',fontWeight:500}}>GLB</button>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'9px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'11px',fontWeight:500}}>FBX</button>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'9px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'11px',fontWeight:500}}>OBJ</button>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'9px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'11px',fontWeight:500}}>STL</button>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'9px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'11px',fontWeight:500}}>3MF</button>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'9px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'11px',fontWeight:500}}>USDZ</button>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'9px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'11px',fontWeight:500}}>BLEND</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'11px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'13px',fontWeight:500}}>Remesh</button>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'11px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'13px',fontWeight:500}}>Rig & Animate</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'8px'}}>
            <button style={{background:'#1a1830',border:'1px solid #2a2840',padding:'11px',borderRadius:'8px',color:'#fff',cursor:'pointer',fontSize:'13px',fontWeight:500}}>Download GLB</button>
            <button style={{background:'#A020F0',padding:'11px',borderRadius:'8px',color:'#fff',border:'none',cursor:'pointer',fontSize:'13px',fontWeight:600}}>Export SVG</button>
          </div>
        </div>
      </div>

      <div style={{padding:'28px 40px 60px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid #161426'}}>
        <h2 style={{textAlign:'center',fontSize:'32px',fontWeight:600,letterSpacing:'-0.015em',margin:'12px 0 6px'}}>Simple, transparent pricing</h2>
        <p style={{textAlign:'center',opacity:.5,fontSize:'15px',marginBottom:'28px'}}>Start free. Upgrade when you need more.</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'20px'}}>
          <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'16px',padding:'24px'}}>
            <div style={{textAlign:'center',fontSize:'13px',opacity:.7,fontWeight:500}}>Free • 100 credits • ~5 models</div>
            <div style={{textAlign:'center',fontSize:'34px',fontWeight:600,marginTop:'10px',letterSpacing:'-0.02em'}}>₹0<span style={{fontSize:'14px',opacity:.5,fontWeight:400}}> /mo</span></div>
            <div style={{marginTop:'18px',fontSize:'14px',opacity:.8}}><div>✓ 5 exports per month</div><div style={{marginTop:'8px'}}>✓ 3D preview only</div><div style={{marginTop:'8px'}}>✓ Standard resolution</div><div style={{marginTop:'8px'}}>✓ Community support</div></div>
            <button style={{marginTop:'22px',width:'100%',background:'transparent',border:'1px solid #2a2840',padding:'12px',borderRadius:'10px',color:'#fff',cursor:'pointer',fontSize:'14px',fontWeight:600}}>Get Started Free</button>
          </div>
          <div style={{background:'#13111F',border:'1.5px solid #A020F0',borderRadius:'16px',padding:'24px',position:'relative'}}>
            <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#A020F0',padding:'4px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:600}}>☆ Most Popular</div>
            <div style={{textAlign:'center',fontSize:'13px',opacity:.7,fontWeight:500}}>Pro • 1000 credits • ~50 models</div>
            <div style={{textAlign:'center',fontSize:'34px',fontWeight:600,marginTop:'10px',letterSpacing:'-0.02em'}}>₹999<span style={{fontSize:'14px',opacity:.5,fontWeight:400}}> /mo</span></div>
            <div style={{marginTop:'18px',fontSize:'14px',opacity:.8}}><div>✓ 200 exports per month</div><div style={{marginTop:'8px'}}>✓ Full 3D + Vector export</div><div style={{marginTop:'8px'}}>✓ HD & 4K exports</div><div style={{marginTop:'8px'}}>✓ Priority ~60s</div><div style={{marginTop:'8px'}}>✓ Commercial license</div></div>
            <button style={{marginTop:'22px',width:'100%',background:'#A020F0',border:'none',padding:'12px',borderRadius:'10px',color:'#fff',cursor:'pointer',fontSize:'14px',fontWeight:600}}>Start Pro Trial</button>
          </div>
          <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'16px',padding:'24px'}}>
            <div style={{textAlign:'center',fontSize:'13px',opacity:.7,fontWeight:500}}>Business • 4000 credits • ~200 models</div>
            <div style={{textAlign:'center',fontSize:'34px',fontWeight:600,marginTop:'10px',letterSpacing:'-0.02em'}}>₹2499<span style={{fontSize:'14px',opacity:.5,fontWeight:400}}> /mo</span></div>
            <div style={{marginTop:'18px',fontSize:'14px',opacity:.8}}><div>✓ 1000 exports per month</div><div style={{marginTop:'8px'}}>✓ API access + bulk</div><div style={{marginTop:'8px'}}>✓ Team workspaces (5 seats)</div><div style={{marginTop:'8px'}}>✓ Custom vector styles</div><div style={{marginTop:'8px'}}>✓ Priority support</div></div>
            <button style={{marginTop:'22px',width:'100%',background:'transparent',border:'1px solid #2a2840',padding:'12px',borderRadius:'10px',color:'#fff',cursor:'pointer',fontSize:'14px',fontWeight:600}}>Contact Sales</button>
          </div>
        </div>
      </div>
    </div>
  )
}
