"use client"
import { useState, useRef, useEffect } from "react"

type MainMode = "transparent" | "withBg"
type BgType = "color" | "gradient" | "image"

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

  // Gradient states
  const [gColor1,setGColor1]=useState("#A020F0")
  const [gColor2,setGColor2]=useState("#FF7AD1")
  const [gHue1,setGHue1]=useState(280)
  const [gHue2,setGHue2]=useState(330)
  const [gAngle,setGAngle]=useState(135)
  const [gPreset,setGPreset]=useState("neon")

  const [bgImage,setBgImage]=useState("")

  const fileRef=useRef<HTMLInputElement>(null)
  const bgFileRef=useRef<HTMLInputElement>(null)

  const gradients: Record<string, string> = {
    studio: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    sunset: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
    luxury: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    forest: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    peach: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    neon: "linear-gradient(135deg, #A020F0 0%, #FF7AD1 100%)",
  }

  const presetColorsForGradient: Record<string, [string,string]> = {
    studio: ["#f5f7fa","#c3cfe2"],
    sunset: ["#ff9a9e","#fecfef"],
    luxury: ["#0f0c29","#24243e"],
    forest: ["#134e5e","#71b280"],
    peach: ["#ffecd2","#fcb69f"],
    neon: ["#A020F0","#FF7AD1"],
  }

  const checkerStyle = {
    backgroundColor: '#1a1a1a',
    backgroundImage: `linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)`,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  } as const

  const hslToHex = (h:number)=>{
    const s=100,l=50; const k=(n:number)=>(n+h/30)%12; const a=s/100*Math.min(l/100,1-l/100);
    const f=(n:number)=>l/100-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));
    const toHex=(x:number)=>Math.round(x*255).toString(16).padStart(2,'0');
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
  }

  const getCurrentGradientCss = () => `linear-gradient(${gAngle}deg, ${gColor1} 0%, ${gColor2} 100%)`

  const buildFinal = async () => {
    if(!output) return
    const img=new Image(); img.crossOrigin="anonymous"; img.src=output
    await new Promise(r=>{img.onload=r as any; img.onerror=r as any})
    const canvas=document.createElement('canvas')
    canvas.width=img.naturalWidth||1024; canvas.height=img.naturalHeight||1024
    const ctx=canvas.getContext('2d')!
    if(mainMode!=="transparent"){
      if(bgType==="color"){ ctx.fillStyle=bgColor; ctx.fillRect(0,0,canvas.width,canvas.height) }
      else if(bgType==="gradient"){
        // For export, create canvas gradient
        const grad = ctx.createLinearGradient(0,0, Math.cos(gAngle*Math.PI/180)*canvas.width, Math.sin(gAngle*Math.PI/180)*canvas.height)
        grad.addColorStop(0, gColor1)
        grad.addColorStop(1, gColor2)
        ctx.fillStyle = grad
        ctx.fillRect(0,0,canvas.width,canvas.height)
      }else if(bgType==="image" && bgImage){
        const bgImg=new Image(); bgImg.crossOrigin="anonymous"; bgImg.src=bgImage
        await new Promise(r=>{bgImg.onload=r as any; bgImg.onerror=r as any})
        const scale=Math.max(canvas.width/bgImg.width, canvas.height/bgImg.height)
        ctx.drawImage(bgImg,(canvas.width-bgImg.width*scale)/2,(canvas.height-bgImg.height*scale)/2, bgImg.width*scale, bgImg.height*scale)
      }
    }
    ctx.drawImage(img,0,0,canvas.width,canvas.height)
    setFinalUrl(canvas.toDataURL("image/png",0.92))
  }

  useEffect(()=>{ if(done) buildFinal() }, [mainMode, bgType, bgColor, bgImage, gColor1, gColor2, gAngle, done, output])

  const onFile=async(e:any)=>{
    const f=e.dataTransfer?.files?.[0] || e.target?.files?.[0]; if(!f) return
    setPreview(URL.createObjectURL(f)); setDone(false); setOutput(""); setFinalUrl(""); setLoading(true); setStatus("Cutting background...")
    try{
      const fd=new FormData(); fd.append('file',f)
      const res=await fetch('/api/remove-bg',{method:'POST',body:fd})
      if(!res.ok) throw new Error('API failed')
      const blob=await res.blob(); setOutput(URL.createObjectURL(blob)); setDone(true); setStatus("Ready")
    }catch(err:any){ setStatus("Error: "+err.message) }
    setLoading(false)
  }

  const onBgFile=(e:any)=>{ const f=e.target.files?.[0]; if(!f) return; setBgImage(URL.createObjectURL(f)); setBgType("image"); setMainMode("withBg") }

  const downloadFile=()=>{ const url=finalUrl||output; if(!url) return; const a=document.createElement("a"); a.href=url; a.download=mainMode==="transparent"? "pinna3d-transparent.png" : `pinna3d-${bgType}-${Date.now()}.png`; a.click() }

  const getPreviewBg=()=>{
    if(!done) return { background:'#0A0814', backgroundImage:'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize:'18px 18px' }
    if(mainMode==="transparent") return checkerStyle
    if(bgType==="color") return { background:bgColor } as const
    if(bgType==="gradient") return { background:getCurrentGradientCss() } as const
    if(bgType==="image" && bgImage) return { backgroundImage:`url(${bgImage})`, backgroundSize:'cover', backgroundPosition:'center' } as const
    return { background:'#fff' } as const
  }

  const check=<span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>

  return(
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh',overflowX:'hidden'}}>
      <style>{`
.iv-grid{display:grid;grid-template-columns:1.15fr 0.85fr;gap:28px;padding:28px 24px;max-width:1440px;margin:0 auto;align-items:start}
.left-col{display:flex;flex-direction:column;min-width:0;gap:18px}
.six-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:560px}
.six-box{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:14px;padding:14px 16px;min-height:84px;display:flex;flex-direction:column;justify-content:center}
.box-1-1{width:82%;aspect-ratio:1/1;border-radius:16px;box-sizing:border-box;overflow:hidden;flex-shrink:0;margin-left:auto}
.upload-box{border:2px dashed rgba(160,32,240,0.55);background:rgba(15,13,28,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;cursor:pointer}
.upload-box img{width:100%;height:100%;object-fit:contain;padding:10px;background:rgba(15,13,28,0.95);border-radius:12px;box-sizing:border-box}
.preview-card{background:#15131E;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:14px;width:82%;box-sizing:border-box;display:flex;flex-direction:column;flex-shrink:0;margin-left:auto;min-height:580px}
.preview-box{border-radius:10px;width:100%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(160,32,240,0.22);overflow:hidden;position:relative;flex:1}
.seg{display:flex;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:4px;gap:4px}
.seg-btn{flex:1;padding:9px 10px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;border:1px solid transparent;transition:all 0.18s;text-align:center}
.seg-btn.active{background:#A020F0;color:#fff;box-shadow:0 0 14px rgba(160,32,240,0.45);border-color:#A020F0}
.seg-btn.idle{background:transparent;color:rgba(255,255,255,0.6)}
.hue-slider{width:100%;height:14px;border-radius:999px;-webkit-appearance:none;appearance:none;background:linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);outline:none;cursor:pointer;border:1px solid rgba(255,255,255,0.15)}
.hue-slider::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:2px solid #000;box-shadow:0 2px 8px rgba(0,0,0,0.4);cursor:pointer}
.gradient-bar{width:100%;height:14px;border-radius:999px;border:1px solid rgba(255,255,255,0.15);position:relative}
.tpl{height:54px;border-radius:10px;cursor:pointer;border:2px solid transparent;position:relative;overflow:hidden}
.tpl.active{border-color:#A020F0;box-shadow:0 0 0 2px rgba(160,32,240,0.3)}
.tpl span{position:absolute;bottom:4px;left:6px;font-size:9px;font-weight:700;background:rgba(0,0,0,0.55);padding:2px 6px;border-radius:6px;color:#fff}
.feat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-top:32px}
@media(max-width:900px){.iv-grid{grid-template-columns:1fr;padding:16px}.box-1-1,.preview-card{width:100%;margin-left:0}.feat-grid{grid-template-columns:1fr}}
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
            <div style={{display:'inline-flex',background:'rgba(160,32,240,0.14)',border:'1px solid rgba(160,32,240,0.28)',padding:'6px 12px',borderRadius:'20px',fontSize:'11px',color:'#D6A5FF',letterSpacing:'.12em',fontWeight:600}}>FOR SHOPIFY • AMAZON • BRAND DECKS</div>
            <h1 style={{fontSize:'50px',lineHeight:'1.05',margin:'18px 0 0',letterSpacing:'-0.02em'}}><span style={{fontWeight:700}}>Background gone.</span><br/><span style={{fontWeight:700}}>Product stays</span> <span style={{fontWeight:700, background:'linear-gradient(90deg,#A020F0 0%,#FF7AD1 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>perfect.</span></h1>
            <p style={{fontSize:'16px',lineHeight:1.7,color:'rgba(255,255,255,0.62)',marginTop:'14px',maxWidth:'540px'}}>AI that understands fur, lace, glass and soft shadows. Not a white paint bucket — a true alpha matte that survives any background you throw at it.</p>
          </div>
          <div className="six-grid">
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>INPUT</div><div style={{fontSize:'13px',fontWeight:700,marginTop:'6px'}}>JPG, PNG, WEBP, HEIC</div><div style={{fontSize:'11px',color:'#B88CFF',marginTop:'4px'}}>Up to 20MB</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>OUTPUT</div><div style={{fontSize:'13px',fontWeight:700,marginTop:'6px'}}>Transparent + With BG</div><div style={{fontSize:'11px',color:'#B88CFF',marginTop:'4px'}}>JPG / PNG / WEBP</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>TRUSTED</div><div style={{fontSize:'13px',fontWeight:700,marginTop:'6px'}}>50k+ Brands • 4.9/5</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>Shopify, Etsy, Amazon</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>QUALITY</div><div style={{fontSize:'13px',fontWeight:700,marginTop:'6px'}}>Edge decontamination</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>HD & 4K output</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>SPEED</div><div style={{fontSize:'13px',fontWeight:700,marginTop:'6px'}}>~1.7s per image</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>GPU accelerated</div></div>
            <div className="six-box"><div style={{fontSize:'10px',letterSpacing:'.12em',color:'rgba(255,255,255,0.45)',fontWeight:600}}>COST</div><div style={{fontSize:'13px',fontWeight:700,marginTop:'6px'}}>Free • Unlimited</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>No watermark</div></div>
          </div>
          <div style={{marginTop:'6px',maxWidth:'560px',height:'280px',background:'radial-gradient(130% 130% at 20% 20%, rgba(160,32,240,0.28), transparent 60%), radial-gradient(100% 100% at 80% 80%, rgba(255,122,209,0.20), transparent 60%), rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.10)',borderRadius:'16px',padding:'22px',display:'flex',alignItems:'center',gap:'20px'}}>
            <div style={{flex:'0 0 auto'}}><svg width="120" height="120" viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="46" stroke="#A020F0" strokeWidth="2" strokeDasharray="6 8"/><circle cx="60" cy="60" r="18" fill="#A020F0"/><path d="M38 60 L52 74 L84 42" stroke="#fff" strokeWidth="3" fill="none"/></svg></div>
            <div><div style={{fontSize:'40px',fontWeight:800,lineHeight:0.95}}>∞ Real Alpha.<br/><span style={{color:'#A020F0'}}>Not white filter.</span></div><div style={{fontSize:'13px',lineHeight:1.6,color:'rgba(255,255,255,0.60)',marginTop:'10px'}}>Checkerboard = proof. Drop it on purple, black, neon — edges stay clean.</div></div>
          </div>
        </div>

        <div style={{minWidth:0,display:'flex',flexDirection:'column',gap:'16px',alignItems:'flex-end'}}>
          <div className="box-1-1 upload-box" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} alt="input"/> : <><div style={{width:'56px',height:'56px',background:'rgba(160,32,240,0.18)',border:'2px solid rgba(160,32,240,0.4)',borderRadius:'14px',display:'grid',placeItems:'center',marginBottom:'14px'}}>✂️</div><b style={{fontSize:'18px',fontWeight:500}}>Drop image to remove BG</b><div style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>or browse to upload</div></>}
          </div>

          <div className="preview-card">
            <div className="seg">
              <button className={`seg-btn ${mainMode==="transparent"?"active":"idle"}`} onClick={()=>setMainMode("transparent")}>Without Background</button>
              <button className={`seg-btn ${mainMode==="withBg"?"active":"idle"}`} onClick={()=>setMainMode("withBg")}>With Background</button>
            </div>

            {mainMode==="withBg" && (
              <div style={{marginTop:'12px',display:'flex',flexDirection:'column',gap:'12px'}}>
                <div style={{display:'flex',gap:'6px'}}>
                  <button className={`seg-btn ${bgType==="color"?"active":"idle"}`} style={{padding:'6px',fontSize:'11px'}} onClick={()=>setBgType("color")}>Color</button>
                  <button className={`seg-btn ${bgType==="gradient"?"active":"idle"}`} style={{padding:'6px',fontSize:'11px'}} onClick={()=>setBgType("gradient")}>Gradient</button>
                  <button className={`seg-btn ${bgType==="image"?"active":"idle"}`} style={{padding:'6px',fontSize:'11px'}} onClick={()=>setBgType("image")}>Upload BG</button>
                </div>

                {bgType==="color" && (
                  <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'10px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.10)',borderRadius:'10px',padding:'12px'}}>
                      <div style={{width:'26px',height:'26px',borderRadius:'7px',background:bgColor,border:'1px solid rgba(255,255,255,0.25)'}} />
                      <input type="range" min="0" max="360" value={hue} className="hue-slider" style={{flex:1}} onChange={e=>{ const h=parseInt(e.target.value); setHue(h); setBgColor(hslToHex(h)) }} />
                      <input type="color" value={bgColor} onChange={e=>setBgColor(e.target.value)} style={{width:'26px',height:'26px',borderRadius:'6px',border:'none',padding:0,cursor:'pointer',background:'transparent'}} />
                    </div>
                    <div style={{fontSize:'10px',color:'rgba(255,255,255,0.45)'}}>{bgColor.toUpperCase()} • Solid fill</div>
                  </div>
                )}

                {bgType==="gradient" && (
                  <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px'}}>
                      {Object.entries(gradients).map(([k,v])=>(
                        <div key={k} className={`tpl ${gPreset===k?'active':''}`} style={{background:v}} onClick={()=>{ setGPreset(k); setGColor1(presetColorsForGradient[k][0]); setGColor2(presetColorsForGradient[k][1]) }}><span>{k.toUpperCase()}</span></div>
                      ))}
                    </div>

                    <div style={{display:'flex',flexDirection:'column',gap:'8px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',padding:'10px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        <span style={{fontSize:'10px',color:'rgba(255,255,255,0.5)',width:'32px'}}>FROM</span>
                        <div style={{width:'20px',height:'20px',borderRadius:'6px',background:gColor1,border:'1px solid rgba(255,255,255,0.2)'}} />
                        <input type="range" min="0" max="360" value={gHue1} className="hue-slider" style={{flex:1}} onChange={e=>{ const h=parseInt(e.target.value); setGHue1(h); setGColor1(hslToHex(h)) }} />
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        <span style={{fontSize:'10px',color:'rgba(255,255,255,0.5)',width:'32px'}}>TO</span>
                        <div style={{width:'20px',height:'20px',borderRadius:'6px',background:gColor2,border:'1px solid rgba(255,255,255,0.2)'}} />
                        <input type="range" min="0" max="360" value={gHue2} className="hue-slider" style={{flex:1}} onChange={e=>{ const h=parseInt(e.target.value); setGHue2(h); setGColor2(hslToHex(h)) }} />
                      </div>
                      <div className="gradient-bar" style={{background:getCurrentGradientCss(), marginTop:'4px'}} />
                      <div style={{display:'flex',justifyContent:'space-between',fontSize:'9px',color:'rgba(255,255,255,0.4)'}}><span>{gColor1}</span><span>{gAngle}°</span><span>{gColor2}</span></div>
                      <input type="range" min="0" max="360" value={gAngle} onChange={e=>setGAngle(parseInt(e.target.value))} style={{width:'100%',height:'4px',accentColor:'#A020F0'}} />
                    </div>
                  </div>
                )}

                {bgType==="image" && (
                  <div>
                    <input ref={bgFileRef} type="file" hidden accept="image/*" onChange={onBgFile}/>
                    <button onClick={()=>bgFileRef.current?.click()} style={{width:'100%',padding:'10px',borderRadius:'8px',background:'rgba(255,255,255,0.08)',border:'1px dashed rgba(255,255,255,0.18)',color:'#fff',fontSize:'12px',cursor:'pointer'}}>
                      {bgImage? "Change background image" : "Upload your background"}
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="preview-box" style={{marginTop:'12px', minHeight:'280px',...getPreviewBg()}}>
              {loading? <div style={{color:'#fff',fontSize:'12px',textAlign:'center',zIndex:2,background:'rgba(0,0,0,0.6)',padding:'10px 14px',borderRadius:'8px'}}>{status}</div> : done && (finalUrl || output)? <img src={finalUrl || output} style={{maxWidth:'92%',maxHeight:'92%',objectFit:'contain', position:'relative', zIndex:2}} alt="result"/> : <div style={{color:'rgba(255,255,255,0.6)',fontSize:'12px',textAlign:'center',zIndex:2}}>Upload image<br/>to see result</div>}
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'12px'}}>
              <button onClick={()=>{
                if(!output) return;
                const bgCss = mainMode==="transparent"? "background-color:#1a1a1a;background-image:linear-gradient(45deg,#2a2a2a 25%,transparent 25%),linear-gradient(-45deg,#2a2a2a 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#2a2a2a 75%),linear-gradient(-45deg,transparent 75%,#2a2a2a 75%);background-size:20px 20px" : bgType==="color"? `background:${bgColor}` : bgType==="gradient"? `background:${getCurrentGradientCss()}` : `background-image:url(${bgImage});background-size:cover`
                const html = `<html><body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;${bgCss}"><img src="${finalUrl || output}" style="max-width:90vw;max-height:90vh"/></body></html>`;
                const w=window.open(); w?.document.write(html);
              }} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',cursor:'pointer'}}>Preview</button>
              <button onClick={downloadFile} style={{background:done?'#A020F0':'#333',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'12px',border:'none',cursor:done?'pointer':'not-allowed'}}>Download Image</button>
            </div>
          </div>
        </div>
      </div>

      {/* LOCKED FOOTER */}
      <div style={{padding:'40px 24px 40px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <h2 style={{textAlign:'center',fontSize:'30px',fontWeight:500}}>Why designers choose Background Remover</h2>
        <div className="feat-grid">
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>{check}True AI, Not White Filter</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>Works on any background, even complex.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>{check}100% Private & Fast</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>Runs in your browser, no server upload.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'16px'}}>{check}E-commerce Ready</h3><p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'8px'}}>Perfect for Shopify, Amazon, Etsy listings.</p></div>
        </div>
        <div style={{textAlign:'center',marginTop:'30px'}}><a href="/signup" style={{background:'#A020F0',padding:'12px 24px',borderRadius:'10px',color:'#fff',textDecoration:'none',fontWeight:500}}>Start Removing Free — No CC</a></div>
      </div>
      <footer style={{borderTop:'1px solid rgba(255,255,255,0.08)',padding:'20px 24px',textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.4)'}}>© 2026 Pinna3d.com • Background Remover Tool</footer>
    </div>
  )
}
