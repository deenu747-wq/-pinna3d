"use client"
import { useState, useRef } from "react"

export default function Dashboard(){
  const [preview,setPreview]=useState("")
  const [result,setResult]=useState<any>(null)
  const [loading,setLoading]=useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const onFile = async (e:any)=>{
    const f = e.target.files?.[0] || e.dataTransfer?.files?.[0]
    if(!f) return
    setPreview(URL.createObjectURL(f))
    setLoading(true)
    const fd = new FormData()
    fd.append("file", f)
    const r = await fetch("/api/vectorize", {method:"POST", body:fd})
    const j = await r.json()
    setResult(j)
    setLoading(false)
  }

  const download = (dataUrl:string, name:string)=>{
    const a = document.createElement("a")
    a.href = dataUrl
    a.download = name
    a.click()
  }

  return(
    <div style={{background:'#0A0814',minHeight:'100vh',color:'#fff',fontFamily:'Inter,system-ui',padding:'20px'}}>
      <header style={{display:'flex',justifyContent:'space-between',maxWidth:'1100px',margin:'0 auto 24px'}}>
        <a href="/"><img src="/logo.png" style={{height:'50px'}} alt="logo"/></a>
        <div style={{display:'flex',gap:'10px',alignItems:'center'}}><span style={{fontSize:'12px',color:'rgba(255,255,255,0.6)'}}>100 credits</span><div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#A020F0',display:'grid',placeItems:'center'}}>U</div></div>
      </header>

      <div style={{maxWidth:'1100px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
        <div onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'2px dashed rgba(160,32,240,0.6)',borderRadius:'16px',padding:'30px',textAlign:'center',cursor:'pointer',background:'#15131E',minHeight:'320px',display:'grid',placeItems:'center'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile}/>
          {!preview? <div><div style={{fontSize:'40px'}}>⬆️</div><b>Drop image</b><div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',marginTop:'6px'}}>PNG, JPG, WEBP, TIFF → SVG, EPS, AI, PDF, CDR + PNG</div></div> : <img src={preview} style={{maxWidth:'100%',maxHeight:'260px',borderRadius:'8px'}}/>}
        </div>

        <div style={{background:'#15131E',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'16px',padding:'20px',minHeight:'320px'}}>
          <div style={{fontSize:'13px',color:'rgba(255,255,255,0.6)',marginBottom:'10px'}}>Vector Output</div>
          {loading && <div style={{color:'#D6A5FF'}}>Vectorizing... potrace processing</div>}
          {result &&!loading && (
            <>
              <div style={{background:'#fff',borderRadius:'10px',padding:'10px',display:'grid',placeItems:'center',minHeight:'160px'}} dangerouslySetInnerHTML={{__html:result.svg}}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'14px'}}>
                <button onClick={()=>download(result.formats.svg,"vector.svg")} style={{background:'#A020F0',border:'none',padding:'10px',borderRadius:'8px',color:'#fff',fontWeight:600}}>Download SVG ★</button>
                <button onClick={()=>download(result.formats.png,"original.png")} style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.14)',padding:'10px',borderRadius:'8px',color:'#fff'}}>Download PNG Bonus</button>
                <button onClick={()=>download(result.formats.eps,"vector.eps")} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff'}}>EPS</button>
                <button onClick={()=>download(result.formats.ai,"vector.ai")} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff'}}>AI</button>
                <button onClick={()=>download(result.formats.pdf,"vector.pdf")} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff'}}>PDF</button>
                <button onClick={()=>download(result.formats.cdr,"vector.cdr")} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'10px',borderRadius:'8px',color:'#fff'}}>CDR</button>
              </div>
              <div style={{fontSize:'10px',color:'rgba(255,255,255,0.35)',marginTop:'10px'}}>INPUT: PNG/JPG/WEBP/TIFF → OUTPUT: SVG, EPS, AI, PDF, CDR + PNG Bonus</div>
            </>
          )}
          {!result &&!loading && <div style={{color:'rgba(255,255,255,0.35)',fontSize:'13px'}}>Upload an image to see vector preview</div>}
        </div>
      </div>
    </div>
  )
}
