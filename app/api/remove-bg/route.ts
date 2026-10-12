import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const token = process.env.HF_TOKEN
    if (!token) throw new Error("HF_TOKEN missing")

    const formData = await req.formData()
    const file = formData.get("file") as Blob
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

    const buffer = await file.arrayBuffer()
    const base64 = Buffer.from(buffer).toString("base64")
    const mime = file.type || "image/jpeg"
    const dataUri = `data:${mime};base64,${base64}`

    // NEW: Use fal-ai provider via HF Router - FREE with HF token
    // This is the only provider that now supports RMBG models
    const hfRes = await fetch(
      "https://router.huggingface.co/fal-ai/briaai/RMBG-2.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: dataUri,
        }),
      }
    )

    if (!hfRes.ok) {
      const txt = await hfRes.text()
      console.error("HF fal-ai error:", txt)
      // Fallback to old API that still works for some accounts
      const fallback = await fetch(
        "https://api-inference.huggingface.co/models/briaai/RMBG-2.0",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: Buffer.from(buffer),
        }
      )
      if (!fallback.ok) {
        const ftxt = await fallback.text()
        throw new Error(`HF Error ${hfRes.status}: ${txt.slice(0,300)} | Fallback: ${ftxt.slice(0,200)}`)
      }
      const blob = await fallback.blob()
      const ab = await blob.arrayBuffer()
      const b64 = Buffer.from(ab).toString("base64")
      return NextResponse.json({ url: `data:image/png;base64,${b64}` })
    }

    const json = await hfRes.json()
    // fal response has image url or base64
    let imageUrl = json?.image?.url || json?.image_url || json?.url || json?.data?.[0]

    if (!imageUrl) {
      console.log("Full HF response:", JSON.stringify(json).slice(0,500))
      throw new Error("No image in HF response")
    }

    // If it's a url, fetch it and convert to base64 for frontend
    if (imageUrl.startsWith("http")) {
      const imgRes = await fetch(imageUrl)
      const imgBuf = await imgRes.arrayBuffer()
      const imgB64 = Buffer.from(imgBuf).toString("base64")
      return NextResponse.json({ url: `data:image/png;base64,${imgB64}` })
    }

    // If already base64 data uri
    if (imageUrl.startsWith("data:")) {
      return NextResponse.json({ url: imageUrl })
    }

    // If raw base64
    return NextResponse.json({ url: `data:image/png;base64,${imageUrl}` })

  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
