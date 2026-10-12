import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const token = process.env.HF_TOKEN
    if (!token) return NextResponse.json({ error: 'HF_TOKEN missing' }, { status: 500 })

    const form = await req.formData()
    const file = form.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())

    // NEW HF ROUTER URL - old one is dead
    const url = 'https://router.huggingface.co/hf-inference/models/briaai/RMBG-1.4'

    let res = await fetch(url, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token}`,
      },
      body: buffer,
    })

    // Model cold start - retry once
    if (res.status === 503) {
      const wait = res.headers.get('Retry-After') || '10'
      await new Promise(r => setTimeout(r, parseInt(wait)*1000 || 8000))
      res = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: buffer,
      })
    }

    if (!res.ok) {
      const txt = await res.text()
      console.error('HF failed:', res.status, txt)
      return NextResponse.json({ error: `HF ${res.status}: ${txt.slice(0,300)}` }, { status: 500 })
    }

    const out = await res.arrayBuffer()
    return new NextResponse(out, {
      headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' }
    })

  } catch (e:any) {
    console.error(e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
