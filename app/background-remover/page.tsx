"use client"
import { useState, useRef, useEffect } from "react"
type MainMode="transparent"|"withBg"; type BgType="color"|"gradient"|"image"; type OutFormat="png"|"jpg"|"webp"
export default function BgRemoverPremium(){
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
    <div style={{background:'#080614',color:'#fff',fontFamily:'Inter, system-ui'}}>
      <style>{`
.iv{display:grid;grid-template-columns:1.22fr 0.78fr;gap:14px;padding:20px 22px 20px 32px;max-width:1440px;margin:0 auto;align-items:stretch}
.left{display:flex;flex-direction:column;gap:18px;justify-content:space-between;height:100%}
.badge{font-size:9px;letter-spacing:.16em;font-weight:700;color:#A78BFA;background:rgba(160,32,240,0.12);border:1px solid rgba(160,32,240,0.22);padding:6px 12px;border-radius:999px;width:fit-content}
.h1{font-size:52px;line-height:.92;letter-spacing:-.04em;font-weight:800;margin:10px 0 0}
.sub{font-size:13.5px;line-height:1.65;color:rgba(255,255,255,0.52);max-width:500px;margin-top:12px}
.cards{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.card{background:linear-gradient(180deg,rgba(160,32,240,0.16) 0%,rgba(22,18,38,0.95) 60%);border:1px solid rgba(255,255,255,0.09);border-radius:20px;padding:18px;position:relative;overflow:hidden}
.card:after{content:'';position:absolute;top:-60px;right:-60px;width:140px;height:140px;background:radial-gradient(circle,rgba(160,32,240,0.22),transparent 70%);pointer-events:none}
.card-ic{width:40px;height:40px;border-radius:10px;background:rgba(160,32,240,0.22);border:1px solid rgba(160,32,240,0.32);display:grid;place-items:center;font-size:16px;margin-bottom:12px}
.card h3{font-size:14.5px;font-weight:600;margin:0}
.card p{font-size:12px;color:rgba(255,255,255,0.55);margin:4px 0 10px;line-height:1.45}
.card ul{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:5px}
.card li{font-size:11px;color:rgba(255,255,255,0.72);display:flex;gap:6px;align-items:center}
.card li i{width:16px;height:16px;border-radius:50%;background:rgba(160,32,240,0.22);display:grid;place-items:center;font-size:9px;color:#D8B4FE;font-style:normal}
.showcase{border-radius:20px;border:1px solid rgba(255,255,255,0.08);background:linear-gradient(135deg,#1A162D 0%,#12101F 100%);padding:16px;display:flex;flex-direction:column;gap:14px;flex:1;min-height:210px}
.show-head{display:flex;justify-content:space-between;align-items:center}
.pill{padding:5px 10px;border-radius:999px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);font-size:10px;color:rgba(255,255,255,0.6)}
.visual{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:10px;align-items:center;flex:1}
.vbox{border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(0,0,0,0.35);padding:8px;display:flex;flex-direction:column;align-items:center;gap:8px}
.vbox.mid{background:rgba(160,32,240,0.12);border-color:rgba(160,32,240,0.22)}
.vimg{width:100%;height:78px;border-radius:8px;display:grid;place-items:center;position:relative;overflow:hidden}
.arr{color:#A020F0;font-size:16px;font-weight:700}
.up{width:100%;aspect-ratio:1/1;border-radius:16px;border:1.8px dashed rgba(160,32,240,0.5);background:rgba(18,16,31,0.96);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer}
.prev{background:#161326;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:10px;width:100%;display:flex;flex-direction:column}
.prevBox{min-height:340px;border-radius:12px;border:1px solid rgba(160,32,240,0.22);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.seg{display:flex;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:9px;padding:3px;gap:3px}
.segB{flex:1;padding:7px;border-radius:7px;font-size:11px;font-weight:600;border:1px solid transparent;cursor:pointer}
.segB.on{background:#A020F0;color:#fff}.segB.off{background:transparent;color:rgba(255,255,255,0.6)}
.fmt{padding:5px 10px;border-radius:7px;font-size:10px;font-weight:700;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.6);cursor:pointer}
.fmt.on{background:#fff;color:#000}
.feat{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-top:28px}
@media(max-width:900px){.iv{grid-template-columns:1fr;padding:14px}.cards{grid-template-columns:1fr}.h1{font-size:34px}.feat{grid-template-columns:1fr}.visual{grid-template-columns:1fr 1fr 1fr}}
      `}</style>

      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 22px',borderBottom:'1px solid rgba(255,255,255,0.08)',position:'sticky',top:0,background:'rgba(8,6,20,0.92)',zIndex:50}}>
        <img src="/logo.png" style={{height:'62px',marginLeft:'-6px'}} alt="logo"/>
        <div style={{display:'flex',gap:'12px',alignItems:'center',fontSize:'13px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Home</a><span style={{color:'#A020F0',fontWeight:600}}>Background Remover</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.08)',padding:'8px 14px',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.12)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',padding:'8px 16px',borderRadius:'8px',color:'#fff',textDecoration:'none',fontWeight:700}}>Get Started</a>
        </div>
      </header>

      <div className="iv">
        <div className="left">
          <div>
            <div className="badge">● BACKGROUND REMOVER • PHOTO STUDIO</div>
            <h1 className="h1">Every background<br/>removed<br/><span style={{color:'#A020F0'}}>in 1 second</span></h1>
            <p className="sub">Built for sellers who need catalog-ready images. Our AI preserves fine details — hair, lace, glass, soft shadows — while removing only the background. Export in PNG, JPG or WEBP, ready for Amazon, Shopify and brand decks.</p>
          </div>

          <div className="cards">
            <div className="card">
              <div className="card-ic">✂️</div>
              <h3>Photo Studio</h3>
              <p>Your Shopify photos, studio-ready in 1 sec.</p>
              <ul>
                <li><i>✓</i> Real alpha, not white paint</li>
                <li><i>✓</i> Edge decontamination • Hair intact</li>
                <li><i>✓</i> JPG, PNG, WEBP, HEIC up to 20MB</li>
              </ul>
            </div>
            <div className="card" style={{background:'linear-gradient(180deg,rgba(255,255,255,0.07),rgba(22,19,38,0.95))'}}>
              <div className="card-ic" style={{background:'rgba(255,255,255,0.08)',borderColor:'rgba(255,255,255,0.14)'}}>◍</div>
              <h3>Marketplace Ready</h3>
              <p>Transparent + studio backgrounds compliant.</p>
              <ul>
                <li><i>✓</i> Amazon / Shopify compliant</li>
                <li><i>✓</i> ~1.7s per image • GPU accelerated</li>
                <li><i>✓</i> HD & 4K alpha export</li>
              </ul>
            </div>
          </div>

          <div className="showcase">
            <div className="show-head">
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <div style={{width:'32px',height:'32px',borderRadius:'9px',background:'#A020F0',display:'grid',placeItems:'center',fontSize:'14px'}}>✓</div>
                <div><div style={{fontSize:'13px',fontWeight:700}}>Professional alpha matting — not a filter</div><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)'}}>100% browser processing • No server upload • Free • Unlimited</div></div>
              </div>
              <div style={{display:'flex',gap:'6px'}}><span className="pill">PNG</span><span className="pill">JPG</span><span className="pill" style={{background:'#fff',color:'#000',fontWeight:800}}>4K</span></div>
            </div>

            <div className="visual">
              <div className="vbox">
                <div className="vimg" style={{background:'#2a2a2a'}}><span style={{fontSize:'10px',color:'rgba(255,255,255,0.5)'}}>ORIGINAL PHOTO</span><div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 50% 30%,rgba(255,255,255,0.15),transparent)',}}></div></div>
                <div style={{fontSize:'10px',fontWeight:600}}>Before</div>
              </div>
              <div className="arr">→</div>
              <div className="vbox mid">
                <div className="vimg" style={{background:'#15131E'}}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A020F0" strokeWidth="1.6"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M9 12l2 2 4-4"/></svg></div>
                <div style={{fontSize:'10px',fontWeight:600,color:'#D8B4FE'}}>AI Edge Detection</div>
              </div>
              <div className="arr">→</div>
              <div className="vbox" style={{background:'#fff'}}>
                <div className="vimg" style={{background:'repeating-conic-gradient(#ddd 0% 25%, #fff 0% 50%) 0 / 12px 12px'}}><div style={{width:'36px',height:'36px',borderRadius:'8px',background:'linear-gradient(135deg,#8B5CF6,#A020F0)',boxShadow:'0 6px 18px rgba(160,32,240,0.4)'}}></div></div>
                <div style={{fontSize:'10px',fontWeight:700,color:'#000'}}>Transparent</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          <div className="up" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
            {preview? <img src={preview} style={{width:'100%',height:'100%',objectFit:'contain',padding:'8px',borderRadius:'14px'}}/> : <>
              <div style={{width:'52px',height:'52px',borderRadius:'12px',background:'rgba(160,32,240,0.18)',border:'1.5px solid rgba(160,32,240,0.32)',display:'grid',placeItems:'center',marginBottom:'10px'}}>✂️</div>
              <b style={{fontSize:'14px'}}>Drop image to remove background</b>
              <span style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'4px'}}>or click to browse • PNG, JPG, WEBP, HEIC</span>
            </>}
          </div>

          <div className="prev">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
              <div className="seg" style={{flex:1,marginRight:'8px'}}><button className={`segB ${mainMode==="transparent"?"on":"off"}`} onClick={()=>setMainMode("transparent")}>Without BG</button><button className={`segB ${mainMode==="withBg"?"on":"off"}`} onClick={()=>setMainMode("withBg")}>With BG</button></div>
              <div style={{display:'flex',gap:'5px'}}><button className={`fmt ${outFormat==="png"?"on":""}`} onClick={()=>setOutFormat("png")}>PNG</button><button className={`fmt ${outFormat==="jpg"?"on":""}`} onClick={()=>setOutFormat("jpg")}>JPG</button><button className={`fmt ${outFormat==="webp"?"on":""}`} onClick={()=>setOutFormat("webp")}>WEBP</button></div>
            </div>
            <div className="prevBox" style={getPreviewBg() as any}>
              {loading? <div style={{background:'rgba(0,0,0,0.6)',padding:'8px 12px',borderRadius:'8px',fontSize:'11px',zIndex:2}}>{status}</div> : done && (finalUrl||output)? <img src={finalUrl||output} style={{maxWidth:'88%',maxHeight:'88%',objectFit:'contain',zIndex:2}}/> : <div style={{textAlign:'center',color:'rgba(255,255,255,0.4)',fontSize:'11px',zIndex:2}}>Upload image<br/>to see result</div>}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'10px'}}>
              <button style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'9px',color:'#fff',fontSize:'11px'}}>Preview</button>
              <button onClick={download} style={{background:done?'#A020F0':'#333',padding:'10px',borderRadius:'9px',color:'#fff',fontSize:'11px',border:'none',fontWeight:700,cursor:done?'pointer':'not-allowed'}}>Download {outFormat.toUpperCase()}</button>
            </div>
          </div>

          <div style={{background:'#161326',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'12px',display:mainMode==="withBg"?'block':'none'}}>
            <div style={{display:'flex',gap:'6px',marginBottom:'10px'}}><button className={`segB ${bgType==="color"?"on":"off"}`} onClick={()=>setBgType("color")}>Color</button><button className={`segB ${bgType==="gradient"?"on":"off"}`} onClick={()=>setBgType("gradient")}>Gradient</button><button className={`segB ${bgType==="image"?"on":"off"}`} onClick={()=>setBgType("image")}>BG Image</button></div>
            {bgType==="color"&&<div style={{display:'flex',alignItems:'center',gap:'8px'}}><div style={{width:'22px',height:'22px',borderRadius:'50%',background:bgColor,border:'2px solid #fff'}}/><input type="range" min="0" max="360" value={hue} onChange={e=>{setHue(parseInt(e.target.value)); setBgColor(hslToHex(parseInt(e.target.value)))}} style={{flex:1,accentColor:'#A020F0'}}/><button onClick={()=>colorInputRef.current?.click()} style={{width:'28px',height:'28px',borderRadius:'7px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.15)'}}>🎨</button><input ref={colorInputRef} type="color" hidden value={bgColor} onChange={e=>setBgColor(e.target.value)}/></div>}
            {bgType==="gradient"&&<div style={{height:'14px',borderRadius:'999px',background:getGradient(),border:'1px solid rgba(255,255,255,0.15)'}}/>}
            {bgType==="image"&&<><input ref={bgFileRef} type="file" hidden accept="image/*" onChange={onBgFile}/><button onClick={()=>bgFileRef.current?.click()} style={{width:'100%',padding:'9px',borderRadius:'8px',background:'rgba(255,255,255,0.08)',border:'1px dashed rgba(255,255,255,0.15)',color:'#fff',fontSize:'11px'}}>Upload background</button></>}
          </div>
        </div>
      </div>

      {/* FOOTER LOCKED */}
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
