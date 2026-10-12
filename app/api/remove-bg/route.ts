import { NextResponse } from "next/server"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const token = process.env.HF_TOKEN
    if (!token) return NextResponse.json({ error: 'Add HF_TOKEN in Vercel > Settings > Environment Variables' }, { status: 500 })

    const arrayBuffer = await file.arrayBuffer()

    // NEW ROUTER - old api-inference.huggingface.co is dead
    const res = await fetch(
      "https://router.huggingface.co/models/briaai/RMBG-1.4",
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': file.type || 'image/jpeg',
        },
        body: arrayBuffer,
      }
    )

    if (!res.ok) {
      const txt = await res.text()
      console.error("HF Error:", res.status, txt.slice(0,1000))
      return NextResponse.json({ error: `HF ${res.status}: ${txt.slice(0,500)}` }, { status: 500 })
    }

    // HF returns binary PNG with alpha
    const blob = await res.blob()
    const outBuffer = await blob.arrayBuffer()

    return new Response(outBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': String(outBuffer.byteLength),
        'Cache-Control': 'no-cache',
      },
    })

  } catch (e: any) {
    console.error("ROUTE CRASH:", e)
    return NextResponse.json({ error: `Server error: ${e.message}` }, { status: 500 })
  }
}
