export default function PhotoStudioPage() {
  return (
    <div style={{background:'#0A0814',color:'#fff',fontFamily:'Inter, system-ui',minHeight:'100vh'}}>

      {/* HEADER - 100% LOCKED - DON'T CHANGE */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)',background:'rgba(10,8,20,0.92)',backdropFilter:'blur(16px)',position:'sticky',top:0,zIndex:50}}>
        <a href="/"><img src="/logo.png" alt="Pinna3d.com" style={{height:'80px',width:'auto'}}/></a>
        <div style={{display:'flex',gap:'20px',alignItems:'center',fontSize:'14px'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>Home</a>
          <span style={{color:'#A020F0'}}>Photo Studio</span>
          <a href="/signin" style={{background:'rgba(255,255,255,0.1)',padding:'10px 18px',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.14)',color:'#fff',textDecoration:'none'}}>Sign In</a>
          <a href="/signup" style={{background:'#A020F0',padding:'10px 20px',borderRadius:'10px',color:'#fff',textDecoration:'none'}}>Get Started</a>
        </div>
      </header>

      {/* STUDIO CONTENT - CHANGE HERE ONLY */}
      <div style={{padding:'60px 40px',textAlign:'center'}}>
        <h1 style={{fontSize:'48px'}}>Photo Studio - Coming Soon</h1>
        <p style={{color:'rgba(255,255,255,0.6)'}}>Content will go here</p>
      </div>

      {/* FOOTER - 100% LOCKED STRUCTURE - DON'T CHANGE LAYOUT */}
      <footer style={{borderTop:'1px solid rgba(255,255,255,0.08)',padding:'20px 40px',textAlign:'center',fontSize:'12px',color:'rgba(255,255,255,0.4)'}}>
        © 2026 Pinna3d.com • Photo Studio
      </footer>

    </div>
  )
}
