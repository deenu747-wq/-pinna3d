"use client"
import { useState, useRef, useEffect } from "react"
type MainMode="transparent"|"withBg"; type BgType="color"|"gradient"|"image"; type OutFormat="png"|"jpg"|"webp"
export default function BackgroundRemoverPage(){
  const [preview,setPreview]=useState(""); const [output,setOutput]=useState(""); const [finalUrl,setFinalUrl]=useState(""); const [done,setDone]=useState(false); const [loading,setLoading]=useState(false)
  const [mainMode,setMainMode]=useState<MainMode>("transparent"); const [bgType,setBgType]=useState<BgType>("color"); const [bgColor,setBgColor]=useState("#ffffff"); const [hue,setHue]=useState(0)
  const [gColor1,setGColor1]=useState("#ffffff"); const [gColor2,setGColor2]=useState("#000000"); const [gAngle,setGAngle]=useState(135); const [bgImage,setBgImage]=useState(""); const [outFormat,setOutFormat]=useState<OutFormat>("png")
  const fileRef=useRef<HTMLInputElement>(null); const bgFileRef=useRef<HTMLInputElement>(null); const colorInputRef=useRef<HTMLInputElement>(null)
  const checker={backgroundColor:'#17151F',backgroundImage:`linear-gradient(45deg,#232130 25%,transparent 25%),linear-gradient(-45deg,#232130 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#232130 75%),linear-gradient(-45deg,transparent 75%,#232130 75%)`,backgroundSize:'20px 20px',backgroundPosition:'0 0,0 10px,10px -10px,-10px 0px'} as const
  const hslToHex=(h:number)=>{const s=100,l=50; const k=(n:number)=>(n+h/30)%12; const a=s/100*Math.min(l/100,1-l/100); const f=(n:number)=>l/100-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1))); const toHex=(x:number)=>Math.round(x*255).toString(16).padStart(2,'0'); return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`}
  const getGradient=()=>`linear-gradient(${gAngle}deg,${gColor1} 0%,${gColor2} 100%)`
  const buildFinal=async()=>{if(!output)return; const img=new Image(); img.crossOrigin="anonymous"; img.src=output; await new Promise<void>(r=>{img.onload=()=>r(); img.onerror=()=>r()}); const c=document.createElement('canvas'); c.width=img.naturalWidth||1024; c.height=img.naturalHeight||1024; const ctx=c.getContext('2d')!; if(mainMode!=="transparent"){if(bgType==="color"){ctx.fillStyle=bgColor; ctx.fillRect(0,0,c.width,c.height)}else if(bgType==="gradient"){const g=ctx.createLinearGradient(0,0,Math.cos(gAngle*Math.PI/180)*c.width,Math.sin(gAngle*Math.PI/180)*c.height); g.addColorStop(0,gColor1); g.addColorStop(1,gColor2); ctx.fillStyle=g; ctx.fillRect(0,0,c.width,c.height)}else if(bgType==="image"&&bgImage){const b=new Image(); b.crossOrigin="anonymous"; b.src=bgImage; await new Promise<void>(r=>{b.onload=()=>r(); b.onerror=()=>r()}); const sc=Math.max(c.width/b.width,c.height/b.height); ctx.drawImage(b,(c.width-b.width*sc)/2,(c.height-b.height*sc)/2,b.width*sc,b.height*sc)}}else if(outFormat==="jpg"){ctx.fillStyle="#fff"; ctx.fillRect(0,0,c.width,c.height)}; ctx.drawImage(img,0,0,c.width,c.height); setFinalUrl(c.toDataURL(outFormat==="jpg"?"image/jpeg":outFormat==="webp"?"image/webp":"image/png",0.92))}
  useEffect(()=>{if(done)buildFinal()},[mainMode,bgType,bgColor,bgImage,gColor1,gColor2,gAngle,done,output,outFormat])
  const onFile=async(e:any)=>{const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]; if(!f)return; setPreview(URL.createObjectURL(f)); setDone(false); setOutput(""); setFinalUrl(""); setLoading(true); try{const fd=new FormData(); fd.append('file',f); const r=await fetch('/api/remove-bg',{method:'POST',body:fd}); const blob=await r.blob(); setOutput(URL.createObjectURL(blob)); setDone(true)}catch{}setLoading(false)}
  const onBgFile=(e:any)=>{const f=e.target.files?.[0]; if(!f)return; setBgImage(URL.createObjectURL(f)); setBgType("image"); setMainMode("withBg")}
  const download=()=>{const url=finalUrl||output; if(!url)return; const a=document.createElement("a"); a.href=url; a.download=`pinna3d-${Date.now()}.${outFormat}`; a.click()}
  const getPreviewBg=()=>{if(!done)return{background:'#17151F'}; if(mainMode==="transparent")return checker; if(bgType==="color")return{background:bgColor} as const; if(bgType==="gradient")return{background:getGradient()} as const; if(bgType==="image"&&bgImage)return{backgroundImage:`url(${bgImage})`,backgroundSize:'cover',backgroundPosition:'center'} as const; return{background:'#fff'} as const}

  return(
    <div style={{background:'#0A0A14',color:'#fff',fontFamily:'Inter, system-ui',minHeight:'100vh'}}>
      <style>{`
*{box-sizing:border-box}
.iv{display:grid;grid-template-columns:1.08fr 0.92fr;gap:14px;padding:14px 18px 14px 22px;max-width:1440px;margin:0 auto;align-items:start}
.left{display:flex;flex-direction:column;gap:10px}
.badge{display:inline-flex;background:#1C1830;border:1px solid #322A54;color:#8B7CF8;font-size:9px;letter-spacing:.14em;font-weight:700;padding:5px 11px;border-radius:999px;width:fit-content;text-transform:uppercase}
.h1{font-size:40px;line-height:.92;letter-spacing:-.04em;font-weight:800;margin:12px 0 0;color:#FFFFFF}
.sub{font-size:12.5px;line-height:1.6;color:#6F6B7D;max-width:480px;margin-top:10px}
.six{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px}
.mini{background:#17151F;border:1px solid #26243A;border-radius:12px;padding:11px 13px;min-height:68px}
.mini.k{font-size:9.5px;letter-spacing:.10em;font-weight:600;color:#6F6B7D;text-transform:uppercase}
.mini.v{font-size:12px;font-weight:600;color:#E9E6F3;margin-top:6px;line-height:1.3}
.mini.s{font-size:11px;color:#A78BFA;margin-top:4px}
.mini.s2{font-size:11px;color:#6F6B7D;margin-top:4px}
.bottom{background:linear-gradient(115deg,#1E193A 0%,#231E4A 50%,#191433 100%);border:1px solid #2F2852;border-radius:16px;padding:16px 18px;display:flex;flex-direction:column;gap:12px;position:relative;overflow:hidden}
.bottom::after{content:'';position:absolute;top:6px;right:20px;width:120px;height:120px;background:radial-gradient(circle,rgba(160,32,240,0.22),transparent 68%);pointer-events:none}
.realRow{display:flex;gap:14px;align-items:flex-start;position:relative;z-index:2}
.circle{width:48px;height:48px;border-radius:50%;border:1.4px dashed #6D5BB5;display:grid;place-items:center;flex-shrink:0}
.circleInner{width:28px;height:28px;border-radius:50%;background:#A020F0;display:grid;place-items:center;color:#fff;font-size:13px;font-weight:800}
.realTitle{font-size:19px;font-weight:800;line-height:.9;letter-spacing:-.02em}
.realDesc{font-size:11px;color:#8A859E;line-height:1.45;margin-top:6px}
.tags{display:flex;gap:6px;flex-wrap:wrap;position:relative;z-index:2}
.tag{padding:5px 10px;border-radius:999px;background:#17151F;border:1px solid #26243A;font-size:10px;color:#8A859E;display:flex;align-items:center;gap:5px}
.tag b{color:#A020F0}
.up{width:100%;aspect-ratio:1.05/1;border-radius:14px;border:1.5px dashed #4A3E78;background:#17151F;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer}
.upIcon{width:36px;height:36px;border-radius:10px;background:#211C36;border:1px solid #3A2F5E;display:grid;place-items:center;margin-bottom:10px;color:#A020F0;font-size:14px}
.prev{background:#17151F;border:1px solid #26243A;border-radius:14px;padding:8px;width:100%;display:flex;flex-direction:column;gap:8px}
.segWrap{display:grid;grid-template-columns:1fr auto;gap:8px}
.seg{display:flex;background:#1D1B2A;border:1px solid #2A2842;border-radius:9px;padding:3px;gap:3px}
.segB{flex:1;padding:7px 10px;border-radius:7px;font-size:11px;font-weight:600;border:1px solid transparent;cursor:pointer;text-align:center}
.segB.on{background:#A020F0;color:#fff;border-color:#A020F0}.segB.off{background:transparent;color:#6F6B7D}
.fmtWrap{display:flex;gap:4px;background:#1D1B2A;border:1px solid #2A2842;border-radius:9px;padding:3px}
.fmt{padding:6px 10px;border-radius:6px;font-size:10px;font-weight:700;border:1px solid transparent;cursor:pointer}
.fmt.on{background:#fff;color:#0A0A14}.fmt.off{background:transparent;color:#6F6B7D}
.prevBox{min-height:360px;border-radius:10px;border:1px solid #26243A;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;background:#17151F;background-image:radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);background-size:14px 14px}
.pBtns{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.pBtn{padding:10px;border-radius:8px;font-size:11px;font-weight:600;border:1px solid #26243A;cursor:pointer}
.pBtn.l{background:#1D1B2A;color:#8A859E}.pBtn.d{background:#2A2642;color:#fff}
.footer{padding:36px 20px;max-width:1440px;margin:0 auto;border-top:1px solid #1D1B2A;margin-top:8px}
.feat{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-top:18px}
.featCard{background:#17151F;border:1px solid #26243A;border-radius:12px;padding:16px}
@media(max-width:900px){.iv{grid-template-columns:1fr;padding:12px}.feat{grid-template-columns:1fr}.h1{font-size:28px}}
      `}</style>

      {/* HEADER - SAME AS HOMEPAGE */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 20px',borderBottom:'1px solid #1D1B2A',background:'#0A0A14',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <img src="/logo.png" alt="Pinna3d" style={{height:'28px'}}/>
          <span style={{fontWeight:800,fontSize:'15px',letterSpacing:'-0.02em'}}>Pinna3d<span style={{color:'#A020F0',fontSize:'11px',marginLeft:'2px'}}>.com</span></span>
        </div>
        <div style={{display:'flex',gap:'10px',alignItems:'center',fontSize:'12px'}}>
          <a href="/" style={{color:'#6F6B7D',textDecoration:'none'}}>Home</a>
          <span style={{color:'#A020F0',fontWeight:600}}>Background Remover</span>
          <a href="/signin" style={{background:'#17151F',padding:'7px 12px',borderRadius:'8px',border:'1px solid #26243A',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',padding:'7px 14px',borderRadius:'8px',color:'#fff',textDecoration:'none',fontWeight:700}}>Get Started</a>
        </div>
      </header>

      <div className="iv">
        {/* LEFT - EXACT AS YOUR LAST SCREENSHOT */}
        <div className="left">
          <div className="badge">For Shopify • Amazon • Brand Decks</div>
          <h1 className="h1">Background gone.<br/>Product stays <span style={{color:'#A020F0'}}>perfect.</span></h1>
          <p className="sub">AI that understands fur, lace, glass and soft shadows. Not a white paint bucket — a true alpha matte that survives any background you throw at it.</p>

          <div className="six">
            <div className="mini"><div className="k">Input</div><div className="v">JPG, PNG, WEBP, HEIC</div><div className="s">Up to 20MB</div></div>
            <div className="mini"><div className="k">Output</div><div className="v">Transparent + With BG</div><div className="s">JPG / PNG / WEBP</div></div>
            <div className="mini"><div className="k">Trusted</div><div className="v">50k+ Brands - 4.9/5</div><div className="s2">Shopify, Etsy, Amazon</div></div>
            <div className="mini"><div className="k">Quality</div><div className="v">Edge decontamination</div><div className="s2">HD & 4K output</div></div>
            <div className="mini"><div className="k">Speed</div><div className="v">~1.7s per image</div><div className="s2">GPU accelerated</div></div>
            <div className="mini"><div className="k">Cost</div><div className="v">Free - Unlimited</div><div className="s2">No watermark</div></div>
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

        {/* RIGHT - COLOR MATCHED */}
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          <div className="up" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} style={{width:'100%',height:'100%',objectFit:'contain',padding:'8px',borderRadius:'14px'}}/> : <>
              <div className="upIcon">✂️</div>
              <b style={{fontSize:'13px',color:'#E9E6F3'}}>Drop image to remove BG</b>
              <span style={{fontSize:'11px',color:'#6F6B7D',marginTop:'4px'}}>or browse to upload</span>
            </>}
          </div>

          <div className="prev">
            <div className="segWrap">
              <div className="seg"><button className={`segB ${mainMode==="transparent"?"on":"off"}`} onClick={()=>setMainMode("transparent")}>Without Background</button><button className={`segB ${mainMode==="withBg"?"on":"off"}`} onClick={()=>setMainMode("withBg")}>With Background</button></div>
              <div className="fmtWrap"><button className={`fmt ${outFormat==="png"?"on":"off"}`} onClick={()=>setOutFormat("png")}>PNG</button><button className={`fmt ${outFormat==="jpg"?"on":"off"}`} onClick={()=>setOutFormat("jpg")}>JPG</button><button className={`fmt ${outFormat==="webp"?"on":"off"}`} onClick={()=>setOutFormat("webp")}>WEBP</button></div>
            </div>
            <div className="prevBox" style={getPreviewBg() as any}>
              {loading? <div style={{background:'rgba(0,0,0,0.5)',padding:'8px 12px',borderRadius:'8px',fontSize:'11px',zIndex:2}}>Processing...</div> : done && (finalUrl||output)? <img src={finalUrl||output} style={{maxWidth:'88%',maxHeight:'88%',objectFit:'contain',zIndex:2}}/> : <div style={{textAlign:'center',color:'#6F6B7D',fontSize:'11px',zIndex:2,lineHeight:1.4}}>Upload image<br/>to see result</div>}
            </div>
            <div className="pBtns">
              <button className="pBtn l">Preview</button>
              <button onClick={download} className="pBtn d">Download Image</button>
            </div>
          </div>

          <div style={{background:'#17151F',border:'1px solid #26243A',borderRadius:'14px',padding:'12px',display:mainMode==="withBg"?'block':'none'}}>
            <div style={{display:'flex',gap:'6px',marginBottom:'10px'}}><button className={`segB ${bgType==="color"?"on":"off"}`} onClick={()=>setBgType("color")}>Color</button><button className={`segB ${bgType==="gradient"?"on":"off"}`} onClick={()=>setBgType("gradient")}>Gradient</button><button className={`segB ${bgType==="image"?"on":"off"}`} onClick={()=>setBgType("image")}>BG Image</button></div>
            {bgType==="color"&&<div style={{display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'22px',height:'22px',borderRadius:'50%',background:bgColor,border:'2px solid #fff'}}/><input type="range" min="0" max="360" value={hue} onChange={e=>{setHue(parseInt(e.target.value)); setBgColor(hslToHex(parseInt(e.target.value)))}} style={{flex:1,accentColor:'#A020F0'}}/><input ref={colorInputRef} type="color" hidden value={bgColor} onChange={e=>setBgColor(e.target.value)}/><button onClick={()=>colorInputRef.current?.click()} style={{width:'28px',height:'28px',borderRadius:'7px',background:'#1D1B2A',border:'1px solid #2A2842'}}>🎨</button></div>}
            {bgType==="gradient"&&<div style={{height:'12px',borderRadius:'999px',background:getGradient(),border:'1px solid #26243A'}}/>}
            {bgType==="image"&&<><input ref={bgFileRef} type="file" hidden accept="image/*" onChange={onBgFile}/><button onClick={()=>bgFileRef.current?.click()} style={{width:'100%',padding:'9px',borderRadius:'8px',background:'#1D1B2A',border:'1px dashed #2A2842',color:'#6F6B7D',fontSize:'11px'}}>Upload background</button></>}
          </div>
        </div>
      </div>

      <div className="footer">
        <h2 style={{textAlign:'center',fontSize:'20px',fontWeight:600,color:'#E9E6F3'}}>Why designers choose Background Remover</h2>
        <div className="feat">
          <div className="featCard"><h3 style={{margin:0,fontSize:'13px',color:'#E9E6F3'}}>✓ True AI, Not White Filter</h3><p style={{color:'#6F6B7D',fontSize:'11.5px',marginTop:'8px'}}>Works on any background, even complex.</p></div>
          <div className="featCard"><h3 style={{margin:0,fontSize:'13px',color:'#E9E6F3'}}>✓ 100% Private & Fast</h3><p style={{color:'#6F6B7D',fontSize:'11.5px',marginTop:'8px'}}>Runs in your browser, no server upload.</p></div>
          <div className="featCard"><h3 style={{margin:0,fontSize:'13px',color:'#E9E6F3'}}>✓ E-commerce Ready</h3><p style={{color:'#6F6B7D',fontSize:'11.5px',marginTop:'8px'}}>Perfect for Shopify, Amazon, Etsy listings.</p></div>
        </div>
        <div style={{textAlign:'center',marginTop:'20px'}}><a href="/signup" style={{background:'#A020F0',padding:'10px 20px',borderRadius:'9px',color:'#fff',textDecoration:'none',fontWeight:600,fontSize:'12px'}}>Start Removing Free — No CC</a></div>
      </div>
      <footer style={{borderTop:'1px solid #1D1B2A',padding:'16px 20px',textAlign:'center',fontSize:'11px',color:'#4A445F'}}>© 2026 Pinna3d.com • Background Remover Tool</footer>
    </div>
  )
}
