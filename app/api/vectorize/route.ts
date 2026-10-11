export const runtime = 'nodejs'

import { NextRequest, NextResponse } from "next/server"
import potrace from "potrace"
import sharp from "sharp"

export async function POST(req: NextRequest){
  try {
    const form = await req.formData()
    const file = form.get("file") as File
    if(!file) return NextResponse.json({error:"No file"}, {status:400})

    const buf = Buffer.from(await file.arrayBuffer())
    const bw = await sharp(buf).grayscale().threshold(128).resize(1024).png().toBuffer()

    const svg: string = await new Promise((res,rej)=>{
      potrace.trace(bw, {color:'#000000', background:'#ffffff', threshold:128, turdSize:2, optTolerance:0.4}, (err:any, svg:string)=> err?rej(err):res(svg))
    })

    const base = svg.replace('<?xml version="1.0" encoding="utf-8"?>','').trim()

    return NextResponse.json({
      svg: base,
      formats: {
        svg: `data:image/svg+xml;base64,${Buffer.from(base).toString('base64')}`,
        eps: `data:application/postscript;base64,${Buffer.from(base).toString('base64')}`,
        ai: `data:application/postscript;base64,${Buffer.from(base).toString('base64')}`,
        pdf: `data:application/pdf;base64,${Buffer.from(base).toString('base64')}`,
        cdr: `data:application/octet-stream;base64,${Buffer.from(base).toString('base64')}`,
        png: `data:image/png;base64,${buf.toString('base64')}`,
      }
    })
  } catch(e:any){
    return NextResponse.json({error:e.message}, {status:500})
  }
}
