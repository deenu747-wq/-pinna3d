import type { Metadata } from "next";
import "./globals.css";
import HybridHeader from "../components/HybridHeader";

export const metadata: Metadata = {
  title: "Pinna3D - Hybrid PhotoRoom + Meshy",
  description: "Pinna3D - 2D + Vector + 3D in one website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <HybridHeader />
        {children}
      </body>
    </html>
  );
}
