"use client"
import { useState } from "react"

export default function SignIn(){
  const [loading,setLoading]=useState(false)
  return(
    <div style={{background:'#0A0814',minHeight:'100vh',display:'grid',placeItems:'center',color:'#fff',fontFamily:'Inter, system-ui',padding:'20px'}}>
      <div style={{background:'#15131E',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'20px',padding:'32px',width:'100%',maxWidth:'400px'}}>
        <a href="/"><img src="/logo.png" style={{height:'50px',marginBottom:'20px'}} alt="logo"/></a>
        <h1 style={{fontSize:'26px',margin:'0 0 6px'}}>Welcome back</h1>
        <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',margin:'0 0 22px'}}>Sign in to continue creating</p>
        
        <input placeholder="Email address" type="email" style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',padding:'12px',borderRadius:'10px',color:'#fff',marginBottom:'12px',boxSizing:'border-box'}}/>
        <input placeholder="Password" type="password" style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',padding:'12px',borderRadius:'10px',color:'#fff',marginBottom:'16px',boxSizing:'border-box'}}/>
        
        <button onClick={()=>setLoading(true)} style={{width:'100%',background:'#A020F0',padding:'12px',borderRadius:'10px',border:'none',color:'#fff',fontWeight:600,cursor:'pointer'}}>
          {loading?'Signing in...':'Sign In'}
        </button>

        <div style={{textAlign:'center',marginTop:'16px',fontSize:'13px',color:'rgba(255,255,255,0.5)'}}>
          No account? <a href="/signup" style={{color:'#A020F0',textDecoration:'none',fontWeight:600}}>Sign up free</a>
        </div>
        <div style={{marginTop:'20px',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'14px',fontSize:'11px',color:'rgba(255,255,255,0.35)',textAlign:'center'}}>PNG, JPG, WEBP → SVG, EPS, AI, PDF, CDR + PNG Bonus</div>
      </div>
    </div>
  )
}
