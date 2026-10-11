"use client"
import { useState } from "react"

export default function SignUp(){
  const [loading,setLoading]=useState(false)
  return(
    <div style={{background:'#0A0814',minHeight:'100vh',display:'grid',placeItems:'center',color:'#fff',fontFamily:'Inter, system-ui',padding:'20px'}}>
      <div style={{background:'#15131E',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'20px',padding:'32px',width:'100%',maxWidth:'420px'}}>
        <a href="/"><img src="/logo.png" style={{height:'50px',marginBottom:'20px'}} alt="logo"/></a>
        <div style={{background:'rgba(160,32,240,0.15)',border:'1px solid rgba(160,32,240,0.3)',display:'inline-flex',padding:'4px 10px',borderRadius:'20px',fontSize:'10px',color:'#D6A5FF',marginBottom:'10px'}}>100 CREDITS FREE • NO CC</div>
        <h1 style={{fontSize:'26px',margin:'0 0 6px'}}>Create your free account</h1>
        <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',margin:'0 0 22px'}}>Start vectorizing — JPG/PNG → SVG/EPS/AI</p>
        
        <input placeholder="Full name" style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',padding:'12px',borderRadius:'10px',color:'#fff',marginBottom:'12px',boxSizing:'border-box'}}/>
        <input placeholder="Email address" type="email" style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',padding:'12px',borderRadius:'10px',color:'#fff',marginBottom:'12px',boxSizing:'border-box'}}/>
        <input placeholder="Password" type="password" style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',padding:'12px',borderRadius:'10px',color:'#fff',marginBottom:'16px',boxSizing:'border-box'}}/>
        
        <button onClick={()=>setLoading(true)} style={{width:'100%',background:'#A020F0',boxShadow:'0 0 24px rgba(160,32,240,0.45)',padding:'12px',borderRadius:'10px',border:'none',color:'#fff',fontWeight:600,cursor:'pointer'}}>
          {loading?'Creating...':'Get Started Free →'}
        </button>

        <div style={{textAlign:'center',marginTop:'16px',fontSize:'13px',color:'rgba(255,255,255,0.5)'}}>
          Already have account? <a href="/signin" style={{color:'#A020F0',textDecoration:'none',fontWeight:600}}>Sign in</a>
        </div>
      </div>
    </div>
  )
}
