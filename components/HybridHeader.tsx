"use client";
import { useState } from "react";
import Link from "next/link";

export default function HybridHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-[#0A0A0F] border-b border-white/[0.08] sticky top-0 z-[9999]">
      <div className="max-w-[1440px] mx-auto px-6 h-[64px] flex items-center justify-between">
        {/* LOGO - small, not 100px */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">⬡</div>
            <span className="text-white font-bold text-[18px]">Pinna3d<span className="text-violet-500 text-[13px]">.com</span></span>
          </div>
        </Link>

        {/* CENTER NAV */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium">
          <div className="relative" onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
            <button className="bg-white text-black px-3 py-[5px] rounded-md text-[12px] flex items-center gap-1">
              Tools <span className="text-[9px]">▼</span>
            </button>
            {open && (
              <div className="absolute left-1/2 -translate-x-1/2 top-[36px] w-[800px] bg-[#16161F] border border-white/10 rounded-[16px] shadow-2xl p-6 grid grid-cols-3 gap-6">
                <div>
                  <h4 className="text-[10px] tracking-widest text-white/40 mb-3">PHOTO STUDIO</h4>
                  <ul className="space-y-2.5 text-[12px] text-white/80">
                    <li><Link href="/remove-background" className="hover:text-white">Remove Background</Link></li>
                    <li><Link href="/remove-object" className="hover:text-white">Remove Object</Link></li>
                    <li><Link href="/ai-backgrounds" className="hover:text-white">AI Backgrounds</Link></li>
                    <li><Link href="/upscaler" className="hover:text-white">Image Upscaler</Link></li>
                    <li><Link href="/banner-maker" className="hover:text-white">Banner Maker</Link></li>
                  </ul>
                </div>
                <div className="border-x border-white/10 px-6">
                  <h4 className="text-[10px] tracking-widest text-violet-400 mb-3">VECTOR STUDIO ★ NEW</h4>
                  <ul className="space-y-2.5 text-[12px] text-white/80">
                    <li><Link href="/image-to-vector" className="text-white font-semibold">Image to Vector</Link> <span className="bg-violet-600 text-white text-[9px] px-1 py-0.5 rounded ml-1">NEW</span></li>
                    <li><Link href="/line-art">Photo to Line Art</Link></li>
                    <li><Link href="/batch">Batch Vectorize</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-widest text-white/40 mb-3">3D STUDIO</h4>
                  <ul className="space-y-2.5 text-[12px] text-white/80">
                    <li><Link href="/image-to-3d">Image to 3D</Link></li>
                    <li><Link href="/multi-image-to-3d">Multi-Image to 3D</Link></li>
                    <li><Link href="/text-to-3d">Text to 3D</Link></li>
                    <li><Link href="/text-to-texture">Text to Texture</Link></li>
                    <li><Link href="/template-studio">Template Studio</Link></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <Link href="/templates" className="text-white/60 hover:text-white">Templates</Link>
          <Link href="/pricing" className="text-white/60 hover:text-white">Pricing</Link>
          <Link href="/api" className="text-white/60 hover:text-white">API</Link>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden lg:block text-[12px] text-white/60 hover:text-white">Log In</Link>
          <Link href="/app" className="bg-white text-black text-[12px] font-semibold px-4 py-2 rounded-full">Start Creating — Free ★</Link>
        </div>
      </div>

      {/* SECOND ROW - your tabs like screenshot */}
      <div className="w-full border-t border-white/[0.06] bg-[#0A0A0F]">
        <div className="max-w-[1440px] mx-auto px-6 h-[48px] flex items-center gap-2 overflow-auto">
          <span className="bg-[#a855f7] text-white text-[11px] px-3 py-1 rounded-full">Image to 3D</span>
          <span className="border border-white/10 text-white/60 text-[11px] px-3 py-1 rounded-full">Multi-Image to 3D</span>
          <span className="border border-white/10 text-white/60 text-[11px] px-3 py-1 rounded-full">Text to 3D</span>
          <span className="border border-white/10 text-white/60 text-[11px] px-3 py-1 rounded-full">Text to Texture</span>
          <span className="border border-white/10 text-white/60 text-[11px] px-3 py-1 rounded-full">Template Studio ★ NEW</span>
          <span className="border border-violet-500/50 text-violet-400 text-[11px] px-3 py-1 rounded-full">Image to Vector ★ NEW</span>
        </div>
      </div>
    </header>
  );
}
