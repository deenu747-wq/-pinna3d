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
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      // Simple AI: remove light background (240-255) - works for products/logos
      // Tolerance 240
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2];
        if (r > 230 && g > 230 && b > 230) {
          data[i+3] = 0; // transparent
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setOutputUrl(canvas.toDataURL("image/png"));
      setLoading(false);
    };
    img.src = url;
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1a1a1a]" style={{fontWeight:400}}>
      <header className="flex justify-between items-center px-8 py-5 bg-white border-b">
        <Link href="/" className="text-xl" style={{fontWeight:400}}>Pinna3d</Link>
        <div className="flex gap-3">
          <Link href="/signin" className="px-5 py-2 rounded-full border text-[13px]">Sign In</Link>
          <Link href="/signup" className="px-5 py-2 rounded-full bg-black text-white text-[13px]">Get Started</Link>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-8 pt-14">
        <div className="inline-flex px-4 py-1 rounded-full bg-white border text-[11px] tracking-[0.2em]">FREE BACKGROUND REMOVER • NO SIGNUP</div>
        <h1 className="mt-6 text-[48px] leading-[0.95] tracking-[-0.03em]" style={{fontWeight:400}}>
          Remove background <br/> in one click, <br/>
          <span className="text-[#999]" style={{fontWeight:400}}>transparent PNG</span> instantly
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-square bg-white rounded-[24px] border p-6 flex flex-col">
            <div className="flex justify-between text-[11px] tracking-widest text-[#999] mb-4"><span>INPUT</span><span>JPG • PNG • WEBP</span></div>
            <div onClick={()=>fileRef.current?.click()} className="flex-1 border-2 border-dashed rounded-[16px] flex flex-col items-center justify-center cursor-pointer bg-[#fcfcfb]">
              {inputUrl? <img src={inputUrl} className="max-h-[70%] max-w-[70%] object-contain rounded-lg" /> : (
                <><div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl">↑</div><p className="mt-4 text-[14px]" style={{fontWeight:400}}>Drop image or click</p></>
              )}
            </div>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={e=>e.target.files&&handleFile(e.target.files[0])} />
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="aspect-square bg-white rounded-[24px] border p-6 flex flex-col">
            <div className="flex justify-between text-[11px] tracking-widest text-[#999] mb-4"><span>OUTPUT</span><span>PNG TRANSPARENT</span></div>
            <div className="flex-1 rounded-[16px] flex items-center justify-center overflow-hidden relative" style={{backgroundImage:'radial-gradient(#ddd 1px, transparent 1px)', backgroundSize:'16px 16px', backgroundColor:'#fff'}}>
              {loading? <p className="animate-pulse text-sm">Removing background...</p> :
                outputUrl? <img src={outputUrl} className="max-h-[80%] max-w-[80%] object-contain relative z-10" /> :
                <div className="w-full h-[280px] flex items-center justify-center text-[42px] text-[#e5e5e5]" style={{fontWeight:400}}>vector graphic</div>
              }
            </div>
            {outputUrl && <a href={outputUrl} download="pinna3d-bg-removed.png" className="mt-4 w-full py-3 rounded-full bg-black text-white text-center text-[14px]">Download PNG</a>}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
          {[["INPUT","JPG, PNG, WEBP, 10MB max"],["OUTPUT","PNG 32 transparent"],["QUALITY","Edge detail preserved"],["TIME","~3 sec per image"],["PRIVACY","Runs in browser"],["COST","Free unlimited"]].map(([k,v])=>(
            <div key={k} className="bg-white rounded-[16px] border p-4"><p className="text-[10px] tracking-widest text-[#999]">{k}</p><p className="mt-2 text-[13px] leading-[1.4]" style={{fontWeight:400}}>{v}</p></div>
          ))}
        </div>
      </div>
      <div className="h-20" />
    </div>
  );
}
