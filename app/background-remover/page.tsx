"use client"
import { useState, useRef } from "react"

export default function BackgroundRemoverPage(){
  const [preview,setPreview]=useState("")
  const [output,setOutput]=useState("")
  const [done,setDone]=useState(false)
  const [loading,setLoading]=useState(false)
  const [status,setStatus]=useState("")
  const fileRef=useRef<HTMLInputElement>(null)

  const checkerStyle = {
    backgroundColor: '#1a1a1a',
    backgroundImage: `linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)`,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  } as const

  const darkBg = {
    background: 'rgba(15,13,28,0.95)'
  } as const

  const onFile = async (e:any)=>{
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    const url = URL.createObjectURL(f)
    setPreview(url)
    setDone(false)
    setOutput("")
    setLoading(true)
    setStatus("Removing background...")

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
      setStatus("Done - Transparent PNG ready!")
    } catch(err:any){
      console.error(err)
      setStatus("Error: "+err.message)
    }
    setLoading(false)
  }

  const downloadFile=()=>{
    if(!output) return;
    const a=document.createElement("a");
    a.href=output;
    a.download=`pinna3d-transparent.png`;
    a.click()
  }

  const check=<span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>

  return(
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh',overflowX:'hidden'}}>
      <style>{`
.iv-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:28px;padding:28px 40px;max-width:1440px;margin:0 auto;align-items:start}
.box-1-1{width:100%;aspect-ratio:1/1;height:auto;border-radius:16px;box-sizing:border-box;overflow:hidden}
.upload-box{border:3px dashed rgba(160,32,240,0.6);background:rgba(15,13,28,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;cursor:pointer;position:relative}
.desc-text{width:100%;max-width:100%;font-size:15px;line-height:1.8;letter-spacing:0.2px;color:rgba(255,255,255,0.68);margin-top:14px;display:block}
.pill-row{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
.pill{padding:8px 14px;border-radius:999px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);font-size:12px;display:inline-flex;align-items:center}
.six-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:18px;max-width:560px}
.six-box{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:14px;padding:14px 16px}
.preview-card{background:#15131E;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:14px;width:100%;box-sizing:border-box;display:flex;flex-direction:column}
.preview-box{border-radius:10px;width:100%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(160,32,240,0.28);overflow:hidden;position:relative;flex:1;}
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
          <p className="desc-text">Checkerboard background = real transparency proof. No white filter.</p>
          <div className="pill-row">
            <span className="pill">{check} Checkerboard = Transparent</span>
            <span className="pill">{check} PNG 32-bit Alpha</span>
          </div>
          <div className="six-grid">
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>INPUT FORMATS</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>JPG, PNG, WEBP, BMP</div><div style={{fontSize:'11px',color:'#B88CFF',marginTop:'6px'}}>Up to 20MB each</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>OUTPUT FORMATS</div><div style={{fontSize:'13px',fontWeight:600,marginTop:'6px'}}>PNG Transparent 32-bit</div><div style={{fontSize:'11px',color:'#B88CFF',marginTop:'6px'}}>Checkerboard = proof</div></div>
          </div>
        </div>

        <div style={{minWidth:0,display:'flex',flexDirection:'column',gap:'16px'}}>
          {/* FIRST BOX - ALWAYS DARK - DON'T TOUCH */}
          <div className="box-1-1 upload-box" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} alt="input" style={{width:'100%',height:'100%',objectFit:'contain',padding:'10px',boxSizing:'border-box',background:'rgba(15,13,28,0.95)'}}/> : <><div style={{width:'56px',height:'56px',background:'rgba(160,32,240,0.18)',border:'2px solid rgba(160,32,240,0.4)',borderRadius:'14px',display:'grid',placeItems:'center',marginBottom:'14px'}}>✂️</div><b style={{fontSize:'18px',fontWeight:500}}>Drop image to remove BG</b><div style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>or browse to upload</div></>}
          </div>

          {/* SECOND BOX - DARK DEFAULT, CHECKER ONLY AFTER UPLOAD */}
          <div className="box-1-1 preview-card">
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.6)'}}><span>Transparent Preview {done && "✓ Checker = Transparent"}</span><span style={{fontSize:'10px',color:'#B88CFF'}}>{loading?status:"PNG 32"}</span></div>
            <div className="preview-box" style={{marginTop:'12px', minHeight:'300px',...(done && output? checkerStyle : darkBg)}}>
              {loading? <div style={{color:'#fff',fontSize:'13px',textAlign:'center',zIndex:2,background:'rgba(0,0,0,0.6)',padding:'12px 16px',borderRadius:'8px'}}>{status}</div> : done && output? <img src={output} style={{maxWidth:'90%',maxHeight:'90%',objectFit:'contain', position:'relative', zIndex:2, filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.8))'}} alt="transparent result"/> : <div style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',textAlign:'center',zIndex:2}}>Upload image<br/>to see transparent</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'12px'}}>
              <button onClick={()=>{
                if(!output) return;
                const html = `<html><head><title>Transparent Proof</title></head><body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background-color:#1a1a1a;background-image:linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%);background-size:20px 20px;background-position:0 0, 0 10px, 10px -10px, -10px 0px;"><img src="${output}" style="max-width:90vw;max-height:90vh;filter:drop-shadow(0 8px 32px rgba(0,0,0,0.8))"/></body></html>`;
                const w=window.open(); w?.document.write(html);
              }} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',cursor:'pointer'}}>Preview on Checker</button>
              <button onClick={downloadFile} style={{background:done?'#A020F0':'#333',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',border:'none',cursor:done?'pointer':'not-allowed'}}>Download Transparent PNG</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
