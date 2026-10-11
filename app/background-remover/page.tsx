"use client";
import { useState, useRef } from "react";
import Link from "next/link";

export default function BackgroundRemover() {
  const [inputUrl, setInputUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const url = URL.createObjectURL(file);
    setInputUrl(url);
    setLoading(true);
    // Using @imgly/background-removal - client side
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(file);
      setOutputUrl(URL.createObjectURL(blob));
    } catch {
      // fallback - just show original
      setOutputUrl(url);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1a1a1a]">
      {/* HEADER - same as vector page */}
      <header className="flex justify-between items-center px-8 py-5 bg-white border-b">
        <Link href="/" className="text-xl font-semibold">Pinna3d</Link>
        <div className="flex gap-3">
          <Link href="/signin" className="px-5 py-2 rounded-full border">Sign In</Link>
          <Link href="/signup" className="px-5 py-2 rounded-full bg-black text-white">Get Started</Link>
        </div>
      </header>

      {/* HERO */}
      <div className="max-w-[1280px] mx-auto px-8 pt-14">
        <div className="inline-flex px-4 py-1 rounded-full bg-white border text-[11px] tracking-[0.2em]">FREE BACKGROUND REMOVER • NO SIGNUP</div>
        <h1 className="mt-6 text-[48px] leading-[0.95] tracking-[-0.03em]" style={{fontWeight:400}}>
          Remove background <br/> in one click, <br/>
          <span className="text-[#999]" style={{fontWeight:400}}>transparent PNG</span> instantly
        </h1>
        <p className="mt-5 max-w-[100%] text-[17px] leading-[1.8] text-[#666]" style={{fontWeight:400}}>
          Upload any image and get a clean cutout with transparent background. Perfect for product photos, portraits, logos. Free, no watermark.
        </p>

        {/* TWO BOXES 1:1 */}
        <div className="mt-10 grid grid-cols-2 gap-6">
          {/* LEFT INPUT */}
          <div className="aspect-square bg-white rounded-[24px] border p-6 flex flex-col">
            <div className="flex justify-between text-[11px] tracking-widest text-[#999] mb-4">
              <span>INPUT</span><span>JPG • PNG • WEBP</span>
            </div>
            <div
              onClick={()=>fileRef.current?.click()}
              className="flex-1 border-2 border-dashed rounded-[16px] flex flex-col items-center justify-center cursor-pointer bg-[#fcfcfb] hover:bg-[#f8f8f6]"
            >
              {inputUrl? <img src={inputUrl} className="max-h-[70%] max-w-[70%] object-contain rounded-lg" /> : (
                <>
                  <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl">↑</div>
                  <p className="mt-4 text-[14px]">Drop image or click to upload</p>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={e=>e.target.files&&handleFile(e.target.files[0])} />
          </div>

          {/* RIGHT OUTPUT */}
          <div className="aspect-square bg-white rounded-[24px] border p-6 flex flex-col">
            <div className="flex justify-between text-[11px] tracking-widest text-[#999] mb-4">
              <span>OUTPUT</span><span>PNG TRANSPARENT</span>
            </div>
            <div className="flex-1 rounded-[16px] bg-[url('https://i.imgur.com/8Km9tLL.png')] bg-repeat flex items-center justify-center overflow-hidden relative" style={{backgroundSize:'20px'}}>
              {/* white tile fix */}
              <div className="absolute inset-0 bg-white/0" />
              {loading? <p className="animate-pulse text-sm">Removing background...</p> :
                outputUrl? <img src={outputUrl} className="max-h-[80%] max-w-[80%] object-contain relative z-10" /> :
                <div className="w-full h-[280px] flex items-center justify-center text-[48px] text-[#e5e5e5]" style={{fontWeight:400}}>vector graphic</div>
              }
            </div>
            {outputUrl && (
              <a href={outputUrl} download="pinna3d-bg-removed.png" className="mt-4 w-full py-3 rounded-full bg-black text-white text-center text-[14px]">Download PNG</a>
            )}
          </div>
        </div>

        {/* 6-BOX GRID */}
        <div className="mt-6 grid grid-cols-6 gap-4">
          {[
            ["INPUT","JPG, PNG, WEBP, 10MB max"],
            ["OUTPUT","PNG 32 transparent"],
            ["QUALITY","Edge detail preserved"],
            ["TIME","~3 sec per image"],
            ["PRIVACY","Runs in browser"],
            ["COST","Free unlimited"]
          ].map(([k,v])=>(
            <div key={k} className="bg-white rounded-[16px] border p-4">
              <p className="text-[10px] tracking-widest text-[#999]">{k}</p>
              <p className="mt-2 text-[13px] leading-[1.4]" style={{fontWeight:400}}>{v}</p>
            </div>
          ))}
        </div>

        {/* FOOTER WHY */}
        <div className="mt-20 bg-white rounded-[24px] border p-10">
          <h3 className="text-[24px]" style={{fontWeight:400}}>Why designers choose Pinna3d BG Remover</h3>
          <div className="mt-8 grid grid-cols-3 gap-8">
            <div><p className="text-[14px]" style={{fontWeight:400}}>No halo, clean edges</p><p className="text-[13px] text-[#888] mt-1 leading-[1.6]">AI keeps hair and product edges sharp.</p></div>
            <div><p className="text-[14px]" style={{fontWeight:400}}>100% private</p><p className="text-[13px] text-[#888] mt-1 leading-[1.6]">Image never leaves your browser.</p></div>
            <div><p className="text-[14px]" style={{fontWeight:400}}>Free for commercial</p><p className="text-[13px] text-[#888] mt-1 leading-[1.6]">Use for Shopify, Amazon, ads.</p></div>
          </div>
        </div>
      </div>
      <div className="h-20" />
    </div>
  );
}
