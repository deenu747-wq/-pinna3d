"use client"
import { useState, useRef } from "react"

export default function Page(){
  const [preview,setPreview]=useState("")
  const [output,setOutput]=useState("")
  const [log,setLog]=useState("Ready - drop image")
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
    const url=URL.createObjectURL(f)
    setPreview(url)
    setLog("Loading AI model from CDN... (20MB first time, wait 15-20 sec)")
    setDone(false)
    try{
      // WORKING CDN - esm.run bundles onnx correctly
      // @ts-ignore
      const mod = await import(/* webpackIgnore: true */ "https://esm.run/@imgly/background-removal@1.4.0")
      setLog("Model loaded, removing background...")
      const blob = await mod.removeBackground(f, {
        progress: (k:string, c:number, t:number)=> setLog(`${k} ${Math.round(c/t*100)}%`)
      })
      setOutput(URL.createObjectURL(blob))
      setDone(true)
      setLog("✓ DONE - Checker = transparent proof")
    }catch(err:any){
      console.error(err)
      setLog("ERROR: "+ (err?.message || err) + " - Check console F12")
    }
  }

  return(
    <div style={{minHeight:'100vh',background:'#0A0814',color:'#fff',padding:20,fontFamily:'system-ui'}}>
      <h2 style={{color:'#A020F0',margin:0}}>Pinna3D - Transparent Proof ✓</h2>
      <div style={{background:'#222',padding:8,borderRadius:6,marginTop:10,fontSize:11,fontFamily:'monospace',whiteSpace:'pre-wrap'}}>{log}</div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,maxWidth:900,marginTop:20}}>
        <div style={{aspectRatio:'1/1',border:'3px dashed #A020F0',borderRadius:16,display:'grid',placeItems:'center',cursor:'pointer',overflow:'hidden'}} onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
          {preview? <img src={preview} style={{width:'100%',height:'100%',objectFit:'contain'}}/> : <div style={{textAlign:'center'}}>Drop shoe here<br/><span style={{fontSize:12,opacity:0.5}}>or click</span></div>}
        </div>

        <div style={{aspectRatio:'1/1',borderRadius:16,padding:12,display:'flex',flexDirection:'column',background:'#15131E',border:done?'2px solid #00FF88':'1px solid #333'}}>
          <div style={{fontSize:12,opacity:0.7}}>{done?"✓ Transparent":"Output"}</div>
          <div style={{flex:1,marginTop:10,borderRadius:12,display:'grid',placeItems:'center',overflow:'hidden',...(done?checker:{background:'#000'})}}>
            {output? <img src={output} style={{maxWidth:'95%',maxHeight:'95%'}}/> : <span style={{opacity:0.4,fontSize:13}}>{preview?"Waiting for AI...":"Result"}</span>}
          </div>
          {done && output && <button onClick={()=>{const a=document.createElement('a');a.href=output;a.download='shoe-transparent.png';a.click()}} style={{marginTop:10,background:'#A020F0',padding:12,borderRadius:8,border:'none',color:'#fff',fontWeight:700,cursor:'pointer'}}>Download PNG</button>}
        </div>
      </div>
    </div>
  )
}
