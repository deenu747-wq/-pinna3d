import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pinna3D.com",
  description: "Image to 3D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0, background:'#0B0A14'}}>{children}</body>
    </html>
  );
}
