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
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  } as const

  const hslToHex = (h:number)=>{
    const s=100,l=50; const k=(n:number)=>(n+h/30)%12; const a=s/100*Math.min(l/100,1-l/100);
    const f=(n:number)=>l/100-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));
    const toHex=(x:number)=>Math.round(x*255).toString(16).padStart(2,'0');
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
  }
  const hexToRgb = (hex:string)=>{
    const h=hex.replace('#',''); const full=h.length===3?h.split('').map(c=>c+c).join(''):h; const num=parseInt(full,16);
    return {r:(num>>16)&255,g:(num>>8)&255,b:num&255}
  }
  const rgbToCmyk = (r:number,g:number,b:number)=>{
    if(r===0&&g===0&&b===0) return {c:0,m:0,y:0,k:100}
    let c=1-r/255,m=1-g/255,y=1-b/255; const k=Math.min(c,m,y)
    c=(c-k)/(1-k); m=(m-k)/(1-k); y=(y-k)/(1-k)
    return {c:Math.round(c*100),m:Math.round(m*100),y:Math.round(y*100),k:Math.round(k*100)}
  }
  const getCurrentGradientCss = ()=> `linear-gradient(${gAngle}deg, ${gColor1} 0%, ${gColor2} 100%)`

  const buildFinal = async ()=>{
    if(!output) return
    const img=new Image(); img.crossOrigin="anonymous"; img.src=output
    await new Promise<void>((res)=>{ img.onload=()=>res(); img.onerror=()=>res() })
    const canvas=document.createElement('canvas'); canvas.width=img.naturalWidth||1024; canvas.height=img.naturalHeight||1024
    const ctx=canvas.getContext('2d')!
    if(mainMode!=="transparent"){
      if(bgType==="color"){ ctx.fillStyle=bgColor; ctx.fillRect(0,0,canvas.width,canvas.height) }
      else if(bgType==="gradient"){
        const grad=ctx.createLinearGradient(0,0,Math.cos(gAngle*Math.PI/180)*canvas.width,Math.sin(gAngle*Math.PI/180)*canvas.height)
        grad.addColorStop(0,gColor1); grad.addColorStop(1,gColor2); ctx.fillStyle=grad; ctx.fillRect(0,0,canvas.width,canvas.height)
      }else if(bgType==="image" && bgImage){
        const bgImg=new Image(); bgImg.crossOrigin="anonymous"; bgImg.src=bgImage
        await new Promise<void>((res)=>{ bgImg.onload=()=>res(); bgImg.onerror=()=>res() })
        const scale=Math.max(canvas.width/bgImg.width,canvas.height/bgImg.height)
        ctx.drawImage(bgImg,(canvas.width-bgImg.width*scale)/2,(canvas.height-bgImg.height*scale)/2,bgImg.width*scale,bgImg.height*scale)
      }
    }else{
      if(outFormat==="jpg"){
        ctx.fillStyle="#ffffff"; ctx.fillRect(0,0,canvas.width,canvas.height)
      }
    }
    ctx.drawImage(img,0,0,canvas.width,canvas.height)
    const mime = outFormat==="jpg"? "image/jpeg" : outFormat==="webp"? "image/webp" : "image/png"
    setFinalUrl(canvas.toDataURL(mime,0.92))
  }

  useEffect(()=>{ if(done) buildFinal() },[mainMode,bgType,bgColor,bgImage,gColor1,gColor2,gAngle,done,output,outFormat])

  const onFile=async(e:any)=>{
    const f=e.dataTransfer?.files?.[0] || e.target?.files?.[0]; if(!f) return
    setPreview(URL.createObjectURL(f)); setDone(false); setOutput(""); setFinalUrl(""); setLoading(true); setStatus("Cutting background...")
    try{ const fd=new FormData(); fd.append('file',f); const res=await fetch('/api/remove-bg',{method:'POST',body:fd}); if(!res.ok) throw new Error('API failed'); const blob=await res.blob(); setOutput(URL.createObjectURL(blob)); setDone(true); setStatus("Ready") }
    catch(err:any){ setStatus("Error: "+(err?.message||"failed")) } setLoading(false)
  }
  const onBgFile=(e:any)=>{ const f=e.target.files?.[0]; if(!f) return; setBgImage(URL.createObjectURL(f)); setBgType("image"); setMainMode("withBg") }

  const openEyeDropper = async (setter:(c:string)=>void)=>{
    try{
      const win = window as any
      if(win.EyeDropper){
        const ed = new win.EyeDropper()
        const result = await ed.open()
        if(result?.sRGBHex) setter(result.sRGBHex)
      }
    }catch{}
  }

  const downloadFile=()=>{
    const url=finalUrl||output; if(!url) return
    const a=document.createElement("a"); a.href=url
    const ext = outFormat==="jpg"? "jpg" : outFormat==="webp"? "webp" : "png"
    a.download=`pinna3d-${mainMode}-${Date.now()}.${ext}`; a.click()
  }

  const getPreviewBg=()=>{
    if(!done) return { background:'#0A0814', backgroundImage:'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize:'18px 18px' }
    if(mainMode==="transparent") return checkerStyle
    if(bgType==="color") return { background:bgColor } as const
    if(bgType==="gradient") return { background:getCurrentGradientCss() } as const
    if(bgType==="image" && bgImage) return { backgroundImage:`url(${bgImage})`, backgroundSize:'cover', backgroundPosition:'center' } as const
    return { background:'#fff' } as const
  }

  const IconBox = ({children}:{children:any})=> <div style={{width:'28px',height:'28px',borderRadius:'8px',background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.25)',display:'grid',placeItems:'center',fontSize:'14px',flexShrink:0}}>{children}</div>

  return(
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh',overflowX:'hidden'}}>
      <style>{`
.iv-grid{display:grid;grid-template-columns:1.14fr 0.86fr;gap:14px;padding:18px 20px 18px 24px;max-width:1440px;margin:0 auto;align-items:start}
.left-col{display:flex;flex-direction:column;min-width:0;gap:12px}
.six-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:560px}
.six-box{background:rgba(255,255,255,0.045);border:1px solid rgba(255,255,255,0.09);border-radius:12px;padding:12px 14px;min-height:72px;display:flex;gap:10px;align-items:center}
.box-1-1{width:84%;aspect-ratio:1/1;border-radius:14px;overflow:hidden;flex-shrink:0;margin-left:auto}
.upload-box{border:2px dashed rgba(160,32,240,0.55);background:rgba(15,13,28,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;cursor:pointer}
.upload-box img{width:100%;height:100%;object-fit:contain;padding:8px;background:rgba(15,13,28,0.95);border-radius:10px}
.preview-card{background:#15131E;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:12px;width:84%;box-sizing:border-box;display:flex;flex-direction:column;flex-shrink:0;margin-left:auto}
.preview-box{border-radius:10px;width:100%;display:flex;align-items:center;justify-content:center;border:1px solid rgba(160,32,240,0.22);overflow:hidden;position:relative;flex:1;min-height:320px}
.color-card{background:#15131E;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px;width:84%;box-sizing:border-box;margin-left:auto}
.seg{display:flex;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:3px;gap:3px}
.seg-btn{flex:1;padding:8px 8px;border-radius:8px;font-size:11px;font-weight:600;cursor:pointer;border:1px solid transparent;transition:all 0.18s;text-align:center}
.seg-btn.active{background:#A020F0;color:#fff;box-shadow:0 0 14px rgba(160,32,240,0.45);border-color:#A020F0}
.seg-btn.idle{background:transparent;color:rgba(255,255,255,0.6)}
.hue-slider{width:100%;height:14px;border-radius:999px;-webkit-appearance:none;appearance:none;background:linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);outline:none;cursor:pointer;border:1px solid rgba(255,255,255,0.18)}
.hue-slider::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#fff;border:2px solid #000;box-shadow:0 2px 8px rgba(0,0,0,0.5);cursor:pointer}
.circle-sw{width:30px;height:30px;border-radius:50%;cursor:pointer;border:2px solid rgba(255,255,255,0.22);display:grid;place-items:center;transition:all 0.15s;flex-shrink:0}
.circle-sw.active{border-color:#fff;box-shadow:0 0 0 2.5px #A020F0;transform:scale(1.08)}
.circle-sw.white{background:#fff}
.circle-sw.black{background:#000}
.code-input{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:8px 10px;color:#fff;font-size:12px;font-family:monospace;width:100%;outline:none}
.code-input:focus{border-color:#A020F0}
.meta-box{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:6px 8px}
.meta-label{font-size:8px;color:rgba(255,255,255,0.45);letter-spacing:0.06em;font-weight:700}
.rgb-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:6px 8px;color:#fff;font-size:11px;font-family:monospace;text-align:center;outline:none}
.rgb-input:focus{border-color:#A020F0}
.fmt-btn{padding:6px 12px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid rgba(255,255,255,0.14);background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.6);transition:all 0.15s}
.fmt-btn.active{background:#fff;color:#000;border-color:#fff;box-shadow:0 0 0 2px rgba(160,32,240,0.4)}
.picker-btn{width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);display:grid;place-items:center;cursor:pointer;flex-shrink:0;font-size:14px}
.gradient-bar{width:100%;height:16px;border-radius:999px;border:1px solid rgba(255,255,255,0.18)}
.bottom-fill{max-width:560px;background:linear-gradient(135deg, rgba(160,32,240,0.22) 0%, rgba(255,122,209,0.18) 50%, rgba(255,255,255,0.03) 100%);border:1px solid rgba(255,255,255,0.10);border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:12px}
.feat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-top:28px}
@media(max-width:900px){.iv-grid{grid-template-columns:1fr;padding:14px;gap:14px}.box-1-1,.preview-card,.color-card{width:100%;margin-left:0}.bottom-fill{max-width:100%}.feat-grid{grid-template-columns:1fr}}
      `}</style>

      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 20px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
        <a href="/" style={{marginLeft:'-8px'}}><img src="/logo.png" alt="Pinna3d.com" style={{height:'72px',width:'auto'}}/></a>
        <div style={{display:'flex',gap:'16px',alignItems:'center',fontSize:'13px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Home</a><span style={{color:'#A020F0',fontWeight:600}}>Background Remover</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.08)',padding:'8px 14px',borderRadius:'9px',border:'1px solid rgba(255,255,255,0.12)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',boxShadow:'0 0 18px rgba(160,32,240,0.5)',padding:'8px 16px',borderRadius:'9px',color:'#fff',textDecoration:'none',fontWeight:600}}>Get Started</a>
        </div>
      </header>

      <div className="iv-grid">
        <div className="left-col">
          <div>
            <div style={{display:'inline-flex',background:'rgba(160,32,240,0.14)',border:'1px solid rgba(160,32,240,0.28)',padding:'5px 10px',borderRadius:'20px',fontSize:'10px',color:'#D6A5FF',letterSpacing:'.12em',fontWeight:700}}>BUILT FOR SELLERS, NOT SELFIES</div>
            <h1 style={{fontSize:'42px',lineHeight:'0.98',margin:'12px 0 0',letterSpacing:'-0.03em',fontWeight:800}}>
              Kill the background.<br/>Keep the <span style={{background:'linear-gradient(90deg,#A020F0 0%,#FF7AD1 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>money shot.</span>
            </h1>
            <p style={{fontSize:'14px',lineHeight:1.6,color:'rgba(255,255,255,0.60)',marginTop:'10px',maxWidth:'520px'}}>Your camera captured the product. We capture the edge. Fur, lace, glass, glow — true 32-bit alpha that doesn't choke on white.</p>
          </div>
          <div className="six-grid">
            <div className="six-box"><IconBox>📥</IconBox><div><div style={{fontSize:'9px',color:'rgba(255,255,255,0.4)',fontWeight:700}}>INPUT MAGIC</div><div style={{fontSize:'12px',fontWeight:700}}>JPG, PNG, WEBP, HEIC</div><div style={{fontSize:'10px',color:'#B88CFF'}}>Up to 20MB • Drag & Drop</div></div></div>
            <div className="six-box"><IconBox>🎯</IconBox><div><div style={{fontSize:'9px',color:'rgba(255,255,255,0.4)',fontWeight:700}}>OUTPUT THAT SELLS</div><div style={{fontSize:'12px',fontWeight:700}}>Transparent + White + Brand</div><div style={{fontSize:'10px',color:'#B88CFF'}}>Amazon / Shopify Ready</div></div></div>
            <div className="six-box"><IconBox>⚡</IconBox><div><div style={{fontSize:'9px',color:'rgba(255,255,255,0.4)',fontWeight:700}}>SPEED OBSESSED</div><div style={{fontSize:'12px',fontWeight:700}}>~1.7s per image • GPU</div><div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)'}}>No queue, no lag</div></div></div>
            <div className="six-box"><IconBox>💎</IconBox><div><div style={{fontSize:'9px',color:'rgba(255,255,255,0.4)',fontWeight:700}}>QUALITY CHECK</div><div style={{fontSize:'12px',fontWeight:700}}>Hair intact • No halo</div><div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)'}}>HD & 4K alpha</div></div></div>
            <div className="six-box"><IconBox>🔒</IconBox><div><div style={{fontSize:'9px',color:'rgba(255,255,255,0.4)',fontWeight:700}}>TRUSTED</div><div style={{fontSize:'12px',fontWeight:700}}>50k+ Sellers • 4.9/5</div><div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)'}}>Etsy, Shopify, Amazon</div></div></div>
            <div className="six-box"><IconBox>♾️</IconBox><div><div style={{fontSize:'9px',color:'rgba(255,255,255,0.4)',fontWeight:700}}>PRICE</div><div style={{fontSize:'12px',fontWeight:700}}>Free • Unlimited • No logo</div><div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)'}}>Seriously free</div></div></div>
          </div>
          <div className="bottom-fill">
            <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
              <div style={{width:'64px',height:'64px',borderRadius:'50%',background:'radial-gradient(circle at 30% 30%, #A020F0, #4a0e8a)',border:'2px dashed rgba(255,255,255,0.25)',display:'grid',placeItems:'center'}}><span style={{fontSize:'26px'}}>✓</span></div>
              <div><div style={{fontSize:'24px',fontWeight:800,lineHeight:1}}>Real Alpha,<br/><span style={{color:'#FF7AD1'}}>Not White Paint.</span></div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.6)',marginTop:'4px'}}>No dirty edge. Put shoe on grass → neon pink, still clean.</div></div>
            </div>
          </div>
        </div>

        <div style={{minWidth:0,display:'flex',flexDirection:'column',gap:'12px',alignItems:'flex-end'}}>
          <div className="box-1-1 upload-box" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} alt="input"/> : <><div style={{width:'52px',height:'52px',background:'rgba(160,32,240,0.18)',border:'2px solid rgba(160,32,240,0.4)',borderRadius:'12px',display:'grid',placeItems:'center',marginBottom:'10px'}}>✂️</div><b style={{fontSize:'15px',fontWeight:600}}>Drop to erase background</b><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>or click to browse</div></>}
          </div>

          <div className="preview-card">
            {/* TOP ROW WITH FORMAT SELECTORS - AS YOU MARKED */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
              <div className="seg" style={{flex:1,marginRight:'10px'}}>
                <button className={`seg-btn ${mainMode==="transparent"?"active":"idle"}`} onClick={()=>setMainMode("transparent")}>Without BG</button>
                <button className={`seg-btn ${mainMode==="withBg"?"active":"idle"}`} onClick={()=>setMainMode("withBg")}>With BG</button>
              </div>
              <div style={{display:'flex',gap:'6px'}}>
                <button className={`fmt-btn ${outFormat==="png"?"active":""}`} onClick={()=>setOutFormat("png")}>PNG</button>
                <button className={`fmt-btn ${outFormat==="jpg"?"active":""}`} onClick={()=>setOutFormat("jpg")}>JPG</button>
                <button className={`fmt-btn ${outFormat==="webp"?"active":""}`} onClick={()=>setOutFormat("webp")}>WEBP</button>
              </div>
            </div>

            <div className="preview-box" style={getPreviewBg() as any}>
              {loading? <div style={{color:'#fff',fontSize:'11px',background:'rgba(0,0,0,0.6)',padding:'8px 12px',borderRadius:'8px',zIndex:2}}>{status}</div> : done && (finalUrl || output)? <img src={finalUrl || output} style={{maxWidth:'90%',maxHeight:'90%',objectFit:'contain',zIndex:2}} alt="result"/> : <div style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',textAlign:'center',zIndex:2}}>Upload image<br/>to see result</div>}
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
              <button onClick={()=>{ if(!output) return; const bgCss = mainMode==="transparent"? "background-color:#1a1a1a;background-image:linear-gradient(45deg,#2a2a2a 25%,transparent 25%),linear-gradient(-45deg,#2a2a2a 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#2a2a2a 75%),linear-gradient(-45deg,transparent 75%,#2a2a2a 75%);background-size:20px 20px" : bgType==="color"? `background:${bgColor}` : bgType==="gradient"? `background:${getCurrentGradientCss()}` : `background-image:url(${bgImage});background-size:cover`; const html=`<html><body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;${bgCss}"><img src="${finalUrl||output}" style="max-width:90vw;max-height:90vh"/></body></html>`; const w=window.open(); w?.document.write(html); }} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'9px',borderRadius:'8px',color:'#fff',fontSize:'11px',cursor:'pointer'}}>Preview</button>
              <button onClick={downloadFile} style={{background:done?'#A020F0':'#333',padding:'9px',borderRadius:'8px',color:'#fff',fontSize:'11px',border:'none',cursor:done?'pointer':'not-allowed',fontWeight:600}}>Download {outFormat.toUpperCase()}</button>
            </div>
          </div>

          <div className="color-card" style={{display: mainMode==="withBg"? 'block' : 'none'}}>
            <div style={{display:'flex',gap:'6px',marginBottom:'12px'}}>
              <button className={`seg-btn ${bgType==="color"?"active":"idle"}`} style={{padding:'7px',fontSize:'11px'}} onClick={()=>setBgType("color")}>Color</button>
              <button className={`seg-btn ${bgType==="gradient"?"active":"idle"}`} style={{padding:'7px',fontSize:'11px'}} onClick={()=>setBgType("gradient")}>Gradient</button>
              <button className={`seg-btn ${bgType==="image"?"active":"idle"}`} style={{padding:'7px',fontSize:'11px'}} onClick={()=>setBgType("image")}>Upload BG</button>
            </div>

            {bgType==="color" && (
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <div className={`circle-sw white ${bgColor==="#ffffff"?"active":""}`} onClick={()=>{setBgColor("#ffffff"); setHue(0)}} />
                  <div className={`circle-sw black ${bgColor==="#000000"?"active":""}`} onClick={()=>setBgColor("#000000")} />
                  <div style={{flex:1}} />
                  <input ref={colorInputRef} type="color" hidden value={bgColor} onChange={e=>setBgColor(e.target.value)} />
                  <div className="picker-btn" onClick={()=>colorInputRef.current?.click()}>🎨</div>
                  <div className="picker-btn" onClick={()=>openEyeDropper(setBgColor)}>👁️</div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,0.05)',borderRadius:'8px',padding:'8px'}}>
                  <div style={{width:'22px',height:'22px',borderRadius:'50%',background:bgColor,border:'2px solid #fff'}} />
                  <input type="range" min="0" max="360" value={hue} className="hue-slider" style={{flex:1}} onChange={e=>{ const h=parseInt(e.target.value); setHue(h); setBgColor(hslToHex(h)) }} />
                </div>
                <div>
                  <div className="meta-label">HEX - EDITABLE</div>
                  <input className="code-input" value={bgColor} onChange={e=>{ let v=e.target.value.trim(); if(!v.startsWith('#')) v='#'+v; if(/^#([0-9A-Fa-f]{3,8})$/.test(v)) setBgColor(v.toLowerCase()) }} />
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'6px',marginTop:'8px'}}>
                    {(()=>{ const {r,g,b}=hexToRgb(bgColor); return (<>
                      <div><div className="meta-label">R</div><input className="rgb-input" type="number" value={r} onChange={e=>{ const v=Math.min(255,Math.max(0,parseInt(e.target.value)||0)); const {g,b}=hexToRgb(bgColor); setBgColor(`#${[v,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')}`) }} /></div>
                      <div><div className="meta-label">G</div><input className="rgb-input" type="number" value={g} onChange={e=>{ const v=Math.min(255,Math.max(0,parseInt(e.target.value)||0)); const {r,b}=hexToRgb(bgColor); setBgColor(`#${[r,v,b].map(x=>x.toString(16).padStart(2,'0')).join('')}`) }} /></div>
                      <div><div className="meta-label">B</div><input className="rgb-input" type="number" value={b} onChange={e=>{ const v=Math.min(255,Math.max(0,parseInt(e.target.value)||0)); const {r,g}=hexToRgb(bgColor); setBgColor(`#${[r,g,v].map(x=>x.toString(16).padStart(2,'0')).join('')}`) }} /></div>
                    </>)})()}
                  </div>
                </div>
              </div>
            )}

            {bgType==="gradient" && (
              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'6px'}}><span style={{fontSize:'9px',fontWeight:800,width:'32px',color:'rgba(255,255,255,0.6)'}}>FROM</span><div className={`circle-sw white ${gColor1==="#ffffff"?"active":""}`} style={{width:'24px',height:'24px'}} onClick={()=>setGColor1("#ffffff")} /><div className={`circle-sw black ${gColor1==="#000000"?"active":""}`} style={{width:'24px',height:'24px'}} onClick={()=>setGColor1("#000000")} /><div style={{flex:1}} /><input ref={g1InputRef} type="color" hidden value={gColor1} onChange={e=>setGColor1(e.target.value)} /><div className="picker-btn" style={{width:'26px',height:'26px'}} onClick={()=>g1InputRef.current?.click()}>🎨</div><div className="picker-btn" style={{width:'26px',height:'26px'}} onClick={()=>openEyeDropper(setGColor1)}>👁️</div></div>
                  <input className="code-input" value={gColor1} onChange={e=>{ let v=e.target.value; if(!v.startsWith('#')) v='#'+v; if(/^#([0-9A-Fa-f]{3,8})$/.test(v)) setGColor1(v) }} />
                  <input type="range" min="0" max="360" value={gHue1} className="hue-slider" style={{marginTop:'6px',height:'10px'}} onChange={e=>{ const h=parseInt(e.target.value); setGHue1(h); setGColor1(hslToHex(h)) }} />
                </div>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'6px'}}><span style={{fontSize:'9px',fontWeight:800,width:'32px',color:'rgba(255,255,255,0.6)'}}>TO</span><div className={`circle-sw white ${gColor2==="#ffffff"?"active":""}`} style={{width:'24px',height:'24px'}} onClick={()=>setGColor2("#ffffff")} /><div className={`circle-sw black ${gColor2==="#000000"?"active":""}`} style={{width:'24px',height:'24px'}} onClick={()=>setGColor2("#000000")} /><div style={{flex:1}} /><input ref={g2InputRef} type="color" hidden value={gColor2} onChange={e=>setGColor2(e.target.value)} /><div className="picker-btn" style={{width:'26px',height:'26px'}} onClick={()=>g2InputRef.current?.click()}>🎨</div><div className="picker-btn" style={{width:'26px',height:'26px'}} onClick={()=>openEyeDropper(setGColor2)}>👁️</div></div>
                  <input className="code-input" value={gColor2} onChange={e=>{ let v=e.target.value; if(!v.startsWith('#')) v='#'+v; if(/^#([0-9A-Fa-f]{3,8})$/.test(v)) setGColor2(v) }} />
                  <input type="range" min="0" max="360" value={gHue2} className="hue-slider" style={{marginTop:'6px',height:'10px'}} onChange={e=>{ const h=parseInt(e.target.value); setGHue2(h); setGColor2(hslToHex(h)) }} />
                </div>
                <div><div className="gradient-bar" style={{background:getCurrentGradientCss()}} /><input type="range" min="0" max="360" value={gAngle} onChange={e=>setGAngle(parseInt(e.target.value))} style={{width:'100%',accentColor:'#A020F0',marginTop:'8px'}} /></div>
              </div>
            )}
            {bgType==="image" && (<div><input ref={bgFileRef} type="file" hidden accept="image/*" onChange={onBgFile}/><button onClick={()=>bgFileRef.current?.click()} style={{width:'100%',padding:'10px',borderRadius:'8px',background:'rgba(255,255,255,0.08)',border:'1px dashed rgba(255,255,255,0.18)',color:'#fff',fontSize:'11px',cursor:'pointer'}}>{bgImage? "Change background image" : "Upload your background"}</button></div>)}
          </div>
        </div>
      </div>

      <div style={{padding:'32px 20px 32px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <h2 style={{textAlign:'center',fontSize:'26px',fontWeight:600}}>Why sellers ditch Photoshop for this</h2>
        <div className="feat-grid">
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'14px',padding:'16px'}}><h3 style={{margin:0,fontSize:'14px'}}>✓ Real alpha, not fake white</h3><p style={{color:'rgba(255,255,255,0.55)',fontSize:'12px',marginTop:'6px'}}>Even curly hair survives. No white fringe.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'14px',padding:'16px'}}><h3 style={{margin:0,fontSize:'14px'}}>✓ Private & instant</h3><p style={{color:'rgba(255,255,255,0.55)',fontSize:'12px',marginTop:'6px'}}>Runs in browser, no upload to server.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'14px',padding:'16px'}}><h3 style={{margin:0,fontSize:'14px'}}>✓ Catalog ready in 1 click</h3><p style={{color:'rgba(255,255,255,0.55)',fontSize:'12px',marginTop:'6px'}}>PNG, JPG, WEBP — export any format.</p></div>
        </div>
      </div>
      <footer style={{borderTop:'1px solid rgba(255,255,255,0.08)',padding:'16px 20px',textAlign:'center',fontSize:'11px',color:'rgba(255,255,255,0.4)'}}>© 2026 Pinna3d.com • Background Remover Tool</footer>
    </div>
  )
}
