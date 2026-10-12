"use client"
import { useState, useRef } from "react"

export default function Page(){
  const [preview,setPreview]=useState("")
  const [output,setOutput]=useState("")
  const [loading,setLoading]=useState(false)
  const [done,setDone]=useState(false)
  const fileRef=useRef<any>(null)

  const checker={
    backgroundColor:'#1a1a1a',
    backgroundImage:`linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)`,
    backgroundSize:'20px 20px',
    backgroundPosition:'0 0, 0 10px, 10px -10px, -10px 0px'
  } as any

  const onFile=async(e:any)=>{
    const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]
    if(!f)return
    setPreview(URL.createObjectURL(f))
    setLoading(true)
    setDone(false)
    try{
      const mod=await import("@imgly/background-removal")
      const blob=await mod.removeBackground(f, { debug:false, model:'small', output:{ format:'image/png' } } as any)
      setOutput(URL.createObjectURL(blob))
      setDone(true)
    }catch(err:any){
      console.error(err)
      alert("BG Error: "+err.message)
    }
    setLoading(false)
  }

  return(
    <div style={{minHeight:'100vh',background:'#0A0814',color:'#fff',padding:20,fontFamily:'sans-serif'}}>
      <h2 style={{color:'#A020F0'}}>Pinna3D - Transparent Proof ✓</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,maxWidth:900,marginTop:20}}>
        <div style={{aspectRatio:'1/1',border:'3px dashed #A020F0',borderRadius:16,display:'grid',placeItems:'center',cursor:'pointer',overflow:'hidden'}} onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
          {preview?<img src={preview} style={{width:'100%',height:'100%',objectFit:'contain'}}/>:<div>Drop shoe / Click</div>}
        </div>
        <div style={{aspectRatio:'1/1',borderRadius:16,padding:12,display:'flex',flexDirection:'column',background:'#15131E',border:done?'2px solid #00FF88':'1px solid #333'}}>
          <div style={{fontSize:12,opacity:0.7}}>{loading?"Removing...":done?"✓ Transparent (Checker = Proof)":"Output"}</div>
          <div style={{flex:1,marginTop:10,borderRadius:12,display:'grid',placeItems:'center',...done?checker:{background:'#000'}}}>
            {done&&output?<img src={output} style={{maxWidth:'90%',maxHeight:'90%'}}/>:<span style={{opacity:0.4}}>{loading?"Processing...":"Result here"}</span>}
          </div>
          {done&&<button onClick={()=>{const a=document.createElement('a');a.href=output;a.download='shoe-transparent.png';a.click()}} style={{marginTop:10,background:'#A020F0',padding:10,borderRadius:8,border:'none',color:'#fff',fontWeight:700,cursor:'pointer'}}>Download Transparent PNG</button>}
        </div>
      </div>
    </div>
  )
}
