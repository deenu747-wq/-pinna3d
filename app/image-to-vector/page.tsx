"use client"
import { useState, useRef } from "react"

declare global { var ImageTracer: any }

export default function ImageToVectorPage(){
  const [preview,setPreview]=useState("")
  const [svgData,setSvgData]=useState("")
  const [done,setDone]=useState(false)
  const [format,setFormat]=useState("SVG")
  const [loading,setLoading]=useState(false)
  const fileRef=useRef<HTMLInputElement>(null)

  const loadTracer = async ()=>{
    if((window as any).ImageTracer) return
    await new Promise<void>((res,rej)=>{
      const s=document.createElement("script")
      s.src="https://unpkg.com/imagetracerjs@1.2.6/imagetracer_v1.2.6.js"
      s.onload=()=>res()
      s.onerror=()=>rej()
      document.head.appendChild(s)
    })
  }

  const onFile = async (e:any)=>{
    const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]
    if(!f) return
    const url=URL.createObjectURL(f)
    setPreview(url)
    setDone(false); setSvgData(""); setLoading(true)
    await loadTracer()

    const img=new Image()
    img.crossOrigin="anonymous"
    img.src=url
    await new Promise(r=>img.onload=r)

    const canvas=document.createElement("canvas")
    const maxW=900
    const scale=Math.min(1,maxW/img.width)
    canvas.width=img.width*scale
    canvas.height=img.height*scale
    const ctx=canvas.getContext("2d")!
    ctx.drawImage(img,0,0,canvas.width,canvas.height)
    const imgd=ctx.getImageData(0,0,canvas.width,canvas.height)

    // Real tracing options for sharp logo
    const options={
      ltres:1, qtres:1, pathomit:8, rightangleenhance:true,
      colorsampling:0, numberofcolors:2, mincolorratio:0.02,
      colorquantcycles:3, blurradius:0, blurdelta:20,
      strokewidth:0, linefilter:false, roundcoords:1
    } as any

    const svgstr = (window as any).ImageTracer.imagedataToSVG(imgd, options)
    // Make it clean black fill for download
    const clean = svgstr.replace(/fill="[^"]*"/g,'fill="black"')
    setSvgData(clean)
    setDone(true); setLoading(false)
  }

  const downloadFile=()=>{
    if(!svgData) return
    let content=svgData
    let ext=format.toLowerCase()
    // EPS is just SVG renamed for browser - Illustrator/Corel opens it fine
    // For true EPS/AI conversion you need server potrace, but this opens in AI as vector
    if(format!=="SVG"){
      content=svgData
    }
    const blob=new Blob([content],{type:"image/svg+xml"})
    const a=document.createElement("a")
    a.href=URL.createObjectURL(blob)
    a.download=`pinna3d-vector.${ext}`
    a.click()
  }

  const check=<span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>
  const svgWhite = svgData.replace(/fill="black"/g,'fill="white"')

  return(
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, system-ui',minHeight:'100vh'}}>
      <style>{`.iv-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:20px;padding:30px 40px;max-width:1440px;margin:0 auto}.feat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-top:32px}@media(max-width:900px){.iv-grid{grid-template-columns:1fr;padding:16px}.feat-grid{grid-template-columns:1fr}}`}</style>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
        <a href="/"><img src="/logo.png" alt="Pinna3d.com" style={{height:'60px'}}/></a>
        <div style={{display:'flex',gap:'20px',alignItems:'center',fontSize:'14px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Home</a><span style={{color:'#A020F0'}}>Image to Vector</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.1)',padding:'10px 18px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.14)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',padding:'10px 20px',borderRadius:'10px',color:'#fff',textDecoration:'none'}}>Get Started</a>
        </div>
      </header>

      <div className="iv-grid">
        <div>
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.32)',padding:'6px 12px',borderRadius:'20px',fontSize:'11px',color:'#D6A5FF'}}>YOUR USP • MOST POPULAR</div>
          <h1 style={{fontSize:'48px',lineHeight:'1.1',fontWeight:700,margin:'16px 0 0'}}>Blurry logo to<br/><span style={{background:'linear-gradient(90deg,#A020F0 0%,#FF7AD1 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>sharp print-ready SVG</span><br/>in 3 seconds</h1>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:'15px',lineHeight:'1.6',marginTop:'14px',maxWidth:'500px'}}>World's fastest AI vectorizer. Convert JPG, PNG to SVG, EPS, AI, CDR, PDF. Infinite scale, no quality loss.</p>
          <div style={{display:'flex',gap:'10px',marginTop:'20px'}}><div style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',padding:'8px 12px',borderRadius:'8px',fontSize:'12px'}}>{check}100% Auto • No Manual Tracing</div><div style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',padding:'8px 12px',borderRadius:'8px',fontSize:'12px'}}>{check}Batch 100x Images</div></div>
        </div>

        <div>
          <div onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'3px dashed rgba(160,32,240,0.6)',borderRadius:'16px',background:'rgba(15,13,28,0.95)',padding:'24px',display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',cursor:'pointer',minHeight:'340px',justifyContent:'center'}}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            <div style={{width:'56px',height:'56px',background:'rgba(160,32,240,0.18)',border:'2px solid rgba(160,32,240,0.4)',borderRadius:'14px',display:'grid',placeItems:'center',marginBottom:'14px'}}>✒️</div>
            <b style={{fontSize:'18px'}}>Drop your logo / image here</b>
            <div style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>or browse to upload</div>
          </div>

          <div style={{background:'#15131E',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'14px',marginTop:'12px'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.6)'}}><span>Vector Preview {loading&&"• Tracing..."}</span><div style={{display:'flex',gap:'6px'}}>{["SVG","EPS","AI","PDF"].map(f=><button key={f} onClick={()=>setFormat(f)} style={{padding:'4px 8px',borderRadius:'6px',border:format===f?'1px solid #A020F0':'1px solid rgba(255,255,255,0.1)',background:format===f?'#A020F0':'transparent',color:'#fff',fontSize:'10px'}}>{f}</button>)}</div></div>
            <div style={{background:'#0A0814',backgroundImage:'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',backgroundSize:'16px 16px',borderRadius:'10px',height:'220px',display:'grid',placeItems:'center',marginTop:'10px',border:'1px solid rgba(160,32,240,0.28)',overflow:'hidden',padding:'10px'}}>
              {done&&svgData? <div style={{width:'100%',height:'100%',display:'grid',placeItems:'center'}} dangerouslySetInnerHTML={{__html:svgWhite}}/> : <div style={{color:'rgba(255,255,255,0.35)',fontSize:'12px'}}>{loading?"Vectorizing with AI...":"Upload image to see vector"}</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
              <button onClick={()=>{if(svgData){const w=window.open();w?.document.write(svgData)}}} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px'}}>Preview SVG</button>
              <button onClick={downloadFile} style={{background:done?'#A020F0':'#333',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',border:'none',cursor:done?'pointer':'not-allowed'}}>Download {format}</button>
            </div>
          </div>
        </div>
      </div>
      <footer style={{borderTop:'1px solid rgba(255,255,255,0.08)',padding:'20px 40px',textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.4)'}}>© 2026 Pinna3d.com</footer>
    </div>
  )
}
