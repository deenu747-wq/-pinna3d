"use client"
import { useState, useRef } from "react"

export default function PhotoStudioPage(){
  const [preview,setPreview]=useState("")
  const [hex,setHex]=useState("#A020F0")
  const [tool,setTool]=useState("Remove BG")
  const fileRef=useRef<HTMLInputElement>(null)

  const onFile=(e:any)=>{
    const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0]
    if(!f) return
    setPreview(URL.createObjectURL(f))
  }

  return (
    <div className="min-h-screen bg-[#09090F] text-white" style={{fontFamily:'Geist, Inter, sans-serif'}}>
      {/* SAME HEADER + TABS AS YOUR HOMEPAGE SCREENSHOT */}
      <header className="sticky top-0 z-50 bg-[#09090F]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[20px] font-extrabold tracking-tight">
            <span className="w-7 h-7 rounded-lg bg-[#A020F0] flex items-center justify-center">◆</span> pinna3d<span className="font-normal text-white/40">.com</span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-[13px] text-white/60 font-medium">
            <span>Features</span><span className="text-white">Pricing</span><span>Docs</span><span>Blog</span>
            <button className="ml-2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/10 text-white text-[13px]">Sign In</button>
            <button className="px-4 py-2 rounded-full bg-[#A020F0] text-white text-[13px] shadow-[0_0_20px_rgba(160,32,240,0.4)]">Get Started</button>
          </div>
        </div>
        {/* SAME TAB BAR AS HOMEPAGE */}
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto scrollbar-none">
          {["Image to 3D","Multi-image to 3D","Text to 3D","Text to Texture","Template Studio ★ NEW","Image to Vector ★ NEW","Background Remover ★ NEW"].map((t,i)=>(
            <button key={t} className={`px-4 py-2 rounded-full text-[12px] font-medium border whitespace-nowrap ${i===6? 'bg-[#A020F0] border-[#A020F0] text-white shadow-[0_0_12px_rgba(160,32,240,0.3)]' : 'bg-[#1A1A22] border-white/[0.08] text-white/60 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* HERO - SAME LAYOUT AS HOMEPAGE */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
        <div>
          <h1 className="text-[48px] md:text-[56px] font-black leading-[0.95] tracking-[-0.03em]">
            Every photo<br/>to <span className="text-[#A020F0]">studio</span><br/>in 1 sec.
          </h1>
          <p className="mt-4 text-[14px] text-white/50 leading-relaxed max-w-md">Your Shopify photos, studio-ready in 1 sec. Same drag & drop UI, same premium font, full clarity service.</p>

          <div className="mt-6 flex gap-3">
            <button className="px-5 py-3 rounded-full bg-[#A020F0] text-[13px] font-semibold shadow-[0_0_20px_rgba(160,32,240,0.4)]">✦ Start Creating — Free</button>
            <button className="px-5 py-3 rounded-full bg-white/[0.06] border border-white/10 text-[13px]">▶ Watch Demo</button>
          </div>

          {/* INTERNAL TOOLS - SAME PILL STYLE */}
          <div className="mt-10 flex gap-2 p-1 bg-[#15151F] border border-white/[0.06] rounded-full w-fit">
            {["Remove BG","Enhance","AI Backgrounds","Upscaler"].map(t=>(
              <button key={t} onClick={()=>setTool(t)} className={`px-5 py-2 rounded-full text-[12px] font-medium transition ${tool===t? 'bg-[#A020F0] text-white' : 'text-white/50 hover:text-white'}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* DRAG BOX - EXACT SAME UI AS HOMEPAGE SCREENSHOT */}
        <div className="grid grid-cols-[1.3fr_0.7fr] gap-4 h-fit">
          <div onDragOver={e=>e.preventDefault()} onDrop={onFile} onClick={()=>fileRef.current?.click()}
               className="rounded-[20px] border-2 border-dashed border-[#A020F0]/40 bg-[#15151F] flex flex-col items-center justify-center p-8 cursor-pointer min-h-[300px]">
            <div className="w-12 h-12 rounded-xl bg-[#A020F0]/20 border border-[#A020F0]/30 flex items-center justify-center mb-4 text-[#A020F0]">⬆</div>
            <p className="text-[13px] font-semibold">Drag & drop your image here</p>
            <p className="text-[11px] text-white/30 mt-1">or browse files to upload</p>
            <div className="mt-3 px-3 py-1 rounded-full bg-[#A020F0]/10 border border-[#A020F0]/20 text-[10px] text-[#A020F0]">PNG, JPG, WEBP, TIFF — SVG, EPS, AI + PNG Bonus</div>
            <input ref={fileRef} type="file" hidden onChange={onFile} />
          </div>
          <div className="rounded-[20px] bg-[#15151F] border border-white/[0.06] p-3">
            <p className="text-[10px] text-white/30 tracking-widest mb-2">PREVIEW</p>
            <div className="rounded-xl bg-[#09090F] border border-white/[0.04] h-[220px] flex items-center justify-center overflow-hidden">
              {preview? <img src={preview} className="w-full h-full object-contain" /> : <span className="text-[11px] text-white/20">No image</span>}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="py-2 rounded-full bg-white/[0.06] border border-white/10 text-[11px]">Download</button>
              <button className="py-2 rounded-full bg-[#A020F0] text-[11px] font-medium">Export</button>
            </div>
          </div>
        </div>
      </section>

      {/* UPGRADED COLOR PICKER - SAME THEME + YOUR LOGO-SHAPE + SLIDERS + EDITABLE */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="rounded-[20px] bg-[#15151F] border border-white/[0.06] p-6">
          <p className="text-[13px] font-semibold">Why designers choose Photo Studio</p>
          <p className="text-[12px] text-white/40 mt-2">Full clarity service — same theme, same font, same UI as homepage.</p>
        </div>

        <div className="rounded-[20px] bg-[#15151F] border border-white/[0.06] p-5">
          <h4 className="text-[13px] font-bold">Logo-Shape Palette</h4>
          <p className="text-[11px] text-white/40 mb-4">Honeycomb inside Pinna logo + sliders + editable HEX/RGB/HSL</p>

          <div className="bg-[#09090F] rounded-xl border border-white/[0.06] p-4 flex justify-center">
            <div className="grid grid-cols-6 gap-2">
              {["#A020F0","#8A2BE2","#3B82F6","#00D4AA","#FFD700","#FF3B82","#FFF","#000","#10B981","#F59E0B","#EF4444","#06B6D4"].map(c=>(
                <button key={c} onClick={()=>setHex(c)} className="w-8 h-8 rounded-lg border border-white/10 hover:scale-110 transition" style={{background:c}} />
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div><label className="text-[10px] text-white/30">HUE</label><input type="range" className="w-full accent-[#A020F0]" /></div>
            <div><label className="text-[10px] text-white/30">LIGHTNESS</label><input type="range" className="w-full accent-[#A020F0]" /></div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex gap-2 text-[11px]"><span className="w-8 text-white/30 py-2">HEX</span><input value={hex} onChange={e=>setHex(e.target.value)} className="flex-1 bg-[#09090F] border border-white/10 rounded-full px-3 py-2 outline-none focus:border-[#A020F0]" /></div>
            <div className="flex gap-2 text-[11px]"><span className="w-8 text-white/30 py-2">RGB</span><input placeholder="160, 32, 240" className="flex-1 bg-[#09090F] border border-white/10 rounded-full px-3 py-2 outline-none" /></div>
            <div className="flex gap-2 text-[11px]"><span className="w-8 text-white/30 py-2">HSL</span><input placeholder="277, 87%, 53%" className="flex-1 bg-[#09090F] border border-white/10 rounded-full px-3 py-2 outline-none" /></div>
          </div>
        </div>
      </section>
    </div>
  )
}
