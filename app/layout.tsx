import type { Metadata } from "next";
import "./globals.css";
import HybridHeader from "../components/HybridHeader";

export const metadata: Metadata = {
  title: "Pinna3D.com",
  description: "Image to 3D, Vector, Background Removal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0F] antialiased">
        <HybridHeader />
        {children}
      </body>
    </html>
  );
}
