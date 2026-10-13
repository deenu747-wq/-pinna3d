"use client"
import { useState, useRef, useEffect } from "react"
type MainMode="transparent"|"withBg"; type BgType="color"|"gradient"|"image"; type OutFormat="png"|"jpg"|"webp"
export default function BgRemoverPage(){
  const [preview,setPreview]=useState(""); const [output,setOutput]=useState(""); const [finalUrl,setFinalUrl]=useState(""); const [done,setDone]=useState(false); const [loading,setLoading]=useState(false); const [status,setStatus]=useState("")
  const [mainMode,setMainMode]=useState<MainMode>("transparent"); const [bgType,setBgType]=useState<BgType>("color"); const [bgColor,setBgColor]=useState("#ffffff"); const [hue,setHue]=useState(0)
  const [gColor1,setGColor1]=useState("#ffffff"); const [gColor2,setGColor2]=useState("#000000"); const [gHue1,setGHue1]=useState(0); const [gHue2,setGHue2]=useState(0); const [gAngle,setGAngle]=useState(135)
  const [bgImage,setBgImage]=useState(""); const [outFormat,setOutFormat]=useState<OutFormat>("png")
  const fileRef=useRef<HTMLInputElement>(null); const bgFileRef=useRef<HTMLInputElement>(null); const colorInputRef=useRef<HTMLInputElement>(null); const g1InputRef=useRef<HTMLInputElement>(null); const g2InputRef=useRef<HTMLInputElement>(null)

  const checker={backgroundColor:'#1a1a1a',backgroundImage:`linear-gradient(45deg,#2a2a2a 25%,transparent 25%),linear-gradient(-45deg,#2a2a2a 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#2a2a2a 75%),linear-gradient(-45deg,transparent 75%,#2a2a2a 75%)`,backgroundSize:'20px 20px',backgroundPosition:'0 0,0 10px,10px -10px,-10px 0px'} as const
  const hslToHex=(h:number)=>{const s=100,l=50; const k=(n:number)=>(n+h/30)%12; const a=s/100*Math.min(l/100,1-l/100); const f=(n:number)=>l/100-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1))); const toHex=(x:number)=>Math.round(x*255).toString(16).padStart(2,'0'); return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`}
  const hexToRgb=(hex:string)=>{const h=hex.replace('#',''); const f=h.length===3?h.split('').map(c=>c+c).join(''):h; const n=parseInt(f,16); return {r:(n>>16)&255,g:(n>>8)&255,b:n&255}}
  const getGradient=()=>`linear-gradient(${gAngle}deg,${gColor1} 0%,${gColor2} 100%)`
  const buildFinal=async()=>{if(!output)return; const img=new Image(); img.crossOrigin="anonymous"; img.src=output; await new Promise<void>(r=>{img.onload=()=>r(); img.onerror=()=>r()}); const c=document.createElement('canvas'); c.width=img.naturalWidth||1024; c.height=img.naturalHeight||1024; const ctx=c.getContext('2d')!; if(mainMode!=="transparent"){if(bgType==="color"){ctx.fillStyle=bgColor; ctx.fillRect(0,0,c.width,c.height)}else if(bgType==="gradient"){const g=ctx.createLinearGradient(0,0,Math.cos(gAngle*Math.PI/180)*c.width,Math.sin(gAngle*Math.PI/180)*c.height); g.addColorStop(0,gColor1); g.addColorStop(1,gColor2); ctx.fillStyle=g; ctx.fillRect(0,0,c.width,c.height)}else if(bgType==="image"&&bgImage){const b=new Image(); b.crossOrigin="anonymous"; b.src=bgImage; await new Promise<void>(r=>{b.onload=()=>r(); b.onerror=()=>r()}); const sc=Math.max(c.width/b.width,c.height/b.height); ctx.drawImage(b,(c.width-b.width*sc)/2,(c.height-b.height*sc)/2,b.width*sc,b.height*sc)}}else if(outFormat==="jpg"){ctx.fillStyle="#fff"; ctx.fillRect(0,0,c.width,c.height)}; ctx.drawImage(img,0,0,c.width,c.height); setFinalUrl(c.toDataURL(outFormat==="jpg"?"image/jpeg":outFormat==="webp"?"image/webp":"image/png",0.92))}
  useEffect(()=>{if(done)buildFinal()},[mainMode,bgType,bgColor,bgImage,gColor1,gColor2,gAngle,done,output,outFormat])
  const onFile=async(e:any)=>{const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]; if(!f)return; setPreview(URL.createObjectURL(f)); setDone(false); setOutput(""); setFinalUrl(""); setLoading(true); setStatus("Processing image..."); try{const fd=new FormData(); fd.append('file',f); const r=await fetch('/api/remove-bg',{method:'POST',body:fd}); if(!r.ok)throw new Error('API failed'); const blob=await r.blob(); setOutput(URL.createObjectURL(blob)); setDone(true)}catch(err:any){setStatus(err.message)}setLoading(false)}
  const onBgFile=(e:any)=>{const f=e.target.files?.[0]; if(!f)return; setBgImage(URL.createObjectURL(f)); setBgType("image"); setMainMode("withBg")}
  const openEyeDropper=async(setter:any)=>{try{const w=window as any; if(w.EyeDropper){const ed=new w.EyeDropper(); const res=await ed.open(); if(res?.sRGBHex)setter(res.sRGBHex)}}catch{}}
  const download=()=>{const url=finalUrl||output; if(!url)return; const a=document.createElement("a"); a.href=url; a.download=`pinna3d-${Date.now()}.${outFormat}`; a.click()}
  const getPreviewBg=()=>{if(!done)return{background:'radial-gradient(ellipse at 50% 20%, rgba(160,32,240,0.35) 0%, rgba(10,8,20,0.9) 70%)',backgroundColor:'#0A0814'}; if(mainMode==="transparent")return checker; if(bgType==="color")return{background:bgColor} as const; if(bgType==="gradient")return{background:getGradient()} as const; if(bgType==="image"&&bgImage)return{backgroundImage:`url(${bgImage})`,backgroundSize:'cover',backgroundPosition:'center'} as const; return{background:'#fff'} as const}

  return(
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh',backgroundImage:`radial-gradient(900px 480px at 50% -10%, rgba(160,32,240,0.22), transparent 70%)`}}>
      <style>{`
.iv-grid{display:grid;grid-template-columns:1.2fr 0.7fr 0.7fr;gap:12px;padding:20px 24px;max-width:1440px;margin:0 auto;align-items:start}
.left-col{display:flex;flex-direction:column;gap:18px}
.home-badge{display:inline-flex;align-items:center;background:rgba(160,32,240,0.15);border:1px solid rgba(160,32,240,0.32);padding:6px 12px;border-radius:20px;font-size:11px;letter-spacing:.12em;font-weight:700;color:#D6A5FF;width:fit-content}
.home-h1{font-size:50px;line-height:1.12;font-weight:700;letter-spacing:-0.02em;margin:0}
.home-sub{font-size:14px;line-height:1.65;color:rgba(255,255,255,0.62);max-width:520px;margin-top:12px}
.studio-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:4px}
.studio-card{background:linear-gradient(180deg, rgba(160,32,240,0.15) 0%, rgba(255,255,255,0.04) 100%);border:1px solid rgba(255,255,255,0.12);border-radius:18px;padding:22px;position:relative;overflow:hidden}
.studio-card.alt{background:linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.04) 100%)}
.studio-icon{width:46px;height:46px;background:#A020F0;border-radius:11px;display:grid;place-items:center;font-size:18px;margin-bottom:16px}
.studio-icon.light{background:rgba(255,255,255,0.09);border:1px solid rgba(255,255,255,0.14)}
.bottom-graphic{background:linear-gradient(180deg, rgba(160,32,240,0.15) 0%, rgba(255,255,255,0.04) 100%);border:1px solid rgba(255,255,255,0.12);border-radius:18px;padding:18px 20px;display:flex;align-items:center;gap:16px;position:relative;overflow:hidden}
.bottom-graphic::before{content:'';position:absolute;top:-30px;right:-20px;width:160px;height:160px;background:radial-gradient(circle, rgba(160,32,240,0.28), transparent 70%);pointer-events:none}
.upload-box{border:3px dashed rgba(160,32,240,0.6);border-radius:15px;background:rgba(15,13,28,0.95);padding:18px 14px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;cursor:pointer;min-height:320px;height:320px}
.upload-icon{width:52px;height:52px;background:rgba(160,32,240,0.18);border:3px solid rgba(160,32,240,0.35);border-radius:15px;display:grid;place-items:center;margin-bottom:12px}
.preview-card{background:#15131E;border:2px solid rgba(255,255,255,0.08);border-radius:15px;padding:10px;display:flex;flex-direction:column;min-height:320px;height:320px}
.preview-box{border-radius:10px;flex:1;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;background:radial-gradient(ellipse at 50% 20%, rgba(160,32,240,0.35) 0%, rgba(10,8,20,0.9) 70%)}
.color-card{background:#15131E;border:1px solid rgba(255,255,255,0.08);border-radius:15px;padding:12px}
.seg{display:flex;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:22px;padding:3px;gap:3px}
.seg-btn{flex:1;padding:8px 12px;border-radius:20px;font-size:11px;font-weight:600;cursor:pointer;border:1px solid transparent;white-space:nowrap}
.seg-btn.active{background:#A020F0;color:#fff;border-color:#A020F0;box-shadow:0 0 12px rgba(160,32,240,0.4)}
.seg-btn.idle{background:transparent;color:rgba(255,255,255,0.6)}
.fmt-btn{padding:5px 10px;border-radius:20px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.6)}
.fmt-btn.active{background:#fff;color:#000;border-color:#fff}
.hue-slider{width:100%;height:12px;border-radius:999px;-webkit-appearance:none;background:linear-gradient(to right,#f00 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,#f00 100%);border:1px solid rgba(255,255,255,0.15)}
.hue-slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid #000}
.circle-sw{width:26px;height:26px;border-radius:50%;cursor:pointer;border:2px solid rgba(255,255,255,0.2)}
.circle-sw.active{border-color:#fff;box-shadow:0 0 0 2px #A020F0}
.code-input{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:8px 10px;color:#fff;font-size:12px;font-family:monospace;width:100%;outline:none}
.rgb-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:5px;color:#fff;font-size:11px;font-family:monospace;text-align:center}
.picker-btn{width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);display:grid;place-items:center;cursor:pointer}
@media(max-width:1200px){.iv-grid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.iv-grid{grid-template-columns:1fr;padding:16px}.studio-grid-2{grid-template-columns:1fr}}
      `}</style>

      {/* HEADER - EXACT HOMEPAGE */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 24px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
        <a href="/" style={{marginLeft:'-8px'}}><img src="/logo.png" alt="Pinna3d.com" style={{height:'80px',width:'auto',objectFit:'contain'}}/></a>
        <div style={{display:'flex',gap:'26px',alignItems:'center',fontSize:'14px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none'}}>Features</a><span style={{color:'#A020F0'}}>Pricing</span><span style={{color:'rgba(255,255,255,0.7)'}}>Docs</span><span style={{color:'rgba(255,255,255,0.7)'}}>Blog</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.1)',padding:'10px 18px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.14)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',boxShadow:'0 0 24px rgba(160,32,240,0.55)',padding:'10px 20px',borderRadius:'10px',border:'none',color:'#fff',textDecoration:'none',fontWeight:600}}>Get Started</a>
        </div>
      </header>

      {/* TABS - SAME AS HOMEPAGE */}
      <div style={{display:'flex',gap:'10px',padding:'14px 24px',background:'rgba(255,255,255,0.02)',borderBottom:'1px solid rgba(255,255,255,0.06)',overflowX:'auto'}}>
        <a href="/" style={{padding:'10px 18px',borderRadius:'22px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.14)',background:'transparent',color:'#fff',textDecoration:'none',whiteSpace:'nowrap'}}>Image to 3D</a>
        <a href="/" style={{padding:'10px 18px',borderRadius:'22px',fontSize:'13px',border:'1px solid rgba(255,255,255,0.14)',background:'transparent',color:'#fff',textDecoration:'none',whiteSpace:'nowrap'}}>Multi-Image to 3D</a>
        <a href="/image-to-vector" style={{padding:'10px 18px',borderRadius:'22px',fontSize:'13px',border:'1px solid rgba(160,32,240,0.5)',background:'rgba(160,32,240,0.14)',color:'#fff',textDecoration:'none',whiteSpace:'nowrap'}}>Image to Vector ★ NEW</a>
        <span style={{padding:'10px 18px',borderRadius:'22px',fontSize:'13px',border:'1px solid #A020F0',background:'#A020F0',color:'#fff',whiteSpace:'nowrap'}}>Background Remover ★ NEW</span>
      </div>

      <div className="iv-grid">
        {/* LEFT - HOMEPAGE MATCHED */}
        <div className="left-col">
          <div>
            <div className="home-badge">✦ BACKGROUND REMOVER • PHOTO STUDIO</div>
            <h1 className="home-h1" style={{marginTop:'16px'}}>Every background<br/>removed<br/><span style={{background:'linear-gradient(90deg,#A020F0 0%,#FF7AD1 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>in 1 second</span></h1>
            <p className="home-sub">Built for sellers who need catalog-ready images. Our AI preserves fine details — hair, lace, glass, soft shadows — while removing only the background. Export in PNG, JPG or WEBP, ready for Amazon, Shopify and brand decks.</p>
          </div>

          <div className="studio-grid-2">
            <div className="studio-card">
              <div className="studio-icon">✂️</div>
              <h3 style={{fontSize:'18px',fontWeight:500,margin:'0 0 8px'}}>Photo Studio</h3>
              <p style={{fontSize:'15px',color:'rgba(255,255,255,0.85)',margin:0}}>Your Shopify photos, studio-ready in 1 sec.</p>
              <div style={{marginTop:'14px',display:'grid',gap:'8px',fontSize:'15px'}}>
                <div><span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>Real alpha, not white paint</div>
                <div><span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>Edge decontamination • Hair intact</div>
                <div><span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>JPG, PNG, WEBP, HEIC up to 20MB</div>
              </div>
              <div style={{marginTop:'14px',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'10px'}}><div style={{fontSize:'10px',color:'rgba(255,255,255,0.45)',letterSpacing:'.06em'}}>INPUT → OUTPUT</div><div style={{fontSize:'12px',color:'rgba(255,255,255,0.75)',marginTop:'4px'}}>JPG, PNG, WEBP → PNG, JPG</div></div>
            </div>
            <div className="studio-card alt">
              <div className="studio-icon light">◍</div>
              <h3 style={{fontSize:'18px',fontWeight:500,margin:'0 0 8px'}}>Marketplace Ready</h3>
              <p style={{fontSize:'15px',color:'rgba(255,255,255,0.85)',margin:0}}>Transparent + studio backgrounds compliant.</p>
              <div style={{marginTop:'14px',display:'grid',gap:'8px',fontSize:'15px'}}>
                <div><span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>Amazon / Shopify compliant</div>
                <div><span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>~1.7s per image • GPU accelerated</div>
                <div><span style={{color:'#A020F0',fontWeight:700,marginRight:'6px'}}>✓</span>HD & 4K alpha export</div>
              </div>
              <div style={{marginTop:'14px',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'10px'}}><div style={{fontSize:'10px',color:'rgba(255,255,255,0.45)',letterSpacing:'.06em'}}>TRUSTED BY</div><div style={{fontSize:'12px',color:'rgba(255,255,255,0.75)',marginTop:'4px'}}>50k+ Brands - 4.9/5</div></div>
            </div>
          </div>

          {/* GRAPHICS IN EMPTY SPACE */}
          <div className="bottom-graphic">
            <div style={{width:'48px',height:'48px',borderRadius:'12px',background:'linear-gradient(135deg,#A020F0,#6D28D9)',display:'grid',placeItems:'center',flexShrink:0,position:'relative',zIndex:1}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <div style={{position:'relative',zIndex:1}}>
              <div style={{fontSize:'15px',fontWeight:600}}>Professional alpha matting — not a filter</div>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,0.55)',marginTop:'3px'}}>100% browser processing • No server upload • Free • Unlimited • No watermark</div>
            </div>
            <div style={{marginLeft:'auto',display:'flex',gap:'6px',position:'relative',zIndex:1}}>
              <span style={{width:'34px',height:'34px',borderRadius:'8px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',display:'grid',placeItems:'center',fontSize:'10px'}}>PNG</span>
              <span style={{width:'34px',height:'34px',borderRadius:'8px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',display:'grid',placeItems:'center',fontSize:'10px'}}>JPG</span>
              <span style={{width:'34px',height:'34px',borderRadius:'8px',background:'#fff',color:'#000',display:'grid',placeItems:'center',fontSize:'10px',fontWeight:800}}>4K</span>
            </div>
          </div>
        </div>

        {/* RIGHT - HOMEPAGE UPLOAD STYLE + UPGRADED COLOR PALETTE */}
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          <div className="upload-box" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} alt="input" style={{width:'100%',height:'100%',objectFit:'contain',borderRadius:'10px'}}/> : <>
              <div className="upload-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#A020F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15l3-3 3 3"/></svg>
              </div>
              <b style={{fontSize:'16px',fontWeight:600}}>Drag & drop your image here</b>
              <div style={{fontSize:'14px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>or browse files to upload</div>
              <div style={{fontSize:'10px',color:'rgba(255,255,255,0.35)',marginTop:'10px'}}>PNG, JPG, WEBP, HEIC → Transparent</div>
            </>}
          </div>

          <div className="preview-card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px',gap:'8px'}}>
              <div className="seg" style={{flex:1}}><button className={`seg-btn ${mainMode==="transparent"?"active":"idle"}`} onClick={()=>setMainMode("transparent")}>Without BG</button><button className={`seg-btn ${mainMode==="withBg"?"active":"idle"}`} onClick={()=>setMainMode("withBg")}>With BG</button></div>
              <div style={{display:'flex',gap:'5px'}}><button className={`fmt-btn ${outFormat==="png"?"active":""}`} onClick={()=>setOutFormat("png")}>PNG</button><button className={`fmt-btn ${outFormat==="jpg"?"active":""}`} onClick={()=>setOutFormat("jpg")}>JPG</button><button className={`fmt-btn ${outFormat==="webp"?"active":""}`} onClick={()=>setOutFormat("webp")}>WEBP</button></div>
            </div>
            <div className="preview-box" style={getPreviewBg() as any}>
              {loading? <div style={{color:'#fff',fontSize:'11px',background:'rgba(0,0,0,0.6)',padding:'7px 10px',borderRadius:'7px',zIndex:2}}>{status}</div> : done && (finalUrl||output)? <img src={finalUrl||output} style={{maxWidth:'90%',maxHeight:'90%',objectFit:'contain',zIndex:2}} alt="result"/> : <div style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',textAlign:'center',zIndex:2}}>Upload image<br/>to see result</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'8px'}}>
              <button style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'9px',borderRadius:'8px',color:'#fff',fontSize:'11px',cursor:'pointer'}}>Preview</button>
              <button onClick={download} style={{background:done?'#A020F0':'#333',padding:'9px',borderRadius:'8px',color:'#fff',fontSize:'11px',border:'none',cursor:done?'pointer':'not-allowed',fontWeight:600}}>Download {outFormat.toUpperCase()}</button>
            </div>
          </div>
        </div>

        {/* THIRD COLUMN - UPGRADED COLOR PALETTE WITH ICONS */}
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          <div className="color-card">
            <div style={{display:'flex',gap:'6px',marginBottom:'12px'}}>
              <button className={`seg-btn ${bgType==="color"?"active":"idle"}`} style={{flex:1}} onClick={()=>setBgType("color")}>🎨 Color</button>
              <button className={`seg-btn ${bgType==="gradient"?"active":"idle"}`} style={{flex:1}} onClick={()=>setBgType("gradient")}>🌈 Gradient</button>
              <button className={`seg-btn ${bgType==="image"?"active":"idle"}`} style={{flex:1}} onClick={()=>setBgType("image")}>🖼️ BG Image</button>
            </div>

            {bgType==="color"&&(<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <div className={`circle-sw ${bgColor==="#ffffff"?"active":""}`} style={{background:'#fff'}} onClick={()=>{setBgColor("#ffffff"); setHue(0)}}/>
                <div className={`circle-sw ${bgColor==="#000000"?"active":""}`} style={{background:'#000'}} onClick={()=>setBgColor("#000000")}/>
                <div className={`circle-sw ${bgColor==="#A020F0"?"active":""}`} style={{background:'#A020F0'}} onClick={()=>setBgColor("#A020F0")}/>
                <div className={`circle-sw ${bgColor==="#FF7AD1"?"active":""}`} style={{background:'#FF7AD1'}} onClick={()=>setBgColor("#FF7AD1")}/>
                <div style={{flex:1}}/>
                <input ref={colorInputRef} type="color" hidden value={bgColor} onChange={e=>setBgColor(e.target.value)}/>
                <button className="picker-btn" onClick={()=>colorInputRef.current?.click()} title="Color picker">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/></svg>
                </button>
                <button className="picker-btn" onClick={()=>openEyeDropper(setBgColor)} title="Eyedropper">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2l3 3-10 10H2v-3L12 2z"/><path d="M14 6l3-3 3 3-3 3-3-3z"/></svg>
                </button>
              </div>

              <div style={{display:'flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,0.05)',borderRadius:'10px',padding:'8px'}}>
                <div style={{width:'22px',height:'22px',borderRadius:'50%',background:bgColor,border:'2px solid #fff',boxShadow:'0 0 8px rgba(255,255,255,0.2)'}}/>
                <input type="range" min="0" max="360" value={hue} className="hue-slider" style={{flex:1}} onChange={e=>{const h=parseInt(e.target.value); setHue(h); setBgColor(hslToHex(h))}}/>
              </div>

              <input className="code-input" value={bgColor} onChange={e=>{let v=e.target.value.trim(); if(!v.startsWith('#'))v='#'+v; if(/^#([0-9A-Fa-f]{3,8})$/.test(v))setBgColor(v.toLowerCase())}} placeholder="#ffffff"/>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'6px'}}>
                {(()=>{const{r,g,b}=hexToRgb(bgColor); return(<>
                  <div><div style={{fontSize:'9px',color:'rgba(255,255,255,0.4)',fontWeight:700,marginBottom:'2px'}}>R</div><input className="rgb-input" type="number" value={r} onChange={e=>{const v=Math.min(255,Math.max(0,parseInt(e.target.value)||0)); const{g,b}=hexToRgb(bgColor); setBgColor(`#${[v,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')}`)}}/></div>
                  <div><div style={{fontSize:'9px',color:'rgba(255,255,255,0.4)',fontWeight:700,marginBottom:'2px'}}>G</div><input className="rgb-input" type="number" value={g} onChange={e=>{const v=Math.min(255,Math.max(0,parseInt(e.target.value)||0)); const{r,b}=hexToRgb(bgColor); setBgColor(`#${[r,v,b].map(x=>x.toString(16).padStart(2,'0')).join('')}`)}}/></div>
                  <div><div style={{fontSize:'9px',color:'rgba(255,255,255,0.4)',fontWeight:700,marginBottom:'2px'}}>B</div><input className="rgb-input" type="number" value={b} onChange={e=>{const v=Math.min(255,Math.max(0,parseInt(e.target.value)||0)); const{r,g}=hexToRgb(bgColor); setBgColor(`#${[r,g,v].map(x=>x.toString(16).padStart(2,'0')).join('')}`)}}/></div>
                </>)})()}
              </div>

              {/* Graphics fill empty space */}
              <div style={{marginTop:'6px',padding:'10px',borderRadius:'10px',background:'linear-gradient(135deg, rgba(160,32,240,0.12), rgba(255,255,255,0.02))',border:'1px solid rgba(255,255,255,0.06)',display:'flex',gap:'8px',alignItems:'center'}}>
                <div style={{width:'28px',height:'28px',borderRadius:'8px',background:'#A020F0',display:'grid',placeItems:'center',fontSize:'12px'}}>✓</div>
                <div><div style={{fontSize:'11px',fontWeight:600}}>Amazon Ready White</div><div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)'}}>Pure #FFFFFF compliant</div></div>
              </div>
            </div>)}

            {bgType==="gradient"&&(<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <div style={{width:'100%',height:'48px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.15)',background:getGradient(),position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',animation:'shimmer 2s infinite'}}></div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'6px'}}><span style={{fontSize:'9px',fontWeight:700,width:'32px',color:'rgba(255,255,255,0.5)'}}>FROM</span><div style={{flex:1}}/><input ref={g1InputRef} type="color" hidden value={gColor1} onChange={e=>setGColor1(e.target.value)}/><button className="picker-btn" onClick={()=>g1InputRef.current?.click()}>🎨</button></div>
              <input className="code-input" value={gColor1} onChange={e=>{let v=e.target.value; if(!v.startsWith('#'))v='#'+v; if(/^#([0-9A-Fa-f]{3,8})$/.test(v))setGColor1(v)}}/>
              <input type="range" min="0" max="360" value={gHue1} className="hue-slider" style={{height:'10px'}} onChange={e=>{const h=parseInt(e.target.value); setGHue1(h); setGColor1(hslToHex(h))}}/>
              <div style={{display:'flex',alignItems:'center',gap:'6px',marginTop:'4px'}}><span style={{fontSize:'9px',fontWeight:700,width:'32px',color:'rgba(255,255,255,0.5)'}}>TO</span><div style={{flex:1}}/><input ref={g2InputRef} type="color" hidden value={gColor2} onChange={e=>setGColor2(e.target.value)}/><button className="picker-btn" onClick={()=>g2InputRef.current?.click()}>🎨</button></div>
              <input className="code-input" value={gColor2} onChange={e=>{let v=e.target.value; if(!v.startsWith('#'))v='#'+v; if(/^#([0-9A-Fa-f]{3,8})$/.test(v))setGColor2(v)}}/>
              <input type="range" min="0" max="360" value={gHue2} className="hue-slider" style={{height:'10px'}} onChange={e=>{const h=parseInt(e.target.value); setGHue2(h); setGColor2(hslToHex(h))}}/>
              <div style={{marginTop:'6px'}}><div style={{fontSize:'9px',color:'rgba(255,255,255,0.5)',marginBottom:'4px'}}>ANGLE: {gAngle}°</div><input type="range" min="0" max="360" value={gAngle} onChange={e=>setGAngle(parseInt(e.target.value))} style={{width:'100%',accentColor:'#A020F0'}}/></div>
            </div>)}

            {bgType==="image"&&(<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <input ref={bgFileRef} type="file" hidden accept="image/*" onChange={onBgFile}/>
              <button onClick={()=>bgFileRef.current?.click()} style={{width:'100%',padding:'12px',borderRadius:'10px',background:'rgba(255,255,255,0.06)',border:'2px dashed rgba(160,32,240,0.35)',color:'#fff',fontSize:'12px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:'6px'}}>
                <span style={{fontSize:'20px'}}>🖼️</span>
                {bgImage?"Change background image":"Upload your background"}
              </button>
              {bgImage&&<div style={{width:'100%',height:'80px',borderRadius:'8px',backgroundImage:`url(${bgImage})`,backgroundSize:'cover',backgroundPosition:'center',border:'1px solid rgba(255,255,255,0.12)'}}/>}
            </div>)}
          </div>

          {/* Extra graphic card to fill empty space */}
          <div style={{background:'linear-gradient(180deg, rgba(160,32,240,0.15) 0%, rgba(255,255,255,0.04) 100%)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'15px',padding:'14px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <div style={{width:'36px',height:'36px',background:'#A020F0',borderRadius:'9px',display:'grid',placeItems:'center'}}>⚡</div>
              <div><div style={{fontSize:'12px',fontWeight:600}}>HD & 4K Export</div><div style={{fontSize:'10px',color:'rgba(255,255,255,0.5)'}}>GPU accelerated • ~1.7s</div></div>
            </div>
            <div style={{marginTop:'10px',display:'flex',gap:'6px'}}>
              <span style={{padding:'4px 8px',borderRadius:'20px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',fontSize:'9px'}}>PNG</span>
              <span style={{padding:'4px 8px',borderRadius:'20px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',fontSize:'9px'}}>JPG</span>
              <span style={{padding:'4px 8px',borderRadius:'20px',background:'#fff',color:'#000',fontSize:'9px',fontWeight:700}}>4K</span>
              <span style={{padding:'4px 8px',borderRadius:'20px',background:'rgba(160,32,240,0.2)',border:'1px solid rgba(160,32,240,0.3)',fontSize:'9px'}}>WEBP</span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER LOCKED - EXACT HOMEPAGE FOOTER */}
      <footer style={{borderTop:'1px solid rgba(255,255,255,0.08)',padding:'40px 40px 24px',background:'rgba(0,0,0,0.2)'}}>
        <div style={{maxWidth:'1440px',margin:'0 auto',display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'24px'}}>
          <div>
            <img src="/logo.png" style={{height:'60px'}} alt="Pinna3d"/>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginTop:'12px',maxWidth:'320px',lineHeight:'1.6'}}>Every Image to 3D or Vector in 60 Seconds. Photo, Vector, 3D, Motion — one platform for creators worldwide.</p>
            <div style={{marginTop:'12px',fontSize:'11px',color:'rgba(255,255,255,0.35)'}}>PNG, JPG, WEBP, TIFF → SVG, EPS, AI, PDF, CDR, DXF + PNG Bonus</div>
          </div>
          <div><div style={{fontSize:'13px',fontWeight:600,marginBottom:'12px'}}>Studios</div><div style={{display:'grid',gap:'8px',fontSize:'13px',color:'rgba(255,255,255,0.6)'}}><a href="/image-to-vector" style={{color:'#fff',textDecoration:'none'}}>Vector Studio</a><span>Photo Studio</span><span>3D Studio</span><span>Motion Studio</span></div></div>
          <div><div style={{fontSize:'13px',fontWeight:600,marginBottom:'12px'}}>Company</div><div style={{display:'grid',gap:'8px',fontSize:'13px',color:'rgba(255,255,255,0.6)'}}><span>Pricing</span><span>Docs</span><span>Blog</span><span>Contact</span></div></div>
          <div><div style={{fontSize:'13px',fontWeight:600,marginBottom:'12px'}}>Legal</div><div style={{display:'grid',gap:'8px',fontSize:'13px',color:'rgba(255,255,255,0.6)'}}><span>Terms</span><span>Privacy</span><span>Refund</span></div></div>
        </div>
        <div style={{maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)',marginTop:'32px',paddingTop:'16px',display:'flex',justifyContent:'space-between',fontSize:'11px',color:'rgba(255,255,255,0.35)',flexWrap:'wrap',gap:'8px'}}>
          <span>© 2026 Pinna3d.com • Made for Worldwide</span>
          <span>All formats: SVG, EPS, AI, PDF, CDR, GLB, FBX, MP4 • JPG, PNG, WEBP → Vector</span>
        </div>
      </footer>
    </div>
  )
}
