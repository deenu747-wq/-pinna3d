"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import {
  Image as ImageIcon, Vector, Box, Film, Shirt, LayoutTemplate,
  Wand2, Eraser, Sparkles, ArrowUp, Layers, FileImage, Repeat,
  Cuboid, Text, Palette, Scan, PersonStanding, Boxes,
  Video, Clapperboard, Type, MousePointer, Code2,
  ChevronLeft, ChevronRight, Check, ArrowRight, Zap, Crown
} from "lucide-react";

// --- DATA ---
const STUDIOS = [
  { id: "photo", label: "Photo Studio", icon: ImageIcon, badge: "Popular" },
  { id: "vector", label: "Vector Studio", icon: Vector, badge: "USP" },
  { id: "3d", label: "3D Studio", icon: Box, badge: "New" },
  { id: "motion", label: "Motion Studio", icon: Film, badge: "New" },
  { id: "mockup", label: "Mockup Studio", icon: Shirt, badge: "" },
  { id: "template", label: "Template Maker", icon: LayoutTemplate, badge: "" },
];

const SERVICES: any = {
  photo: [
    { title: "Remove Background", desc: "Instant BG removal", icon: Eraser, pro: false },
    { title: "Remove Object", desc: "Erase unwanted object", icon: Wand2, pro: false },
    { title: "AI Backgrounds", desc: "Generate studio background", icon: Sparkles, pro: true },
    { title: "AI Shadows", desc: "Realistic shadows", icon: Layers, pro: true },
    { title: "Image Upscaler", desc: "4x HD quality", icon: ArrowUp, pro: true },
    { title: "Batch 100x", desc: "100 images at once", icon: Repeat, pro: true, highlight: true },
    { title: "Banner Maker", desc: "Resize for all platforms", icon: FileImage, pro: true },
  ],
  vector: [
    { title: "Image to Vector", desc: "JPG/PNG to SVG", icon: Vector, pro: false },
    { title: "Photo to Line Art", desc: "Sketch converter", icon: FileImage, pro: true },
    { title: "Logo Vectorizer", desc: "Infinite scale", icon: Crown, pro: true },
    { title: "Batch Vectorize", desc: "100 images at once", icon: Repeat, pro: true, highlight: true },
  ],
  "3d": [
    { title: "Image to 3D", desc: "Single photo to 3D", icon: Cuboid, pro: true },
    { title: "Multi-Image to 3D", desc: "4 angles to perfect 3D", icon: Boxes, pro: true },
    { title: "Text to 3D", desc: "Prompt to 3D model", icon: Text, pro: true },
    { title: "Text to Texture", desc: "AI texture paint", icon: Palette, pro: true },
    { title: "Remesh & Retopo", desc: "Clean 3D model", icon: Scan, pro: true },
    { title: "Rig & Animate", desc: "Auto rig for games", icon: PersonStanding, pro: true },
  ],
  motion: [
    { title: "Text to Video", desc: "Prompt to video", icon: Video, pro: true },
    { title: "Image to Video", desc: "Animate any image", icon: Clapperboard, pro: true },
    { title: "Logo Animation", desc: "Make logo move", icon: Zap, pro: true },
    { title: "Text Animation", desc: "Kinetic typography", icon: Type, pro: true },
    { title: "Intro / Outro", desc: "YouTube ready", icon: Film, pro: true },
    { title: "Keyframe Editor", desc: "Pro controls", icon: MousePointer, pro: true },
  ],
  mockup: [
    { title: "T-Shirt Mockup", desc: "Apparel showcase", icon: Shirt, pro: true },
    { title: "Device Mockup", desc: "Phone / Laptop", icon: ImageIcon, pro: true },
    { title: "Packaging Mockup", desc: "Box / Bottle", icon: Box, pro: true },
  ],
  template: [
    { title: "Instagram Post", desc: "1000+ templates", icon: LayoutTemplate, pro: true },
    { title: "Logo Templates", desc: "Editable", icon: Vector, pro: true },
    { title: "Banner Pack", desc: "All sizes", icon: FileImage, pro: true },
  ],
};

const PRICING = [
  { name: "Starter", price: "999", desc: "/year", feats: ["Photo Studio", "Vector Studio - 50/mo", "All formats: jpg, png, svg"] },
  { name: "Creator", price: "2499", popular: true, desc: "/year", feats: ["Everything in Starter", "3D Studio - 100/mo", "Mockup Studio", "Batch 100x"] },
  { name: "Studio", price: "4999", desc: "/year", feats: ["Everything in Creator", "Motion Studio", "API Access 1000 calls", "Team Workspace"] },
  { name: "Enterprise", price: "7999", desc: "/year", feats: ["Everything in Studio", "Unlimited 3D", "Bulk 1000 images", "SLA & Support"] },
];

export default function HomePage() {
  const [activeStudio, setActiveStudio] = useState("photo");
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
    }
  };

  const activeServices = SERVICES[activeStudio] || SERVICES.photo;

  return (
    <div className="min-h-screen bg-[#fcfcf9] text-zinc-900 selection:bg-black selection:text-white">
      {/* HEADER - PREMIUM CLEAN - LOGO SIZE SAME h-9.5 w-9.5 */}
      <header className="sticky top-0 z-50 bg-[#fcfcf9]/80 backdrop-blur-xl border-b border-zinc-200/60">
        <div className="mx-auto max-w-[1440px] px-6 h-[68px] flex items-center justify-between">
          {/* Logo - SAME SIZE */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9.5 w-9.5 rounded-xl bg-black text-white grid place-items-center font-bold text-[16px] tracking-tighter">P</div>
            <span className="font-semibold tracking-tight text-[16px]">Pinna3D</span>
          </Link>

          {/* Center Nav - PREMIUM - NO Studios dropdown */}
          <nav className="hidden lg:flex items-center gap-7 text-[14px] font-[450] text-zinc-600">
            <Link href="#studios" className="hover:text-black transition">Photo Studio</Link>
            <Link href="#studios" className="hover:text-black transition flex items-center gap-1">Vector Studio <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded-full">USP</span></Link>
            <Link href="#studios" className="hover:text-black transition">3D Studio</Link>
            <Link href="#studios" className="hover:text-black transition">Motion</Link>
            <Link href="/api" className="hover:text-black transition">API</Link>
            <Link href="#pricing" className="hover:text-black transition">Pricing</Link>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden md:inline-flex text-[14px] font-medium px-4 py-2 hover:bg-zinc-100 rounded-full transition">Sign In</Link>
            <Link href="/app" className="inline-flex text-[14px] font-medium bg-black text-white px-5 py-2.5 rounded-full hover:bg-zinc-800 transition">Get Started</Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-[1440px] px-6 pt-24 pb-10 text-center">
        <div className="inline-flex items-center gap-2 text-[12px] font-medium bg-white border border-zinc-200 rounded-full px-3 py-1 shadow-sm mb-6">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" /> New: Batch 100x + Vector USP Live
        </div>
        <h1 className="text-[42px] md:text-[64px] font-[750] tracking-[-0.04em] leading-[0.95] max-w-4xl mx-auto">
          One studio for <br />
          <span className="font-serif italic font-[400]">everything visual.</span>
        </h1>
        <p className="mt-5 text-[16px] md:text-[18px] text-zinc-500 max-w-2xl mx-auto leading-relaxed">
          Photo, Vector, 3D, Motion, Mockup & Templates — with all-format download: jpg, png, gif, eps, svg, psd, cdr, ai, glb, obj, fbx.
        </p>
      </section>

      {/* MARK 3: CENTER STUDIO TABS - PREMIUM PILL */}
      <div id="studios" className="sticky top-[68px] z-40 bg-[#fcfcf9]/90 backdrop-blur-xl border-y border-zinc-200/60 py-3">
        <div className="mx-auto max-w-[1440px] px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {STUDIOS.map((s) => {
              const active = activeStudio === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStudio(s.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13.5px] font-[500] whitespace-nowrap transition-all border ${
                    active? "bg-black text-white border-black shadow" : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:text-black"
                  }`}
                >
                  <s.icon className="h-4 w-4" />
                  {s.label}
                  {s.badge && <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active? "bg-white/20" : "bg-zinc-100"}`}>{s.badge}</span>}
                </button>
              );
            })}
            <Link href="/api" className="flex items-center gap-2 px-4 py-2 rounded-full text-[13.5px] font-[500] bg-white border border-zinc-200 text-zinc-600 hover:text-black">
              <Code2 className="h-4 w-4" /> API
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll(-1)} className="h-8 w-8 rounded-full bg-white border border-zinc-200 grid place-items-center hover:bg-zinc-50"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={() => scroll(1)} className="h-8 w-8 rounded-full bg-white border border-zinc-200 grid place-items-center hover:bg-zinc-50"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* MARK 4: MODERN SLIDER FOR CARDS */}
      <section className="mx-auto max-w-[1440px] px-6 py-8">
        <div ref={sliderRef} className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 scroll-smooth">
          {activeServices.map((srv: any, i: number) => (
            <div
              key={i}
              className={`snap-start shrink-0 w-[300px] md:w-[340px] rounded-[20px] border bg-white p-5 flex flex-col justify-between group hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.15)] transition-all duration-300 ${
                srv.highlight? "border-black shadow-lg" : "border-zinc-200"
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className={`h-10 w-10 rounded-xl grid place-items-center ${srv.highlight? "bg-black text-white" : "bg-zinc-100 text-zinc-700"}`}>
                    <srv.icon className="h-5 w-5" />
                  </div>
                  {srv.pro && <span className="text-[10px] font-medium bg-zinc-900 text-white px-2 py-1 rounded-full">PRO</span>}
                </div>
                <h3 className="mt-4 text-[16px] font-semibold tracking-tight">{srv.title}</h3>
                <p className="mt-1 text-[13px] text-zinc-500">{srv.desc}</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-[12px] text-zinc-400">All formats supported</span>
                <span className="h-8 w-8 rounded-full bg-zinc-900 text-white grid place-items-center group-hover:scale-110 transition"><ArrowRight className="h-4 w-4" /></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* API PREVIEW */}
      <section className="mx-auto max-w-[1440px] px-6 py-16">
        <div className="rounded-[24px] bg-black text-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[12px] text-zinc-400"><Code2 className="h-4 w-4" /> DEVELOPER API</div>
            <h3 className="mt-3 text-[24px] md:text-[32px] font-semibold tracking-tight">Build with Pinna3D API</h3>
            <p className="mt-2 text-zinc-400 text-[14px] max-w-xl">POST /v1/image-to-3d, /v1/image-to-vector, /v1/text-to-texture — SDKs for JS/Python, webhooks, bulk 1000.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/api" className="px-6 py-3 rounded-full bg-white text-black text-[14px] font-medium hover:bg-zinc-100">Read Docs</Link>
            <div className="px-6 py-3 rounded-full bg-white/10 text-white text-[14px] font-mono">npm i pinna3d</div>
          </div>
        </div>
      </section>

      {/* PRICING - 4 PLANS Rs 999 to 7999 */}
      <section id="pricing" className="mx-auto max-w-[1440px] px-6 py-20 border-t border-zinc-200">
        <h2 className="text-center text-[36px] font-[700] tracking-tight">4 plans. Yearly only.</h2>
        <p className="text-center text-zinc-500 mt-2">Starting from Rs. 999/- to Rs. 7999/-</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING.map((p) => (
            <div key={p.name} className={`rounded-[20px] border p-6 bg-white ${p.popular? "border-black shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] scale-[1.02]" : "border-zinc-200"}`}>
              {p.popular && <div className="inline-flex text-[11px] bg-black text-white px-2.5 py-1 rounded-full mb-4">MOST POPULAR</div>}
              <h4 className="font-semibold">{p.name}</h4>
              <div className="mt-3 flex items-baseline gap-1"><span className="text-[14px]">Rs.</span><span className="text-[32px] font-bold tracking-tight">{p.price}</span><span className="text-[13px] text-zinc-500">{p.desc}</span></div>
              <div className="mt-5 space-y-2.5">
                {p.feats.map((f: string) => (
                  <div key={f} className="flex items-center gap-2 text-[13px] text-zinc-600"><Check className="h-4 w-4 text-black" /> {f}</div>
                ))}
              </div>
              <button className={`mt-6 w-full h-11 rounded-full text-[14px] font-medium ${p.popular? "bg-black text-white" : "bg-zinc-100 hover:bg-zinc-200"}`}>Get {p.name}</button>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-200 py-10 text-center text-[13px] text-zinc-400">
        © 2026 Pinna3D — All formats: jpg, png, gif, eps, svg, psd, cdr, ai, glb, obj, stl, fbx
      </footer>

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </div>
  );
}
