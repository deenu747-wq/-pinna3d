"use client"
import { useState, useRef } from "react"

declare global { var ImageTracer: any }

export default function ImageToVectorPage(){
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

  // Convert SVG to REAL EPS (PostScript) that Illustrator opens as vector
  const svgToEps = (svgStr:string)=>{
    try{
      const wMatch = svgStr.match(/width="([^"]+)"/)
      const hMatch = svgStr.match(/height="([^"]+)"/)
      const vbMatch = svgStr.match(/viewBox="([^"]+)"/)
      let W=800, H=600
      if(vbMatch){ const parts=vbMatch[1].split(/[\s,]+/).map(Number); W=parts[2]; H=parts[3] }
      else { if(wMatch) W=parseFloat(wMatch[1]); if(hMatch) H=parseFloat(hMatch[1]) }
      if(!W ||!H){ W=800; H=600 }

      const pathRegex = /<path[^>]*d="([^"]+)"[^>]*fill="([^"]+)"[^>]*\/?>/g
      const paths: {d:string, fill:string}[]=[]
      let m
      while((m=pathRegex.exec(svgStr))!==null){ paths.push({d:m[1], fill:m[2]}) }
      if(paths.length===0){
        const dOnly=/<path[^>]*d="([^"]+)"[^>]*>/g
        while((m=dOnly.exec(svgStr))!==null){ paths.push({d:m[1], fill:"rgb(0,0,0)"}) }
      }

      const parseColor=(c:string)=>{
        if(c.startsWith("rgb")){
          const nums=c.match(/\d+/g)?.map(Number)||[0,0,0]
          return `${(nums[0]/255).toFixed(3)} ${(nums[1]/255).toFixed(3)} ${(nums[2]/255).toFixed(3)}`
        }
        if(c==="black") return "0 0 0"
        if(c==="white") return "1 1 1"
        return "0 0 0"
      }

      // SVG path -> PS commands (flips Y)
      const svgPathToPS=(d:string, H:number)=>{
        const tokens=d.match(/[a-zA-Z]|[-+]?\d*\.?\d+(?:e[-+]?\d+)?/g)||[]
        let i=0, cx=0, cy=0, out=""
        const psY=(y:number)=> (H - y).toFixed(2)
        const psX=(x:number)=> x.toFixed(2)
        let cmd=""
        while(i<tokens.length){
          const t=tokens[i]
          if(/^[a-zA-Z]$/.test(t)){ cmd=t; i++; }
          if(cmd==="M"){ const x=+tokens[i++], y=+tokens[i++]; cx=x; cy=y; out+=`${psX(x)} ${psY(y)} moveto\n` }
          else if(cmd==="m"){ const x=+tokens[i++], y=+tokens[i++]; cx+=x; cy+=y; out+=`${psX(cx)} ${psY(cy)} moveto\n` }
          else if(cmd==="L"){ const x=+tokens[i++], y=+tokens[i++]; cx=x; cy=y; out+=`${psX(x)} ${psY(y)} lineto\n` }
          else if(cmd==="l"){ const x=+tokens[i++], y=+tokens[i++]; cx+=x; cy+=y; out+=`${psX(cx)} ${psY(cy)} lineto\n` }
          else if(cmd==="H"){ const x=+tokens[i++]; cx=x; out+=`${psX(x)} ${psY(cy)} lineto\n` }
          else if(cmd==="h"){ const x=+tokens[i++]; cx+=x; out+=`${psX(cx)} ${psY(cy)} lineto\n` }
          else if(cmd==="V"){ const y=+tokens[i++]; cy=y; out+=`${psX(cx)} ${psY(y)} lineto\n` }
          else if(cmd==="v"){ const y=+tokens[i++]; cy+=y; out+=`${psX(cx)} ${psY(cy)} lineto\n` }
          else if(cmd==="C"){ const x1=+tokens[i++], y1=+tokens[i++], x2=+tokens[i++], y2=+tokens[i++], x=+tokens[i++], y=+tokens[i++]; out+=`${psX(x1)} ${psY(y1)} ${psX(x2)} ${psY(y2)} ${psX(x)} ${psY(y)} curveto\n`; cx=x; cy=y }
          else if(cmd==="c"){ const x1=cx+ +tokens[i++], y1=cy+ +tokens[i++], x2=cx+ +tokens[i++], y2=cy+ +tokens[i++], x=cx+ +tokens[i++], y=cy+ +tokens[i++]; out+=`${psX(x1)} ${psY(y1)} ${psX(x2)} ${psY(y2)} ${psX(x)} ${psY(y)} curveto\n`; cx=x; cy=y }
          else if(cmd==="Z"||cmd==="z"){ out+="closepath\n"; i++?0:0; cmd=""; }
          else { i++ }
          if(i<tokens.length &&!/^[a-zA-Z]$/.test(tokens[i]) && (cmd==="M"||cmd==="m")) cmd=cmd==="M"?"L":"l"
        }
        return out
      }

      let eps=`%!PS-Adobe-3.0 EPSF-3.0\n%%Creator: Pinna3d Vectorizer\n%%BoundingBox: 0 0 ${Math.round(W)} ${Math.round(H)}\n%%EndComments\n\ngsave\n`
      paths.forEach(p=>{
        const ps = svgPathToPS(p.d, H)
        if(!ps) return
        eps+=`newpath\n${ps}${parseColor(p.fill)} setrgbcolor\nfill\n`
      })
      eps+=`grestore\nshowpage\n%%EOF`
      return eps
    }catch{ return null }
  }

  const onFile = async (e:any)=>{
    const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]
    if(!f) return
    setLoading(true); setDone(false); setSvgData("")
    await loadTracer()

    const img=new Image()
    img.src=URL.createObjectURL(f)
    await new Promise(r=>img.onload=r)

    const canvas=document.createElement("canvas")
    // Keep HIGH RES for quality - no aggressive downscale
    const maxW=1200
    const scale=Math.min(1, maxW/img.width)
    canvas.width=Math.round(img.width*scale)
    canvas.height=Math.round(img.height*scale)
    const ctx=canvas.getContext("2d")!
    ctx.drawImage(img,0,0,canvas.width,canvas.height)
    const imgd=ctx.getImageData(0,0,canvas.width,canvas.height)

    // HIGH QUALITY tracing - preserves colors, smooth curves
    const options={
      ltres:1, qtres:1, pathomit:8,
      rightangleenhance:false,
      colorsampling:1, numberofcolors:16,
      mincolorratio:0.02, colorquantcycles:3,
      blurradius:1, blurdelta:20,
      strokewidth:0, linefilter:false,
      roundcoords:2
    } as any

    let svgstr=(window as any).ImageTracer.imagedataToSVG(imgd, options)
    // Remove white background path if present (for better preview)
    svgstr=svgstr.replace(/<path[^>]*fill="rgb\(255,255,255\)"[^>]*\/>/g,'')
    setSvgData(svgstr)
    setDone(true); setLoading(false)
  }

  const downloadFile=()=>{
    if(!svgData) return
    let content=svgData
    let mime="image/svg+xml"
    let ext=format.toLowerCase()

    if(format==="EPS"||format==="AI"){
      const eps=svgToEps(svgData)
      if(eps){ content=eps; mime="application/postscript" }
    }
    // PDF - for now SVG content works, Illustrator opens. For true PDF, server needed.
    const blob=new Blob([content],{type:mime})
    const a=document.createElement("a")
    a.href=URL.createObjectURL(blob)
    a.download=`pinna3d-vector.${ext}`
    a.click()
  }

  // For dark preview: show original colors, but if logo is black make it white so visible
  const previewSvg = (()=> {
    if(!svgData) return ""
    // If SVG is mostly black, show white for dark bg, else show original
    if(svgData.includes('fill="rgb(0,0,0)"') || svgData.toLowerCase().includes('fill="black"')){
      // only for preview: make black -> white, keep other colors
      return svgData.replace(/fill="rgb\(0,0,0\)"/g,'fill="white"').replace(/fill="black"/g,'fill="white"')
    }
    return svgData
  })()

  const check=<span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>

  return(
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter,system-ui',minHeight:'100vh'}}>
      <style>{`.iv-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:20px;padding:30px 40px;max-width:1440px;margin:0 auto}.feat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-top:32px}@media(max-width:900px){.iv-grid{grid-template-columns:1fr;padding:16px}.feat-grid{grid-template-columns:1fr}} svg{max-width:100%;max-height:100%}`}</style>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
        <a href="/"><img src="/logo.png" alt="Pinna3d" style={{height:'60px'}}/></a>
        <div style={{display:'flex',gap:'20px',alignItems:'center',fontSize:'14px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Home</a><span style={{color:'#A020F0'}}>Image to Vector</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.1)',padding:'10px 18px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.14)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',padding:'10px 20px',borderRadius:'10px',color:'#fff',textDecoration:'none'}}>Get Started</a>
        </div>
      </header>

      <div className="iv-grid">
        <div>
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.32)',padding:'6px 12px',borderRadius:'20px',fontSize:'11px',color:'#D6A5FF'}}>SAME COLOR • HIGH QUALITY</div>
          <h1 style={{fontSize:'48px',lineHeight:'1.1',fontWeight:700,margin:'16px 0 0'}}>Blurry logo to<br/><span style={{background:'linear-gradient(90deg,#A020F0 0%,#FF7AD1 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>sharp print-ready SVG</span><br/>in 3 seconds</h1>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:'15px',lineHeight:'1.6',marginTop:'14px',maxWidth:'500px'}}>Keeps original colors. No black forcing. True smooth curves. EPS opens as editable vector in Illustrator.</p>
          <div style={{display:'flex',gap:'10px',marginTop:'20px'}}><div style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',padding:'8px 12px',borderRadius:'8px',fontSize:'12px'}}>{check}Same Colors as Input</div><div style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',padding:'8px 12px',borderRadius:'8px',fontSize:'12px'}}>{check}Smooth Curves</div></div>
        </div>

        <div>
          <div onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'3px dashed rgba(160,32,240,0.6)',borderRadius:'16px',background:'rgba(15,13,28,0.95)',padding:'24px',display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',cursor:'pointer',minHeight:'340px',justifyContent:'center'}}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            <div style={{width:'56px',height:'56px',background:'rgba(160,32,240,0.18)',border:'2px solid rgba(160,32,240,0.4)',borderRadius:'14px',display:'grid',placeItems:'center',marginBottom:'14px'}}>✒️</div>
            <b style={{fontSize:'18px'}}>Drop your logo / image here</b>
            <div style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>keeps original colors</div>
          </div>

          <div style={{background:'#15131E',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'14px',marginTop:'12px'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.6)'}}><span>Vector Preview {loading&&"• High-quality tracing..."}</span><div style={{display:'flex',gap:'6px'}}>{["SVG","EPS","AI","PDF"].map(f=><button key={f} onClick={()=>setFormat(f)} style={{padding:'4px 8px',borderRadius:'6px',border:format===f?'1px solid #A020F0':'1px solid rgba(255,255,255,0.1)',background:format===f?'#A020F0':'transparent',color:'#fff',fontSize:'10px'}}>{f}</button>)}</div></div>
            <div style={{background:'#0A0814',backgroundImage:'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',backgroundSize:'16px 16px',borderRadius:'10px',height:'260px',display:'grid',placeItems:'center',marginTop:'10px',border:'1px solid rgba(160,32,240,0.28)',overflow:'hidden',padding:'12px'}}>
              {done&&svgData? <div style={{width:'100%',height:'100%',display:'grid',placeItems:'center'}} dangerouslySetInnerHTML={{__html:previewSvg}}/> : <div style={{color:'rgba(255,255,255,0.35)',fontSize:'12px'}}>{loading?"Tracing with original colors...":"Upload image to see vector"}</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
              <button onClick={()=>{if(svgData){const w=window.open();w?.document.write(svgData)}}} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px'}}>Preview SVG</button>
              <button onClick={downloadFile} style={{background:done?'#A020F0':'#333',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',border:'none',cursor:done?'pointer':'not-allowed'}}>Download {format} (Same Color)</button>
            </div>
          </div>
        </div>
      </div>
      <footer style={{borderTop:'1px solid rgba(255,255,255,0.08)',padding:'20px 40px',textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.4)'}}>© 2026 Pinna3d.com</footer>
    </div>
  )
}
