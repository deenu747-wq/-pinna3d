"use client"
import { useState } from 'react'

export default function Page(){
  const [tab, setTab] = useState('text3d')
  const tabs = [
    {id:'text3d', label:'Text to 3D'},
    {id:'image3d', label:'Image to 3D'},
    {id:'multi', label:'Multi-Image'},
    {id:'texture', label:'Text to Texture'},
    {id:'vector', label:'Image to Vector ★ New'},
    {id:'template', label:'Template Studio ★ New'},
  ]
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white selection:bg-purple-500/30">
      {/* NAV LIKE MESHY */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0A0A0F]/80 border-b border-white/[0.06] px-6 md:px-10 h-[64px] flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-[18px]"><div className="w-7 h-7 bg-white text-black rounded-md flex items-center justify-center">◈</div> Pinna3d</div>
          <div className="hidden lg:flex gap-6 text-[13px] text-white/50"><span className="text-white">Create</span><span>Explore</span><span>API</span><span>Pricing</span></div>
        </div>
        <div className="flex items-center gap-3"><button className="text-[13px] text-white/60">Sign in</button><button className="px-5 h-8 bg-white text-black rounded-full text-[13px] font-semibold">Get Started Free</button></div>
      </nav>

      {/* MAIN CREATOR LIKE MESHY */}
      <div className="grid lg:grid-cols-[420px_1fr_340px] min-h-[calc(100vh-64px)]">
        {/* LEFT - PROMPT */}
        <div className="border-r border-white/[0.06] p-5 flex flex-col gap-5 bg-[#101015]">
          <div className="flex flex-wrap gap-1.5 p-1 bg-black/40 rounded-full border border-white/5">
            {tabs.map(t=> <button key={t.id} onClick={()=>setTab(t.id)} className={`px-3 py-1.5 rounded-full text-[11px] transition ${tab===t.id?'bg-white text-black font-semibold':'text-white/50 hover:text-white'}`}>{t.label}</button>)}
          </div>

          {tab==='text3d' && <>
            <div className="space-y-3"><label className="text-[11px] text-white/40 uppercase tracking-widest">Prompt</label><textarea className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-3 text-[13px] outline-none focus:border-purple-500/50" placeholder="A cute dragon wearing sneakers, high detail, PBR textures..."></textarea></div>
            <div className="grid grid-cols-2 gap-3"><div><label className="text-[10px] text-white/30">Style</label><select className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg h-9 text-[12px] px-2"><option>Realistic</option><option>Cartoon</option><option>Cyberpunk</option><option>Low Poly</option></select></div><div><label className="text-[10px] text-white/30">Polycount</label><select className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg h-9 text-[12px] px-2"><option>30K (Recommended)</option><option>10K</option><option>100K</option></select></div></div>
            <button className="w-full h-11 bg-white text-black rounded-full font-semibold text-[13px] mt-2">Generate 3D — 20 Credits ✦</button>
            <p className="text-[10px] text-white/20 text-center">Preview in ~30s • Textured in ~60s</p>
          </>}

          {tab==='image3d' && <>
            <div className="border border-dashed border-purple-500/40 bg-purple-500/5 rounded-xl h-40 flex flex-col items-center justify-center gap-2"><span className="text-xl">🖼️</span><span className="text-[12px]">Drop image or click</span><span className="text-[10px] text-white/30">PNG/JPG/WEBP • Auto background removal</span></div>
            <button className="w-full h-11 bg-white text-black rounded-full font-semibold text-[13px]">Generate from Image — 20 Credits</button>
          </>}

          {tab==='vector' && <>
            <div className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-xl p-4"><p className="text-[12px] font-semibold">Image to Vector — Extra Power over Meshy</p><p className="text-[11px] text-white/40 mt-1">Instant browser conversion. No credits for preview, 1 credit for export.</p></div>
            <div className="border border-dashed border-white/10 rounded-xl h-32 flex items-center justify-center text-[12px] text-white/40">Drop JPG/PNG → Get SVG/EPS/PDF/AI</div>
            <div className="grid grid-cols-4 gap-2 text-[10px]">{['SVG','EPS','PDF','AI'].map(f=><div key={f} className="h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">{f}</div>)}</div>
            <button className="w-full h-11 bg-violet-600 rounded-full font-semibold text-[13px]">Vectorize — 1 Credit</button>
          </>}

          {tab==='template' && <>
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-4"><p className="text-[12px] font-semibold">Prompt to Banner/Template — NEW REVENUE</p><p className="text-[11px] text-white/40 mt-1">Any size. One prompt.</p></div>
            <textarea className="w-full h-24 bg-black/50 border border-white/10 rounded-xl p-3 text-[13px]" placeholder="Diwali Sale 50% OFF, modern, neon, bold text..."></textarea>
            <div className="grid grid-cols-3 gap-2 text-[10px]">{['Insta Post 1080x1080','Story 1080x1920','YT Thumb 1280x720','Shopify 1920x600','Logo 1024x1024','PPT 16:9'].map(s=><button key={s} className="p-2 bg-white/5 border border-white/10 rounded-lg text-left leading-tight">{s}</button>)}</div>
            <button className="w-full h-11 bg-emerald-500 text-black rounded-full font-semibold text-[13px]">Generate Template — 5 Credits</button>
          </>}

          {(tab==='multi'||tab==='texture') && <div className="text-[12px] text-white/30 py-10 text-center">Same as Meshy — Multi-Image (3-4 angles) and Text to Texture modes. Build after main tabs live.</div>}
        </div>

        {/* CENTER - VIEWER */}
        <div className="bg-[#0E0E12] flex flex-col relative">
          <div className="h-10 border-b border-white/[0.06] flex items-center justify-between px-4 text-[11px] text-white/30"><span>Viewer • PBR • Wireframe • 4K</span><span className="flex gap-2"><span className="px-2 py-1 bg-white/5 rounded">HD</span><span className="px-2 py-1 bg-white/5 rounded">Wire</span></span></div>
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            <div className="text-[80px]">👟</div><p className="text-[12px] text-white/20">Your generated asset appears here • 360° + AR</p>
            <div className="flex gap-2 text-[10px]">{['GLB','FBX','OBJ','STL','3MF','USDZ','BLEND'].map(f=><span key={f} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full">{f}</span>)}</div>
          </div>
          <div className="p-4 border-t border-white/[0.06] grid grid-cols-3 gap-2"><button className="h-9 bg-white/5 border border-white/10 rounded-full text-[12px]">Remesh</button><button className="h-9 bg-white/5 border border-white/10 rounded-full text-[12px]">Rig & Animate</button><button className="h-9 bg-white text-black rounded-full text-[12px] font-semibold">Download All 7</button></div>
        </div>

        {/* RIGHT - PROPERTIES */}
        <div className="border-l border-white/[0.06] p-5 bg-[#101015] space-y-5">
          <div><p className="text-[11px] text-white/40 uppercase">Model Info</p><div className="mt-2 space-y-1.5 text-[11px] text-white/60"><div className="flex justify-between"><span>Polygons</span><span>30,240</span></div><div className="flex justify-between"><span>Watertight</span><span className="text-emerald-400">✓ 97% Print Ready</span></div><div className="flex justify-between"><span>Textures</span><span>PBR 4K</span></div></div></div>
          <div className="h-px bg-white/5"></div>
          <div><p className="text-[11px] text-white/40 uppercase">Export</p><div className="mt-3 grid grid-cols-2 gap-2 text-[11px]"><button className="h-9 bg-white/5 rounded-lg">GLB</button><button className="h-9 bg-white/5 rounded-lg">FBX</button><button className="h-9 bg-white/5 rounded-lg">OBJ</button><button className="h-9 bg-white/5 rounded-lg">STL</button></div><button className="w-full mt-3 h-9 bg-white/5 rounded-lg text-[11px]">Download USDZ + BLEND + 3MF</button></div>
          <div className="h-px bg-white/5"></div>
          <div className="rounded-xl bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-purple-500/20 p-3"><p className="text-[11px] font-semibold">Why Pinna3d over Meshy?</p><ul className="text-[10px] text-white/50 mt-2 space-y-1"><li>✓ Same 7 formats + PBR + Rigging</li><li>★ + Vector SVG/EPS/PDF/AI (Meshy no)</li><li>★ + Banner/Template Generator (Meshy no)</li><li>✓ Cheaper: ₹999 vs $20</li></ul></div>
        </div>
      </div>

      {/* PRICING - MESHY STYLE CREDITS */}
      <section className="border-t border-white/[0.06] px-6 md:px-10 py-16 bg-[#0A0A0F]">
        <h2 className="text-center text-2xl font-bold">Credits, not limits</h2><p className="text-center text-[12px] text-white/40 mt-2">Like Meshy — pay for what you use. Retries included.</p>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mt-8">
          <div className="rounded-2xl bg-[#14141B] border border-white/10 p-6"><p className="text-[11px] text-white/40">FREE</p><p className="text-3xl font-bold mt-2">₹0 <span className="text-[12px] font-normal text-white/30">100 credits</span></p><ul className="text-[12px] text-white/60 mt-5 space-y-2"><li>✓ ~5 full 3D models</li><li>✓ 10 downloads/mo</li><li>✓ All 7 formats</li><li>✓ CC BY license</li><li>✓ Vector 50 exports</li></ul><button className="w-full mt-6 h-10 rounded-full border border-white/10 text-[12px]">Start Free</button></div>
          <div className="rounded-2xl bg-[#1A142B] border border-purple-500/40 p-6 relative"><div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-[10px] px-3 py-1 rounded-full">Most Popular</div><p className="text-[11px] text-white/40">PRO</p><p className="text-3xl font-bold mt-2">₹999 <span className="text-[12px] font-normal text-white/30">1000 credits</span></p><ul className="text-[12px] text-white/60 mt-5 space-y-2"><li>✓ ~50 models (Text/Image/Multi)</li><li>✓ Unlimited downloads</li><li>✓ Private, commercial license</li><li>✓ 4K PBR + Remesh + Rig</li><li>✓ Vector unlimited</li><li>✓ Template 100 banners</li><li>✓ API access</li></ul><button className="w-full mt-6 h-10 rounded-full bg-white text-black font-semibold text-[12px]">Go Pro — 20 credits = 1 model</button></div>
          <div className="rounded-2xl bg-[#14141B] border border-white/10 p-6"><p className="text-[11px] text-white/40">BUSINESS</p><p className="text-3xl font-bold mt-2">₹2499 <span className="text-[12px] font-normal text-white/30">4000 credits</span></p><ul className="text-[12px] text-white/60 mt-5 space-y-2"><li>✓ ~200 models</li><li>✓ 10 concurrent tasks</li><li>✓ 60% faster + priority</li><li>✓ Team 5 seats</li><li>✓ Vector + Template unlimited</li><li>✓ Razorpay + GST invoice</li></ul><button className="w-full mt-6 h-10 rounded-full border border-white/10 text-[12px]">Contact Sales</button></div>
        </div>
        <p className="text-center text-[10px] text-white/20 mt-6">Text to 3D = 20 credits • Image to 3D = 20 • Texture = 5 • Rig = 3 • Vector = 1 • Template = 5 • Credits reset monthly, no rollover</p>
      </section>
    </div>
  )
}
