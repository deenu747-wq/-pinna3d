import "./globals.css"

export const metadata = {
  title: "Pinna3d.com - Every Image to 3D or Vector in 60 Seconds",
  description: "Transform photos into production-ready 3D models & scalable vectors instantly. Built in Delhi, India.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0,background:'#0B0A14'}}>{children}</body>
    </html>
  )
}
