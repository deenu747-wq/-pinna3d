import { NextRequest, NextResponse } from "next/server"
import potrace from "potrace"
import sharp from "sharp"

export async function POST(req: NextRequest){
  const form = await req.formData()
  const file = form.get("file") as File
  if(!file) return NextResponse.json({error:"No file"}, {status:400})

  const buf = Buffer.from(await file.arrayBuffer())

  // 1. Convert to BMP for potrace (potrace needs b/w)
  const bw = await sharp(buf).grayscale().threshold(128).resize(1024).png().toBuffer()

  const svg: string = await new Promise((res,rej)=>{
    potrace.trace(bw, {color:'#000000', background:'#ffffff', threshold:128, turdSize:2, optTolerance:0.4}, (err, svg)=> err?rej(err):res(svg))
  })

  // 2. Make outputs - for MVP we return SVG and same SVG with different ext
  // For EPS/AI/PDF we wrap SVG content (real converters later with Inkscape cloud)
  const base = svg.replace('<?xml version="1.0"?>','').trim()

  return NextResponse.json({
    svg: base,
    formats: {
      svg: `data:image/svg+xml;base64,${Buffer.from(base).toString('base64')}`,
      // For now EPS/AI/PDF/CDR = SVG wrapper - you will replace with real conversion in Step 6
      eps: `data:application/postscript;base64,${Buffer.from(base).toString('base64')}`,
      ai: `data:application/postscript;base64,${Buffer.from(base).toString('base64')}`,
      pdf: `data:application/pdf;base64,${Buffer.from(base).toString('base64')}`,
      cdr: `data:application/octet-stream;base64,${Buffer.from(base).toString('base64')}`,
      png: `data:image/png;base64,${buf.toString('base64')}`,
    }
  })
}
