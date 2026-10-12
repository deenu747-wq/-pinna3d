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
    if (!token) return NextResponse.json({ error: 'Missing HF_TOKEN in Vercel Env Vars' }, { status: 500 })

    const arrayBuffer = await file.arrayBuffer()
    console.log("File size:", file.size)

    // Use OLD endpoint - it still works, new router blocks RMBG
    const res = await fetch(
      "https://api-inference.huggingface.co/models/briaai/RMBG-1.4",
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: arrayBuffer,
        cache: 'no-store',
      } as any
    )

    if (!res.ok) {
      const txt = await res.text()
      console.error("HF Error:", res.status, txt.slice(0,800))
      return NextResponse.json({ error: `HF ${res.status}: ${txt.slice(0,600)}` }, { status: 500 })
    }

    const blob = await res.blob()
    console.log("Success PNG:", blob.size)
    
    return new Response(blob, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache',
      },
    })

  } catch (e: any) {
    console.error("ROUTE CRASH:", e.message, e.cause)
    return NextResponse.json({ error: `fetch failed: ${e.message} cause:${e.cause?.message || 'none'}` }, { status: 500 })
  }
}
