"use client"
import { useState, useRef } from "react"
export default function Page(){
  const [preview,setPreview]=useState("")
  const [output,setOutput]=useState("")
  const [done,setDone]=useState(false)
  const fileRef=useRef<any>(null)

  const onFile=(e:any)=>{
    const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]
    if(!f)return
    setPreview(URL.createObjectURL(f))
    // TEMP: simulate transparent - will replace with real removal after build fixed
    setOutput(URL.createObjectURL(f))
    setDone(true)
  }

  const checker={
    backgroundColor:'#15131E',
    backgroundImage:`linear-gradient(45deg, #2a2a2a 25%, transparent 25%), linear-gradient(-45deg, #2a2a2a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2a2a 75%), linear-gradient(-45deg, transparent 75%, #2a2a2a 75%)`,
    backgroundSize:'20px 20px'
  } as any

  return(
    <div style={{minHeight:'100vh',background:'#0A0814',color:'#fff',padding:20}}>
      <h2>Pinna3D - UI Test (Ready)</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,maxWidth:900,marginTop:20}}>
        <div style={{aspectRatio:'1/1',border:'3px dashed #A020F0',borderRadius:16,display:'grid',placeItems:'center',cursor:'pointer'}} onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
          {preview?<img src={preview} style={{width:'100%',height:'100%',objectFit:'contain'}}/>:<span>Drop shoe</span>}
        </div>
        <div style={{aspectRatio:'1/1',borderRadius:16,padding:12,display:'flex',flexDirection:'column',...done?checker:{background:'#222'}}}>
          {done&&output?<img src={output} style={{maxWidth:'90%',maxHeight:'90%'}}/>:<span>Output</span>}
        </div>
      </div>
      <p style={{marginTop:20,opacity:0.5}}>This version builds GREEN - send me build log error so I fix real remover</p>
    </div>
  )
}
