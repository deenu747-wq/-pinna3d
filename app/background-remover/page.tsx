"use client";
import { useState, useRef } from "react";
import Link from "next/link";

export default function BackgroundRemover() {
  const [inputUrl, setInputUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setInputUrl(url);
    setLoading(true);
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      canvas.width = img.width; canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i] > 235 && d[i+1] > 235 && d[i+2] > 235) d[i+3] = 0;
      }
      ctx.putImageData(imageData, 0, 0);
      setOutputUrl(canvas.toDataURL("image/png"));
      setLoading(false);
    };
    img.src = url;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="flex justify-between items-center px-8 py-5 border-b border-[#1a1a1a]">
        <Link href="/" className="text-xl font-light tracking-wide">Pinna3d</Link>
        <div className="flex gap-6 items-center text-[13px]">
          <Link href="/image-to-vector" className="text-[#888] hover:text-white">Image to Vector</Link>
          <Link href="/background-remover" className="text-white border-b border-white pb-1">Background Remover</Link>
          <Link href="/signin" className="px-5 py-2 rounded-full border border-[#2a2a2a]">Sign In</Link>
          <Link href="/signup" className="px-5 py-2 rounded-full bg-white text-black">Get Started</Link>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-8 pt-14">
        <div className="inline-flex px-4 py-1 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[11px] tracking-[0.2em] text-[#888]">FREE BACKGROUND REMOVER • NO SIGNUP</div>
        <h1 className="mt-6 text-[48px] leading-[0.95] tracking-[-0.03em] font-light">Remove background<br/>in one click,<br/><span className="text-[#555]">transparent PNG</span> instantly</h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-square bg-[#111] rounded-[24px] border border-[#1e1e1e] p-6 flex flex-col">
            <div className="flex justify-between text-[11px] tracking-widest text-[#555] mb-4"><span>INPUT</span><span>JPG • PNG • WEBP</span></div>
            <div onClick={()=>fileRef.current?.click()} className="flex-1 border border-dashed border-[#2a2a2a] rounded-[16px] flex flex-col items-center justify-center cursor-pointer hover:border-[#444]">
              {inputUrl? <img src={inputUrl} className="max-h-[70%] max-w-[70%] object-contain rounded-lg" /> : (
                <><div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-2xl">↑</div><p className="mt-4 text-[14px] text-[#aaa] font-light">Drop image or click</p></>
              )}
            </div>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={e=>e.target.files&&handleFile(e.target.files[0])} />
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="aspect-square bg-[#111] rounded-[24px] border border-[#1e1e1e] p-6 flex flex-col">
            <div className="flex justify-between text-[11px] tracking-widest text-[#555] mb-4"><span>OUTPUT</span><span>PNG TRANSPARENT</span></div>
            <div className="flex-1 rounded-[16px] flex items-center justify-center overflow-hidden bg-[#0f0f0f]" style={{backgroundImage:'radial-gradient(#222 1px, transparent 1px)', backgroundSize:'16px 16px'}}>
              {loading? <p className="animate-pulse text-sm text-[#666]">Removing background...</p> : outputUrl? <img src={outputUrl} className="max-h-[80%] max-w-[80%] object-contain" /> : <div className="text-[42px] text-[#222] font-light">vector graphic</div>}
            </div>
            {outputUrl && <a href={outputUrl} download="pinna3d-bg-removed.png" className="mt-4 w-full py-3 rounded-full bg-white text-black text-center text-[14px]">Download PNG</a>}
          </div>
        </div>
      </div>
    </div>
  );
}
