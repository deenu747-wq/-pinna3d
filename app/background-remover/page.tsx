"use client"
import { useState, useRef, useEffect } from "react"

type BgMode = "transparent" | "white" | "black"

export default function BackgroundRemoverPage(){
  const [preview,setPreview]=useState("")
  const [output,setOutput]=useState("") // transparent blob URL
  const [finalUrl,setFinalUrl]=useState("") // composited URL
  const [done,setDone]=useState(false)
  const [loading,setLoading]=useState(false)
  const [status,setStatus]=useState("")
  const [bg,setBg]=useState<BgMode>("transparent")
  const [format,setFormat]=useState("png-transparent")
  const fileRef=useRef<HTMLInputElement>(null)
  const imgRef=useRef<HTMLImageElement>(null)

  const checkerStyle = {
    backgroundColor: '#1a1a1a',
    backgroundImage: `linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)`,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  } as const

  const whiteBg = { background: '#ffffff' } as const
  const blackBg = { background: '#0a0a0a' } as const

  const getBgStyle = () => {
    if(!done) return { background: '#0A0814', backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '16px 16px' }
    if(bg === "transparent") return checkerStyle
    if(bg === "white") return whiteBg
    if(bg === "black") return blackBg
    return checkerStyle
  }

  // Create final composite image for download/preview
  const buildFinal = async (mode: BgMode, fmt: string) => {
    if(!output) return
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = output
    await new Promise(r => { img.onload = r as any; img.onerror = r as any })
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth || 1000
    canvas.height = img.naturalHeight || 1000
    const ctx = canvas.getContext('2d')!

    if(fmt.includes('white') || mode === 'white'){
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0,0,canvas.width,canvas.height)
    } else if(mode === 'black'){
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0,0,canvas.width,canvas.height)
    }
    // transparent = don't fill

    ctx.drawImage(img,0,0)

    let mime = "image/png"
    if(fmt.startsWith('jpg') || fmt.startsWith('jpeg')) mime = "image/jpeg"
    if(fmt.startsWith('webp')) mime = "image/webp"

    const quality = mime === "image/jpeg"? 0.92 : undefined
    const url = canvas.toDataURL(mime, quality)
    setFinalUrl(url)
  }

  useEffect(()=>{ if(done) buildFinal(bg, format) }, [bg, format, done, output])

  const onFile = async (e:any)=>{
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    const url = URL.createObjectURL(f)
    setPreview(url)
    setDone(false)
    setOutput("")
    setFinalUrl("")
    setLoading(true)
    setStatus("AI is cutting edges...")

    try {
      const fd = new FormData()
      fd.append('file', f)
      const res = await fetch('/api/remove-bg', { method: 'POST', body: fd })
      if(!res.ok){
        const j = await res.json().catch(()=>({error:'API failed'}))
        throw new Error(j.error || 'API failed')
      }
      const blob = await res.blob()
      const outUrl = URL.createObjectURL(blob)
      setOutput(outUrl)
      setDone(true)
      setBg("transparent")
      setFormat("png-transparent")
      setStatus("Done — pick background")
    } catch(err:any){
      setStatus("Error: "+err.message)
    }
    setLoading(false)
  }

  const downloadFile=()=>{
    if(!finalUrl &&!output) return;
    const a=document.createElement("a");
    a.href=finalUrl || output;
    const ext = format === "jpg-white"? "jpg" : format.startsWith("webp")? "webp" : "png"
    const bgName = bg === "transparent"? "transparent" : bg
    a.download=`pinna3d-${bgName}.${ext}`;
    a.click()
  }

  const check=<span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>

  return(
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh',overflowX:'hidden'}}>
      <style>{`
.iv-grid{display:grid;grid-template-columns:1.15fr 0.85fr;gap:28px;padding:28px 24px;max-width:1440px;margin:0 auto;align-items:start}
.left-col{display:flex;flex-direction:column;min-width:0;min-height:760px}
.box-1-1{width:82%;aspect-ratio:1/1;border-radius:16px;box-sizing:border-box;overflow:hidden;flex-shrink:0;margin-left:auto}
.upload-box{border:3px dashed rgba(160,32,240,0.6);background:rgba(15,13,28,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;cursor:pointer;position:relative}
.upload-box img{width:100%;height:100%;object-fit:contain;padding:10px;background:rgba(15,13,28,0.95);border-radius:12px;box-sizing:border-box}
.desc-text{width:100%;max-width:100%;font-size:15px;line-height:1.7;letter-spacing:0.2px;color:rgba(255,255,255,0.70);margin-top:12px;display:block}
.pill-row{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
.pill{padding:8px 14px;border-radius:999px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);font-size:12px;display:inline-flex;align-items:center}
.six-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:18px;max-width:560px}
.six-box{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:14px;padding:14px 16px}
.preview-card{background:#15131E;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:14px;width:82%;aspect-ratio:1/1;box-sizing:border-box;display:flex;flex-direction:column;flex-shrink:0;margin-left:auto}
.preview-box{border-radius:10px;width:100%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(160,32,240,0.28);overflow:hidden;position:relative;flex:1;transition:background 0.2s}
.feat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-top:32px}
.bg-btn{padding:8px 12px;border-radius:8px;font-size:11px;font-weight:600;cursor:pointer;border:1px solid rgba(255,255,255,0.12);transition:all 0.15s}
.bg-btn.active{background:#A020F0;border-color:#A020F0;color:#fff;box-shadow:0 0 12px rgba(160,32,240,0.5)}
.bg-btn.idle{background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.7)}
@media(max-width:900px){.iv-grid{grid-template-columns:1fr;padding:16px}.left-col{min-height:auto}.six-grid{grid-template-columns:1fr}.feat-grid{grid-template-columns:1fr}.box-1-1,.preview-card{width:100%;aspect-ratio:1/1;margin-left:0}}
      `}</style>

      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 24px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
        <a href="/" style={{marginLeft:'-8px'}}><img src="/logo.png" alt="Pinna3d.com" style={{height:'80px',width:'auto'}}/></a>
        <div style={{display:'flex',gap:'20px',alignItems:'center',fontSize:'14px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Home</a><span style={{color:'#A020F0'}}>Background Remover</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.1)',padding:'10px 18px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.14)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',boxShadow:'0 0 24px rgba(160,32,240,0.55)',padding:'10px 20px',borderRadius:'10px',color:'#fff',textDecoration:'none'}}>Get Started</a>
        </div>
      </header>

      <div className="iv-grid">
        <div className="left-col">
          <div>
            <div style={{display:'inline-flex',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.32)',padding:'6px 12px',borderRadius:'20px',fontSize:'11px',color:'#D6A5FF',letterSpacing:'.1em'}}>STUDIO AI • PIXEL PERFECT ALPHA</div>
            <h1 style={{fontSize:'48px',lineHeight:'1.08',margin:'16px 0 0'}}>
              <span style={{fontWeight:700}}>Product shots to</span><br/>
              <span style={{fontWeight:700, background:'linear-gradient(90deg,#A020F0 0%,#FF7AD1 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>clean alpha PNG</span><br/>
              <span style={{fontWeight:700}}>in 2 seconds</span>
            </h1>
            <p className="desc-text">Not a white filter. Our generative edge model detects hair, shadows & semi-transparency. Real checker = real alpha you can trust for Shopify, ads & prints.</p>
            <div className="pill-row">
              <span className="pill">{check} Hair-level Edge Cut</span>
              <span className="pill">{check} No Halo • No Spill</span>
            </div>
            <div className="six-grid">
              <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>INPUT FORMATS</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>JPG, PNG, WEBP, HEIC</div><div style={{fontSize:'11px',color:'#B88CFF',marginTop:'6px'}}>Up to 20MB • Batch ready</div></div>
              <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>OUTPUT FORMATS</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>PNG Transparent, PNG White, JPG, WEBP</div><div style={{fontSize:'11px',color:'#B88CFF',marginTop:'6px'}}>You choose background</div></div>
              <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>TRUSTED BY</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>50k+ Sellers • 4.9/5</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>Amazon, Etsy, Shopify</div></div>
              <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>EDGE QUALITY</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>Feathered • No Jagged Cut</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>HD & 4K preserved</div></div>
              <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>SPEED</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>~1.8s Average</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>GPU accelerated</div></div>
              <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>EXPORT</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>Free • No Watermark</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>Unlimited cuts</div></div>
            </div>
          </div>

          {/* MOVED TO BOTTOM - aligned with right column */}
          <div style={{marginTop:'auto',paddingTop:'24px',maxWidth:'560px',height:'280px',background:'radial-gradient(130% 130% at 20% 20%, rgba(160,32,240,0.30), transparent 60%), radial-gradient(100% 100% at 80% 80%, rgba(255,122,209,0.22), transparent 60%), rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.10)',borderRadius:'16px',position:'relative',overflow:'hidden',padding:'22px',display:'flex',alignItems:'center',gap:'20px'}}>
            <div style={{flex:'0 0 auto'}}><svg width="140" height="140" viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="46" stroke="#A020F0" strokeWidth="2" strokeDasharray="6 8"/><circle cx="60" cy="60" r="18" fill="#A020F0"/><path d="M38 60 L52 74 L84 42" stroke="#fff" strokeWidth="3" fill="none"/></svg></div>
            <div><div style={{fontSize:'44px',fontWeight:800,lineHeight:0.95}}>∞ True Alpha<br/><span style={{color:'#A020F0'}}>Zero Halo</span></div><div style={{fontSize:'14px',lineHeight:1.6,color:'rgba(255,255,255,0.70)',marginTop:'10px'}}>Edge feathering + decontamination.<br/>Put it on any color, it still looks cut.</div></div>
          </div>
        </div>

        <div style={{minWidth:0,display:'flex',flexDirection:'column',gap:'16px',alignItems:'flex-end'}}>
          <div className="box-1-1 upload-box" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} alt="input"/> : <><div style={{width:'56px',height:'56px',background:'rgba(160,32,240,0.18)',border:'2px solid rgba(160,32,240,0.4)',borderRadius:'14px',display:'grid',placeItems:'center',marginBottom:'14px'}}>✂️</div><b style={{fontSize:'18px',fontWeight:500}}>Drop image to remove BG</b><div style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>or browse to upload</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.35)',marginTop:'12px'}}>PNG, JPG up to 20MB • Instant</div></>}
          </div>

          <div className="preview-card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'12px',color:'rgba(255,255,255,0.6)'}}>
              <span>{bg === "transparent"? "✓ Transparent Proof" : bg === "white"? "White Background" : "Black Background"}</span>
              <span style={{fontSize:'10px',color:'#B88CFF'}}>{loading?status:format.toUpperCase()}</span>
            </div>

            {/* BACKGROUND SELECTOR */}
            <div style={{display:'flex',gap:'6px',marginTop:'10px'}}>
              <button className={`bg-btn ${bg==="transparent"?"active":"idle"}`} onClick={()=>{setBg("transparent"); setFormat("png-transparent")}} >⬜ Transparent</button>
              <button className={`bg-btn ${bg==="white"?"active":"idle"}`} onClick={()=>{setBg("white"); setFormat("jpg-white")}} >🤍 White BG</button>
              <button className={`bg-btn ${bg==="black"?"active":"idle"}`} onClick={()=>{setBg("black"); setFormat("png-white")}} >🖤 Black BG</button>
            </div>

            <div className="preview-box" style={{marginTop:'10px',...getBgStyle()}}>
              {loading? <div style={{color:'#fff',fontSize:'12px',textAlign:'center',zIndex:2,background:'rgba(0,0,0,0.6)',padding:'10px 14px',borderRadius:'8px'}}>{status}</div> : done && (finalUrl || output)? <img ref={imgRef} src={finalUrl || output} style={{maxWidth:'90%',maxHeight:'90%',objectFit:'contain', position:'relative', zIndex:2, filter: bg==='transparent'? 'drop-shadow(0 8px 24px rgba(0,0,0,0.8))' : 'none'}} alt="result"/> : <div style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',textAlign:'center',zIndex:2}}>Upload image<br/>to see result</div>}
            </div>

            {/* FORMAT SELECTOR */}
            <div style={{display:'flex',gap:'6px',marginTop:'10px'}}>
              <select value={format} onChange={e=>setFormat(e.target.value)} style={{flex:1,background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',color:'#fff',padding:'8px',borderRadius:'8px',fontSize:'11px'}}>
                <option value="png-transparent" style={{color:'#000'}}>PNG - Transparent (32-bit)</option>
                <option value="png-white" style={{color:'#000'}}>PNG - White Background</option>
                <option value="jpg-white" style={{color:'#000'}}>JPG - White Background (e-com)</option>
                <option value="webp-transparent" style={{color:'#000'}}>WEBP - Transparent</option>
                <option value="webp-white" style={{color:'#000'}}>WEBP - White</option>
              </select>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
              <button onClick={()=>{
                if(!output) return;
                const html = `<html><head><title>Proof</title></head><body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background-color:${bg==='white'?'#ffffff':bg==='black'?'#0a0a0a':'#1a1a1a'};${bg==='transparent'?'background-image:linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%);background-size:20px 20px;background-position:0 0, 0 10px, 10px -10px, -10px 0px;':''}"><img src="${finalUrl || output}" style="max-width:90vw;max-height:90vh;${bg==='transparent'?'filter:drop-shadow(0 8px 32px rgba(0,0,0,0.8))':''}"/></body></html>`;
                const w=window.open(); w?.document.write(html);
              }} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',cursor:'pointer'}}>Preview</button>
              <button onClick={downloadFile} style={{background:done?'#A020F0':'#333',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',border:'none',cursor:done?'pointer':'not-allowed'}}>Download {format.toUpperCase()}</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:'40px 24px 40px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <h2 style={{textAlign:'center',fontSize:'30px',fontWeight:500}}>Built for listings that convert</h2>
        <div className="feat-grid">
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>{check}Not a White Overlay</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>True alpha matte, works on any backdrop.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>{check}One-Click BG Swap</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>Transparent, White for Amazon, Black for luxury.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>{check}Store-Ready Exports</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>JPG, PNG, WEBP — your call, no recompress.</p></div>
        </div>
        <div style={{textAlign:'center',marginTop:'30px'}}><a href="/signup" style={{background:'#A020F0',padding:'12px 24px',borderRadius:'10px',color:'#fff',textDecoration:'none',fontWeight:500}}>Start Cutting Free — No CC</a></div>
      </div>
      <footer style={{borderTop:'1px solid rgba(255,255,255,0.08)',padding:'20px 24px',textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.4)'}}>© 2026 Pinna3d.com • Background Remover Tool</footer>
    </div>
  )
}
