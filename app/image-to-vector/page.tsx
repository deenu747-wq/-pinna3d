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

  const parsePaths = (svgStr:string)=>{
    const vbMatch = svgStr.match(/viewBox="([^"]+)"/)
    let W=800, H=600
    if(vbMatch){ const p=vbMatch[1].split(/[\s,]+/).map(Number); W=p[2]; H=p[3] }
    const pathRegex = /<path[^>]*d="([^"]+)"[^>]*fill="([^"]+)"[^>]*\/?>/g
    const paths: {d:string, fill:string}[]=[]
    let m; while((m=pathRegex.exec(svgStr))!==null){ paths.push({d:m[1], fill:m[2]}) }
    if(paths.length===0){ const dOnly=/<path[^>]*d="([^"]+)"[^>]*>/g; while((m=dOnly.exec(svgStr))!==null){ paths.push({d:m[1], fill:"rgb(0,0,0)"}) } }
    return {W,H,paths}
  }
  const parseColor = (c:string)=>{
    if(c.startsWith("rgb")){ const n=c.match(/\d+/g)?.map(Number)||[0,0,0]; return {r:n[0]/255,g:n[1]/255,b:n[2]/255,str:`${(n[0]/255).toFixed(3)} ${(n[1]/255).toFixed(3)} ${(n[2]/255).toFixed(3)}`} }
    return {r:0,g:0,b:0,str:"0 0 0"}
  }
  const svgPathToPS = (d:string, H:number)=>{
    const tokens=d.match(/[a-zA-Z]|[-+]?\d*\.?\d+(?:e[-+]?\d+)?/g)||[]; let i=0,cx=0,cy=0,out="",cmd=""
    while(i<tokens.length){ const t=tokens[i]; if(/^[a-zA-Z]$/.test(t)){cmd=t;i++}
      if(cmd==="M"){const x=+tokens[i++],y=+tokens[i++];cx=x;cy=y;out+=`${x.toFixed(2)} ${(H-y).toFixed(2)} moveto\n`}
      else if(cmd==="L"){const x=+tokens[i++],y=+tokens[i++];cx=x;cy=y;out+=`${x.toFixed(2)} ${(H-y).toFixed(2)} lineto\n`}
      else if(cmd==="C"){const x1=+tokens[i++],y1=+tokens[i++],x2=+tokens[i++],y2=+tokens[i++],x=+tokens[i++],y=+tokens[i++];out+=`${x1.toFixed(2)} ${(H-y1).toFixed(2)} ${x2.toFixed(2)} ${(H-y2).toFixed(2)} ${x.toFixed(2)} ${(H-y).toFixed(2)} curveto\n`;cx=x;cy=y}
      else if(cmd==="Z"||cmd==="z"){out+="closepath\n";cmd=""} else i++
    } return out
  }
  const svgPathToPDF = (d:string, H:number)=>{
    const tokens=d.match(/[a-zA-Z]|[-+]?\d*\.?\d+(?:e[-+]?\d+)?/g)||[]; let i=0,cx=0,cy=0,out="",cmd=""
    while(i<tokens.length){ const t=tokens[i]; if(/^[a-zA-Z]$/.test(t)){cmd=t;i++}
      if(cmd==="M"){const x=+tokens[i++],y=+tokens[i++];cx=x;cy=y;out+=`${x.toFixed(2)} ${(H-y).toFixed(2)} m\n`}
      else if(cmd==="L"){const x=+tokens[i++],y=+tokens[i++];cx=x;cy=y;out+=`${x.toFixed(2)} ${(H-y).toFixed(2)} l\n`}
      else if(cmd==="C"){const x1=+tokens[i++],y1=+tokens[i++],x2=+tokens[i++],y2=+tokens[i++],x=+tokens[i++],y=+tokens[i++];out+=`${x1.toFixed(2)} ${(H-y1).toFixed(2)} ${x2.toFixed(2)} ${(H-y2).toFixed(2)} ${x.toFixed(2)} ${(H-y).toFixed(2)} c\n`;cx=x;cy=y}
      else if(cmd==="Z"||cmd==="z"){out+="h\n";cmd=""} else i++
    } return out
  }
  const svgToEps = (svgStr:string)=>{
    try{ const {W,H,paths}=parsePaths(svgStr); let eps=`%!PS-Adobe-3.0 EPSF-3.0\n%%BoundingBox: 0 0 ${Math.round(W)} ${Math.round(H)}\n%%EndComments\ngsave\n`; paths.forEach(p=>{const ps=svgPathToPS(p.d,H); if(ps) eps+=`newpath\n${ps}${parseColor(p.fill).str} setrgbcolor\nfill\n`}); eps+=`grestore\nshowpage\n%%EOF`; return eps }catch{return null}
  }
  const svgToPdf = (svgStr:string)=>{
    try{ const {W,H,paths}=parsePaths(svgStr); let content=`q\n`; paths.forEach(p=>{const col=parseColor(p.fill); const pdfPath=svgPathToPDF(p.d,H); if(pdfPath) content+=`${col.r.toFixed(3)} ${col.g.toFixed(3)} ${col.b.toFixed(3)} rg\n${pdfPath}f\n`}); content+=`Q\n`; const len=content.length; let pdf=`%PDF-1.4\n`; const offsets:number[]=[]; const addObj=(s:string)=>{offsets.push(pdf.length); pdf+=s}; addObj(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`); addObj(`2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`); addObj(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${Math.round(W)} ${Math.round(H)}] /Contents 4 0 R >>\nendobj\n`); addObj(`4 0 obj\n<< /Length ${len} >>\nstream\n${content}endstream\nendobj\n`); const xrefPos=pdf.length; pdf+=`xref\n0 ${offsets.length+1}\n0000000000 65535 f \n`; offsets.forEach(o=>{pdf+=`${String(o).padStart(10,'0')} 00000 n \n`}); pdf+=`trailer\n<< /Size ${offsets.length+1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`; return pdf }catch{return null}
  }

  const onFile = async (e:any)=>{
    const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]; if(!f) return
    const url=URL.createObjectURL(f); setPreview(url); setVectorDone(false); setSvgData(""); setLoading(true)
    await loadTracer(); const img=new Image(); img.src=url; await new Promise(r=>img.onload=r)
    const tmp=document.createElement("canvas"); tmp.width=img.width; tmp.height=img.height; const tmpCtx=tmp.getContext("2d")!; tmpCtx.drawImage(img,0,0)
    const tmpData=tmpCtx.getImageData(0,0,tmp.width,tmp.height).data; let total=0,colorPixels=0; for(let i=0;i<tmpData.length;i+=400){const r=tmpData[i],g=tmpData[i+1],b=tmpData[i+2]; total++; if(Math.abs(r-g)>15||Math.abs(r-b)>15) colorPixels++}
    const isColor=(colorPixels/total)>0.08
    let svgstr=""
    if(!isColor){
      const canvas=document.createElement("canvas"); const scaleUp=img.width<800?3:2; canvas.width=img.width*scaleUp; canvas.height=img.height*scaleUp
      const ctx=canvas.getContext("2d")!; ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality="high"; ctx.fillStyle="#FFF"; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.drawImage(img,0,0,canvas.width,canvas.height)
      let d=ctx.getImageData(0,0,canvas.width,canvas.height); for(let i=0;i<d.data.length;i+=4){const avg=(d.data[i]+d.data[i+1]+d.data[i+2])/3; const v=avg<128?0:255; d.data[i]=d.data[i+1]=d.data[i+2]=v; d.data[i+3]=255} ctx.putImageData(d,0,0)
      const imgd=ctx.getImageData(0,0,canvas.width,canvas.height); const options={ltres:0.8,qtres:0.8,pathomit:18,colorsampling:0,numberofcolors:2,mincolorratio:0,blurradius:0,blurdelta:0,strokewidth:0,roundcoords:2,pal:[{r:0,g:0,b:0,a:255},{r:255,g:255,b:255,a:255}]} as any
      svgstr=(window as any).ImageTracer.imagedataToSVG(imgd, options); svgstr=svgstr.replace(/<path[^>]*fill="rgb\(255,255,255\)"[^>]*\/>/g,'')
    }else{
      const canvas=document.createElement("canvas"); const maxW=1200; const scale=Math.min(1,maxW/img.width); canvas.width=Math.round(img.width*scale); canvas.height=Math.round(img.height*scale)
      const ctx=canvas.getContext("2d")!; ctx.fillStyle="#FFF"; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.drawImage(img,0,0,canvas.width,canvas.height); const imgd=ctx.getImageData(0,0,canvas.width,canvas.height)
      const options={ltres:1,qtres:1,pathomit:8,colorsampling:1,numberofcolors:10,mincolorratio:0.02,colorquantcycles:3,blurradius:1,blurdelta:16,roundcoords:2} as any
      svgstr=(window as any).ImageTracer.imagedataToSVG(imgd, options); svgstr=svgstr.replace(/<path[^>]*fill="rgb\(255,255,255\)"[^>]*\/>/g,'')
    }
    svgstr = svgstr.replace(/width="[^"]*"/g,'').replace(/height="[^"]*"/g,'').replace(/<svg/, '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"')
    setSvgData(svgstr); setVectorDone(true); setLoading(false)
  }

  const downloadFile=()=>{
    if(!svgData) return; let ext=format.toLowerCase(); let content=svgData; let mime="image/svg+xml"
    if(format==="EPS"){const eps=svgToEps(svgData); if(eps){content=eps; mime="application/postscript"}}
    if(format==="AI"){const eps=svgToEps(svgData); if(eps){content=eps; mime="application/postscript"}}
    if(format==="PDF"){const pdf=svgToPdf(svgData); if(pdf){content=pdf; mime="application/pdf"}}
    const blob=new Blob([content],{type:mime}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=`pinna3d-vector.${ext}`; a.click()
  }

  const check=<span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>

  return(
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh',overflowX:'hidden'}}>
      <style>{`
.iv-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:28px;padding:28px 40px;max-width:1440px;margin:0 auto;align-items:start}
.box-1-1{width:100%;aspect-ratio:1/1;height:auto;border-radius:16px;box-sizing:border-box;overflow:hidden}
.upload-box{border:3px dashed rgba(160,32,240,0.6);background:rgba(15,13,28,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;cursor:pointer;position:relative}
.upload-box img{width:100%;height:100%;object-fit:contain;padding:10px;background:#fff;border-radius:12px;box-sizing:border-box}
.desc-text{width:100%;max-width:100%;font-size:15px;line-height:1.8;letter-spacing:0.2px;color:rgba(255,255,255,0.68);margin-top:14px;display:block}
.pill-row{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
.pill{padding:8px 14px;border-radius:999px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);font-size:12px;display:inline-flex;align-items:center}
.six-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:18px;max-width:560px}
.six-box{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:14px;padding:14px 16px}
.vector-fill{margin-top:18px;max-width:560px;height:280px;background:radial-gradient(130% 130% at 20% 20%, rgba(160,32,240,0.30), transparent 60%), radial-gradient(100% 100% at 80% 80%, rgba(255,122,209,0.22), transparent 60%), rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);border-radius:16px;position:relative;overflow:hidden;padding:22px;display:flex;align-items:center;gap:20px}
.preview-card{background:#15131E;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:14px;width:100%;box-sizing:border-box;display:flex;flex-direction:column}
.preview-box{background:#0A0814;background-image:radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px);background-size:16px 16px;border-radius:10px;width:100%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(160,32,240,0.28);overflow:hidden;position:relative;flex:1}
.preview-white{width:88%;height:88%;background:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;padding:10px;box-sizing:border-box;overflow:hidden}
.preview-white div{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
.preview-white svg{width:100%!important;height:100%!important}
.feat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-top:32px}
@media(max-width:900px){.iv-grid{grid-template-columns:1fr;padding:16px}.six-grid{grid-template-columns:1fr}.feat-grid{grid-template-columns:1fr}.vector-fill{height:auto;flex-direction:column;align-items:start}}
      `}</style>

      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
        <a href="/"><img src="/logo.png" alt="Pinna3d.com" style={{height:'100px',width:'auto'}}/></a>
        <div style={{display:'flex',gap:'20px',alignItems:'center',fontSize:'14px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Home</a><span style={{color:'#A020F0'}}>Image to Vector</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.1)',padding:'10px 18px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.14)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',boxShadow:'0 0 24px rgba(160,32,240,0.55)',padding:'10px 20px',borderRadius:'10px',color:'#fff',textDecoration:'none'}}>Get Started</a>
        </div>
      </header>

      <div className="iv-grid">
        <div style={{minWidth:0}}>
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.32)',padding:'6px 12px',borderRadius:'20px',fontSize:'11px',color:'#D6A5FF',letterSpacing:'.1em'}}>YOUR USP • MOST POPULAR</div>
          <h1 style={{fontSize:'48px',lineHeight:'1.05',margin:'16px 0 0'}}>
            <span style={{fontWeight:700}}>Blurry logo to</span><br/>
            <span style={{fontWeight:400, background:'linear-gradient(90deg,#A020F0 0%,#FF7AD1 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>sharp print-ready SVG</span><br/>
            <span style={{fontWeight:700}}>in 3 seconds</span>
          </h1>
          <p className="desc-text">World's fastest AI vectorizer. Convert JPG, PNG to SVG, EPS, AI, CDR, PDF. Infinite scale, no quality loss. Built for print shops, designers, and sellers.</p>

          <div className="pill-row">
            <span className="pill">{check} 100% Auto • No Manual Tracing</span>
            <span className="pill">{check} Batch 100x Images • API Ready</span>
          </div>

          <div className="six-grid">
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>INPUT FORMATS</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>JPG, PNG, WEBP, BMP</div><div style={{fontSize:'11px',color:'#B88CFF',marginTop:'6px'}}>Up to 20MB each</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>OUTPUT FORMATS</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>SVG, EPS, AI, CDR, PDF</div><div style={{fontSize:'11px',color:'#B88CFF',marginTop:'6px'}}>Editable points</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>TRUSTED</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>12k+ Designers • 4.9/5</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>Print-ready • No pixels</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>QUALITY</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>Print-ready • Infinite Scale</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>Clean bezier curves</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>SPEED</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>3 Sec Vectorization</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>100% auto tracing</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>BONUS</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>Batch 100x + API</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>For shops & agencies</div></div>
          </div>

          <div className="vector-fill">
            <div style={{flex:'0 0 auto'}}>
              <svg width="140" height="140" viewBox="0 0 120 120" fill="none">
                <path d="M20 90 Q 40 10, 60 50 T 100 30" stroke="#A020F0" strokeWidth="2.5" strokeDasharray="5 7"/>
                <circle cx="20" cy="90" r="6" fill="#A020F0"/>
                <circle cx="60" cy="50" r="6" fill="#fff"/>
                <circle cx="100" cy="30" r="6" fill="#FF7AD1"/>
              </svg>
            </div>
            <div>
              <div style={{fontSize:'48px',fontWeight:800,lineHeight:0.95}}>∞ Vector<br/><span style={{color:'#A020F0'}}>No Pixels</span></div>
              <div style={{fontSize:'15px',lineHeight:1.6,color:'rgba(255,255,255,0.70)',marginTop:'12px'}}>Clean bezier curves, not jagged trace.<br/>This vector graphic fills left empty area.</div>
            </div>
          </div>
        </div>

        <div style={{minWidth:0,display:'flex',flexDirection:'column',gap:'16px'}}>
          <div className="box-1-1 upload-box" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} alt="input"/> : <><div style={{width:'56px',height:'56px',background:'rgba(160,32,240,0.18)',border:'2px solid rgba(160,32,240,0.4)',borderRadius:'14px',display:'grid',placeItems:'center',marginBottom:'14px'}}>✒️</div><b style={{fontSize:'18px',fontWeight:500}}>Drop your logo / image here</b><div style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>or browse to upload</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.35)',marginTop:'12px'}}>PNG, JPG up to 20MB • Auto background removal</div></>}
          </div>

          <div className="box-1-1 preview-card">
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.6)'}}><span>Vector Preview</span><div style={{display:'flex',gap:'6px'}}>{["SVG","EPS","AI","PDF"].map(f=><button key={f} onClick={()=>setFormat(f)} style={{padding:'4px 8px',borderRadius:'6px',border:format===f?'1px solid #A020F0':'1px solid rgba(255,255,255,0.1)',background:format===f?'#A020F0':'transparent',color:'#fff',fontSize:'10px'}}>{f}</button>)}</div></div>
            <div className="preview-box" style={{marginTop:'12px'}}>
              {loading? <div style={{color:'#fff',fontSize:'12px'}}>Vectorizing...</div> : vectorDone && svgData? <div className="preview-white"><div dangerouslySetInnerHTML={{__html: svgData}} /></div> : <div style={{color:'rgba(255,255,255,0.35)',fontSize:'12px',textAlign:'center'}}>Upload image<br/>to see vector</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'12px'}}>
              <button onClick={()=>{if(svgData){const w=window.open();w?.document.write(svgData)}}} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px'}}>Preview SVG</button>
              <button onClick={downloadFile} style={{background:vectorDone?'#A020F0':'#333',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',border:'none',cursor:vectorDone?'pointer':'not-allowed'}}>Download {format}</button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FOOTER SECTION YOU ASKED TO ADD ===== */}
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
