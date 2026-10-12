"use client"
import { useState, useRef } from "react"

export default function BackgroundRemoverPage(){
  const [preview,setPreview]=useState("")
  const [output,setOutput]=useState("")
  const [done,setDone]=useState(false)
  const [loading,setLoading]=useState(false)
  const [status,setStatus]=useState("")
  const fileRef=useRef<HTMLInputElement>(null)
  const [fileObj,setFileObj]=useState<File|null>(null)

const onFile = async (e:any)=>{
  const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
  if(!f) return
  setFileObj(f)
  const url = URL.createObjectURL(f)
  setPreview(url)
  setDone(false)
  setOutput("")
  setLoading(true)
  setStatus("Removing background...")

  // METHOD 1: Try your Vercel API (uses HF_TOKEN) - BEST QUALITY
  try {
    const fd = new FormData()
    fd.append('file', f)
    const res = await fetch('/api/remove-bg', { method: 'POST', body: fd })
    if(!res.ok) throw new Error('API failed')
    const blob = await res.blob()
    const outUrl = URL.createObjectURL(blob)
    setOutput(outUrl)
    setDone(true)
    setStatus("Done - Transparent PNG ready!")
    setLoading(false)
    return
  } catch(err){
    console.log("API fallback to browser AI", err)
    setStatus("API busy, using browser AI (30 sec first time)...")
  }

  // METHOD 2: Fallback to browser AI
  try {
    // @ts-ignore
    const { pipeline, env } = await import(/* webpackIgnore: true */ "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2/+esm")
    env.allowLocalModels = false
    env.allowRemoteModels = true

    setStatus("AI cutting - BiRefNet running...")
    const segmenter = await pipeline('background-removal' as any, 'briaai/RMBG-2.0', {
      // @ts-ignore
      dtype: 'fp32'
    })

    const result:any = await segmenter(url)
    let finalUrl = ""
    if (result && result.toCanvas) {
      finalUrl = result.toCanvas().toDataURL("image/png")
    } else {
      finalUrl = URL.createObjectURL(result)
    }

    setOutput(finalUrl)
    setDone(true)
    setStatus("Done - Transparent PNG ready!")

  } catch(err:any){
    console.error(err)
    setStatus("Failed, trying backup AI...")
    try {
      // @ts-ignore
      const imgly:any = await import(/* webpackIgnore: true */ "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.6.0/+esm")
      const blob:Blob = await imgly.removeBackground(f, { model: 'medium', output:{format:'image/png',quality:1} })
      setOutput(URL.createObjectURL(blob))
      setDone(true)
      setStatus("Done - Backup AI")
    } catch(e2:any){
      setStatus("AI Error: "+e2.message)
    }
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
.preview-box{border-radius:10px;width:100%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(160,32,240,0.28);overflow:hidden;position:relative;flex:1; background-color: #15131E; background-image: linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px; }
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
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.32)',padding:'6px 12px',borderRadius:'20px',fontSize:'11px',color:'#D6A5FF',letterSpacing:'.1em'}}>REAL AI • TRANSPARENT PROOF</div>
          <h1 style={{fontSize:'48px',lineHeight:'1.12',margin:'16px 0 0'}}>
            <span style={{fontWeight:700}}>Remove background to</span><br/>
            <span style={{fontWeight:700, background:'linear-gradient(90deg,#A020F0 0%,#FF7AD1 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>transparent PNG</span><br/>
            <span style={{fontWeight:700}}>in 2 seconds</span>
          </h1>
          <p className="desc-text">Real AI RMBG-1.4 via API — checkerboard = proof of transparency. No white background.</p>
          <div className="pill-row">
            <span className="pill">{check} Real Transparency • Checkerboard</span>
            <span className="pill">{check} PNG 32-bit Alpha</span>
          </div>
          <div className="six-grid">
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>INPUT FORMATS</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>JPG, PNG, WEBP, BMP</div><div style={{fontSize:'11px',color:'#B88CFF',marginTop:'6px'}}>Up to 20MB each</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>OUTPUT FORMATS</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>PNG Transparent 32-bit</div><div style={{fontSize:'11px',color:'#B88CFF',marginTop:'6px'}}>Checkerboard = transparent</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>TRUSTED</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>12k+ Designers • 4.9/5</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>E-commerce ready</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>QUALITY</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>Clean Edges • No Halo</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>HD output</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>SPEED</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>2 Sec Removal</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>100% auto</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>BONUS</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>Free Unlimited</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>No watermark</div></div>
          </div>
        </div>

        <div style={{minWidth:0,display:'flex',flexDirection:'column',gap:'16px'}}>
          <div className="box-1-1 upload-box" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} alt="input"/> : <><div style={{width:'56px',height:'56px',background:'rgba(160,32,240,0.18)',border:'2px solid rgba(160,32,240,0.4)',borderRadius:'14px',display:'grid',placeItems:'center',marginBottom:'14px'}}>✂️</div><b style={{fontSize:'18px',fontWeight:500}}>Drop image to remove BG</b><div style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>or browse to upload</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.35)',marginTop:'12px'}}>PNG, JPG up to 20MB • Instant</div></>}
          </div>

          <div className="box-1-1 preview-card">
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.6)'}}><span>Transparent Preview {done && "(checkerboard = transparent)"}</span><span style={{fontSize:'10px',color:'#B88CFF'}}>{loading?status:"PNG 32"}</span></div>
            <div className="preview-box" style={{marginTop:'12px', minHeight:'300px'}}>
              {loading? <div style={{color:'#fff',fontSize:'12px',textAlign:'center',zIndex:2}}>{status}<br/><span style={{fontSize:'10px',color:'#888'}}>First time 20 sec</span></div> : done && output? <img src={output} style={{maxWidth:'90%',maxHeight:'90%',objectFit:'contain', position:'relative', zIndex:2, filter:'drop-shadow(0 0 20px rgba(0,0,0,0.5))'}}/> : <div style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',textAlign:'center',zIndex:2}}>Upload image<br/>to see transparent<br/><span style={{fontSize:'10px'}}>Checkerboard background = transparent proof</span></div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'12px'}}>
              <button onClick={()=>{if(output){const w=window.open();w?.document.write(`<body style="margin:0;background:repeating-conic-gradient(#2a2a2a 0% 25%, #1a1a1a 0% 50%) 0 0 / 20px 20px"><img src="${output}" style="max-width:100vw;max-height:100vh;display:block;margin:auto"/></body>`)}}} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px'}}>Preview on Checker</button>
              <button onClick={downloadFile} style={{background:done?'#A020F0':'#333',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',border:'none',cursor:done?'pointer':'not-allowed'}}>Download Transparent PNG</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
