"use client";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white">
      <div className="max-w-[1440px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h1 className="text-[48px] font-bold leading-[1.05] mb-4">
            Every Image to 3D<br/>in 60 Seconds
          </h1>
          <p className="text-white/60 text-[14px] mb-6">
            Remove background, vectorize, and generate 3D — hybrid of PhotoRoom + Meshy + Vector.
          </p>
          <div className="border border-dashed border-violet-500/50 rounded-xl h-[260px] flex items-center justify-center bg-[#11111a]">
            <span className="text-white/40 text-sm">Upload Area — Drag & Drop</span>
          </div>
        </div>
        <div className="bg-[#11111a] border border-white/10 rounded-xl h-[400px] flex items-center justify-center">
          <span className="text-white/30 text-sm">3D Viewer Preview</span>
        </div>
      </div>
    </main>
  );
}
