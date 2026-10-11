"use client"
import { useState, useRef } from "react"

export default function ImageToVectorPage(){
  const [preview,setPreview]=useState("")
  const [vectorDone,setVectorDone]=useState(false)
  const [format,setFormat]=useState("SVG")
  const fileRef=useRef<HTMLInputElement>(null)
  const onFile=(e:any)=>{const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]; if(!f) return; setPreview(URL.createObjectURL(f)); setVectorDone(false); setTimeout(()=>setVectorDone(true),1200)}
  const check=<span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>

  return(
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh'}}>
      <style>{`
       .iv-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:20px;padding:30px 40px;max-width:1440px;margin:0 auto}
       .feat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-top:32px}
        @media(max-width:900px){.iv-grid{grid-template-columns:1fr;padding:16px}.feat-grid{grid-template-columns:1fr}}
      `}</style>

      {/* HEADER */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
        <a href="/"><img src="/logo.png" alt="Pinna3d.com" style={{height:'60px',width:'auto'}}/></a>
        <div style={{display:'flex',gap:'20px',alignItems:'center',fontSize:'14px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Home</a>
          <span style={{color:'#A020F0'}}>Image to Vector</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.1)',padding:'10px 18px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.14)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',boxShadow:'0 0 24px rgba(160,32,240,0.55)',padding:'10px 20px',borderRadius:'10px',color:'#fff',textDecoration:'none'}}>Get Started</a>
        </div>
      </header>

      {/* HERO + UPLOAD */}
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

        {/* UPLOAD BOX */}
        <div>
          <div onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'3px dashed rgba(160,32,240,0.6)',borderRadius:'16px',background:'rgba(15,13,28,0.95)',padding:'24px',display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',cursor:'pointer',minHeight:'340px',justifyContent:'center'}}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            <div style={{width:'56px',height:'56px',background:'rgba(160,32,240,0.18)',border:'2px solid rgba(160,32,240,0.4)',borderRadius:'14px',display:'grid',placeItems:'center',marginBottom:'14px'}}>✒️</div>
            <b style={{fontSize:'18px'}}>Drop your logo / image here</b>
            <div style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>or browse to upload</div>
            <div style={{fontSize:'11px',color:'rgba(255,255,255,0.35)',marginTop:'12px'}}>PNG, JPG up to 20MB • Auto background removal</div>
            {preview && <img src={preview} alt="input" style={{width:'80px',marginTop:'12px',borderRadius:'8px'}}/>}
          </div>

          <div style={{background:'#15131E',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'14px',marginTop:'12px'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.6)'}}><span>Vector Preview</span><div style={{display:'flex',gap:'6px'}}>{["SVG","EPS","AI","PDF"].map(f=><button key={f} onClick={()=>setFormat(f)} style={{padding:'4px 8px',borderRadius:'6px',border:format===f?'1px solid #A020F0':'1px solid rgba(255,255,255,0.1)',background:format===f?'#A020F0':'transparent',color:'#fff',fontSize:'10px'}}>{f}</button>)}</div></div>
            <div style={{background:'#0A0814',borderRadius:'10px',height:'160px',display:'grid',placeItems:'center',marginTop:'10px',border:'1px dashed rgba(255,255,255,0.1)'}}>
              {vectorDone && preview? <div style={{textAlign:'center'}}><div style={{fontSize:'40px'}}>✒️</div><div style={{fontSize:'11px',color:'#A6FF9A',marginTop:'6px'}}>✓ Vectorized • Infinite Scale</div></div> : <div style={{color:'rgba(255,255,255,0.3)',fontSize:'12px'}}>Upload image to see vector</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
              <button style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px'}}>Preview SVG</button>
              <a href="/signup" style={{background:'#A020F0',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',textAlign:'center',textDecoration:'none'}}>Download {format}</a>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
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
