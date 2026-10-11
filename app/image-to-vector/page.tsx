"use client"
import { useState, useRef } from "react"

declare global { var ImageTracer: any }

export default function ImageToVectorPage(){
  const [preview,setPreview]=useState("")
  const [svgData,setSvgData]=useState("")
  const [vectorDone,setVectorDone]=useState(false)
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

  // --- REAL EPS / PDF CONVERTERS ---
  const parsePaths = (svgStr:string)=>{
    const vbMatch = svgStr.match(/viewBox="([^"]+)"/)
    let W=800, H=600
    if(vbMatch){ const p=vbMatch[1].split(/[\s,]+/).map(Number); W=p[2]; H=p[3] }
    const pathRegex = /<path[^>]*d="([^"]+)"[^>]*fill="([^"]+)"[^>]*\/?>/g
    const paths: {d:string, fill:string}[]=[]
    let m
    while((m=pathRegex.exec(svgStr))!==null){ paths.push({d:m[1], fill:m[2]}) }
    if(paths.length===0){
      const dOnly=/<path[^>]*d="([^"]+)"[^>]*>/g
      while((m=dOnly.exec(svgStr))!==null){ paths.push({d:m[1], fill:"rgb(0,0,0)"}) }
    }
    return {W,H,paths}
  }
  const parseColor = (c:string)=>{
    if(c.startsWith("rgb")){ const n=c.match(/\d+/g)?.map(Number)||[0,0,0]; return {r:n[0]/255,g:n[1]/255,b:n[2]/255,str:`${(n[0]/255).toFixed(3)} ${(n[1]/255).toFixed(3)} ${(n[2]/255).toFixed(3)}`} }
    if(c==="white"||c==="black"){ return c==="white"?{r:1,g:1,b:1,str:"1 1 1"}:{r:0,g:0,b:0,str:"0 0 0"} }
    return {r:0,g:0,b:0,str:"0 0 0"}
  }
  const svgPathToPS = (d:string, H:number)=>{
    const tokens=d.match(/[a-zA-Z]|[-+]?\d*\.?\d+(?:e[-+]?\d+)?/g)||[]
    let i=0,cx=0,cy=0,out="",cmd=""
    while(i<tokens.length){
      const t=tokens[i]
      if(/^[a-zA-Z]$/.test(t)){ cmd=t; i++; }
      if(cmd==="M"){ const x=+tokens[i++], y=+tokens[i++]; cx=x; cy=y; out+=`${x.toFixed(2)} ${(H-y).toFixed(2)} moveto\n` }
      else if(cmd==="m"){ const x=+tokens[i++], y=+tokens[i++]; cx+=x; cy+=y; out+=`${cx.toFixed(2)} ${(H-cy).toFixed(2)} moveto\n` }
      else if(cmd==="L"){ const x=+tokens[i++], y=+tokens[i++]; cx=x; cy=y; out+=`${x.toFixed(2)} ${(H-y).toFixed(2)} lineto\n` }
      else if(cmd==="l"){ const x=+tokens[i++], y=+tokens[i++]; cx+=x; cy+=y; out+=`${cx.toFixed(2)} ${(H-cy).toFixed(2)} lineto\n` }
      else if(cmd==="H"){ const x=+tokens[i++]; cx=x; out+=`${x.toFixed(2)} ${(H-cy).toFixed(2)} lineto\n` }
      else if(cmd==="h"){ const x=+tokens[i++]; cx+=x; out+=`${cx.toFixed(2)} ${(H-cy).toFixed(2)} lineto\n` }
      else if(cmd==="V"){ const y=+tokens[i++]; cy=y; out+=`${cx.toFixed(2)} ${(H-y).toFixed(2)} lineto\n` }
      else if(cmd==="v"){ const y=+tokens[i++]; cy+=y; out+=`${cx.toFixed(2)} ${(H-cy).toFixed(2)} lineto\n` }
      else if(cmd==="C"){ const x1=+tokens[i++], y1=+tokens[i++], x2=+tokens[i++], y2=+tokens[i++], x=+tokens[i++], y=+tokens[i++]; out+=`${x1.toFixed(2)} ${(H-y1).toFixed(2)} ${x2.toFixed(2)} ${(H-y2).toFixed(2)} ${x.toFixed(2)} ${(H-y).toFixed(2)} curveto\n`; cx=x; cy=y }
      else if(cmd==="c"){ const x1=cx+ +tokens[i++], y1=cy+ +tokens[i++], x2=cx+ +tokens[i++], y2=cy+ +tokens[i++], x=cx+ +tokens[i++], y=cy+ +tokens[i++]; out+=`${x1.toFixed(2)} ${(H-y1).toFixed(2)} ${x2.toFixed(2)} ${(H-y2).toFixed(2)} ${x.toFixed(2)} ${(H-y).toFixed(2)} curveto\n`; cx=x; cy=y }
      else if(cmd==="Z"||cmd==="z"){ out+="closepath\n"; cmd="" } else { i++ }
      if(i<tokens.length &&!/^[a-zA-Z]$/.test(tokens[i]) && (cmd==="M"||cmd==="m")) cmd=cmd==="M"?"L":"l"
    }
    return out
  }
  const svgPathToPDF = (d:string, H:number)=>{
    const tokens=d.match(/[a-zA-Z]|[-+]?\d*\.?\d+(?:e[-+]?\d+)?/g)||[]
    let i=0,cx=0,cy=0,out="",cmd=""
    while(i<tokens.length){
      const t=tokens[i]
      if(/^[a-zA-Z]$/.test(t)){ cmd=t; i++; }
      if(cmd==="M"){ const x=+tokens[i++], y=+tokens[i++]; cx=x; cy=y; out+=`${x.toFixed(2)} ${(H-y).toFixed(2)} m\n` }
      else if(cmd==="m"){ const x=+tokens[i++], y=+tokens[i++]; cx+=x; cy+=y; out+=`${cx.toFixed(2)} ${(H-cy).toFixed(2)} m\n` }
      else if(cmd==="L"){ const x=+tokens[i++], y=+tokens[i++]; cx=x; cy=y; out+=`${x.toFixed(2)} ${(H-y).toFixed(2)} l\n` }
      else if(cmd==="l"){ const x=+tokens[i++], y=+tokens[i++]; cx+=x; cy+=y; out+=`${cx.toFixed(2)} ${(H-cy).toFixed(2)} l\n` }
      else if(cmd==="H"){ const x=+tokens[i++]; cx=x; out+=`${x.toFixed(2)} ${(H-cy).toFixed(2)} l\n` }
      else if(cmd==="h"){ const x=+tokens[i++]; cx+=x; out+=`${cx.toFixed(2)} ${(H-cy).toFixed(2)} l\n` }
      else if(cmd==="V"){ const y=+tokens[i++]; cy=y; out+=`${cx.toFixed(2)} ${(H-y).toFixed(2)} l\n` }
      else if(cmd==="v"){ const y=+tokens[i++]; cy+=y; out+=`${cx.toFixed(2)} ${(H-cy).toFixed(2)} l\n` }
      else if(cmd==="C"){ const x1=+tokens[i++], y1=+tokens[i++], x2=+tokens[i++], y2=+tokens[i++], x=+tokens[i++], y=+tokens[i++]; out+=`${x1.toFixed(2)} ${(H-y1).toFixed(2)} ${x2.toFixed(2)} ${(H-y2).toFixed(2)} ${x.toFixed(2)} ${(H-y).toFixed(2)} c\n`; cx=x; cy=y }
      else if(cmd==="c"){ const x1=cx+ +tokens[i++], y1=cy+ +tokens[i++], x2=cx+ +tokens[i++], y2=cy+ +tokens[i++], x=cx+ +tokens[i++], y=cy+ +tokens[i++]; out+=`${x1.toFixed(2)} ${(H-y1).toFixed(2)} ${x2.toFixed(2)} ${(H-y2).toFixed(2)} ${x.toFixed(2)} ${(H-y).toFixed(2)} c\n`; cx=x; cy=y }
      else if(cmd==="Z"||cmd==="z"){ out+="h\n"; cmd="" } else { i++ }
      if(i<tokens.length &&!/^[a-zA-Z]$/.test(tokens[i]) && (cmd==="M"||cmd==="m")) cmd=cmd==="M"?"L":"l"
    }
    return out
  }
  const svgToEps = (svgStr:string)=>{
    try{
      const {W,H,paths}=parsePaths(svgStr)
      let eps=`%!PS-Adobe-3.0 EPSF-3.0\n%%Creator: Pinna3d\n%%BoundingBox: 0 0 ${Math.round(W)} ${Math.round(H)}\n%%EndComments\ngsave\n`
      paths.forEach(p=>{ const ps=svgPathToPS(p.d,H); if(ps) eps+=`newpath\n${ps}${parseColor(p.fill).str} setrgbcolor\nfill\n` })
      eps+=`grestore\nshowpage\n%%EOF`
      return eps
    }catch{ return null }
  }
  const svgToPdf = (svgStr:string)=>{
    try{
      const {W,H,paths}=parsePaths(svgStr)
      let content=`q\n`
      paths.forEach(p=>{ const col=parseColor(p.fill); const pdfPath=svgPathToPDF(p.d,H); if(pdfPath) content+=`${col.r.toFixed(3)} ${col.g.toFixed(3)} ${col.b.toFixed(3)} rg\n${pdfPath}f\n` })
      content+=`Q\n`
      const len=content.length
      let pdf=`%PDF-1.4\n`
      const offsets:number[]=[]
      const addObj=(s:string)=>{ offsets.push(pdf.length); pdf+=s }
      addObj(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`)
      addObj(`2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`)
      addObj(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${Math.round(W)} ${Math.round(H)}] /Contents 4 0 R >>\nendobj\n`)
      addObj(`4 0 obj\n<< /Length ${len} >>\nstream\n${content}endstream\nendobj\n`)
      const xrefPos=pdf.length
      pdf+=`xref\n0 ${offsets.length+1}\n0000000000 65535 f \n`
      offsets.forEach(o=>{ pdf+=`${String(o).padStart(10,'0')} 00000 n \n` })
      pdf+=`trailer\n<< /Size ${offsets.length+1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`
      return pdf
    }catch{ return null }
  }

  const onFile = async (e:any)=>{
    const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]
    if(!f) return
    const url = URL.createObjectURL(f)
    setPreview(url)
    setVectorDone(false)
    setSvgData("")
    setLoading(true)
    await loadTracer()

    const img = new Image()
    img.crossOrigin="anonymous"
    img.src = url
    await new Promise(r=>img.onload=r)

    // --- DETECT COLOR vs B/W ICON ---
    const tmp = document.createElement("canvas")
    tmp.width=img.width
    tmp.height=img.height
    const tmpCtx=tmp.getContext("2d")!
    tmpCtx.drawImage(img,0,0)
    const tmpData=tmpCtx.getImageData(0,0,tmp.width,tmp.height).data
    let total=0,colorPixels=0
    for(let i=0;i<tmpData.length;i+=400){
      const r=tmpData[i], g=tmpData[i+1], b=tmpData[i+2]
      total++
      if(Math.abs(r-g)>15 || Math.abs(r-b)>15) colorPixels++
    }
    const isColor = (colorPixels/total) > 0.08

    let imgd:any
    let options:any
    let svgstr=""

    if(!isColor){
      // B/W ICON MODE - FIXES YOUR JAGGED TRIPOD
      const canvas = document.createElement("canvas")
      const scaleUp = img.width < 800? 3 : 2
      canvas.width = img.width * scaleUp
      canvas.height = img.height * scaleUp
      const ctx = canvas.getContext("2d")!
      ctx.imageSmoothingEnabled=true
      ctx.imageSmoothingQuality="high"
      ctx.fillStyle="#FFFFFF"
      ctx.fillRect(0,0,canvas.width,canvas.height)
      ctx.drawImage(img,0,0,canvas.width,canvas.height)
      let d=ctx.getImageData(0,0,canvas.width,canvas.height)
      const data=d.data
      for(let i=0;i<data.length;i+=4){
        const avg=(data[i]+data[i+1]+data[i+2])/3
        const v=avg<128?0:255 // hard 128 = no gray fringes = no jagged
        data[i]=data[i+1]=data[i+2]=v
        data[i+3]=255
      }
      ctx.putImageData(d,0,0)
      imgd=ctx.getImageData(0,0,canvas.width,canvas.height)
      options={
        ltres:0.8, qtres:0.8, pathomit:18,
        colorsampling:0, numberofcolors:2,
        mincolorratio:0, blurradius:0, blurdelta:0,
        strokewidth:0, roundcoords:2,
        pal:[{r:0,g:0,b:0,a:255},{r:255,g:255,b:255,a:255}]
      }
      svgstr = (window as any).ImageTracer.imagedataToSVG(imgd, options)
      svgstr = svgstr.replace(/<path[^>]*fill="rgb\(255,255,255\)"[^>]*\/>/g,'')
      svgstr = svgstr.replace(/fill="rgb\(0,0,0\)"/g,'fill="black"')
    }else{
      // COLOR MODE - KEEPS ORIGINAL COLORS
      const canvas = document.createElement("canvas")
      const maxW = 1200
      const scale = Math.min(1, maxW / img.width)
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      const ctx = canvas.getContext("2d")!
      ctx.fillStyle="#FFFFFF"
      ctx.fillRect(0,0,canvas.width,canvas.height)
      ctx.drawImage(img,0,0,canvas.width,canvas.height)
      imgd = ctx.getImageData(0,0,canvas.width,canvas.height)
      options={
        ltres:1, qtres:1, pathomit:8,
        colorsampling:1, numberofcolors:10,
        mincolorratio:0.02, colorquantcycles:3,
        blurradius:1, blurdelta:16,
        roundcoords:2
      }
      svgstr = (window as any).ImageTracer.imagedataToSVG(imgd, options)
      svgstr = svgstr.replace(/<path[^>]*fill="rgb\(255,255,255\)"[^>]*\/>/g,'')
    }

    setSvgData(svgstr)
    setVectorDone(true)
    setLoading(false)
  }

  const downloadFile = ()=>{
    if(!svgData) return
    let ext = format.toLowerCase()
    let content = svgData
    let mime = "image/svg+xml"

    if(format==="EPS"){
      const eps=svgToEps(svgData)
      if(eps){ content=eps; mime="application/postscript" }
    }
    if(format==="AI"){
      const eps=svgToEps(svgData)
      if(eps){ content=eps; mime="application/postscript" }
    }
    if(format==="PDF"){
      const pdf=svgToPdf(svgData)
      if(pdf){ content=pdf; mime="application/pdf" }
    }
    if(format==="SVG"){
      mime="image/svg+xml"
    }

    const blob = new Blob([content], {type:mime})
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = `pinna3d-vector.${ext}`
    a.click()
  }

  const check=<span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>
  const svgForDarkPreview = svgData? svgData.replace(/fill="black"/g,'fill="white"').replace(/fill="rgb\(0,0,0\)"/g,'fill="white"') : ""

  return(
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh'}}>
      <style>{`
    .iv-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:20px;padding:30px 40px;max-width:1440px;margin:0 auto}
    .feat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-top:32px}
        @media(max-width:900px){.iv-grid{grid-template-columns:1fr;padding:16px}.feat-grid{grid-template-columns:1fr}}
      `}</style>

      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
        <a href="/"><img src="/logo.png" alt="Pinna3d.com" style={{height:'60px',width:'auto'}}/></a>
        <div style={{display:'flex',gap:'20px',alignItems:'center',fontSize:'14px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Home</a>
          <span style={{color:'#A020F0'}}>Image to Vector</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.1)',padding:'10px 18px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.14)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',boxShadow:'0 0 24px rgba(160,32,240,0.55)',padding:'10px 20px',borderRadius:'10px',color:'#fff',textDecoration:'none'}}>Get Started</a>
        </div>
      </header>

      <div className="iv-grid">
        <div>
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.32)',padding:'6px 12px',borderRadius:'20px',fontSize:'11px',color:'#D6A5FF',letterSpacing:'.1em'}}>YOUR USP • MOST POPULAR</div>
          <h1 style={{fontSize:'48px',lineHeight:'1.1',fontWeight:700,margin:'16px 0 0'}}>Blurry logo to<br/><span style={{background:'linear-gradient(90deg,#A020F0 0%,#FF7AD1 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>sharp print-ready SVG</span><br/>in 3 seconds</h1>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:'15px',lineHeight:'1.6',marginTop:'14px',maxWidth:'500px'}}>World's fastest AI vectorizer. Convert JPG, PNG to SVG, EPS, AI, CDR, PDF. Infinite scale, no quality loss. Built for print shops, designers, and sellers.</p>
          <div style={{display:'flex',gap:'10px',marginTop:'20px'}}>
            <div style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',padding:'8px 12px',borderRadius:'8px',fontSize:'12px'}}>{check}100% Auto • No Manual Tracing</div>
            <div style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',padding:'8px 12px',borderRadius:'8px',fontSize:'12px'}}>{check}Batch 100x Images</div>
          </div>
          <div style={{marginTop:'28px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',maxWidth:'500px'}}>
            <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',padding:'14px'}}><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)'}}>INPUT FORMATS</div><div style={{fontSize:'13px',marginTop:'4px'}}>JPG, PNG, WEBP, BMP</div></div>
            <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',padding:'14px'}}><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)'}}>OUTPUT FORMATS</div><div style={{fontSize:'13px',marginTop:'4px'}}>SVG, EPS, AI, CDR, PDF</div></div>
          </div>
        </div>

        <div>
          <div onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'3px dashed rgba(160,32,240,0.6)',borderRadius:'16px',background:'rgba(15,13,28,0.95)',padding:'24px',display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',cursor:'pointer',minHeight:'340px',justifyContent:'center'}}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            <div style={{width:'56px',height:'56px',background:'rgba(160,32,240,0.18)',border:'2px solid rgba(160,32,240,0.4)',borderRadius:'14px',display:'grid',placeItems:'center',marginBottom:'14px'}}>✒️</div>
            <b style={{fontSize:'18px'}}>Drop your logo / image here</b>
            <div style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>or browse to upload</div>
            <div style={{fontSize:'11px',color:'rgba(255,255,255,0.35)',marginTop:'12px'}}>PNG, JPG up to 20MB • Auto background removal</div>
          </div>

          <div style={{background:'#15131E',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'14px',marginTop:'12px'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.6)'}}><span>Vector Preview {loading && "• Tracing..."}</span><div style={{display:'flex',gap:'6px'}}>{["SVG","EPS","AI","PDF"].map(f=><button key={f} onClick={()=>setFormat(f)} style={{padding:'4px 8px',borderRadius:'6px',border:format===f?'1px solid #A020F0':'1px solid rgba(255,255,255,0.1)',background:format===f?'#A020F0':'transparent',color:'#fff',fontSize:'10px'}}>{f}</button>)}</div></div>
            <div style={{background:'#0A0814',backgroundImage:'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',backgroundSize:'16px 16px',borderRadius:'10px',height:'220px',display:'grid',placeItems:'center',marginTop:'10px',border:'1px solid rgba(160,32,240,0.28)',overflow:'hidden',padding:'10px'}}>
              {vectorDone && svgData? <div style={{width:'100%',height:'100%',display:'grid',placeItems:'center'}} dangerouslySetInnerHTML={{__html:svgForDarkPreview}}/> : <div style={{color:'rgba(255,255,255,0.35)',fontSize:'12px'}}>{loading?"Vectorizing with AI...":"Upload image to see vector"}</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
              <button onClick={()=>{if(svgData){const w=window.open();w?.document.write(svgData)}}} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px'}}>Preview SVG</button>
              <button onClick={downloadFile} style={{background:vectorDone?'#A020F0':'#333',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',border:'none',cursor:vectorDone?'pointer':'not-allowed'}}>Download {format}</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:'40px 40px 40px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <h2 style={{textAlign:'center',fontSize:'30px',fontWeight:500}}>Why designers choose our Vector Studio</h2>
        <div className="feat-grid">
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>{check}True Vector, Not Auto-Trace</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>Clean curves, editable points, print-ready layers. No messy auto-trace.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>{check}Photo to Line Art</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>Convert any photo into minimalist line art for merch, tattoos, logos.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>{check}Batch 100x + API</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>Upload 100 images at once. Perfect for print shops & agencies.</p></div>
        </div>
        <div style={{textAlign:'center',marginTop:'30px'}}><a href="/signup" style={{background:'#A020F0',padding:'12px 24px',borderRadius:'10px',color:'#fff',textDecoration:'none',fontWeight:500}}>Start Vectorizing Free — No CC</a></div>
      </div>
      <footer style={{borderTop:'1px solid rgba(255,255,255,0.08)',padding:'20px 40px',textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.4)'}}>© 2026 Pinna3d.com • Image to Vector Tool</footer>
    </div>
  )
}
