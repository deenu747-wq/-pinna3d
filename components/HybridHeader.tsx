"use client";
import { useState } from "react";
import Link from "next/link";

export default function HybridHeader() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="w-full bg-[#0A0A0F] sticky top-0 z-[9999] border-b border-white/[0.06]">
      {/* TOP HEADER - Main Navigation */}
      <div className="max-w-[1440px] mx-auto px-6 h-[68px] flex items-center justify-between">

        {/* LOGO - 100px as you asked, but controlled */}
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="Pinna3D" className="h-[40px] w-auto object-contain"
            onError={(e)=>{
              const target = e.currentTarget as HTMLImageElement;
              target.style.display='none';
              (target.nextElementSibling as HTMLElement).style.display='flex';
            }}
          />
          <span style={{display:'none'}} className="items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-bold">P</span>
            <span className="text-white font-bold text-[22px]">Pinna3D.com</span>
          </span>
        </Link>

        {/* CENTER NAV */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium">

          {/* 1. TOOLS MEGA DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={()=>setToolsOpen(true)}
            onMouseLeave={()=>setToolsOpen(false)}
          >
            <button className={`px-3.5 py-1.5 rounded-full border flex items-center gap-1.5 transition ${toolsOpen? "bg-white text-black border-white" : "bg-white/10 border-white/10 text-white hover:bg-white/15"}`}>
              Tools <span className="text-[10px]">▼</span>
            </button>

            {toolsOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-[42px] w-[860px] bg-[#16161F] border border-white/10 rounded-[20px] shadow-[0_20px_80px_rgba(0,0,0,0.6)] p-7 grid grid-cols-3 gap-7">

                {/* COLUMN 1: Photo Studio */}
                <div>
                  <h4 className="text-[10px] tracking-[0.15em] text-white/30 font-semibold mb-4">PHOTO STUDIO — 2D TOOLS</h4>
                  <ul className="space-y-3">
                    <li><Link href="/remove-background" className="flex flex-col group"><span className="text-[13px] text-white group-hover:text-violet-400 font-medium">Remove Background</span><span className="text-[11px] text-white/40">Instant BG removal</span></Link></li>
                    <li><Link href="/remove-object" className="flex flex-col group"><span className="text-[13px] text-white/80 group-hover:text-white">Remove Object</span><span className="text-[11px] text-white/40">Erase unwanted object</span></Link></li>
                    <li><Link href="/ai-backgrounds" className="flex flex-col group"><span className="text-[13px] text-white/80 group-hover:text-white">AI Backgrounds</span><span className="text-[11px] text-white/40">Generate studio background</span></Link></li>
                    <li><Link href="/ai-shadows" className="flex flex-col group"><span className="text-[13px] text-white/80 group-hover:text-white">AI Shadows</span><span className="text-[11px] text-white/40">Realistic shadows</span></Link></li>
                    <li><Link href="/upscaler" className="flex flex-col group"><span className="text-[13px] text-white/80 group-hover:text-white">Image Upscaler</span><span className="text-[11px] text-white/40">4x HD quality</span></Link></li>
                    <li><Link href="/banner-maker" className="flex flex-col group"><span className="text-[13px] text-white/80 group-hover:text-white">Banner Maker</span><span className="text-[11px] text-white/40">Resize for Instagram / Shopify</span></Link></li>
                    <li><Link href="/collage" className="flex flex-col group"><span className="text-[13px] text-white/80 group-hover:text-white">Collage & Retouch</span><span className="text-[11px] text-white/40">Batch edit</span></Link></li>
                  </ul>
                </div>

                {/* COLUMN 2: Vector Studio */}
                <div className="border-x border-white/[0.06] px-7">
                  <h4 className="text-[10px] tracking-[0.15em] text-violet-400 font-semibold mb-4">VECTOR STUDIO — VECTOR TOOLS</h4>
                  <ul className="space-y-3">
                    <li><Link href="/image-to-vector" className="flex flex-col group"><span className="text-[13px] text-white font-medium flex items-center gap-2">Image to Vector <span className="bg-violet-600 text-white text-[8px] px-1.5 py-0.5 rounded font-bold">NEW</span></span><span className="text-[11px] text-white/40">JPG/PNG to SVG</span></Link></li>
                    <li><Link href="/line-art" className="flex flex-col group"><span className="text-[13px] text-white/80 group-hover:text-white">Photo to Line Art</span><span className="text-[11px] text-white/40">Sketch converter</span></Link></li>
                    <li><Link href="/logo-vectorizer" className="flex flex-col group"><span className="text-[13px] text-white/80 group-hover:text-white">Logo Vectorizer</span><span className="text-[11px] text-white/40">Make logo infinite scale</span></Link></li>
                    <li><Link href="/batch-vectorize" className="flex flex-col group"><span className="text-[13px] text-white/80 group-hover:text-white">Batch Vectorize</span><span className="text-[11px] text-white/40">100 images at once</span></Link></li>
                  </ul>
                  <div className="mt-6 bg-violet-500/10 border border-violet-500/20 rounded-lg p-3">
                    <p className="text-[11px] text-violet-300 font-medium">Your USP — No one else has this</p>
                    <p className="text-[10px] text-white/40 mt-1">PhotoRoom + Meshy + Vector = You</p>
                  </div>
                </div>

                {/* COLUMN 3: 3D Studio */}
                <div>
                  <h4 className="text-[10px] tracking-[0.15em] text-white/30 font-semibold mb-4">3D STUDIO — 3D TOOLS</h4>
                  <ul className="space-y-3">
                    <li><Link href="/image-to-3d" className="flex flex-col group"><span className="text-[13px] text-white font-medium">Image to 3D</span><span className="text-[11px] text-white/40">Single photo to 3D model</span></Link></li>
                    <li><Link href="/multi-image-to-3d" className="flex flex-col group"><span className="text-[13px] text-white/80 group-hover:text-white">Multi-Image to 3D</span><span className="text-[11px] text-white/40">4 angles to perfect 3D</span></Link></li>
                    <li><Link href="/text-to-3d" className="flex flex-col group"><span className="text-[13px] text-white/80 group-hover:text-white">Text to 3D</span><span className="text-[11px] text-white/40">Prompt to 3D</span></Link></li>
                    <li><Link href="/text-to-texture" className="flex flex-col group"><span className="text-[13px] text-white/80 group-hover:text-white">Text to Texture</span><span className="text-[11px] text-white/40">AI texture paint</span></Link></li>
                    <li><Link href="/remesh" className="flex flex-col group"><span className="text-[13px] text-white/80 group-hover:text-white">Remesh & Retopo</span><span className="text-[11px] text-white/40">Clean 3D model</span></Link></li>
                    <li><Link href="/rig-animate" className="flex flex-col group"><span className="text-[13px] text-white/80 group-hover:text-white">Rig & Animate</span><span className="text-[11px] text-white/40">Auto rig for games</span></Link></li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* 2. Templates */}
          <Link href="/templates" className="text-white/60 hover:text-white">Templates</Link>
          {/* 3. Pricing */}
          <Link href="/pricing" className="text-white/60 hover:text-white">Pricing</Link>
          {/* 4. API */}
          <Link href="/api" className="text-white/60 hover:text-white">API</Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-[13px] text-white/70 hover:text-white px-3 py-1.5">Log In</Link>
          <Link href="/app" className="bg-white text-black text-[12px] font-semibold px-5 py-2 rounded-full hover:bg-white/90 transition">
            Start Creating — Free ★
          </Link>
        </div>
      </div>

      {/* INSIDE APP - LEFT SIDE TOOL SWITCHER */}
      <div className="w-full bg-[#0F0F14] border-t border-white/[0.05]">
        <div className="max-w-[1440px] mx-auto px-6 h-[44px] flex items-center gap-6 overflow-x-auto">
          <span className="text-[10px] tracking-widest text-white/20 font-semibold mr-1">2D</span>
          <Link href="/remove-background" className="text-[11px] text-white bg-white/10 px-3 py-1 rounded-full border border-white/10">Remove BG</Link>
          <Link href="/ai-backgrounds" className="text-[11px] text-white/50 hover:text-white">AI Backgrounds</Link>
          <Link href="/upscaler" className="text-[11px] text-white/50 hover:text-white">Upscaler</Link>
          <Link href="/banner-maker" className="text-[11px] text-white/50 hover:text-white">Banner Resize</Link>

          <div className="w-px h-4 bg-white/10 mx-1"></div>
          <span className="text-[10px] tracking-widest text-violet-400/60 font-semibold mr-1">VECTOR</span>
          <Link href="/image-to-vector" className="text-[11px] text-violet-300 bg-violet-500/15 px-3 py-1 rounded-full border border-violet-500/20">Image to Vector ★ NEW</Link>
          <Link href="/line-art" className="text-[11px] text-white/50 hover:text-white">Line Art</Link>

          <div className="w-px h-4 bg-white/10 mx-1"></div>
          <span className="text-[10px] tracking-widest text-white/20 font-semibold mr-1">3D</span>
          <Link href="/image-to-3d" className="text-[11px] text-white/50 hover:text-white">Image to 3D</Link>
          <Link href="/multi-image-to-3d" className="text-[11px] text-white/50 hover:text-white">Multi-Image</Link>
          <Link href="/text-to-3d" className="text-[11px] text-white/50 hover:text-white">Text to 3D</Link>
          <Link href="/text-to-texture" className="text-[11px] text-white/50 hover:text-white">Text to Texture</Link>
          <Link href="/template-studio" className="text-[11px] text-white/50 hover:text-white">Template Studio</Link>
        </div>
      </div>
    </header>
  );
}
