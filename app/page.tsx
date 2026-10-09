"use client";
import { useState } from "react";

export default function Page() {
  const [showTools, setShowTools] = useState(false);

  return (
    <main className="min-h-screen bg-[#0B0A14] text-white">
      {/* ===== TOP HEADER - HYBRID PHOTOROOM + MESHY ===== */}
      <header className="relative flex items-center justify-between px-6 md:px-8 py-4 bg-[#0B0A14]/90 backdrop-blur sticky top-0 z-[100] border-b border-white/10">
        <div className="flex items-center gap-10">
          <span className="text-white font-bold text-[22px] tracking-tight">Pinna3D.com</span>

          <nav className="hidden lg:flex items-center gap-7 text-[14px] text-white/60">
            <div className="relative">
              <button
                onMouseEnter={() => setShowTools(true)}
                onMouseLeave={() => setShowTools(false)}
                className="hover:text-white py-2 font-medium">Tools ▼</button>

              {showTools && (
                <div
                  onMouseEnter={() => setShowTools(true)}
                  onMouseLeave={() => setShowTools(false)}
                  className="absolute left-0 top-full mt-3 w-[860px] bg-[#15131F] border border-white/10 rounded-[20px] p-7 grid grid-cols-3 gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

                  <div>
                    <h4 className="text-white/30 text-[11px] uppercase tracking-widest mb-4">Photo Studio — 2D Tools</h4>
                    <div className="space-y-1 text-[13px]">
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer flex justify-between"><span>Remove Background</span><span className="text-white/30 text-xs">Instant</span></div>
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer">Remove Object</div>
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer">AI Backgrounds</div>
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer">AI Shadows</div>
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer">Image Upscaler — 4x HD</div>
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer">Banner Maker</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-violet-400 text-[11px] uppercase tracking-widest mb-4 font-semibold">Vector Studio — ★ NEW</h4>
                    <div className="space-y-1 text-[13px]">
                      <div className="text-white bg-violet-500/15 border border-violet-500/30 p-2.5 rounded-xl cursor-pointer">Image to Vector <span className="ml-2 text-[10px] bg-violet-500 px-1.5 py-0.5 rounded">NEW</span></div>
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer">Photo to Line Art</div>
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer">Logo Vectorizer</div>
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer">Batch Vectorize — 100x</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-blue-400 text-[11px] uppercase tracking-widest mb-4 font-semibold">3D Studio — 3D Tools</h4>
                    <div className="space-y-1 text-[13px]">
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer">Image to 3D — Single</div>
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer">Multi-Image to 3D — 4 views</div>
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer">Text to 3D — Prompt</div>
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer">Text to Texture</div>
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer">Remesh & Retopo</div>
                      <div className="text-white hover:bg-white/5 p-2.5 rounded-xl cursor-pointer">Rig & Animate</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <span className="hover:text-white cursor-pointer">Templates</span>
            <span className="hover:text-white cursor-pointer">Pricing</span>
            <span className="hover:text-white cursor-pointer">API</span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-white/60 text-[14px] hover:text-white hidden md:block">Log In</button>
          <button className="px-5 py-2.5 bg-white text-black rounded-full text-[13px] font-bold">Start Creating — Free ★</button>
        </div>
      </header>

      {/* ===== INSIDE APP TOOL SWITCHER ===== */}
      <div className="flex items-center gap-2 px-6 md:px-8 py-3 bg-[#0F0E1A] border-b border-white/[0.06] overflow-x-auto scrollbar-hide">
        <span className="text-white/20 text-[11px] uppercase mr-1">2D</span>
        <button className="px-3.5 py-1.5 bg-white text-black rounded-full text-[12px] font-medium whitespace-nowrap">Remove BG</button>
        <button className="px-3.5 py-1.5 bg-white/10 text-white/60 rounded-full text-[12px] whitespace-nowrap">AI Backgrounds</button>
        <button className="px-3.5 py-1.5 bg-white/10 text-white/60 rounded-full text-[12px] whitespace-nowrap">Upscaler</button>
        <span className="text-white/20 text-[11px] uppercase ml-3 mr-1">VECTOR</span>
        <button className="px-3.5 py-1.5 bg-violet-600 text-white rounded-full text-[12px] font-medium whitespace-nowrap">Image to Vector ★ NEW</button>
        <button className="px-3.5 py-1.5 bg-white/10 text-white/60 rounded-full text-[12px] whitespace-nowrap">Line Art</button>
        <span className="text-white/20 text-[11px] uppercase ml-3 mr-1">3D</span>
        <button className="px-3.5 py-1.5 bg-white/10 text-white/60 rounded-full text-[12px] whitespace-nowrap">Image to 3D</button>
        <button className="px-3.5 py-1.5 bg-white/10 text-white/60 rounded-full text-[12px] whitespace-nowrap">Text to 3D</button>
        <div className="ml-auto flex items-center gap-3 pl-6">
          <span className="text-white/30 text-xs hidden md:block">★ NEW: Image to Vector</span>
          <span className="px-2.5 py-1 bg-white/10 rounded-full text-xs text-white/60">Credits: 10</span>
        </div>
      </div>

      {/* ===== HERO - YOUR ORIGINAL ===== */}
      <section className="px-6 md:px-8 py-20 md:py-28 max-w-7xl mx-auto text-center">
        <div className="inline-flex px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] text-white/60 mb-6">Every Image to 3D — Pinna3D.com</div>
        <h1 className="text-[40px] md:text-[72px] font-bold leading-[0.9] tracking-tight">
          Turn Any Image<br />into <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">3D Model</span>
        </h1>
        <p className="text-white/50 text-[16px] md:text-[18px] mt-6 max-w-2xl mx-auto">Photoroom simplicity + Meshy power. Background remover, vectorizer & image to 3D — all in one.</p>
        <div className="mt-8 flex justify-center gap-3">
          <button className="px-7 py-3.5 bg-white text-black rounded-full font-semibold">Start Creating Free →</button>
          <button className="px-7 py-3.5 bg-white/10 text-white rounded-full border border-white/10">Watch Demo</button>
        </div>
      </section>

      {/* ===== PRODUCTS - 4 BUTTONS HYBRID ===== */}
      <section className="px-6 md:px-8 pb-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/[0.05] border border-white/10 rounded-[20px] p-6">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">📸</div>
          <h3 className="font-semibold">Image to 3D</h3><p className="text-white/40 text-sm mt-1">Single photo → GLB/FBX 60s</p>
        </div>
        <div className="bg-white/[0.05] border border-white/10 rounded-[20px] p-6">
          <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center mb-4">🔷</div>
          <h3 className="font-semibold">Image to Vector</h3><p className="text-white/40 text-sm mt-1">JPG → Infinite SVG</p>
        </div>
        <div className="bg-white/[0.05] border border-white/10 rounded-[20px] p-6">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">🪄</div>
          <h3 className="font-semibold">Remove Background</h3><p className="text-white/40 text-sm mt-1">Instant BG removal</p>
        </div>
        <div className="bg-white/[0.05] border border-white/10 rounded-[20px] p-6">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">✨</div>
          <h3 className="font-semibold">Text to 3D</h3><p className="text-white/40 text-sm mt-1">Prompt → 3D model</p>
        </div>
      </section>
    </main>
  );
}
