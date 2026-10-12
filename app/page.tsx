"use client"
import { useState, useRef } from "react"

export default function Page(){
  const [preview,setPreview]=useState("")
  const [output,setOutput]=useState("")
  const [done,setDone]=useState(false)
  const [loading,setLoading]=useState(false)
  const [status,setStatus]=useState("")
  const fileRef=useRef<HTMLInputElement>(null)

  const checker = {
    backgroundColor:'#1a1a1a',
    backgroundImage:`linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)`,
    backgroundSize:'20px 20px',
    backgroundPosition:'0 0, 0 10px, 10px -10px, -10px 0px'
  } as const

  const dark = {
    background:'#0A0814',
    backgroundImage:'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
    backgroundSize:'16px 16px'
  } as const

  const onFile = async (e:any)=>{
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    const url = URL.createObjectURL(f)
    setPreview(url)
    setDone(false)
    setOutput("")
    setLoading(true)
    setStatus("Loading AI model...")
    try{
      const { removeBackground } = await import("@imgly/background-removal")
      setStatus("Removing background...")
      const blob = await removeBackground(f)
      setOutput(URL.createObjectURL(blob))
      setDone(true)
      setStatus("Done - Transparent ready!")
    }catch(err:any){
      setStatus("Error: "+err.message)
    }
    setLoading(false)
  }

  return(
    <div style={{background:'#0A0814',minHeight:'100vh',color:'#fff',padding:'20px',fontFamily:'Inter'}}>
      <h1 style={{fontSize:'28px',fontWeight:700}}>Remove BG <span style={{color:'#A020F0'}}>Transparent</span></h1>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginTop:'20px',maxWidth:'900px'}}>
        <div style={{aspectRatio:'1/1',border:'3px dashed #A020F0',borderRadius:'16px',display:'grid',placeItems:'center',cursor:'pointer',overflow:'hidden',background:'#0F0D1C'}} onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
          {preview? <img src={preview} style={{width:'100%',height:'100%',objectFit:'contain'}} alt="preview"/> : <div style={{textAlign:'center'}}>Drop image<br/>or click</div>}
        </div>
        <div style={{aspectRatio:'1/1',borderRadius:'16px',display:'flex',flexDirection:'column',padding:'12px',background:'#15131E',border:'1px solid rgba(255,255,255,0.1)'}}>
          <div style={{fontSize:'12px',opacity:0.6}}>{loading?status:done?"✓ Checker = Transparent":"Preview"}</div>
          <div style={{flex:1,marginTop:'10px',borderRadius:'12px',display:'grid',placeItems:'center',...(done&&output?checker:dark)}}>
            {loading?<div style={{background:'rgba(0,0,0,0.6)',padding:'8px 12px',borderRadius:'8px',fontSize:'12px'}}>{status}</div>:done&&output?<img src={output} style={{maxWidth:'90%',maxHeight:'90%',objectFit:'contain'}} alt="result"/>:<div style={{opacity:0.5,fontSize:'12px',textAlign:'center'}}>Upload to see transparent</div>}
          </div>
          {done&&<button onClick={()=>{const a=document.createElement('a');a.href=output;a.download='transparent.png';a.click()}} style={{marginTop:'10px',background:'#A020F0',border:'none',padding:'10px',borderRadius:'8px',color:'#fff',cursor:'pointer'}}>Download PNG</button>}
        </div>
      </div>
    </div>
  )
}
