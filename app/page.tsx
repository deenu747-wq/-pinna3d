"use client"
import { useState, useRef } from "react"

export default function Page(){
  const [preview,setPreview]=useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const onFile = (e:any)=>{
    const f = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if(!f) return
    setPreview(URL.createObjectURL(f))
  }

  return (
    <div style={{background:'#121019',color:'#EDECF2',fontFamily:'Inter, ui-sans-serif, system-ui',minHeight:'100vh',WebkitFontSmoothing:'antialiased',MozOsxFontSmoothing:'grayscale',textRendering:'optimizeLegibility'}}>

      {/* NAV */}
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 36px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',fontSize:'26px',fontWeight:600,letterSpacing:'-0.03em'}}>
          <div style={{width:'34px',height:'34px',background:'#A020F0',borderRadius:'8px',display:'grid',placeItems:'center',fontSize:'18px'}}>⬣</div>
          <span>Pinna3d<span style={{fontSize:'12px',color:'#A020F0',marginLeft:'3px',fontWeight:500,verticalAlign:'super'}}>.com</span></span>
        </div>
        <div style={{display:'flex',gap:'28px',alignItems:'center',fontSize:'14px',fontWeight:400}}>
          <span style={{color:'rgba(255,255,255,0.55)'}}>Features</span>
          <span style={{color:'#A020F0',fontWeight:500}}>Pricing</span>
          <span style={{color:'rgba(255,255,255,0.55)'}}>Docs</span>
          <span style={{color:'rgba(255,255,255,0.55)'}}>Blog</span>
          <button style={{background:'#2A2A36',border:'1px solid rgba(255,255,255,0.1)',padding:'8px 18px',borderRadius:'8px',color:'#fff',fontSize:'14px',fontWeight:400}}>Sign In</button>
          <button style={{background:'#A020F0',border:'none',padding:'8px 18px',borderRadius:'8px',color:'#fff',fontSize:'14px',fontWeight:500}}>Get Started</button>
        </div>
      </header>

      {/* HERO - 3 CIRCLED EXACT AS SCREENSHOT + 1PT BIGGER SHARP FONT */}
      <div style={{display:'grid',gridTemplateColumns:'1.2fr 0.9fr 1fr',gap:'20px',padding:'34px 36px',maxWidth:'1340px',margin:'0 auto'}}>
        <div>
          <h1 style={{fontSize:'37px',lineHeight:'1.15',fontWeight:600,letterSpacing:'-0.02em',margin:0,color:'#fff'}}>Every Image to 3D or Vector<br/>in 60 Seconds</h1>
          <p style={{color:'rgba(255,255,255,0.58)',fontSize:'15px',lineHeight:'1.6',marginTop:'12px',fontWeight:400,maxWidth:'430px'}}>Transform photos into production-ready 3D models & scalable vectors instantly. Built for designers, e-commerce, and creators in Delhi.</p>

          {/* CIRCLED 1 - Buttons exactly as screenshot */}
          <div style={{display:'flex',gap:'12px',marginTop:'20px'}}>
            <button style={{background:'#A020F0',border:'none',padding:'11px 18px',borderRadius:'9px',color:'#fff',fontSize:'14px',fontWeight:500,display:'flex',alignItems:'center',gap:'6px'}}>✦ Start Creating — Free</button>
            <button style={{background:'transparent',border:'1.5px solid rgba(255,255,255,0.15)',padding:'11px 18px',borderRadius:'9px',color:'#fff',fontSize:'14px',fontWeight:400,display:'flex',alignItems:'center',gap:'6px'}}>◉ Watch Demo</button>
          </div>

          <div style={{display:'flex',gap:'8px',marginTop:'18px',flexWrap:'wrap'}}>
            {['⚡ 60s Turnaround','• 100k+ assets generated','• No credit card required','📍 Made in Delhi, India 🇮🇳'].map(t=><span key={t} style={{background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.08)',padding:'6px 11px',borderRadius:'20px',fontSize:'12px',color:'rgba(255,255,255,0.7)',fontWeight:400}}>{t}</span>)}
          </div>
        </div>

        {/* CIRCLED 2 - Drag & Drop exactly as screenshot */}
        <div onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={onFile} style={{border:'1.6px dashed rgba(168,85,247,0.7)',borderRadius:'14px',background:'rgba(255,255,255,0.03)',padding:'20px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',cursor:'pointer'}}>
          <input ref={fileRef} type="file" hidden accept="image/*" onChange={onFile} />
          <div style={{width:'58px',height:'58px',background:'rgba(160,32,240,0.16)',borderRadius:'12px',display:'grid',placeItems:'center',fontSize:'30px',color:'#C084FF'}}>☁️</div>
          <div style={{fontSize:'16px',fontWeight:500,color:'#fff',marginTop:'14px'}}>Drag & drop your image here</div>
          <div style={{fontSize:'14px',color:'rgba(255,255,255,0.55)',marginTop:'4px',fontWeight:400}}>or browse files to upload</div>
          <div style={{fontSize:'11px',color:'rgba(255,255,255,0.45)',marginTop:'12px',fontWeight:400}}>Supports PNG, JPG, WEBP • Max 20MB • JPG/PNG to 3D or SVG</div>
          <div style={{marginTop:'14px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'6px 12px',borderRadius:'6px',fontSize:'11px',color:'rgba(255,255,255,0.6)',fontWeight:400}}>Instant preview • Background removal included</div>
          {preview && <img src={preview} alt="preview" style={{width:'90px',borderRadius:'8px',marginTop:'12px'}}/>}
        </div>

        {/* CIRCLED 3 - 3D Viewer exactly as screenshot */}
        <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'14px',padding:'10px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'rgba(255,255,255,0.6)',padding:'6px 4px',fontWeight:400}}><span>3D Viewer Preview</span><span>↻ ⛶ ⋯</span></div>
          <div style={{background:'radial-gradient(ellipse at center, rgba(160,32,240,0.28) 0%, #1E1840 70%)',borderRadius:'10px',height:'210px',display:'grid',placeItems:'center',position:'relative',overflow:'hidden'}}>
            <div style={{fontSize:'70px',filter:'drop-shadow(0 0 24px rgba(160,32,240,0.7))'}}>👟</div>
            <div style={{position:'absolute',bottom:'0',left:'0',right:'0',height:'60px',background:'linear-gradient(to top, rgba(160,32,240,0.22), transparent)',display:'grid',placeItems:'end center',paddingBottom:'8px'}}>
              <div style={{width:'85%',height:'18px',background:'repeating-linear-gradient(90deg, rgba(160,32,240,0.4) 0 10px, transparent 10px 20px)',borderRadius:'2px'}}></div>
            </div>
          </div>
          <div style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',padding:'8px 4px 8px',fontWeight:400}}>Model: Sneaker_v01.glb</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
            <button style={{background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',padding:'9px',borderRadius:'8px',color:'#fff',fontSize:'13px',fontWeight:400}}>Download GLB</button>
            <button style={{background:'#A020F0',border:'none',padding:'9px',borderRadius:'8px',color:'#fff',fontSize:'13px',fontWeight:500}}>Export SVG</button>
          </div>
        </div>
      </div>

      {/* 4 STUDIOS - With added BLEND and AE */}
      <div style={{padding:'32px 36px 20px',maxWidth:'1340px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
        <div style={{textAlign:'center'}}>
          <h2 style={{fontSize:'28px',fontWeight:500,color:'#fff',margin:0,letterSpacing:'-0.02em'}}>Everything you need to create, in one place</h2>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:'15px',marginTop:'8px',fontWeight:400}}>Photo, Vector, 3D and Motion — built for creators in India and worldwide. One click export to any format.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'16px',marginTop:'26px'}}>
          {[
            {icon:'📸',title:'Photo Studio',desc:'Your Shopify photos, studio-ready in 1 sec.',feats:['Remove Background','Remove Object','AI Backgrounds & Shadows','Upscaler + Banner Maker'],formats:'JPG, PNG, EPS, SVG, PSD, AI'},
            {icon:'✒️',title:'Vector Studio',desc:'Blurry logo → sharp print-ready SVG.',feats:['Image to Vector','Photo to Line Art','Logo Vectorizer','Batch 100x'],formats:'JPG, PNG, EPS, SVG, PSD, CDR, AI',usp:true},
            {icon:'🧊',title:'3D Studio',desc:'Photo → production 3D for Shopify & games.',feats:['Image to 3D – 60 sec','Multi-Image to 3D','Text to 3D & Texture','Remesh, Rig & Animate'],formats:'GLB, OBJ, FBX, STL, USDZ, BLEND'},
            {icon:'🎬',title:'Motion Studio',desc:'Static → viral Reels, ads, intros.',feats:['Text/Image to Video','Logo & Text Animation','Reels, Promo, Ads','Stock, Music, LUTs'],formats:'MP4, MOV, GIF, AE, LOTTIE'},
          ].map(b=>(
            <div key={b.title} style={{background:'rgba(255,255,255,0.03)',border:b.usp?'1.5px solid #A020F0':'1px solid rgba(255,255,255,0.08)',borderRadius:'14px',padding:'20px',position:'relative'}}>
              {b.usp && <div style={{position:'absolute',top:'10px',right:'10px',background:'#A020F0',padding:'3px 9px',borderRadius:'20px',fontSize:'10px',fontWeight:500}}>YOUR USP ★</div>}
              <div style={{width:'42px',height:'42px',background:b.usp?'rgba(160,32,240,0.2)':'rgba(255,255,255,0.06)',borderRadius:'10px',display:'grid',placeItems:'center',fontSize:'22px'}}>{b.icon}</div>
              <div style={{fontSize:'16px',fontWeight:500,marginTop:'14px',color:'#fff'}}>{b.title}</div>
              <div style={{fontSize:'14px',color:'rgba(255,255,255,0.6)',marginTop:'6px',fontWeight:400,lineHeight:'1.4'}}>{b.desc}</div>
              <div style={{marginTop:'12px',display:'grid',gap:'6px',fontSize:'14px',color:'rgba(255,255,255,0.78)',fontWeight:400}}>{b.feats.map(f=><div key={f} style={{display:'flex',gap:'6px'}}><span style={{color:'#A020F0'}}>•</span> {f}</div>)}</div>
              <div style={{marginTop:'12px',fontSize:'11px',color:'rgba(255,255,255,0.45)',borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:'10px',fontWeight:400}}>{b.formats}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING - Exactly as screenshot + purple bullets */}
      <div style={{padding:'32px 36px 28px',maxWidth:'1340px',margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.06)',marginTop:'20px'}}>
        <div style={{textAlign:'center'}}>
          <h2 style={{fontSize:'26px',fontWeight:500,color:'#fff',margin:0}}>Simple, transparent pricing</h2>
          <p style={{color:'rgba(255,255,255,0.55)',fontSize:'15px',marginTop:'6px',fontWeight:400}}>Start free. Upgrade when you need more. Perfect for startups and studios in Delhi.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px',marginTop:'24px'}}>
          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'14px',padding:'22px'}}>
            <div style={{textAlign:'center',fontSize:'15px',fontWeight:500,color:'#fff'}}>Free</div>
            <div style={{textAlign:'center',fontSize:'32px',fontWeight:500,color:'#fff',marginTop:'6px'}}>₹0<span style={{fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.5)'}}> /mo</span></div>
            <div style={{textAlign:'center',fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'4px',fontWeight:400}}>For individuals trying it out</div>
            <div style={{marginTop:'16px',display:'grid',gap:'8px',fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.75)'}}>
              <div><span style={{color:'#A020F0'}}>✓</span> 5 exports per month</div>
              <div><span style={{color:'#A020F0'}}>✓</span> 3D preview only</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Standard resolution exports</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Community support</div>
            </div>
            <button style={{marginTop:'20px',width:'100%',background:'transparent',border:'1px solid rgba(255,255,255,0.14)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'14px',fontWeight:400}}>Get Started Free</button>
          </div>

          <div style={{background:'rgba(26,20,52,0.9)',border:'1.5px solid #A020F0',borderRadius:'14px',padding:'22px',position:'relative',boxShadow:'0 0 30px rgba(160,32,240,0.2)'}}>
            <div style={{position:'absolute',top:'-11px',left:'50%',transform:'translateX(-50%)',background:'#A020F0',padding:'4px 12px',borderRadius:'12px',fontSize:'12px',fontWeight:500,whiteSpace:'nowrap'}}>☆ Most Popular</div>
            <div style={{textAlign:'center',fontSize:'15px',fontWeight:500,color:'#fff',marginTop:'8px'}}>Pro</div>
            <div style={{textAlign:'center',fontSize:'32px',fontWeight:500,color:'#fff',marginTop:'6px'}}>₹999<span style={{fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.5)'}}> /mo</span></div>
            <div style={{textAlign:'center',fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'4px',fontWeight:400}}>For creators & small teams</div>
            <div style={{marginTop:'16px',display:'grid',gap:'8px',fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.75)'}}>
              <div><span style={{color:'#A020F0'}}>✓</span> 200 exports per month</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Full 3D + Vector export</div>
              <div><span style={{color:'#A020F0'}}>✓</span> HD & 4K exports</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Priority processing ~60s</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Commercial license</div>
            </div>
            <button style={{marginTop:'20px',width:'100%',background:'#A020F0',border:'none',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'14px',fontWeight:500}}>Start Pro Trial</button>
          </div>

          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'14px',padding:'22px'}}>
            <div style={{textAlign:'center',fontSize:'15px',fontWeight:500,color:'#fff'}}>Business</div>
            <div style={{textAlign:'center',fontSize:'32px',fontWeight:500,color:'#fff',marginTop:'6px'}}>₹2499<span style={{fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.5)'}}> /mo</span></div>
            <div style={{textAlign:'center',fontSize:'13px',color:'rgba(255,255,255,0.5)',marginTop:'4px',fontWeight:400}}>For teams & agencies</div>
            <div style={{marginTop:'16px',display:'grid',gap:'8px',fontSize:'14px',fontWeight:400,color:'rgba(255,255,255,0.75)'}}>
              <div><span style={{color:'#A020F0'}}>✓</span> 1000 exports per month</div>
              <div><span style={{color:'#A020F0'}}>✓</span> API access + bulk uploads</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Team workspaces (5 seats)</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Custom vector style controls</div>
              <div><span style={{color:'#A020F0'}}>✓</span> Priority support • Slack</div>
            </div>
            <button style={{marginTop:'20px',width:'100%',background:'transparent',border:'1px solid rgba(255,255,255,0.14)',padding:'10px',borderRadius:'8px',color:'#fff',fontSize:'14px',fontWeight:400}}>Contact Sales</button>
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between',marginTop:'20px',fontSize:'11px',color:'rgba(255,255,255,0.4)',fontWeight:400}}>
          <span style={{background:'rgba(160,32,240,0.12)',border:'1px solid rgba(160,32,240,0.2)',padding:'4px 10px',borderRadius:'20px'}}>📍 Bootstrapped from Delhi • IIT Delhi alumni</span>
          <span>Trusted by 2k+ Delhi creators • Startups from Hauz Khas • Connaught Place • Gurugram</span>
        </div>
      </div>
    </div>
  )
}
