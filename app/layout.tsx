export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{margin:0,background:'#0B0A14',fontFamily:'Inter, system-ui, sans-serif'}}>{children}</body>
    </html>
  )
}
