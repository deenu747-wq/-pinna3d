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
    if (!token) return NextResponse.json({ error: 'Missing HF_TOKEN' }, { status: 500 })

    const buf = Buffer.from(await file.arrayBuffer())

    // TRY 1: OLD endpoint (still works for RMBG)
    let hfRes = await fetch(
      "https://api-inference.huggingface.co/models/briaai/RMBG-1.4",
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: buf as any,
      }
    )

    // TRY 2: If old fails, try fal provider
    if (!hfRes.ok) {
      console.log("Old endpoint failed", hfRes.status, await hfRes.clone().text().then(t=>t.slice(0,300)))
      hfRes = await fetch(
        "https://router.huggingface.co/fal-ai/fal-ai/bria-background-removal",
        {
          method: 'POST',
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image_url: `data:${file.type};base64,${buf.toString('base64')}`,
          }),
        }
      )
    }

    if (!hfRes.ok) {
      const txt = await hfRes.text()
      console.error("HF final fail", txt.slice(0,1000))
      return NextResponse.json({ error: txt.slice(0,800) }, { status: 500 })
    }

    // fal returns json with image url, old returns blob
    const contentType = hfRes.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const j:any = await hfRes.json()
      // fal returns { image: { url: ... } }
      const imgUrl = j.image?.url || j.url || j.output
      if (!imgUrl) return NextResponse.json({ error: 'No image in JSON '+JSON.stringify(j).slice(0,500) }, { status: 500 })
      const imgBlob = await (await fetch(imgUrl)).blob()
      return new Response(imgBlob, { headers: { 'Content-Type': 'image/png' } })
    } else {
      const blob = await hfRes.blob()
      return new Response(blob, { headers: { 'Content-Type': 'image/png' } })
    }

  } catch (e:any) {
    console.error("CRASH", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
