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
      {/* HEADER - ORIGINAL AS IT WAS */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 40px',borderBottom:'1px solid #1e1c32',background:'#0B0A14',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <img src="/logo.png" alt="Pinna3d.com" style={{height:'100px',width:'auto',objectFit:'contain'}} />
        </div>
        <div style={{display:'flex',gap:'24px',alignItems:'center',fontSize:'15px',fontWeight:500}}>
          <span style={{opacity:.6}}>Features</span>
          <span style={{color:'#A020F0',fontWeight:600}}>Pricing</span>
          <span style={{opacity:.6}}>Docs</span>
          <span style={{opacity:.6}}>Blog</span>
          <button style={{background:'#2a2840',padding:'10px 18px',borderRadius:'8px',border:'none',color:'#fff',cursor:'pointer',fontSize:'14px',fontWeight:500}}>Sign In</button>
          <button style={{background:'#A020F0',padding:'10px 20px',borderRadius:'8px',border:'none',color:'#fff',fontWeight:600,cursor:'pointer',fontSize:'14px'}}>Get Started</button>
        </div>
      </header>

      <div style={{display:'flex',gap:'10px',padding:'14px 40px',background:'#0f0e1a',borderBottom:'1px solid #1e1c32',overflowX:'auto'}}>
        <button onClick={()=>setTab("image3d")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="image3d"?'1px solid #A020F0':'1px solid #2a2840',background:tab==="image3d"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Image to 3D</button>
        <button onClick={()=>setTab("multi")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="multi"?'1px solid #A020F0':'1px solid #2a2840',background:tab==="multi"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Multi-Image to 3D</button>
        <button onClick={()=>setTab("text3d")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="text3d"?'1px solid #A020F0':'1px solid #2a2840',background:tab==="text3d"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Text to 3D</button>
        <button onClick={()=>setTab("texture")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="texture"?'1px solid #A020F0':'1px solid #2a2840',background:tab==="texture"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Text to Texture</button>
        <button onClick={()=>setTab("template")} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="template"?'1px solid #A020F0':'1px solid #2a2840',background:tab==="template"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Template Studio ★ NEW</button>
        <a href="/image-to-vector" style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:600,border:'1px solid #A020F0',background:'#13111F',color:'#A020F0',textDecoration:'none',cursor:'pointer'}}>Image to Vector ★ NEW</a>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'24px',padding:'40px',maxWidth:'1440px',margin:'0 auto'}}>
        <div>
          {tab==="image3d" && (<div><h1 style={{fontSize:'48px',lineHeight:'1.08',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>Every Image to 3D<br/>in 60 Seconds</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px',lineHeight:'1.6',fontWeight:400}}>Transform photos into production-ready 3D models instantly. Built for designers, e-commerce, and creators worldwide.</p></div>)}
          {tab==="multi" && <div><h1 style={{fontSize:'48px',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>Multi-Image to 3D</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px'}}>Upload 3-4 angles for perfect geometry.</p></div>}
          {tab==="text3d" && (<div><h1 style={{fontSize:'48px',lineHeight:'1.08',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>Your Text Just Got<br/>a Promotion.</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px',lineHeight:'1.6'}}>Type prompt → 30s preview → 60s textured PBR 4K.</p><textarea placeholder="A cute dragon wearing sneakers, PBR, ultra detailed..." style={{width:'100%',height:'100px',marginTop:'18px',background:'#13111F',border:'1px solid #2a2840',borderRadius:'12px',padding:'14px',color:'#fff',fontSize:'14px',outline:'none'}}></textarea><button style={{marginTop:'14px',width:'100%',background:'#A020F0',padding:'13px',borderRadius:'10px',fontWeight:600,border:'none',color:'#fff',cursor:'pointer',fontSize:'14px'}}>Generate 3D — 20 Credits</button></div>)}
          {tab==="texture" && <div><h1 style={{fontSize:'48px',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>Text to Texture</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px'}}>Retexture any mesh with PBR 4K.</p></div>}
          {tab==="template" && <div><h1 style={{fontSize:'48px',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>Prompt to Banner<br/>Any Size ★</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px'}}>Type prompt → Instagram, YouTube, Shopify Banner of any size.</p></div>}
          <div style={{display:'flex',gap:'12px',marginTop:'24px'}}>
            <button style={{background:'#A020F0',padding:'14px 22px',borderRadius:'10px',fontWeight:600,border:'none',color:'#fff',cursor:'pointer',fontSize:'14px'}}>✦ Start Creating — Free</button>
            <button style={{border:'1px solid #2a2840',background:'transparent',padding:'14px 22px',borderRadius:'10px',color:'#fff',cursor:'pointer',fontSize:'14px',fontWeight:500}}>◉ Watch Demo</button>
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

      {/* 4 BOXES AFTER FIRST SECTION - BEFORE PRICING */}
      <div style={{padding:'10px 40px 30px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid #161426'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'18px'}}>
          <div style={{background:'linear-gradient(180deg,#1a1830 0%,#13111F 100%)',border:'1px solid #2a2840',borderRadius:'16px',padding:'20px'}}>
            <div style={{width:'44px',height:'44px',background:'#A020F0',borderRadius:'10px',display:'grid',placeItems:'center',fontSize:'22px'}}>📸</div>
            <h3 style={{fontSize:'18px',fontWeight:700,margin:'14px 0 6px'}}>Photo Studio</h3>
            <p style={{fontSize:'13px',opacity:.6,lineHeight:'1.5',margin:0}}>PhotoRoom clone – Pro 2D editing for e-commerce. Clean product photos in seconds.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'6px',fontSize:'12px',opacity:.8}}><span>✓ Remove Background</span><span>✓ Remove Object</span><span>✓ AI Backgrounds & Shadows</span><span>✓ Upscaler 4x + Banner Maker</span></div>
            <div style={{marginTop:'12px',fontSize:'10px',opacity:.4,borderTop:'1px solid #2a2840',paddingTop:'8px'}}>Exports: JPG, PNG, GIF, EPS, SVG, PSD, CDR, AI</div>
            <button style={{marginTop:'14px',width:'100%',background:'#2a2840',border:'none',padding:'10px',borderRadius:'8px',color:'#fff',fontWeight:600,fontSize:'12px'}}>Open Photo Studio →</button>
          </div>
          <div style={{background:'linear-gradient(180deg,#1a1830 0%,#13111F 100%)',border:'1px solid #A020F0',borderRadius:'16px',padding:'20px',position:'relative'}}>
            <div style={{position:'absolute',top:'12px',right:'12px',background:'#A020F0',padding:'3px 8px',borderRadius:'12px',fontSize:'9px',fontWeight:700}}>NEW USP</div>
            <div style={{width:'44px',height:'44px',background:'#13111F',border:'1px solid #A020F0',borderRadius:'10px',display:'grid',placeItems:'center',fontSize:'22px'}}>✒️</div>
            <h3 style={{fontSize:'18px',fontWeight:700,margin:'14px 0 6px'}}>Vector Studio</h3>
            <p style={{fontSize:'13px',opacity:.6,lineHeight:'1.5',margin:0}}>Your USP – Convert any image to infinite scalable vector for print & logos.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'6px',fontSize:'12px',opacity:.8}}><span>✓ Image to Vector – JPG to SVG</span><span>✓ Photo to Line Art</span><span>✓ Logo Vectorizer</span><span>✓ Batch 100 at once</span></div>
            <div style={{marginTop:'12px',fontSize:'10px',opacity:.4,borderTop:'1px solid #2a2840',paddingTop:'8px'}}>Exports: JPG, PNG, GIF, EPS, SVG, PSD, CDR, AI</div>
            <button style={{marginTop:'14px',width:'100%',background:'#A020F0',border:'none',padding:'10px',borderRadius:'8px',color:'#fff',fontWeight:700,fontSize:'12px'}}>Open Vector Studio →</button>
          </div>
          <div style={{background:'linear-gradient(180deg,#1a1830 0%,#13111F 100%)',border:'1px solid #2a2840',borderRadius:'16px',padding:'20px'}}>
            <div style={{width:'44px',height:'44px',background:'#2a2840',borderRadius:'10px',display:'grid',placeItems:'center',fontSize:'22px'}}>🧊</div>
            <h3 style={{fontSize:'18px',fontWeight:700,margin:'14px 0 6px'}}>3D Studio</h3>
            <p style={{fontSize:'13px',opacity:.6,lineHeight:'1.5',margin:0}}>Meshy clone – Photos & text to production 3D models for games & AR/VR.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'6px',fontSize:'12px',opacity:.8}}><span>✓ Image to 3D</span><span>✓ Multi-Image to 3D</span><span>✓ Text to 3D & Texture</span><span>✓ Remesh & Rig & Animate</span></div>
            <div style={{marginTop:'12px',fontSize:'10px',opacity:.4,borderTop:'1px solid #2a2840',paddingTop:'8px'}}>Exports: GLB, OBJ, FBX, STL, USDZ</div>
            <button style={{marginTop:'14px',width:'100%',background:'#2a2840',border:'none',padding:'10px',borderRadius:'8px',color:'#fff',fontWeight:600,fontSize:'12px'}}>Open 3D Studio →</button>
          </div>
          <div style={{background:'linear-gradient(180deg,#24133f 0%,#13111F 100%)',border:'1px solid #3a2a6a',borderRadius:'16px',padding:'20px'}}>
            <div style={{width:'44px',height:'44px',background:'#A020F0',borderRadius:'10px',display:'grid',placeItems:'center',fontSize:'22px'}}>🎬</div>
            <h3 style={{fontSize:'18px',fontWeight:700,margin:'14px 0 6px'}}>Motion Studio</h3>
            <p style={{fontSize:'13px',opacity:.6,lineHeight:'1.5',margin:0}}>AI video maker – Text/image/script to viral videos, intros, ads & reels.</p>
            <div style={{marginTop:'14px',display:'grid',gap:'6px',fontSize:'12px',opacity:.8}}><span>✓ Text/Image/Script to Video</span><span>✓ Logo & Text Animation</span><span>✓ Reels, Promo, Ad Videos</span><span>✓ Stock, Music, LUTs</span></div>
            <div style={{marginTop:'12px',fontSize:'10px',opacity:.4,borderTop:'1px solid #2a2840',paddingTop:'8px'}}>Exports: MP4, MOV, GIF 9:16</div>
            <button style={{marginTop:'14px',width:'100%',background:'#A020F0',border:'none',padding:'10px',borderRadius:'8px',color:'#fff',fontWeight:700,fontSize:'12px'}}>Open Motion Studio →</button>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div style={{padding:'28px 40px 60px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid #161426'}}>
        <h2 style={{textAlign:'center',fontSize:'32px',fontWeight:600,letterSpacing:'-0.015em',margin:'12px 0 6px'}}>Simple, transparent pricing</h2>
        <p style={{textAlign:'center',opacity:.5,fontSize:'15px',marginBottom:'28px'}}>4 Yearly Plans • Photo + Vector + 3D + Motion</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'16px'}}>
          <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'16px',padding:'22px'}}><div style={{fontSize:'12px',opacity:.6}}>STARTER • Yearly</div><div style={{fontSize:'32px',fontWeight:700,marginTop:'8px'}}>₹999<span style={{fontSize:'12px',opacity:.5}}> /yr</span></div><div style={{fontSize:'11px',opacity:.5}}>₹83/mo • 1200 credits</div><div style={{marginTop:'16px',fontSize:'13px',display:'grid',gap:'8px',opacity:.85}}><div>✓ 60 exports</div><div>✓ Photo + Vector</div><div>✓ All 2D formats</div></div><button style={{marginTop:'20px',width:'100%',background:'transparent',border:'1px solid #2a2840',padding:'11px',borderRadius:'10px',color:'#fff',fontWeight:600}}>Start Yearly</button></div>
          <div style={{background:'#13111F',border:'1.5px solid #A020F0',borderRadius:'16px',padding:'22px',position:'relative'}}><div style={{position:'absolute',top:'-11px',left:'50%',transform:'translateX(-50%)',background:'#A020F0',padding:'3px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:700}}>Most Popular</div><div style={{fontSize:'12px',opacity:.6}}>CREATOR • Yearly</div><div style={{fontSize:'32px',fontWeight:700,marginTop:'8px'}}>₹2,999<span style={{fontSize:'12px',opacity:.5}}> /yr</span></div><div style={{fontSize:'11px',opacity:.5}}>₹249/mo • 5000 credits</div><div style={{marginTop:'16px',fontSize:'13px',display:'grid',gap:'8px',opacity:.85}}><div>✓ 300 exports</div><div>✓ Photo + Vector + 3D</div><div>✓ HD & 4K</div><div>✓ Batch 100x</div></div><button style={{marginTop:'20px',width:'100%',background:'#A020F0',border:'none',padding:'11px',borderRadius:'10px',color:'#fff',fontWeight:700}}>Go Creator</button></div>
          <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'16px',padding:'22px'}}><div style={{fontSize:'12px',opacity:.6}}>PRO • Yearly</div><div style={{fontSize:'32px',fontWeight:700,marginTop:'8px'}}>₹4,999<span style={{fontSize:'12px',opacity:.5}}> /yr</span></div><div style={{fontSize:'11px',opacity:.5}}>₹416/mo • 12000 + API</div><div style={{marginTop:'16px',fontSize:'13px',display:'grid',gap:'8px',opacity:.85}}><div>✓ 800 exports</div><div>✓ API + all formats</div><div>✓ Motion Studio</div></div><button style={{marginTop:'20px',width:'100%',background:'#2a2840',border:'none',padding:'11px',borderRadius:'10px',color:'#fff',fontWeight:600}}>Start Pro</button></div>
          <div style={{background:'#13111F',border:'1px solid #2a2840',borderRadius:'16px',padding:'22px'}}><div style={{fontSize:'12px',opacity:.6}}>STUDIO • Yearly</div><div style={{fontSize:'32px',fontWeight:700,marginTop:'8px'}}>₹7,999<span style={{fontSize:'12px',opacity:.5}}> /yr</span></div><div style={{fontSize:'11px',opacity:.5}}>₹666/mo • 30000 + Teams</div><div style={{marginTop:'16px',fontSize:'13px',display:'grid',gap:'8px',opacity:.85}}><div>✓ Unlimited</div><div>✓ 5 seats + Bulk API</div><div>✓ SLA + Webhooks</div></div><button style={{marginTop:'20px',width:'100%',background:'#fff',border:'none',padding:'11px',borderRadius:'10px',color:'#000',fontWeight:700}}>Contact Sales</button></div>
        </div>
      </div>
    </div>
  )
}
