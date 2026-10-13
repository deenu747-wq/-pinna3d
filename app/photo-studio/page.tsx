"use client"
import { useState, useRef } from "react"

export default function PhotoStudioPage(){
  const [preview,setPreview]=useState("")
  const [done,setDone]=useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [activeTool,setActiveTool]=useState("Remove BG")
  const [hex,setHex]=useState("#A020F0")

  const onFile = (e:any)=>{
    const f=e.dataTransfer?.files?.[0]||e.target?.files?.[0];
    if(!f) return;
    setPreview(URL.createObjectURL(f));
    setDone(false);
    setTimeout(()=>setDone(true),1000)
  }

  return (
    <div className="min-h-screen bg-[#0E0A1A] text-white">
      {/* ===== SAME HEADER AS HOMEPAGE - DO NOT CHANGE HOMEPAGE FILE ===== */}
      {/* Your homepage already has this header in app/page.tsx,
          this is just for photo-studio page to look same */}
      <header className="sticky top-0 z-50 bg-[#0E0A1A]/80 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-[#A020F0]">◆</span> Pinna3d<span className="text-[#A020F0] text-sm">.com</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <span>Features</span><span className="text-[#A020F0]">Pricing</span><span>Docs</span><span>Blog</span>
            <button className="px-4 py-2 rounded-xl bg-white/[0.08] border border-white/10">Sign In</button>
            <button className="px-4 py-2 rounded-xl bg-[#A020F0] text-white">Get Started</button>
          </div>
        </div>
        {/* SAME TAB BAR AS HOMEPAGE SCREENSHOT */}
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto">
          {[
            "Image to 3D",
            "Multi-image to 3D",
            "Text to 3D",
            "Text to Texture",
            "Template Studio ★ NEW",
            "Image to Vector ★ NEW",
            "Background Remover ★ NEW"
          ].map((t,i)=>(
            <button key={t} className={`px-4 py-2 rounded-full text-xs whitespace-nowrap border ${i===6? 'bg-[#A020F0] border-[#A020F0] text-white' : 'bg-white/[0.06] border-white/10 text-white/70'}`}>
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* ===== PHOTO STUDIO HERO - SAME PREMIUM LOOK ===== */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-[1.1fr_0.9fr] gap-6">
        <div>
          <h1 className="text-5xl font-bold leading-[1.1]">Every photo to<br/>studio in <span className="text-[#A020F0]">1 sec</span></h1>
          <p className="mt-3 text-white/60 text-sm">Your Shopify photos, studio-ready in 1 sec. Full clarity service.</p>
          <div className="mt-6 flex gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-[#A020F0] text-sm font-medium">✦ Start Creating — Free</button>
            <button className="px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-sm">▶ Watch Demo</button>
          </div>

          {/* PHOTO STUDIO INTERNAL TABS - Same style as homepage tabs */}
          <div className="mt-8 flex gap-2 p-1 bg-white/[0.04] border border-white/10 rounded-2xl w-fit">
            {["Remove BG","Enhance","AI Backgrounds","Upscaler"].map(tool=>(
              <button key={tool} onClick={()=>setActiveTool(tool)} className={`px-4 py-2 rounded-xl text-xs font-medium ${activeTool===tool? 'bg-[#A020F0] text-white' : 'text-white/60'}`}>{tool}</button>
            ))}
          </div>
        </div>

        {/* SAME DRAG & DROP BOX AS HOMEPAGE */}
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
          <div onDragOver={e=>e.preventDefault()} onDrop={onFile}
               className="rounded-2xl border-2 border-dashed border-[#A020F0]/40 bg-[#1A1230] flex flex-col items-center justify-center p-8 cursor-pointer"
               onClick={()=>fileRef.current?.click()}>
            <div className="w-12 h-12 rounded-xl bg-[#A020F0]/20 flex items-center justify-center mb-3">📁</div>
            <p className="text-sm font-medium">Drag & drop your image here</p>
            <p className="text-xs text-white/40 mt-1">or browse files to upload</p>
            <p className="text-[10px] text-white/30 mt-2">PNG, JPG, WEBP, TIFF — SVG, EPS, AI, PDF, CDR + PNG Bonus</p>
            <input ref={fileRef} type="file" hidden onChange={onFile} />
            {preview && <img src={preview} className="mt-4 h-20 rounded-lg object-contain" />}
          </div>
          <div className="rounded-2xl bg-[#1A1230] border border-white/10 p-3">
            <p className="text-[10px] text-white/40 mb-2">Preview</p>
            <div className="rounded-xl bg-[#0E0A1A] h-[200px] flex items-center justify-center text-white/20 text-xs">
              {preview? <img src={preview} className="h-full w-full object-contain rounded-xl" /> : "No image"}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="py-2 rounded-xl bg-white/[0.06] border border-white/10 text-[11px]">Download</button>
              <button className="py-2 rounded-xl bg-[#A020F0] text-[11px]">Export</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== UPGRADED LOGO-SHAPE COLOR PICKER + SLIDERS + EDITABLE HEX/RGB/HSL ===== */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="rounded-2xl bg-[#15102A] border border-white/10 p-6">
          <h3 className="text-sm font-semibold">Why designers choose Photo Studio</h3>
          <p className="text-xs text-white/50 mt-2">Full clarity: Remove BG, Enhance, AI Backgrounds, Upscaler — built for creators worldwide.</p>
        </div>

        <div className="rounded-2xl bg-[#15102A] border border-white/10 p-5">
          <h4 className="text-sm font-semibold mb-1">Logo-Shape Palette</h4>
          <p className="text-[11px] text-white/40 mb-3">Honeycomb inside Pinna logo + sliders + editable codes</p>

          <div className="bg-[#0E0A1A] rounded-xl border border-white/10 p-4 flex justify-center">
            <div className="grid grid-cols-6 gap-2">
              {["#A020F0","#8A2BE2","#3B82F6","#00D4AA","#FFD700","#FF3B82","#FFFFFF","#000000","#10B981","#F59E0B","#EF4444","#06B6D4"].map(c=>(
                <button key={c} onClick={()=>setHex(c)} className="w-8 h-8 rounded-lg border border-white/10" style={{background:c}} />
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div><label className="text-[11px] text-white/40">Hue</label><input type="range" className="w-full accent-[#A020F0]" /></div>
            <div><label className="text-[11px] text-white/40">Lightness</label><input type="range" className="w-full accent-[#A020F0]" /></div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex gap-2 items-center text-xs"><span className="w-8 text-white/40">HEX</span><input value={hex} onChange={e=>setHex(e.target.value)} className="flex-1 bg-[#0E0A1A] border border-white/10 rounded-lg px-3 py-2 text-xs" /></div>
            <div className="flex gap-2 items-center text-xs"><span className="w-8 text-white/40">RGB</span><input placeholder="160, 32, 240" className="flex-1 bg-[#0E0A1A] border border-white/10 rounded-lg px-3 py-2 text-xs" /></div>
            <div className="flex gap-2 items-center text-xs"><span className="w-8 text-white/40">HSL</span><input placeholder="277, 87%, 53%" className="flex-1 bg-[#0E0A1A] border border-white/10 rounded-lg px-3 py-2 text-xs" /></div>
          </div>
        </div>
      </section>
    </div>
  )
}
