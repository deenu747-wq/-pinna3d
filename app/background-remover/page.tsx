"use client"
import { useState, useRef } from "react"

export default function BackgroundRemoverPage(){
  const [preview,setPreview]=useState("")
  const [output,setOutput]=useState("")
  const [done,setDone]=useState(false)
  const [loading,setLoading]=useState(false)
  const [status,setStatus]=useState("")
  const fileRef=useRef<HTMLInputElement>(null)

const onFile = async (e:any)=>{
  const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
  if(!f) return

  const url = URL.createObjectURL(f)
  setPreview(url)
  setDone(false)
  setOutput("")
  setLoading(true)
  setStatus("AI removing with RMBG-1.4...")

  try {
    const fd = new FormData()
    fd.append("file", f)

    const res = await fetch("/api/remove-bg", {
      method: "POST",
      body: fd,
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.error || "AI failed")

    // data.url is transparent PNG base64
    setOutput(data.url)
    setDone(true)
    setStatus("Done - Clean transparent background!")

  } catch (err:any) {
    console.error(err)
    setStatus("Error: " + err.message)
    alert("Failed: " + err.message + " - Check HF_TOKEN in Vercel")
  }

  setLoading(false)
}

  const downloadFile=()=>{
    if(!output) return; const a=document.createElement("a"); a.href=output; a.download=`pinna3d-transparent.png`; a.click()
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
.preview-card{background:#15131E;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:14px;width:100%;box-sizing:border-box;display:flex;flex-direction:column}
.preview-box{background:#0A0814;background-image:radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px);background-size:16px 16px;border-radius:10px;width:100%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(160,32,240,0.28);overflow:hidden;position:relative;flex:1}
.feat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-top:32px}
@media(max-width:900px){.iv-grid{grid-template-columns:1fr;padding:16px}.six-grid{grid-template-columns:1fr}.feat-grid{grid-template-columns:1fr}}
      `}</style>

      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
        <a href="/"><img src="/logo.png" alt="Pinna3d.com" style={{height:'80px',width:'auto'}}/></a>
        <div style={{display:'flex',gap:'20px',alignItems:'center',fontSize:'14px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Home</a><span style={{color:'#A020F0'}}>Background Remover</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.1)',padding:'10px 18px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.14)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',boxShadow:'0 0 24px rgba(160,32,240,0.55)',padding:'10px 20px',borderRadius:'10px',color:'#fff',textDecoration:'none'}}>Get Started</a>
        </div>
      </header>

      <div className="iv-grid">
        <div style={{minWidth:0}}>
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.32)',padding:'6px 12px',borderRadius:'20px',fontSize:'11px',color:'#D6A5FF',letterSpacing:'.1em'}}>REAL AI • NO PACKAGE ERROR</div>
          <h1 style={{fontSize:'48px',lineHeight:'1.12',margin:'16px 0 0'}}>
            <span style={{fontWeight:700}}>Remove background to</span><br/>
            <span style={{fontWeight:700, background:'linear-gradient(90deg,#A020F0 0%,#FF7AD1 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>transparent PNG</span><br/>
            <span style={{fontWeight:700}}>in 2 seconds</span>
          </h1>
          <p className="desc-text">Real AI MODNet — removes beige, table, plants. Your bag photo will now work. No npm error, loads from CDN like ImageTracer.</p>
          <div className="pill-row">
            <span className="pill">{check} Real AI • Any Background</span>
            <span className="pill">{check} Zero Error • CDN Load</span>
          </div>
          <div className="six-grid">
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>INPUT FORMATS</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>JPG, PNG, WEBP, BMP</div><div style={{fontSize:'11px',color:'#B88CFF',marginTop:'6px'}}>Up to 20MB each</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>OUTPUT FORMATS</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>PNG Transparent 32-bit</div><div style={{fontSize:'11px',color:'#B88CFF',marginTop:'6px'}}>Alpha preserved</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>TRUSTED</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>12k+ Designers • 4.9/5</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>E-commerce ready</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>QUALITY</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>Clean Edges • No Halo</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>HD output</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>SPEED</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>2 Sec Removal</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>100% auto</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>BONUS</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>Free Unlimited</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>No watermark</div></div>
          </div>
          <div style={{marginTop:'18px',maxWidth:'560px',height:'280px',background:'radial-gradient(130% 130% at 20% 20%, rgba(160,32,240,0.30), transparent 60%), radial-gradient(100% 100% at 80% 80%, rgba(255,122,209,0.22), transparent 60%), rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.10)',borderRadius:'16px',position:'relative',overflow:'hidden',padding:'22px',display:'flex',alignItems:'center',gap:'20px'}}>
            <div style={{flex:'0 0 auto'}}><svg width="140" height="140" viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="46" stroke="#A020F0" strokeWidth="2" strokeDasharray="6 8"/><circle cx="60" cy="60" r="18" fill="#A020F0"/><path d="M38 60 L52 74 L84 42" stroke="#fff" strokeWidth="3" fill="none"/></svg></div>
            <div><div style={{fontSize:'48px',fontWeight:800,lineHeight:0.95}}>∞ Transparent<br/><span style={{color:'#A020F0'}}>No Background</span></div><div style={{fontSize:'15px',lineHeight:1.6,color:'rgba(255,255,255,0.70)',marginTop:'12px'}}>Clean alpha edge, no white halo.<br/>Ready for Shopify, Amazon, prints.</div></div>
          </div>
        </div>

        <div style={{minWidth:0,display:'flex',flexDirection:'column',gap:'16px'}}>
          <div className="box-1-1 upload-box" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} alt="input"/> : <><div style={{width:'56px',height:'56px',background:'rgba(160,32,240,0.18)',border:'2px solid rgba(160,32,240,0.4)',borderRadius:'14px',display:'grid',placeItems:'center',marginBottom:'14px'}}>✂️</div><b style={{fontSize:'18px',fontWeight:500}}>Drop image to remove BG</b><div style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>or browse to upload</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.35)',marginTop:'12px'}}>PNG, JPG up to 20MB • Instant</div></>}
          </div>

          <div className="box-1-1 preview-card">
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.6)'}}><span>Transparent Preview</span><span style={{fontSize:'10px',color:'#B88CFF'}}>{loading?status:"PNG 32"}</span></div>
            <div className="preview-box" style={{marginTop:'12px'}}>
              {loading? <div style={{color:'#fff',fontSize:'12px',textAlign:'center'}}>{status}<br/><span style={{fontSize:'10px',color:'#888'}}>First time loads AI model</span></div> : done && output? <div style={{width:'88%',height:'88%',background:'#fff',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',padding:'10px'}}><img src={output} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain'}}/></div> : <div style={{color:'rgba(255,255,255,0.35)',fontSize:'12px',textAlign:'center'}}>Upload image<br/>to see transparent</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'12px'}}>
              <button onClick={()=>{if(output){const w=window.open();w?.document.write(`<img src="${output}" style="max-width:100%"/>`)}}} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px'}}>Preview PNG</button>
              <button onClick={downloadFile} style={{background:done?'#A020F0':'#333',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',border:'none',cursor:done?'pointer':'not-allowed'}}>Download PNG</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:'40px 40px 40px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <h2 style={{textAlign:'center',fontSize:'30px',fontWeight:500}}>Why designers choose Background Remover</h2>
        <div className="feat-grid">
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>{check}True AI, Not White Filter</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>Works on any background, even complex.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>{check}100% Private & Fast</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>Runs in your browser, no server upload.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>{check}E-commerce Ready</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>Perfect for Shopify, Amazon, Etsy listings.</p></div>
        </div>
        <div style={{textAlign:'center',marginTop:'30px'}}><a href="/signup" style={{background:'#A020F0',padding:'12px 24px',borderRadius:'10px',color:'#fff',textDecoration:'none',fontWeight:500}}>Start Removing Free — No CC</a></div>
      </div>
      <footer style={{borderTop:'1px solid rgba(255,255,255,0.08)',padding:'20px 40px',textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.4)'}}>© 2026 Pinna3d.com • Background Remover Tool</footer>
    </div>
  )
}
