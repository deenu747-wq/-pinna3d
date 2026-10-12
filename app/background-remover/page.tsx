"use client"
import { useState, useRef, useEffect } from "react"
type MainMode="transparent"|"withBg"; type BgType="color"|"gradient"|"image"; type OutFormat="png"|"jpg"|"webp"
export default function BgRemoverFinal(){
  const [preview,setPreview]=useState(""); const [output,setOutput]=useState(""); const [finalUrl,setFinalUrl]=useState(""); const [done,setDone]=useState(false); const [loading,setLoading]=useState(false); const [status,setStatus]=useState("")
  const [mainMode,setMainMode]=useState<MainMode>("transparent"); const [bgType,setBgType]=useState<BgType>("color"); const [bgColor,setBgColor]=useState("#ffffff"); const [hue,setHue]=useState(0)
  const [gColor1,setGColor1]=useState("#ffffff"); const [gColor2,setGColor2]=useState("#000000"); const [gHue1,setGHue1]=useState(0); const [gHue2,setGHue2]=useState(0); const [gAngle,setGAngle]=useState(135)
  const [bgImage,setBgImage]=useState(""); const [outFormat,setOutFormat]=useState<OutFormat>("png")
  const fileRef=useRef<HTMLInputElement>(null); const bgFileRef=useRef<HTMLInputElement>(null); const colorInputRef=useRef<HTMLInputElement>(null); const g1InputRef=useRef<HTMLInputElement>(null); const g2InputRef=useRef<HTMLInputElement>(null)

  const checker={backgroundColor:'#1a1a1a',backgroundImage:`linear-gradient(45deg,#2a2a2a 25%,transparent 25%),linear-gradient(-45deg,#2a2a2a 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#2a2a2a 75%),linear-gradient(-45deg,transparent 75%,#2a2a2a 75%)`,backgroundSize:'20px 20px',backgroundPosition:'0 0,0 10px,10px -10px,-10px 0px'} as const
  const hslToHex=(h:number)=>{const s=100,l=50; const k=(n:number)=>(n+h/30)%12; const a=s/100*Math.min(l/100,1-l/100); const f=(n:number)=>l/100-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1))); const toHex=(x:number)=>Math.round(x*255).toString(16).padStart(2,'0'); return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`}
  const hexToRgb=(hex:string)=>{const h=hex.replace('#',''); const f=h.length===3?h.split('').map(c=>c+c).join(''):h; const n=parseInt(f,16); return {r:(n>>16)&255,g:(n>>8)&255,b:n&255}}
  const getGradient=()=>`linear-gradient(${gAngle}deg,${gColor1} 0%,${gColor2} 100%)`
  const buildFinal=async()=>{if(!output)return; const img=new Image(); img.crossOrigin="anonymous"; img.src=output; await new Promise<void>(r=>{img.onload=()=>r(); img.onerror=()=>r()}); const c=document.createElement('canvas'); c.width=img.naturalWidth||1024; c.height=img.naturalHeight||1024; const ctx=c.getContext('2d')!; if(mainMode!=="transparent"){if(bgType==="color"){ctx.fillStyle=bgColor; ctx.fillRect(0,0,c.width,c.height)}else if(bgType==="gradient"){const g=ctx.createLinearGradient(0,0,Math.cos(gAngle*Math.PI/180)*c.width,Math.sin(gAngle*Math.PI/180)*c.height); g.addColorStop(0,gColor1); g.addColorStop(1,gColor2); ctx.fillStyle=g; ctx.fillRect(0,0,c.width,c.height)}else if(bgType==="image"&&bgImage){const b=new Image(); b.crossOrigin="anonymous"; b.src=bgImage; await new Promise<void>(r=>{b.onload=()=>r(); b.onerror=()=>r()}); const sc=Math.max(c.width/b.width,c.height/b.height); ctx.drawImage(b,(c.width-b.width*sc)/2,(c.height-b.height*sc)/2,b.width*sc,b.height*sc)}}else if(outFormat==="jpg"){ctx.fillStyle="#fff"; ctx.fillRect(0,0,c.width,c.height)}; ctx.drawImage(img,0,0,c.width,c.height); const mime=outFormat==="jpg"?"image/jpeg":outFormat==="webp"?"image/webp":"image/png"; setFinalUrl(c.toDataURL(mime,0.92))}
  useEffect(()=>{if(done)buildFinal()},[mainMode,bgType,bgColor,bgImage,gColor1,gColor2,gAngle,done,output,outFormat])
  const onFile=async(e:any)=>{const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]; if(!f)return; setPreview(URL.createObjectURL(f)); setDone(false); setOutput(""); setFinalUrl(""); setLoading(true); setStatus("Processing image..."); try{const fd=new FormData(); fd.append('file',f); const r=await fetch('/api/remove-bg',{method:'POST',body:fd}); if(!r.ok)throw new Error('API failed'); const blob=await r.blob(); setOutput(URL.createObjectURL(blob)); setDone(true)}catch(err:any){setStatus(err.message)}setLoading(false)}
  const onBgFile=(e:any)=>{const f=e.target.files?.[0]; if(!f)return; setBgImage(URL.createObjectURL(f)); setBgType("image"); setMainMode("withBg")}
  const openEyeDropper=async(setter:any)=>{try{const w=window as any; if(w.EyeDropper){const ed=new w.EyeDropper(); const res=await ed.open(); if(res?.sRGBHex)setter(res.sRGBHex)}}catch{}}
  const download=()=>{const url=finalUrl||output; if(!url)return; const a=document.createElement("a"); a.href=url; a.download=`pinna3d-${Date.now()}.${outFormat==="jpg"?"jpg":outFormat}`; a.click()}
  const getPreviewBg=()=>{if(!done)return{background:'#0A0814',backgroundImage:'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',backgroundSize:'18px 18px'}; if(mainMode==="transparent")return checker; if(bgType==="color")return{background:bgColor} as const; if(bgType==="gradient")return{background:getGradient()} as const; if(bgType==="image"&&bgImage)return{backgroundImage:`url(${bgImage})`,backgroundSize:'cover',backgroundPosition:'center'} as const; return{background:'#fff'} as const}

  return(
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, system-ui',minHeight:'100vh'}}>
      <style>{`
.iv-grid{display:grid;grid-template-columns:1.18fr 0.82fr;gap:14px;padding:18px 20px 18px 28px;max-width:1440px;margin:0 auto;align-items:start}
.left-col{display:flex;flex-direction:column;gap:22px}
.home-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(160,32,240,0.10);border:1px solid rgba(160,32,240,0.22);padding:7px 14px;border-radius:999px;font-size:10px;letter-spacing:.12em;font-weight:700;color:rgba(255,255,255,0.7)}
.home-h1{font-size:54px;line-height:0.98;letter-spacing:-0.03em;font-weight:800;margin:0}
.home-sub{font-size:15px;line-height:1.6;color:rgba(255,255,255,0.55);max-width:520px;margin-top:14px}
.studio-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:4px}
.studio-card{background:linear-gradient(180deg,rgba(160,32,240,0.14),rgba(26,20,45,0.9));border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:18px;position:relative;overflow:hidden}
.studio-card.icon{width:44px;height:44px;border-radius:11px;background:rgba(160,32,240,0.22);border:1px solid rgba(160,32,240,0.28);display:grid;place-items:center;font-size:18px;margin-bottom:14px}
.studio-card h3{font-size:16px;margin:0 0 6px;font-weight:600}
.studio-card p{font-size:13px;color:rgba(255,255,255,0.6);line-height:1.5;margin:0}
.studio-card li{font-size:12px;color:rgba(255,255,255,0.7);list-style:none;margin-top:6px}
.studio-card li::before{content:"✓ ";color:#A020F0;font-weight:700}
.bottom-wide{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:18px 20px;display:flex;align-items:center;gap:16px}
.box-1-1{width:100%;aspect-ratio:1/1;border-radius:14px;overflow:hidden}
.upload-box{border:1.6px dashed rgba(160,32,240,0.5);background:rgba(15,13,28,0.96);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer}
.upload-box img{width:100%;height:100%;object-fit:contain;padding:8px}
.preview-card{background:#15131E;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:10px;width:100%;display:flex;flex-direction:column}
.preview-box{border-radius:10px;flex:1;min-height:340px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(160,32,240,0.22);overflow:hidden;position:relative}
.color-card{background:#15131E;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:12px;width:100%}
.seg{display:flex;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:9px;padding:3px;gap:3px}
.seg-btn{flex:1;padding:7px;border-radius:7px;font-size:11px;font-weight:600;cursor:pointer;border:1px solid transparent}
.seg-btn.active{background:#A020F0;color:#fff;border-color:#A020F0}
.seg-btn.idle{background:transparent;color:rgba(255,255,255,0.6)}
.fmt-btn{padding:5px 10px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.6)}
.fmt-btn.active{background:#fff;color:#000;border-color:#fff}
.hue-slider{width:100%;height:12px;border-radius:999px;-webkit-appearance:none;background:linear-gradient(to right,#f00 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,#f00 100%);border:1px solid rgba(255,255,255,0.15)}
.hue-slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid #000}
.circle-sw{width:26px;height:26px;border-radius:50%;cursor:pointer;border:2px solid rgba(255,255,255,0.2)}
.circle-sw.active{border-color:#fff;box-shadow:0 0 0 2px #A020F0}
.code-input{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:7px;padding:7px 9px;color:#fff;font-size:12px;font-family:monospace;width:100%;outline:none}
.rgb-input{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:5px;color:#fff;font-size:11px;font-family:monospace;text-align:center}
.picker-btn{width:30px;height:30px;border-radius:7px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);display:grid;place-items:center;cursor:pointer;font-size:13px}
.feat-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-top:28px}
@media(max-width:900px){.iv-grid{grid-template-columns:1fr;padding:12px}.studio-grid{grid-template-columns:1fr}.home-h1{font-size:32px}.feat-grid{grid-template-columns:1fr}}
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
        {/* LEFT SIDE - MATCHING HOMEPAGE */}
        <div className="left-col">
          <div>
            <div className="home-badge">✦ BACKGROUND REMOVER • PHOTO STUDIO</div>
            <h1 className="home-h1" style={{marginTop:'16px'}}>
              Every background<br/>removed<br/>
              <span style={{color:'#A020F0'}}>in 1 second</span>
            </h1>
            <p className="home-sub">
              Built for sellers who need catalog-ready images. Our AI preserves fine details — hair, lace, glass, soft shadows — while removing only the background. Export in PNG, JPG or WEBP, ready for Amazon, Shopify and brand decks.
            </p>
          </div>

          <div className="studio-grid">
            <div className="studio-card">
              <div className="icon">✂️</div>
              <h3>Photo Studio</h3>
              <p>Your Shopify photos, studio-ready in 1 sec.</p>
              <div style={{marginTop:'10px'}}>
                <li>Real alpha, not white paint</li>
                <li>Edge decontamination • Hair intact</li>
                <li>JPG, PNG, WEBP, HEIC up to 20MB</li>
              </div>
            </div>
            <div className="studio-card" style={{background:'linear-gradient(180deg,rgba(255,255,255,0.06),rgba(20,18,32,0.9))'}}>
              <div className="icon" style={{background:'rgba(255,255,255,0.08)',borderColor:'rgba(255,255,255,0.14)'}}>◍</div>
              <h3>Marketplace Ready</h3>
              <p>Transparent + studio backgrounds compliant.</p>
              <div style={{marginTop:'10px'}}>
                <li>Amazon / Shopify compliant</li>
                <li>~1.7s per image • GPU accelerated</li>
                <li>HD & 4K alpha export</li>
              </div>
            </div>
          </div>

          <div className="bottom-wide">
            <div style={{width:'48px',height:'48px',borderRadius:'12px',background:'linear-gradient(135deg,#A020F0,#6D28D9)',display:'grid',placeItems:'center',flexShrink:0}}>✓</div>
            <div>
              <div style={{fontSize:'14px',fontWeight:700}}>Professional alpha matting — not a filter</div>
              <div style={{fontSize:'12px',color:'rgba(255,255,255,0.55)',marginTop:'2px'}}>100% browser processing • No server upload • Free • Unlimited • No watermark • Commercial use allowed</div>
            </div>
            <div style={{marginLeft:'auto',display:'flex',gap:'6px'}}>
              <span style={{width:'32px',height:'32px',borderRadius:'8px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',display:'grid',placeItems:'center',fontSize:'10px'}}>PNG</span>
              <span style={{width:'32px',height:'32px',borderRadius:'8px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',display:'grid',placeItems:'center',fontSize:'10px'}}>JPG</span>
              <span style={{width:'32px',height:'32px',borderRadius:'8px',background:'#fff',color:'#000',display:'grid',placeItems:'center',fontSize:'10px',fontWeight:800}}>4K</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - GAP REDUCED */}
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          <div className="box-1-1 upload-box" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} alt="input"/> : <><div style={{width:'48px',height:'48px',background:'rgba(160,32,240,0.18)',border:'1.5px solid rgba(160,32,240,0.35)',borderRadius:'12px',display:'grid',placeItems:'center',marginBottom:'10px'}}>✂️</div><b style={{fontSize:'15px',fontWeight:600}}>Drop image to remove background</b><div style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>or click to browse • PNG, JPG, WEBP, HEIC</div></>}
          </div>
          <div className="preview-card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
              <div className="seg" style={{flex:1,marginRight:'8px'}}><button className={`seg-btn ${mainMode==="transparent"?"active":"idle"}`} onClick={()=>setMainMode("transparent")}>Without BG</button><button className={`seg-btn ${mainMode==="withBg"?"active":"idle"}`} onClick={()=>setMainMode("withBg")}>With BG</button></div>
              <div style={{display:'flex',gap:'5px'}}><button className={`fmt-btn ${outFormat==="png"?"active":""}`} onClick={()=>setOutFormat("png")}>PNG</button><button className={`fmt-btn ${outFormat==="jpg"?"active":""}`} onClick={()=>setOutFormat("jpg")}>JPG</button><button className={`fmt-btn ${outFormat==="webp"?"active":""}`} onClick={()=>setOutFormat("webp")}>WEBP</button></div>
            </div>
            <div className="preview-box" style={getPreviewBg() as any}>
              {loading? <div style={{color:'#fff',fontSize:'11px',background:'rgba(0,0,0,0.6)',padding:'7px 10px',borderRadius:'7px',zIndex:2}}>{status}</div> : done && (finalUrl||output)? <img src={finalUrl||output} style={{maxWidth:'90%',maxHeight:'90%',objectFit:'contain',zIndex:2}} alt="result"/> : <div style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',textAlign:'center',zIndex:2}}>Upload image<br/>to see result</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'8px'}}>
              <button onClick={()=>{ if(!output)return; const bgCss=mainMode==="transparent"?"background-color:#1a1a1a;background-image:linear-gradient(45deg,#2a2a2a 25%,transparent 25%),linear-gradient(-45deg,#2a2a2a 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#2a2a2a 75%),linear-gradient(-45deg,transparent 75%,#2a2a2a 75%);background-size:20px 20px":bgType==="color"?`background:${bgColor}`:bgType==="gradient"?`background:${getGradient()}`:`background-image:url(${bgImage});background-size:cover`; const html=`<html><body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;${bgCss}"><img src="${finalUrl||output}" style="max-width:90vw;max-height:90vh"/></body></html>`; const w=window.open(); w?.document.write(html)}} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'9px',borderRadius:'8px',color:'#fff',fontSize:'11px',cursor:'pointer'}}>Preview</button>
              <button onClick={download} style={{background:done?'#A020F0':'#333',padding:'9px',borderRadius:'8px',color:'#fff',fontSize:'11px',border:'none',cursor:done?'pointer':'not-allowed',fontWeight:600}}>Download {outFormat.toUpperCase()}</button>
            </div>
          </div>
          <div className="color-card" style={{display: mainMode==="withBg"? 'block':'none'}}>
            <div style={{display:'flex',gap:'5px',marginBottom:'10px'}}><button className={`seg-btn ${bgType==="color"?"active":"idle"}`} style={{padding:'6px',fontSize:'11px'}} onClick={()=>setBgType("color")}>Color</button><button className={`seg-btn ${bgType==="gradient"?"active":"idle"}`} style={{padding:'6px',fontSize:'11px'}} onClick={()=>setBgType("gradient")}>Gradient</button><button className={`seg-btn ${bgType==="image"?"active":"idle"}`} style={{padding:'6px',fontSize:'11px'}} onClick={()=>setBgType("image")}>Upload BG</button></div>
            {bgType==="color"&&(<div style={{display:'flex',flexDirection:'column',gap:'8px'}}><div style={{display:'flex',alignItems:'center',gap:'8px'}}><div className={`circle-sw ${bgColor==="#ffffff"?"active":""}`} style={{background:'#fff'}} onClick={()=>{setBgColor("#ffffff"); setHue(0)}}/><div className={`circle-sw ${bgColor==="#000000"?"active":""}`} style={{background:'#000'}} onClick={()=>setBgColor("#000000")}/><div style={{flex:1}}/><input ref={colorInputRef} type="color" hidden value={bgColor} onChange={e=>setBgColor(e.target.value)}/><div className="picker-btn" onClick={()=>colorInputRef.current?.click()}>🎨</div><div className="picker-btn" onClick={()=>openEyeDropper(setBgColor)}>👁️</div></div><div style={{display:'flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,0.05)',borderRadius:'7px',padding:'7px'}}><div style={{width:'20px',height:'20px',borderRadius:'50%',background:bgColor,border:'2px solid #fff'}}/><input type="range" min="0" max="360" value={hue} className="hue-slider" style={{flex:1}} onChange={e=>{const h=parseInt(e.target.value); setHue(h); setBgColor(hslToHex(h))}}/></div><input className="code-input" value={bgColor} onChange={e=>{let v=e.target.value.trim(); if(!v.startsWith('#'))v='#'+v; if(/^#([0-9A-Fa-f]{3,8})$/.test(v))setBgColor(v.toLowerCase())}}/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'6px'}}>{(()=>{const{r,g,b}=hexToRgb(bgColor); return(<><div><div style={{fontSize:'8px',color:'rgba(255,255,255,0.4)',fontWeight:700}}>R</div><input className="rgb-input" type="number" value={r} onChange={e=>{const v=Math.min(255,Math.max(0,parseInt(e.target.value)||0)); const{g,b}=hexToRgb(bgColor); setBgColor(`#${[v,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')}`)}}/></div><div><div style={{fontSize:'8px',color:'rgba(255,255,255,0.4)',fontWeight:700}}>G</div><input className="rgb-input" type="number" value={g} onChange={e=>{const v=Math.min(255,Math.max(0,parseInt(e.target.value)||0)); const{r,b}=hexToRgb(bgColor); setBgColor(`#${[r,v,b].map(x=>x.toString(16).padStart(2,'0')).join('')}`)}}/></div><div><div style={{fontSize:'8px',color:'rgba(255,255,255,0.4)',fontWeight:700}}>B</div><input className="rgb-input" type="number" value={b} onChange={e=>{const v=Math.min(255,Math.max(0,parseInt(e.target.value)||0)); const{r,g}=hexToRgb(bgColor); setBgColor(`#${[r,g,v].map(x=>x.toString(16).padStart(2,'0')).join('')}`)}}/></div></>)})()}</div></div>)}
            {bgType==="gradient"&&(<div style={{display:'flex',flexDirection:'column',gap:'10px'}}><div><div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'5px'}}><span style={{fontSize:'8px',fontWeight:700,width:'30px',color:'rgba(255,255,255,0.5)'}}>FROM</span><div className="circle-sw" style={{width:'22px',height:'22px',background:'#fff'}} onClick={()=>setGColor1("#ffffff")}/><div className="circle-sw" style={{width:'22px',height:'22px',background:'#000'}} onClick={()=>setGColor1("#000000")}/><div style={{flex:1}}/><input ref={g1InputRef} type="color" hidden value={gColor1} onChange={e=>setGColor1(e.target.value)}/><div className="picker-btn" style={{width:'24px',height:'24px'}} onClick={()=>g1InputRef.current?.click()}>🎨</div></div><input className="code-input" value={gColor1} onChange={e=>{let v=e.target.value; if(!v.startsWith('#'))v='#'+v; if(/^#([0-9A-Fa-f]{3,8})$/.test(v))setGColor1(v)}}/><input type="range" min="0" max="360" value={gHue1} className="hue-slider" style={{marginTop:'5px',height:'10px'}} onChange={e=>{const h=parseInt(e.target.value); setGHue1(h); setGColor1(hslToHex(h))}}/></div><div><div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'5px'}}><span style={{fontSize:'8px',fontWeight:700,width:'30px',color:'rgba(255,255,255,0.5)'}}>TO</span><div className="circle-sw" style={{width:'22px',height:'22px',background:'#fff'}} onClick={()=>setGColor2("#ffffff")}/><div className="circle-sw" style={{width:'22px',height:'22px',background:'#000'}} onClick={()=>setGColor2("#000000")}/><div style={{flex:1}}/><input ref={g2InputRef} type="color" hidden value={gColor2} onChange={e=>setGColor2(e.target.value)}/><div className="picker-btn" style={{width:'24px',height:'24px'}} onClick={()=>g2InputRef.current?.click()}>🎨</div></div><input className="code-input" value={gColor2} onChange={e=>{let v=e.target.value; if(!v.startsWith('#'))v='#'+v; if(/^#([0-9A-Fa-f]{3,8})$/.test(v))setGColor2(v)}}/><input type="range" min="0" max="360" value={gHue2} className="hue-slider" style={{marginTop:'5px',height:'10px'}} onChange={e=>{const h=parseInt(e.target.value); setGHue2(h); setGColor2(hslToHex(h))}}/></div><div><div style={{width:'100%',height:'14px',borderRadius:'999px',border:'1px solid rgba(255,255,255,0.15)',background:getGradient()}}/><input type="range" min="0" max="360" value={gAngle} onChange={e=>setGAngle(parseInt(e.target.value))} style={{width:'100%',accentColor:'#A020F0',marginTop:'6px'}}/></div></div>)}
            {bgType==="image"&&(<><input ref={bgFileRef} type="file" hidden accept="image/*" onChange={onBgFile}/><button onClick={()=>bgFileRef.current?.click()} style={{width:'100%',padding:'9px',borderRadius:'7px',background:'rgba(255,255,255,0.08)',border:'1px dashed rgba(255,255,255,0.15)',color:'#fff',fontSize:'11px',cursor:'pointer'}}>{bgImage?"Change background image":"Upload your background"}</button></>)}
          </div>
        </div>
      </div>

      {/* FOOTER LOCKED AS IT IS - DO NOT CHANGE */}
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
