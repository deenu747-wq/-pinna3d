"use client"
import { useState } from "react"

export default function Page(){
  const [file,setFile]=useState<any>(null)
  const [preview,setPreview]=useState("")
  const [loading,setLoading]=useState(false)
  const [done,setDone]=useState(false)

  function onDrop(e:any){
    e.preventDefault()
    const f=e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setLoading(true)
    setTimeout(()=>{ setLoading(false); setDone(true)}, 3000)
  }

  return (
    <div style={{minHeight:'100vh',background:'#0A0A12',color:'#fff',fontFamily:'system-ui'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap');`}</style>

      {/* HEADER */}
      <header style={{display:'flex',justifyContent:'space-between',padding:'20px 32px',alignItems:'center',borderBottom:'1px solid #1a1a2a'}}>
        <b style={{fontSize:'20px',letterSpacing:'1px'}}>PINNA3D.COM</b>
        <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
          <span style={{opacity:.6,fontSize:'14px'}}>Pricing</span>
          <span style={{background:'#fff',color:'#000',padding:'8px 18px',borderRadius:'20px',fontWeight:700,fontSize:'14px'}}>Login</span>
        </div>
      </header>

      <div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:'24px',padding:'40px',maxWidth:'1300px',margin:'0 auto'}}>

        {/* LEFT - TEXT */}
        <div>
          <div style={{background:'#1a1a2a',border:'1px solid #2a2a3a',padding:'6px 12px',borderRadius:'20px',display:'inline-block',fontSize:'12px',marginBottom:'16px'}}>⚡ 2D Image → 3D Model + Vector in 5 sec</div>
          <h1 style={{fontSize:'54px',lineHeight:'1',fontWeight:900,margin:0}}>Every Image to<br/>3D or Vector<br/>in 60 sec</h1>
          <p style={{opacity:.6,marginTop:'12px',fontSize:'15px'}}>Upload JPG/PNG → Get GLB for Blender + SVG for Illustrator. Built in Delhi.</p>
          <div style={{marginTop:'20px',display:'flex',gap:'10px'}}>
            <div style={{background:'#A020F0',padding:'12px 20px',borderRadius:'12px',fontWeight:700}}>Upload Image — Free</div>
            <div style={{border:'1px solid #333',padding:'12px 20px',borderRadius:'12px'}}>Watch Demo</div>
          </div>
          <div style={{marginTop:'24px',fontSize:'12px',opacity:.5}}>✓ Made in Delhi ✓ No Watermark ✓ Razorpay Ready</div>
        </div>

        {/* CENTER - DRAG & DROP - MONEY */}
        <div
          onDragOver={e=>e.preventDefault()}
          onDrop={onDrop}
          style={{border:'2px dashed #A020F0',borderRadius:'20px',background:'rgba(160,32,240,0.06)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px',minHeight:'360px',boxShadow:'0 0 40px rgba(160,32,240,0.15)'}}
        >
          {preview? <img src={preview} style={{maxHeight:'160px',borderRadius:'12px',marginBottom:'12px'}}/> : <div style={{fontSize:'48px'}}>📦</div>}
          <b style={{marginTop:'8px'}}>{file? file.name : 'Drop image here'}</b>
          <span style={{opacity:.6,fontSize:'13px',marginTop:'6px',textAlign:'center'}}>{loading? 'Generating 3D... 60 sec' : done? 'Ready! See viewer →' : 'JPG, PNG up to 10MB'}</span>
          <label style={{marginTop:'18px',background:'#fff',color:'#000',padding:'10px 20px',borderRadius:'10px',fontWeight:700,cursor:'pointer'}}>
            Browse File
            <input type="file" hidden accept="image/*" onChange={onDrop}/>
          </label>
          {loading && <div style={{marginTop:'14px',width:'100%',height:'4px',background:'#1a1a2a',borderRadius:'10px'}}><div style={{width:'60%',height:'100%',background:'#A020F0',animation:'load 3s infinite'}}></div></div>}
        </div>

        {/* RIGHT - 3D VIEWER */}
        <div style={{background:'#12121a',border:'1px solid #222',borderRadius:'20px',padding:'16px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',opacity:.6}}><span>Live 3D Preview</span><span>● GLB</span></div>
          <div style={{height:'240px',background:'radial-gradient(circle at 50% 50%, #1e1e32, #0A0A12)',borderRadius:'16px',marginTop:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            {done? <div style={{textAlign:'center'}}><div style={{fontSize:'48px',animation:'spin 4s linear infinite'}}>👟</div><div style={{fontSize:'12px',opacity:.6,marginTop:'8px'}}>360° Viewer</div></div> : <span style={{opacity:.3}}>Viewer appears after upload</span>}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginTop:'12px'}}>
            <button style={{background:'#A020F0',border:'none',color:'#fff',padding:'12px',borderRadius:'10px',fontWeight:700}}>Download GLB</button>
            <button style={{background:'#1a1a2a',border:'1px solid #333',color:'#fff',padding:'12px',borderRadius:'10px',fontWeight:700}}>Export SVG</button>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px',padding:'0 40px 40px',maxWidth:'1300px',margin:'0 auto'}}>
        {[
          {name:'Free ₹0',feat:'3 models',pop:false},
          {name:'Pro ₹999',feat:'100 models/mo',pop:true},
          {name:'Business ₹2499',feat:'Unlimited + API',pop:false},
        ].map(p=>(
          <div key={p.name} style={{background:p.pop?'#151525':'#111119',border:p.pop?'1px solid #A020F0':'1px solid #1e1e2a',borderRadius:'16px',padding:'20px',boxShadow:p.pop?'0 0 30px rgba(160,32,240,0.2)':''}}>
            <div style={{fontSize:'12px',opacity:.6}}>{p.pop? 'Most Popular' : 'Plan'}</div>
            <b style={{fontSize:'20px'}}>{p.name}</b>
            <div style={{marginTop:'8px',fontSize:'13px',opacity:.7}}>✓ {p.feat}</div>
          </div>
        ))}
      </div>
      <style>{`@keyframes spin{to{transform:rotateY(360deg)}} @keyframes load{0%{width:0}100%{width:100%}}`}</style>
    </div>
  )
}
