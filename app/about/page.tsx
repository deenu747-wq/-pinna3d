export default function AboutPage(){
  return(
    <div style={{background:'#050510',color:'#fff',minHeight:'100vh',fontFamily:'Inter, system-ui'}}>
      <style>{`
       .about-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.08)}
       .about-card{padding:28px 24px;position:relative;overflow:hidden;min-height:380px;display:flex;flex-direction:column}
        @media(max-width:1000px){.about-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:640px){.about-grid{grid-template-columns:1fr}}
      `}</style>

      <header style={{padding:'14px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid rgba(255,255,255,0.08)',position:'sticky',top:0,background:'rgba(5,5,16,0.9)',backdropFilter:'blur(16px)',zIndex:10}}>
        <a href="/"><img src="/logo.png" style={{height:'100px'}} alt="logo"/></a>
        <a href="/" style={{color:'#A020F0',textDecoration:'none',fontSize:'13px',border:'1px solid rgba(160,32,240,0.3)',padding:'8px 16px',borderRadius:'20px'}}>← Back to Home</a>
      </header>

      <div style={{textAlign:'center',padding:'50px 24px 30px',maxWidth:'800px',margin:'0 auto'}}>
        <h1 style={{fontSize:'42px',fontWeight:700,margin:0}}>About Pinna3D</h1>
        <p style={{color:'rgba(255,255,255,0.6)',marginTop:'12px'}}>Six powerful studios. One creative platform. Built for designers, sellers, and creators worldwide.</p>
      </div>

      <div style={{maxWidth:'1440px',margin:'0 auto',padding:'0 12px 60px'}}>
        <div className="about-grid">
          {/* PHOTO STUDIO */}
          <div className="about-card" style={{background:'radial-gradient(600px 300px at 100% 0%, rgba(120,80,255,0.25), transparent), linear-gradient(180deg,#0e0e2a 0%,#07071a 100%)'}}>
            <div style={{display:'flex',gap:'10px',alignItems:'center'}}><span style={{width:'36px',height:'36px',background:'rgba(167,139,250,0.15)',border:'1px solid rgba(167,139,250,0.3)',borderRadius:'10px',display:'grid',placeItems:'center'}}>📷</span><h3 style={{margin:0,fontSize:'24px'}}><span style={{color:'#fff'}}>Photo</span> <span style={{color:'#A78BFA'}}>Studio</span></h3></div>
            <p style={{color:'rgba(255,255,255,0.65)',fontSize:'13px',lineHeight:1.5,margin:'14px 0 20px',maxWidth:'280px'}}>Turn your photos into stunning visuals with powerful editing tools, filters and effects.</p>
            <div style={{display:'grid',gap:'12px',marginTop:'auto'}}>
              {[
                {i:"◫",t:"Edit"},{i:"✦",t:"Enhance"},{i:"◎",t:"Filter"},{i:"⤢",t:"Transform"}
              ].map(f=><div key={f.t} style={{display:'flex',gap:'10px',alignItems:'center',fontSize:'13px',color:'rgba(255,255,255,0.8)'}}><span style={{width:'28px',height:'28px',background:'rgba(255,255,255,0.06)',borderRadius:'8px',display:'grid',placeItems:'center'}}>{f.i}</span>{f.t}</div>)}
            </div>
            <div style={{position:'absolute',right:'10px',top:'90px',width:'180px',height:'220px',background:'linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',transform:'rotate(4deg)',overflow:'hidden'}}><div style={{width:'100%',height:'100%',background:'url(https://i.pravatar.cc/300?img=32) center/cover'}}/></div>
          </div>

          {/* VECTOR STUDIO */}
          <div className="about-card" style={{background:'radial-gradient(500px 300px at 0% 0%, rgba(16,185,129,0.25), transparent), linear-gradient(180deg,#021a14 0%,#03120f 100%)'}}>
            <div style={{display:'flex',gap:'10px',alignItems:'center'}}><span style={{width:'36px',height:'36px',background:'rgba(52,211,153,0.15)',border:'1px solid rgba(52,211,153,0.3)',borderRadius:'10px',display:'grid',placeItems:'center'}}>✒️</span><h3 style={{margin:0,fontSize:'24px'}}><span style={{color:'#fff'}}>Vector</span> <span style={{color:'#34D399'}}>Studio</span></h3></div>
            <p style={{color:'rgba(255,255,255,0.65)',fontSize:'13px',lineHeight:1.5,margin:'14px 0 20px',maxWidth:'280px'}}>Create crisp, scalable vector graphics for logos, icons, illustrations and more.</p>
            <div style={{display:'grid',gap:'12px',marginTop:'auto'}}>
              {[
                {t:"Logos"},{t:"Icons"},{t:"Illustrations"},{t:"Scalable"}
              ].map(f=><div key={f.t} style={{display:'flex',gap:'10px',alignItems:'center',fontSize:'13px',color:'rgba(255,255,255,0.8)'}}><span style={{width:'28px',height:'28px',background:'rgba(52,211,153,0.1)',border:'1px solid rgba(52,211,153,0.2)',borderRadius:'8px',display:'grid',placeItems:'center'}}>◐</span>{f.t}</div>)}
            </div>
            <div style={{position:'absolute',right:'20px',top:'100px',width:'160px',height:'160px',background:'radial-gradient(circle at 30% 30%, #34D399, #059669)',borderRadius:'50% 50% 50% 50% / 60% 60% 40% 40%',display:'grid',placeItems:'center',fontSize:'60px',transform:'rotate(-10deg)'}}>🦜</div>
          </div>

          {/* 3D STUDIO */}
          <div className="about-card" style={{background:'radial-gradient(500px 300px at 100% 0%, rgba(59,130,246,0.25), transparent), linear-gradient(180deg,#0a1028 0%,#070b1a 100%)'}}>
            <div style={{display:'flex',gap:'10px',alignItems:'center'}}><span style={{width:'36px',height:'36px',background:'rgba(96,165,250,0.15)',border:'1px solid rgba(96,165,250,0.3)',borderRadius:'10px',display:'grid',placeItems:'center'}}>🧊</span><h3 style={{margin:0,fontSize:'24px'}}><span style={{color:'#fff'}}>3D</span> <span style={{color:'#60A5FA'}}>Studio</span></h3></div>
            <p style={{color:'rgba(255,255,255,0.65)',fontSize:'13px',lineHeight:1.5,margin:'14px 0 20px',maxWidth:'260px'}}>Bring your ideas to life with stunning 3D models, characters and scenes.</p>
            <div style={{display:'grid',gap:'12px',marginTop:'auto'}}>
              {["3D Models","Characters","Scenes","High Quality"].map(f=><div key={f} style={{display:'flex',gap:'10px',alignItems:'center',fontSize:'13px',color:'rgba(255,255,255,0.8)'}}><span style={{width:'28px',height:'28px',background:'rgba(96,165,250,0.1)',border:'1px solid rgba(96,165,250,0.2)',borderRadius:'8px',display:'grid',placeItems:'center'}}>⬢</span>{f}</div>)}
            </div>
            <div style={{position:'absolute',right:'0px',top:'80px',width:'140px',height:'200px',background:'url(https://i.pravatar.cc/300?img=68) center/cover',borderRadius:'20px',border:'2px solid rgba(96,165,250,0.3)'}}/>
          </div>

          {/* MOTION STUDIO */}
          <div className="about-card" style={{background:'radial-gradient(500px 300px at 0% 100%, rgba(251,146,60,0.25), transparent), linear-gradient(180deg,#1a0f00 0%,#0f0a00 100%)'}}>
            <div style={{display:'flex',gap:'10px',alignItems:'center'}}><span style={{width:'36px',height:'36px',background:'rgba(251,146,60,0.15)',border:'1px solid rgba(251,146,60,0.3)',borderRadius:'10px',display:'grid',placeItems:'center'}}>▶️</span><h3 style={{margin:0,fontSize:'24px'}}><span style={{color:'#fff'}}>Motion</span> <span style={{color:'#FB923C'}}>Studio</span></h3></div>
            <p style={{color:'rgba(255,255,255,0.65)',fontSize:'13px',lineHeight:1.5,margin:'14px 0 20px',maxWidth:'280px'}}>Create dynamic videos and animations that bring your stories to life.</p>
            <div style={{display:'grid',gap:'12px',marginTop:'auto'}}>
              {["Animation","Transitions","Effects","Export"].map(f=><div key={f} style={{display:'flex',gap:'10px',alignItems:'center',fontSize:'13px',color:'rgba(255,255,255,0.8)'}}><span style={{width:'28px',height:'28px',background:'rgba(251,146,60,0.1)',border:'1px solid rgba(251,146,60,0.2)',borderRadius:'8px',display:'grid',placeItems:'center'}}>▶</span>{f}</div>)}
            </div>
          </div>

          {/* MOCKUP STUDIO */}
          <div className="about-card" style={{background:'radial-gradient(500px 300px at 100% 100%, rgba(168,85,247,0.25), transparent), linear-gradient(180deg,#150a28 0%,#0e061a 100%)'}}>
            <div style={{display:'flex',gap:'10px',alignItems:'center'}}><span style={{width:'36px',height:'36px',background:'rgba(168,85,247,0.15)',border:'1px solid rgba(168,85,247,0.3)',borderRadius:'10px',display:'grid',placeItems:'center'}}>🖥️</span><h3 style={{margin:0,fontSize:'24px'}}><span style={{color:'#fff'}}>Mockup</span> <span style={{color:'#A855F7'}}>Studio</span></h3></div>
            <p style={{color:'rgba(255,255,255,0.65)',fontSize:'13px',lineHeight:1.5,margin:'14px 0 20px',maxWidth:'280px'}}>Showcase your designs in realistic mockups and professional scenes.</p>
            <div style={{display:'grid',gap:'12px',marginTop:'auto'}}>
              {["Devices","Packaging","Apparel","Branding"].map(f=><div key={f} style={{display:'flex',gap:'10px',alignItems:'center',fontSize:'13px',color:'rgba(255,255,255,0.8)'}}><span style={{width:'28px',height:'28px',background:'rgba(168,85,247,0.1)',border:'1px solid rgba(168,85,247,0.2)',borderRadius:'8px',display:'grid',placeItems:'center'}}>◫</span>{f}</div>)}
            </div>
          </div>

          {/* TEMPLATE MAKER */}
          <div className="about-card" style={{background:'radial-gradient(500px 300px at 0% 0%, rgba(56,189,248,0.25), transparent), linear-gradient(180deg,#051a2e 0%,#020f1a 100%)'}}>
            <div style={{display:'flex',gap:'10px',alignItems:'center'}}><span style={{width:'36px',height:'36px',background:'rgba(56,189,248,0.15)',border:'1px solid rgba(56,189,248,0.3)',borderRadius:'10px',display:'grid',placeItems:'center'}}>📄</span><h3 style={{margin:0,fontSize:'24px'}}><span style={{color:'#fff'}}>Template</span> <span style={{color:'#38BDF8'}}>Maker</span></h3></div>
            <p style={{color:'rgba(255,255,255,0.65)',fontSize:'13px',lineHeight:1.5,margin:'14px 0 20px',maxWidth:'280px'}}>Design beautiful layouts and ready-to-use templates in minutes.</p>
            <div style={{display:'grid',gap:'12px',marginTop:'auto'}}>
              {["Social Media","Presentations","Posters","Documents"].map(f=><div key={f} style={{display:'flex',gap:'10px',alignItems:'center',fontSize:'13px',color:'rgba(255,255,255,0.8)'}}><span style={{width:'28px',height:'28px',background:'rgba(56,189,248,0.1)',border:'1px solid rgba(56,189,248,0.2)',borderRadius:'8px',display:'grid',placeItems:'center'}}>▭</span>{f}</div>)}
            </div>
          </div>
        </div>

        <div style={{textAlign:'center',marginTop:'40px'}}>
          <a href="/" style={{display:'inline-block',background:'#A020F0',padding:'12px 28px',borderRadius:'10px',color:'#fff',textDecoration:'none',fontWeight:600,boxShadow:'0 0 20px rgba(160,32,240,0.4)'}}>Start Creating Free →</a>
        </div>
      </div>
    </div>
  )
}
