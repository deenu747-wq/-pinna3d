export const runtime = 'nodejs'

import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest){
  try {
    const form = await req.formData()
    const file = form.get("file") as File
    if(!file) return NextResponse.json({error:"No file"}, {status:400})

    const buf = Buffer.from(await file.arrayBuffer())
    
    // Simple SVG wrapper for now - will be replaced with real potrace in next commit
    const fakeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><image href="data:image/png;base64,${buf.toString('base64')}" width="400" height="400"/></svg>`

    return NextResponse.json({
      svg: fakeSvg,
      formats: {
        svg: `data:image/svg+xml;base64,${Buffer.from(fakeSvg).toString('base64')}`,
        eps: `data:application/postscript;base64,${Buffer.from(fakeSvg).toString('base64')}`,
        ai: `data:application/postscript;base64,${Buffer.from(fakeSvg).toString('base64')}`,
        pdf: `data:application/pdf;base64,${Buffer.from(fakeSvg).toString('base64')}`,
        cdr: `data:application/octet-stream;base64,${Buffer.from(fakeSvg).toString('base64')}`,
        png: `data:image/png;base64,${buf.toString('base64')}`,
      }
    })
  } catch(e:any){
    return NextResponse.json({error:e.message}, {status:500})
  }
}
