"use client"
import { useState, useRef, useEffect } from "react"

export default function ImageToVector(){
  const [preview,setPreview]=useState("")
  const [svgCode,setSvgCode]=useState("")
  const [busy,setBusy]=useState(false)
  const [mode,setMode]=useState("2")
  const fileRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(()=>{
    // Load ImageTracer for real vectorization
    const s = document.createElement("script")
    s.src = "https://cdn.jsdelivr.net/npm/imagetracerjs@1.2.6/imagetracer_v1.2.6.js"
    // @ts-ignore
    s.onload = ()=>{ window.ImageTracer = window.ImageTracer }
    document.head.appendChild(s)
  },[])

  const onFile = (e:any)=>{
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    const url = URL.createObjectURL(f)
    setPreview(url)
    setSvgCode("")
    setBusy(true)
    setTimeout(()=>doTrace(url),300)
  }

  const doTrace = (url:string)=>{
    // @ts-ignore
    const tracer = (window as any).ImageTracer
    if(!tracer){
      setBusy(false)
      return
    }
    tracer.loadImage(url, (canvas:any)=>{
      const options:any = {
        ltres:1, qtres:1, pathomit:8, rightangleenhance:false,
        colorsampling:2, numberofcolors: mode==="2"?2 : mode==="16"?16:64,
        mincolorratio:0, colorquantcycles:3,
        layering:0, strokewidth:1, linefilter:false, scale:1,
        roundcoords:1, viewbox:false, desc:false,
      }
      const svg = tracer.imagedataToSVG(tracer.getImgdata(canvas), options)
      setSvgCode(svg)
      setBusy(false)
    })
  }

  const download = (ext:string)=>{
    if(!svgCode) return
    const blob = new Blob([svgCode], {type:"image/svg+xml"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `pinna3d-vector-${Date.now()}.svg`
    if(ext!=="svg"){
      // For EPS/PDF/AI - we give SVG, user can open in Illustrator. True EPS conversion needs server.
      alert(`Downloading SVG now. Open in Illustrator → Save as ${ext.toUpperCase()} — 1 click. Server EPS/PDF coming next.`)
    }
    a.click()
  }

  return (
    <div style={{background:'#0B0A14',color:'#fff',fontFamily:'Inter, system-ui, sans-serif',minHeight:'100vh'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 40px',borderBottom:'1px solid #1e1c32',background:'#0B0A14',position:'sticky',top:0,zIndex:40}}>
        <a href="/"><img src="/logo.png" alt="Pinna3d.com" style={{height:'100px',width:'auto',objectFit:'contain'}}/></a>
        <div style={{display:'flex',gap:'28px',alignItems:'center',fontSize:'15px',fontWeight:500}}>
          <a href="/" style={{opacity:.6,textDecoration:'none',color:'#fff'}}>Image to 3D</a>
          <span style={{color:'#A020F0',fontWeight:600}}>Image to Vector</span>
          <a href="/#pricing" style={{opacity:.6,textDecoration:'none',color:'#fff'}}>Pricing</a>
          <button style={{background:'#A020F0',padding:'10px 20px',borderRadius:'8px',border:'none',color:'#fff',fontWeight:600,cursor:'pointer',fontSize:'14px'}}>Get Started</button>
        </div>
      </header>

      <div style={{maxWidth:'1440px',margin:'0 auto',padding:'40px',display:'grid',gridTemplateColumns:'1.15fr 0.85fr',gap:'28px'}}>
        <div>
          <h1 style={{fontSize:'48px',lineHeight:'1.08',fontWeight:600,letterSpacing:'-0.02em',margin:0}}>Image to Vector<br/>in 2 Seconds</h1>
          <p style={{opacity:.6,marginTop:'16px',fontSize:'16px',lineHeight:'1.6',fontWeight:400}}>Upload JPG, PNG, WEBP → True editable SVG vector. Infinite scale, no pixelation. Private, browser-based, 1 credit.</p>

          <div style={{marginTop:'22px',display:'flex',gap:'8px',flexWrap:'wrap',fontSize:'13px'}}>
            <span style={{background:'#13111F',border:'1px solid #201e33',padding:'6px 14px',borderRadius:'20px'}}>✓ True Vector Paths</span>
            <span style={{background:'#13111F',border:'1px solid #201e33',padding:'6px 14px',borderRadius:'20px'}}>✓ Infinite Zoom</span>
            <span style={{background:'#13111F',border:'1px solid #201e33',padding:'6px 14px',borderRadius:'20px'}}>✓ Figma / AI / Corel Ready</span>
          </div>

          <div style={{marginTop:'26px',background:'#13111F',border:'1px solid #201e33',borderRadius:'16px',padding:'20px'}}>
            <div style={{fontSize:'14px',fontWeight:600,marginBottom:'14px',letterSpacing:'-0.01em'}}>Vector Settings</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              <div><div style={{fontSize:'11px',opacity:.6,marginBottom:'6px'}}>COLOR MODE</div><select value={mode} onChange={e=>setMode(e.target.value)} style={{width:'100%',background:'#0B0A14',border:'1px solid #2a2840',borderRadius:'8px',padding:'11px',color:'#fff',fontSize:'13px'}}><option value="2">2 colors — Logo / B&W (Recommended)</option><option value="16">16 colors — Illustration</option><option value="64">64 colors — Photo</option></select></div>
              <div><div style={{fontSize:'11px',opacity:.6,marginBottom:'6px'}}>BACKGROUND</div><select style={{width:'100%',background:'#0B0A14',border:'1px solid #2a2840',borderRadius:'8px',padding:'11px',color:'#fff',fontSize:'13px'}}><option>Transparent (Recommended)</option><option>Keep White</option><option>Remove Background</option></select></div>
            </div>
          </div>

          <div style={{marginTop:'18px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'8px'}}>
            <button onClick={()=>download("svg")} disabled={!svgCode} style={{background:svgCode?'#A020F0':'#2a2840',padding:'13px',borderRadius:'10px',border:'none',color:'#fff',fontWeight:600,cursor:'pointer',fontSize:'13px',opacity:svgCode?1:.6}}>{busy?'Tracing...':'Download SVG'}</button>
            <button onClick={()=>download("eps")} disabled={!svgCode} style={{background:'#1a1830',border:'1px solid #2a2840',padding:'13px',borderRadius:'10px',color:'#fff',cursor:'pointer',fontSize:'13px',opacity:svgCode?1:.6}}>EPS</button>
            <button onClick={()=>download("pdf")} disabled={!svgCode} style={{background:'#1a1830',border:'1px solid #2a2840',padding:'13px',borderRadius:'10px',color:'#fff',cursor:'pointer',fontSize:'13px',opacity:svgCode?1:.6}}>PDF</button>
            <button onClick={()=>download("ai")} disabled={!svgCode} style={{background:'#1a1830',border:'1px solid #2a2840',padding:'13px',borderRadius:'10px',color:'#fff',cursor:'pointer',fontSize:'13px',opacity:svgCode?1:.6}}>AI</button>
          </div>
          <div style={{marginTop:'10px',fontSize:'11px',opacity:.4}}>1 credit per vector • Unlimited on Pro ₹999 • Private — never uploaded to server</div>
        </div>

        <div>
          <div onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed #A020F0',borderRadius:'18px',background:'#13111F',padding:'24px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer',minHeight:'300px'}}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            <div style={{width:'60px',height:'60px',background:'#1e1b33',borderRadius:'12px',display:'grid',placeItems:'center',fontSize:'28px',color:'#A020F0',marginBottom:'14px'}}>☁️</div>
            <b style={{fontSize:'16px',fontWeight:600}}>Drop image here — JPG, PNG, WEBP</b>
            <span style={{opacity:.5,fontSize:'13px',marginTop:'6px'}}>or browse files</span>
            <div style={{marginTop:'16px',background:'#A020F0',color:'#fff',padding:'11px 22px',borderRadius:'8px',fontSize:'13px',fontWeight:600}}>Browse Files</div>
            {preview && <img ref={imgRef} src={preview} alt="preview" style={{width:'110px',borderRadius:'8px',marginTop:'16px',border:'1px solid #2a2840'}}/>}
          </div>

          <div style={{marginTop:'16px',background:'#13111F',border:'1px solid #201e33',borderRadius:'18px',padding:'14px'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',opacity:.6,padding:'2px 2px 8px'}}><span>Vector Preview — Zoom ∞</span><span>{busy?'⏳ Tracing...':'✓ Real SVG'}</span></div>
            <div style={{background:'#fff',borderRadius:'12px',height:'280px',display:'grid',placeItems:'center',overflow:'auto',padding:'10px'}}>
              {svgCode? <div dangerouslySetInnerHTML={{__html:svgCode}} style={{width:'100%',height:'100%',display:'grid',placeItems:'center'}}/> : preview? <div style={{color:'#999',fontSize:'13px'}}>Generating vector...</div> : <div style={{color:'#999',fontSize:'13px'}}>No image yet</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
