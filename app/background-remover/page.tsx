"use client"
import { useState, useRef, useEffect } from "react"

type MainMode = "transparent" | "withBg"
type BgType = "color" | "gradient" | "image"
type OutFormat = "png" | "jpg" | "webp"

export default function BackgroundRemoverPage(){
  const [preview,setPreview]=useState("")
  const [output,setOutput]=useState("")
  const [finalUrl,setFinalUrl]=useState("")
  const [done,setDone]=useState(false)
  const [loading,setLoading]=useState(false)
  const [status,setStatus]=useState("")
  const [mainMode,setMainMode]=useState<MainMode>("transparent")
  const [bgType,setBgType]=useState<BgType>("color")
  const [bgColor,setBgColor]=useState("#ffffff")
  const [hue,setHue]=useState(0)
  const [gColor1,setGColor1]=useState("#ffffff")
  const [gColor2,setGColor2]=useState("#000000")
  const [gHue1,setGHue1]=useState(0)
  const [gHue2,setGHue2]=useState(0)
  const [gAngle,setGAngle]=useState(135)
  const [bgImage,setBgImage]=useState("")
  const [outFormat,setOutFormat]=useState<OutFormat>("png")

  const fileRef=useRef<HTMLInputElement>(null)
  const bgFileRef=useRef<HTMLInputElement>(null)
  const colorInputRef=useRef<HTMLInputElement>(null)
  const g1InputRef=useRef<HTMLInputElement>(null)
  const g2InputRef=useRef<HTMLInputElement>(null)

  const checkerStyle = {
    backgroundColor: '#1a1a1a',
    backgroundImage: `linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)`,
    backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  } as const

  const hslToHex=(h:number)=>{ const s=100,l=50; const k=(n:number)=>(n+h/30)%12; const a=s/100*Math.min(l/100,1-l/100); const f=(n:number)=>l/100-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1))); const toHex=(x:number)=>Math.round(x*255).toString(16).padStart(2,'0'); return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}` }
  const hexToRgb=(hex:string)=>{ const h=hex.replace('#',''); const full=h.length===3?h.split('').map(c=>c+c).join(''):h; const num=parseInt(full,16); return {r:(num>>16)&255,g:(num>>8)&255,b:num&255} }
  const rgbToCmyk=(r:number,g:number,b:number)=>{ if(r===0&&g===0&&b===0) return {c:0,m:0,y:0,k:100}; let c=1-r/255,m=1-g/255,y=1-b/255; const k=Math.min(c,m,y); c=(c-k)/(1-k); m=(m-k)/(1-k); y=(y-k)/(1-k); return {c:Math.round(c*100),m:Math.round(m*100),y:Math.round(y*100),k:Math.round(k*100)} }
  const getGradient=()=>`linear-gradient(${gAngle}deg, ${gColor1} 0%, ${gColor2} 100%)`

  const buildFinal=async()=>{
    if(!output) return
    const img=new Image(); img.crossOrigin="anonymous"; img.src=output
    await new Promise<void>(r=>{ img.onload=()=>r(); img.onerror=()=>r() })
    const canvas=document.createElement('canvas'); canvas.width=img.naturalWidth||1024; canvas.height=img.naturalHeight||1024
    const ctx=canvas.getContext('2d')!
    if(mainMode!=="transparent"){
      if(bgType==="color"){ ctx.fillStyle=bgColor; ctx.fillRect(0,0,canvas.width,canvas.height) }
      else if(bgType==="gradient"){ const g=ctx.createLinearGradient(0,0,Math.cos(gAngle*Math.PI/180)*canvas.width,Math.sin(gAngle*Math.PI/180)*canvas.height); g.addColorStop(0,gColor1); g.addColorStop(1,gColor2); ctx.fillStyle=g; ctx.fillRect(0,0,canvas.width,canvas.height) }
      else if(bgType==="image" && bgImage){ const b=new Image(); b.crossOrigin="anonymous"; b.src=bgImage; await new Promise<void>(r=>{ b.onload=()=>r(); b.onerror=()=>r() }); const sc=Math.max(canvas.width/b.width,canvas.height/b.height); ctx.drawImage(b,(canvas.width-b.width*sc)/2,(canvas.height-b.height*sc)/2,b.width*sc,b.height*sc) }
    }else if(outFormat==="jpg"){ ctx.fillStyle="#fff"; ctx.fillRect(0,0,canvas.width,canvas.height) }
    ctx.drawImage(img,0,0,canvas.width,canvas.height)
    const mime=outFormat==="jpg"?"image/jpeg":outFormat==="webp"?"image/webp":"image/png"
    setFinalUrl(canvas.toDataURL(mime,0.92))
  }
  useEffect(()=>{ if(done) buildFinal() },[mainMode,bgType,bgColor,bgImage,gColor1,gColor2,gAngle,done,output,outFormat])

  const onFile=async(e:any)=>{
    const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]; if(!f) return
    setPreview(URL.createObjectURL(f)); setDone(false); setOutput(""); setFinalUrl(""); setLoading(true); setStatus("Processing image...")
    try{ const fd=new FormData(); fd.append('file',f); const r=await fetch('/api/remove-bg',{method:'POST',body:fd}); if(!r.ok) throw new Error('API failed'); const blob=await r.blob(); setOutput(URL.createObjectURL(blob)); setDone(true) }catch(err:any){ setStatus(err.message) } setLoading(false)
  }
  const onBgFile=(e:any)=>{ const f=e.target.files?.[0]; if(!f) return; setBgImage(URL.createObjectURL(f)); setBgType("image"); setMainMode("withBg") }
  const openEyeDropper=async(setter:any)=>{ try{ const w=window as any; if(w.EyeDropper){ const ed=new w.EyeDropper(); const res=await ed.open(); if(res?.sRGBHex) setter(res.sRGBHex) } }catch{} }
  const download=()=>{ const url=finalUrl||output; if(!url) return; const a=document.createElement("a"); a.href=url; a.download=`pinna3d-${Date.now()}.${outFormat==="jpg"?"jpg":outFormat}`; a.click() }
  const getPreviewBg=()=>{ if(!done) return {background:'#0A0814',backgroundImage:'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',backgroundSize:'18px 18px'}; if(mainMode==="transparent") return checkerStyle; if(bgType==="color") return {background:bgColor} as const; if(bgType==="gradient") return {background:getGradient()} as const; if(bgType==="image"&&bgImage) return {backgroundImage:`url(${bgImage})`,backgroundSize:'cover',backgroundPosition:'center'} as const; return {background:'#fff'} as const }

  const Ico=({c}:{c:string})=> <div style={{width:'26px',height:'26px',borderRadius:'7px',background:'rgba(160,32,240,0.14)',border:'1px solid rgba(160,32,240,0.22)',display:'grid',placeItems:'center',fontSize:'12px'}}>{c}</div>

  return(
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, system-ui',minHeight:'100vh'}}>
      <style>{`
.iv-grid{display:grid;grid-template-columns:1.14fr 0.86fr;gap:12px;padding:16px 20px 16px 24px;max-width:1440px;margin:0 auto;align-items:start}
.left-col{display:flex;flex-direction:column;gap:10px}
.six-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:560px}
.six-box{background:rgba(255,255,255,0.045);border:1px solid rgba(255,255,255,0.08);border-radius:11px;padding:10px 12px;min-height:64px;display:flex;gap:10px;align-items:center}
.box-1-1{width:84%;aspect-ratio:1/1;border-radius:12px;overflow:hidden;margin-left:auto}
.upload-box{border:1.5px dashed rgba(160,32,240,0.5);background:rgba(15,13,28,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer}
.upload-box img{width:100%;height:100%;object-fit:contain;padding:8px}
.preview-card{background:#15131E;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:10px;width:84%;margin-left:auto;display:flex;flex-direction:column}
.preview-box{border-radius:9px;flex:1;min-height:310px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(160,32,240,0.22);overflow:hidden;position:relative}
.color-card{background:#15131E;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px;width:84%;margin-left:auto}
.seg{display:flex;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:9px;padding:3px;gap:3px}
.seg-btn{flex:1;padding:7px;border-radius:7px;font-size:11px;font-weight:600;cursor:pointer;border:1px solid transparent}
.seg-btn.active{background:#A020F0;color:#fff;border-color:#A020F0}
.seg-btn.idle{background:transparent;color:rgba(255,255,255,0.6)}
.fmt-btn{padding:5px 10px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.6)}
.fmt-btn.active{background:#fff;color:#000;border-color:#fff}
.hue-slider{width:100%;height:12px;border-radius:999px;-webkit-appearance:none;background:linear-gradient(to right,#f00 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,#f00 100%);border:1px solid rgba(255,255,255,0.15)}
.hue-slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid #000}
.circle-sw{width:28px;height:28px;border-radius:50%;cursor:pointer;border:2px solid rgba(255,255,255,0.2)}
.circle-sw.active{border-color:#fff;box-shadow:0 0 0 2px #A020F0}
.circle-sw.white{background:#fff}
.circle-sw.black{background:#000}
.code-input{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:7px;padding:7px 9px;color:#fff;font-size:12px;font-family:monospace;width:100%;outline:none}
.rgb-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:5px;color:#fff;font-size:11px;font-family:monospace;text-align:center}
.picker-btn{width:30px;height:30px;border-radius:7px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);display:grid;place-items:center;cursor:pointer;font-size:13px}
.bottom-pro{max-width:560px;background:linear-gradient(135deg, rgba(160,32,240,0.18), rgba(255,255,255,0.03));border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:12px}
.feat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-top:28px}
@media(max-width:900px){.iv-grid{grid-template-columns:1fr;padding:12px}.box-1-1,.preview-card,.color-card{width:100%;margin-left:0}.bottom-pro{max-width:100%}.feat-grid{grid-template-columns:1fr}}
      `}</style>

      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 20px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',position:'sticky',top:0,zIndex:50}}>
        <a href="/" style={{marginLeft:'-8px'}}><img src="/logo.png" alt="Pinna3d" style={{height:'68px'}}/></a>
        <div style={{display:'flex',gap:'14px',alignItems:'center',fontSize:'13px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Home</a><span style={{color:'#A020F0',fontWeight:600}}>Background Remover</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.08)',padding:'8px 14px',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.12)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',padding:'8px 16px',borderRadius:'8px',color:'#fff',textDecoration:'none',fontWeight:600}}>Get Started</a>
        </div>
      </header>

      <div className="iv-grid">
        <div className="left-col">
          <div>
            <div style={{display:'inline-flex',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',padding:'5px 10px',borderRadius:'20px',fontSize:'10px',color:'rgba(255,255,255,0.7)',letterSpacing:'.1em',fontWeight:600}}>TRUSTED BY 50,000+ SELLERS WORLDWIDE</div>
            <h1 style={{fontSize:'40px',lineHeight:'1.02',margin:'12px 0 0',fontWeight:700,letterSpacing:'-0.02em'}}>
              Backgrounds removed.<br/>Quality <span style={{color:'#A020F0'}}>retained.</span>
            </h1>
            <p style={{fontSize:'14px',lineHeight:1.65,color:'rgba(255,255,255,0.58)',marginTop:'10px',maxWidth:'500px'}}>
              Built for sellers who need catalog-ready images. Our AI preserves fine details — hair, lace, glass, soft shadows — while removing only the background. Export in PNG, JPG or WEBP, ready for Amazon, Shopify and beyond.
            </p>
          </div>

          <div className="six-grid">
            <div className="six-box"><Ico c="📄"/><div><div style={{fontSize:'8px',color:'rgba(255,255,255,0.4)',fontWeight:700,letterSpacing:'.08em'}}>SUPPORTED FORMATS</div><div style={{fontSize:'11px',fontWeight:700}}>JPG, PNG, WEBP, HEIC</div><div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)'}}>Up to 20MB • Drag & Drop</div></div></div>
            <div className="six-box"><Ico c="⊞"/><div><div style={{fontSize:'8px',color:'rgba(255,255,255,0.4)',fontWeight:700,letterSpacing:'.08em'}}>MARKETPLACE READY</div><div style={{fontSize:'11px',fontWeight:700}}>Transparent + Studio Backgrounds</div><div style={{fontSize:'10px',color:'#B88CFF'}}>Amazon / Shopify compliant</div></div></div>
            <div className="six-box"><Ico c="⚡"/><div><div style={{fontSize:'8px',color:'rgba(255,255,255,0.4)',fontWeight:700,letterSpacing:'.08em'}}>PERFORMANCE</div><div style={{fontSize:'11px',fontWeight:700}}>~1.7s per image • GPU</div><div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)'}}>No queue, instant result</div></div></div>
            <div className="six-box"><Ico c="◍"/><div><div style={{fontSize:'8px',color:'rgba(255,255,255,0.4)',fontWeight:700,letterSpacing:'.08em'}}>PRECISION MATTE</div><div style={{fontSize:'11px',fontWeight:700}}>Edge decontamination • Hair intact</div><div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)'}}>HD & 4K alpha export</div></div></div>
            <div className="six-box"><Ico c="🔒"/><div><div style={{fontSize:'8px',color:'rgba(255,255,255,0.4)',fontWeight:700,letterSpacing:'.08em'}}>PRIVACY FIRST</div><div style={{fontSize:'11px',fontWeight:700}}>100% Browser Processing</div><div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)'}}>No server upload</div></div></div>
            <div className="six-box"><Ico c="∞"/><div><div style={{fontSize:'8px',color:'rgba(255,255,255,0.4)',fontWeight:700,letterSpacing:'.08em'}}>COST EFFECTIVE</div><div style={{fontSize:'11px',fontWeight:700}}>Free • Unlimited • No Watermark</div><div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)'}}>Commercial use allowed</div></div></div>
          </div>

          {/* NEW PROFESSIONAL BOTTOM BOX WITH GRAPHICS */}
          <div className="bottom-pro">
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <div style={{width:'56px',height:'56px',borderRadius:'10px',background:'linear-gradient(135deg,#A020F0,#6D28D9)',display:'grid',placeItems:'center',flexShrink:0}}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M7 12l3 3 6-6"/></svg>
              </div>
              <div>
                <div style={{fontSize:'15px',fontWeight:700,lineHeight:1.1}}>Professional alpha matting technology</div>
                <div style={{fontSize:'11px',color:'rgba(255,255,255,0.55)',marginTop:'3px'}}>Not a white filter. Real transparency with sub-pixel edge preservation.</div>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr auto 1fr',gap:'8px',alignItems:'center'}}>
              <div style={{background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'9px',padding:'8px',textAlign:'center'}}>
                <div style={{width:'100%',height:'44px',borderRadius:'6px',background:'linear-gradient(45deg,#333 25%, #444 25%, #444 50%, #333 50%, #333 75%, #444 75%)',backgroundSize:'12px 12px',display:'grid',placeItems:'center',fontSize:'9px',color:'rgba(255,255,255,0.6)'}}>ORIGINAL</div>
                <div style={{fontSize:'9px',fontWeight:600,marginTop:'6px'}}>Original</div>
              </div>
              <div style={{color:'#A020F0',fontSize:'14px'}}>→</div>
              <div style={{background:'rgba(160,32,240,0.12)',border:'1px solid rgba(160,32,240,0.25)',borderRadius:'9px',padding:'8px',textAlign:'center'}}>
                <div style={{width:'100%',height:'44px',borderRadius:'6px',background:'#15131E',display:'grid',placeItems:'center'}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A020F0" strokeWidth="1.5"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/></svg></div>
                <div style={{fontSize:'9px',fontWeight:600,marginTop:'6px',color:'#D6A5FF'}}>AI Detection</div>
              </div>
              <div style={{color:'#A020F0',fontSize:'14px'}}>→</div>
              <div style={{background:'#fff',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'9px',padding:'8px',textAlign:'center'}}>
                <div style={{width:'100%',height:'44px',borderRadius:'6px',background:'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 0 / 12px 12px'}}></div>
                <div style={{fontSize:'9px',fontWeight:600,marginTop:'6px',color:'#000'}}>Transparent</div>
              </div>
            </div>

            <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
              <span style={{padding:'5px 9px',borderRadius:'20px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',fontSize:'9px'}}>✓ Hair & fur preserved</span>
              <span style={{padding:'5px 9px',borderRadius:'20px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',fontSize:'9px'}}>✓ No white fringe</span>
              <span style={{padding:'5px 9px',borderRadius:'20px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',fontSize:'9px'}}>✓ 4K ready</span>
            </div>
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'10px',alignItems:'flex-end'}}>
          <div className="box-1-1 upload-box" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} alt="input"/> : <><div style={{width:'48px',height:'48px',background:'rgba(160,32,240,0.18)',border:'1.5px solid rgba(160,32,240,0.35)',borderRadius:'10px',display:'grid',placeItems:'center',marginBottom:'8px'}}>✂️</div><b style={{fontSize:'14px',fontWeight:600}}>Drop image to remove background</b><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'3px'}}>or click to browse</div></>}
          </div>

          <div className="preview-card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
              <div className="seg" style={{flex:1,marginRight:'8px'}}>
                <button className={`seg-btn ${mainMode==="transparent"?"active":"idle"}`} onClick={()=>setMainMode("transparent")}>Without BG</button>
                <button className={`seg-btn ${mainMode==="withBg"?"active":"idle"}`} onClick={()=>setMainMode("withBg")}>With BG</button>
              </div>
              <div style={{display:'flex',gap:'5px'}}>
                <button className={`fmt-btn ${outFormat==="png"?"active":""}`} onClick={()=>setOutFormat("png")}>PNG</button>
                <button className={`fmt-btn ${outFormat==="jpg"?"active":""}`} onClick={()=>setOutFormat("jpg")}>JPG</button>
                <button className={`fmt-btn ${outFormat==="webp"?"active":""}`} onClick={()=>setOutFormat("webp")}>WEBP</button>
              </div>
            </div>
            <div className="preview-box" style={getPreviewBg() as any}>
              {loading? <div style={{color:'#fff',fontSize:'11px',background:'rgba(0,0,0,0.6)',padding:'7px 10px',borderRadius:'7px',zIndex:2}}>{status}</div> : done && (finalUrl||output)? <img src={finalUrl||output} style={{maxWidth:'90%',maxHeight:'90%',objectFit:'contain',zIndex:2}} alt="result"/> : <div style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',textAlign:'center',zIndex:2}}>Upload image<br/>to see result</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'8px'}}>
              <button onClick={()=>{ if(!output) return; const bgCss = mainMode==="transparent"? "background-color:#1a1a1a;background-image:linear-gradient(45deg,#2a2a2a 25%,transparent 25%),linear-gradient(-45deg,#2a2a2a 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#2a2a2a 75%),linear-gradient(-45deg,transparent 75%,#2a2a2a 75%);background-size:20px 20px" : bgType==="color"? `background:${bgColor}` : bgType==="gradient"? `background:${getGradient()}` : `background-image:url(${bgImage});background-size:cover`; const html=`<html><body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;${bgCss}"><img src="${finalUrl||output}" style="max-width:90vw;max-height:90vh"/></body></html>`; const w=window.open(); w?.document.write(html) }} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'8px',borderRadius:'7px',color:'#fff',fontSize:'11px',cursor:'pointer'}}>Preview</button>
              <button onClick={download} style={{background:done?'#A020F0':'#333',padding:'8px',borderRadius:'7px',color:'#fff',fontSize:'11px',border:'none',cursor:done?'pointer':'not-allowed',fontWeight:600}}>Download {outFormat.toUpperCase()}</button>
            </div>
          </div>

          <div className="color-card" style={{display: mainMode==="withBg"? 'block':'none'}}>
            <div style={{display:'flex',gap:'5px',marginBottom:'10px'}}>
              <button className={`seg-btn ${bgType==="color"?"active":"idle"}`} style={{padding:'6px',fontSize:'11px'}} onClick={()=>setBgType("color")}>Color</button>
              <button className={`seg-btn ${bgType==="gradient"?"active":"idle"}`} style={{padding:'6px',fontSize:'11px'}} onClick={()=>setBgType("gradient")}>Gradient</button>
              <button className={`seg-btn ${bgType==="image"?"active":"idle"}`} style={{padding:'6px',fontSize:'11px'}} onClick={()=>setBgType("image")}>Upload BG</button>
            </div>
            {bgType==="color" && (
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}><div className={`circle-sw white ${bgColor==="#ffffff"?"active":""}`} onClick={()=>{setBgColor("#ffffff"); setHue(0)}}/><div className={`circle-sw black ${bgColor==="#000000"?"active":""}`} onClick={()=>setBgColor("#000000")}/><div style={{flex:1}}/><input ref={colorInputRef} type="color" hidden value={bgColor} onChange={e=>setBgColor(e.target.value)}/><div className="picker-btn" onClick={()=>colorInputRef.current?.click()}>🎨</div><div className="picker-btn" onClick={()=>openEyeDropper(setBgColor)}>👁️</div></div>
                <div style={{display:'flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,0.05)',borderRadius:'7px',padding:'7px'}}><div style={{width:'20px',height:'20px',borderRadius:'50%',background:bgColor,border:'2px solid #fff'}}/><input type="range" min="0" max="360" value={hue} className="hue-slider" style={{flex:1}} onChange={e=>{ const h=parseInt(e.target.value); setHue(h); setBgColor(hslToHex(h)) }}/></div>
                <input className="code-input" value={bgColor} onChange={e=>{ let v=e.target.value.trim(); if(!v.startsWith('#')) v='#'+v; if(/^#([0-9A-Fa-f]{3,8})$/.test(v)) setBgColor(v.toLowerCase()) }}/>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'6px'}}>{(()=>{ const {r,g,b}=hexToRgb(bgColor); return (<><div><div style={{fontSize:'8px',color:'rgba(255,255,255,0.4)',fontWeight:700}}>R</div><input className="rgb-input" type="number" value={r} onChange={e=>{ const v=Math.min(255,Math.max(0,parseInt(e.target.value)||0)); const {g,b}=hexToRgb(bgColor); setBgColor(`#${[v,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')}`) }}/></div><div><div style={{fontSize:'8px',color:'rgba(255,255,255,0.4)',fontWeight:700}}>G</div><input className="rgb-input" type="number" value={g} onChange={e=>{ const v=Math.min(255,Math.max(0,parseInt(e.target.value)||0)); const {r,b}=hexToRgb(bgColor); setBgColor(`#${[r,v,b].map(x=>x.toString(16).padStart(2,'0')).join('')}`) }}/></div><div><div style={{fontSize:'8px',color:'rgba(255,255,255,0.4)',fontWeight:700}}>B</div><input className="rgb-input" type="number" value={b} onChange={e=>{ const v=Math.min(255,Math.max(0,parseInt(e.target.value)||0)); const {r,g}=hexToRgb(bgColor); setBgColor(`#${[r,g,v].map(x=>x.toString(16).padStart(2,'0')).join('')}`) }}/></div></>)})()}</div>
              </div>
            )}
            {bgType==="gradient" && (
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                <div><div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'5px'}}><span style={{fontSize:'8px',fontWeight:700,width:'30px',color:'rgba(255,255,255,0.5)'}}>FROM</span><div className={`circle-sw white ${gColor1==="#ffffff"?"active":""}`} style={{width:'22px',height:'22px'}} onClick={()=>setGColor1("#ffffff")}/><div className={`circle-sw black ${gColor1==="#000000"?"active":""}`} style={{width:'22px',height:'22px'}} onClick={()=>setGColor1("#000000")}/><div style={{flex:1}}/><input ref={g1InputRef} type="color" hidden value={gColor1} onChange={e=>setGColor1(e.target.value)}/><div className="picker-btn" style={{width:'24px',height:'24px'}} onClick={()=>g1InputRef.current?.click()}>🎨</div></div><input className="code-input" value={gColor1} onChange={e=>{ let v=e.target.value; if(!v.startsWith('#')) v='#'+v; if(/^#([0-9A-Fa-f]{3,8})$/.test(v)) setGColor1(v) }}/><input type="range" min="0" max="360" value={gHue1} className="hue-slider" style={{marginTop:'5px',height:'10px'}} onChange={e=>{ const h=parseInt(e.target.value); setGHue1(h); setGColor1(hslToHex(h)) }}/></div>
                <div><div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'5px'}}><span style={{fontSize:'8px',fontWeight:700,width:'30px',color:'rgba(255,255,255,0.5)'}}>TO</span><div className={`circle-sw white ${gColor2==="#ffffff"?"active":""}`} style={{width:'22px',height:'22px'}} onClick={()=>setGColor2("#ffffff")}/><div className={`circle-sw black ${gColor2==="#000000"?"active":""}`} style={{width:'22px',height:'22px'}} onClick={()=>setGColor2("#000000")}/><div style={{flex:1}}/><input ref={g2InputRef} type="color" hidden value={gColor2} onChange={e=>setGColor2(e.target.value)}/><div className="picker-btn" style={{width:'24px',height:'24px'}} onClick={()=>g2InputRef.current?.click()}>🎨</div></div><input className="code-input" value={gColor2} onChange={e=>{ let v=e.target.value; if(!v.startsWith('#')) v='#'+v; if(/^#([0-9A-Fa-f]{3,8})$/.test(v)) setGColor2(v) }}/><input type="range" min="0" max="360" value={gHue2} className="hue-slider" style={{marginTop:'5px',height:'10px'}} onChange={e=>{ const h=parseInt(e.target.value); setGHue2(h); setGColor2(hslToHex(h)) }}/></div>
                <div><div style={{width:'100%',height:'14px',borderRadius:'999px',border:'1px solid rgba(255,255,255,0.15)',background:getGradient()}}/><input type="range" min="0" max="360" value={gAngle} onChange={e=>setGAngle(parseInt(e.target.value))} style={{width:'100%',accentColor:'#A020F0',marginTop:'6px'}}/></div>
              </div>
            )}
            {bgType==="image" && (<><input ref={bgFileRef} type="file" hidden accept="image/*" onChange={onBgFile}/><button onClick={()=>bgFileRef.current?.click()} style={{width:'100%',padding:'9px',borderRadius:'7px',background:'rgba(255,255,255,0.08)',border:'1px dashed rgba(255,255,255,0.15)',color:'#fff',fontSize:'11px',cursor:'pointer'}}>{bgImage? "Change background image":"Upload your background"}</button></>)}
          </div>
        </div>
      </div>

      {/* FOOTER LOCKED AS IT IS */}
      <div style={{padding:'40px 24px 40px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <h2 style={{textAlign:'center',fontSize:'30px',fontWeight:500}}>Why designers choose Background Remover</h2>
        <div className="feat-grid">
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>✓ True AI, Not White Filter</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>Works on any background, even complex.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>✓ 100% Private & Fast</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>Runs in your browser, no server upload.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>✓ E-commerce Ready</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>Perfect for Shopify, Amazon, Etsy listings.</p></div>
        </div>
        <div style={{textAlign:'center',marginTop:'30px'}}><a href="/signup" style={{background:'#A020F0',padding:'12px 24px',borderRadius:'10px',color:'#fff',textDecoration:'none',fontWeight:500}}>Start Removing Free — No CC</a></div>
      </div>
      <footer style={{borderTop:'1px solid rgba(255,255,255,0.08)',padding:'20px 24px',textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.4)'}}>© 2026 Pinna3d.com • Background Remover Tool</footer>
    </div>
  )
}
