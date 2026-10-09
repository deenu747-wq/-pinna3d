import type { Metadata } from "next";
import "./globals.css";
import HybridHeader from "../components/HybridHeader";

export const metadata: Metadata = {
  title: "Pinna3D - Hybrid PhotoRoom",
  description: "PhotoRoom + Meshy hybrid",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0F] text-white antialiased">
        <HybridHeader />
        {children}
      </body>
    </html>
  );
}
