import { NextResponse } from "next/server"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

async function tryHF(url: string, token: string, buffer: ArrayBuffer, isJson = false, fileType = 'image/png', base64 = '') {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), 50000)
  try {
    const res = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      cache: 'no-store',
      headers: isJson? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      } : {
        Authorization: `Bearer ${token}`,
        'Content-Type': fileType,
        'Accept': 'image/png',
      },
      body: isJson? JSON.stringify({ image_url: base64 }) : buffer as any,
    } as any)
    clearTimeout(t)
    return res
  } catch (e: any) {
    clearTimeout(t)
    console.error(`FETCH FAIL for ${url}:`, e.cause || e.message)
    throw e
  }
}

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const token = process.env.HF_TOKEN
    if (!token) return NextResponse.json({ error: 'Missing HF_TOKEN in Vercel' }, { status: 500 })

    const arrayBuffer = await file.arrayBuffer()
    const b64 = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString('base64')}`

    console.log("Starting remove-bg, size:", file.size)

    let res: Response | null = null
    let lastErr = ''

    // TRY 1: Old API (most stable)
    try {
      res = await tryHF("https://api-inference.huggingface.co/models/briaai/RMBG-1.4", token, arrayBuffer, false, file.type)
      if (!res.ok) {
        lastErr = await res.clone().text().then(t=>t.slice(0,500))
        console.log("Try1 fail", res.status, lastErr)
        if (res.status!== 500 && res.status!== 503) res = null
      } else { console.log("Try1 OK") }
    } catch(e:any){ lastErr = e.message; res=null }

    // TRY 2: New router hf-inference
    if (!res ||!res.ok) {
      try {
        res = await tryHF("https://router.huggingface.co/hf-inference/models/briaai/RMBG-1.4", token, arrayBuffer, false, file.type)
        if (!res.ok) {
          lastErr = await res.clone().text().then(t=>t.slice(0,500))
          console.log("Try2 fail", res.status, lastErr)
          res = null
        } else { console.log("Try2 OK") }
      } catch(e:any){ lastErr = e.message; res=null }
    }

    // TRY 3: fal provider (needs json)
    if (!res ||!res.ok) {
      try {
        res = await tryHF("https://router.huggingface.co/fal-ai/fal-ai/bria-background-removal", token, arrayBuffer, true, file.type, b64)
        if (!res.ok) {
          lastErr = await res.clone().text().then(t=>t.slice(0,500))
          console.log("Try3 fail", res.status, lastErr)
          res = null
        } else { console.log("Try3 OK") }
      } catch(e:any){ lastErr = e.message; res=null }
    }

    if (!res ||!res.ok) {
      console.error("ALL HF TRIES FAILED:", lastErr)
      return NextResponse.json({ error: `All providers failed. Last: ${lastErr} | Fix: Check HF_TOKEN is Read token and model enabled` }, { status: 500 })
    }

    // Handle json (fal) or blob (hf)
    const ctype = res.headers.get('content-type') || ''
    if (ctype.includes('application/json')) {
      const j: any = await res.json()
      const imgUrl = j.image?.url || j.output || j.data?.[0]?.url || j.url
      if (!imgUrl) return NextResponse.json({ error: 'No URL in json: '+JSON.stringify(j).slice(0,500) }, { status: 500 })
      const imgRes = await fetch(imgUrl)
      const blob = await imgRes.blob()
      return new Response(blob, { headers: { 'Content-Type': 'image/png' } })
    } else {
      const blob = await res.blob()
      return new Response(blob, { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-cache' } })
    }

  } catch (e: any) {
    console.error("ROUTE CRASH:", e, e.cause)
    return NextResponse.json({ error: `Server crash: ${e.message} cause: ${e.cause?.message || ''}` }, { status: 500 })
  }
}
