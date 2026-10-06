export default function Page(){
  return (
    <div style={{minHeight:'100vh',background:'#000',color:'#fff',fontFamily:'system-ui'}}>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'24px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontWeight:900,fontSize:22}}>PINNA3D.COM</div>
          <div style={{background:'#fff',color:'#000',padding:'8px 16px',borderRadius:20,fontWeight:700}}>Login</div>
        </div>
        <div style={{textAlign:'center',padding:'90px 0'}}>
          <div style={{display:'inline-block',background:'#111',border:'1px solid #222',padding:'6px 12px',borderRadius:20,fontSize:12}}>⚡ 2D Image → 3D Model + Vector in 5 sec</div>
          <h1 style={{fontSize:64,fontWeight:900,lineHeight:.9,margin:'24px 0'}}>Turn Any Image<br/>into 3D & Vector</h1>
          <p style={{opacity:.6,maxWidth:540,margin:'0 auto',fontSize:18}}>Upload JPG/PNG → Get GLB for Blender + SVG for Illustrator. Built in Delhi.</p>
          <div style={{marginTop:32,background:'#fff',color:'#000',padding:'14px 28px',borderRadius:30,fontWeight:800,display:'inline-block'}}>Upload Image — Free</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginTop:60}}>
          <div style={{border:'1px solid #222',padding:24,borderRadius:20}}><div>Free</div><div style={{fontSize:32,fontWeight:900}}>₹0</div><div style={{opacity:.7,marginTop:10}}>✓ 3 models</div></div>
          <div style={{border:'1px solid #fff',background:'#111',padding:24,borderRadius:20}}><div>Starter — Popular</div><div style={{fontSize:32,fontWeight:900}}>₹499</div><div style={{opacity:.7,marginTop:10}}>✓ 100 models/mo</div></div>
          <div style={{border:'1px solid #222',padding:24,borderRadius:20}}><div>Pro</div><div style={{fontSize:32,fontWeight:900}}>₹999</div><div style={{opacity:.7,marginTop:10}}>✓ Unlimited</div></div>
        </div>
        <div style={{textAlign:'center',opacity:.3,padding:'60px 0',fontSize:12}}>© 2026 Pinna3d.com — Delhi, India</div>
      </div>
    </div>
  )
}
