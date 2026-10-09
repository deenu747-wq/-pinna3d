"use client";
import { useState } from "react";
import Link from "next/link";

export default function HybridHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Pinna3D" className="h-[100px] w-auto" />
        </Link>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium">
          {/* Tools Mega Menu */}
          <div className="relative" onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
            <button className="flex items-center gap-1 hover:text-black text-zinc-600">
              Tools <span className="text-[10px]">▼</span>
            </button>

            {open && (
              <div className="absolute left-1/2 -translate-x-1/2 top-[40px] w-[900px] bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] border p-6 grid grid-cols-3 gap-6">
                {/* Col 1 - Photo Studio */}
                <div>
                  <h4 className="text-[11px] tracking-widest font-semibold text-zinc-400 mb-3">PHOTO STUDIO — 2D</h4>
                  <ul className="space-y-2.5">
                    <li><Link href="/remove-background" className="hover:text-black">Remove Background</Link><p className="text-[11px] text-zinc-500">Instant BG removal</p></li>
                    <li><Link href="/remove-object">Remove Object</Link><p className="text-[11px] text-zinc-500">Erase unwanted object</p></li>
                    <li><Link href="/ai-backgrounds">AI Backgrounds</Link></li>
                    <li><Link href="/upscaler">Image Upscaler — 4x HD</Link></li>
                    <li><Link href="/banner-maker">Banner Maker — Resize</Link></li>
                  </ul>
                </div>
                {/* Col 2 - Vector */}
                <div className="border-x px-6">
                  <h4 className="text-[11px] tracking-widest font-semibold text-violet-600 mb-3">VECTOR STUDIO ★ NEW</h4>
                  <ul className="space-y-2.5">
                    <li><Link href="/image-to-vector" className="font-semibold">Image to Vector — JPG to SVG</Link><span className="ml-2 bg-violet-600 text-white text-[9px] px-1.5 py-0.5 rounded">NEW</span></li>
                    <li><Link href="/photo-to-line-art">Photo to Line Art</Link></li>
                    <li><Link href="/logo-vectorizer">Logo Vectorizer</Link></li>
                    <li><Link href="/batch-vectorize">Batch Vectorize — 100 at once</Link></li>
                  </ul>
                </div>
                {/* Col 3 - 3D */}
                <div>
                  <h4 className="text-[11px] tracking-widest font-semibold text-zinc-400 mb-3">3D STUDIO</h4>
                  <ul className="space-y-2.5">
                    <li><Link href="/image-to-3d">Image to 3D — Single photo</Link></li>
                    <li><Link href="/multi-image-to-3d">Multi-Image to 3D — 4 angles</Link></li>
                    <li><Link href="/text-to-3d">Text to 3D — Prompt to 3D</Link></li>
                    <li><Link href="/text-to-texture">Text to Texture</Link></li>
                    <li><Link href="/remesh">Remesh & Retopo</Link></li>
                    <li><Link href="/rig">Rig & Animate</Link></li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <Link href="/templates" className="text-zinc-600 hover:text-black">Templates</Link>
          <Link href="/pricing" className="text-zinc-600 hover:text-black">Pricing</Link>
          <Link href="/api-docs" className="text-zinc-600 hover:text-black">API</Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden lg:block text-[14px] font-medium text-zinc-600">Log In</Link>
          <Link href="/app" className="bg-black text-white text-[14px] font-medium px-5 py-2.5 rounded-full hover:bg-zinc-900">
            Start Creating — Free ★
          </Link>
        </div>
      </div>
    </header>
  );
}
