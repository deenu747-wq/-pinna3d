"use client"
import { useState, useRef } from "react"

export default function PhotoStudioPage(){
  const [preview,setPreview]=useState("")
  const fileRef=useRef<HTMLInputElement>(null)
  const onFile=(e:any)=>{
    const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]
    if(!f) return
    setPreview(URL.createObjectURL(f))
  }

  return (
    <div className="min-h-screen bg-[#09090F] text-white" style={{fontFamily:'Geist, Inter, sans-serif'}}>
      {/* HEADER - Same as your homepage premium */}
      <header className="sticky top-0 z-50 bg-[#09090F]/80 backdrop-blur border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
          <div className="font-extrabold text-[20px]">◆ pinna3d.com</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-[13px]">Sign In</button>
            <button className="px-4 py-2 rounded-full bg-[#A020F0] text-[13px]">Get Started</button>
          </div>
        </div>
      </header>

      {/* HERO - USING YOUR IMAGE DESIGN */}
      <section className="max-w-7xl mx-auto px-6 pt-6">
        <div className="rounded-[24px] overflow-hidden border border-white/[0.06] bg-[#0F0A1E]">
          <img src="/studios/photo-studio-hero.png" className="w-full h-auto object-cover" alt="Photo Studio" />
        </div>

        {/* Tool Area Below Hero - Same Homepage Drag & Drop Style */}
        <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <div onDragOver={e=>e.preventDefault()} onDrop={onFile} onClick={()=>fileRef.current?.click()}
               className="rounded-[20px] border-2 border-dashed border-[#A020F0]/40 bg-[#15151F] min-h-[360px] flex flex-col items-center justify-center cursor-pointer">
            <p className="text-[14px] font-semibold">Drag & drop photo here — studio in 1 sec</p>
            <p className="text-[11px] text-white/30 mt-1">Same premium UI as homepage</p>
            <input ref={fileRef} type="file" hidden onChange={onFile} />
            {preview && <img src={preview} className="mt-4 h-24 rounded-lg" />}
          </div>
          <div className="rounded-[20px] bg-[#15151F] border border-white/[0.06] p-4">
            <p className="text-[11px] text-white/30">PREVIEW</p>
            <div className="mt-2 h-[260px] rounded-xl bg-[#09090F] flex items-center justify-center">
              {preview? <img src={preview} className="h-full object-contain" /> : <span className="text-white/20 text-xs">No image</span>}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
