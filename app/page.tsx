"use client"
import { useState } from "react"

export default function Page(){
  const [preview,setPreview]=useState("")
  const [done,setDone]=useState(false)
  const onFile = (e:any)=>{
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    setPreview(URL.createObjectURL(f))
    setTimeout(()=>setDone(true),1500)
  }

  const handleClick = (msg:string) => alert(msg + " - Coming soon! 🚀")

  return (
    <div style={{background:'#0B0A14',color:'#fff',fontFamily:'Inter, system-ui, sans-serif',minHeight:'100vh'}}>

      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 32px',borderBottom:'1px solid #1e1c32',background:'#0B0A14',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center'}}>
         <img src="/logo.png" alt="Pinna3d.com" style={{height:'100px',width:'auto',display:'block'}} />
        </div>
        <div style={{display:'flex',gap:'24px',alignItems:'center',fontSize:'14px'}}>
          <span onClick={()=>handleClick('Features')} style={{opacity:.6,cursor:'pointer'}}>Features</span>
          <span onClick={()=>handleClick('Pricing')} style={{color:'#A020F0',fontWeight:700,cursor:'pointer'}}>Pricing</span>
          <span onClick={()=>handleClick('Docs')} style={{opacity:.6,cursor:'pointer'}}>Docs</span>
          <span style={{background:'#1e1c32',padding:'8px 16px',borderRadius:'8px',cursor:'pointer'}} onClick={()=>handleClick('Sign In')}>Sign In</span>
          <button onClick={()=>handleClick('Get Started')} style={{background:'#A020F0',padding:'8px 18px',borderRadius:'8px',fontWeight:700,cursor:'pointer',border:'none',color:'#fff'}}>Get Started</button>
        </div>
      </header>

      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr 0.9fr',gap:'20px',padding:'36px',maxWidth:'1400px',margin:'0 auto'}}>
        <div>
          <h1 style={{fontSize:'42px',lineHeight:'1.05',fontWeight:800,margin:0}}>Every Image to 3D or Vector<br/>in 60 Seconds</h1>
          <p style={{opacity:.6,marginTop:'14px',fontSize:'14px'}}>Transform photos into production-ready 3D models & scalable vectors instantly.</p>
          <div style={{display:'flex',gap:'12px',marginTop:'22px'}}>
            <button onClick={()=>handleClick('Start Creating')} style={{background:'#A020F0',padding:'12px 20px',borderRadius:'10px',fontWeight:700,fontSize:'14px',cursor:'pointer',border:'none',color:'#fff'}}>✦ Start Creating — Free</button>
            <button onClick={()=>handleClick('Watch Demo')} style={{border:'1px solid #2a2840',background:'transparent',padding:'12px 20px',borderRadius:'10px',fontSize:'14px',cursor:'pointer',color:'#fff'}}>◉ Watch Demo</button>
          </div>
        </div>

        <div onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.5px dashed #A020F0',borderRadius:'18px',background:'#13111F',padding:'24px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
          <div style={{width:'56px',height:'56px',background:'#1e1b33',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'26px',marginBottom:'14px'}}>☁️</div>
          <b>Drag & drop your image here</b>
          <label style={{marginTop:'16px',cursor:'pointer',color:'#A020F0',fontSize:'13px',fontWeight:600,background:'#1e1b33',padding:'10px 20px',borderRadius:'8px',display:'block'}}>
            <input type="file" hidden onChange={onFile}/> Browse Files - CLICK ME
          </label>
          {preview && <img src={preview} alt="preview" style={{width:'90px',borderRadius:'8px',marginTop:'12px'}}/>}
        </div>

        <div style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'18px',padding:'12px'}}>
          <div style={{background:'radial-gradient(ellipse at center,#2a1a4a,#0f0e1a)',borderRadius:'12px',height:'230px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
            {done && preview? <img src={preview} alt="3d" style={{height:'150px',borderRadius:'8px'}}/> : <div style={{fontSize:'64px'}}>👟</div>}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'12px'}}>
            <button onClick={()=>handleClick('Download GLB')} style={{background:'#1a1830',border:'1px solid #2a2840',padding:'10px',borderRadius:'8px',fontSize:'12px',cursor:'pointer',color:'#fff'}}>Download GLB</button>
            <button onClick={()=>handleClick('Export SVG')} style={{background:'#A020F0',padding:'10px',borderRadius:'8px',fontSize:'12px',fontWeight:700,cursor:'pointer',border:'none',color:'#fff'}}>Export SVG</button>
          </div>
        </div>
      </div>

      <div style={{padding:'24px 36px 50px',maxWidth:'1400px',margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'18px'}}>
          {[
            {t:'Free',p:'₹0',btn:'Get Started Free'},
            {t:'Pro',p:'₹999',btn:'Start Pro Trial'},
            {t:'Business',p:'₹2499',btn:'Contact Sales'},
          ].map(c=>(
            <div key={c.t} style={{background:'#13111F',border:'1px solid #201e33',borderRadius:'16px',padding:'22px',textAlign:'center'}}>
              <div>{c.t}</div>
              <div style={{fontSize:'34px',fontWeight:800}}>{c.p}</div>
              <button onClick={()=>handleClick(c.btn)} style={{marginTop:'20px',background:'#A020F0',padding:'11px',borderRadius:'10px',width:'100%',border:'none',color:'#fff',fontWeight:600,cursor:'pointer'}}>{c.btn}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
