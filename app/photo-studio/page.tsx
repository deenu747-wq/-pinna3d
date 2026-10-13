// FILE: app/photo-studio/page.tsx
// Photo Studio - Dark background like your hero reference + Canva font + Logo-shape color picker

"use client"
import { useState } from 'react'

export default function PhotoStudioPage() {
  const [hex, setHex] = useState("#A020F0")
  const [activeTab, setActiveTab] = useState("Remove BG")

  return (
    <div className="min-h-screen bg-[#0A0E1F] text-white" style={{ fontFamily: 'Plus Jakarta Sans, Instrument Sans, sans-serif' }}>
      {/* ===== LOCKED HEADER - Same as Homepage ===== */}
      <header className="border-b border-white/10 sticky top-0 z-50 bg-[#0A0E1F]/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="font-bold text-xl">pinna3d</div>
            <nav className="hidden md:flex gap-6 text-sm text-white/70">
              <span className="hover:text-white cursor-pointer">Features</span>
              <span className="hover:text-white cursor-pointer">Pricing</span>
              <span className="hover:text-white cursor-pointer">Docs</span>
              <span className="hover:text-white cursor-pointer">Blog</span>
            </nav>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm rounded-lg bg-white/10">Log in</button>
            <button className="px-4 py-2 text-sm rounded-lg bg-[#A020F0] text-white">Get Started</button>
          </div>
        </div>
        {/* Tab Bar */}
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto text-sm">
          {["Photo Studio","Vector Studio","3D Studio","Motion Studio","Mockup Studio","Template Maker"].map((t,i)=>(
            <button key={t} className={`px-4 py-2 rounded-full whitespace-nowrap ${i===0? 'bg-[#A020F0] text-white' : 'bg-white/10 text-white/70'}`}>{t}</button>
          ))}
        </div>
      </header>

      {/* ===== HERO - Dark background with purple glow like your reference image ===== */}
      <section className="relative overflow-hidden max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Glow Effects - like your hero images */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#3B82F6]/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-[#A020F0]/30 rounded-full blur-[120px]"></div>

        {/* Left Content - Canva Style Font */}
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Every photo<br/>
            to <span className="text-[#A020F0]">studio</span> in<br/>
            1 sec.
          </h1>
          <p className="mt-4 text-white/60 text-lg">Professional photo editing suite for designers.</p>

          {/* Line-art icons - Edit / Enhance / Filter / Transform */}
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm">
            {[
              {k:"Edit", d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"},
              {k:"Enhance", d:"M12 2L2 7l10 5 10-5-10-5z"},
              {k:"Filter", d:"M22 3H2l8 9.46V19l4 2v-8.46L22 3z"},
              {k:"Transform", d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"},
            ].map(item=>(
              <div key={item.k} className="flex items-center gap-3 bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={item.d}/></svg>
                <span className="text-sm font-medium">{item.k}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <button className="px-6 py-3 bg-[#A020F0] rounded-xl font-medium">Explore tools</button>
            <button className="px-6 py-3 bg-white/10 rounded-xl font-medium">See Examples</button>
          </div>
        </div>

        {/* Right Graphic - Placeholder for your girl image */}
        <div className="relative z-10 bg-gradient-to-br from-[#1A1F3A] to-[#0A0E1F] border border-white/10 rounded-[24px] p-6 h-[480px] flex items-center justify-center">
          <div className="text-center text-white/40">
            <div className="w-64 h-64 mx-auto rounded-2xl bg-[#A020F0]/20 border border-[#A020F0]/30 flex items-center justify-center mb-4">
              Upload /public/studios/photo-hero.png here
            </div>
            <p className="text-sm">Photo Studio Hero Graphic<br/>Woman + Filter Filmstrip (from your reference)</p>
          </div>
        </div>
      </section>

      {/* ===== STUDIO TABS ===== */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-2 p-2 bg-white/[0.06] border border-white/10 rounded-2xl w-fit">
          {["Remove BG","Enhance","AI Backgrounds","Upscaler","Banner"].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab===tab? 'bg-[#A020F0] text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>{tab}</button>
          ))}
        </div>
      </div>

      {/* ===== TOOL UI + LOGO-SHAPE COLOR PICKER WITH SLIDERS + EDITABLE CODES ===== */}
      <section className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        {/* Tool */}
        <div className="bg-[#12162D] border border-white/10 rounded-2xl p-8">
          <div className="border-2 border-dashed border-white/20 rounded-2xl h-[380px] flex flex-col items-center justify-center gap-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.5" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <p className="text-white/70 font-medium">Drop image here or click to upload</p>
            <p className="text-white/40 text-sm">PNG, JPG up to 20MB</p>
          </div>
        </div>

        {/* UPGRADED COLOR PICKER - Logo shape + Sliders + Editable codes */}
        <div className="bg-[#12162D] border border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold mb-1">Logo-Shape Color Palette</h3>
          <p className="text-white/50 text-xs mb-4">Honeycomb inside Pinna logo + sliders + editable codes</p>

          {/* Logo Shape Palette */}
          <div className="relative bg-[#0A0E1F] rounded-xl p-4 border border-white/10 flex items-center justify-center h-[180px]"
               style={{ clipPath: 'polygon(50% 0%, 90% 20%, 90% 80%, 50% 100%, 10% 80%, 10% 20%)' }}>
            <div className="grid grid-cols-8 gap-1.5">
              {["#A020F0","#8A2BE2","#3B82F6","#00D4AA","#FFD700","#FF6B2D","#FF3B82","#FFFFFF",
                "#7C3AED","#6366F1","#06B6D4","#10B981","#F59E0B","#EF4444","#EC4899","#000000"].map(c=>(
                <button key={c} onClick={()=>setHex(c)} className="w-7 h-7 rounded-[6px] border border-white/20 hover:scale-110 transition" style={{background:c}}></button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="mt-5 space-y-3">
            <div>
              <label className="text-xs text-white/50">Hue</label>
              <input type="range" className="w-full accent-[#A020F0]" />
            </div>
            <div>
              <label className="text-xs text-white/50">Lightness</label>
              <input type="range" className="w-full accent-[#A020F0]" />
            </div>
          </div>

          {/* Editable Codes + New/Current like your reference image */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-[#0A0E1F] border border-white/10 rounded-lg p-2">
              <div className="text-[10px] text-white/40">Current</div>
              <div className="w-full h-6 rounded mt-1" style={{background:hex}}></div>
            </div>
            <div className="bg-[#0A0E1F] border border-white/10 rounded-lg p-2">
              <div className="text-[10px] text-white/40">New</div>
              <div className="w-full h-6 rounded mt-1 bg-white"></div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-white/40 w-10">HEX</span>
              <input value={hex} onChange={e=>setHex(e.target.value)} className="flex-1 bg-[#0A0E1F] border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-[#A020F0]" />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-white/40 w-10">RGB</span>
              <input placeholder="160, 32, 240" className="flex-1 bg-[#0A0E1F] border border-white/10 rounded-lg px-3 py-2 outline-none" />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-white/40 w-10">HSL</span>
              <input placeholder="277, 87%, 53%" className="flex-1 bg-[#0A0E1F] border border-white/10 rounded-lg px-3 py-2 outline-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOCKED FOOTER ===== */}
      <footer className="mt-16 border-t border-white/10 bg-[#080A17] py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/40 text-sm">
          <p className="font-semibold text-white mb-2">Why designers choose Photo Studio</p>
          <p>© 2026 Pinna3D — Full clarity of photo editing services. Studio dark background matching hero reference.</p>
        </div>
      </footer>
    </div>
  )
}
