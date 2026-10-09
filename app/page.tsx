"use client"
import { useState, useRef } from "react"

export default function Page(){
  const [preview,setPreview]=useState("")
  const [done,setDone]=useState(false)
  const [tab,setTab]=useState("image3d")
  const [studio,setStudio]=useState("studio3d")
  const [showMega,setShowMega]=useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const onFile = (e:any)=>{
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    setPreview(URL.createObjectURL(f))
    setDone(false)
    setTimeout(()=>setDone(true),1000)
  }
  const openPicker = () => fileRef.current?.click()

  const studios:any = {
    studio3d: { name: "3D Creation Studio", icon:"🧊", tabs: [
      {id:"image3d", label:"Image to 3D"},
      {id:"multi", label:"Multi-Image to 3D"},
      {id:"text3d", label:"Text to 3D"},
    ]},
    studioMaterial: { name: "Material Studio", icon:"🎨", tabs: [
      {id:"texture", label:"Text to Texture"},
    ]},
    studioDesign: { name: "Design Studio", icon:"✨", tabs: [
      {id:"template", label:"Template Studio"},
      {id:"vector", label:"Image to Vector ★ NEW"},
    ]},
  }

  return (
    <div style={{background:'#0B0A14',color:'#fff',fontFamily:'Inter, system-ui, sans-serif',minHeight:'100vh'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'4px 40px',borderBottom:'1px solid #1e1c32',background:'#0B0A14',position:'sticky',top:0,zIndex:50,height:'88px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <img src="/logo.png" alt="Pinna3d.com" style={{height:'100px',width:'auto',objectFit:'contain'}} />
        </div>
        <div style={{display:'flex',gap:'24px',alignItems:'center',fontSize:'15px',fontWeight:500,position:'relative'}}>
          <span style={{opacity:.6,cursor:'pointer'}}>Features</span>
          <div onMouseEnter={()=>setShowMega(true)} onMouseLeave={()=>setShowMega(false)} style={{position:'relative'}}>
            <span style={{color:'#A020F0',fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:'4px'}}>Studios <span style={{fontSize:'10px'}}>▼</span></span>
            {showMega && (
              <div style={{position:'absolute',top:'100%',left:'50%',transform:'translateX(-50%)',marginTop:'18px',width:'680px',background:'#13111F',border:'1px solid #2a2840',borderRadius:'18px',padding:'20px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'14px',boxShadow:'0 20px 60px rgba(0,0,0,0.6)',zIndex:100}}>
                <button onClick={()=>{setStudio("studio3d"); setTab("image3d"); setShowMega(false)}} style={{textAlign:'left',padding:'16px',borderRadius:'14px',border:studio==="studio3d"?'1px solid #A020F0':'1px solid #201e33',background:studio==="studio3d"?'#1e1b33':'#0f0e1a',cursor:'pointer'}}>
                  <div style={{fontSize:'24px',marginBottom:'8px'}}>🧊</div><div style={{fontWeight:600,fontSize:'14px',color:'#fff'}}>3D Creation Studio</div><div style={{fontSize:'12px',opacity:.6,marginTop:'6px',lineHeight:'18px',color:'#fff'}}>Image to 3D • Multi • Text to 3D • 60s PBR 4K</div><div style={{marginTop:'12px',fontSize:'11px',color:'#A020F0',fontWeight:600}}>3 tools →</div>
                </button>
                <button onClick={()=>{setStudio("studioMaterial"); setTab("texture"); setShowMega(false)}} style={{textAlign:'left',padding:'16px',borderRadius:'14px',border:studio==="studioMaterial"?'1px solid #A020F0':'1px solid #201e33',background:studio==="studioMaterial"?'#1e1b33':'#0f0e1a',cursor:'pointer'}}>
                  <div style={{fontSize:'24px',marginBottom:'8px'}}>🎨</div><div style={{fontWeight:600,fontSize:'14px',color:'#fff'}}>Material Studio</div><div style={{fontSize:'12px',opacity:.6,marginTop:'6px',lineHeight:'18px',color:'#fff'}}>Text to Texture • PBR Retexture • Any mesh 4K</div><div style={{marginTop:'12px',fontSize:'11px',color:'#A020F0',fontWeight:600}}>1 tool →</div>
                </button>
                <button onClick={()=>{setStudio("studioDesign"); setTab("template"); setShowMega(false)}} style={{textAlign:'left',padding:'16px',borderRadius:'14px',border:studio==="studioDesign"?'1px solid #A020F0':'1px solid #201e33',background:studio==="studioDesign"?'#1e1b33':'#0f0e1a',cursor:'pointer'}}>
                  <div style={{fontSize:'24px',marginBottom:'8px'}}>✨</div><div style={{fontWeight:600,fontSize:'14px',color:'#fff'}}>Design Studio</div><div style={{fontSize:'12px',opacity:.6,marginTop:'6px',lineHeight:'18px',color:'#fff'}}>Template Studio • Banner Any Size • Image to Vector ★ NEW</div><div style={{marginTop:'12px',fontSize:'11px',color:'#A020F0',fontWeight:600}}>2 tools →</div>
                </button>
              </div>
            )}
          </div>
          <span style={{opacity:.6,cursor:'pointer'}}>Pricing</span>
          <span style={{opacity:.6,cursor:'pointer'}}>Docs</span>
          <span style={{opacity:.6,cursor:'pointer'}}>Blog</span>
          <button style={{background:'#2a2840',padding:'10px 18px',borderRadius:'8px',border:'none',color:'#fff',cursor:'pointer',fontSize:'14px',fontWeight:500}}>Sign In</button>
          <button style={{background:'#A020F0',padding:'10px 20px',borderRadius:'8px',border:'none',color:'#fff',fontWeight:600,cursor:'pointer',fontSize:'14px'}}>Get Started</button>
        </div>
      </header>

      <div style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 40px',background:'#0f0e1a',borderBottom:'1px solid #1e1c32'}}>
        <span style={{fontSize:'11px',opacity:.4,textTransform:'uppercase',letterSpacing:'1.5px',marginRight:'8px'}}>Active Studio:</span>
        <button onClick={()=>{setStudio("studio3d"); setTab("image3d")}} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:studio==="studio3d"?'1px solid #A020F0':'1px solid #2a2840',background:studio==="studio3d"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>🧊 3D Creation Studio</button>
        <button onClick={()=>{setStudio("studioMaterial"); setTab("texture")}} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:studio==="studioMaterial"?'1px solid #A020F0':'1px solid #2a2840',background:studio==="studioMaterial"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>🎨 Material Studio</button>
        <button onClick={()=>{setStudio("studioDesign"); setTab("template")}} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:studio==="studioDesign"?'1px solid #A020F0':'1px solid #2a2840',background:studio==="studioDesign"?'#A020F0':'transparent',color:'#fff',cursor:'pointer'}}>✨ Design Studio ★ NEW</button>
      </div>

      <div style={{display:'flex',gap:'10px',padding:'12px 40px',background:'#0f0e1a',borderBottom:'1px solid #1e1c32',overflowX:'auto'}}>
        <span style={{fontSize:'11px',opacity:.3,padding:'8px 4px',whiteSpace:'nowrap'}}>{studios[studio].name}:</span>
        {studios[studio].tabs.map((t:any)=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'9px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:500,border:tab===t.id?'1px solid #A020F0':'1px solid #2a2840',background:tab===t.id?'#A020F0':'transparent',color:'#fff',cursor:'pointer',whiteSpace:'nowrap'}}>{t.label}</button>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'24px',padding:'40px',maxWidth:'1440px',margin:'0 auto'}}>
        <div>
          {tab==="image3d" && <div><h1 style={{fontSize:'48px',lineHeight:'1.08',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>Every Image to 3D<br/>in 60 Seconds</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px',lineHeight:'1.6'}}>Transform photos into production-ready 3D models instantly. Built for designers, e-commerce, and creators worldwide.</p></div>}
          {tab==="multi" && <div><h1 style={{fontSize:'48px',fontWeight:600,margin:0}}>Multi-Image to 3D</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px'}}>Upload 3-4 angles for perfect geometry.</p></div>}
          {tab==="text3d" && <div><h1 style={{fontSize:'48px',lineHeight:'1.08',fontWeight:600,margin:0}}>Your Text Just Got<br/>a Promotion.</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px',lineHeight:'1.6'}}>Type prompt → 30s preview → 60s textured PBR 4K.</p><textarea placeholder="A cute dragon wearing sneakers, PBR, ultra detailed..." style={{width:'100%',height:'100px',marginTop:'18px',background:'#13111F',border:'1px solid #2a2840',borderRadius:'12px',padding:'14px',color:'#fff',fontSize:'14px',outline:'none'}}></textarea><button style={{marginTop:'14px',width:'100%',background:'#A020F0',padding:'13px',borderRadius:'10px',fontWeight:600,border:'none',color:'#fff',cursor:'pointer',fontSize:'14px'}}>Generate 3D — 20 Credits</button></div>}
          {tab==="texture" && <div><h1 style={{fontSize:'48px',fontWeight:600,margin:0}}>Text to Texture</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px'}}>Retexture any mesh with PBR 4K — <b style={{color:'#fff'}}>Material Studio</b></p></div>}
          {tab==="template" && <div><h1 style={{fontSize:'48px',fontWeight:600,margin:0}}>Prompt to Banner<br/>Any Size ★</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px'}}>Type prompt → Instagram, YouTube, Shopify Banner — <b style={{color:'#fff'}}>Design Studio</b></p></div>}
          {tab==="vector" && <div><h1 style={{fontSize:'48px',fontWeight:600,margin:0}}>Image to Vector<br/>Infinitely Scalable ★</h1><p style={{opacity:.6,marginTop:'16px',fontSize:'16px'}}>Convert PNG/JPG to clean SVG instantly — <b style={{color:'#fff'}}>Design Studio NEW</b></p></div>}
          <div style={{display:'flex',gap:'12px',marginTop:'24px'}}>
            <button style={{background:'#A020F0',padding:'14px 22px',borderRadius:'10px',fontWeight:600,border:'none',color:'#fff',cursor:'pointer',fontSize:'14px'}}>✦ Start Creating — Free</button>
            <button style={{border:'1px solid #2a2840',background:'transparent',padding:'14px 22px',borderRadius:'10px',color:'#fff',cursor:'pointer',fontSize:'14px',fontWeight:500}}>◉ Watch Demo</button>
          </div>
        </div>
        <div onClick={openPicker} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed #A020F0',borderRadius:'18px',background:'#13111F',padding:'24px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'60px',height:'60px',background:'#1e1b33',borderRadius:'12px',display:'grid',placeItems:'center',fontSize:'28px',color:'#A020F0',marginBottom:'14px'}}>☁️</div>
          <b style={{fontSize:'16px',fontWeight:600}}>Drag & drop your image here</b>
          <span style={{opacity:.5,fontSize:'13px',marginTop:'6px'}}>or browse files to upload</span>
          <div style={{marginTop:'16px',background:'#A020F0',color:'#fff',padding:'11px 22px',borderRadius:'8px',fontSize:'13px',fontWeight:600}}>Browse Files</div>
          {preview && <img src={preview} alt="preview" style={{width:'100px',borderRadius:'8px',marginTop:'12px',border:'1px solid #2a2840'}}/>}
        </div>
        <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'18px',padding:'14px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',opacity:.5,padding:'6px'}}><span>3D Viewer Preview</span><span>↻ ⛶</span></div>
          <div style={{background:'radial-gradient(ellipse at center,#2a1a4a,#0f0e1a)',borderRadius:'12px',height:'240px',marginTop:'8px',display:'grid',placeItems:'center',position:'relative',overflow:'hidden'}}>
            {done && preview? <img src={preview} alt="3d" style={{height:'160px',borderRadius:'8px'}}/> : <div style={{fontSize:'68px'}}>👟</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
