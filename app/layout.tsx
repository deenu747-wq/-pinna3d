import "./globals.css";

export const metadata = {
  title: "Pinna3d - Text to 3D, Image to 3D, Vector, Template",
  description: "Meshy.ai alternative + Vector + Banner generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
