import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

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
      const txt = await res.text()
      return NextResponse.json({ error: 'Engine busy: ' + txt.slice(0,100) }, { status: 503 })
    }

    const out = await res.arrayBuffer()
    
    return new NextResponse(out, {
      headers: { 'Content-Type': 'image/png' },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
