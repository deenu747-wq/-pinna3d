"use client";

export default function Home() {
  return (
    <div style={{background:'#0a0a12', minHeight:'100vh', color:'#fff', fontFamily:'Inter, system-ui, sans-serif'}}>
      
      {/* HEADER - Exact 72px height */}
      <header style={{height:'72px', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 32px', background:'#0a0a12', borderBottom:'1px solid rgba(255,255,255,0.06)', position:'sticky', top:0, zIndex:50}}>
        <div style={{display:'flex', alignItems:'center', gap:'14px'}}>
          <img src="/logo.png" alt="Pinna3d" style={{height:'44px', width:'44px', objectFit:'contain'}} />
          <div style={{display:'flex', alignItems:'baseline', lineHeight:1}}>
            <span style={{fontSize:'32px', fontWeight:800, letterSpacing:'-1.2px'}}>Pinna3d</span>
            <span style={{fontSize:'14px', fontWeight:600, color:'#a855f7', marginLeft:'2px', transform:'translateY(-8px)'}}>.com</span>
          </div>
        </div>
        <nav style={{display:'flex', alignItems:'center', gap:'28px'}}>
          <span style={{fontSize:'14px', color:'#9ca3af'}}>Features</span>
          <span style={{fontSize:'14px', color:'#a855f7', fontWeight:600}}>Pricing</span>
          <span style={{fontSize:'14px', color:'#9ca3af'}}>Docs</span>
          <span style={{fontSize:'14px', color:'#9ca3af'}}>Blog</span>
          <button style={{fontSize:'14px', padding:'8px 16px', borderRadius:'8px', background:'#2a2a35', color:'#fff', border:'1px solid rgba(255,255,255,0.1)'}}>Sign In</button>
          <button style={{fontSize:'14px', padding:'8px 18px', borderRadius:'8px', background:'#a855f7', color:'#fff', fontWeight:600, border:'none'}}>Get Started</button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section style={{display:'grid', gridTemplateColumns:'1.2fr 0.8fr 1fr', gap:'24px', padding:'48px 32px', alignItems:'start'}}>
        
        {/* Left Text */}
        <div>
          <h1 style={{fontSize:'38px', fontWeight:800, lineHeight:1.15, letterSpacing:'-0.8px', marginBottom:'16px'}}>
            Every Image to 3D or Vector in 60 Seconds
          </h1>
          <p style={{fontSize:'14px', color:'#9ca3af', lineHeight:1.6, marginBottom:'24px'}}>
            Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators in Delhi.
          </p>
          <div style={{display:'flex', gap:'12px', marginBottom:'20px'}}>
            <button style={{fontSize:'14px', padding:'12px 20px', borderRadius:'10px', background:'#a855f7', color:'#fff', fontWeight:600, border:'none', display:'flex', alignItems:'center', gap:'6px'}}>
              ✨ Start Creating — Free
            </button>
            <button style={{fontSize:'14px', padding:'12px 20px', borderRadius:'10px', background:'transparent', color:'#fff', border:'1px solid rgba(255,255,255,0.15)', display:'flex', alignItems:'center', gap:'6px'}}>
              ▶ Watch Demo
            </button>
          </div>
          <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
            {['⚡ 60s Turnaround','• 100k+ assets generated','• No credit card required','📍 Made in Delhi, India 🇮🇳'].map(t=>(
              <span key={t} style={{fontSize:'11px', padding:'4px 10px', borderRadius:'20px', background:'rgba(168,85,247,0.15)', border:'1px solid rgba(168,85,247,0.2)', color:'#d8b4fe'}}>{t}</span>
            ))}
          </div>
        </div>

        {/* Middle Drag Drop */}
        <div style={{border:'2px dashed #a855f7', borderRadius:'16px', padding:'32px 20px', textAlign:'center', background:'rgba(168,85,247,0.05)'}}>
          <div style={{width:'64px', height:'64px', margin:'0 auto 16px', background:'rgba(168,85,247,0.15)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px'}}>☁️</div>
          <h3 style={{fontSize:'16px', fontWeight:700, marginBottom:'4px'}}>Drag & drop your image here</h3>
          <p style={{fontSize:'13px', color:'#9ca3af', marginBottom:'16px'}}>or browse files to upload</p>
          <p style={{fontSize:'10px', color:'#6b7280', marginBottom:'16px'}}>Supports PNG, JPG, WEBP • Max 20MB • JPG/PNG to 3D or SVG</p>
          <div style={{fontSize:'11px', padding:'8px 12px', borderRadius:'8px', background:'rgba(0,0,0,0.4)', border:'1px solid rgba(255,255,255,0.1)', color:'#9ca3af'}}>
            Instant preview • Background removal included
          </div>
        </div>

        {/* Right 3D Preview */}
        <div style={{background:'#15151f', borderRadius:'16px', border:'1px solid rgba(255,255,255,0.08)', overflow:'hidden'}}>
          <div style={{padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
            <span style={{fontSize:'12px', color:'#9ca3af'}}>3D Viewer Preview</span>
            <span style={{fontSize:'12px'}}>🔄 ⛶ •••</span>
          </div>
          <div style={{padding:'16px', background:'radial-gradient(circle at center, #1e1e3a 0%, #0a0a12 100%)', position:'relative'}}>
            <div style={{position:'absolute', inset:'16px', background:'linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)', backgroundSize:'24px 24px', transform:'perspective(400px) rotateX(60deg)', opacity:0.5}}></div>
            <img src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400" alt="sneaker" style={{width:'100%', height:'180px', objectFit:'contain', position:'relative', zIndex:1, filter:'drop-shadow(0 0 20px rgba(168,85,247,0.6))'}} />
            <div style={{fontSize:'11px', color:'#9ca3af', marginTop:'8px', position:'relative', zIndex:1}}>Model: Sneaker_v01.glb</div>
          </div>
          <div style={{padding:'12px 16px', display:'flex', gap:'8px'}}>
            <button style={{flex:1, fontSize:'12px', padding:'8px', borderRadius:'8px', background:'transparent', border:'1px solid rgba(255,255,255,0.1)', color:'#fff'}}>Download GLB</button>
            <button style={{flex:1, fontSize:'12px', padding:'8px', borderRadius:'8px', background:'#a855f7', border:'none', color:'#fff', fontWeight:600}}>Export SVG</button>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section style={{padding:'40px 32px', borderTop:'1px solid rgba(255,255,255,0.06)', background:'#0e0e18'}}>
        <h2 style={{fontSize:'26px', fontWeight:800, textAlign:'center', marginBottom:'6px'}}>Simple, transparent pricing</h2>
        <p style={{fontSize:'14px', color:'#9ca3af', textAlign:'center', marginBottom:'32px'}}>Start free. Upgrade when you need more. Perfect for startups and studios in Delhi.</p>
        
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'20px', maxWidth:'1100px', margin:'0 auto'}}>
          {/* Free */}
          <div style={{background:'#15151f', borderRadius:'12px', padding:'24px', border:'1px solid rgba(255,255,255,0.08)'}}>
            <h3 style={{fontSize:'14px', fontWeight:600, textAlign:'center'}}>Free</h3>
            <div style={{textAlign:'center', margin:'8px 0'}}><span style={{fontSize:'32px', fontWeight:800}}>₹0</span><span style={{fontSize:'16px', color:'#9ca3af'}}> /mo</span></div>
            <p style={{fontSize:'12px', color:'#9ca3af', textAlign:'center', marginBottom:'16px'}}>For individuals trying it out</p>
            <ul style={{fontSize:'12px', listStyle:'none', padding:0, margin:0, lineHeight:2}}>
              <li>✓ 5 exports per month</li>
              <li>✓ 3D preview only</li>
              <li>✓ Standard resolution exports</li>
              <li>✓ Community support</li>
            </ul>
            <button style={{width:'100%', marginTop:'20px', padding:'10px', borderRadius:'8px', background:'transparent', border:'1px solid rgba(255,255,255,0.15)', color:'#fff', fontSize:'13px'}}>Get Started Free</button>
          </div>

          {/* Pro - Most Popular */}
          <div style={{background:'#15151f', borderRadius:'12px', padding:'24px', border:'2px solid #a855f7', position:'relative', boxShadow:'0 0 30px rgba(168,85,247,0.2)'}}>
            <div style={{position:'absolute', top:'-12px', left:'50%', transform:'translateX(-50%)', background:'#a855f7', color:'#fff', fontSize:'11px', padding:'4px 12px', borderRadius:'20px', fontWeight:600}}>⭐ Most Popular</div>
            <h3 style={{fontSize:'14px', fontWeight:600, textAlign:'center', marginTop:'8px'}}>Pro</h3>
            <div style={{textAlign:'center', margin:'8px 0'}}><span style={{fontSize:'32px', fontWeight:800}}>₹999</span><span style={{fontSize:'16px', color:'#9ca3af'}}> /mo</span></div>
            <p style={{fontSize:'12px', color:'#9ca3af', textAlign:'center', marginBottom:'16px'}}>For creators & small teams</p>
            <ul style={{fontSize:'12px', listStyle:'none', padding:0, margin:0, lineHeight:2}}>
              <li>✓ 200 exports per month</li>
              <li>✓ Full 3D + Vector export</li>
              <li>✓ HD & 4K exports</li>
              <li>✓ Priority processing ~60s</li>
              <li>✓ Commercial license</li>
            </ul>
            <button style={{width:'100%', marginTop:'20px', padding:'10px', borderRadius:'8px', background:'#a855f7', border:'none', color:'#fff', fontSize:'13px', fontWeight:600}}>Start Pro Trial</button>
          </div>

          {/* Business */}
          <div style={{background:'#15151f', borderRadius:'12px', padding:'24px', border:'1px solid rgba(255,255,255,0.08)'}}>
            <h3 style={{fontSize:'14px', fontWeight:600, textAlign:'center'}}>Business</h3>
            <div style={{textAlign:'center', margin:'8px 0'}}><span style={{fontSize:'32px', fontWeight:800}}>₹2499</span><span style={{fontSize:'16px', color:'#9ca3af'}}> /mo</span></div>
            <p style={{fontSize:'12px', color:'#9ca3af', textAlign:'center', marginBottom:'16px'}}>For teams & agencies</p>
            <ul style={{fontSize:'12px', listStyle:'none', padding:0, margin:0, lineHeight:2}}>
              <li>✓ 1000 exports per month</li>
              <li>✓ API access + bulk uploads</li>
              <li>✓ Team workspaces (5 seats)</li>
              <li>✓ Custom vector style controls</li>
              <li>✓ Priority support • Slack</li>
            </ul>
            <button style={{width:'100%', marginTop:'20px', padding:'10px', borderRadius:'8px', background:'transparent', border:'1px solid rgba(255,255,255,0.15)', color:'#fff', fontSize:'13px'}}>Contact Sales</button>
          </div>
        </div>

        <div style={{display:'flex', justifyContent:'space-between', marginTop:'32px', fontSize:'11px', color:'#6b7280', maxWidth:'1100px', margin:'32px auto 0'}}>
          <span style={{background:'rgba(168,85,247,0.15)', padding:'4px 10px', borderRadius:'20px'}}>📍 Bootstrapped from Delhi • IIT Delhi alumni</span>
          <span>Trusted by 2k+ Delhi creators • Startups from Hauz Khas • Connaught Place • Gurugram</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:'16px 32px', display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#6b7280', borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <span>© 2024 Pinna3d.com • Delhi, India • Bootstrapped</span>
        <div style={{display:'flex', gap:'16px'}}>
          <span>Privacy</span><span>Terms</span><span>Discord</span><span>Twitter/X</span>
        </div>
      </footer>
    </div>
  );
}
