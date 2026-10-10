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

  const price = (m:number)=>{
    if(billing==="monthly") return m
    return Math.round(m*0.8) // 20% off yearly
  }

  return (
    <div style={{
      background:'#08060F',
      color:'#fff',
      fontFamily:'Inter, system-ui, sans-serif',
      minHeight:'100vh',
      backgroundImage:`
        radial-gradient(900px 500px at 50% -5%, rgba(160,32,240,0.28), transparent 70%),
        radial-gradient(700px 400px at 90% 10%, rgba(120,40,255,0.18), transparent 60%),
        radial-gradient(600px 400px at 10% 25%, rgba(80,20,180,0.15), transparent 60%),
        radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.08) 100%, transparent),
        linear-gradient(180deg, rgba(160,32,240,0.06) 0%, transparent 40%)
      `
    }}>
      {/* HEADER - ORIGINAL AS IT WAS */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(8,6,15,0.8)',backdropFilter:'blur(20px)',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <img src="/logo.png" alt="Pinna3d.com" style={{height:'100px',width:'auto',objectFit:'contain'}} />
        </div>
        <div style={{display:'flex',gap:'24px',alignItems:'center',fontSize:'14px',fontWeight:500}}>
          <span style={{opacity:.6,cursor:'pointer'}}>Features</span>
          <span style={{color:'#A020F0',fontWeight:600,cursor:'pointer'}}>Pricing</span>
          <span style={{opacity:.6,cursor:'pointer'}}>Docs</span>
          <span style={{opacity:.6,cursor:'pointer'}}>Blog</span>
          <button style={{background:'rgba(255,255,255,0.08)',padding:'10px 18px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.12)',color:'#fff',cursor:'pointer',fontSize:'14px',fontWeight:500}}>Sign In</button>
          <button style={{background:'#A020F0',boxShadow:'0 0 20px rgba(160,32,240,0.4)',padding:'10px 20px',borderRadius:'10px',border:'none',color:'#fff',fontWeight:600,cursor:'pointer',fontSize:'14px'}}>Get Started</button>
        </div>
      </header>

      {/* FILTER TABS - KEPT BUT CLEANED */}
      <div style={{display:'flex',gap:'10px',padding:'14px 40px',background:'rgba(255,255,255,0.02)',borderBottom:'1px solid rgba(255,255,255,0.06)',overflowX:'auto'}}>
        <button onClick={()=>setTab("image3d")} style={{padding:'8px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="image3d"?'1px solid #A020F0':'1px solid rgba(255,255,255,0.1)',background:tab==="image3d"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Image to 3D</button>
        <button onClick={()=>setTab("multi")} style={{padding:'8px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="multi"?'1px solid #A020F0':'1px solid rgba(255,255,255,0.1)',background:tab==="multi"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Multi-Image to 3D</button>
        <button onClick={()=>setTab("text3d")} style={{padding:'8px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="text3d"?'1px solid #A020F0':'1px solid rgba(255,255,255,0.1)',background:tab==="text3d"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Text to 3D</button>
        <button onClick={()=>setTab("texture")} style={{padding:'8px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="texture"?'1px solid #A020F0':'1px solid rgba(255,255,255,0.1)',background:tab==="texture"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Text to Texture</button>
        <button onClick={()=>setTab("template")} style={{padding:'8px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab==="template"?'1px solid #A020F0':'1px solid rgba(255,255,255,0.1)',background:tab==="template"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>Template Studio ★ NEW</button>
        <a href="/image-to-vector" style={{padding:'8px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:600,border:'1px solid rgba(160,32,240,0.5)',background:'rgba(160,32,240,0.12)',color:'#A020F0',textDecoration:'none',cursor:'pointer'}}>Image to Vector ★ NEW</a>
      </div>

      {/* HERO - 3 COLS */}
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'24px',padding:'40px',maxWidth:'1440px',margin:'0 auto'}}>
        <div>
          {tab==="image3d" && (<div><h1 style={{fontSize:'52px',lineHeight:'1.05',fontWeight:700,letterSpacing:'-0.03em',margin:0}}>Every Image to 3D<br/><span style={{background:'linear-gradient(90deg,#A020F0,#FF6BDA)',WebkitBackgroundClip:'text',color:'transparent'}}>in 60 Seconds</span></h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px',lineHeight:'1.6'}}>Transform photos into production-ready 3D models instantly. Built for designers, e-commerce, and creators worldwide.</p></div>)}
          {tab==="multi" && <div><h1 style={{fontSize:'48px',fontWeight:700,margin:0}}>Multi-Image to 3D</h1><p style={{opacity:.6,marginTop:'16px'}}>Upload 3-4 angles for perfect geometry.</p></div>}
          {tab==="text3d" && (<div><h1 style={{fontSize:'48px',lineHeight:'1.08',fontWeight:700,margin:0}}>Your Text Just Got<br/>a Promotion.</h1><p style={{opacity:.6,marginTop:'16px'}}>Type prompt → 30s preview → 60s textured PBR 4K.</p><textarea placeholder="A cute dragon wearing sneakers, PBR, ultra detailed..." style={{width:'100%',height:'100px',marginTop:'18px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',padding:'14px',color:'#fff',fontSize:'14px',outline:'none'}}></textarea><button style={{marginTop:'14px',width:'100%',background:'#A020F0',padding:'13px',borderRadius:'10px',fontWeight:600,border:'none',color:'#fff',cursor:'pointer'}}>Generate 3D — 20 Credits</button></div>)}
          {tab==="texture" && <div><h1 style={{fontSize:'48px',fontWeight:700,margin:0}}>Text to Texture</h1></div>}
          {tab==="template" && <div><h1 style={{fontSize:'48px',fontWeight:700,margin:0}}>Prompt to Banner<br/>Any Size ★</h1><p style={{opacity:.6,marginTop:'16px'}}>Type prompt → Instagram, YouTube, Shopify Banner of any size.</p></div>}
          <div style={{display:'flex',gap:'12px',marginTop:'24px'}}>
            <button style={{background:'#A020F0',boxShadow:'0 0 24px rgba(160,32,240,0.4)',padding:'14px 22px',borderRadius:'10px',fontWeight:600,border:'none',color:'#fff',cursor:'pointer',fontSize:'14px'}}>✦ Start Creating — Free</button>
            <button style={{border:'1px solid rgba(255,255,255,0.12)',background:'rgba(255,255,255,0.04)',padding:'14px 22px',borderRadius:'10px',color:'#fff',cursor:'pointer',fontSize:'14px'}}>◉ Watch Demo</button>
          </div>
          <div style={{display:'flex',gap:'8px',marginTop:'20px',flexWrap:'wrap',fontSize:'13px'}}>
            <span style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',padding:'6px 14px',borderRadius:'20px'}}>⚡ 60s Turnaround</span>
            <span style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',padding:'6px 14px',borderRadius:'20px'}}>• 100k+ assets</span>
            <span style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',padding:'6px 14px',borderRadius:'20px'}}>• No CC required</span>
          </div>
        </div>
        <div onClick={openPicker} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed rgba(160,32,240,0.5)',borderRadius:'18px',background:'rgba(255,255,255,0.03)',backdropFilter:'blur(10px)',padding:'24px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'60px',height:'60px',background:'rgba(160,32,240,0.15)',borderRadius:'12px',display:'grid',placeItems:'center',fontSize:'28px',marginBottom:'14px'}}>☁️</div>
          <b style={{fontSize:'16px',fontWeight:600}}>Drag & drop your image here</b>
          <span style={{opacity:.5,fontSize:'13px',marginTop:'6px'}}>or browse files to upload</span>
          <span style={{opacity:.35,fontSize:'11px',marginTop:'18px'}}>PNG, JPG, WEBP • Max 20MB</span>
          <div style={{marginTop:'16px',background:'#A020F0',color:'#fff',padding:'11px 22px',borderRadius:'8px',fontSize:'13px',fontWeight:600}}>Browse Files</div>
          {preview && <img src={preview} alt="preview" style={{width:'100px',borderRadius:'8px',marginTop:'12px'}}/>}
        </div>
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'18px',padding:'14px',backdropFilter:'blur(10px)'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',opacity:.5,padding:'6px'}}><span>3D Viewer Preview</span><span>↻ ⛶</span></div>
          <div style={{background:'radial-gradient(ellipse at center,rgba(160,32,240,0.25),rgba(0,0,0,0))',borderRadius:'12px',height:'240px',marginTop:'8px',display:'grid',placeItems:'center',position:'relative'}}>{done && preview? <img src={preview} alt="3d" style={{height:'160px',borderRadius:'8px'}}/> : <div style={{fontSize:'68px'}}>👟</div>}</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'6px',marginTop:'12px'}}>
            {["GLB","FBX","OBJ","STL","3MF","USDZ","BLEND"].map(f=><button key={f} style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',padding:'9px',borderRadius:'8px',color:'#fff',fontSize:'11px'}}>{f}</button>)}
          </div>
        </div>
      </div>

      {/* NEW SECTION TITLE FOR 4 BOXES */}
      <div style={{padding:'40px 40px 16px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{textAlign:'center',maxWidth:'700px',margin:'0 auto'}}>
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.12)',border:'1px solid rgba(160,32,240,0.25)',padding:'6px 12px',borderRadius:'20px',fontSize:'11px',letterSpacing:'.1em',color:'#A020F0',fontWeight:700}}>FOUR STUDIOS • ONE PLATFORM</div>
          <h2 style={{fontSize:'36px',fontWeight:700,letterSpacing:'-0.02em',margin:'14px 0 10px'}}>Everything you need to create,<br/>in one place</h2>
          <p style={{opacity:.5,fontSize:'15px',lineHeight:'1.6'}}>Photo, Vector, 3D and Motion — PhotoRoom + Meshy + more, built for India and the world. Export to any format.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'18px',marginTop:'30px'}}>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.12) 0%, rgba(255,255,255,0.03) 100%)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px',backdropFilter:'blur(10px)'}}>
            <div style={{width:'44px',height:'44px',background:'#A020F0',borderRadius:'10px',display:'grid',placeItems:'center',fontSize:'22px'}}>📸</div>
            <h3 style={{fontSize:'18px',fontWeight:700,margin:'14px 0 6px'}}>Photo Studio</h3>
            <p style={{fontSize:'13px',opacity:.6,lineHeight:'1.5',margin:0}}>PhotoRoom clone for e-commerce. Clean product photos in seconds.</p>
            <div style={{marginTop:'12px',display:'grid',gap:'6px',fontSize:'12px',opacity:.8}}><span>• Remove Background</span><span>• Remove Object</span><span>• AI Backgrounds & Shadows</span><span>• Upscaler + Banner Maker</span></div>
            <div style={{marginTop:'12px',fontSize:'10px',opacity:.4,borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'8px'}}>JPG, PNG, EPS, SVG, PSD, AI</div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.18) 0%, rgba(255,255,255,0.03) 100%)',border:'1px solid rgba(160,32,240,0.4)',borderRadius:'16px',padding:'20px',backdropFilter:'blur(10px)',position:'relative'}}>
            <div style={{position:'absolute',top:'12px',right:'12px',background:'#A020F0',padding:'3px 8px',borderRadius:'12px',fontSize:'9px',fontWeight:700}}>YOUR USP</div>
            <div style={{width:'44px',height:'44px',background:'rgba(255,255,255,0.05)',border:'1px solid #A020F0',borderRadius:'10px',display:'grid',placeItems:'center',fontSize:'22px'}}>✒️</div>
            <h3 style={{fontSize:'18px',fontWeight:700,margin:'14px 0 6px'}}>Vector Studio</h3>
            <p style={{fontSize:'13px',opacity:.6,lineHeight:'1.5',margin:0}}>Convert any image to infinite scalable vector.</p>
            <div style={{marginTop:'12px',display:'grid',gap:'6px',fontSize:'12px',opacity:.8}}><span>• Image to Vector</span><span>• Photo to Line Art</span><span>• Logo Vectorizer</span><span>• Batch 100x</span></div>
            <div style={{marginTop:'12px',fontSize:'10px',opacity:.4,borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'8px'}}>JPG, PNG, EPS, SVG, PSD, CDR, AI</div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 100%)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px',backdropFilter:'blur(10px)'}}>
            <div style={{width:'44px',height:'44px',background:'rgba(255,255,255,0.08)',borderRadius:'10px',display:'grid',placeItems:'center',fontSize:'22px'}}>🧊</div>
            <h3 style={{fontSize:'18px',fontWeight:700,margin:'14px 0 6px'}}>3D Studio</h3>
            <p style={{fontSize:'13px',opacity:.6,lineHeight:'1.5',margin:0}}>Meshy clone – Photos & text to production 3D.</p>
            <div style={{marginTop:'12px',display:'grid',gap:'6px',fontSize:'12px',opacity:.8}}><span>• Image to 3D</span><span>• Multi-Image to 3D</span><span>• Text to 3D & Texture</span><span>• Remesh, Rig & Animate</span></div>
            <div style={{marginTop:'12px',fontSize:'10px',opacity:.4,borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'8px'}}>GLB, OBJ, FBX, STL, USDZ</div>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.12) 0%, rgba(255,255,255,0.03) 100%)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px',backdropFilter:'blur(10px)'}}>
            <div style={{width:'44px',height:'44px',background:'#A020F0',borderRadius:'10px',display:'grid',placeItems:'center',fontSize:'22px'}}>🎬</div>
            <h3 style={{fontSize:'18px',fontWeight:700,margin:'14px 0 6px'}}>Motion Studio</h3>
            <p style={{fontSize:'13px',opacity:.6,lineHeight:'1.5',margin:0}}>AI video – Text/image to viral reels & ads.</p>
            <div style={{marginTop:'12px',display:'grid',gap:'6px',fontSize:'12px',opacity:.8}}><span>• Text/Image to Video</span><span>• Logo & Text Animation</span><span>• Reels, Promo, Ads</span><span>• Stock, Music, LUTs</span></div>
            <div style={{marginTop:'12px',fontSize:'10px',opacity:.4,borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'8px'}}>MP4, MOV, GIF 9:16</div>
          </div>
        </div>
      </div>

      {/* PRICING - TITLE + TOGGLE */}
      <div style={{padding:'50px 40px 70px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)',marginTop:'20px'}}>
        <div style={{textAlign:'center'}}>
          <h2 style={{fontSize:'34px',fontWeight:700,letterSpacing:'-0.02em',margin:'0'}}>Simple, transparent pricing</h2>
          <p style={{opacity:.5,fontSize:'15px',marginTop:'8px'}}>Start free. Pay for what you use. Upgrade when you need more.</p>
          <div style={{display:'inline-flex',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'30px',padding:'4px',marginTop:'18px'}}>
            <button onClick={()=>setBilling("monthly")} style={{padding:'8px 18px',borderRadius:'20px',border:'none',background:billing==="monthly"?'#fff':'transparent',color:billing==="monthly"?'#000':'#fff',fontWeight:600,fontSize:'13px',cursor:'pointer'}}>Monthly</button>
            <button onClick={()=>setBilling("yearly")} style={{padding:'8px 18px',borderRadius:'20px',border:'none',background:billing==="yearly"?'#fff':'transparent',color:billing==="yearly"?'#000':'#fff',fontWeight:600,fontSize:'13px',cursor:'pointer'}}>Yearly <span style={{color:'#A020F0',fontSize:'11px'}}>-20%</span></button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'16px',marginTop:'30px'}}>
          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'22px',backdropFilter:'blur(10px)'}}>
            <div style={{fontSize:'11px',opacity:.6,letterSpacing:'.08em'}}>FREE</div>
            <div style={{fontSize:'32px',fontWeight:700,marginTop:'8px'}}>₹0<span style={{fontSize:'12px',opacity:.5,fontWeight:400}}> /{billing==="monthly"?"mo":"yr"}</span></div>
            <div style={{fontSize:'12px',opacity:.5,marginTop:'4px'}}>100 credits • 5 exports</div>
            <div style={{marginTop:'16px',fontSize:'13px',display:'grid',gap:'8px',opacity:.8}}><div>✓ Photo Studio – 5 exports</div><div>✓ Vector Studio – Preview only</div><div>✓ Standard quality</div><div>✓ No CC required</div></div>
            <button style={{marginTop:'20px',width:'100%',background:'transparent',border:'1px solid rgba(255,255,255,0.15)',padding:'11px',borderRadius:'10px',color:'#fff',fontWeight:600,cursor:'pointer'}}>Get Started Free</button>
          </div>
          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'22px',backdropFilter:'blur(10px)'}}>
            <div style={{fontSize:'11px',opacity:.6,letterSpacing:'.08em'}}>STARTER • {billing}</div>
            <div style={{fontSize:'32px',fontWeight:700,marginTop:'8px'}}>₹{price(999)}<span style={{fontSize:'12px',opacity:.5,fontWeight:400}}> /{billing==="monthly"?"mo":"yr"}</span></div>
            <div style={{fontSize:'11px',opacity:.5,marginTop:'2px'}}>{billing==="yearly"?"₹799/mo billed yearly":"Billed monthly"} • 1500 credits</div>
            <div style={{marginTop:'16px',fontSize:'13px',display:'grid',gap:'8px',opacity:.8}}><div>✓ 100 exports / mo</div><div>✓ Photo + Vector full</div><div>✓ All formats: JPG, SVG, EPS, AI</div><div>✓ HD exports</div></div>
            <button style={{marginTop:'20px',width:'100%',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)',padding:'11px',borderRadius:'10px',color:'#fff',fontWeight:600,cursor:'pointer'}}>Choose Starter</button>
          </div>
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.18) 0%, rgba(255,255,255,0.03) 100%)',border:'1.5px solid #A020F0',borderRadius:'16px',padding:'22px',position:'relative',boxShadow:'0 0 40px rgba(160,32,240,0.2)'}}>
            <div style={{position:'absolute',top:'-11px',left:'50%',transform:'translateX(-50%)',background:'#A020F0',padding:'3px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:700}}>Most Popular</div>
            <div style={{fontSize:'11px',opacity:.8,letterSpacing:'.08em'}}>CREATOR • {billing}</div>
            <div style={{fontSize:'32px',fontWeight:700,marginTop:'8px'}}>₹{price(2999)}<span style={{fontSize:'12px',opacity:.5,fontWeight:400}}> /{billing==="monthly"?"mo":"yr"}</span></div>
            <div style={{fontSize:'11px',opacity:.5,marginTop:'2px'}}>{billing==="yearly"?"₹1999/yr save 20%":"Billed monthly"} • 6000 credits</div>
            <div style={{marginTop:'16px',fontSize:'13px',display:'grid',gap:'8px',opacity:.85}}><div>✓ 400 exports / mo</div><div>✓ Photo + Vector + 3D Studio</div><div>✓ 4K + Batch 100x</div><div>✓ Motion Studio beta</div></div>
            <button style={{marginTop:'20px',width:'100%',background:'#A020F0',boxShadow:'0 0 20px rgba(160,32,240,0.4)',border:'none',padding:'11px',borderRadius:'10px',color:'#fff',fontWeight:700,cursor:'pointer'}}>Choose Creator</button>
          </div>
          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'22px',backdropFilter:'blur(10px)'}}>
            <div style={{fontSize:'11px',opacity:.6,letterSpacing:'.08em'}}>PRO • {billing}</div>
            <div style={{fontSize:'32px',fontWeight:700,marginTop:'8px'}}>₹{price(4999)}<span style={{fontSize:'12px',opacity:.5,fontWeight:400}}> /{billing==="monthly"?"mo":"yr"}</span></div>
            <div style={{fontSize:'11px',opacity:.5,marginTop:'2px'}}>{billing==="yearly"?"₹3332/yr save 20%":"Billed monthly"} • 15000 credits + API</div>
            <div style={{marginTop:'16px',fontSize:'13px',display:'grid',gap:'8px',opacity:.8}}><div>✓ 1000 exports + API</div><div>✓ All studios + all formats</div><div>✓ GLB, FBX, SVG, MP4</div><div>✓ Team (3 seats)</div></div>
            <button style={{marginTop:'20px',width:'100%',background:'#fff',border:'none',padding:'11px',borderRadius:'10px',color:'#000',fontWeight:700,cursor:'pointer'}}>Choose Pro</button>
          </div>
        </div>
        <p style={{textAlign:'center',opacity:.35,fontSize:'11px',marginTop:'18px'}}>Yearly plans save 20%. You can switch or cancel anytime. Credits based on usage: Photo 1 credit, Vector 5 credits, 3D 20 credits, Motion 10 credits.</p>
      </div>
    </div>
  )
}
