"use client"
import { useState, useRef } from "react"

export default function BackgroundRemoverPage(){
  const [preview,setPreview]=useState("")
  const [output,setOutput]=useState("")
  const [done,setDone]=useState(false)
  const [loading,setLoading]=useState(false)
  const [status,setStatus]=useState("PNG 32")
  const fileRef=useRef<HTMLInputElement>(null)

  const checkerStyle = {
    backgroundColor: '#1a1a1a',
    backgroundImage: `linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)`,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  } as const

  const darkBg = {
    background: '#0A0814',
    backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
    backgroundSize: '16px 16px'
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
      const res = await fetch('/api/remove-bg', { method: 'POST', body: fd, cache:'no-store' })
      if(!res.ok){
        const txt = await res.text()
        throw new Error(txt.slice(0,400))
      }
      const blob = await res.blob()
      if(blob.size < 100) throw new Error("Empty PNG")
      const outUrl = URL.createObjectURL(blob)
      setOutput(outUrl)
      setDone(true)
      setStatus("Done - Transparent ready!")
    } catch(err:any){
      console.error(err)
      setStatus("FAILED: "+err.message)
      alert("Failed: "+err.message)
    } finally {
      setLoading(false)
    }
  }

  const downloadFile=()=>{
    if(!output) return
    const a=document.createElement("a"); a.href=output; a.download=`pinna3d-transparent.png`; a.click()
  }
  const check=<span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>

  return(
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh'}}>
      <style>{`
.iv-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:28px;padding:28px 40px;max-width:1440px;margin:0 auto;align-items:start}
.box-1-1{width:100%;aspect-ratio:1/1;border-radius:16px;overflow:hidden;box-sizing:border-box}
.upload-box{border:3px dashed rgba(160,32,240,0.6);background:rgba(15,13,28,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;cursor:pointer}
.upload-box img{width:100%;height:100%;object-fit:contain;padding:10px;background:rgba(15,13,28,0.95)}
.preview-card{background:#15131E;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:14px;display:flex;flex-direction:column}
.preview-box{border-radius:10px;width:100%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(160,32,240,0.28);overflow:hidden;position:relative;flex:1;min-height:380px}
.feat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-top:32px}
@media(max-width:900px){.iv-grid{grid-template-columns:1fr;padding:16px}.feat-grid{grid-template-columns:1fr}}
`}</style>

      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',position:'sticky',top:0,zIndex:50}}>
        <a href="/"><img src="/logo.png" alt="Pinna3d.com" style={{height:'80px',width:'auto'}}/></a>
        <div style={{display:'flex',gap:'20px',alignItems:'center',fontSize:'14px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Home</a><span style={{color:'#A020F0'}}>Background Remover</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.1)',padding:'10px 18px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.14)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',padding:'10px 20px',borderRadius:'10px',color:'#fff',textDecoration:'none'}}>Get Started</a>
        </div>
      </header>

      <div className="iv-grid">
        <div>
          <div style={{display:'inline-flex',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.32)',padding:'6px 12px',borderRadius:'20px',fontSize:'11px',color:'#D6A5FF'}}>REAL AI • TRANSPARENT PROOF</div>
          <h1 style={{fontSize:'48px',lineHeight:1.12,margin:'16px 0 0'}}><span style={{fontWeight:700}}>Remove background to</span><br/><span style={{fontWeight:700, background:'linear-gradient(90deg,#A020F0 0%,#FF7AD1 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>transparent PNG</span><br/><span style={{fontWeight:700}}>in 2 seconds</span></h1>
          <div style={{marginTop:'16px',display:'flex',gap:'10px'}}><span style={{padding:'8px 14px',borderRadius:'999px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',fontSize:'12px'}}>{check} Checkerboard = Transparent</span><span style={{padding:'8px 14px',borderRadius:'999px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',fontSize:'12px'}}>{check} PNG 32-bit Alpha</span></div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div className="box-1-1 upload-box" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} alt="input"/> : <><div style={{width:'56px',height:'56px',background:'rgba(160,32,240,0.18)',border:'2px solid rgba(160,32,240,0.4)',borderRadius:'14px',display:'grid',placeItems:'center',marginBottom:'14px'}}>✂️</div><b>Drop image to remove BG</b><div style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>or browse to upload</div></>}
          </div>

          <div className="box-1-1 preview-card">
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.6)'}}><span>Transparent Preview {done && "✓"}</span><span style={{fontSize:'10px',color: status.includes('FAILED')?'#ff6b6b':'#B88CFF'}}>{status}</span></div>
            {/* SECOND BOX: DARK BEFORE, CHECKER AFTER - YOUR REQUEST */}
            <div className="preview-box" style={{marginTop:'12px',...(done && output? checkerStyle : darkBg)}}>
              {loading? <div style={{color:'#fff',background:'rgba(0,0,0,0.7)',padding:'10px 14px',borderRadius:'8px',fontSize:'12px'}}>{status}</div>
              : done && output? <img src={output} alt="transparent" style={{maxWidth:'90%',maxHeight:'90%',objectFit:'contain',filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.8))'}}/>
              : <div style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',textAlign:'center'}}>Upload image<br/>to see transparent</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'12px'}}>
              <button onClick={()=>{if(!output) return; const w=window.open(); w?.document.write(`<body style="margin:0;display:grid;place-items:center;min-height:100vh;background-color:#1a1a1a;background-image:linear-gradient(45deg,#2a2a2a 25%,transparent 25%),linear-gradient(-45deg,#2a2a2a 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#2a2a2a 75%),linear-gradient(-45deg,transparent 75%,#2a2a2a 75%);background-size:20px 20px"><img src="${output}" style="max-width:90vw;max-height:90vh"/></body>`)}} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px'}}>Preview on Checker</button>
              <button onClick={downloadFile} style={{background:done?'#A020F0':'#333',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',border:'none',cursor:done?'pointer':'not-allowed'}}>Download PNG</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:'40px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <h2 style={{textAlign:'center',fontSize:'30px',fontWeight:500}}>Why designers choose Background Remover</h2>
        <div className="feat-grid">
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3>{check}True AI, Not White Filter</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>Works on any background.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3>{check}100% Private & Fast</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>No server upload.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3>{check}E-commerce Ready</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px'}}>Shopify, Amazon.</p></div>
        </div>
      </div>
      <footer style={{borderTop:'1px solid rgba(255,255,255,0.08)',padding:'20px 40px',textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.4)'}}>© 2026 Pinna3d.com • Background Remover Tool</footer>
    </div>
  )
}
