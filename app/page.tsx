"use client"
import { useState, useRef } from "react"

export default function Page(){
  const [preview,setPreview]=useState("")
  const [output,setOutput]=useState("")
  const [loading,setLoading]=useState(false)
  const [done,setDone]=useState(false)
  const fileRef=useRef<HTMLInputElement>(null)

  const checker = {
    backgroundColor: '#15131E',
    backgroundImage: `linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)`,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  } as any

  const onFile = async (e:any)=>{
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    setPreview(URL.createObjectURL(f))
    setLoading(true)
    setDone(false)
    try{
      const { removeBackground } = await import("@imgly/background-removal")
      const blob = await removeBackground(f)
      setOutput(URL.createObjectURL(blob))
      setDone(true)
    }catch(err:any){
      alert("Failed: "+err.message)
    }
    setLoading(false)
  }

  return(
    <div style={{minHeight:'100vh',background:'#0A0814',color:'#fff',padding:20,fontFamily:'sans-serif'}}>
      <h2 style={{color:'#A020F0'}}>Pinna3D - Transparent Proof</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,maxWidth:900,marginTop:20}}>
        {/* Input */}
        <div style={{aspectRatio:'1/1',border:'3px dashed #A020F0',borderRadius:16,display:'grid',placeItems:'center',cursor:'pointer',overflow:'hidden'}} onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
          {preview? <img src={preview} style={{width:'100%',height:'100%',objectFit:'contain'}}/> : <div>Drop shoe here / Click</div>}
        </div>
        {/* Output - Checker = Proof */}
        <div style={{aspectRatio:'1/1',borderRadius:16,background:'#15131E',padding:12,display:'flex',flexDirection:'column',border:done?'2px solid #00FF88':''}}>
          <div style={{fontSize:12,opacity:0.7}}>{loading? "Removing background..." : done? "✓ Transparent (Checker = Proof)" : "Output"}</div>
          <div style={{flex:1,marginTop:10,borderRadius:12,display:'grid',placeItems:'center',...done?checker:{background:'#000'}}}>
            {done && output? <img src={output} style={{maxWidth:'90%',maxHeight:'90%',filter:'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'}}/> : <span style={{opacity:0.4}}>{loading?"Processing...":"Upload to see result"}</span>}
          </div>
          {done && <button onClick={()=>{const a=document.createElement('a');a.href=output;a.download='shoe-transparent.png';a.click()}} style={{marginTop:10,background:'#A020F0',padding:'10px',borderRadius:8,border:'none',color:'#fff',cursor:'pointer',fontWeight:600}}>Download PNG (Transparent)</button>}
        </div>
      </div>
      <p style={{marginTop:20,fontSize:12,opacity:0.5}}>If second box shows checker behind shoe = 100% transparent background</p>
    </div>
  )
}
