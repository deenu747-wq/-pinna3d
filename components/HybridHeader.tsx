"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tools = [
  { name: "Remove Background", href: "/remove-background", new: false },
  { name: "Image to Vector", href: "/image-to-vector", new: true },
  { name: "Image to 3D", href: "/image-to-3d", active: true },
  { name: "Multi-Image to 3D", href: "/multi-image-to-3d" },
  { name: "Text to 3D", href: "/text-to-3d" },
  { name: "Text to Texture", href: "/text-to-texture" },
  { name: "Template Studio", href: "/template-studio", new: true },
  { name: "Image Upscaler", href: "/upscaler" },
];

export default function HybridHeader() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-[#0A0A0F] sticky top-0 z-[9999] border-b border-white/[0.06]">
      {/* ROW 1 - Main */}
      <div className="max-w-[1440px] mx-auto px-6 h-[60px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Pinna3D" className="h-[30px] w-auto" onError={(e)=>{e.currentTarget.style.display='none'}} />
          <span className="text-white font-bold text-[20px] flex items-center">
            <span className="w-7 h-7 rounded bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-[14px] mr-2">⬡</span>
            Pinna3d<span className="text-violet-500 text-[12px] ml-[1px]">.com</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-5 text-[13px]">
            <Link href="/#features" className="text-white/60 hover:text-white">Features</Link>
            <Link href="/pricing" className="text-violet-400">Pricing</Link>
            <Link href="/docs" className="text-white/60 hover:text-white">Docs</Link>
            <Link href="/blog" className="text-white/60 hover:text-white">Blog</Link>
          </nav>
          <Link href="/login" className="text-[12px] px-3 py-1.5 rounded-md bg-white/10 text-white hover:bg-white/20">Sign In</Link>
          <Link href="/app" className="text-[12px] px-4 py-1.5 rounded-md bg-[#a855f7] text-white font-medium hover:bg-[#9333ea]">Get Started</Link>
        </div>
      </div>

      {/* ROW 2 - Tools Pills - CLEAN like you marked green */}
      <div className="w-full bg-[#0A0A0F] border-t border-white/[0.05]">
        <div className="max-w-[1440px] mx-auto px-6 h-[48px] flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {tools.map((t) => {
            const isActive = pathname === t.href || (t.active && pathname === "/");
            return (
              <Link
                key={t.name}
                href={t.href}
                className={`whitespace-nowrap text-[11px] px-3.5 py-1.5 rounded-full border transition
                  ${isActive
                   ? "bg-[#a855f7] border-[#a855f7] text-white"
                    : "border-white/10 text-white/60 hover:text-white hover:border-white/20 bg-transparent"}
                  ${t.name === "Image to Vector"? "!border-violet-500/50!text-violet-400" : ""}
                `}
              >
                {t.name} {t.new && "★ NEW"}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
