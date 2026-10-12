import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())

    const res = await fetch('https://api-inference.huggingface.co/models/briaai/RMBG-1.4', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.HF_TOKEN}` },
      body: buffer,
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Engine restarting, try in 30 sec' }, { status: 503 })
    }

    const out = Buffer.from(await res.arrayBuffer())
    const png = await sharp(out).png().toBuffer()

    return new NextResponse(new Uint8Array(png), {
      headers: { 'Content-Type': 'image/png' },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
