"use client"
import { useState, useRef, useEffect } from "react"
type MainMode="transparent"|"withBg"; type BgType="color"|"gradient"|"image"; type OutFormat="png"|"jpg"|"webp"
export default function BgRemoverFixed(){
  const [preview,setPreview]=useState(""); const [output,setOutput]=useState(""); const [finalUrl,setFinalUrl]=useState(""); const [done,setDone]=useState(false); const [loading,setLoading]=useState(false); const [status,setStatus]=useState("")
  const [mainMode,setMainMode]=useState<MainMode>("transparent"); const [bgType,setBgType]=useState<BgType>("color"); const [bgColor,setBgColor]=useState("#ffffff"); const [hue,setHue]=useState(0)
  const [gColor1,setGColor1]=useState("#ffffff"); const [gColor2,setGColor2]=useState("#000000"); const [gAngle,setGAngle]=useState(135); const [bgImage,setBgImage]=useState(""); const [outFormat,setOutFormat]=useState<OutFormat>("png")
  const fileRef=useRef<HTMLInputElement>(null); const bgFileRef=useRef<HTMLInputElement>(null); const colorInputRef=useRef<HTMLInputElement>(null)
  const checker={backgroundColor:'#1a1a1a',backgroundImage:`linear-gradient(45deg,#2a2a2a 25%,transparent 25%),linear-gradient(-45deg,#2a2a2a 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#2a2a2a 75%),linear-gradient(-45deg,transparent 75%,#2a2a2a 75%)`,backgroundSize:'20px 20px',backgroundPosition:'0 0,0 10px,10px -10px,-10px 0px'} as const
  const hslToHex=(h:number)=>{const s=100,l=50; const k=(n:number)=>(n+h/30)%12; const a=s/100*Math.min(l/100,1-l/100); const f=(n:number)=>l/100-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1))); const toHex=(x:number)=>Math.round(x*255).toString(16).padStart(2,'0'); return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`}
  const getGradient=()=>`linear-gradient(${gAngle}deg,${gColor1} 0%,${gColor2} 100%)`
  const buildFinal=async()=>{if(!output)return; const img=new Image(); img.crossOrigin="anonymous"; img.src=output; await new Promise<void>(r=>{img.onload=()=>r(); img.onerror=()=>r()}); const c=document.createElement('canvas'); c.width=img.naturalWidth||1024; c.height=img.naturalHeight||1024; const ctx=c.getContext('2d')!; if(mainMode!=="transparent"){if(bgType==="color"){ctx.fillStyle=bgColor; ctx.fillRect(0,0,c.width,c.height)}else if(bgType==="gradient"){const g=ctx.createLinearGradient(0,0,Math.cos(gAngle*Math.PI/180)*c.width,Math.sin(gAngle*Math.PI/180)*c.height); g.addColorStop(0,gColor1); g.addColorStop(1,gColor2); ctx.fillStyle=g; ctx.fillRect(0,0,c.width,c.height)}else if(bgType==="image"&&bgImage){const b=new Image(); b.crossOrigin="anonymous"; b.src=bgImage; await new Promise<void>(r=>{b.onload=()=>r(); b.onerror=()=>r()}); const sc=Math.max(c.width/b.width,c.height/b.height); ctx.drawImage(b,(c.width-b.width*sc)/2,(c.height-b.height*sc)/2,b.width*sc,b.height*sc)}}else if(outFormat==="jpg"){ctx.fillStyle="#fff"; ctx.fillRect(0,0,c.width,c.height)}; ctx.drawImage(img,0,0,c.width,c.height); setFinalUrl(c.toDataURL(outFormat==="jpg"?"image/jpeg":outFormat==="webp"?"image/webp":"image/png",0.92))}
  useEffect(()=>{if(done)buildFinal()},[mainMode,bgType,bgColor,bgImage,gColor1,gColor2,gAngle,done,output,outFormat])
  const onFile=async(e:any)=>{const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]; if(!f)return; setPreview(URL.createObjectURL(f)); setDone(false); setOutput(""); setFinalUrl(""); setLoading(true); setStatus("Removing background..."); try{const fd=new FormData(); fd.append('file',f); const r=await fetch('/api/remove-bg',{method:'POST',body:fd}); const blob=await r.blob(); setOutput(URL.createObjectURL(blob)); setDone(true)}catch{setStatus("Failed")}setLoading(false)}
  const onBgFile=(e:any)=>{const f=e.target.files?.[0]; if(!f)return; setBgImage(URL.createObjectURL(f)); setBgType("image"); setMainMode("withBg")}
  const download=()=>{const url=finalUrl||output; if(!url)return; const a=document.createElement("a"); a.href=url; a.download=`pinna3d-${Date.now()}.${outFormat}`; a.click()}
  const getPreviewBg=()=>{if(!done)return{background:'#0F0D1C'}; if(mainMode==="transparent")return checker; if(bgType==="color")return{background:bgColor} as const; if(bgType==="gradient")return{background:getGradient()} as const; if(bgType==="image"&&bgImage)return{backgroundImage:`url(${bgImage})`,backgroundSize:'cover',backgroundPosition:'center'} as const; return{background:'#fff'} as const}

  return(
    <div style={{background:'#080612',color:'#fff',fontFamily:'Inter, system-ui',minHeight:'100vh'}}>
      <style>{`
.iv{display:grid;grid-template-columns:1.15fr 0.85fr;gap:14px;padding:16px 18px 16px 24px;max-width:1440px;margin:0 auto;align-items:start}
.left{display:flex;flex-direction:column;gap:12px}
.badge{display:inline-flex;background:rgba(160,32,240,0.14);border:1px solid rgba(160,32,240,0.28);color:#C4B5FD;font-size:9.5px;letter-spacing:.14em;font-weight:700;padding:6px 12px;border-radius:999px;width:fit-content}
.h1{font-size:42px;line-height:.95;letter-spacing:-.03em;font-weight:800;margin:8px 0 0}
.sub{font-size:13px;line-height:1.6;color:rgba(255,255,255,0.56);max-width:520px;margin-top:10px}
.six{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px}
.mini{background:rgba(255,255,255,0.045);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:11px 12px;min-height:62px}
.mini.k{font-size:9px;letter-spacing:.12em;font-weight:700;color:rgba(255,255,255,0.42);text-transform:uppercase}
.mini.v{font-size:12.5px;font-weight:700;margin-top:6px;line-height:1.2}
.mini.s{font-size:11px;color:#A78BFA;margin-top:3px}
.mini.s2{font-size:11px;color:rgba(255,255,255,0.5);margin-top:3px}
.bottom{background:linear-gradient(135deg,#1C1435 0%,#2A1B4D 38%,#151023 100%);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:18px;position:relative;overflow:hidden}
.bottom::before{content:'';position:absolute;top:-40px;right:-40px;width:180px;height:180px;background:radial-gradient(circle,rgba(160,32,240,0.28),transparent 70%);pointer-events:none}
.realRow{display:flex;gap:16px;align-items:flex-start;position:relative;z-index:2}
.circle{width:58px;height:58px;border-radius:50%;border:1.6px dashed rgba(160,32,240,0.7);display:grid;place-items:center;flex-shrink:0}
.circleInner{width:34px;height:34px;border-radius:50%;background:#A020F0;display:grid;place-items:center;color:#fff;font-size:18px;font-weight:700;box-shadow:0 0 18px rgba(160,32,240,0.5)}
.realTitle{font-size:23px;font-weight:800;line-height:.92;letter-spacing:-.02em}
.realDesc{font-size:12px;color:rgba(255,255,255,0.62);line-height:1.5;margin-top:7px;max-width:360px}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:2px;position:relative;z-index:2}
.tag{padding:6px 11px;border-radius:999px;background:rgba(0,0,0,0.32);border:1px solid rgba(255,255,255,0.09);font-size:10.5px;color:rgba(255,255,255,0.75);display:flex;align-items:center;gap:5px}
.tag b{color:#A020F0;font-size:11px}
.up{width:100%;aspect-ratio:1/1;border-radius:14px;border:1.6px dashed rgba(160,32,240,0.55);background:rgba(15,13,28,0.96);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all.2s}
.prev{background:#15131E;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:10px;width:100%;display:flex;flex-direction:column}
.prevBox{min-height:360px;border-radius:10px;border:1px solid rgba(160,32,240,0.22);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;background:radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);background-size:14px 14px}
.seg{display:flex;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:9px;padding:3px;gap:3px}
.segB{flex:1;padding:8px;border-radius:7px;font-size:11px;font-weight:600;border:1px solid transparent;cursor:pointer;text-align:center}
.segB.on{background:#A020F0;color:#fff}.segB.off{background:transparent;color:rgba(255,255,255,0.6)}
.fmt{padding:5px 10px;border-radius:7px;font-size:10px;font-weight:700;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.6);cursor:pointer}
.fmt.on{background:#fff;color:#000}
.feat{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-top:28px}
@media(max-width:900px){.iv{grid-template-columns:1fr;padding:12px}.six{grid-template-columns:1fr 1fr}.h1{font-size:30px}.feat{grid-template-columns:1fr}}
      `}</style>

      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 20px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(8,6,20,0.92)',position:'sticky',top:0,zIndex:50}}>
        <img src="/logo.png" alt="logo" style={{height:'60px',marginLeft:'-6px'}}/>
        <div style={{display:'flex',gap:'12px',alignItems:'center',fontSize:'13px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Home</a><span style={{color:'#A020F0',fontWeight:600}}>Background Remover</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.08)',padding:'8px 14px',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.12)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',padding:'8px 16px',borderRadius:'8px',color:'#fff',textDecoration:'none',fontWeight:700}}>Get Started</a>
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
              <div>
                <div className="realTitle">∞ Real Alpha.<br/><span style={{color:'#A020F0'}}>Not white filter.</span></div>
                <div className="realDesc">Checkerboard = proof. Drop it on purple, black, neon — edges stay clean.</div>
              </div>
            </div>
            <div className="tags">
              <div className="tag"><b>✓</b> Hair preserved</div>
              <div className="tag"><b>✓</b> No fringe</div>
              <div className="tag"><b>✓</b> 4K export</div>
              <div className="tag"><b>✓</b> 32-bit alpha</div>
              <div className="tag"><b>✓</b> Amazon ready</div>
            </div>
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          <div className="up" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} style={{width:'100%',height:'100%',objectFit:'contain',padding:'8px',borderRadius:'14px'}}/> : <>
              <div style={{width:'44px',height:'44px',borderRadius:'10px',background:'rgba(160,32,240,0.18)',border:'1.5px solid rgba(160,32,240,0.35)',display:'grid',placeItems:'center',marginBottom:'10px'}}>✂️</div>
              <b style={{fontSize:'14px'}}>Drop image to remove BG</b>
              <span style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>or browse to upload</span>
            </>}
          </div>

          <div className="prev">
            <div style={{display:'flex',gap:'8px',marginBottom:'10px'}}>
              <div className="seg" style={{flex:1}}><button className={`segB ${mainMode==="transparent"?"on":"off"}`} onClick={()=>setMainMode("transparent")}>Without Background</button><button className={`segB ${mainMode==="withBg"?"on":"off"}`} onClick={()=>setMainMode("withBg")}>With Background</button></div>
              <div style={{display:'flex',gap:'5px'}}><button className={`fmt ${outFormat==="png"?"on":""}`} onClick={()=>setOutFormat("png")}>PNG</button><button className={`fmt ${outFormat==="jpg"?"on":""}`} onClick={()=>setOutFormat("jpg")}>JPG</button><button className={`fmt ${outFormat==="webp"?"on":""}`} onClick={()=>setOutFormat("webp")}>WEBP</button></div>
            </div>
            <div className="prevBox" style={getPreviewBg() as any}>
              {loading? <div style={{background:'rgba(0,0,0,0.6)',padding:'8px 12px',borderRadius:'8px',fontSize:'11px',zIndex:2}}>{status}</div> : done && (finalUrl||output)? <img src={finalUrl||output} style={{maxWidth:'88%',maxHeight:'88%',objectFit:'contain',zIndex:2}}/> : <div style={{textAlign:'center',color:'rgba(255,255,255,0.4)',fontSize:'11px',zIndex:2}}>Upload image<br/>to see result</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
              <button style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'9px',color:'#fff',fontSize:'11px'}}>Preview</button>
              <button onClick={download} style={{background:done?'#A020F0':'#333',padding:'10px',borderRadius:'9px',color:'#fff',fontSize:'11px',border:'none',fontWeight:700,cursor:done?'pointer':'not-allowed'}}>Download Image</button>
            </div>
          </div>

          <div style={{background:'#161326',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'14px',padding:'12px',display:mainMode==="withBg"?'block':'none'}}>
            <div style={{display:'flex',gap:'6px',marginBottom:'10px'}}><button className={`segB ${bgType==="color"?"on":"off"}`} onClick={()=>setBgType("color")}>Color</button><button className={`segB ${bgType==="gradient"?"on":"off"}`} onClick={()=>setBgType("gradient")}>Gradient</button><button className={`segB ${bgType==="image"?"on":"off"}`} onClick={()=>setBgType("image")}>BG Image</button></div>
            {bgType==="color"&&<div style={{display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'22px',height:'22px',borderRadius:'50%',background:bgColor,border:'2px solid #fff'}}/><input type="range" min="0" max="360" value={hue} onChange={e=>{setHue(parseInt(e.target.value)); setBgColor(hslToHex(parseInt(e.target.value)))}} style={{flex:1,accentColor:'#A020F0'}}/><input ref={colorInputRef} type="color" hidden value={bgColor} onChange={e=>setBgColor(e.target.value)}/><button onClick={()=>colorInputRef.current?.click()} style={{width:'28px',height:'28px',borderRadius:'7px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.15)'}}>🎨</button></div>}
            {bgType==="gradient"&&<div style={{height:'12px',borderRadius:'999px',background:getGradient()}}/>}
            {bgType==="image"&&<><input ref={bgFileRef} type="file" hidden accept="image/*" onChange={onBgFile}/><button onClick={()=>bgFileRef.current?.click()} style={{width:'100%',padding:'9px',borderRadius:'8px',background:'rgba(255,255,255,0.08)',border:'1px dashed rgba(255,255,255,0.15)',color:'#fff',fontSize:'11px'}}>Upload background</button></>}
          </div>
        </div>
      </div>

      <div style={{padding:'40px 24px',maxWidth:'1440px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <h2 style={{textAlign:'center',fontSize:'28px',fontWeight:600}}>Why designers choose Background Remover</h2>
        <div className="feat">
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'15px'}}>✓ True AI, Not White Filter</h3><p style={{color:'rgba(255,255,255,0.55)',fontSize:'12.5px',marginTop:'8px'}}>Works on any background, even complex.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'15px'}}>✓ 100% Private & Fast</h3><p style={{color:'rgba(255,255,255,0.55)',fontSize:'12.5px',marginTop:'8px'}}>Runs in your browser, no server upload.</p></div>
          <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'20px'}}><h3 style={{margin:0,fontSize:'15px'}}>✓ E-commerce Ready</h3><p style={{color:'rgba(255,255,255,0.55)',fontSize:'12.5px',marginTop:'8px'}}>Perfect for Shopify, Amazon, Etsy listings.</p></div>
        </div>
        <div style={{textAlign:'center',marginTop:'28px'}}><a href="/signup" style={{background:'#A020F0',padding:'12px 22px',borderRadius:'10px',color:'#fff',textDecoration:'none',fontWeight:600,fontSize:'13px'}}>Start Removing Free — No CC</a></div>
      </div>
      <footer style={{borderTop:'1px solid rgba(255,255,255,0.08)',padding:'18px 24px',textAlign:'center',fontSize:'11.5px',color:'rgba(255,255,255,0.4)'}}>© 2026 Pinna3d.com • Background Remover Tool</footer>
    </div>
  )
}
