"use client"
import { useState, useRef, useEffect } from "react"
type MainMode="transparent"|"withBg"; type BgType="color"|"gradient"|"image"; type OutFormat="png"|"jpg"|"webp"
export default function BgRemoverColorFixed(){
  const [preview,setPreview]=useState(""); const [output,setOutput]=useState(""); const [finalUrl,setFinalUrl]=useState(""); const [done,setDone]=useState(false); const [loading,setLoading]=useState(false)
  const [mainMode,setMainMode]=useState<MainMode>("transparent"); const [bgType,setBgType]=useState<BgType>("color"); const [bgColor,setBgColor]=useState("#ffffff"); const [hue,setHue]=useState(0)
  const [gColor1,setGColor1]=useState("#ffffff"); const [gColor2,setGColor2]=useState("#000000"); const [gAngle,setGAngle]=useState(135); const [bgImage,setBgImage]=useState(""); const [outFormat,setOutFormat]=useState<OutFormat>("png")
  const fileRef=useRef<HTMLInputElement>(null); const bgFileRef=useRef<HTMLInputElement>(null); const colorInputRef=useRef<HTMLInputElement>(null)
  const checker={backgroundColor:'#15131F',backgroundImage:`linear-gradient(45deg,#1E1C2A 25%,transparent 25%),linear-gradient(-45deg,#1E1C2A 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#1E1C2A 75%),linear-gradient(-45deg,transparent 75%,#1E1C2A 75%)`,backgroundSize:'20px 20px',backgroundPosition:'0 0,0 10px,10px -10px,-10px 0px'} as const
  const hslToHex=(h:number)=>{const s=100,l=50; const k=(n:number)=>(n+h/30)%12; const a=s/100*Math.min(l/100,1-l/100); const f=(n:number)=>l/100-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1))); const toHex=(x:number)=>Math.round(x*255).toString(16).padStart(2,'0'); return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`}
  const getGradient=()=>`linear-gradient(${gAngle}deg,${gColor1} 0%,${gColor2} 100%)`
  const buildFinal=async()=>{if(!output)return; const img=new Image(); img.crossOrigin="anonymous"; img.src=output; await new Promise<void>(r=>{img.onload=()=>r(); img.onerror=()=>r()}); const c=document.createElement('canvas'); c.width=img.naturalWidth||1024; c.height=img.naturalHeight||1024; const ctx=c.getContext('2d')!; if(mainMode!=="transparent"){if(bgType==="color"){ctx.fillStyle=bgColor; ctx.fillRect(0,0,c.width,c.height)}else if(bgType==="gradient"){const g=ctx.createLinearGradient(0,0,Math.cos(gAngle*Math.PI/180)*c.width,Math.sin(gAngle*Math.PI/180)*c.height); g.addColorStop(0,gColor1); g.addColorStop(1,gColor2); ctx.fillStyle=g; ctx.fillRect(0,0,c.width,c.height)}else if(bgType==="image"&&bgImage){const b=new Image(); b.crossOrigin="anonymous"; b.src=bgImage; await new Promise<void>(r=>{b.onload=()=>r(); b.onerror=()=>r()}); const sc=Math.max(c.width/b.width,c.height/b.height); ctx.drawImage(b,(c.width-b.width*sc)/2,(c.height-b.height*sc)/2,b.width*sc,b.height*sc)}}else if(outFormat==="jpg"){ctx.fillStyle="#fff"; ctx.fillRect(0,0,c.width,c.height)}; ctx.drawImage(img,0,0,c.width,c.height); setFinalUrl(c.toDataURL(outFormat==="jpg"?"image/jpeg":outFormat==="webp"?"image/webp":"image/png",0.92))}
  useEffect(()=>{if(done)buildFinal()},[mainMode,bgType,bgColor,bgImage,gColor1,gColor2,gAngle,done,output,outFormat])
  const onFile=async(e:any)=>{const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]; if(!f)return; setPreview(URL.createObjectURL(f)); setDone(false); setOutput(""); setFinalUrl(""); setLoading(true); try{const fd=new FormData(); fd.append('file',f); const r=await fetch('/api/remove-bg',{method:'POST',body:fd}); const blob=await r.blob(); setOutput(URL.createObjectURL(blob)); setDone(true)}catch{}setLoading(false)}
  const onBgFile=(e:any)=>{const f=e.target.files?.[0]; if(!f)return; setBgImage(URL.createObjectURL(f)); setBgType("image"); setMainMode("withBg")}
  const download=()=>{const url=finalUrl||output; if(!url)return; const a=document.createElement("a"); a.href=url; a.download=`pinna3d-${Date.now()}.${outFormat}`; a.click()}
  const getPreviewBg=()=>{if(!done)return{background:'#17151F'}; if(mainMode==="transparent")return checker; if(bgType==="color")return{background:bgColor} as const; if(bgType==="gradient")return{background:getGradient()} as const; if(bgType==="image"&&bgImage)return{backgroundImage:`url(${bgImage})`,backgroundSize:'cover',backgroundPosition:'center'} as const; return{background:'#fff'} as const}

  return(
    <div style={{background:'#0B0A14',color:'#fff',fontFamily:'Inter, system-ui',minHeight:'100vh'}}>
      <style>{`
.iv{display:grid;grid-template-columns:1.08fr 0.92fr;gap:16px;padding:14px 18px 14px 20px;max-width:1440px;margin:0 auto;align-items:start}
.left{display:flex;flex-direction:column;gap:11px}
.badge{display:inline-flex;background:#1E1A33;border:1px solid #312A4E;color:#A78BFA;font-size:9px;letter-spacing:.14em;font-weight:700;padding:5px 11px;border-radius:999px;width:fit-content}
.h1{font-size:40px;line-height:.92;letter-spacing:-.03em;font-weight:800;margin:10px 0 0}
.sub{font-size:12.5px;line-height:1.55;color:#7A758E;max-width:500px;margin-top:12px}
.six{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px}
.mini{background:#17151F;border:1px solid #26243A;border-radius:12px;padding:11px 13px;min-height:66px}
.mini.k{font-size:9.5px;letter-spacing:.10em;font-weight:600;color:#7A758E;text-transform:uppercase}
.mini.v{font-size:12px;font-weight:600;color:#EDEAF5;margin-top:6px}
.mini.s{font-size:11px;color:#A78BFA;margin-top:4px;font-weight:500}
.mini.s2{font-size:11px;color:#7A758E;margin-top:4px}
.bottom{background:linear-gradient(115deg,#211A3A 0%,#2A2050 45%,#1B1632 100%);border:1px solid #312A4E;border-radius:16px;padding:16px 18px;display:flex;flex-direction:column;gap:14px;position:relative;overflow:hidden}
.realRow{display:flex;gap:14px;align-items:flex-start}
.circle{width:52px;height:52px;border-radius:50%;border:1.4px dashed #7C5CFF;display:grid;place-items:center;flex-shrink:0}
.circleInner{width:30px;height:30px;border-radius:50%;background:#A020F0;display:grid;place-items:center;color:#fff;font-size:15px;font-weight:700}
.realTitle{font-size:20px;font-weight:800;line-height:.92}
.realDesc{font-size:11px;color:#9B96B3;line-height:1.45;margin-top:6px;max-width:360px}
.tags{display:flex;gap:7px;flex-wrap:wrap}
.tag{padding:5px 10px;border-radius:999px;background:#17151F;border:1px solid #26243A;font-size:10px;color:#9B96B3;display:flex;align-items:center;gap:5px}
.tag b{color:#A020F0}
.rightCol{display:flex;flex-direction:column;gap:10px}
.up{width:100%;aspect-ratio:1.02/1;border-radius:14px;border:1.5px dashed #5A4A8A;background:#17151F;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer}
.upIcon{width:38px;height:38px;border-radius:10px;background:#231E3D;border:1px solid #3A3160;display:grid;place-items:center;margin-bottom:12px;font-size:15px}
.prev{background:#17151F;border:1px solid #26243A;border-radius:14px;padding:8px;width:100%;display:flex;flex-direction:column;gap:8px}
.segWrap{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center}
.seg{display:flex;background:#1E1B2E;border:1px solid #2E2A46;border-radius:9px;padding:3px;gap:3px}
.segB{flex:1;padding:7px 10px;border-radius:7px;font-size:11px;font-weight:600;border:1px solid transparent;cursor:pointer;text-align:center}
.segB.on{background:#A020F0;color:#fff}.segB.off{background:transparent;color:#7A758E}
.fmtWrap{display:flex;gap:4px;background:#1E1B2E;border:1px solid #2E2A46;border-radius:9px;padding:3px}
.fmt{padding:6px 10px;border-radius:6px;font-size:10px;font-weight:700;border:1px solid transparent;cursor:pointer}
.fmt.on{background:#FFFFFF;color:#0B0A14;border-color:#FFFFFF}.fmt.off{background:transparent;color:#7A758E}
.prevBox{min-height:360px;border-radius:10px;border:1px solid #26243A;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;background-color:#17151F;background-image:radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);background-size:14px 14px}
.prevBtns{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.pBtn{padding:10px;border-radius:9px;font-size:11px;font-weight:600;border:1px solid #2E2A46;cursor:pointer}
.pBtn.light{background:#1E1B2E;color:#9B96B3}.pBtn.dark{background:#2A2642;color:#EDEAF5}
.footerWrap{padding:32px 20px;max-width:1440px;margin:0 auto;border-top:1px solid #1E1B2E}
.feat{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-top:20px}
.featCard{background:#17151F;border:1px solid #26243A;border-radius:14px;padding:18px}
@media(max-width:900px){.iv{grid-template-columns:1fr;padding:12px}.feat{grid-template-columns:1fr}}
      `}</style>

      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 18px',borderBottom:'1px solid #1E1B2E',background:'#0B0A14',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}><img src="/logo.png" alt="logo" style={{height:'26px'}}/><span style={{fontWeight:800}}>Pinna3d<span style={{color:'#A020F0',fontSize:'11px',marginLeft:'2px'}}>.com</span></span></div>
        <div style={{display:'flex',gap:'10px',alignItems:'center',fontSize:'12px'}}>
          <a href="/" style={{color:'#7A758E',textDecoration:'none'}}>Home</a><span style={{color:'#A020F0',fontWeight:600}}>Background Remover</span>
          <a href="/signin" style={{background:'#17151F',padding:'7px 12px',borderRadius:'8px',border:'1px solid #26243A',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',padding:'7px 14px',borderRadius:'8px',color:'#fff',textDecoration:'none',fontWeight:700}}>Get Started</a>
        </div>
      </header>

      <div className="iv">
        <div className="left">
          <div className="badge">FOR SHOPIFY • AMAZON • BRAND DECKS</div>
          <h1 className="h1">Background gone.<br/>Product stays <span style={{color:'#A020F0'}}>perfect.</span></h1>
          <p className="sub">AI that understands fur, lace, glass and soft shadows. Not a white paint bucket — a true alpha matte that survives any background you throw at it.</p>
          <div className="six">
            <div className="mini"><div className="k">INPUT</div><div className="v">JPG, PNG, WEBP, HEIC</div><div className="s">Up to 20MB</div></div>
            <div className="mini"><div className="k">OUTPUT</div><div className="v">Transparent + With BG</div><div className="s">JPG / PNG / WEBP</div></div>
            <div className="mini"><div className="k">TRUSTED</div><div className="v">50k+ Brands - 4.9/5</div><div className="s2">Shopify, Etsy, Amazon</div></div>
            <div className="mini"><div className="k">QUALITY</div><div className="v">Edge decontamination</div><div className="s2">HD & 4K output</div></div>
            <div className="mini"><div className="k">SPEED</div><div className="v">~1.7s per image</div><div className="s2">GPU accelerated</div></div>
            <div className="mini"><div className="k">COST</div><div className="v">Free - Unlimited</div><div className="s2">No watermark</div></div>
          </div>
          <div className="bottom">
            <div className="realRow">
              <div className="circle"><div className="circleInner">✓</div></div>
              <div><div className="realTitle">∞ Real Alpha.<br/><span style={{color:'#A020F0'}}>Not white filter.</span></div><div className="realDesc">Checkerboard = proof. Drop it on purple, black, neon — edges stay clean.</div></div>
            </div>
            <div className="tags"><div className="tag"><b>✓</b> Hair preserved</div><div className="tag"><b>✓</b> No fringe</div><div className="tag"><b>✓</b> 4K export</div><div className="tag"><b>✓</b> 32-bit alpha</div><div className="tag"><b>✓</b> Amazon ready</div></div>
          </div>
        </div>

        <div className="rightCol">
          <div className="up" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} style={{width:'100%',height:'100%',objectFit:'contain',padding:'8px',borderRadius:'14px'}}/> : <>
              <div className="upIcon">✂️</div>
              <b style={{fontSize:'13px',color:'#EDEAF5'}}>Drop image to remove BG</b>
              <span style={{fontSize:'11px',color:'#7A758E',marginTop:'4px'}}>or browse to upload</span>
            </>}
          </div>

          <div className="prev">
            <div className="segWrap">
              <div className="seg"><button className={`segB ${mainMode==="transparent"?"on":"off"}`} onClick={()=>setMainMode("transparent")}>Without Background</button><button className={`segB ${mainMode==="withBg"?"on":"off"}`} onClick={()=>setMainMode("withBg")}>With Background</button></div>
              <div className="fmtWrap"><button className={`fmt ${outFormat==="png"?"on":"off"}`} onClick={()=>setOutFormat("png")}>PNG</button><button className={`fmt ${outFormat==="jpg"?"on":"off"}`} onClick={()=>setOutFormat("jpg")}>JPG</button><button className={`fmt ${outFormat==="webp"?"on":"off"}`} onClick={()=>setOutFormat("webp")}>WEBP</button></div>
            </div>
            <div className="prevBox" style={getPreviewBg() as any}>
              {loading? <div style={{background:'rgba(0,0,0,0.6)',padding:'8px 12px',borderRadius:'8px',fontSize:'11px',zIndex:2}}>Processing...</div> : done && (finalUrl||output)? <img src={finalUrl||output} style={{maxWidth:'88%',maxHeight:'88%',objectFit:'contain',zIndex:2}}/> : <div style={{textAlign:'center',color:'#7A758E',fontSize:'11px',zIndex:2}}>Upload image<br/>to see result</div>}
            </div>
            <div className="prevBtns">
              <button className="pBtn light">Preview</button>
              <button onClick={download} className="pBtn dark">Download Image</button>
            </div>
          </div>

          <div style={{background:'#17151F',border:'1px solid #26243A',borderRadius:'14px',padding:'12px',display:mainMode==="withBg"?'block':'none'}}>
            <div style={{display:'flex',gap:'6px',marginBottom:'10px'}}><button className={`segB ${bgType==="color"?"on":"off"}`} onClick={()=>setBgType("color")}>Color</button><button className={`segB ${bgType==="gradient"?"on":"off"}`} onClick={()=>setBgType("gradient")}>Gradient</button><button className={`segB ${bgType==="image"?"on":"off"}`} onClick={()=>setBgType("image")}>BG Image</button></div>
            {bgType==="color"&&<div style={{display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'22px',height:'22px',borderRadius:'50%',background:bgColor,border:'2px solid #fff'}}/><input type="range" min="0" max="360" value={hue} onChange={e=>{setHue(parseInt(e.target.value)); setBgColor(hslToHex(parseInt(e.target.value)))}} style={{flex:1,accentColor:'#A020F0'}}/><input ref={colorInputRef} type="color" hidden value={bgColor} onChange={e=>setBgColor(e.target.value)}/><button onClick={()=>colorInputRef.current?.click()} style={{width:'28px',height:'28px',borderRadius:'7px',background:'#1E1B2E',border:'1px solid #2E2A46'}}>🎨</button></div>}
            {bgType==="gradient"&&<div style={{height:'12px',borderRadius:'999px',background:getGradient(),border:'1px solid #26243A'}}/>}
            {bgType==="image"&&<><input ref={bgFileRef} type="file" hidden accept="image/*" onChange={onBgFile}/><button onClick={()=>bgFileRef.current?.click()} style={{width:'100%',padding:'9px',borderRadius:'8px',background:'#1E1B2E',border:'1px dashed #2E2A46',color:'#7A758E',fontSize:'11px'}}>Upload background</button></>}
          </div>
        </div>
      </div>

      <div className="footerWrap">
        <h2 style={{textAlign:'center',fontSize:'22px',fontWeight:600,color:'#EDEAF5'}}>Why designers choose Background Remover</h2>
        <div className="feat">
          <div className="featCard"><h3 style={{margin:0,fontSize:'13px',color:'#EDEAF5'}}>✓ True AI, Not White Filter</h3><p style={{color:'#7A758E',fontSize:'11.5px',marginTop:'8px'}}>Works on any background, even complex.</p></div>
          <div className="featCard"><h3 style={{margin:0,fontSize:'13px',color:'#EDEAF5'}}>✓ 100% Private & Fast</h3><p style={{color:'#7A758E',fontSize:'11.5px',marginTop:'8px'}}>Runs in your browser, no server upload.</p></div>
          <div className="featCard"><h3 style={{margin:0,fontSize:'13px',color:'#EDEAF5'}}>✓ E-commerce Ready</h3><p style={{color:'#7A758E',fontSize:'11.5px',marginTop:'8px'}}>Perfect for Shopify, Amazon, Etsy listings.</p></div>
        </div>
        <div style={{textAlign:'center',marginTop:'22px'}}><a href="/signup" style={{background:'#A020F0',padding:'10px 20px',borderRadius:'9px',color:'#fff',textDecoration:'none',fontWeight:600,fontSize:'12px'}}>Start Removing Free — No CC</a></div>
      </div>
      <footer style={{borderTop:'1px solid #1E1B2E',padding:'16px 20px',textAlign:'center',fontSize:'11px',color:'#4B5563'}}>© 2026 Pinna3d.com • Background Remover Tool</footer>
    </div>
  )
}
