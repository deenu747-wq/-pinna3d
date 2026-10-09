"use client";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white">
      {/* HERO SECTION */}
      <div className="max-w-[1440px] mx-auto px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT - Text */}
          <div className="lg:col-span-4">
            <h1 className="text-[40px] lg:text-[48px] font-bold leading-[1.05] tracking-tight mb-4">
              Every Image to 3D<br />in 60 Seconds
            </h1>
            <p className="text-[13px] text-white/60 leading-relaxed mb-6 max-w-[360px]">
              Transform photos into production-ready 3D models instantly. Built for designers, e-commerce, and creators worldwide.
            </p>

            <div className="flex gap-3 mb-6">
              <Link href="/app" className="bg-[#a855f7] hover:bg-[#9333ea] text-white text-[12px] font-medium px-4 py-2 rounded-lg flex items-center gap-1">
                ✦ Start Creating — Free
              </Link>
              <button className="border border-white/10 hover:border-white/20 text-white/80 text-[12px] px-4 py-2 rounded-lg flex items-center gap-1">
                ◎ Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="bg-white/[0.06] border border-white/10 text-[10px] px-2.5 py-1 rounded-full text-white/60">⚡ 60s Turnaround</span>
              <span className="bg-white/[0.06] border border-white/10 text-[10px] px-2.5 py-1 rounded-full text-white/60">• 100k+ assets generated</span>
              <span className="bg-white/[0.06] border border-white/10 text-[10px] px-2.5 py-1 rounded-full text-white/60">• No credit card required</span>
              <span className="bg-white/[0.06] border border-white/10 text-[10px] px-2.5 py-1 rounded-full text-white/60">∞ 7 Formats</span>
            </div>
          </div>

          {/* MIDDLE - Upload */}
          <div className="lg:col-span-4">
            <div className="border border-dashed border-violet-500/30 rounded-[16px] bg-[#12121b] h-[380px] flex flex-col items-center justify-center p-6 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#1c1c28] flex items-center justify-center mb-4 border border-white/10">
                <span className="text-[20px]">☁️</span>
              </div>
              <h3 className="text-[13px] font-semibold mb-1">Drag & drop your image here</h3>
              <p className="text-[11px] text-white/40 mb-2">or browse files to upload</p>
              <p className="text-[10px] text-white/30 mb-5">Supports PNG, JPG, WEBP • Max 20MB</p>
              <button className="bg-[#a855f7] hover:bg-[#9333ea] text-white text-[11px] font-medium px-5 py-2 rounded-lg">
                Browse Files
              </button>

              <div className="absolute inset-0 pointer-events-none rounded-[16px] shadow-[inset_0_0_40px_rgba(168,85,247,0.08)]"></div>
            </div>
          </div>

          {/* RIGHT - 3D Viewer Preview */}
          <div className="lg:col-span-4">
            <div className="rounded-[16px] bg-[#12121b] border border-white/10 p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] text-white/40">3D Viewer Preview</span>
                <span className="text-[10px] text-white/30">⇅ ↺</span>
              </div>

              {/* Shoe Preview */}
              <div className="bg-[#0f0f17] rounded-xl h-[180px] flex flex-col items-center justify-center mb-3 relative overflow-hidden border border-white/[0.03]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25),transparent_70%)]"></div>
                <div className="text-[52px] relative z-10 drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]">👟</div>
                <div className="w-[120px] h-[20px] bg-[#a855f7]/20 blur-[20px] rounded-full mt-2"></div>
              </div>

              <div className="bg-black/50 rounded-md px-2.5 py-1.5 mb-3 border border-white/5">
                <span className="text-[10px] text-white/50">Model: Sneaker_v01.glb</span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 mb-2">
                {["GLB", "FBX", "OBJ", "STL", "3MF", "USDZ", "BLEND"].map((f) => (
                  <button key={f} className="bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-[10px] py-1.5 rounded-md text-white/60">
                    {f}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-1.5 mb-1.5">
                <button className="bg-white/[0.06] border border-white/10 text-[10px] py-2 rounded-md text-white/70">Remesh</button>
                <button className="bg-white/[0.06] border border-white/10 text-[10px] py-2 rounded-md text-white/70">Rig & Animate</button>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button className="bg-white/[0.06] border border-white/10 text-[10px] py-2 rounded-md text-white/70">Download GLB</button>
                <button className="bg-[#a855f7] text-[10px] py-2 rounded-md text-white font-medium">Export SVG</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* TRUST STRIP - optional */}
      <div className="max-w-[1440px] mx-auto px-6 pb-10">
        <div className="border-t border-white/[0.05] pt-6 flex items-center gap-6 text-[11px] text-white/30">
          <span>Used by 100k+ creators</span>
          <span>•</span>
          <span>Supports GLB, FBX, OBJ, STL, USDZ, BLEND + SVG Vector</span>
        </div>
      </div>
    </main>
  );
}
