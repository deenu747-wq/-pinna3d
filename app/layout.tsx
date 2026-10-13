import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pinna3D.com",
  description: "Image to 3D - Every Image to 3D or Vector in 60 Seconds",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0, background:'#0A0A0A'}} className="bg-[#0A0A0A] text-white antialiased">

        {/* HEADER LOCKED - From BG Remover Screenshot */}
        <header className="h-[64px] px-6 flex items-center justify-between bg-[#0A0A0A] border-b border-white/[0.06] sticky top-0 z-50">
          {/* Logo 100px as you marked */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-[100px] h-[28px] flex items-center gap-2">
              <span className="w-6 h-6 bg-[#A020F0] rounded-sm flex items-center justify-center">◆</span>
              <span className="font-bold text-[16px]">Pinna3d.com</span>
            </div>
          </Link>

          <nav className="flex items-center gap-6 text-[12.5px] text-white/70">
            <span>Features</span>
            <span className="text-[#A020F0] font-medium">Pricing</span>
            <span>Docs</span>
            <span>Blog</span>
            <Link href="/signin" className="px-4 py-1.5 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] text-white/80">Sign In</Link>
            <Link href="/signup" className="px-4 py-1.5 rounded-full bg-[#A020F0] text-white font-medium shadow-[0_0_20px_rgba(160,32,240,0.4)]">Get Started</Link>
          </nav>
        </header>

        {/* TABS BAR - Clean placement as BG Remover screenshot */}
        <div className="px-6 py-3 flex gap-2 bg-[#0F0F0F] border-b border-white/[0.05] overflow-x-auto">
          <Link href="/" className="px-3.5 py-1.5 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] text-[11.5px] whitespace-nowrap">Image to 3D</Link>
          <Link href="/multi-image" className="px-3.5 py-1.5 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] text-[11.5px] whitespace-nowrap">Multi-Image to 3D</Link>
          <Link href="/image-to-vector" className="px-3.5 py-1.5 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] text-[11.5px] whitespace-nowrap">Image to Vector <span className="ml-1 text-[9px] bg-[#A020F0] px-1 rounded">NEW</span></Link>
          <Link href="/background-remover" className="px-3.5 py-1.5 rounded-full bg-[#A020F0] text-[11.5px] whitespace-nowrap font-medium">Background Remover <span className="ml-1 text-[9px] bg-white/20 px-1 rounded">NEW</span></Link>
        </div>

        <main>{children}</main>

        {/* FOOTER LOCKED - From Image to Vector Screenshot, NOT Homepage */}
        <footer className="border-t border-white/[0.06] bg-[#0A0A0A] mt-16">
          <div className="max-w-[1280px] mx-auto px-6 py-10">
            <h3 className="text-center text-[15px] font-semibold">Why designers choose our Vector Studio</h3>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="p-5 rounded-[14px] bg-[#151515] border border-white/[0.06]">
                <p className="text-[13px] font-medium">True Vector, Not Auto Trace</p>
                <p className="text-[11px] text-white/40 mt-1">Clean scalable paths, not pixel tracing</p>
              </div>
              <div className="p-5 rounded-[14px] bg-[#151515] border border-white/[0.06]">
                <p className="text-[13px] font-medium">Infinite Scalability</p>
                <p className="text-[11px] text-white/40 mt-1">From icon to billboard, no loss</p>
              </div>
              <div className="p-5 rounded-[14px] bg-[#151515] border border-white/[0.06]">
                <p className="text-[13px] font-medium">Professional Output</p>
                <p className="text-[11px] text-white/40 mt-1">SVG, EPS, PDF ready for print</p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button className="px-6 py-2.5 rounded-full bg-[#A020F0] text-[13px] font-medium">Start Vectorizing Free — No CC</button>
            </div>
            <p className="text-center text-[11px] text-white/30 mt-8">© 2025 Pinna3d.com - Image to Vector Tool</p>
          </div>
        </footer>

      </body>
    </html>
  );
}
