"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const STUDIOS = [
  { id: "photo", label: "Photo Studio" },
  { id: "vector", label: "Vector Studio", badge: "USP" },
  { id: "3d", label: "3D Studio", badge: "New" },
  { id: "motion", label: "Motion Studio" },
  { id: "mockup", label: "Mockup Studio" },
  { id: "template", label: "Template Maker" },
];

const SERVICES: any = {
  photo: [
    { t: "Remove Background", d: "Instant BG removal" },
    { t: "Remove Object", d: "Erase object" },
    { t: "AI Backgrounds", d: "Studio backgrounds" },
    { t: "AI Shadows", d: "Realistic shadows" },
    { t: "Image Upscaler", d: "4x HD quality" },
    { t: "Batch 100x", d: "100 images at once", h: true },
    { t: "Banner Maker", d: "Resize for platforms" },
  ],
  vector: [
    { t: "Image to Vector", d: "JPG to SVG" },
    { t: "Logo Vectorizer", d: "Infinite scale" },
    { t: "Batch Vectorize", d: "100 images", h: true },
  ],
  "3d": [
    { t: "Image to 3D", d: "Single photo to 3D" },
    { t: "Multi-Image to 3D", d: "4 angles" },
    { t: "Text to 3D", d: "Prompt to 3D" },
    { t: "Text to Texture", d: "AI paint" },
    { t: "Remesh", d: "Clean model" },
    { t: "Rig & Animate", d: "Auto rig" },
  ],
  motion: [
    { t: "Text to Video", d: "Prompt to video" },
    { t: "Image to Video", d: "Animate image" },
    { t: "Logo Animation", d: "Make logo move" },
    { t: "Intro / Outro", d: "YouTube ready" },
  ],
  mockup: [{ t: "T-Shirt Mockup", d: "Apparel" }, { t: "Device Mockup", d: "Phone" }],
  template: [{ t: "Instagram Post", d: "1000+ templates" }],
};

export default function Home() {
  const [active, setActive] = useState("photo");
  const ref = useRef<HTMLDivElement>(null);
  const list = SERVICES[active];
  return (
    <div className="min-h-screen bg-[#fcfcf9] text-zinc-900">
      <header className="sticky top-0 z-50 bg-[#fcfcf9]/80 backdrop-blur-xl border-b border-zinc-200">
        <div className="mx-auto max-w-[1440px] px-6 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-black text-white grid place-items-center font-bold">P</div>
            <span className="font-semibold">Pinna3D</span>
          </Link>
          <div className="hidden lg:flex gap-6 text-[14px] text-zinc-600">
            <span>Photo Studio</span><span>Vector Studio</span><span>3D Studio</span><span>API</span>
          </div>
          <Link href="/app" className="bg-black text-white px-5 py-2.5 rounded-full text-[14px]">Get Started</Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-6 pt-20 pb-8 text-center">
        <h1 className="text-[48px] md:text-[64px] font-bold tracking-tight leading-[0.9]">One studio for<br/><span className="font-serif italic font-normal">everything visual.</span></h1>
        <p className="mt-4 text-zinc-500">Photo, Vector, 3D, Motion, Mockup — All formats jpg png svg psd ai glb obj fbx</p>
      </section>

      <div className="sticky top-[68px] z-40 bg-[#fcfcf9]/90 backdrop-blur-xl border-y border-zinc-200 py-3">
        <div className="mx-auto max-w-[1440px] px-6 flex gap-2 overflow-x-auto">
          {STUDIOS.map(s=>(
            <button key={s.id} onClick={()=>setActive(s.id)} className={`px-4 py-2 rounded-full text-[13px] border whitespace-nowrap ${active===s.id? "bg-black text-white border-black" : "bg-white border-zinc-200"}`}>{s.label} {s.badge? `• ${s.badge}` : ""}</button>
          ))}
          <Link href="/api" className="px-4 py-2 rounded-full text-[13px] border bg-white">API</Link>
        </div>
      </div>

      <section className="mx-auto max-w-[1440px] px-6 py-8">
        <div ref={ref} className="flex gap-4 overflow-x-auto pb-4" style={{scrollbarWidth:'none'}}>
          {list.map((s:any,i:number)=>(
            <div key={i} className={`shrink-0 w-[320px] rounded-[20px] border bg-white p-5 ${s.h? "border-black shadow" : "border-zinc-200"}`}>
              <div className="h-10 w-10 rounded-xl bg-zinc-100 grid place-items-center font-bold">{i+1}</div>
              <h3 className="mt-4 font-semibold">{s.t}</h3>
              <p className="text-[13px] text-zinc-500">{s.d}</p>
              <div className="mt-6 flex justify-between text-[12px] text-zinc-400"><span>All formats</span><span className="h-8 w-8 rounded-full bg-black text-white grid place-items-center">→</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-16">
        <div className="rounded-[24px] bg-black text-white p-8 flex justify-between items-center">
          <div><h3 className="text-[28px] font-semibold">Build with Pinna3D API</h3><p className="text-zinc-400 text-[14px]">image-to-3d, image-to-vector, batch 100x</p></div>
          <Link href="/api" className="bg-white text-black px-6 py-3 rounded-full text-[14px]">Read Docs</Link>
        </div>
      </section>
    </div>
  );
}
